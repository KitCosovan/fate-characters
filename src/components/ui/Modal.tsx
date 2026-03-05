// src/components/ui/Modal.tsx
import { useEffect } from 'react'
import Button from './Button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  confirmLabel?: string
  onConfirm?: () => void
  confirmVariant?: 'primary' | 'danger'
  hideConfirm?: boolean
}

export default function Modal({
  isOpen, onClose, title, children,
  confirmLabel, onConfirm, confirmVariant = 'primary', hideConfirm = false,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px',
    }}>
      <div
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />
      <div style={{
        position: 'relative', background: 'var(--surface)',
        border: '1px solid var(--border)', borderRadius: '20px', padding: '24px',
        width: '100%', maxWidth: '400px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        maxHeight: '90vh', display: 'flex', flexDirection: 'column',
      }}>
        <h2 style={{
          fontFamily: 'Cinzel, serif', fontSize: '16px', fontWeight: 700,
          color: 'var(--text)', marginBottom: '16px', flexShrink: 0,
        }}>
          {title}
        </h2>
        <div style={{ fontSize: '14px', color: 'var(--text-dim)', marginBottom: '24px', overflowY: 'auto', flex: 1 }}>
          {children}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', flexShrink: 0 }}>
          <Button variant="secondary" onClick={onClose}>Отмена</Button>
          {!hideConfirm && onConfirm && (
            <Button variant={confirmVariant} onClick={onConfirm}>{confirmLabel}</Button>
          )}
        </div>
      </div>
    </div>
  )
}
