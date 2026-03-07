// src/store/campaignStore.ts
import { create } from 'zustand'
import type { Campaign } from '../types'
import {
  fetchRemoteCampaigns,
  upsertRemoteCampaign,
  deleteRemoteCampaign,
  mergeCampaigns,
} from '../utils/supabaseSync'

const STORAGE_KEY = 'fate-campaigns'

function loadCampaigns(): Campaign[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function persistCampaigns(campaigns: Campaign[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns))
}

interface CampaignStore {
  campaigns: Campaign[]
  syncing: boolean
  loadAll: () => void
  syncWithRemote: (userId: string) => Promise<void>
  addCampaign: (campaign: Campaign) => void
  updateCampaign: (campaign: Campaign) => void
  removeCampaign: (id: string) => void
  getById: (id: string) => Campaign | undefined
}

export const useCampaignStore = create<CampaignStore>((set, get) => ({
  campaigns: [],
  syncing: false,

  loadAll: () => set({ campaigns: loadCampaigns() }),

  syncWithRemote: async (userId: string) => {
    set({ syncing: true })
    try {
      const local = get().campaigns
      const remote = await fetchRemoteCampaigns(userId)
      const merged = mergeCampaigns(local, remote)
      persistCampaigns(merged)
      set({ campaigns: merged })
      await Promise.all(merged.map(c => upsertRemoteCampaign(c, userId)))
    } catch (e) {
      console.error('syncWithRemote campaigns:', e)
    } finally {
      set({ syncing: false })
    }
  },

  addCampaign: (campaign) => {
    const campaigns = [...get().campaigns, campaign]
    persistCampaigns(campaigns)
    set({ campaigns })

    import('../store/authStore').then(({ useAuthStore }) => {
      const userId = useAuthStore.getState().user?.id
      if (userId) upsertRemoteCampaign(campaign, userId)
    })
  },

  updateCampaign: (campaign) => {
    const updated = { ...campaign, updatedAt: new Date().toISOString() }
    const campaigns = get().campaigns.map(c => c.id === updated.id ? updated : c)
    persistCampaigns(campaigns)
    set({ campaigns })

    import('../store/authStore').then(({ useAuthStore }) => {
      const userId = useAuthStore.getState().user?.id
      if (userId) upsertRemoteCampaign(updated, userId)
    })
  },

  removeCampaign: (id) => {
    const campaigns = get().campaigns.filter(c => c.id !== id)
    persistCampaigns(campaigns)
    set({ campaigns })

    import('../store/authStore').then(({ useAuthStore }) => {
      const userId = useAuthStore.getState().user?.id
      if (userId) deleteRemoteCampaign(id)
    })
  },

  getById: (id) => get().campaigns.find(c => c.id === id),
}))
