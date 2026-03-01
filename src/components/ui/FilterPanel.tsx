import { systemsList } from '../../data'
import { IconSwords, IconLightning, IconFire } from './FateIcons'

const SYSTEM_ICONS: Record<string, React.ReactNode> = {
  'fate-core': <IconSwords size={16} />,
  'fate-accelerated': <IconLightning size={16} />,
  'book-of-ashes': <IconFire size={16} />,
}

interface FilterPanelProps {
  selected: string | null
  onChange: (systemId: string | null) => void
}

export default function FilterPanel({ selected, onChange }: FilterPanelProps) {
  return (
    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
      <button
        onClick={() => onChange(null)}
        style={{
          padding: '5px 12px', borderRadius: '20px',
          border: `1px solid ${selected === null ? 'var(--border-accent)' : 'var(--border)'}`,
          background: selected === null ? 'var(--accent-glow)' : 'var(--surface-2)',
          color: selected === null ? 'var(--accent)' : 'var(--text-dim)',
          fontSize: '12px', fontWeight: 600, cursor: 'pointer',
          fontFamily: 'DM Sans, sans-serif', transition: 'all 0.15s',
        }}
      >
        Все
      </button>
      {systemsList.map(s => (
        <button
          key={s.id}
          onClick={() => onChange(selected === s.id ? null : s.id)}
          style={{
            padding: '5px 12px', borderRadius: '20px',
            border: `1px solid ${selected === s.id ? 'var(--border-accent)' : 'var(--border)'}`,
            background: selected === s.id ? 'var(--accent-glow)' : 'var(--surface-2)',
            color: selected === s.id ? 'var(--accent)' : 'var(--text-dim)',
            fontSize: '12px', fontWeight: 600, cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif', transition: 'all 0.15s',
            display: 'flex', alignItems: 'center', gap: '4px',
          }}
        >
          <div style={{ width: 16, height: 16, flexShrink: 0 }}>{SYSTEM_ICONS[s.id]}</div>
          {s.name}
        </button>
      ))}
    </div>
  )
}