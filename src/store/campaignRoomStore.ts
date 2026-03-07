// src/store/campaignRoomStore.ts
import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import type { Character, CampaignMember, CampaignRole, NpcVisibleField } from '../types'

interface CampaignRoomStore {
  // Данные комнаты
  campaignId: string | null
  members: CampaignMember[]
  characters: Character[]  // все персонажи кампании (фильтрация на сервере через RLS)
  myRole: CampaignRole | null
  loading: boolean
  error: string | null

  // Инициализация и подписка
  joinRoom: (campaignId: string, userId: string) => Promise<void>
  leaveRoom: () => void

  // ГМ-действия
  setNpcVisibility: (characterId: string, visible: boolean) => Promise<void>
  setNpcVisibleFields: (characterId: string, fields: NpcVisibleField[]) => Promise<void>

  // Присоединение к кампании
  joinCampaignByCode: (code: string, userId: string, displayName?: string) => Promise<{ campaignId: string } | string>
  generateInviteCode: (campaignId: string) => Promise<string | null>

  // Обновление персонажа (для Realtime — обновляет локальный стейт)
  _upsertCharacter: (character: Character) => void
  _removeCharacter: (characterId: string) => void
}

export const useCampaignRoomStore = create<CampaignRoomStore>((set, get) => {
  // Храним unsubscribe-функции для cleanup
  let realtimeChannel: ReturnType<typeof supabase.channel> | null = null

  return {
    campaignId: null,
    members: [],
    characters: [],
    myRole: null,
    loading: false,
    error: null,

    // ── Войти в комнату кампании ────────────────────────────────────────
    joinRoom: async (campaignId, userId) => {
      set({ loading: true, error: null, campaignId })

      // 1. Получить мою роль в кампании
      const { data: memberData } = await supabase
        .from('campaign_members')
        .select('role')
        .eq('campaign_id', campaignId)
        .eq('user_id', userId)
        .single()

      const myRole = (memberData?.role as CampaignRole) ?? 'player'

      // 2. Загрузить всех участников
      const { data: membersData } = await supabase
        .from('campaign_members')
        .select('*')
        .eq('campaign_id', campaignId)

      const members: CampaignMember[] = (membersData ?? []).map(m => ({
        id: m.id,
        campaignId: m.campaign_id,
        userId: m.user_id,
        role: m.role,
        displayName: m.display_name,
        joinedAt: m.joined_at,
      }))

      // 3. Загрузить персонажей кампании
      // RLS автоматически фильтрует: игроки не видят скрытых НПС
      const { data: charsData } = await supabase
        .from('characters')
        .select('data, visible_to_players, visible_fields, user_id')
        .eq('campaign_id', campaignId)

      const characters: Character[] = (charsData ?? []).map(row => ({
        ...(row.data as Character),
        ownerId: row.user_id,
        visibleToPlayers: row.visible_to_players,
        visibleFields: row.visible_fields ?? [],
      }))

      set({ members, characters, myRole, loading: false })

      // 4. Подписаться на Realtime
      if (realtimeChannel) {
        supabase.removeChannel(realtimeChannel)
      }

      realtimeChannel = supabase
        .channel(`campaign:${campaignId}`)
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'characters',
          filter: `campaign_id=eq.${campaignId}`,
        }, payload => {
          if (payload.eventType === 'DELETE') {
            get()._removeCharacter(payload.old.id as string)
          } else {
            const row = payload.new as {
              data: Character
              user_id: string
              visible_to_players: boolean
              visible_fields: NpcVisibleField[]
            }
            const character: Character = {
              ...row.data,
              ownerId: row.user_id,
              visibleToPlayers: row.visible_to_players,
              visibleFields: row.visible_fields ?? [],
            }
            get()._upsertCharacter(character)
          }
        })
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'campaign_members',
          filter: `campaign_id=eq.${campaignId}`,
        }, payload => {
          // Обновить список участников когда кто-то вступил/вышел
          if (payload.eventType === 'INSERT') {
            const m = payload.new
            set(state => ({
              members: [...state.members, {
                id: m.id, campaignId: m.campaign_id, userId: m.user_id,
                role: m.role, displayName: m.display_name, joinedAt: m.joined_at,
              }]
            }))
          } else if (payload.eventType === 'DELETE') {
            set(state => ({ members: state.members.filter(m => m.id !== payload.old.id) }))
          }
        })
        .subscribe()
    },

    // ── Покинуть комнату ────────────────────────────────────────────────
    leaveRoom: () => {
      if (realtimeChannel) {
        supabase.removeChannel(realtimeChannel)
        realtimeChannel = null
      }
      set({ campaignId: null, members: [], characters: [], myRole: null })
    },

    // ── ГМ: переключить видимость НПС ──────────────────────────────────
    setNpcVisibility: async (characterId, visible) => {
      const { error } = await supabase
        .from('characters')
        .update({ visible_to_players: visible })
        .eq('id', characterId)

      if (!error) {
        set(state => ({
          characters: state.characters.map(c =>
            c.id === characterId ? { ...c, visibleToPlayers: visible } : c
          )
        }))
      }
    },

    // ── ГМ: выбрать какие поля НПС видны игрокам ───────────────────────
    setNpcVisibleFields: async (characterId, fields) => {
      const { error } = await supabase
        .from('characters')
        .update({ visible_fields: fields })
        .eq('id', characterId)

      if (!error) {
        set(state => ({
          characters: state.characters.map(c =>
            c.id === characterId ? { ...c, visibleFields: fields } : c
          )
        }))
      }
    },

    // ── Вступить в кампанию по коду ────────────────────────────────────
    joinCampaignByCode: async (code, userId, displayName) => {
      // Найти кампанию по коду
      const { data: campaign, error: findError } = await supabase
        .from('campaigns')
        .select('id')
        .eq('invite_code', code.toUpperCase().trim())
        .single()

      if (findError || !campaign) return 'Кампания не найдена. Проверь код.'

      // Проверить — не состоит ли уже
      const { data: existing } = await supabase
        .from('campaign_members')
        .select('id')
        .eq('campaign_id', campaign.id)
        .eq('user_id', userId)
        .single()

      if (existing) return { campaignId: campaign.id } // уже участник

      // Вступить как игрок
      const { error: joinError } = await supabase
        .from('campaign_members')
        .insert({
          campaign_id: campaign.id,
          user_id: userId,
          role: 'player',
          display_name: displayName ?? null,
        })

      if (joinError) return 'Ошибка при вступлении. Попробуй снова.'
      return { campaignId: campaign.id }
    },

    // ── ГМ: сгенерировать инвайт-код ───────────────────────────────────
    generateInviteCode: async (campaignId) => {
      const code = Math.random().toString(36).slice(2, 8).toUpperCase()

      const { error } = await supabase
        .from('campaigns')
        .update({ invite_code: code })
        .eq('id', campaignId)

      if (error) return null
      return code
    },

    // ── Внутренние: обновление стейта от Realtime ───────────────────────
    _upsertCharacter: (character) => {
      set(state => {
        const exists = state.characters.some(c => c.id === character.id)
        return {
          characters: exists
            ? state.characters.map(c => c.id === character.id ? character : c)
            : [...state.characters, character]
        }
      })
    },

    _removeCharacter: (characterId) => {
      set(state => ({ characters: state.characters.filter(c => c.id !== characterId) }))
    },
  }
})
