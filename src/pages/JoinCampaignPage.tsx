// src/pages/JoinCampaignPage.tsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useCampaignRoomStore } from '../store/campaignRoomStore'
import { useCampaignStore } from '../store/campaignStore'
import { IconFire } from '../components/ui/FateIcons'

export default function JoinCampaignPage() {
  const { code: urlCode } = useParams<{ code?: string }>()
  const navigate = useNavigate()
  const user = useAuthStore(s => s.user)
  const { joinCampaignByCode } = useCampaignRoomStore()
  const { syncWithRemote } = useCampaignStore()

  const [code, setCode]        = useState(urlCode ?? '')
  const [displayName, setName] = useState('')
  const [loading, setLoading]  = useState(false)
  const [error, setError]      = useState<string | null>(null)

  useEffect(() => {
    if (urlCode && user) handleJoin(urlCode)
  }, [urlCode, user?.id])

  const handleJoin = async (joinCode = code) => {
    if (!user) { navigate('/auth'); return }
    if (!joinCode.trim()) { setError('Введи код кампании'); return }

    setLoading(true); setError(null)

    // Используем displayName или email как имя в кампании
    const nameToUse = displayName.trim() || user.email || 'Игрок'
    const result = await joinCampaignByCode(joinCode, user.id, nameToUse)

    if (typeof result === 'string') {
      setError(result)
      setLoading(false)
    } else {
      // Синхронизировать кампании чтобы новая появилась в сторе
      await syncWithRemote(user.id)
      navigate(`/campaign/${result.campaignId}/room`)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'var(--input-bg)',
    border: '1px solid var(--input-border)', borderRadius: '12px',
    padding: '12px 14px', fontSize: '15px', color: 'var(--input-text)',
    outline: 'none', fontFamily: 'DM Sans, sans-serif', boxSizing: 'border-box',
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: 48, height: 48 }}><IconFire size={48} /></div>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '20px', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
            Вступить в кампанию
          </h1>
        </div>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Код кампании
            </label>
            <input
              value={code}
              onChange={e => setCode(e.target.value.toUpperCase())}
              placeholder="XXXXXX"
              maxLength={6}
              onKeyDown={e => e.key === 'Enter' && handleJoin()}
              style={{ ...inputStyle, textAlign: 'center', fontSize: '22px', fontFamily: 'Cinzel, serif', letterSpacing: '0.15em', fontWeight: 700 }}
              onFocus={e => { e.target.style.borderColor = 'var(--input-border-focus)' }}
              onBlur={e => { e.target.style.borderColor = 'var(--input-border)' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Имя в кампании <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(необязательно)</span>
            </label>
            <input
              value={displayName}
              onChange={e => setName(e.target.value)}
              placeholder={user?.email ?? 'Как тебя называть'}
              onKeyDown={e => e.key === 'Enter' && handleJoin()}
              style={inputStyle}
              onFocus={e => { e.target.style.borderColor = 'var(--input-border-focus)' }}
              onBlur={e => { e.target.style.borderColor = 'var(--input-border)' }}
            />
          </div>

          {error && (
            <p style={{
              fontSize: '13px', color: '#e07070', margin: 0,
              padding: '10px 14px', background: 'rgba(224,112,112,0.1)',
              borderRadius: '10px', border: '1px solid rgba(224,112,112,0.3)',
            }}>{error}</p>
          )}

          <button onClick={() => handleJoin()} disabled={loading} style={{
            background: 'var(--accent)', color: 'var(--bg)', border: 'none',
            borderRadius: '12px', padding: '13px', cursor: loading ? 'default' : 'pointer',
            fontSize: '15px', fontWeight: 700, fontFamily: 'DM Sans, sans-serif',
            opacity: loading ? 0.7 : 1, transition: 'opacity 0.15s',
          }}>
            {loading ? 'Вступаю...' : 'Вступить'}
          </button>
        </div>

        <button onClick={() => navigate(-1)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text-muted)', fontSize: '13px',
          fontFamily: 'DM Sans, sans-serif', textAlign: 'center',
        }}>
          ← Назад
        </button>
      </div>
    </div>
  )
}
