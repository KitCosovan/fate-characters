// src/components/layout/BottomNav.tsx
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { IconCharacter, IconPlus, IconNpc, IconBook } from '../ui/FateIcons'

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [showMore, setShowMore] = useState(false)

  const showNav = ['/', '/encyclopedia', '/rules', '/faq'].includes(location.pathname) || location.pathname === '/'
  if (!showNav) return null

  const isMoreActive = ['/encyclopedia', '/rules', '/faq'].includes(location.pathname)

  const MAIN_ITEMS = [
    { path: '/',                 label: t('tabs.characters'), icon: <IconCharacter size={22} />, exact: true },
    { path: '/character/create', label: t('home.create'),     icon: <IconPlus size={22} />,     exact: false },
    { path: '/npc/create',       label: t('tabs.npcs'),       icon: <IconNpc size={22} />,      exact: false },
  ]

  const MORE_ITEMS = [
    { path: '/encyclopedia', label: t('nav.encyclopedia'), icon: <IconBook size={20} /> },
    {
      path: '/rules', label: t('nav.rules'),
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    },
    {
      path: '/faq', label: t('nav.faq'),
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    },
  ]

  const handleMoreItem = (path: string) => { navigate(path); setShowMore(false) }

  const activeIndicator = {
    position: 'absolute' as const, top: 0, left: '50%', transform: 'translateX(-50%)',
    width: '24px', height: '2px', background: 'var(--accent)', borderRadius: '0 0 2px 2px',
  }

  return (
    <>
      <style>{`.bottom-nav { display: none; } @media (max-width: 640px) { .bottom-nav { display: flex; } }`}</style>

      {showMore && <div style={{ position: 'fixed', inset: 0, zIndex: 38 }} onClick={() => setShowMore(false)} />}

      {showMore && (
        <div className="bottom-nav" style={{
          position: 'fixed', bottom: 'calc(64px + env(safe-area-inset-bottom))', right: 0, left: 0, zIndex: 39,
          display: 'flex', flexDirection: 'column', gap: '4px', padding: '8px',
          background: 'var(--surface)', borderTop: '1px solid var(--border)', boxShadow: '0 -4px 24px rgba(0,0,0,0.2)',
        }}>
          {MORE_ITEMS.map(item => (
            <button key={item.path} onClick={() => handleMoreItem(item.path)} style={{
              display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px', borderRadius: '12px', border: 'none',
              background: location.pathname === item.path ? 'var(--accent-glow)' : 'var(--surface-2)',
              cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
              color: location.pathname === item.path ? 'var(--accent)' : 'var(--text)',
              fontSize: '14px', fontWeight: 600, textAlign: 'left',
            }}>
              <div style={{ width: 20, height: 20, flexShrink: 0, color: location.pathname === item.path ? 'var(--accent)' : 'var(--text-muted)' }}>
                {item.icon}
              </div>
              {item.label}
              {location.pathname === item.path && <span style={{ marginLeft: 'auto', color: 'var(--accent)', fontSize: '12px' }}>✓</span>}
            </button>
          ))}
        </div>
      )}

      <nav className="bottom-nav" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'var(--surface)', borderTop: '1px solid var(--border)',
        zIndex: 40, paddingBottom: 'env(safe-area-inset-bottom)',
      }}>
        {MAIN_ITEMS.map(item => {
          const isActive = item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path) && item.path !== '/'
          return (
            <button key={item.path} onClick={() => { navigate(item.path); setShowMore(false) }} style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: '5px', padding: '14px 0 12px', border: 'none', background: 'none', cursor: 'pointer',
              color: isActive ? 'var(--accent)' : 'var(--text-muted)', transition: 'color 0.15s',
              fontFamily: 'DM Sans, sans-serif', position: 'relative',
            }}>
              {isActive && <div style={activeIndicator} />}
              <div style={{ width: 22, height: 22, display: 'flex', alignItems: 'center' }}>{item.icon}</div>
              <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.04em' }}>{item.label}</span>
            </button>
          )
        })}

        <button onClick={() => setShowMore(v => !v)} style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '5px', padding: '14px 0 12px', border: 'none', background: 'none', cursor: 'pointer',
          color: isMoreActive || showMore ? 'var(--accent)' : 'var(--text-muted)', transition: 'color 0.15s',
          fontFamily: 'DM Sans, sans-serif', position: 'relative',
        }}>
          {(isMoreActive || showMore) && <div style={activeIndicator} />}
          <div style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="5" r="1" fill="currentColor"/>
              <circle cx="12" cy="12" r="1" fill="currentColor"/>
              <circle cx="12" cy="19" r="1" fill="currentColor"/>
            </svg>
          </div>
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.04em' }}>{t('nav.more')}</span>
        </button>
      </nav>
    </>
  )
}
