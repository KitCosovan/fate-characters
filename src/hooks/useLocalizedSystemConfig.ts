// src/hooks/useLocalizedSystemConfig.ts
// Заменяет label/placeholder аспектов в SystemConfig на переведённые
import { useTranslation } from 'react-i18next'
import { getSystemConfig } from '../utils'
import type { SystemConfig } from '../types'

export function useLocalizedSystemConfig(systemId: string): SystemConfig {
  const { t, i18n } = useTranslation()
  const config = getSystemConfig(systemId)

  // Только при английском языке заменяем метки
  if (!i18n.language.startsWith('en')) return config

  return {
    ...config,
    aspectSlots: config.aspectSlots.map(slot => {
      const localized = t(`aspect_slots.${slot.id}`, { returnObjects: true }) as { label?: string; placeholder?: string } | string
      if (typeof localized === 'object' && localized.label) {
        return {
          ...slot,
          label:       localized.label,
          placeholder: localized.placeholder ?? slot.placeholder,
        }
      }
      return slot
    }),
  }
}
