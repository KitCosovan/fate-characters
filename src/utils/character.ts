import type { Character, Consequence, StressTrack, SystemConfig, Scar, EquipmentSlot } from '../types'
import { fateCoreConfig } from '../data/fateCore'
import { fateAcceleratedConfig } from '../data/fateAccelerated'
import { bookOfAshesConfig } from '../data/bookOfAshes'

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export const createEmptyCharacter = (systemConfig: SystemConfig, isNpc = false): Character => {
  const stressTracks: StressTrack[] = systemConfig.stressTracks.map(track => ({
    trackId: track.id,
    boxes: Array.from({ length: track.boxes }, (_, i) => ({
      index: i,
      checked: false,
    })),
  }))

  const consequences: Consequence[] = [
    { severity: 'mild', label: 'Лёгкое', value: '' },
    { severity: 'moderate', label: 'Умеренное', value: '' },
    { severity: 'severe', label: 'Тяжёлое', value: '' },
  ]

  const scars: Scar[] = systemConfig.hasScars
    ? Array.from({ length: systemConfig.maxScars ?? 3 }, () => ({
      id: generateId(),
      value: '',
      replacedAspectId: '',
    }))
    : []

  const equipment: EquipmentSlot[] = systemConfig.hasEquipment
    ? Array.from({ length: systemConfig.equipmentSlots ?? 6 }, () => ({
      id: generateId(),
      name: '',
      slots: 1,
      freeInvokes: 0,
      type: 'empty' as const,
    }))
    : []

  return {
    id: generateId(),
    systemId: systemConfig.id,
    name: '',
    description: '',
    aspects: systemConfig.aspectSlots.map(slot => ({
      slotId: slot.id,
      value: '',
    })),
    skills: [],
    stunts: [],
    stressTracks,
    consequences,
    scars,
    equipment,
    refresh: systemConfig.refreshDefault,
    currentFatePoints: systemConfig.refreshDefault,
    isNpc,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export const getSystemConfig = (systemId: string): SystemConfig => {
  switch (systemId) {
    case 'fate-accelerated': return fateAcceleratedConfig
    case 'book-of-ashes': return bookOfAshesConfig
    case 'fate-core':
    default: return fateCoreConfig
  }
}