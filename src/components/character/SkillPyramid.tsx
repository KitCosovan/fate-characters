// src/components/character/SkillPyramid.tsx
import { useTranslation } from 'react-i18next'
import type { Skill, SkillDefinition, PyramidLevel } from '../../types'
import SkillRatingBadge from './SkillRatingBadge'
import SkillSelector from './SkillSelector'
import { SectionTitle } from './AspectsSection'
import { useLocalizedSkillName } from '../../hooks/useLocalizedSkillName'

const DEFAULT_PYRAMID: PyramidLevel[] = [
  { rating: 4, count: 1 }, { rating: 3, count: 2 },
  { rating: 2, count: 3 }, { rating: 1, count: 4 },
]

interface SkillPyramidProps {
  skills: SkillDefinition[]
  selected: Skill[]
  onChange: (skills: Skill[]) => void
  pyramidLevels?: PyramidLevel[]
}

export default function SkillPyramid({ skills, selected, onChange, pyramidLevels }: SkillPyramidProps) {
  const { t } = useTranslation()
  const localizeSkillName = useLocalizedSkillName()
  const pyramid = pyramidLevels ?? DEFAULT_PYRAMID
  const usedSkillIds = selected.map(s => s.skillId).filter(Boolean)

  // Localize skill names for display in selector
  const localizedSkills = skills.map(s => ({
    ...s,
    name: localizeSkillName(s.id, s.name),
  }))

  const getSkillAt = (rating: number, index: number) => {
    const atRating = selected.filter(s => s.rating === rating)
    return atRating[index]?.skillId ?? ''
  }

  const handleChange = (rating: number, index: number, skillId: string) => {
    const withoutCurrent = selected.filter(s => {
      if (s.rating !== rating) return true
      const atRating = selected.filter(x => x.rating === rating)
      return atRating.indexOf(s) !== index
    })
    onChange(skillId ? [...withoutCurrent, { skillId, rating }] : withoutCurrent)
  }

  const skillCountLabel = (count: number) => {
    if (count === 1) return `${count} ${t('skill_pyramid.skill_count_1')}`
    if (count < 5) return `${count} ${t('skill_pyramid.skill_count_2_4')}`
    return `${count} ${t('skill_pyramid.skill_count_many')}`
  }

  return (
    <div className="flex flex-col gap-3">
      <SectionTitle>{t('skills.label')}</SectionTitle>
      {pyramid.map(({ rating, count }) => (
        <div key={rating} className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <SkillRatingBadge rating={rating} />
            <span className="text-xs text-gray-400">{skillCountLabel(count)}</span>
          </div>
          <div className="flex flex-col gap-2 pl-2">
            {Array.from({ length: count }).map((_, i) => (
              <SkillSelector
                key={i}
                skills={localizedSkills}
                value={getSkillAt(rating, i)}
                usedSkillIds={usedSkillIds}
                onChange={skillId => handleChange(rating, i, skillId)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
