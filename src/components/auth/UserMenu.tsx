// src/components/auth/UserMenu.tsx
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useCharacterStore } from '../../store/characterStore'
import { useCampaignStore } from '../../store/campaignStore'
import { useTranslation } from 'react-i18next'

export default function UserMenu() {
  const navigate = useNavigate()
  const { user, signOut } = useAuthStore()
  const syncCharacters = useCharacterStore(s => s.syncWithRemote)
  const syncCampaigns  = useCampaignStore(s => s.syncWithRemote)
  const syncing        = useCharacterStore(s => s.syncing)
  const { t, i18n }   = useTranslation()

  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSync = async () => {
    if (!user) return
    await Promise.all([syncCharacters(user.id), syncCampaigns(user.id)])
    setOpen(false)
  }

  const handleSignOut = async () => {
    await signOut()
    setOpen(false)
  }

  const LangToggle = () => (
    <div style={{ display: 'flex', gap: '4px' }}>
      {(['ru', 'en'] as const).map(lang => (
        <button key={lang} onClick={() => i18n.changeLanguage(lang)} style={{
          padding: '3px 8px', borderRadius: '6px', border: 'none',
          cursor: 'pointer', fontSize: '11px', fontWeight: 700,
          fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.04em',
          transition: 'all 0.15s',
          background: i18n.language.startsWith(lang) ? 'var(--accent)' : 'var(--surface-3)',
          color: i18n.language.startsWith(lang) ? 'var(--bg)' : 'var(--text-muted)',
        }}>
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  )

  // Не залогинен
  if (!user) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <LangToggle />
        <button onClick={() => navigate('/auth')} style={{
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: '20px', padding: '6px 14px', cursor: 'pointer',
          fontSize: '12px', fontWeight: 600, color: 'var(--text-dim)',
          fontFamily: 'DM Sans, sans-serif', transition: 'all 0.15s',
        }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-accent)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
        >
          {t('nav.signIn')}
        </button>
      </div>
    )
  }

  const initials = user.email?.[0]?.toUpperCase() ?? '?'

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: 34, height: 34, borderRadius: '50%',
        background: 'var(--accent-glow)', border: '1px solid var(--border-accent)',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Cinzel, serif', fontSize: '13px', fontWeight: 700,
        color: 'var(--accent)', transition: 'all 0.15s',
      }}>
        {syncing
          ? <span style={{ fontSize: '16px', animation: 'spin 1s linear infinite' }}>⟳</span>
          : initials}
      </button>

      {open && (
        <div className="fade-up" style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: '14px', padding: '6px', minWidth: '210px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)', zIndex: 100,
        }}>
          <div style={{ padding: '8px 12px 6px' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0, wordBreak: 'break-all' }}>
              {user.email}
            </p>
          </div>
          <div style={{ height: '1px', background: 'var(--border)', margin: '4px 0' }} />

          {/* Синхронизировать */}
          <button onClick={handleSync} disabled={syncing} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: '8px',
            padding: '9px 12px', borderRadius: '9px', border: 'none',
            background: 'transparent', cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif', fontSize: '13px',
            color: 'var(--text-dim)', textAlign: 'left', transition: 'background 0.1s',
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--surface-2)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
          >
            <span>⟳</span>
            {syncing ? t('nav.syncing') : t('nav.sync')}
          </button>

          <div style={{ height: '1px', background: 'var(--border)', margin: '4px 0' }} />

          {/* Язык */}
          <div style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-dim)', fontFamily: 'DM Sans, sans-serif' }}>
              {t('nav.language')}
            </span>
            <LangToggle />
          </div>

          <div style={{ height: '1px', background: 'var(--border)', margin: '4px 0' }} />

          {/* Выйти */}
          <button onClick={handleSignOut} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: '8px',
            padding: '9px 12px', borderRadius: '9px', border: 'none',
            background: 'transparent', cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif', fontSize: '13px',
            color: '#e07070', textAlign: 'left', transition: 'background 0.1s',
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--surface-2)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
          >
            <span>→</span>
            {t('nav.signOut')}
          </button>
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
