// src/hooks/useStressLabel.ts
import { useTranslation } from 'react-i18next'

// Переводит trackId или label из конфига в локализованную строку
export function useStressLabel(trackIdOrLabel: string): string {
  const { t } = useTranslation()
  // Стандартные id: physical, mental; FAE использует просто 'physical' с label 'Стресс'
  if (trackIdOrLabel === 'physical') return t('stress_tracks.physical')
  if (trackIdOrLabel === 'mental')   return t('stress_tracks.mental')
  // Fallback — строка из конфига (русская метка)
  // Попытаемся сматчить по ключу
  if (trackIdOrLabel.toLowerCase().includes('физическ') || trackIdOrLabel.toLowerCase().includes('physical')) return t('stress_tracks.physical')
  if (trackIdOrLabel.toLowerCase().includes('ментальн') || trackIdOrLabel.toLowerCase().includes('mental'))  return t('stress_tracks.mental')
  // FAE — один трек "Стресс"
  if (trackIdOrLabel.toLowerCase().includes('стресс') || trackIdOrLabel.toLowerCase().includes('stress')) return t('stress_tracks.stress_only')
  return trackIdOrLabel
}
