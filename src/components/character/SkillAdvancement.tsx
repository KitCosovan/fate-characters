import { useState } from 'react'
import { SectionTitle } from './AspectsSection'
import type { SkillDefinition, Skill } from '../../types'

interface SkillAdvancementProps {
    skills: SkillDefinition[]
    selected: Skill[]
    onChange: (skills: Skill[]) => void
}

const RATING_LABELS: Record<number, string> = {
    1: 'Средний', 2: 'Неплохой', 3: 'Хороший', 4: 'Великолепный',
    5: 'Легендарный', 6: 'Эпический', 7: 'Мифический', 8: 'Запредельный',
    9: 'Сверхъестественный', 10: 'Абсолютный',
}

const getRatingLabel = (r: number) => RATING_LABELS[r] ?? `Уровень ${r}`

export default function SkillAdvancement({ skills, selected, onChange }: SkillAdvancementProps) {
    const [addingAtRating, setAddingAtRating] = useState<number | null>(null)
    const [newRating, setNewRating] = useState(5)

    // Группируем по рейтингу, сортируем по убыванию
    const maxRating = Math.max(...selected.map(s => s.rating), 4)
    const ratings = Array.from({ length: maxRating }, (_, i) => maxRating - i).filter(r => r > 0)

    const getSkillName = (id: string) => skills.find(s => s.id === id)?.name ?? id

    const setRating = (skillId: string, delta: number) => {
        const current = selected.find(s => s.skillId === skillId)
        if (!current) return
        const next = current.rating + delta
        if (next <= 0) {
            onChange(selected.filter(s => s.skillId !== skillId))
        } else {
            onChange(selected.map(s => s.skillId === skillId ? { ...s, rating: next } : s))
        }
    }

    const addSkill = (skillId: string, rating: number) => {
        if (selected.find(s => s.skillId === skillId)) return
        onChange([...selected, { skillId, rating }])
        setAddingAtRating(null)
    }

    const availableSkills = skills.filter(s => !selected.find(sel => sel.skillId === s.id))

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <SectionTitle>Развитие навыков</SectionTitle>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {selected.length} навыков
                </span>
            </div>

            <div style={{
                background: 'var(--surface-2)', border: '1px solid var(--border)',
                borderRadius: '10px', padding: '10px 12px', fontSize: '12px',
                color: 'var(--text-muted)', lineHeight: 1.5,
            }}>
                💡 Нажимай <strong style={{ color: 'var(--accent)' }}>+</strong> и <strong style={{ color: 'var(--text-dim)' }}>−</strong> чтобы изменить уровень. При −1 ниже нуля навык удаляется.
            </div>

            {/* Навыки по уровням */}
            {ratings.map(rating => {
                const atRating = selected.filter(s => s.rating === rating)
                if (atRating.length === 0) return null
                return (
                    <div key={rating} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{
                                fontSize: '12px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px',
                                background: 'var(--accent-glow)', color: 'var(--accent)',
                                border: '1px solid var(--border-accent)', whiteSpace: 'nowrap',
                            }}>
                                +{rating} {getRatingLabel(rating)}
                            </span>
                            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                        </div>
                        {atRating.map(s => (
                            <div key={s.skillId} style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                background: 'var(--surface)', border: '1px solid var(--border)',
                                borderRadius: '10px', padding: '8px 12px',
                            }}>
                                <span style={{ fontSize: '14px', color: 'var(--text)', fontWeight: 500 }}>
                                    {getSkillName(s.skillId)}
                                </span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <button
                                        onClick={() => setRating(s.skillId, -1)}
                                        style={{
                                            width: '28px', height: '28px', borderRadius: '8px',
                                            border: '1px solid var(--border)', background: 'var(--surface-2)',
                                            color: 'var(--text-muted)', cursor: 'pointer', fontSize: '16px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontFamily: 'DM Sans, sans-serif',
                                        }}
                                        title={s.rating === 1 ? 'Удалить навык' : 'Понизить'}
                                    >−</button>
                                    <span style={{
                                        fontSize: '15px', fontWeight: 700, color: 'var(--accent)',
                                        fontFamily: 'Cinzel, serif', minWidth: '28px', textAlign: 'center',
                                    }}>
                                        +{s.rating}
                                    </span>
                                    <button
                                        onClick={() => setRating(s.skillId, +1)}
                                        disabled={s.rating >= 10}
                                        style={{
                                            width: '28px', height: '28px', borderRadius: '8px',
                                            border: '1px solid var(--border-accent)',
                                            background: s.rating >= 10 ? 'var(--surface-3)' : 'var(--accent-glow)',
                                            color: s.rating >= 10 ? 'var(--text-muted)' : 'var(--accent)',
                                            cursor: s.rating >= 10 ? 'not-allowed' : 'pointer',
                                            fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}
                                    >+</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            })}

            {/* Добавить новый навык */}
            {availableSkills.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ height: '1px', background: 'var(--border)' }} />
                    {addingAtRating === null ? (
                        <button
                            onClick={() => setAddingAtRating(newRating)}
                            style={{
                                background: 'var(--surface)', border: '1px dashed var(--border-accent)',
                                borderRadius: '10px', padding: '10px', cursor: 'pointer',
                                color: 'var(--accent)', fontSize: '13px', fontWeight: 600,
                                fontFamily: 'DM Sans, sans-serif', transition: 'all 0.15s',
                            }}
                            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--accent-glow)'}
                            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--surface)'}
                        >
                            + Добавить новый навык
                        </button>
                    ) : (
                        <div style={{
                            background: 'var(--surface-2)', border: '1px solid var(--border-accent)',
                            borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '13px', color: 'var(--text-dim)', fontWeight: 600 }}>Уровень:</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <button
                                        onClick={() => setNewRating(r => Math.max(1, r - 1))}
                                        style={{
                                            width: '28px', height: '28px', borderRadius: '8px', border: '1px solid var(--border)',
                                            background: 'var(--surface-3)', color: 'var(--text)', cursor: 'pointer', fontSize: '16px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}
                                    >−</button>
                                    <span style={{ fontWeight: 700, color: 'var(--accent)', fontFamily: 'Cinzel, serif', fontSize: '16px', minWidth: '32px', textAlign: 'center' }}>
                                        +{newRating}
                                    </span>
                                    <button
                                        onClick={() => setNewRating(r => Math.min(10, r + 1))}
                                        style={{
                                            width: '28px', height: '28px', borderRadius: '8px',
                                            border: '1px solid var(--border-accent)',
                                            background: 'var(--accent-glow)', color: 'var(--accent)',
                                            cursor: 'pointer', fontSize: '16px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}
                                    >+</button>
                                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                        {getRatingLabel(newRating)}
                                    </span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                {availableSkills.map(skill => (
                                    <button
                                        key={skill.id}
                                        onClick={() => addSkill(skill.id, newRating)}
                                        style={{
                                            padding: '6px 12px', borderRadius: '20px',
                                            border: '1px solid var(--border)', background: 'var(--surface)',
                                            color: 'var(--text)', fontSize: '13px', cursor: 'pointer',
                                            fontFamily: 'DM Sans, sans-serif', transition: 'all 0.15s',
                                        }}
                                        onMouseEnter={e => {
                                            const el = e.currentTarget as HTMLElement
                                            el.style.borderColor = 'var(--border-accent)'
                                            el.style.background = 'var(--accent-glow)'
                                            el.style.color = 'var(--accent)'
                                        }}
                                        onMouseLeave={e => {
                                            const el = e.currentTarget as HTMLElement
                                            el.style.borderColor = 'var(--border)'
                                            el.style.background = 'var(--surface)'
                                            el.style.color = 'var(--text)'
                                        }}
                                    >
                                        {skill.name}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setAddingAtRating(null)}
                                style={{
                                    background: 'none', border: 'none', color: 'var(--text-muted)',
                                    cursor: 'pointer', fontSize: '12px', fontFamily: 'DM Sans, sans-serif',
                                    textAlign: 'left', padding: 0,
                                }}
                            >
                                Отмена
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}