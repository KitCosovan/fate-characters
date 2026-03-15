// src/components/ui/Modal.tsx
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
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

export default function Modal({ isOpen, onClose, title, children, confirmLabel, onConfirm, confirmVariant = 'primary', hideConfirm = false }: ModalProps) {
  const { t } = useTranslation()

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, overflowY: 'auto' }}>
      {/* Backdrop */}
      <div
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', zIndex: 0 }}
        onClick={onClose}
      />
      {/* Центрирующая обёртка */}
      <div style={{
        position: 'relative', zIndex: 1,
        minHeight: '100%', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}>
        {/* Модалка */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: '20px', padding: '24px', width: '100%', maxWidth: '400px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>
            {title}
          </h2>
          <div style={{ fontSize: '14px', color: 'var(--text-dim)', marginBottom: '24px' }}>
            {children}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <Button variant="secondary" onClick={onClose}>{t('modal.cancel')}</Button>
            {!hideConfirm && onConfirm && (
              <Button variant={confirmVariant} onClick={onConfirm}>{confirmLabel}</Button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}