// src/components/character/AspectsSection.tsx
import { useTranslation } from 'react-i18next'
import type { Aspect, AspectSlot } from '../../types'
import AspectInput from './AspectInput'

interface AspectsSectionProps {
  slots: AspectSlot[]
  aspects: Aspect[]
  onChange: (aspects: Aspect[]) => void
}

export default function AspectsSection({ slots, aspects, onChange }: AspectsSectionProps) {
  const { t } = useTranslation()

  const handleChange = (slotId: string, value: string) => {
    onChange(aspects.map(a => a.slotId === slotId ? { ...a, value } : a))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <SectionTitle>{t('sections.aspects')}</SectionTitle>
      {slots.map(slot => (
        <AspectInput
          key={slot.id}
          slot={slot}
          value={aspects.find(a => a.slotId === slot.id)?.value ?? ''}
          onChange={value => handleChange(slot.id, value)}
        />
      ))}
    </div>
  )
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: 'Cinzel, serif', fontSize: '13px', fontWeight: 700,
      color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase',
      margin: 0, paddingBottom: '10px', borderBottom: '1px solid var(--border)',
    }}>
      {children}
    </h2>
  )
}
