import { Link } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'

export default function Navbar() {
  const { theme, toggle } = useTheme()

  return (
    <header style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 40 }}>
      <div style={{ maxWidth: '672px', margin: '0 auto', padding: '0 16px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>🔥</span>
          <span style={{
            fontFamily: 'Cinzel, serif',
            fontWeight: 700,
            fontSize: '15px',
            color: 'var(--accent)',
            letterSpacing: '0.06em',
          }}>
            FATE CHARACTERS
          </span>
        </Link>

        <button
          onClick={toggle}
          title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
          style={{
            background: 'var(--surface-3)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            padding: '5px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--text-dim)',
            fontFamily: 'DM Sans, sans-serif',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-accent)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
        >
          <span style={{ fontSize: '14px' }}>{theme === 'dark' ? '☀️' : '🌙'}</span>
          {theme === 'dark' ? 'Светлая' : 'Тёмная'}
        </button>
      </div>
    </header>
  )
}