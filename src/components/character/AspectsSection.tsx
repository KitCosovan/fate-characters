import type { Aspect, AspectSlot } from '../../types'
import AspectInput from './AspectInput'

interface AspectsSectionProps {
  slots: AspectSlot[]
  aspects: Aspect[]
  onChange: (aspects: Aspect[]) => void
}

export default function AspectsSection({ slots, aspects, onChange }: AspectsSectionProps) {
  const handleChange = (slotId: string, value: string) => {
    const updated = aspects.map(a => a.slotId === slotId ? { ...a, value } : a)
    onChange(updated)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <SectionTitle>Аспекты</SectionTitle>
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
      fontFamily: 'Cinzel, serif',
      fontSize: '13px',
      fontWeight: 700,
      color: 'var(--accent)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      margin: 0,
      paddingBottom: '10px',
      borderBottom: '1px solid var(--border)',
    }}>
      {children}
    </h2>
  )
}