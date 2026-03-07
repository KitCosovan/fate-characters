// src/components/ui/ShareModal.tsx
import { useState, useEffect } from 'react'
import Modal from './Modal'
import type { Character } from '../../types'
import { encodeCharacterToUrl } from '../../utils'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  character: Character
}

export default function ShareModal({ isOpen, onClose, character }: ShareModalProps) {
  const [url, setUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    setUrl(null)
    encodeCharacterToUrl(character).then(setUrl)
  }, [isOpen, character])

  const handleCopy = async () => {
    if (!url) return
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const el = document.createElement('textarea')
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Поделиться персонажем" hideConfirm>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-dim)' }}>
          Отправь эту ссылку — получатель сможет импортировать персонажа одним кликом.
        </p>

        {/* Ссылка или лоадер */}
        <div style={{
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: '10px', padding: '10px 12px', fontSize: '11px',
          color: 'var(--text-muted)', wordBreak: 'break-all',
          fontFamily: 'monospace', lineHeight: 1.5, minHeight: '40px',
          display: 'flex', alignItems: 'center',
        }}>
          {url
            ? url
            : <span style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif', fontStyle: 'italic' }}>
                Генерирую ссылку...
              </span>
          }
        </div>

        <button
          onClick={handleCopy}
          disabled={!url}
          style={{
            background: copied ? '#70c070' : url ? 'var(--accent)' : 'var(--surface-3)',
            color: copied ? '#fff' : url ? 'var(--bg)' : 'var(--text-muted)',
            border: 'none', borderRadius: '10px', padding: '11px',
            fontSize: '14px', fontWeight: 600, cursor: url ? 'pointer' : 'default',
            fontFamily: 'DM Sans, sans-serif', transition: 'background 0.2s',
          }}
        >
          {copied ? '✓ Скопировано!' : '🔗 Скопировать ссылку'}
        </button>
      </div>
    </Modal>
  )
}
