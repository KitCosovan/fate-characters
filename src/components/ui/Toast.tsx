import { useEffect } from 'react'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  onClose: () => void
  duration?: number
}

const COLORS = {
  success: 'var(--success)',
  error: 'var(--danger)',
  info: 'var(--accent)',
}

export default function Toast({ message, type = 'success', onClose, duration = 2500 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 50,
      background: 'var(--surface)',
      border: `1px solid ${COLORS[type]}`,
      borderLeft: `3px solid ${COLORS[type]}`,
      color: 'var(--text)',
      padding: '12px 20px',
      borderRadius: '12px',
      fontSize: '13px',
      fontWeight: 500,
      boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
      whiteSpace: 'nowrap',
      animation: 'fadeUp 0.2s ease both',
    }}>
      {message}
    </div>
  )
}