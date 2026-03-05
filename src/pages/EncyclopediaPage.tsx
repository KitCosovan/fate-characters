// src/pages/EncyclopediaPage.tsx
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { skillEntries, aspectTips, quickRules } from '../data/encyclopedia'
import { stuntLibrary } from '../data/stuntLibrary'
import { fateCoreConfig } from '../data/fateCore'
import { bookOfAshesConfig } from '../data/bookOfAshes'
import {
  IconSwords, IconCheck, IconBook, IconTip, IconMasks, IconPlus,
  IconAdvancement, IconSearch, IconLightning, IconFire, IconDelete, IconSpeech,
} from '../components/ui/FateIcons'

type Tab = 'skills' | 'stunts' | 'library' | 'aspects' | 'rules'

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'skills',  label: 'Навыки',    icon: <IconSwords size={20} /> },
  { id: 'library', label: 'Трюки',     icon: <IconLightning size={20} /> },
  { id: 'aspects', label: 'Аспекты',   icon: <IconTip size={20} /> },
  { id: 'rules',   label: 'Правила',   icon: <IconBook size={20} /> },
]

const ASPECT_ICONS: Record<string, React.ReactNode> = {
  'a1': <IconCheck size={28} />,
  'a2': <IconLightning size={28} />,
  'a3': <IconFire size={28} />,
  'a4': <IconTip size={28} />,
  'a5': <IconMasks size={28} />,
}

const RULE_ICONS: Record<string, React.ReactNode> = {
  'r1': <IconSwords size={28} />,
  'r2': <IconDelete size={28} />,
  'r3': <IconCheck size={28} />,
  'r4': <IconLightning size={28} />,
  'r5': <IconFire size={28} />,
  'r6': <IconSpeech size={28} />,
}

const SYSTEM_FILTER = [
  { id: null,             label: 'Все' },
  { id: 'fate-core',      label: 'Fate Core' },
  { id: 'book-of-ashes',  label: 'Книга Пепла' },
]

// Все навыки обоих систем, дедуплицированные
const allSkills = [
  ...fateCoreConfig.skills,
  ...bookOfAshesConfig.skills.filter(s => !fateCoreConfig.skills.find(c => c.id === s.id)),
]

