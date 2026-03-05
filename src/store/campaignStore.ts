// src/store/campaignStore.ts
import { create } from 'zustand'
import type { Campaign } from '../types'

const STORAGE_KEY = 'fate-campaigns'

function loadCampaigns(): Campaign[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function persistCampaigns(campaigns: Campaign[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns))
}

interface CampaignStore {
  campaigns: Campaign[]
  loadAll: () => void
  addCampaign: (campaign: Campaign) => void
  updateCampaign: (campaign: Campaign) => void
  removeCampaign: (id: string) => void
  getById: (id: string) => Campaign | undefined
}

export const useCampaignStore = create<CampaignStore>((set, get) => ({
  campaigns: [],

  loadAll: () => set({ campaigns: loadCampaigns() }),

  addCampaign: (campaign) => {
    const campaigns = [...get().campaigns, campaign]
    persistCampaigns(campaigns)
    set({ campaigns })
  },

  updateCampaign: (campaign) => {
    const updated = { ...campaign, updatedAt: new Date().toISOString() }
    const campaigns = get().campaigns.map(c => c.id === updated.id ? updated : c)
    persistCampaigns(campaigns)
    set({ campaigns })
  },

  removeCampaign: (id) => {
    const campaigns = get().campaigns.filter(c => c.id !== id)
    persistCampaigns(campaigns)
    set({ campaigns })
  },

  getById: (id) => get().campaigns.find(c => c.id === id),
}))
