import { useLocation, useNavigate } from 'react-router-dom'

const NAV_ITEMS = [
  { path: '/', label: 'Персонажи', icon: '🧙', exact: true },
  { path: '/character/create', label: 'Создать', icon: '＋', exact: false },
  { path: '/npc/create', label: 'НПС', icon: '👤', exact: false },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  const showNav = location.pathname === '/'
  if (!showNav) return null

  return (
    <>
      <style>{`
        .bottom-nav {
          display: none;
        }
        @media (max-width: 640px) {
          .bottom-nav {
            display: flex;
          }
        }
      `}</style>
      <nav className="bottom-nav" style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        zIndex: 40,
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}>
        {NAV_ITEMS.map(item => {
          const isActive = item.exact
            ? location.pathname === item.path
            : location.pathname.startsWith(item.path) && item.path !== '/'

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
                padding: '10px 0',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                transition: 'color 0.15s',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              <span style={{ fontSize: '20px', lineHeight: 1 }}>{item.icon}</span>
              <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.04em' }}>
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>
    </>
  )
}