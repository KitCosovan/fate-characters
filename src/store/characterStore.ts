import { create } from 'zustand'
import type { Character } from '../types'
import { loadCharacters, saveCharacter, deleteCharacter } from '../utils'

interface CharacterStore {
  characters: Character[]
  loadAll: () => void
  addCharacter: (character: Character) => void
  updateCharacter: (character: Character) => void
  removeCharacter: (id: string) => void
  getById: (id: string) => Character | undefined
}

export const useCharacterStore = create<CharacterStore>((set, get) => ({
  characters: [],

  loadAll: () => {
    const characters = loadCharacters()
    set({ characters })
  },

  addCharacter: (character) => {
    saveCharacter(character)
    set(state => ({ characters: [...state.characters, character] }))
  },

  updateCharacter: (character) => {
    const updated = { ...character, updatedAt: new Date().toISOString() }
    saveCharacter(updated)
    set(state => ({
      characters: state.characters.map(c => c.id === updated.id ? updated : c)
    }))
  },

  removeCharacter: (id) => {
    deleteCharacter(id)
    set(state => ({
      characters: state.characters.filter(c => c.id !== id)
    }))
  },

  getById: (id) => {
    return get().characters.find(c => c.id === id)
  },
}))