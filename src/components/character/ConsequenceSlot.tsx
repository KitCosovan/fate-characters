import type { Consequence } from '../../types'

interface ConsequenceSlotProps {
  consequence: Consequence
  onChange: (c: Consequence) => void
}

const SEVERITY_LABELS: Record<string, string> = {
  mild: 'Лёгкое (-2)',
  moderate: 'Умеренное (-4)',
  severe: 'Тяжёлое (-6)',
}

export default function ConsequenceSlot({ consequence, onChange }: ConsequenceSlotProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 w-28 shrink-0">
        {SEVERITY_LABELS[consequence.severity] ?? consequence.label}
      </span>
      <input
        className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Пусто"
        value={consequence.value}
        onChange={e => onChange({ ...consequence, value: e.target.value })}
      />
    </div>
  )
}