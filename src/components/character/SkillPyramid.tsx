import type { Skill, SkillDefinition } from '../../types'
import SkillRatingBadge from './SkillRatingBadge'
import SkillSelector from './SkillSelector'

// Пирамида Fate Core: 1×+4, 2×+3, 3×+2, 4×+1
const PYRAMID = [
  { rating: 4, count: 1 },
  { rating: 3, count: 2 },
  { rating: 2, count: 3 },
  { rating: 1, count: 4 },
]

interface SkillPyramidProps {
  skills: SkillDefinition[]
  selected: Skill[]
  onChange: (skills: Skill[]) => void
}

export default function SkillPyramid({ skills, selected, onChange }: SkillPyramidProps) {
  const usedSkillIds = selected.map(s => s.skillId).filter(Boolean)

  const getSkillAt = (rating: number, index: number): string => {
    const atRating = selected.filter(s => s.rating === rating)
    return atRating[index]?.skillId ?? ''
  }

  const handleChange = (rating: number, index: number, skillId: string) => {
    // Убираем старый слот этого рейтинга на этой позиции
    const withoutCurrent = selected.filter(s => {
      if (s.rating !== rating) return true
      const atRating = selected.filter(x => x.rating === rating)
      return atRating.indexOf(s) !== index
    })
    const updated = skillId
      ? [...withoutCurrent, { skillId, rating }]
      : withoutCurrent
    onChange(updated)
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-bold text-gray-800">Навыки</h2>
      {PYRAMID.map(({ rating, count }) => (
        <div key={rating} className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <SkillRatingBadge rating={rating} />
            <span className="text-xs text-gray-400">{count} {count === 1 ? 'навык' : count < 5 ? 'навыка' : 'навыков'}</span>
          </div>
          <div className="flex flex-col gap-2 pl-2">
            {Array.from({ length: count }).map((_, i) => (
              <SkillSelector
                key={i}
                skills={skills}
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