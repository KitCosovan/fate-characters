import type { StressTrack as StressTrackType, Consequence } from '../../types'
import type { StressTrackConfig } from '../../types'
import StressTrack from './StressTrack'
import ConsequenceSlot from './ConsequenceSlot'

interface StressSectionProps {
  stressTracks: StressTrackType[]
  stressConfig: StressTrackConfig[]
  consequences: Consequence[]
  onStressChange: (tracks: StressTrackType[]) => void
  onConsequenceChange: (consequences: Consequence[]) => void
}

export default function StressSection({
  stressTracks,
  stressConfig,
  consequences,
  onStressChange,
  onConsequenceChange,
}: StressSectionProps) {
  const updateTrack = (updated: StressTrackType) => {
    onStressChange(stressTracks.map(t => t.trackId === updated.trackId ? updated : t))
  }

  const updateConsequence = (updated: Consequence) => {
    onConsequenceChange(consequences.map(c => c.severity === updated.severity ? updated : c))
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-gray-800">Стресс и последствия</h2>

      <div className="flex flex-col gap-3">
        {stressTracks.map(track => {
          const config = stressConfig.find(c => c.id === track.trackId)
          return (
            <StressTrack
              key={track.trackId}
              track={track}
              label={config?.label ?? track.trackId}
              onChange={updateTrack}
            />
          )
        })}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-gray-700">Последствия</p>
        {consequences.map(c => (
          <ConsequenceSlot key={c.severity} consequence={c} onChange={updateConsequence} />
        ))}
      </div>
    </div>
  )
}