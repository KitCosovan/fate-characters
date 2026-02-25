import type { Stunt } from '../../types'
import { Button } from '../ui'
import StuntCard from './StuntCard'
import { generateId } from '../../utils'

interface StuntsSectionProps {
  stunts: Stunt[]
  maxStunts: number
  onChange: (stunts: Stunt[]) => void
}

export default function StuntsSection({ stunts, maxStunts, onChange }: StuntsSectionProps) {
  const addStunt = () => {
    if (stunts.length >= maxStunts) return
    onChange([...stunts, { id: generateId(), name: '', description: '' }])
  }

  const removeStunt = (id: string) => onChange(stunts.filter(s => s.id !== id))

  const updateStunt = (updated: Stunt) => onChange(stunts.map(s => s.id === updated.id ? updated : s))

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">Трюки</h2>
        <span className="text-sm text-gray-400">{stunts.length} / {maxStunts}</span>
      </div>
      {stunts.map(stunt => (
        <StuntCard
          key={stunt.id}
          stunt={stunt}
          onRemove={() => removeStunt(stunt.id)}
          onChange={updateStunt}
        />
      ))}
      {stunts.length < maxStunts && (
        <Button variant="secondary" onClick={addStunt}>+ Добавить трюк</Button>
      )}
    </div>
  )
}