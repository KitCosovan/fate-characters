import { SectionTitle } from './AspectsSection'

interface NotesSectionProps {
  notes: string
  onChange: (notes: string) => void
}

export default function NotesSection({ notes, onChange }: NotesSectionProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <SectionTitle>Заметки</SectionTitle>
      <textarea
        value={notes}
        onChange={e => onChange(e.target.value)}
        placeholder="Запиши что-нибудь полезное: детали истории, связи, планы, цитаты..."
        rows={5}
        style={{
          background: 'var(--input-bg)',
          border: '1px solid var(--input-border)',
          borderRadius: '12px',
          padding: '12px 14px',
          fontSize: '14px',
          color: 'var(--input-text)',
          outline: 'none',
          fontFamily: 'DM Sans, sans-serif',
          resize: 'vertical',
          width: '100%',
          lineHeight: 1.6,
          transition: 'border-color 0.15s, box-shadow 0.15s',
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
      <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
        {notes.length > 0 ? `${notes.length} символов` : 'Заметки видны только тебе'}
      </p>
    </div>
  )
}