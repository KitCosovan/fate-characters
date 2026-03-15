// src/components/character/ScarsSection.tsx
import { useTranslation } from 'react-i18next'
import type { Scar } from '../../types'
import { SectionTitle } from './AspectsSection'

interface ScarsSectionProps {
  scars: Scar[]
  maxScars: number
  onChange: (scars: Scar[]) => void
}

export default function ScarsSection({ scars, maxScars, onChange }: ScarsSectionProps) {
  const { t } = useTranslation()

  const updateScar = (index: number, value: string) => {
    onChange(scars.map((s, i) => i === index ? { ...s, value } : s))
  }

  const filledCount = scars.filter(s => s.value.trim()).length

  const inputStyle = {
    background: 'var(--input-bg)', border: '1px solid var(--input-border)',
    borderRadius: '8px', padding: '8px 12px', fontSize: '14px',
    color: 'var(--input-text)', outline: 'none', width: '100%', fontFamily: 'DM Sans, sans-serif',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <SectionTitle>{t('scars.label')}</SectionTitle>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{filledCount} / {maxScars}</span>
          {filledCount >= maxScars && (
            <span style={{
              fontSize: '11px', background: 'var(--accent-glow)', color: 'var(--accent)',
              border: '1px solid var(--border-accent)', padding: '2px 8px', borderRadius: '20px', fontWeight: 600,
            }}>
              {t('scars.warning')}
            </span>
          )}
        </div>
      </div>

      <div style={{
        background: 'var(--accent-glow)', border: '1px solid var(--border-accent)',
        borderRadius: '12px', padding: '12px', fontSize: '12px', color: 'var(--text-dim)', lineHeight: 1.5,
      }}>
        {t('scars.hint')}
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
              display: 'flex', flexDirection: 'column', gap: '8px', transition: 'border-color 0.15s',
            }}>
              <span style={{
                fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px',
                background: filled ? 'var(--accent-glow)' : 'var(--surface-2)',
                color: filled ? 'var(--accent)' : 'var(--text-muted)',
                border: `1px solid ${filled ? 'var(--border-accent)' : 'var(--border)'}`,
                alignSelf: 'flex-start',
              }}>
                {t('scars.scar_n', { n: i + 1 })}
              </span>
              <input
                style={inputStyle}
                placeholder={t('scars.placeholder')}
                value={scar?.value ?? ''}
                onChange={e => updateScar(i, e.target.value)}
                onFocus={e => { e.target.style.borderColor = 'var(--input-border-focus)'; e.target.style.boxShadow = 'var(--input-shadow-focus)' }}
                onBlur={e => { e.target.style.borderColor = 'var(--input-border)'; e.target.style.boxShadow = 'none' }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
