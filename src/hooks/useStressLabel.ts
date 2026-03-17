// src/hooks/useStressLabel.ts
import { useTranslation } from 'react-i18next'

export function useStressLabel(): (trackIdOrLabel: string) => string {
  const { t } = useTranslation()

  return (trackIdOrLabel: string): string => {
    if (trackIdOrLabel === 'physical') return t('stress_tracks.physical')
    if (trackIdOrLabel === 'mental')   return t('stress_tracks.mental')
    if (trackIdOrLabel.toLowerCase().includes('физическ') || trackIdOrLabel.toLowerCase().includes('physical')) return t('stress_tracks.physical')
    if (trackIdOrLabel.toLowerCase().includes('ментальн') || trackIdOrLabel.toLowerCase().includes('mental'))  return t('stress_tracks.mental')
    if (trackIdOrLabel.toLowerCase().includes('стресс') || trackIdOrLabel.toLowerCase().includes('stress')) return t('stress_tracks.stress_only')
    return trackIdOrLabel
  }
}