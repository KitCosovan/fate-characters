import { systemsList } from '../../data'
import { Badge } from '../ui'
import { SectionTitle } from '../character/AspectsSection'

const systemDescriptions: Record<string, { icon: string; details: string[] }> = {
  'fate-core': {
    icon: '⚔️',
    details: ['18 навыков', 'Пирамида до +4', '5 аспектов', 'До 5 трюков'],
  },
  'fate-accelerated': {
    icon: '⚡',
    details: ['6 подходов', 'Рейтинги подходов', '5 аспектов', 'До 3 трюков'],
  },
  'book-of-ashes': {
    icon: '🔥',
    details: ['20 навыков', 'Пирамида до +3', 'Шрамы', '6 слотов снаряжения'],
  },
}

interface SystemSelectorProps {
  selected: string
  onSelect: (systemId: string) => void
}

export default function SystemSelector({ selected, onSelect }: SystemSelectorProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <SectionTitle>Система</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {systemsList.map(system => {
          const meta = systemDescriptions[system.id]
          const isSelected = selected === system.id
          return (
            <div
              key={system.id}
              onClick={() => onSelect(system.id)}
              style={{
                background: isSelected ? 'var(--accent-glow)' : 'var(--surface)',
                border: isSelected ? '1px solid var(--border-accent)' : '1px solid var(--border)',
                borderRadius: '14px',
                padding: '14px 16px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
              }}
              onMouseEnter={e => {
                if (!isSelected) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-accent)'
              }}
              onMouseLeave={e => {
                if (!isSelected) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '24px' }}>{meta?.icon}</span>
                <div>
                  <p style={{
                    fontWeight: 600,
                    fontSize: '15px',
                    color: isSelected ? 'var(--accent)' : 'var(--text)',
                    margin: 0,
                    marginBottom: '6px',
                  }}>
                    {system.name}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {meta?.details.map(d => (
                      <Badge key={d} variant="default">{d}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              {isSelected && <Badge variant="accent">✓ Выбрано</Badge>}
            </div>
          )
        })}
      </div>
    </div>
  )
}