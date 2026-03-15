// src/components/ui/FilterPanel.tsx
import { useTranslation } from 'react-i18next'
import { systemsList } from '../../data'
import { IconSwords, IconLightning, IconFire } from './FateIcons'

const SYSTEM_ICONS: Record<string, React.ReactNode> = {
  'fate-core':        <IconSwords size={16} />,
  'fate-accelerated': <IconLightning size={16} />,
  'book-of-ashes':    <IconFire size={16} />,
}

interface FilterPanelProps {
  selected: string | null
  onChange: (systemId: string | null) => void
}

export default function FilterPanel({ selected, onChange }: FilterPanelProps) {
  const { t } = useTranslation()

  const btnStyle = (active: boolean) => ({
    padding: '5px 12px', borderRadius: '20px',
    border: `1px solid ${active ? 'var(--border-accent)' : 'var(--border)'}`,
    background: active ? 'var(--accent-glow)' : 'var(--surface-2)',
    color: active ? 'var(--accent)' : 'var(--text-dim)',
    fontSize: '12px', fontWeight: 600, cursor: 'pointer',
    fontFamily: 'DM Sans, sans-serif', transition: 'all 0.15s',
  })

  return (
    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
      <button onClick={() => onChange(null)} style={btnStyle(selected === null)}>
        {t('filter.all')}
      </button>
      {systemsList.map(s => (
        <button key={s.id} onClick={() => onChange(selected === s.id ? null : s.id)}
          style={{ ...btnStyle(selected === s.id), display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <div style={{ width: 16, height: 16, flexShrink: 0 }}>{SYSTEM_ICONS[s.id]}</div>
          {t(`themes.${s.id}`, s.name)}
        </button>
      ))}
    </div>
  )
}
