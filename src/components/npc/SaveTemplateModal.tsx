// src/components/npc/SaveTemplateModal.tsx
import { useState } from 'react'
import { Modal } from '../ui'
import { ICON_OPTIONS, getIconComponent } from './iconOptions'

interface SaveTemplateModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (name: string, iconId: string) => void
  defaultName?: string
}

export default function SaveTemplateModal({
  isOpen, onClose, onSave, defaultName = '',
}: SaveTemplateModalProps) {
  const [name, setName] = useState(defaultName)
  const [selectedIcon, setSelectedIcon] = useState('swords')

  const handleSave = () => {
    if (!name.trim()) return
    onSave(name.trim(), selectedIcon)
    setName('')
    setSelectedIcon('swords')
  }

  const selectedOption = ICON_OPTIONS.find(i => i.id === selectedIcon)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Сохранить как шаблон"
      confirmLabel="Сохранить"
      onConfirm={handleSave}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

        {/* Название */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{
            fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)',
            textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>
            Название шаблона
          </label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Например: Городской стражник"
            autoFocus
            onKeyDown={e => e.key === 'Enter' && handleSave()}
            style={{
              background: 'var(--input-bg)', border: '1px solid var(--input-border)',
              borderRadius: '10px', padding: '10px 14px', fontSize: '14px',
              color: 'var(--input-text)', outline: 'none', fontFamily: 'DM Sans, sans-serif',
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
        </div>

        {/* Выбор иконки */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{
            fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)',
            textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>
            Иконка
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
            {ICON_OPTIONS.map(icon => (
              <button
                key={icon.id}
                onClick={() => setSelectedIcon(icon.id)}
                title={icon.label}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  justifyContent: 'center', gap: '4px',
                  padding: '8px 4px', borderRadius: '10px', border: 'none',
                  cursor: 'pointer', transition: 'all 0.15s',
                  background: selectedIcon === icon.id ? 'var(--accent-glow)' : 'var(--surface-2)',
                  outline: selectedIcon === icon.id
                    ? '1.5px solid var(--border-accent)'
                    : '1px solid var(--border)',
                }}
              >
                <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center' }}>
                  {icon.component}
                </div>
                <span style={{
                  fontSize: '9px', fontFamily: 'DM Sans, sans-serif',
                  color: selectedIcon === icon.id ? 'var(--accent)' : 'var(--text-muted)',
                  lineHeight: 1.2, textAlign: 'center',
                }}>
                  {icon.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Превью */}
        {name.trim() && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            background: 'var(--surface-2)', border: '1px solid var(--border-accent)',
            borderRadius: '12px', padding: '12px 16px',
          }}>
            <div style={{ width: 36, height: 36, flexShrink: 0 }}>
              {getIconComponent(selectedIcon, 36)}
            </div>
            <div>
              <p style={{
                fontSize: '14px', fontWeight: 700, color: 'var(--text)',
                margin: '0 0 2px', fontFamily: 'Cinzel, serif',
              }}>
                {name}
              </p>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
                Мой шаблон • {selectedOption?.label}
              </p>
            </div>
          </div>
        )}

      </div>
    </Modal>
  )
}
