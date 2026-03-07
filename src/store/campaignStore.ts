// src/store/campaignStore.ts
import { create } from 'zustand'
import type { Campaign } from '../types'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { useAuthStore } from './authStore'

const STORAGE_KEY = 'fate_campaigns'

function loadFromStorage(): Campaign[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function saveToStorage(campaigns: Campaign[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns))
}

interface CampaignStore {
  campaigns: Campaign[]
  syncing: boolean
  loadAll: () => void
  getById: (id: string) => Campaign | undefined
  addCampaign: (campaign: Campaign) => void
  updateCampaign: (campaign: Campaign) => void
  removeCampaign: (id: string) => void
  syncWithRemote: (userId: string) => Promise<void>
}

export const useCampaignStore = create<CampaignStore>((set, get) => ({
  campaigns: [],
  syncing: false,

  loadAll: () => set({ campaigns: loadFromStorage() }),

  getById: (id) => get().campaigns.find(c => c.id === id),

  addCampaign: (campaign) => {
    const updated = [...get().campaigns, campaign]
    set({ campaigns: updated })
    saveToStorage(updated)

    if (!isSupabaseConfigured()) return

    const userId = useAuthStore.getState().user?.id

    // Сохранить кампанию
    supabase.from('campaigns').upsert({
      id: campaign.id,
      user_id: userId,
      data: campaign,
      updated_at: campaign.updatedAt,
      invite_code: campaign.inviteCode ?? null,
      gm_id: userId ?? null,
    }).then(({ error }) => {
      if (error) console.error('Campaign upsert:', error)
    })

    // Добавить создателя как ГМ в campaign_members — это критично для комнаты
    if (userId) {
      supabase.from('campaign_members').upsert({
        campaign_id: campaign.id,
        user_id: userId,
        role: 'gm',
        display_name: null,
      }, { onConflict: 'campaign_id,user_id' }).then(({ error }) => {
        if (error) console.error('Member insert:', error)
      })
    }
  },

  updateCampaign: (campaign) => {
    const updated = get().campaigns.map(c => c.id === campaign.id ? campaign : c)
    set({ campaigns: updated })
    saveToStorage(updated)

    if (!isSupabaseConfigured()) return
    supabase.from('campaigns').upsert({
      id: campaign.id,
      data: campaign,
      updated_at: campaign.updatedAt,
      invite_code: campaign.inviteCode ?? null,
    })
  },

  removeCampaign: (id) => {
    const updated = get().campaigns.filter(c => c.id !== id)
    set({ campaigns: updated })
    saveToStorage(updated)
    if (isSupabaseConfigured()) supabase.from('campaigns').delete().eq('id', id)
  },

  syncWithRemote: async (userId) => {
    if (!isSupabaseConfigured()) return
    set({ syncing: true })

    const { data, error } = await supabase
      .from('campaigns')
      .select('data, updated_at')
      .eq('user_id', userId)

    if (!error && data) {
      const local = get().campaigns
      const merged = [...local]

      for (const row of data) {
        const remote = row.data as Campaign
        const idx = merged.findIndex(c => c.id === remote.id)
        if (idx === -1) merged.push(remote)
        else if (new Date(remote.updatedAt) > new Date(merged[idx].updatedAt)) merged[idx] = remote
      }

      set({ campaigns: merged, syncing: false })
      saveToStorage(merged)

      // Убедиться что для каждой кампании есть запись в campaign_members
      for (const camp of merged) {
        await supabase.from('campaign_members').upsert({
          campaign_id: camp.id,
          user_id: userId,
          role: camp.userRole ?? 'gm',
        }, { onConflict: 'campaign_id,user_id' })
      }
    } else {
      set({ syncing: false })
    }
  },
}))
