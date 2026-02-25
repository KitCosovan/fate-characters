import { systemsList } from '../../data'
// Удали эти две строки:
// import { fateCoreConfig } from '../../data/fateCore'
// import { fateAcceleratedConfig } from '../../data/fateAccelerated'
import { Card, Badge } from '../ui'

const systemDescriptions: Record<string, { icon: string; details: string[] }> = {
  'fate-core': {
    icon: '⚔️',
    details: ['18 навыков', 'Пирамида до +4', '5 аспектов', 'До 5 трюков'],
  },
  'fate-accelerated': {
    icon: '⚡',
    details: ['6 подходов', 'Рейтинги подходов', '5 аспектов', 'До 3 трюков'],
  },
  'book-of-ashes': {
    icon: '🔥',
    details: ['20 навыков', 'Пирамида до +3', 'Шрамы', '6 слотов снаряжения'],
  },
}

interface SystemSelectorProps {
  selected: string
  onSelect: (systemId: string) => void
}

export default function SystemSelector({ selected, onSelect }: SystemSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-bold text-gray-800">Система</h2>
      <div className="flex flex-col gap-3">
        {systemsList.map(system => {
          const meta = systemDescriptions[system.id]
          const isSelected = selected === system.id
          return (
            <Card
              key={system.id}
              onClick={() => onSelect(system.id)}
              className={`transition-all ${isSelected ? 'ring-2 ring-indigo-500 border-indigo-200' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{meta?.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-800">{system.name}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {meta?.details.map(d => (
                        <Badge key={d} variant="default">{d}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                {isSelected && <Badge variant="accent">✓ Выбрано</Badge>}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}