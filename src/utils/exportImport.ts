import type { Character } from '../types'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export const exportCharacter = (character: Character): void => {
  const json = JSON.stringify(character, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${character.name || 'character'}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export const exportAllCharacters = (characters: Character[]): void => {
  const json = JSON.stringify({ characters, exportedAt: new Date().toISOString() }, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `fate-characters-backup.json`
  a.click()
  URL.revokeObjectURL(url)
}

export const importCharacterFromFile = (file: File): Promise<Character> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target?.result as string)
        if (data.name !== undefined && data.aspects !== undefined) {
          resolve(data as Character)
        } else {
          reject(new Error('Неверный формат файла'))
        }
      } catch {
        reject(new Error('Ошибка чтения файла'))
      }
    }
    reader.onerror = () => reject(new Error('Ошибка чтения файла'))
    reader.readAsText(file)
  })
}

export const importAllFromFile = (file: File): Promise<Character[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target?.result as string)
        if (Array.isArray(data.characters)) {
          resolve(data.characters as Character[])
        } else {
          reject(new Error('Неверный формат бэкапа'))
        }
      } catch {
        reject(new Error('Ошибка чтения файла'))
      }
    }
    reader.onerror = () => reject(new Error('Ошибка чтения файла'))
    reader.readAsText(file)
  })
}

// Генерирует короткий ID: 6 символов, читаемый
function generateShortId(): string {
  return Math.random().toString(36).slice(2, 8)
}

// Шаринг через Supabase — короткая ссылка
export const encodeCharacterToUrl = async (character: Character): Promise<string> => {
  // Если Supabase не настроен — fallback на старый base64 метод
  if (!isSupabaseConfigured()) {
    const json = JSON.stringify(character)
    const encoded = btoa(encodeURIComponent(json))
    return `${window.location.origin}${window.location.pathname}#/?shared=${encoded}`
  }

  const shortId = generateShortId()

  const { error } = await supabase
    .from('shared_characters')
    .insert({ short_id: shortId, data: character })

  if (error) {
    // Если коллизия — попробуем ещё раз с новым ID
    if (error.code === '23505') {
      return encodeCharacterToUrl(character)
    }
    // Любая другая ошибка — fallback на base64
    const json = JSON.stringify(character)
    const encoded = btoa(encodeURIComponent(json))
    return `${window.location.origin}${window.location.pathname}#/?shared=${encoded}`
  }

  return `${window.location.origin}${window.location.pathname}#/?s=${shortId}`
}

// Декодирует персонажа из URL — поддерживает оба формата
export const decodeCharacterFromUrl = async (): Promise<Character | null> => {
  try {
    const hash = window.location.hash

    // Новый формат: короткий ID (?s=abc123)
    const shortMatch = hash.match(/[?&]s=([a-z0-9]{4,10})/)
    if (shortMatch && isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('shared_characters')
        .select('data')
        .eq('short_id', shortMatch[1])
        .single()

      if (error || !data) return null
      return data.data as Character
    }

    // Старый формат: base64 (?shared=...)
    const base64Match = hash.match(/[?&]shared=([^&]+)/)
    if (base64Match) {
      const json = decodeURIComponent(atob(base64Match[1]))
      return JSON.parse(json) as Character
    }

    return null
  } catch {
    return null
  }
}
