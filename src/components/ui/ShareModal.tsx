import { useState } from 'react'
import Modal from './Modal'
import type { Character } from '../../types'
import { encodeCharacterToUrl } from '../../utils'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  character: Character
}

export default function ShareModal({ isOpen, onClose, character }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const url = encodeCharacterToUrl(character)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const el = document.createElement('textarea')
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Поделиться персонажем">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-dim)' }}>
          Отправь эту ссылку — получатель сможет импортировать персонажа одним кликом.
        </p>
        <div style={{
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          padding: '10px 12px',
          fontSize: '11px',
          color: 'var(--text-muted)',
          wordBreak: 'break-all',
          fontFamily: 'monospace',
          lineHeight: 1.5,
          maxHeight: '80px',
          overflow: 'hidden',
        }}>
          {url.slice(0, 120)}…
        </div>
        <button
          onClick={handleCopy}
          style={{
            background: copied ? 'var(--success)' : 'var(--accent)',
            color: copied ? '#fff' : 'var(--bg)',
            border: 'none',
            borderRadius: '10px',
            padding: '11px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
            transition: 'background 0.2s',
          }}
        >
          {copied ? '✓ Скопировано!' : '🔗 Скопировать ссылку'}
        </button>
      </div>
    </Modal>
  )
}