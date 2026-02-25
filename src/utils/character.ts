import type { Character, Consequence, StressTrack } from '../types'
import type { SystemConfig } from '../types'
import { fateCoreConfig } from '../data/fateCore'
import { fateAcceleratedConfig } from '../data/fateAccelerated'

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
    case 'fate-core':
    default: return fateCoreConfig
  }
}