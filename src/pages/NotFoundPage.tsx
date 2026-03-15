// src/pages/NotFoundPage.tsx
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function NotFoundPage() {
  const { t } = useTranslation()
  return (
    <div style={{ textAlign: 'center', padding: '80px 0' }} className="fade-up">
      <p style={{ fontSize: '56px', marginBottom: '16px' }}>🌀</p>
      <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '20px', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
        {t('not_found.title')}
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
        {t('not_found.hint')}
      </p>
      <Link to="/" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>
        {t('not_found.back')}
      </Link>
    </div>
  )
}
