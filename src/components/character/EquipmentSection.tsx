import type { EquipmentSlot } from '../../types'
import { SectionTitle } from './AspectsSection'

interface EquipmentSectionProps {
  equipment: EquipmentSlot[]
  totalSlots: number
  onChange: (equipment: EquipmentSlot[]) => void
}

const TYPE_LABELS = {
  weapon: '⚔️ Оружие',
  armor: '🛡️ Броня',
  resource: '🎒 Ресурс',
  relic: '✨ Реликвия',
  empty: '— пусто —',
}

export default function EquipmentSection({ equipment, totalSlots, onChange }: EquipmentSectionProps) {
  const usedSlots = equipment.filter(e => e.type !== 'empty').reduce((sum, e) => sum + e.slots, 0)

  const updateItem = (id: string, fields: Partial<EquipmentSlot>) => {
    onChange(equipment.map(e => e.id === id ? { ...e, ...fields } : e))
  }

  const clearItem = (id: string) => {
    onChange(equipment.map(e => e.id === id
      ? { ...e, name: '', slots: 1, freeInvokes: 0, type: 'empty' as const }
      : e
    ))
  }

  const inputStyle = {
    background: 'var(--input-bg)',
    border: '1px solid var(--input-border)',
    borderRadius: '8px',
    padding: '8px 12px',
    fontSize: '14px',
    color: 'var(--input-text)',
    outline: 'none',
    width: '100%',
    fontFamily: 'DM Sans, sans-serif',
  }

  const selectStyle = {
    background: 'var(--input-bg)',
    border: '1px solid var(--input-border)',
    borderRadius: '8px',
    padding: '6px 8px',
    fontSize: '12px',
    color: 'var(--input-text)',
    outline: 'none',
    fontFamily: 'DM Sans, sans-serif',
    cursor: 'pointer',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <SectionTitle>Снаряжение</SectionTitle>
        <span style={{
          fontSize: '11px', fontWeight: 600, padding: '2px 10px', borderRadius: '20px',
          background: usedSlots > totalSlots ? 'rgba(220,50,50,0.15)' : 'var(--surface-2)',
          color: usedSlots > totalSlots ? '#e05050' : 'var(--text-muted)',
          border: `1px solid ${usedSlots > totalSlots ? 'rgba(220,50,50,0.3)' : 'var(--border)'}`,
        }}>
          {usedSlots} / {totalSlots} слотов
        </span>
      </div>

      <div style={{
        background: 'var(--surface-2)', border: '1px solid var(--border)',
        borderRadius: '12px', padding: '12px', fontSize: '12px',
        color: 'var(--text-dim)', lineHeight: 1.5,
      }}>
        Снаряжение игнорирует правило одного бонуса. Оружие занимает слотов = урону. Броня = бесплатные призывы для защиты.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {equipment.map((item, index) => (
          <div key={item.id} style={{
            background: item.type !== 'empty' ? 'var(--surface)' : 'var(--surface)',
            border: `1px solid ${item.type !== 'empty' ? 'var(--border-accent)' : 'var(--border)'}`,
            borderRadius: '12px', padding: '12px',
            display: 'flex', flexDirection: 'column', gap: '8px',
            transition: 'border-color 0.15s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', minWidth: '16px' }}>
                {index + 1}.
              </span>
              <select
                value={item.type}
                onChange={e => updateItem(item.id, {
                  type: e.target.value as EquipmentSlot['type'],
                  name: '', freeInvokes: 0,
                })}
                style={selectStyle}
              >
                {Object.entries(TYPE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              {item.type !== 'empty' && (
                <button
                  onClick={() => clearItem(item.id)}
                  style={{
                    marginLeft: 'auto', background: 'none', border: 'none',
                    color: 'var(--text-muted)', cursor: 'pointer', fontSize: '14px',
                    padding: '2px 6px', borderRadius: '6px',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
                >✕</button>
              )}
            </div>

            {item.type !== 'empty' && (
              <>
                <input
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = 'var(--input-border-focus)'; e.target.style.boxShadow = 'var(--input-shadow-focus)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--input-border)'; e.target.style.boxShadow = 'none' }}
                  placeholder="Название предмета (аспект)"
                  value={item.name}
                  onChange={e => updateItem(item.id, { name: e.target.value })}
                />
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Слоты:</span>
                    <select
                      value={item.slots}
                      onChange={e => updateItem(item.id, { slots: Number(e.target.value) })}
                      style={{ ...selectStyle, padding: '4px 6px' }}
                    >
                      {[1, 2, 3].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  {(item.type === 'armor' || item.type === 'resource' || item.type === 'relic') && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Призывы:</span>
                      <select
                        value={item.freeInvokes}
                        onChange={e => updateItem(item.id, { freeInvokes: Number(e.target.value) })}
                        style={{ ...selectStyle, padding: '4px 6px' }}
                      >
                        {[0, 1, 2, 3].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}