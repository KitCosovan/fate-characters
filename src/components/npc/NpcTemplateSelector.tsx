// src/components/npc/NpcTemplateSelector.tsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { npcTemplates } from '../../data/npcTemplates'
import { npcTemplatesEn } from '../../data/npcTemplatesEn'
import { getCustomTemplates, deleteCustomTemplate } from '../../data/customTemplates'
import type { NpcTemplate } from '../../types'
import type { CustomNpcTemplate } from '../../data/customTemplates'
import { IconSwords, IconSpeech, IconDagger, IconSkull, IconBook, IconMasks, IconFire, IconCheck, IconDelete, IconSearch } from '../ui/FateIcons'
import { getIconComponent } from './iconOptions'

const BUILTIN_ICONS: Record<string, React.ReactNode> = {
  fighter: <IconSwords size={32} />, socialite: <IconSpeech size={32} />,
  mook: <IconDagger size={32} />, boss: <IconSkull size={32} />,
  assassin: <IconDagger size={32} />, scholar: <IconBook size={32} />,
  merchant: <IconCheck size={32} />, guardian: <IconSwords size={32} />,
  trickster: <IconMasks size={32} />, zealot: <IconFire size={32} />,
}

const SYSTEM_LABELS: Record<string, string> = {
  'fate-core': 'Fate Core', 'fate-accelerated': 'Accelerated', 'book-of-ashes': 'Книга Пепла',
}

interface NpcTemplateSelectorProps {
  onSelect: (template: NpcTemplate) => void
  onSkip: () => void
}

export default function NpcTemplateSelector({ onSelect, onSkip }: NpcTemplateSelectorProps) {
  const { t, i18n } = useTranslation()
  const activeTemplates = i18n.language.startsWith('en') ? npcTemplatesEn : npcTemplates
  const [customTemplates, setCustomTemplates] = useState<CustomNpcTemplate[]>(getCustomTemplates)
  const [search, setSearch] = useState('')
  const [builtinOpen, setBuiltinOpen] = useState(true)
  const [customOpen, setCustomOpen] = useState(true)

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!confirm(t('npc_template.delete_confirm'))) return
    deleteCustomTemplate(id)
    setCustomTemplates(getCustomTemplates())
  }

  const q = search.toLowerCase().trim()
  const filteredBuiltin = activeTemplates.filter(t => !q || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
  const filteredCustom = customTemplates.filter(t => !q || t.name.toLowerCase().includes(q) || (t.description ?? '').toLowerCase().includes(q))

  const systemBadge = (systemId: string) => (
    <span style={{ fontSize: '10px', fontWeight: 600, padding: '2px 7px', borderRadius: '20px', alignSelf: 'flex-start', background: 'var(--surface-3)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
      {SYSTEM_LABELS[systemId] ?? systemId}
    </span>
  )

  const SectionHeader = ({ title, count, open, onToggle }: { title: string; count: number; open: boolean; onToggle: () => void }) => (
    <button onClick={onToggle} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', padding: 0, width: '100%', textAlign: 'left' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontFamily: 'Cinzel, serif', fontSize: '11px', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{title}</span>
        <span style={{ fontSize: '11px', fontWeight: 600, padding: '1px 7px', borderRadius: '20px', background: 'var(--surface-2)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>{count}</span>
      </div>
      <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'inline-block', transition: 'transform 0.2s', transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▼</span>
    </button>
  )

  const cardStyle = { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '14px', cursor: 'pointer', transition: 'all 0.15s ease', display: 'flex', flexDirection: 'column' as const, gap: '8px' }
  const cardHover = (e: React.MouseEvent, enter: boolean) => {
    const el = e.currentTarget as HTMLElement
    el.style.borderColor = enter ? 'var(--border-accent)' : 'var(--border)'
    el.style.background = enter ? 'var(--surface-2)' : 'var(--surface)'
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', width: 18, height: 18, display: 'flex', alignItems: 'center' }}><IconSearch size={18} /></div>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t('npc_template.search_placeholder')}
          style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--input-border)', borderRadius: '10px', padding: '9px 34px', fontSize: '13px', color: 'var(--input-text)', outline: 'none', fontFamily: 'DM Sans, sans-serif', boxSizing: 'border-box' }}
          onFocus={e => { e.target.style.borderColor = 'var(--input-border-focus)'; e.target.style.boxShadow = 'var(--input-shadow-focus)' }}
          onBlur={e => { e.target.style.borderColor = 'var(--input-border)'; e.target.style.boxShadow = 'none' }}
        />
        {search && <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '18px', lineHeight: 1 }}>×</button>}
      </div>

      {q && filteredBuiltin.length === 0 && filteredCustom.length === 0 && (
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', padding: '16px 0', margin: 0 }}>
          {t('npc_template.not_found', { query: search })}
        </p>
      )}

      {filteredBuiltin.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <SectionHeader title={t('npc_template.section_builtin')} count={filteredBuiltin.length} open={builtinOpen} onToggle={() => setBuiltinOpen(o => !o)} />
          {builtinOpen && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {filteredBuiltin.map(template => (
                <div key={template.id} onClick={() => onSelect(template)} style={cardStyle} onMouseEnter={e => cardHover(e, true)} onMouseLeave={e => cardHover(e, false)}>
                  <div style={{ width: 32, height: 32 }}>{BUILTIN_ICONS[template.id] ?? <IconSwords size={32} />}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <p style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text)', margin: 0 }}>{template.name}</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{template.description}</p>
                    {systemBadge(template.character.systemId)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {filteredCustom.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ height: '1px', background: 'var(--border)' }} />
          <SectionHeader title={t('npc_template.section_custom')} count={filteredCustom.length} open={customOpen} onToggle={() => setCustomOpen(o => !o)} />
          {customOpen && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {filteredCustom.map(template => (
                <div key={template.id} onClick={() => onSelect(template)} style={{ ...cardStyle, position: 'relative' }} onMouseEnter={e => cardHover(e, true)} onMouseLeave={e => cardHover(e, false)}>
                  <button onClick={e => handleDelete(template.id, e)} style={{ position: 'absolute', top: '8px', right: '8px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px', borderRadius: '6px', display: 'flex', alignItems: 'center' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
                  ><IconDelete size={14} /></button>
                  <div style={{ width: 32, height: 32 }}>{getIconComponent(template.iconId, 32)}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <p style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text)', margin: 0, paddingRight: '20px' }}>{template.name}</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{template.description || t('npc_template.my_template')}</p>
                    {systemBadge(template.character.systemId)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <button onClick={onSkip} style={{ background: 'none', border: 'none', color: 'var(--accent)', fontSize: '14px', fontWeight: 500, cursor: 'pointer', padding: '8px', textAlign: 'center', fontFamily: 'DM Sans, sans-serif' }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.textDecoration = 'underline'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.textDecoration = 'none'}
      >
        {t('npc_template.skip')}
      </button>
    </div>
  )
}
