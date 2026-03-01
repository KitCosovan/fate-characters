import type { Character } from '../../types'
import { getSystemConfig } from '../../utils'
import { SectionTitle } from './AspectsSection'
import SkillRatingBadge from './SkillRatingBadge'
import StressTrack from './StressTrack'
import ConsequenceSlot from './ConsequenceSlot'
import NotesSection from './NotesSection'

interface CharacterSheetProps {
  character: Character
  onStressChange?: (character: Character) => void
  onConsequenceChange?: (character: Character) => void
  onNotesChange?: (notes: string) => void
}

const RATING_ORDER = [4, 3, 2, 1, 0]

export default function CharacterSheet({ character, onStressChange, onConsequenceChange, onNotesChange }: CharacterSheetProps) {
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Аспекты */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <SectionTitle>Аспекты</SectionTitle>
        {config.aspectSlots.map(slot => {
          const aspect = character.aspects.find(a => a.slotId === slot.id)
          return (
            <div key={slot.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <p style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>
                {slot.label}
              </p>
              <p style={{
                fontSize: '14px',
                padding: '10px 14px',
                borderRadius: '10px',
                margin: 0,
                background: aspect?.value ? 'var(--accent-glow)' : 'var(--surface-2)',
                color: aspect?.value ? 'var(--text)' : 'var(--text-muted)',
                fontStyle: aspect?.value ? 'normal' : 'italic',
                border: aspect?.value ? '1px solid var(--border-accent)' : '1px solid var(--border)',
                fontWeight: aspect?.value ? 500 : 400,
              }}>
                {aspect?.value || 'Не заполнено'}
              </p>
            </div>
          )
        })}
      </section>

      {/* Навыки / Подходы */}
      {skillsByRating.length > 0 && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <SectionTitle>{isApproaches ? 'Подходы' : 'Навыки'}</SectionTitle>

          {isApproaches ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {config.skills.map(approach => {
                const skill = character.skills.find(s => s.skillId === approach.id)
                const rating = skill?.rating ?? 0
                return (
                  <div key={approach.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <p style={{ fontSize: '14px', color: 'var(--text)', margin: 0 }}>{approach.name}</p>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      padding: '2px 10px',
                      borderRadius: '20px',
                      background: rating > 0 ? 'var(--accent-glow)' : 'var(--surface-2)',
                      color: rating > 0 ? 'var(--accent)' : 'var(--text-muted)',
                      border: `1px solid ${rating > 0 ? 'var(--border-accent)' : 'var(--border)'}`,
                    }}>+{rating}</span>
                  </div>
                )
              })}
            </div>
          ) : (
            skillsByRating.map(({ rating, skills }) => (
              <div key={rating} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <SkillRatingBadge rating={rating} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingTop: '2px' }}>
                  {skills.map(skill => (
                    <span key={skill!.id} style={{
                      fontSize: '13px',
                      padding: '3px 10px',
                      borderRadius: '8px',
                      background: 'var(--surface-2)',
                      color: 'var(--text)',
                      border: '1px solid var(--border)',
                    }}>
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
        <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <SectionTitle>Трюки</SectionTitle>
          {character.stunts.map(stunt => (
            <div key={stunt.id} style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '12px 14px',
            }}>
              <p style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text)', margin: 0 }}>
                {stunt.name || 'Без названия'}
              </p>
              {stunt.description && (
                <p style={{ fontSize: '13px', color: 'var(--text-dim)', marginTop: '4px', marginBottom: 0 }}>
                  {stunt.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Стресс */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <SectionTitle>Стресс</SectionTitle>
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
      <section style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <SectionTitle>Последствия</SectionTitle>
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
      <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <SectionTitle>Fate Points</SectionTitle>
        <div style={{
          display: 'flex',
          gap: '16px',
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          padding: '16px 20px',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>Refresh</p>
            <p style={{ fontSize: '28px', fontWeight: 700, color: 'var(--accent)', fontFamily: 'Cinzel, serif', margin: 0 }}>
              {character.refresh}
            </p>
          </div>
          <div style={{ width: '1px', background: 'var(--border)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>Текущие</p>
            <p style={{ fontSize: '28px', fontWeight: 700, color: 'var(--accent)', fontFamily: 'Cinzel, serif', margin: 0 }}>
              {character.currentFatePoints}
            </p>
          </div>
        </div>
      </section>

      {onNotesChange ? (
        <>
          <div style={{ width: '100%', height: '1px', background: 'var(--border)' }} />
          <section>
            <NotesSection
              notes={character.notes ?? ''}
              onChange={onNotesChange}
            />
          </section>
        </>
      ) : character.notes ? (
        <>
          <div style={{ width: '100%', height: '1px', background: 'var(--border)' }} />
          <section>
            <SectionTitle>Заметки</SectionTitle>
            <p style={{
              fontSize: '14px',
              color: 'var(--text-dim)',
              lineHeight: 1.6,
              margin: 0,
              whiteSpace: 'pre-wrap',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '12px 14px',
            }}>
              {character.notes}
            </p>
          </section>
        </>
      ) : null}

    </div>
  )
}