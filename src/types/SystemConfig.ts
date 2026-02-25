export type SkillMode = 'pyramid' | 'approaches' | 'columns'

export interface AspectSlot {
  id: string
  label: string        // "High Concept", "Trouble" и т.д.
  required: boolean
  placeholder?: string
}

export interface SkillDefinition {
  id: string
  name: string
  description?: string
}

export interface StressTrackConfig {
  id: string
  label: string        // "Physical", "Mental"
  boxes: number
}

export interface SystemConfig {
  id: string
  name: string
  description: string
  skillMode: SkillMode
  aspectSlots: AspectSlot[]
  skills: SkillDefinition[]
  stressTracks: StressTrackConfig[]
  maxStunts: number
  refreshDefault: number
  freeAspects: number  // количество свободных аспектов сверх обязательных
}