// src/store/characterStore.ts
import { create } from 'zustand'
import type { Character } from '../types'
import { loadCharacters, saveCharacter, deleteCharacter, saveCharacters } from '../utils'
import {
  fetchRemoteCharacters,
  upsertRemoteCharacter,
  deleteRemoteCharacter,
  mergeCharacters,
} from '../utils/supabaseSync'

interface CharacterStore {
  characters: Character[]
  syncing: boolean
  loadAll: () => void
  syncWithRemote: (userId: string) => Promise<void>
  addCharacter: (character: Character) => void
  updateCharacter: (character: Character) => void
  removeCharacter: (id: string) => void
  getById: (id: string) => Character | undefined
}

export const useCharacterStore = create<CharacterStore>((set, get) => ({
  characters: [],
  syncing: false,

  loadAll: () => {
    const characters = loadCharacters()
    set({ characters })
  },

  // Вызывается после логина — объединяет локальные и удалённые данные
  syncWithRemote: async (userId: string) => {
    set({ syncing: true })
    try {
      const local = get().characters
      const remote = await fetchRemoteCharacters(userId)
      const merged = mergeCharacters(local, remote)

      // Сохраняем merged локально
      saveCharacters(merged)
      set({ characters: merged })

      // Пушим всё merged обратно в Supabase (чтобы локальные тоже оказались там)
      await Promise.all(merged.map(c => upsertRemoteCharacter(c, userId)))
    } catch (e) {
      console.error('syncWithRemote characters:', e)
    } finally {
      set({ syncing: false })
    }
  },

  addCharacter: (character) => {
    saveCharacter(character)
    set(state => ({ characters: [...state.characters, character] }))

    // Async sync — не блокируем UI
    import('../store/authStore').then(({ useAuthStore }) => {
      const userId = useAuthStore.getState().user?.id
      if (userId) upsertRemoteCharacter(character, userId)
    })
  },

  updateCharacter: (character) => {
    const updated = { ...character, updatedAt: new Date().toISOString() }
    saveCharacter(updated)
    set(state => ({
      characters: state.characters.map(c => c.id === updated.id ? updated : c),
    }))

    import('../store/authStore').then(({ useAuthStore }) => {
      const userId = useAuthStore.getState().user?.id
      if (userId) upsertRemoteCharacter(updated, userId)
    })
  },

  removeCharacter: (id) => {
    deleteCharacter(id)
    set(state => ({ characters: state.characters.filter(c => c.id !== id) }))

    import('../store/authStore').then(({ useAuthStore }) => {
      const userId = useAuthStore.getState().user?.id
      if (userId) deleteRemoteCharacter(id)
    })
  },

  getById: (id) => get().characters.find(c => c.id === id),
}))
