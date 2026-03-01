import { systemsList } from '../../data'
import { Badge } from '../ui'
import { SectionTitle } from '../character/AspectsSection'
import { IconSwords, IconLightning, IconFire } from '../ui/FateIcons'

const systemDescriptions: Record<string, { icon: React.ReactNode; details: string[] }> = {
  'fate-core': {
    icon: <IconSwords size={32} />,
    details: ['18 навыков', 'Пирамида до +4', '5 аспектов', 'До 5 трюков'],
  },
  'fate-accelerated': {
    icon: <IconLightning size={32} />,
    details: ['6 подходов', 'Рейтинги подходов', '5 аспектов', 'До 3 трюков'],
  },
  'book-of-ashes': {
    icon: <IconFire size={32} />,
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
                borderRadius: '14px', padding: '14px 16px', cursor: 'pointer',
                transition: 'all 0.15s ease', display: 'flex',
                alignItems: 'center', justifyContent: 'space-between', gap: '12px',
              }}
              onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-accent)' }}
              onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Иконка без span-обёртки */}
                <div style={{ width: 32, height: 32, flexShrink: 0 }}>{meta?.icon}</div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '15px', color: isSelected ? 'var(--accent)' : 'var(--text)', margin: '0 0 6px' }}>
                    {system.name}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {meta?.details.map(d => <Badge key={d} variant="default">{d}</Badge>)}
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