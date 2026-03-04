// src/components/npc/NpcTemplateSelector.tsx
import { useState } from 'react'
import { npcTemplates } from '../../data/npcTemplates'
import { getCustomTemplates, deleteCustomTemplate } from '../../data/customTemplates'
import type { NpcTemplate } from '../../types'
import type { CustomNpcTemplate } from '../../data/customTemplates'
import { SectionTitle } from '../character/AspectsSection'
import {
  IconSwords, IconSpeech, IconDagger, IconSkull,
  IconBook, IconMasks, IconFire, IconCheck, IconDelete, IconSearch,
} from '../ui/FateIcons'
import { getIconComponent } from './iconOptions'

const BUILTIN_ICONS: Record<string, React.ReactNode> = {
  fighter:   <IconSwords size={32} />,
  socialite: <IconSpeech size={32} />,
  mook:      <IconDagger size={32} />,
  boss:      <IconSkull size={32} />,
  assassin:  <IconDagger size={32} />,
  scholar:   <IconBook size={32} />,
  merchant:  <IconCheck size={32} />,
  guardian:  <IconSwords size={32} />,
  trickster: <IconMasks size={32} />,
  zealot:    <IconFire size={32} />,
}

const SYSTEM_LABELS: Record<string, string> = {
  'fate-core': 'Fate Core',
  'fate-accelerated': 'Accelerated',
  'book-of-ashes': 'Книга Пепла',
}

interface NpcTemplateSelectorProps {
  onSelect: (template: NpcTemplate) => void
  onSkip: () => void
}

