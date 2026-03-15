// src/components/layout/Navbar.tsx
import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { IconFire, IconBook, IconSun, IconMoon, IconSwords, IconLightning } from '../ui/FateIcons'
import UserMenu from '../auth/UserMenu'

const THEME_ICONS: Record<string, React.ReactNode> = {
  'light': <IconSun size={18} />,
  'dark': <IconMoon size={18} />,
  'fate-core': <IconSwords size={18} />,
  'fate-accelerated': <IconLightning size={18} />,
  'book-of-ashes': <IconFire size={18} />,
}

function NavLink({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  const location = useLocation()
  const active = location.pathname === to
  return (
    <Link to={to} style={{
      textDecoration: 'none', fontSize: '12px', fontWeight: 600,
      color: active ? 'var(--accent)' : 'var(--text-muted)',
      padding: '6px 12px', borderRadius: '20px',
      background: active ? 'var(--accent-glow)' : 'transparent',
      border: `1px solid ${active ? 'var(--border-accent)' : 'transparent'}`,
      transition: 'all 0.15s', fontFamily: 'DM Sans, sans-serif',
      display: 'flex', alignItems: 'center', gap: '6px',
    }} className="hide-on-mobile">
      <div style={{ width: 16, height: 16, display: 'flex', alignItems: 'center' }}>{icon}</div>
      <span>{label}</span>
    </Link>
  )
}

export default function Navbar() {
  const { themeId, theme, themes, setTheme } = useTheme()
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header style={{
      background: 'var(--surface)', borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 0, zIndex: 40, paddingTop: 'env(safe-area-inset-top)',
    }}>
      <div style={{
        maxWidth: '960px', margin: '0 auto', padding: '0 24px',
        height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px',
      }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <IconFire size={24} />
          <span style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, fontSize: '15px', color: 'var(--accent)', letterSpacing: '0.06em' }}>
            {t('nav.title')}
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <NavLink to="/encyclopedia" icon={<IconBook size={16} />} label={t('nav.encyclopedia')} />
          <NavLink to="/rules" icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          } label={t('nav.rules')} />
          <NavLink to="/faq" icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          } label={t('nav.faq')} />
        </div>

        <div ref={ref} style={{ position: 'relative', flexShrink: 0 }}>
          <button onClick={() => setOpen(o => !o)} style={{
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: '20px', padding: '6px 14px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '6px',
            fontSize: '12px', fontWeight: 600, color: 'var(--text-dim)',
            fontFamily: 'DM Sans, sans-serif', transition: 'all 0.15s ease',
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-accent)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
          >
            <div style={{ width: 18, height: 18, display: 'flex', alignItems: 'center' }}>{THEME_ICONS[themeId]}</div>
            <span className="hide-on-mobile">{t(`themes.${themeId}`, theme.name)}</span>
            <span className="hide-on-mobile" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{open ? '▲' : '▼'}</span>
          </button>

          {open && (
            <div className="fade-up" style={{
              position: 'absolute', top: 'calc(100% + 8px)', right: 0,
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '14px', padding: '6px', minWidth: '180px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)', zIndex: 100,
            }}>
              {themes.map(th => (
                <button key={th.id} onClick={() => { setTheme(th.id); setOpen(false) }} style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '9px 12px', borderRadius: '9px', border: 'none',
                  background: themeId === th.id ? 'var(--surface-3)' : 'transparent',
                  cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: '13px',
                  fontWeight: themeId === th.id ? 600 : 400,
                  color: themeId === th.id ? 'var(--text)' : 'var(--text-dim)',
                  textAlign: 'left', transition: 'background 0.1s',
                }}
                  onMouseEnter={e => { if (themeId !== th.id) (e.currentTarget as HTMLElement).style.background = 'var(--surface-2)' }}
                  onMouseLeave={e => { if (themeId !== th.id) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                >
                  <div style={{ width: 18, height: 18, display: 'flex', alignItems: 'center', flexShrink: 0 }}>{THEME_ICONS[th.id]}</div>
                  <span>{t(`themes.${th.id}`, th.name)}</span>
                  {themeId === th.id && <span style={{ marginLeft: 'auto', color: 'var(--accent)', fontSize: '12px' }}>✓</span>}
                </button>
              ))}
              <div style={{ height: '1px', background: 'var(--border)', margin: '6px 0' }} />
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', padding: '4px 12px', margin: 0 }}>
                {t('themes.auto_save')}
              </p>
            </div>
          )}
        </div>

        <UserMenu />
      </div>
    </header>
  )
}
