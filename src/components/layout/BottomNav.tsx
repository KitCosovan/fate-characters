// src/components/layout/BottomNav.tsx
import { useLocation, useNavigate } from 'react-router-dom'
import { IconCharacter, IconPlus, IconNpc, IconBook } from '../ui/FateIcons'

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  const showNav = location.pathname === '/' || location.pathname === '/encyclopedia'
  if (!showNav) return null

  const NAV_ITEMS = [
    { path: '/', label: 'Персонажи', icon: <IconCharacter size={22} />, exact: true },
    { path: '/character/create', label: 'Создать', icon: <IconPlus size={22} />, exact: false },
    { path: '/npc/create', label: 'НПС', icon: <IconNpc size={22} />, exact: false },
    { path: '/encyclopedia', label: 'Энц.', icon: <IconBook size={22} />, exact: false },
  ]

  return (
    <>
      <style>{`
        .bottom-nav { display: none; }
        @media (max-width: 640px) { .bottom-nav { display: flex; } }
      `}</style>
      <nav className="bottom-nav" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'var(--surface)', borderTop: '1px solid var(--border)',
        zIndex: 40, paddingBottom: 'env(safe-area-inset-bottom)',
      }}>
        {NAV_ITEMS.map(item => {
          const isActive = item.exact
            ? location.pathname === item.path
            : location.pathname.startsWith(item.path) && item.path !== '/'

          return (
            <button key={item.path} onClick={() => navigate(item.path)} style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '5px', padding: '14px 0 12px',
              border: 'none', background: 'none', cursor: 'pointer',
              color: isActive ? 'var(--accent)' : 'var(--text-muted)',
              transition: 'color 0.15s', fontFamily: 'DM Sans, sans-serif',
              position: 'relative',
            }}>
              {isActive && (
                <div style={{
                  position: 'absolute', top: 0, left: '50%',
                  transform: 'translateX(-50%)',
                  width: '24px', height: '2px',
                  background: 'var(--accent)', borderRadius: '0 0 2px 2px',
                }} />
              )}
              <div style={{ width: 22, height: 22, display: 'flex', alignItems: 'center' }}>{item.icon}</div>
              <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.04em' }}>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </>
  )
}
