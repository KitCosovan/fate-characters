// src/pages/AuthPage.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useCharacterStore } from '../store/characterStore'
import { useCampaignStore } from '../store/campaignStore'
import { Button } from '../components/ui'
import { IconFire } from '../components/ui/FateIcons'

type Mode = 'signin' | 'signup'

const inputStyle = {
  width: '100%', background: 'var(--input-bg)',
  border: '1px solid var(--input-border)', borderRadius: '12px',
  padding: '12px 14px', fontSize: '15px', color: 'var(--input-text)',
  outline: 'none', fontFamily: 'DM Sans, sans-serif',
  boxSizing: 'border-box' as const,
}

export default function AuthPage() {
  const navigate = useNavigate()
  const { signIn, signUp } = useAuthStore()
  const syncCharacters = useCharacterStore(s => s.syncWithRemote)
  const syncCampaigns = useCampaignStore(s => s.syncWithRemote)

  const [mode, setMode] = useState<Mode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!email || !password) { setError('Заполни все поля'); return }
    setLoading(true); setError(null); setSuccess(null)

    if (mode === 'signin') {
      const err = await signIn(email, password)
      if (err) {
        setError(err)
      } else {
        // После входа — синхронизируем данные
        const userId = useAuthStore.getState().user?.id
        if (userId) {
          await Promise.all([syncCharacters(userId), syncCampaigns(userId)])
        }
        navigate('/')
      }
    } else {
      const err = await signUp(email, password)
      if (err) {
        setError(err)
      } else {
        setSuccess('Проверь почту — мы отправили письмо для подтверждения.')
      }
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{
        width: '100%', maxWidth: '380px',
        display: 'flex', flexDirection: 'column', gap: '24px',
      }}>

        {/* Лого */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: 48, height: 48 }}><IconFire size={48} /></div>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '22px', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
            Fate Toolkit
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
            {mode === 'signin' ? 'Войди чтобы синхронизировать данные' : 'Создай аккаунт'}
          </p>
        </div>

        {/* Карточка */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: '20px', padding: '24px',
          display: 'flex', flexDirection: 'column', gap: '16px',
        }}>
          {/* Переключатель режима */}
          <div style={{
            display: 'flex', gap: '4px', background: 'var(--surface-2)',
            borderRadius: '12px', padding: '4px',
          }}>
            {(['signin', 'signup'] as Mode[]).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(null); setSuccess(null) }}
                style={{
                  flex: 1, padding: '8px', borderRadius: '9px', border: 'none',
                  cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                  fontSize: '13px', fontWeight: 600, transition: 'all 0.15s',
                  background: mode === m ? 'var(--surface-3)' : 'transparent',
                  color: mode === m ? 'var(--text)' : 'var(--text-muted)',
                }}
              >
                {m === 'signin' ? 'Войти' : 'Регистрация'}
              </button>
            ))}
          </div>

          {/* Поля */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              style={inputStyle}
              onFocus={e => { e.target.style.borderColor = 'var(--input-border-focus)'; e.target.style.boxShadow = 'var(--input-shadow-focus)' }}
              onBlur={e => { e.target.style.borderColor = 'var(--input-border)'; e.target.style.boxShadow = 'none' }}
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              style={inputStyle}
              onFocus={e => { e.target.style.borderColor = 'var(--input-border-focus)'; e.target.style.boxShadow = 'var(--input-shadow-focus)' }}
              onBlur={e => { e.target.style.borderColor = 'var(--input-border)'; e.target.style.boxShadow = 'none' }}
            />
          </div>

          {/* Ошибка / успех */}
          {error && (
            <p style={{
              fontSize: '13px', color: '#e07070', margin: 0,
              padding: '10px 14px', background: 'rgba(224,112,112,0.1)',
              borderRadius: '10px', border: '1px solid rgba(224,112,112,0.3)',
            }}>
              {error}
            </p>
          )}
          {success && (
            <p style={{
              fontSize: '13px', color: '#70c070', margin: 0,
              padding: '10px 14px', background: 'rgba(112,192,112,0.1)',
              borderRadius: '10px', border: '1px solid rgba(112,192,112,0.3)',
            }}>
              {success}
            </p>
          )}

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Загрузка...' : mode === 'signin' ? 'Войти' : 'Создать аккаунт'}
          </Button>
        </div>

        {/* Ссылка назад */}
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-muted)', fontSize: '13px',
            fontFamily: 'DM Sans, sans-serif', textAlign: 'center',
          }}
        >
          ← Без авторизации
        </button>

      </div>
    </div>
  )
}
