import type { Stunt } from '../../types'
import { Button } from '../ui'

interface StuntCardProps {
  stunt: Stunt
  onRemove: () => void
  onChange: (stunt: Stunt) => void
}

export default function StuntCard({ stunt, onRemove, onChange }: StuntCardProps) {
  return (
    <div className="border border-gray-200 rounded-xl p-3 flex flex-col gap-2 bg-gray-50">
      <div className="flex items-center gap-2">
        <input
          className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Название трюка"
          value={stunt.name}
          onChange={e => onChange({ ...stunt, name: e.target.value })}
        />
        <Button variant="danger" size="sm" onClick={onRemove}>✕</Button>
      </div>
      <textarea
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Описание: что даёт этот трюк?"
        rows={2}
        value={stunt.description}
        onChange={e => onChange({ ...stunt, description: e.target.value })}
      />
    </div>
  )
}