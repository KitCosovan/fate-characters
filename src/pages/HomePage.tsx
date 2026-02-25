import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCharacterStore } from '../store/characterStore'
import { Button, Card, Badge, Modal, Toast } from '../components/ui'
import { exportAllCharacters, importCharacterFromFile, importAllFromFile, decodeCharacterFromUrl } from '../utils'
import { useToast } from '../hooks/useToast'
import { generateId } from '../utils'
import type { Character } from '../types'

type Tab = 'characters' | 'npcs'

const SYSTEM_LABELS: Record<string, string> = {
  'fate-core': 'Fate Core',
  'fate-accelerated': 'Accelerated',
  'book-of-ashes': 'Книга Пепла',
}

export default function HomePage() {
  const navigate = useNavigate()
  const { characters, addCharacter } = useCharacterStore()
  const [tab, setTab] = useState<Tab>('characters')
  const [showImportModal, setShowImportModal] = useState(false)
  const [pendingImport, setPendingImport] = useState<Character | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast, showToast, hideToast } = useToast()

  useEffect(() => {
    const shared = decodeCharacterFromUrl()
    if (shared) {
      setPendingImport(shared)
      setShowImportModal(true)
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [])

  const filtered = characters.filter(c => tab === 'npcs' ? c.isNpc : !c.isNpc)

  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      try {
        const character = await importCharacterFromFile(file)
        setPendingImport(character)
        setShowImportModal(true)
      } catch {
        const chars = await importAllFromFile(file)
        chars.forEach(c => addCharacter({ ...c, id: generateId() }))
        showToast(`Импортировано ${chars.length} персонажей`)
      }
    } catch {
      showToast('Ошибка импорта', 'error')
    }
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const confirmImport = () => {
    if (!pendingImport) return
    addCharacter({ ...pendingImport, id: generateId() })
    setPendingImport(null)
    setShowImportModal(false)
    showToast(`${pendingImport.name || 'Персонаж'} импортирован`)
  }

  return (
    <div className="fade-up">

      {/* Шапка */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '20px',
            fontWeight: 700,
            color: 'var(--text)',
            margin: 0,
          }}>
            {tab === 'npcs' ? 'НПС' : 'Персонажи'}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
            {filtered.length} {filtered.length === 1 ? 'запись' : filtered.length < 5 ? 'записи' : 'записей'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input ref={fileInputRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleFileImport} />
          <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>📥</Button>
          {characters.length > 0 && (
            <Button variant="secondary" size="sm" onClick={() => { exportAllCharacters(characters); showToast('Бэкап сохранён') }}>💾</Button>
          )}
          <Button size="sm" onClick={() => navigate(tab === 'npcs' ? '/npc/create' : '/character/create')}>
            + Создать
          </Button>
        </div>
      </div>

      {/* Вкладки */}
      <div style={{
        display: 'flex',
        gap: '4px',
        background: 'var(--surface)',
        borderRadius: '12px',
        padding: '4px',
        marginBottom: '20px',
        border: '1px solid var(--border)',
      }}>
        {(['characters', 'npcs'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              padding: '9px',
              borderRadius: '9px',
              border: 'none',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              fontFamily: 'DM Sans, sans-serif',
              background: tab === t ? 'var(--surface-3)' : 'transparent',
              color: tab === t ? 'var(--text)' : 'var(--text-muted)',
              letterSpacing: '0.02em',
            }}
          >
            {t === 'characters' ? '🧙 Персонажи' : '👤 НПС'}
          </button>
        ))}
      </div>

      {/* Список */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 0' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>{tab === 'npcs' ? '👤' : '🎭'}</div>
          <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-dim)' }}>
            {tab === 'npcs' ? 'НПС пока нет' : 'Персонажей пока нет'}
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px' }}>
            Нажми «Создать» чтобы начать
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map((c, i) => (
            <div
              key={c.id}
              className="fade-up"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <Card onClick={() => navigate(`/character/${c.id}`)}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <p style={{
                        fontFamily: 'Cinzel, serif',
                        fontSize: '16px',
                        fontWeight: 700,
                        color: 'var(--text)',
                        margin: 0,
                      }}>
                        {c.name || 'Без имени'}
                      </p>
                    </div>
                    <p style={{
                      fontSize: '13px',
                      color: 'var(--text-dim)',
                      margin: 0,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {c.aspects.find(a => a.slotId === 'high-concept' || a.slotId === 'concept')?.value || 'Концепция не заполнена'}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', flexShrink: 0 }}>
                    <Badge variant="accent">{SYSTEM_LABELS[c.systemId] ?? c.systemId}</Badge>
                    <Badge variant={c.isNpc ? 'dim' : 'green'}>{c.isNpc ? 'НПС' : 'Игрок'}</Badge>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={showImportModal}
        onClose={() => { setShowImportModal(false); setPendingImport(null) }}
        title="Импортировать персонажа?"
        confirmLabel="Импортировать"
        onConfirm={confirmImport}
      >
        {pendingImport && (
          <div>
            <p>Добавить <strong style={{ color: 'var(--text)' }}>{pendingImport.name || 'Без имени'}</strong>?</p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Система: {SYSTEM_LABELS[pendingImport.systemId] ?? pendingImport.systemId}
            </p>
          </div>
        )}
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  )
}