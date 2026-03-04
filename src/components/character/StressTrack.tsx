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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-dim)', margin: 0 }}>{label}</p>
      <div style={{ display: 'flex', gap: '8px' }}>
        {track.boxes.map(box => (
          <button
            key={box.index}
            onClick={() => toggle(box.index)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              border: box.checked ? '2px solid var(--accent)' : '2px solid var(--border)',
              background: box.checked ? 'var(--accent)' : 'var(--surface-2)',
              color: box.checked ? 'var(--bg)' : 'var(--text-muted)',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              fontFamily: 'DM Sans, sans-serif',
            }}
            onMouseEnter={e => {
              if (!box.checked) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-accent)'
            }}
            onMouseLeave={e => {
              if (!box.checked) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
            }}
          >
            {box.index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}