import type { Consequence } from '../../types'

interface ConsequenceSlotProps {
  consequence: Consequence
  onChange: (c: Consequence) => void
}

const SEVERITY_LABELS: Record<string, string> = {
  mild: 'Лёгкое (−2)',
  moderate: 'Умеренное (−4)',
  severe: 'Тяжёлое (−6)',
}

export default function ConsequenceSlot({ consequence, onChange }: ConsequenceSlotProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{
        fontSize: '12px',
        color: 'var(--text-muted)',
        width: '110px',
        flexShrink: 0,
        fontWeight: 500,
      }}>
        {SEVERITY_LABELS[consequence.severity] ?? consequence.label}
      </span>
      <input
        style={{
          flex: 1,
          background: 'var(--input-bg)',
          border: '1px solid var(--input-border)',
          borderRadius: '10px',
          padding: '8px 12px',
          fontSize: '14px',
          color: 'var(--input-text)',
          outline: 'none',
          fontFamily: 'DM Sans, sans-serif',
          transition: 'border-color 0.15s, box-shadow 0.15s',
        }}
        placeholder="Пусто"
        value={consequence.value}
        onChange={e => onChange({ ...consequence, value: e.target.value })}
        onFocus={e => {
          e.target.style.borderColor = 'var(--input-border-focus)'
          e.target.style.boxShadow = 'var(--input-shadow-focus)'
        }}
        onBlur={e => {
          e.target.style.borderColor = 'var(--input-border)'
          e.target.style.boxShadow = 'none'
        }}
      />
    </div>
  )
}