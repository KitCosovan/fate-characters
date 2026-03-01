import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { Link, useLocation } from 'react-router-dom'
import { IconFire, IconBook, IconSun, IconMoon, IconSwords, IconLightning } from '../ui/FateIcons'

const THEME_ICONS: Record<string, React.ReactNode> = {
  'light': <IconSun size={18} />,
  'dark': <IconMoon size={18} />,
  'fate-core': <IconSwords size={18} />,
  'fate-accelerated': <IconLightning size={18} />,
  'book-of-ashes': <IconFire size={18} />,
}

export default function Navbar() {
  const { themeId, theme, themes, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header style={{
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 0, zIndex: 40,
    }}>
      <div style={{
        maxWidth: '672px', margin: '0 auto', padding: '0 16px',
        height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>

        {/* Логотип */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IconFire size={24} />
          <span style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, fontSize: '15px', color: 'var(--accent)', letterSpacing: '0.06em' }}>
            FATE CHARACTERS
          </span>
        </Link>

        {/* Энциклопедия */}
        <Link
          to="/encyclopedia"
          style={{
            textDecoration: 'none', fontSize: '12px', fontWeight: 600,
            color: location.pathname === '/encyclopedia' ? 'var(--accent)' : 'var(--text-muted)',
            padding: '6px 12px', borderRadius: '20px',
            background: location.pathname === '/encyclopedia' ? 'var(--accent-glow)' : 'transparent',
            border: `1px solid ${location.pathname === '/encyclopedia' ? 'var(--border-accent)' : 'transparent'}`,
            transition: 'all 0.15s', fontFamily: 'DM Sans, sans-serif',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}
        >
          <div style={{ width: 16, height: 16, display: 'flex', alignItems: 'center' }}>
            <IconBook size={16} />
          </div>
          <span>Энциклопедия</span>
        </Link>

        {/* Переключатель тем */}
        <div ref={ref} style={{ position: 'relative' }}>
          <button
            onClick={() => setOpen(o => !o)}
            style={{
              background: 'var(--surface-2)', border: '1px solid var(--border)',
              borderRadius: '20px', padding: '6px 14px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px',
              fontSize: '12px', fontWeight: 600, color: 'var(--text-dim)',
              fontFamily: 'DM Sans, sans-serif', transition: 'all 0.15s ease',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-accent)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
          >
            {/* ← было: theme.icon */}
            <div style={{ width: 18, height: 18, display: 'flex', alignItems: 'center' }}>
              {THEME_ICONS[themeId]}
            </div>
            <span>{theme.name}</span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{open ? '▲' : '▼'}</span>
          </button>

          {open && (
            <div className="fade-up" style={{
              position: 'absolute', top: 'calc(100% + 8px)', right: 0,
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '14px', padding: '6px', minWidth: '180px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)', zIndex: 100,
            }}>
              {themes.map(t => (
                <button
                  key={t.id}
                  onClick={() => { setTheme(t.id); setOpen(false) }}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '9px 12px', borderRadius: '9px', border: 'none',
                    background: themeId === t.id ? 'var(--surface-3)' : 'transparent',
                    cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: '13px',
                    fontWeight: themeId === t.id ? 600 : 400,
                    color: themeId === t.id ? 'var(--text)' : 'var(--text-dim)',
                    textAlign: 'left', transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => { if (themeId !== t.id) (e.currentTarget as HTMLElement).style.background = 'var(--surface-2)' }}
                  onMouseLeave={e => { if (themeId !== t.id) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                >
                  {/* ← было: t.icon */}
                  <div style={{ width: 18, height: 18, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                    {THEME_ICONS[t.id]}
                  </div>
                  <span>{t.name}</span>
                  {themeId === t.id && (
                    <span style={{ marginLeft: 'auto', color: 'var(--accent)', fontSize: '12px' }}>✓</span>
                  )}
                </button>
              ))}

              <div style={{ height: '1px', background: 'var(--border)', margin: '6px 0' }} />
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', padding: '4px 12px', margin: 0 }}>
                Тема сохраняется автоматически
              </p>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}