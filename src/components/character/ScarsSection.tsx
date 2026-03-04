import type { Scar } from '../../types'
import { SectionTitle } from './AspectsSection'

interface ScarsSectionProps {
  scars: Scar[]
  maxScars: number
  onChange: (scars: Scar[]) => void
}

const SCAR_LABELS = ['Шрам 1', 'Шрам 2', 'Шрам 3']

export default function ScarsSection({ scars, maxScars, onChange }: ScarsSectionProps) {
  const updateScar = (index: number, value: string) => {
    onChange(scars.map((s, i) => i === index ? { ...s, value } : s))
  }

  const filledCount = scars.filter(s => s.value.trim()).length

  const inputStyle = {
    background: 'var(--input-bg)',
    border: '1px solid var(--input-border)',
    borderRadius: '8px',
    padding: '8px 12px',
    fontSize: '14px',
    color: 'var(--input-text)',
    outline: 'none',
    width: '100%',
    fontFamily: 'DM Sans, sans-serif',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <SectionTitle>Шрамы</SectionTitle>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{filledCount} / {maxScars}</span>
          {filledCount >= maxScars && (
            <span style={{
              fontSize: '11px', background: 'var(--accent-glow)', color: 'var(--accent)',
              border: '1px solid var(--border-accent)', padding: '2px 8px', borderRadius: '20px', fontWeight: 600,
            }}>
              ⚠️ Четвёртый — конец
            </span>
          )}
        </div>
      </div>

      <div style={{
        background: 'var(--accent-glow)', border: '1px solid var(--border-accent)',
        borderRadius: '12px', padding: '12px', fontSize: '12px', color: 'var(--text-dim)', lineHeight: 1.5,
      }}>
        Шрам заменяет аспект персонажа навсегда. При 4-м шраме персонаж становится Тьмой.
        Шрамы игнорируют правило одного бонуса — каждый даёт +2 независимо.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {Array.from({ length: maxScars }).map((_, i) => {
          const scar = scars[i]
          const filled = Boolean(scar?.value)
          return (
            <div key={i} style={{
              background: 'var(--surface)',
              border: `1px solid ${filled ? 'var(--border-accent)' : 'var(--border)'}`,
              borderRadius: '12px', padding: '12px',
              display: 'flex', flexDirection: 'column', gap: '8px',
              transition: 'border-color 0.15s',
            }}>
              <span style={{
                fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px',
                background: filled ? 'var(--accent-glow)' : 'var(--surface-2)',
                color: filled ? 'var(--accent)' : 'var(--text-muted)',
                border: `1px solid ${filled ? 'var(--border-accent)' : 'var(--border)'}`,
                alignSelf: 'flex-start',
              }}>
                {SCAR_LABELS[i]}
              </span>
              <input
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = 'var(--input-border-focus)'; e.target.style.boxShadow = 'var(--input-shadow-focus)' }}
                onBlur={e => { e.target.style.borderColor = 'var(--input-border)'; e.target.style.boxShadow = 'none' }}
                placeholder='«Я [описание], поэтому [бонус], но [обратная сторона]»'
                value={scar?.value ?? ''}
                onChange={e => updateScar(i, e.target.value)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}