import { SectionTitle } from './AspectsSection'

interface RefreshSectionProps {
  refresh: number
  currentFatePoints: number
  onRefreshChange: (value: number) => void
  onFatePointsChange: (value: number) => void
}

export default function RefreshSection({ refresh, currentFatePoints, onRefreshChange, onFatePointsChange }: RefreshSectionProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <SectionTitle>Fate Points</SectionTitle>
      <div style={{
        background: 'var(--surface-2)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-around',
        gap: '16px',
      }}>
        <Counter label="Refresh" value={refresh} min={1} onChange={onRefreshChange} />
        <div style={{ width: '1px', background: 'var(--border)' }} />
        <Counter label="Текущие очки" value={currentFatePoints} min={0} onChange={onFatePointsChange} />
      </div>
    </div>
  )
}

function Counter({ label, value, min, onChange }: {
  label: string
  value: number
  min: number
  onChange: (v: number) => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <span style={{ fontSize: '12px', color: 'var(--text-dim)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          style={{
            width: '28px', height: '28px',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            background: 'var(--surface-3)',
            color: 'var(--text)',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >−</button>
        <span style={{
          fontSize: '28px',
          fontWeight: 700,
          fontFamily: 'Cinzel, serif',
          color: 'var(--accent)',
          minWidth: '32px',
          textAlign: 'center',
        }}>
          {value}
        </span>
        <button
          onClick={() => onChange(value + 1)}
          style={{
            width: '28px', height: '28px',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            background: 'var(--surface-3)',
            color: 'var(--text)',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >+</button>
      </div>
    </div>
  )
}