// src/components/character/SkillAdvancement.tsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from './AspectsSection'
import type { SkillDefinition, Skill } from '../../types'
import { useLocalizedSkillName } from '../../hooks/useLocalizedSkillName'

interface SkillAdvancementProps {
  skills: SkillDefinition[]
  selected: Skill[]
  onChange: (skills: Skill[]) => void
}

export default function SkillAdvancement({ skills, selected, onChange }: SkillAdvancementProps) {
  const { t } = useTranslation()
  const [addingAtRating, setAddingAtRating] = useState<number | null>(null)
  const [newRating, setNewRating] = useState(5)

  const getRatingLabel = (r: number) => t(`skill_advancement.rating_${r}`, t('skill_advancement.rating_n', { n: r }))
  const localizeSkillName = useLocalizedSkillName()
  const getSkillName = (id: string) => localizeSkillName(id, skills.find(s => s.id === id)?.name ?? id)

  const maxRating = Math.max(...selected.map(s => s.rating), 4)
  const ratings = Array.from({ length: maxRating }, (_, i) => maxRating - i).filter(r => r > 0)

  const setRating = (skillId: string, delta: number) => {
    const current = selected.find(s => s.skillId === skillId)
    if (!current) return
    const next = current.rating + delta
    if (next <= 0) onChange(selected.filter(s => s.skillId !== skillId))
    else onChange(selected.map(s => s.skillId === skillId ? { ...s, rating: next } : s))
  }

  const addSkill = (skillId: string, rating: number) => {
    if (selected.find(s => s.skillId === skillId)) return
    onChange([...selected, { skillId, rating }])
    setAddingAtRating(null)
  }

  const availableSkills = skills.filter(s => !selected.find(sel => sel.skillId === s.id))

  const btnStyle = (accent = false) => ({
    width: '28px', height: '28px', borderRadius: '8px',
    border: `1px solid ${accent ? 'var(--border-accent)' : 'var(--border)'}`,
    background: accent ? 'var(--accent-glow)' : 'var(--surface-2)',
    color: accent ? 'var(--accent)' : 'var(--text-muted)',
    cursor: 'pointer', fontSize: '16px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <SectionTitle>{t('skill_advancement.title')}</SectionTitle>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          {t('skill_advancement.count', { count: selected.length })}
        </span>
      </div>

      <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '10px', padding: '10px 12px', fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
        💡 {t('skill_advancement.hint')}
      </div>

      {ratings.map(rating => {
        const atRating = selected.filter(s => s.rating === rating)
        if (atRating.length === 0) return null
        return (
          <div key={rating} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: 'var(--accent-glow)', color: 'var(--accent)', border: '1px solid var(--border-accent)', whiteSpace: 'nowrap' }}>
                +{rating} {getRatingLabel(rating)}
              </span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>
            {atRating.map(s => (
              <div key={s.skillId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '8px 12px' }}>
                <span style={{ fontSize: '14px', color: 'var(--text)', fontWeight: 500 }}>{getSkillName(s.skillId)}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <button onClick={() => setRating(s.skillId, -1)} style={btnStyle()}>−</button>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--accent)', fontFamily: 'Cinzel, serif', minWidth: '28px', textAlign: 'center' }}>+{s.rating}</span>
                  <button onClick={() => setRating(s.skillId, +1)} disabled={s.rating >= 10} style={{ ...btnStyle(true), ...(s.rating >= 10 ? { background: 'var(--surface-3)', color: 'var(--text-muted)', cursor: 'not-allowed' } : {}) }}>+</button>
                </div>
              </div>
            ))}
          </div>
        )
      })}

      {availableSkills.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ height: '1px', background: 'var(--border)' }} />
          {addingAtRating === null ? (
            <button onClick={() => setAddingAtRating(newRating)} style={{
              background: 'var(--surface)', border: '1px dashed var(--border-accent)',
              borderRadius: '10px', padding: '10px', cursor: 'pointer',
              color: 'var(--accent)', fontSize: '13px', fontWeight: 600, fontFamily: 'DM Sans, sans-serif',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--accent-glow)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--surface)'}
            >
              {t('skill_advancement.add')}
            </button>
          ) : (
            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border-accent)', borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-dim)', fontWeight: 600 }}>{t('skill_advancement.level')}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button onClick={() => setNewRating(r => Math.max(1, r - 1))} style={btnStyle()}>−</button>
                  <span style={{ fontWeight: 700, color: 'var(--accent)', fontFamily: 'Cinzel, serif', fontSize: '16px', minWidth: '32px', textAlign: 'center' }}>+{newRating}</span>
                  <button onClick={() => setNewRating(r => Math.min(10, r + 1))} style={btnStyle(true)}>+</button>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{getRatingLabel(newRating)}</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {availableSkills.map(skill => (
                  <button key={skill.id} onClick={() => addSkill(skill.id, newRating)} style={{
                    padding: '6px 12px', borderRadius: '20px', border: '1px solid var(--border)',
                    background: 'var(--surface)', color: 'var(--text)', fontSize: '13px',
                    cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', transition: 'all 0.15s',
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border-accent)'; el.style.background = 'var(--accent-glow)'; el.style.color = 'var(--accent)' }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.background = 'var(--surface)'; el.style.color = 'var(--text)' }}
                  >{localizeSkillName(skill.id, skill.name)}</button>
                ))}
              </div>
              <button onClick={() => setAddingAtRating(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '12px', fontFamily: 'DM Sans, sans-serif', textAlign: 'left', padding: 0 }}>
                {t('skill_advancement.cancel')}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
