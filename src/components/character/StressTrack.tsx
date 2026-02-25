import type { StressTrack as StressTrackType, StressBox } from '../../types'

interface StressTrackProps {
  track: StressTrackType
  label: string
  onChange: (track: StressTrackType) => void
}

export default function StressTrack({ track, label, onChange }: StressTrackProps) {
  const toggle = (index: number) => {
    const boxes: StressBox[] = track.boxes.map(b =>
      b.index === index ? { ...b, checked: !b.checked } : b
    )
    onChange({ ...track, boxes })
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-gray-700">{label}</p>
      <div className="flex gap-2">
        {track.boxes.map(box => (
          <button
            key={box.index}
            onClick={() => toggle(box.index)}
            className={`w-8 h-8 rounded-lg border-2 text-sm font-bold transition-colors
              ${box.checked
                ? 'bg-indigo-600 border-indigo-600 text-white'
                : 'border-gray-300 text-gray-400 hover:border-indigo-400'
              }`}
          >
            {box.index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}