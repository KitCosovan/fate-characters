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
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-gray-800">Аспекты</h2>
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