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
  const [importUrl, setImportUrl] = useState<string | null>(null)
  const [viewUrl, setViewUrl]     = useState<string | null>(null)
  const [copiedImport, setCopiedImport] = useState(false)
  const [copiedView, setCopiedView]     = useState(false)

  useEffect(() => {
    if (!isOpen) return
    setImportUrl(null)
    setViewUrl(null)

    encodeCharacterToUrl(character).then(url => {
      setImportUrl(url)
      // Ссылка просмотра — просто другой роут на тот же short_id
      // Извлекаем ?s=XXXXX и заменяем на /view/XXXXX
      const match = url.match(/[?#].*s=([a-zA-Z0-9]+)/)
      if (match) {
        const base = window.location.href.split('#')[0]
        setViewUrl(`${base}#/view/${match[1]}`)
      } else {
        // Fallback: base64 через viewUrl параметр
        const shortBase = url.replace(/[?#].*shared=/, '')
        setViewUrl(`${window.location.href.split('#')[0]}#/view?shared=${shortBase}`)
      }
    })
  }, [isOpen, character.id])

  const copy = async (text: string, setCopied: (v: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const inputStyle = {
    background: 'var(--surface-2)', border: '1px solid var(--border)',
    borderRadius: '10px', padding: '10px 12px', fontSize: '11px',
    color: 'var(--text-muted)', wordBreak: 'break-all' as const,
    fontFamily: 'monospace', lineHeight: 1.5, minHeight: '40px',
    display: 'flex', alignItems: 'center' as const,
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Поделиться персонажем" hideConfirm>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Блок 1 — импорт */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>📥</span>
            <div>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: 'var(--text)' }}>Импорт</p>
              <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-muted)' }}>Получатель добавит персонажа к себе</p>
            </div>
          </div>
          <div style={inputStyle}>
            {importUrl ?? <span style={{ fontFamily: 'DM Sans, sans-serif', fontStyle: 'italic' }}>Генерирую...</span>}
          </div>
          <button onClick={() => importUrl && copy(importUrl, setCopiedImport)} disabled={!importUrl} style={{
            background: copiedImport ? '#70c070' : importUrl ? 'var(--accent)' : 'var(--surface-3)',
            color: copiedImport ? '#fff' : importUrl ? 'var(--bg)' : 'var(--text-muted)',
            border: 'none', borderRadius: '10px', padding: '10px',
            fontSize: '13px', fontWeight: 600, cursor: importUrl ? 'pointer' : 'default',
            fontFamily: 'DM Sans, sans-serif', transition: 'background 0.2s',
          }}>
            {copiedImport ? '✓ Скопировано!' : '🔗 Скопировать ссылку импорта'}
          </button>
        </div>

        <div style={{ height: '1px', background: 'var(--border)' }} />

        {/* Блок 2 — просмотр */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>👁</span>
            <div>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: 'var(--text)' }}>Только просмотр</p>
              <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-muted)' }}>Лист персонажа без возможности импорта — для ГМ и других игроков</p>
            </div>
          </div>
          <div style={inputStyle}>
            {viewUrl ?? <span style={{ fontFamily: 'DM Sans, sans-serif', fontStyle: 'italic' }}>Генерирую...</span>}
          </div>
          <button onClick={() => viewUrl && copy(viewUrl, setCopiedView)} disabled={!viewUrl} style={{
            background: copiedView ? '#70c070' : viewUrl ? 'var(--surface-2)' : 'var(--surface-3)',
            color: copiedView ? '#fff' : viewUrl ? 'var(--text)' : 'var(--text-muted)',
            border: `1px solid ${viewUrl ? 'var(--border-accent)' : 'var(--border)'}`,
            borderRadius: '10px', padding: '10px',
            fontSize: '13px', fontWeight: 600, cursor: viewUrl ? 'pointer' : 'default',
            fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s',
          }}>
            {copiedView ? '✓ Скопировано!' : '👁 Скопировать ссылку просмотра'}
          </button>
        </div>

      </div>
    </Modal>
  )
}
