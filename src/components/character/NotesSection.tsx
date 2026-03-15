// src/components/character/NotesSection.tsx
import { useTranslation } from 'react-i18next'
import { SectionTitle } from './AspectsSection'

interface NotesSectionProps {
  notes: string
  onChange: (notes: string) => void
}

export default function NotesSection({ notes, onChange }: NotesSectionProps) {
  const { t } = useTranslation()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <SectionTitle>{t('notes.label')}</SectionTitle>
      <textarea
        value={notes}
        onChange={e => onChange(e.target.value)}
        placeholder={t('notes.placeholder')}
        rows={5}
        style={{
          background: 'var(--input-bg)', border: '1px solid var(--input-border)',
          borderRadius: '12px', padding: '12px 14px', fontSize: '14px',
          color: 'var(--input-text)', outline: 'none', fontFamily: 'DM Sans, sans-serif',
          resize: 'vertical', width: '100%', lineHeight: 1.6,
          transition: 'border-color 0.15s, box-shadow 0.15s', boxSizing: 'border-box' as const,
        }}
        onFocus={e => { e.target.style.borderColor = 'var(--input-border-focus)'; e.target.style.boxShadow = 'var(--input-shadow-focus)' }}
        onBlur={e => { e.target.style.borderColor = 'var(--input-border)'; e.target.style.boxShadow = 'none' }}
      />
      <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
        {notes.length > 0 ? t('notes.chars', { count: notes.length }) : t('notes.private')}
      </p>
    </div>
  )
}
