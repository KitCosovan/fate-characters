import type { AspectSlot } from '../../types'
import { Textarea } from '../ui'

interface AspectInputProps {
  slot: AspectSlot
  value: string
  onChange: (value: string) => void
}

export default function AspectInput({ slot, value, onChange }: AspectInputProps) {
  return (
    <Textarea
      label={slot.label}
      placeholder={slot.placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      rows={2}
      hint={slot.required ? 'Обязательный аспект' : undefined}
    />
  )
}