// src/components/character/AspectInput.tsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { AspectSlot } from '../../types'
import { Textarea } from '../ui'
import { useAspectExamples } from '../../hooks/useAspectExamples'

interface AspectInputProps {
  slot: AspectSlot
  value: string
  onChange: (value: string) => void
}

export default function AspectInput({ slot, value, onChange }: AspectInputProps) {
  const { t } = useTranslation()
  const aspectExamples = useAspectExamples()
  const [showExamples, setShowExamples] = useState(false)
  const examples = aspectExamples[slot.id]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <Textarea
        label={slot.label}
        placeholder={slot.placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={2}
        hint={slot.required ? t('sections.required_aspect') : undefined}
      />

      {examples && (
        <div>
          <button
            type="button"
            onClick={() => setShowExamples(v => !v)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '4px',
              padding: '2px 0', fontFamily: 'DM Sans, sans-serif',
              fontSize: '11px', fontWeight: 600,
              color: showExamples ? 'var(--accent)' : 'var(--text-muted)',
              transition: 'color 0.15s',
            }}
          >
            <span style={{ display: 'inline-block', transform: showExamples ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.15s', fontSize: '10px' }}>▶</span>
            {t('sections.examples')}
          </button>

          {showExamples && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '6px', animation: 'fadeUp 0.15s ease' }}>
              {examples.map((ex, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { onChange(ex); setShowExamples(false) }}
                  style={{
                    background: 'var(--surface-2)', border: '1px solid var(--border)',
                    borderRadius: '8px', padding: '7px 12px', cursor: 'pointer',
                    textAlign: 'left', fontFamily: 'DM Sans, sans-serif',
                    fontSize: '12px', color: 'var(--text-dim)', transition: 'all 0.15s', lineHeight: 1.4,
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border-accent)'; el.style.color = 'var(--text)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.color = 'var(--text-dim)' }}
                >
                  {ex}
                </button>
              ))}
              <p style={{ fontSize: '10px', color: 'var(--text-muted)', margin: '2px 0 0', fontStyle: 'italic' }}>
                {t('sections.examples_hint')}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