export default function NpcTemplateSelector({ onSelect, onSkip }: NpcTemplateSelectorProps) {
  const [customTemplates, setCustomTemplates] = useState<CustomNpcTemplate[]>(getCustomTemplates)
  const [search, setSearch] = useState('')
  const [builtinOpen, setBuiltinOpen] = useState(true)
  const [customOpen, setCustomOpen] = useState(true)

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!confirm('Удалить этот шаблон?')) return
    deleteCustomTemplate(id)
    setCustomTemplates(getCustomTemplates())
  }

  const q = search.toLowerCase().trim()
  const filteredBuiltin = npcTemplates.filter(t =>
    !q || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
  )
  const filteredCustom = customTemplates.filter(t =>
    !q || t.name.toLowerCase().includes(q) || (t.description ?? '').toLowerCase().includes(q)
  )

  const systemBadge = (systemId: string) => (
    <span style={{
      fontSize: '10px', fontWeight: 600, padding: '2px 7px',
      borderRadius: '20px', alignSelf: 'flex-start',
      background: 'var(--surface-3)', color: 'var(--text-muted)',
      border: '1px solid var(--border)',
    }}>
      {SYSTEM_LABELS[systemId] ?? systemId}
    </span>
  )

  const SectionHeader = ({
    title, count, open, onToggle,
  }: { title: string; count: number; open: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'none', border: 'none', cursor: 'pointer',
        padding: '0', width: '100%', textAlign: 'left',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{
          fontFamily: 'Cinzel, serif', fontSize: '11px', fontWeight: 700,
          color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>
          {title}
        </span>
        <span style={{
          fontSize: '11px', fontWeight: 600, padding: '1px 7px', borderRadius: '20px',
          background: 'var(--surface-2)', color: 'var(--text-muted)',
          border: '1px solid var(--border)',
        }}>
          {count}
        </span>
      </div>
      <span style={{
        fontSize: '11px', color: 'var(--text-muted)',
        display: 'inline-block', transition: 'transform 0.2s',
        transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
      }}>
        ▼
      </span>
    </button>
  )

  const renderBuiltinCard = (template: NpcTemplate) => (
    <div
      key={template.id}
      onClick={() => onSelect(template)}
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: '14px', padding: '14px', cursor: 'pointer',
        transition: 'all 0.15s ease', display: 'flex', flexDirection: 'column', gap: '8px',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--border-accent)'
        el.style.background = 'var(--surface-2)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--border)'
        el.style.background = 'var(--surface)'
      }}
    >
      <div style={{ width: 32, height: 32 }}>
        {BUILTIN_ICONS[template.id] ?? <IconSwords size={32} />}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <p style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text)', margin: 0 }}>
          {template.name}
        </p>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
          {template.description}
        </p>
        {systemBadge(template.character.systemId)}
      </div>
    </div>
  )

  const renderCustomCard = (template: CustomNpcTemplate) => (
    <div
      key={template.id}
      onClick={() => onSelect(template)}
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: '14px', padding: '14px', cursor: 'pointer',
        transition: 'all 0.15s ease', display: 'flex', flexDirection: 'column',
        gap: '8px', position: 'relative',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--border-accent)'
        el.style.background = 'var(--surface-2)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--border)'
        el.style.background = 'var(--surface)'
      }}
    >
      <button
        onClick={e => handleDelete(template.id, e)}
        title="Удалить шаблон"
        style={{
          position: 'absolute', top: '8px', right: '8px',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text-muted)', padding: '4px', borderRadius: '6px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'color 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent)'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
      >
        <IconDelete size={14} />
      </button>

      <div style={{ width: 32, height: 32 }}>
        {getIconComponent(template.iconId, 32)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <p style={{
          fontWeight: 600, fontSize: '14px', color: 'var(--text)',
          margin: 0, paddingRight: '20px',
        }}>
          {template.name}
        </p>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
          {template.description || 'Мой шаблон'}
        </p>
        {systemBadge(template.character.systemId)}
      </div>
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Поиск */}
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', left: '10px', top: '50%',
          transform: 'translateY(-50%)', pointerEvents: 'none',
          width: 18, height: 18, display: 'flex', alignItems: 'center',
        }}>
          <IconSearch size={18} />
        </div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Поиск по шаблонам..."
          style={{
            width: '100%', background: 'var(--input-bg)',
            border: '1px solid var(--input-border)', borderRadius: '10px',
            padding: '9px 34px 9px 34px', fontSize: '13px',
            color: 'var(--input-text)', outline: 'none',
            fontFamily: 'DM Sans, sans-serif', boxSizing: 'border-box',
          }}
          onFocus={e => {
            e.target.style.borderColor = 'var(--input-border-focus)'
            e.target.style.boxShadow = 'var(--input-shadow-focus)'
          }}
          onBlur={e => {
            e.target.style.borderColor = 'var(--input-border)'
            e.target.style.boxShadow = 'none'
          }}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            style={{
              position: 'absolute', right: '10px', top: '50%',
              transform: 'translateY(-50%)', background: 'none', border: 'none',
              cursor: 'pointer', color: 'var(--text-muted)', fontSize: '18px',
              display: 'flex', alignItems: 'center', padding: '2px', lineHeight: 1,
            }}
          >×</button>
        )}
      </div>

      {/* Ничего не найдено */}
      {q && filteredBuiltin.length === 0 && filteredCustom.length === 0 && (
        <p style={{
          fontSize: '13px', color: 'var(--text-muted)',
          textAlign: 'center', padding: '16px 0', margin: 0,
        }}>
          По запросу «{search}» ничего не найдено
        </p>
      )}

      {/* Встроенные шаблоны */}
      {filteredBuiltin.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <SectionHeader
            title="Шаблоны"
            count={filteredBuiltin.length}
            open={builtinOpen}
            onToggle={() => setBuiltinOpen(o => !o)}
          />
          {builtinOpen && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {filteredBuiltin.map(renderBuiltinCard)}
            </div>
          )}
        </div>
      )}

      {/* Мои шаблоны */}
      {filteredCustom.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ height: '1px', background: 'var(--border)' }} />
          <SectionHeader
            title="Мои шаблоны"
            count={filteredCustom.length}
            open={customOpen}
            onToggle={() => setCustomOpen(o => !o)}
          />
          {customOpen && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {filteredCustom.map(renderCustomCard)}
            </div>
          )}
        </div>
      )}

      {/* Пустой лист */}
      <button
        onClick={onSkip}
        style={{
          background: 'none', border: 'none', color: 'var(--accent)',
          fontSize: '14px', fontWeight: 500, cursor: 'pointer',
          padding: '8px', textAlign: 'center', fontFamily: 'DM Sans, sans-serif',
        }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.textDecoration = 'underline'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.textDecoration = 'none'}
      >
        Начать с пустого НПС →
      </button>
    </div>
  )
}
