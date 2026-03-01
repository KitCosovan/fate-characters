export interface Aspect {
  slotId: string
  value: string
}

export interface Skill {
  skillId: string
  rating: number       // +1, +2, +3, +4
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
  refresh: number
  currentFatePoints: number
  isNpc: boolean
  createdAt: string
  updatedAt: string
}

export interface NpcTemplate {
  id: string
  name: string
  description: string
  character: Omit<Character, 'id' | 'createdAt' | 'updatedAt'>
}

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
  value: string        // описание шрама
  replacedAspectId: string  // какой аспект заменил
}

export interface EquipmentSlot {
  id: string
  name: string         // название предмета / аспект
  slots: number        // сколько слотов занимает
  freeInvokes: number  // бесплатные призывы
  type: 'weapon' | 'armor' | 'resource' | 'relic' | 'empty'
}

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
}

export interface NpcTemplate {
  id: string
  name: string
  description: string
  character: Omit<Character, 'id' | 'createdAt' | 'updatedAt'>
}