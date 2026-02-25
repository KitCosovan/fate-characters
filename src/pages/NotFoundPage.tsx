import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 0' }} className="fade-up">
      <p style={{ fontSize: '56px', marginBottom: '16px' }}>🌀</p>
      <h1 style={{
        fontFamily: 'Cinzel, serif',
        fontSize: '20px',
        fontWeight: 700,
        color: 'var(--text)',
        margin: 0,
      }}>
        Страница не найдена
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
        Кажется, ты попал в зону без аспектов
      </p>
      <Link
        to="/"
        style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}
      >
        ← Вернуться на главную
      </Link>
    </div>
  )
}