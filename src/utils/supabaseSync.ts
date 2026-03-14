// src/utils/supabaseSync.ts
import { supabase } from '../lib/supabase'
import type { Character, Campaign } from '../types'

// ── CHARACTERS ────────────────────────────────────────────────────────

export async function fetchRemoteCharacters(userId: string): Promise<Character[]> {
  const { data, error } = await supabase
    .from('characters')
    .select('data, updated_at')
    .eq('user_id', userId)

  if (error) { console.error('fetchRemoteCharacters:', error); return [] }
  return (data ?? []).map(row => row.data as Character)
}

// Получить одного персонажа из Supabase по id (для просмотра чужих)
export async function fetchRemoteCharacterById(id: string): Promise<Character | null> {
  const { data, error } = await supabase
    .from('characters')
    .select('data, visible_to_players, visible_fields, user_id')
    .eq('id', id)
    .single()

  if (error || !data) return null

  return {
    ...(data.data as Character),
    ownerId: data.user_id,
    visibleToPlayers: data.visible_to_players,
    visibleFields: data.visible_fields ?? [],
  }
}

export async function upsertRemoteCharacter(character: Character, userId: string): Promise<void> {
  const { error } = await supabase
    .from('characters')
    .upsert({
      id: character.id,
      user_id: userId,
      data: character,
      updated_at: character.updatedAt,
      campaign_id: character.campaignId ?? null,
      // НПС по умолчанию скрыты, игроки всегда видны
      visible_to_players: character.isNpc
        ? (character.visibleToPlayers ?? false)
        : true,
    }, { onConflict: 'id' })

  if (error) console.error('upsertRemoteCharacter:', error)
}

export async function deleteRemoteCharacter(id: string): Promise<void> {
  const { error } = await supabase.from('characters').delete().eq('id', id)
  if (error) console.error('deleteRemoteCharacter:', error)
}

// ── CAMPAIGNS ─────────────────────────────────────────────────────────

export async function fetchRemoteCampaigns(userId: string): Promise<Campaign[]> {
  const { data, error } = await supabase
    .from('campaigns')
    .select('data, updated_at')
    .eq('user_id', userId)

  if (error) { console.error('fetchRemoteCampaigns:', error); return [] }
  return (data ?? []).map(row => row.data as Campaign)
}

export async function upsertRemoteCampaign(campaign: Campaign, userId: string): Promise<void> {
  const { error } = await supabase
    .from('campaigns')
    .upsert({
      id: campaign.id,
      user_id: userId,
      data: campaign,
      updated_at: campaign.updatedAt,
    }, { onConflict: 'id' })

  if (error) console.error('upsertRemoteCampaign:', error)
}

export async function deleteRemoteCampaign(id: string): Promise<void> {
  const { error } = await supabase.from('campaigns').delete().eq('id', id)
  if (error) console.error('deleteRemoteCampaign:', error)
}

// Получить всех персонажей кампании (включая чужих) для CampaignsTab
export async function fetchCampaignCharacters(campaignId: string): Promise<Character[]> {
  const { data, error } = await supabase
    .from('characters')
    .select('data, visible_to_players, visible_fields, user_id')
    .eq('campaign_id', campaignId)

  if (error) { console.error('fetchCampaignCharacters:', error); return [] }

  return (data ?? []).map(row => ({
    ...(row.data as Character),
    ownerId: row.user_id,
    visibleToPlayers: row.visible_to_players,
    visibleFields: row.visible_fields ?? [],
  }))
}

// ── MERGE ─────────────────────────────────────────────────────────────

export function mergeCharacters(local: Character[], remote: Character[]): Character[] {
  const map = new Map<string, Character>()
  for (const c of local) map.set(c.id, c)
  for (const c of remote) {
    const existing = map.get(c.id)
    if (!existing || new Date(c.updatedAt) > new Date(existing.updatedAt)) {
      map.set(c.id, c)
    }
  }
  return Array.from(map.values())
}

export function mergeCampaigns(local: Campaign[], remote: Campaign[]): Campaign[] {
  const map = new Map<string, Campaign>()
  for (const c of local) map.set(c.id, c)
  for (const c of remote) {
    const existing = map.get(c.id)
    if (!existing || new Date(c.updatedAt) > new Date(existing.updatedAt)) {
      map.set(c.id, c)
    }
  }
  return Array.from(map.values())
}
