import type { Character } from '../types'

const CHARACTERS_KEY = 'fate_characters'

export const saveCharacters = (characters: Character[]): void => {
  localStorage.setItem(CHARACTERS_KEY, JSON.stringify(characters))
}

export const loadCharacters = (): Character[] => {
  try {
    const data = localStorage.getItem(CHARACTERS_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export const saveCharacter = (character: Character): void => {
  const characters = loadCharacters()
  const index = characters.findIndex(c => c.id === character.id)
  if (index >= 0) {
    characters[index] = character
  } else {
    characters.push(character)
  }
  saveCharacters(characters)
}

export const deleteCharacter = (id: string): void => {
  const characters = loadCharacters().filter(c => c.id !== id)
  saveCharacters(characters)
}