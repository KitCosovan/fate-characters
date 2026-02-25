export type SkillMode = 'pyramid' | 'approaches' | 'columns'

export interface AspectSlot {
  id: string
  label: string
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
  label: string
  boxes: number
}

export interface PyramidLevel {
  rating: number
  count: number
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
  freeAspects: number
  pyramidLevels?: PyramidLevel[]   // если не указано — стандартная пирамида Core
  hasScars?: boolean               // шрамы (Книга Пепла)
  maxScars?: number
  hasEquipment?: boolean           // снаряжение (Книга Пепла)
  equipmentSlots?: number
}