import { npcTemplates } from '../../data/npcTemplates'
import type { NpcTemplate } from '../../types'
import { SectionTitle } from '../character/AspectsSection'
import { IconSwords, IconSpeech, IconDagger, IconSkull } from '../ui/FateIcons'

const TEMPLATE_ICONS: Record<string, React.ReactNode> = {
  'fighter':      <IconSwords size={32} />,
  'socialite':    <IconSpeech size={32} />,
  'mook':         <IconDagger size={32} />,
  'boss':         <IconSkull size={32} />,
}

interface NpcTemplateSelectorProps {
  onSelect: (template: NpcTemplate) => void
  onSkip: () => void
}

export default function NpcTemplateSelector({ onSelect, onSkip }: NpcTemplateSelectorProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <SectionTitle>Выбери шаблон</SectionTitle>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px', marginBottom: 0 }}>
          Или начни с чистого листа
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {npcTemplates.map(template => (
          <div
            key={template.id}
            onClick={() => onSelect(template)}
            style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '14px', padding: '14px', cursor: 'pointer',
              transition: 'all 0.15s ease', display: 'flex',
              flexDirection: 'column', gap: '8px',
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
              {TEMPLATE_ICONS[template.id] ?? <IconSwords size={32} />}
            </div>
            <div>
              <p style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text)', margin: '0 0 4px' }}>
                {template.name}
              </p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                {template.description}
              </p>
            </div>
          </div>
        ))}
      </div>

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