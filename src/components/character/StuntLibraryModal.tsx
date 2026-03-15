// src/components/character/StuntLibraryModal.tsx
import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '../ui'
import { stuntLibrary, type LibraryStunt } from '../../data/stuntLibrary'
import { stuntLibraryEn } from '../../data/stuntLibraryEn'
import { IconSearch } from '../ui/FateIcons'
import { getSystemConfig } from '../../utils'

interface StuntLibraryModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (stunt: LibraryStunt) => void
  systemId: string
}

export default function StuntLibraryModal({ isOpen, onClose, onSelect, systemId }: StuntLibraryModalProps) {
  const { t, i18n } = useTranslation()
  const activeLibrary = i18n.language.startsWith('en') ? stuntLibraryEn : stuntLibrary
  const [search, setSearch] = useState('')
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const config = getSystemConfig(systemId)
  const skills = config.skills

  const filtered = useMemo(() => activeLibrary.filter(s => {
    const systemMatch = s.systems.includes('all') || s.systems.includes(systemId)
    const skillMatch = !selectedSkill || s.skillId === selectedSkill
    const q = search.toLowerCase().trim()
    return systemMatch && skillMatch && (!q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q))
  }), [systemId, selectedSkill, search])

  const grouped = useMemo(() => {
    const map = new Map<string, LibraryStunt[]>()
    filtered.forEach(s => {
      if (!map.has(s.skillId)) map.set(s.skillId, [])
      map.get(s.skillId)!.push(s)
    })
    return map
  }, [filtered])

  const getSkillName = (skillId: string) => skills.find(s => s.id === skillId)?.name ?? skillId

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('stunts_section.library_title')} onConfirm={() => {}} hideConfirm>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', width: 16, height: 16, display: 'flex', alignItems: 'center' }}>
            <IconSearch size={16} />
          </div>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder={t('stunts_section.library_search')}
            style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--input-border)', borderRadius: '10px', padding: '8px 12px 8px 30px', fontSize: '13px', color: 'var(--input-text)', outline: 'none', fontFamily: 'DM Sans, sans-serif', boxSizing: 'border-box' }}
            onFocus={e => { e.target.style.borderColor = 'var(--input-border-focus)'; e.target.style.boxShadow = 'var(--input-shadow-focus)' }}
            onBlur={e => { e.target.style.borderColor = 'var(--input-border)'; e.target.style.boxShadow = 'none' }}
          />
          {search && <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1 }}>×</button>}
        </div>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button onClick={() => setSelectedSkill(null)} style={{ padding: '4px 10px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 600, fontFamily: 'DM Sans, sans-serif', background: !selectedSkill ? 'var(--accent-glow)' : 'var(--surface-2)', color: !selectedSkill ? 'var(--accent)' : 'var(--text-muted)', outline: !selectedSkill ? '1px solid var(--border-accent)' : '1px solid var(--border)' }}>
            {t('stunts_section.library_all')}
          </button>
          {skills.map(skill => {
            const count = activeLibrary.filter(s => s.skillId === skill.id && (s.systems.includes('all') || s.systems.includes(systemId))).length
            if (count === 0) return null
            return (
              <button key={skill.id} onClick={() => setSelectedSkill(selectedSkill === skill.id ? null : skill.id)} style={{ padding: '4px 10px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 600, fontFamily: 'DM Sans, sans-serif', background: selectedSkill === skill.id ? 'var(--accent-glow)' : 'var(--surface-2)', color: selectedSkill === skill.id ? 'var(--accent)' : 'var(--text-muted)', outline: selectedSkill === skill.id ? '1px solid var(--border-accent)' : '1px solid var(--border)' }}>
                {skill.name}
              </button>
            )
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '50vh', overflowY: 'auto', paddingRight: '4px' }}>
          {grouped.size === 0 && (
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', padding: '16px 0', margin: 0 }}>
              {t('stunts_section.library_empty')}
            </p>
          )}
          {Array.from(grouped.entries()).map(([skillId, stunts]) => (
            <div key={skillId} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0, fontFamily: 'Cinzel, serif' }}>
                {getSkillName(skillId)}
              </p>
              {stunts.map(stunt => (
                <div key={stunt.id} onClick={() => { onSelect(stunt); onClose() }} style={{ padding: '10px 14px', borderRadius: '12px', background: 'var(--surface)', border: '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.15s' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border-accent)'; el.style.background = 'var(--accent-glow)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.background = 'var(--surface)' }}
                >
                  <p style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text)', margin: '0 0 4px' }}>{stunt.name}</p>
                  <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: 0, lineHeight: 1.5 }}>{stunt.description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