export default function EncyclopediaPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('skills')
  const [systemFilter, setSystemFilter] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

  const toggle = (id: string) => setExpanded(prev => prev === id ? null : id)

  const filteredSkills = skillEntries.filter(s => {
    if (systemFilter && !s.system.includes(systemFilter)) return false
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  // Библиотека трюков — фильтрация
  const filteredLibrary = useMemo(() => {
    return stuntLibrary.filter(s => {
      const systemMatch = !systemFilter || s.systems.includes('all') || s.systems.includes(systemFilter)
      const skillMatch = !selectedSkill || s.skillId === selectedSkill
      const q = search.toLowerCase().trim()
      const searchMatch = !q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      return systemMatch && skillMatch && searchMatch
    })
  }, [systemFilter, selectedSkill, search])

  // Группируем библиотеку по навыку
  const groupedLibrary = useMemo(() => {
    const map = new Map<string, typeof filteredLibrary>()
    filteredLibrary.forEach(s => {
      if (!map.has(s.skillId)) map.set(s.skillId, [])
      map.get(s.skillId)!.push(s)
    })
    return map
  }, [filteredLibrary])

  const getSkillName = (skillId: string) =>
    allSkills.find(s => s.id === skillId)?.name ?? skillId

  // Навыки у которых есть трюки в текущем фильтре
  const skillsWithStunts = useMemo(() => {
    return allSkills.filter(skill => {
      return stuntLibrary.some(s =>
        s.skillId === skill.id &&
        (!systemFilter || s.systems.includes('all') || s.systems.includes(systemFilter))
      )
    })
  }, [systemFilter])

  const SearchInput = () => (
    <div style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute', left: '10px', top: '50%',
        transform: 'translateY(-50%)', pointerEvents: 'none',
        width: 20, height: 20, display: 'flex', alignItems: 'center',
      }}>
        <IconSearch size={20} />
      </div>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Поиск..."
        style={{
          width: '100%', background: 'var(--input-bg)',
          border: '1px solid var(--input-border)', borderRadius: '10px',
          padding: '9px 12px 9px 36px', fontSize: '14px',
          color: 'var(--input-text)', outline: 'none',
          fontFamily: 'DM Sans, sans-serif', boxSizing: 'border-box' as const,
        }}
        onFocus={e => { e.target.style.borderColor = 'var(--input-border-focus)'; e.target.style.boxShadow = 'var(--input-shadow-focus)' }}
        onBlur={e => { e.target.style.borderColor = 'var(--input-border)'; e.target.style.boxShadow = 'none' }}
      />
      {search && (
        <button
          onClick={() => setSearch('')}
          style={{
            position: 'absolute', right: '10px', top: '50%',
            transform: 'translateY(-50%)', background: 'none', border: 'none',
            cursor: 'pointer', color: 'var(--text-muted)', fontSize: '18px', lineHeight: 1,
          }}
        >×</button>
      )}
    </div>
  )

  const SystemFilterBar = () => (
    <div style={{ display: 'flex', gap: '6px' }}>
      {SYSTEM_FILTER.map(f => (
        <button
          key={String(f.id)}
          onClick={() => setSystemFilter(f.id)}
          style={{
            padding: '5px 12px', borderRadius: '20px', border: 'none',
            background: systemFilter === f.id ? 'var(--accent-glow)' : 'var(--surface-2)',
            color: systemFilter === f.id ? 'var(--accent)' : 'var(--text-dim)',
            fontSize: '12px', fontWeight: 600, cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif', transition: 'all 0.15s',
            outline: systemFilter === f.id ? '1px solid var(--border-accent)' : '1px solid var(--border)',
          }}
        >
          {f.label}
        </button>
      ))}
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '32px' }}>

      {/* Шапка */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: '8px', color: 'var(--text-dim)', width: '32px', height: '32px',
            cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >←</button>
        <div>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '20px', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
            Энциклопедия
          </h1>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>Навыки, трюки, аспекты и правила</p>
        </div>
      </div>

      {/* Вкладки */}
      <div style={{
        display: 'flex', gap: '4px', background: 'var(--surface)',
        borderRadius: '12px', padding: '4px', border: '1px solid var(--border)',
      }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => { setTab(t.id); setExpanded(null); setSearch(''); setSelectedSkill(null) }}
            style={{
              flex: 1, padding: '8px 4px', borderRadius: '9px', border: 'none',
              fontSize: '12px', fontWeight: 600, cursor: 'pointer',
              background: tab === t.id ? 'var(--surface-3)' : 'transparent',
              color: tab === t.id ? 'var(--text)' : 'var(--text-muted)',
              fontFamily: 'DM Sans, sans-serif', transition: 'all 0.15s',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
            }}
          >
            <div style={{ width: 20, height: 20, display: 'flex', alignItems: 'center' }}>
              {t.icon}
            </div>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── НАВЫКИ ──────────────────────────────────────────── */}
      {tab === 'skills' && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <SearchInput />
            <SystemFilterBar />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
              {filteredSkills.length} навыков
            </p>
            {filteredSkills.map(skill => (
              <div
                key={skill.id}
                style={{
                  background: 'var(--surface)',
                  border: `1px solid ${expanded === skill.id ? 'var(--border-accent)' : 'var(--border)'}`,
                  borderRadius: '12px', overflow: 'hidden', transition: 'border-color 0.15s',
                }}
              >
                <button
                  onClick={() => toggle(skill.id)}
                  style={{
                    width: '100%', padding: '14px 16px', background: 'none', border: 'none',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>{skill.name}</span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {skill.system.map(s => (
                        <span key={s} style={{
                          fontSize: '10px', fontWeight: 600, padding: '2px 7px', borderRadius: '20px',
                          background: 'var(--accent-glow)', color: 'var(--accent)',
                          border: '1px solid var(--border-accent)',
                        }}>
                          {s === 'fate-core' ? 'Core' : 'Пепел'}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '12px', transition: 'transform 0.15s', transform: expanded === skill.id ? 'rotate(180deg)' : 'none' }}>▼</span>
                </button>
                {expanded === skill.id && (
                  <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <p style={{ fontSize: '14px', color: 'var(--text-dim)', margin: 0, lineHeight: 1.5 }}>
                      {skill.description}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>
                        Применение
                      </p>
                      {skill.actions.map(action => (
                        <div key={action.name} style={{
                          background: 'var(--surface-2)', borderRadius: '8px', padding: '8px 12px',
                          display: 'flex', flexDirection: 'column', gap: '2px',
                        }}>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent)' }}>{action.name}</span>
                          <span style={{ fontSize: '13px', color: 'var(--text-dim)' }}>{action.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── БИБЛИОТЕКА ТРЮКОВ ───────────────────────────────── */}
      {tab === 'library' && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <SearchInput />
            <SystemFilterBar />
            {/* Фильтр по навыкам */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSelectedSkill(null)}
                style={{
                  padding: '4px 10px', borderRadius: '20px', border: 'none',
                  cursor: 'pointer', fontSize: '11px', fontWeight: 600,
                  fontFamily: 'DM Sans, sans-serif', transition: 'all 0.15s',
                  background: !selectedSkill ? 'var(--accent-glow)' : 'var(--surface-2)',
                  color: !selectedSkill ? 'var(--accent)' : 'var(--text-muted)',
                  outline: !selectedSkill ? '1px solid var(--border-accent)' : '1px solid var(--border)',
                }}
              >
                Все навыки
              </button>
              {skillsWithStunts.map(skill => (
                <button
                  key={skill.id}
                  onClick={() => setSelectedSkill(selectedSkill === skill.id ? null : skill.id)}
                  style={{
                    padding: '4px 10px', borderRadius: '20px', border: 'none',
                    cursor: 'pointer', fontSize: '11px', fontWeight: 600,
                    fontFamily: 'DM Sans, sans-serif', transition: 'all 0.15s',
                    background: selectedSkill === skill.id ? 'var(--accent-glow)' : 'var(--surface-2)',
                    color: selectedSkill === skill.id ? 'var(--accent)' : 'var(--text-muted)',
                    outline: selectedSkill === skill.id ? '1px solid var(--border-accent)' : '1px solid var(--border)',
                  }}
                >
                  {skill.name}
                </button>
              ))}
            </div>
          </div>

          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
            {filteredLibrary.length} трюков
          </p>

          {groupedLibrary.size === 0 && (
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', padding: '32px 0', margin: 0 }}>
              Ничего не найдено
            </p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {Array.from(groupedLibrary.entries()).map(([skillId, stunts]) => (
              <div key={skillId} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {/* Заголовок навыка */}
                <p style={{
                  fontFamily: 'Cinzel, serif', fontSize: '12px', fontWeight: 700,
                  color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0,
                }}>
                  {getSkillName(skillId)}
                </p>
                {/* Карточки трюков */}
                {stunts.map(stunt => (
                  <div
                    key={stunt.id}
                    style={{
                      background: 'var(--surface)', border: '1px solid var(--border)',
                      borderRadius: '12px', padding: '14px 16px',
                      display: 'flex', flexDirection: 'column', gap: '6px',
                    }}
                  >
                    <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>
                      {stunt.name}
                    </span>
                    <p style={{ fontSize: '13px', color: 'var(--text-dim)', margin: 0, lineHeight: 1.5 }}>
                      {stunt.description}
                    </p>
                    {/* Бейдж системы если не universal */}
                    {!stunt.systems.includes('all') && (
                      <div style={{ display: 'flex', gap: '4px', marginTop: '2px' }}>
                        {stunt.systems.map(s => (
                          <span key={s} style={{
                            fontSize: '10px', fontWeight: 600, padding: '2px 7px', borderRadius: '20px',
                            background: 'var(--accent-glow)', color: 'var(--accent)',
                            border: '1px solid var(--border-accent)', alignSelf: 'flex-start',
                          }}>
                            {s === 'fate-core' ? 'Core' : 'Книга Пепла'}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── АСПЕКТЫ ─────────────────────────────────────────── */}
      {tab === 'aspects' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {aspectTips.map(tip => (
            <div key={tip.id} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '14px', overflow: 'hidden',
            }}>
              <button
                onClick={() => toggle(tip.id)}
                style={{
                  width: '100%', padding: '14px 16px', background: 'none', border: 'none',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px',
                  fontFamily: 'DM Sans, sans-serif', textAlign: 'left',
                }}
              >
                <div style={{ width: 28, height: 28, flexShrink: 0 }}>{ASPECT_ICONS[tip.id]}</div>
                <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text)', flex: 1 }}>{tip.title}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '12px', transform: expanded === tip.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>▼</span>
              </button>
              {expanded === tip.id && (
                <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <p style={{ fontSize: '14px', color: 'var(--text-dim)', margin: 0, lineHeight: 1.6 }}>{tip.description}</p>
                  {tip.examples && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>Примеры</p>
                      {tip.examples.map((ex, i) => (
                        <div key={i} style={{
                          background: 'var(--surface-2)', borderRadius: '8px', padding: '8px 12px',
                          fontSize: '13px', color: 'var(--text-dim)',
                        }}>
                          {ex}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── ПРАВИЛА ─────────────────────────────────────────── */}
      {tab === 'rules' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {quickRules.map(rule => (
            <div key={rule.id} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '14px', overflow: 'hidden',
            }}>
              <button
                onClick={() => toggle(rule.id)}
                style={{
                  width: '100%', padding: '14px 16px', background: 'none', border: 'none',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px',
                  fontFamily: 'DM Sans, sans-serif', textAlign: 'left',
                }}
              >
                <div style={{ width: 28, height: 28, flexShrink: 0 }}>{RULE_ICONS[rule.id]}</div>
                <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text)', flex: 1 }}>{rule.title}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '12px', transform: expanded === rule.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>▼</span>
              </button>
              {expanded === rule.id && (
                <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <p style={{ fontSize: '14px', color: 'var(--text-dim)', margin: 0, lineHeight: 1.6 }}>{rule.description}</p>
                  {rule.examples && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {rule.id === 'r1' ? (
                        [
                          { icon: <IconSwords size={16} />, text: rule.examples[0] },
                          { icon: <IconCheck size={16} />, text: rule.examples[1] },
                          { icon: <IconAdvancement size={16} />, text: rule.examples[2] },
                          { icon: <IconPlus size={16} />, text: rule.examples[3] },
                        ].map((item, i) => (
                          <div key={i} style={{
                            background: 'var(--surface-2)', borderRadius: '8px', padding: '8px 12px',
                            fontSize: '13px', color: 'var(--text-dim)', borderLeft: '2px solid var(--accent)',
                            display: 'flex', alignItems: 'center', gap: '8px',
                          }}>
                            <div style={{ width: 16, height: 16, flexShrink: 0 }}>{item.icon}</div>
                            {item.text}
                          </div>
                        ))
                      ) : (
                        rule.examples.map((ex, i) => (
                          <div key={i} style={{
                            background: 'var(--surface-2)', borderRadius: '8px', padding: '8px 12px',
                            fontSize: '13px', color: 'var(--text-dim)', borderLeft: '2px solid var(--accent)',
                          }}>
                            {ex}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
