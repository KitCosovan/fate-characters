import { npcTemplates } from '../../data/npcTemplates'
import type { NpcTemplate } from '../../types'
import { Card } from '../ui'

interface NpcTemplateSelectorProps {
  onSelect: (template: NpcTemplate) => void
  onSkip: () => void
}

export default function NpcTemplateSelector({ onSelect, onSkip }: NpcTemplateSelectorProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-bold text-gray-800">Выбери шаблон</h2>
        <p className="text-sm text-gray-400 mt-1">Или начни с чистого листа</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {npcTemplates.map(template => (
          <Card key={template.id} onClick={() => onSelect(template)} className="flex flex-col gap-1">
            <p className="font-semibold text-gray-800 text-sm">{template.name}</p>
            <p className="text-xs text-gray-400">{template.description}</p>
          </Card>
        ))}
      </div>

      <button
        onClick={onSkip}
        className="text-sm text-indigo-600 hover:underline text-center py-2"
      >
        Начать с пустого НПС →
      </button>
    </div>
  )
}