import type { Stunt } from '../../types'
import { Button } from '../ui'

interface StuntCardProps {
  stunt: Stunt
  onRemove: () => void
  onChange: (stunt: Stunt) => void
}

const inputStyle: React.CSSProperties = {
  background: 'var(--input-bg)',
  border: '1px solid var(--input-border)',
  borderRadius: '10px',
  padding: '8px 12px',
  fontSize: '14px',
  color: 'var(--input-text)',
  outline: 'none',
  fontFamily: 'DM Sans, sans-serif',
  transition: 'border-color 0.15s, box-shadow 0.15s',
  width: '100%',
}

const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.target.style.borderColor = 'var(--input-border-focus)'
  e.target.style.boxShadow = 'var(--input-shadow-focus)'
}

const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.target.style.borderColor = 'var(--input-border)'
  e.target.style.boxShadow = 'none'
}

export default function StuntCard({ stunt, onRemove, onChange }: StuntCardProps) {
  return (
    <div style={{
      background: 'var(--surface-2)',
      border: '1px solid var(--border)',
      borderRadius: '14px',
      padding: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          style={{ ...inputStyle }}
          placeholder="Название трюка"
          value={stunt.name}
          onChange={e => onChange({ ...stunt, name: e.target.value })}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <Button variant="danger" size="sm" onClick={onRemove}>✕</Button>
      </div>
      <textarea
        style={{ ...inputStyle, resize: 'none' }}
        placeholder="Описание: что даёт этот трюк?"
        rows={2}
        value={stunt.description}
        onChange={e => onChange({ ...stunt, description: e.target.value })}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  )
}