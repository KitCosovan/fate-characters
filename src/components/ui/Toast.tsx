import { useEffect } from 'react'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  onClose: () => void
  duration?: number
}

const COLORS = {
  success: 'bg-green-600',
  error: 'bg-red-500',
  info: 'bg-indigo-600',
}

const ICONS = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
}

export default function Toast({ message, type = 'success', onClose, duration = 2500 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2
      ${COLORS[type]} text-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium
      animate-fade-in`}>
      <span>{ICONS[type]}</span>
      <span>{message}</span>
    </div>
  )
}