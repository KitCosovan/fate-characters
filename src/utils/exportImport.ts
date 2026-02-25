import type { Character } from '../types'

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
  const json = JSON.stringify(characters, null, 2)
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
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        // Проверяем что это персонаж а не массив
        if (Array.isArray(data)) {
          reject(new Error('Файл содержит несколько персонажей. Используй импорт всех.'))
          return
        }
        if (!data.id || !data.name !== undefined && !data.systemId) {
          reject(new Error('Неверный формат файла'))
          return
        }
        resolve(data as Character)
      } catch {
        reject(new Error('Не удалось прочитать файл'))
      }
    }
    reader.readAsText(file)
  })
}

export const importAllFromFile = (file: File): Promise<Character[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        if (!Array.isArray(data)) {
          reject(new Error('Файл содержит одного персонажа. Используй обычный импорт.'))
          return
        }
        resolve(data as Character[])
      } catch {
        reject(new Error('Не удалось прочитать файл'))
      }
    }
    reader.readAsText(file)
  })
}

// Поделиться персонажем через URL
export const encodeCharacterToUrl = (character: Character): string => {
  const json = JSON.stringify(character)
  const encoded = btoa(encodeURIComponent(json))
  return `${window.location.origin}${window.location.pathname}#share=${encoded}`
}

export const decodeCharacterFromUrl = (): Character | null => {
  const hash = window.location.hash
  if (!hash.startsWith('#share=')) return null
  try {
    const encoded = hash.replace('#share=', '')
    const json = decodeURIComponent(atob(encoded))
    return JSON.parse(json) as Character
  } catch {
    return null
  }
}