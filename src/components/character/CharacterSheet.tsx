import type { Character } from '../../types'
import { getSystemConfig } from '../../utils'
// Удали эти две строки:
// import { Badge } from '../ui'
// import type { StressBox } from '../../types'
import SkillRatingBadge from './SkillRatingBadge'
import StressTrack from './StressTrack'
import ConsequenceSlot from './ConsequenceSlot'

interface CharacterSheetProps {
  character: Character
  onStressChange?: (character: Character) => void
  onConsequenceChange?: (character: Character) => void
}

const RATING_ORDER = [4, 3, 2, 1, 0]

const APPROACH_COLORS: Record<number, string> = {
  3: 'bg-yellow-100 text-yellow-800',
  2: 'bg-indigo-100 text-indigo-700',
  1: 'bg-blue-100 text-blue-700',
  0: 'bg-gray-100 text-gray-500',
}

export default function CharacterSheet({ character, onStressChange, onConsequenceChange }: CharacterSheetProps) {
  const config = getSystemConfig(character.systemId)
  const isApproaches = config.skillMode === 'approaches'

  const skillsByRating = RATING_ORDER.map(rating => ({
    rating,
    skills: character.skills
      .filter(s => s.rating === rating)
      .map(s => config.skills.find(sk => sk.id === s.skillId))
      .filter(Boolean),
  })).filter(r => r.skills.length > 0)

  return (
    <div className="flex flex-col gap-6">

      {/* Аспекты */}
      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-1">Аспекты</h2>
        {config.aspectSlots.map(slot => {
          const aspect = character.aspects.find(a => a.slotId === slot.id)
          return (
            <div key={slot.id} className="flex flex-col gap-0.5">
              <p className="text-xs text-gray-400 font-medium">{slot.label}</p>
              <p className={`text-sm px-3 py-2 rounded-lg ${aspect?.value
                ? 'bg-indigo-50 text-indigo-900 font-medium'
                : 'bg-gray-50 text-gray-400 italic'}`}>
                {aspect?.value || 'Не заполнено'}
              </p>
            </div>
          )
        })}
      </section>

      {/* Навыки или Подходы */}
      {skillsByRating.length > 0 && (
        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-1">
            {isApproaches ? 'Подходы' : 'Навыки'}
          </h2>

          {isApproaches ? (
            // Подходы — показываем все с рейтингом
            <div className="flex flex-col gap-2">
              {config.skills.map(approach => {
                const skill = character.skills.find(s => s.skillId === approach.id)
                const rating = skill?.rating ?? 0
                return (
                  <div key={approach.id} className="flex items-center justify-between">
                    <p className="text-sm text-gray-700">{approach.name}</p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${APPROACH_COLORS[rating]}`}>
                      +{rating}
                    </span>
                  </div>
                )
              })}
            </div>
          ) : (
            // Навыки — группируем по рейтингу
            skillsByRating.map(({ rating, skills }) => (
              <div key={rating} className="flex items-start gap-3">
                <SkillRatingBadge rating={rating} />
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {skills.map(skill => (
                    <span key={skill!.id} className="text-sm bg-gray-100 text-gray-700 px-2 py-0.5 rounded-lg">
                      {skill!.name}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </section>
      )}

      {/* Трюки */}
      {character.stunts.length > 0 && (
        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-1">Трюки</h2>
          {character.stunts.map(stunt => (
            <div key={stunt.id} className="bg-gray-50 rounded-xl p-3">
              <p className="font-semibold text-sm text-gray-800">{stunt.name || 'Без названия'}</p>
              {stunt.description && (
                <p className="text-sm text-gray-500 mt-1">{stunt.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Стресс */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-1">Стресс</h2>
        {character.stressTracks.map(track => {
          const cfg = config.stressTracks.find(c => c.id === track.trackId)
          return (
            <StressTrack
              key={track.trackId}
              track={track}
              label={cfg?.label ?? track.trackId}
              onChange={updated => {
                const tracks = character.stressTracks.map(t =>
                  t.trackId === updated.trackId ? updated : t
                )
                onStressChange?.({ ...character, stressTracks: tracks })
              }}
            />
          )
        })}
      </section>

      {/* Последствия */}
      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-1">Последствия</h2>
        {character.consequences.map(c => (
          <ConsequenceSlot
            key={c.severity}
            consequence={c}
            onChange={updated => {
              const consequences = character.consequences.map(x =>
                x.severity === updated.severity ? updated : x
              )
              onConsequenceChange?.({ ...character, consequences })
            }}
          />
        ))}
      </section>

      {/* Fate Points */}
      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-1">Fate Points</h2>
        <div className="flex gap-4 bg-indigo-50 rounded-xl px-4 py-3">
          <div className="flex flex-col items-center">
            <p className="text-xs text-gray-500">Refresh</p>
            <p className="text-2xl font-bold text-indigo-700">{character.refresh}</p>
          </div>
          <div className="w-px bg-indigo-200" />
          <div className="flex flex-col items-center">
            <p className="text-xs text-gray-500">Текущие</p>
            <p className="text-2xl font-bold text-indigo-700">{character.currentFatePoints}</p>
          </div>
        </div>
      </section>

    </div>
  )
}