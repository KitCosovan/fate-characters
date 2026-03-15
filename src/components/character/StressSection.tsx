// src/components/character/StressSection.tsx
import { useTranslation } from 'react-i18next'
import type { StressTrack as StressTrackType, Consequence, StressTrackConfig } from '../../types'
import StressTrack from './StressTrack'
import ConsequenceSlot from './ConsequenceSlot'
import { SectionTitle } from './AspectsSection'
import { useStressLabel } from '../../hooks/useStressLabel'

interface StressSectionProps {
  stressTracks: StressTrackType[]
  stressConfig: StressTrackConfig[]
  consequences: Consequence[]
  onStressChange: (tracks: StressTrackType[]) => void
  onConsequenceChange: (consequences: Consequence[]) => void
}

export default function StressSection({ stressTracks, stressConfig, consequences, onStressChange, onConsequenceChange }: StressSectionProps) {
  const { t } = useTranslation()
  const getLabel = useStressLabel

  const updateTrack = (updated: StressTrackType) => {
    onStressChange(stressTracks.map(tr => tr.trackId === updated.trackId ? updated : tr))
  }
  const updateConsequence = (updated: Consequence) => {
    onConsequenceChange(consequences.map(c => c.severity === updated.severity ? updated : c))
  }

  return (
    <div className="flex flex-col gap-4">
      <SectionTitle>{t('stress_section.title')}</SectionTitle>
      <div className="flex flex-col gap-3">
        {stressTracks.map(track => {
          const config = stressConfig.find(c => c.id === track.trackId)
          return <StressTrack key={track.trackId} track={track} label={getLabel(config?.id ?? config?.label ?? track.trackId)} onChange={updateTrack} />
        })}
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-gray-700">{t('stress_section.consequences_label')}</p>
        {consequences.map(c => (
          <ConsequenceSlot key={c.severity} consequence={c} onChange={updateConsequence} />
        ))}
      </div>
    </div>
  )
}
