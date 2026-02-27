import { useEffect } from 'react'

export interface ToastItem {
  id: string
  message: string
  type?: 'success' | 'error' | 'info'
}

interface ToastNotificationsProps {
  toasts: ToastItem[]
  onRemove: (id: string) => void
}

function SingleToast({ toast, onRemove }: { toast: ToastItem; onRemove: () => void }) {
  useEffect(() => {
    const t = setTimeout(onRemove, 2800)
    return () => clearTimeout(t)
  }, [onRemove])

  const colors = {
    success: 'var(--success)',
    error: 'var(--danger)',
    info: 'var(--accent)',
  }
  const color = colors[toast.type ?? 'success']

  return (
    <div
      className="fade-up"
      style={{
        background: 'var(--surface)',
        border: `1px solid var(--border)`,
        borderLeft: `3px solid ${color}`,
        borderRadius: '12px',
        padding: '12px 16px',
        fontSize: '13px',
        fontWeight: 500,
        color: 'var(--text)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        minWidth: '220px',
        maxWidth: '320px',
      }}
      onClick={onRemove}
    >
      <span style={{ fontSize: '15px' }}>
        {toast.type === 'error' ? '✕' : toast.type === 'info' ? 'ℹ' : '✓'}
      </span>
      {toast.message}
    </div>
  )
}

export default function ToastNotifications({ toasts, onRemove }: ToastNotificationsProps) {
  if (toasts.length === 0) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '80px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      alignItems: 'center',
      pointerEvents: 'none',
    }}>
      {toasts.map(t => (
        <div key={t.id} style={{ pointerEvents: 'all' }}>
          <SingleToast toast={t} onRemove={() => onRemove(t.id)} />
        </div>
      ))}
    </div>
  )
}