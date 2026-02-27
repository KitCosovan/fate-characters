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

export const encodeCharacterToUrl = (character: Character): string => {
  const json = JSON.stringify(character)
  const encoded = btoa(encodeURIComponent(json))
  return `${window.location.origin}${window.location.pathname}#/?shared=${encoded}`
}

export const decodeCharacterFromUrl = (): Character | null => {
  try {
    const hash = window.location.hash
    const match = hash.match(/[?&]shared=([^&]+)/)
    if (!match) return null
    const json = decodeURIComponent(atob(match[1]))
    return JSON.parse(json) as Character
  } catch {
    return null
  }
}