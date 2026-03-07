// src/types/Character.ts

export interface Aspect {
  slotId: string
  value: string
}

export interface Skill {
  skillId: string
  rating: number
}

export interface Stunt {
  id: string
  name: string
  description: string
}

export interface StressBox {
  index: number
  checked: boolean
}

export interface StressTrack {
  trackId: string
  boxes: StressBox[]
}

export interface Consequence {
  severity: 'mild' | 'moderate' | 'severe' | 'extreme'
  label: string
  value: string
}

export interface Scar {
  id: string
  value: string
  replacedAspectId: string
}

export interface EquipmentSlot {
  id: string
  name: string
  slots: number
  freeInvokes: number
  type: 'weapon' | 'armor' | 'resource' | 'relic' | 'empty'
}

export type NpcVisibleField = 'concept' | 'aspects' | 'skills' | 'stress' | 'consequences' | 'stunts'

export interface Character {
  id: string
  systemId: string
  name: string
  description?: string
  aspects: Aspect[]
  skills: Skill[]
  stunts: Stunt[]
  stressTracks: StressTrack[]
  consequences: Consequence[]
  scars: Scar[]
  equipment: EquipmentSlot[]
  refresh: number
  currentFatePoints: number
  isNpc: boolean
  createdAt: string
  updatedAt: string
  notes?: string
  campaignId?: string
  ownerId?: string
  visibleToPlayers?: boolean
  visibleFields?: NpcVisibleField[]
}

export interface NpcTemplate {
  id: string
  name: string
  description: string
  character: Omit<Character, 'id' | 'createdAt' | 'updatedAt'>
}

export type CampaignRole = 'gm' | 'player'

export interface CampaignMember {
  id: string
  campaignId: string
  userId: string
  role: CampaignRole
  displayName?: string
  joinedAt: string
}

export interface Campaign {
  id: string
  name: string
  description?: string
  systemId: string
  color: string
  userRole: CampaignRole
  inviteCode?: string
  gmId?: string
  createdAt: string
  updatedAt: string
}
