// src/store/campaignStore.ts
import { create } from 'zustand'
import type { Campaign, CampaignRole } from '../types'
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

    supabase.from('campaigns').upsert({
      id: campaign.id,
      user_id: userId,
      data: campaign,
      updated_at: campaign.updatedAt,
      invite_code: campaign.inviteCode ?? null,
      gm_id: userId ?? null,
    }).then(({ error }) => { if (error) console.error('Campaign upsert:', error) })

    if (userId) {
      supabase.from('campaign_members').upsert({
        campaign_id: campaign.id,
        user_id: userId,
        role: 'gm',
        display_name: useAuthStore.getState().user?.email ?? null,
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
    }).then(({ error }) => { if (error) console.error('Campaign update:', error) })
  },

  removeCampaign: (id) => {
    // Удаляем локально сразу
    const updated = get().campaigns.filter(c => c.id !== id)
    set({ campaigns: updated })
    saveToStorage(updated)

    if (!isSupabaseConfigured()) return

    const userId = useAuthStore.getState().user?.id

    // Сначала убедиться что user_id проставлен (для старых кампаний)
    if (userId) {
      supabase.from('campaigns')
        .update({ user_id: userId })
        .eq('id', id)
        .is('user_id', null)
        .then(() => {
          // Теперь удалить
          supabase.from('campaigns')
            .delete()
            .eq('id', id)
            .then(({ error }) => {
              if (error) console.error('Campaign delete:', error)
            })
        })
    } else {
      supabase.from('campaigns').delete().eq('id', id)
        .then(({ error }) => { if (error) console.error('Campaign delete:', error) })
    }
  },

  syncWithRemote: async (userId) => {
    if (!isSupabaseConfigured()) return
    set({ syncing: true })

    // 1. Свои кампании
    const { data: ownData } = await supabase
      .from('campaigns')
      .select('id, data, updated_at')
      .eq('user_id', userId)

    // 2. Кампании где участник (joined by invite)
    const { data: memberData } = await supabase
      .from('campaign_members')
      .select('campaign_id, role')
      .eq('user_id', userId)

    const ownIds = new Set((ownData ?? []).map(r => r.id))
    const foreignIds = (memberData ?? [])
      .map(m => m.campaign_id)
      .filter(id => !ownIds.has(id))

    // 3. Загрузить чужие кампании
    let foreignCampaigns: Campaign[] = []
    if (foreignIds.length > 0) {
      const { data: foreignData } = await supabase
        .from('campaigns')
        .select('id, data, updated_at')
        .in('id', foreignIds)

      foreignCampaigns = (foreignData ?? []).map(row => {
        const camp = row.data as Campaign
        const membership = memberData?.find(m => m.campaign_id === row.id)
        return { ...camp, userRole: (membership?.role ?? 'player') as CampaignRole }
      })
    }

    // 4. Мерж
    const local = get().campaigns
    const merged = [...local]

    const upsertMerge = (remote: Campaign) => {
      const idx = merged.findIndex(c => c.id === remote.id)
      if (idx === -1) {
        merged.push(remote)
      } else if (new Date(remote.updatedAt) > new Date(merged[idx].updatedAt)) {
        // Сохраняем локальную роль если есть
        merged[idx] = { ...remote, userRole: merged[idx].userRole ?? remote.userRole }
      }
    }

    for (const row of (ownData ?? [])) {
      const membership = memberData?.find(m => m.campaign_id === row.id)
      upsertMerge({ ...(row.data as Campaign), userRole: (membership?.role ?? 'gm') as CampaignRole })
    }
    for (const camp of foreignCampaigns) upsertMerge(camp)

    set({ campaigns: merged, syncing: false })
    saveToStorage(merged)

    // Убедиться что есть записи в campaign_members для своих кампаний
    for (const row of (ownData ?? [])) {
      await supabase.from('campaign_members').upsert({
        campaign_id: row.id,
        user_id: userId,
        role: 'gm',
        display_name: useAuthStore.getState().user?.email ?? null,
      }, { onConflict: 'campaign_id,user_id' })
    }
  },
}))
