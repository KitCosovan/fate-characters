import { systemsList } from '../../data'

interface FilterPanelProps {
  selected: string | null
  onChange: (systemId: string | null) => void
}

const SYSTEM_ICONS: Record<string, string> = {
  'fate-core': '⚔️',
  'fate-accelerated': '⚡',
  'book-of-ashes': '🔥',
}

export default function FilterPanel({ selected, onChange }: FilterPanelProps) {
  return (
    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
      <button
        onClick={() => onChange(null)}
        style={{
          padding: '5px 12px',
          borderRadius: '20px',
          border: `1px solid ${selected === null ? 'var(--border-accent)' : 'var(--border)'}`,
          background: selected === null ? 'var(--accent-glow)' : 'var(--surface-2)',
          color: selected === null ? 'var(--accent)' : 'var(--text-dim)',
          fontSize: '12px',
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'DM Sans, sans-serif',
          transition: 'all 0.15s',
        }}
      >
        Все
      </button>
      {systemsList.map(s => (
        <button
          key={s.id}
          onClick={() => onChange(selected === s.id ? null : s.id)}
          style={{
            padding: '5px 12px',
            borderRadius: '20px',
            border: `1px solid ${selected === s.id ? 'var(--border-accent)' : 'var(--border)'}`,
            background: selected === s.id ? 'var(--accent-glow)' : 'var(--surface-2)',
            color: selected === s.id ? 'var(--accent)' : 'var(--text-dim)',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
            transition: 'all 0.15s',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span>{SYSTEM_ICONS[s.id]}</span>
          {s.name}
        </button>
      ))}
    </div>
  )
}