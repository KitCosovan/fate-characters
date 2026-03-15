// src/components/character/ApproachesSection.tsx
import { useTranslation } from 'react-i18next'
import type { Skill, SkillDefinition } from '../../types'
import { SectionTitle } from './AspectsSection'
import { useLocalizedSkillName } from '../../hooks/useLocalizedSkillName'

interface ApproachesSectionProps {
  approaches: SkillDefinition[]
  selected: Skill[]
  onChange: (skills: Skill[]) => void
}

export default function ApproachesSection({ approaches, selected, onChange }: ApproachesSectionProps) {
  const { t } = useTranslation()
  const localizeSkillName = useLocalizedSkillName()

  const RATING_LABELS: Record<number, string> = {
    3: t('sections.rating_3'),
    2: t('sections.rating_2'),
    1: t('sections.rating_1'),
    0: t('sections.rating_0'),
  }
  const RATING_COLORS: Record<number, string> = {
    3: 'bg-yellow-100 text-yellow-800',
    2: 'bg-indigo-100 text-indigo-700',
    1: 'bg-blue-100 text-blue-700',
    0: 'bg-gray-100 text-gray-500',
  }

  const getRating = (skillId: string) => selected.find(s => s.skillId === skillId)?.rating ?? 0

  const handleChange = (skillId: string, rating: number) => {
    const without = selected.filter(s => s.skillId !== skillId)
    onChange([...without, { skillId, rating }])
  }

  return (
    <div className="flex flex-col gap-3">
      <SectionTitle>{t('sections.approaches')}</SectionTitle>
      <p className="text-xs text-gray-400">{t('sections.approaches_hint')}</p>
      <div className="flex flex-col gap-2">
        {approaches.map(approach => {
          const rating = getRating(approach.id)
          return (
            <div key={approach.id} className="flex items-center gap-3">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{localizeSkillName(approach.id, approach.name)}</p>
                {approach.description && (
                  <p className="text-xs text-gray-400">{approach.description}</p>
                )}
              </div>
              <select
                value={rating}
                onChange={e => handleChange(approach.id, Number(e.target.value))}
                className={`border rounded-lg px-2 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-400 ${RATING_COLORS[rating]}`}
              >
                {[0, 1, 2, 3].map(r => (
                  <option key={r} value={r}>{RATING_LABELS[r]}</option>
                ))}
              </select>
            </div>
          )
        })}
      </div>
    </div>
  )
}
