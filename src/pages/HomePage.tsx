import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCharacterStore } from '../store/characterStore'
import { Button, Card, Badge, Modal, Toast } from '../components/ui'
import {
  exportAllCharacters,
  importCharacterFromFile,
  importAllFromFile,
  decodeCharacterFromUrl,
} from '../utils'
import { useToast } from '../hooks/useToast'
import { generateId } from '../utils'
import type { Character } from '../types'

type Tab = 'characters' | 'npcs'

export default function HomePage() {
  const navigate = useNavigate()
  const { characters, addCharacter } = useCharacterStore()
  const [tab, setTab] = useState<Tab>('characters')
  const [showImportModal, setShowImportModal] = useState(false)
  const [pendingImport, setPendingImport] = useState<Character | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast, showToast, hideToast } = useToast()

  // Проверяем URL на наличие shared персонажа
  useEffect(() => {
    const shared = decodeCharacterFromUrl()
    if (shared) {
      setPendingImport(shared)
      setShowImportModal(true)
      // Чистим URL
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [])

  const filtered = characters.filter(c => tab === 'npcs' ? c.isNpc : !c.isNpc)

  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      // Пробуем импортировать как одного персонажа
      try {
        const character = await importCharacterFromFile(file)
        setPendingImport(character)
        setShowImportModal(true)
      } catch {
        // Если не получилось — пробуем как массив
        const chars = await importAllFromFile(file)
        chars.forEach(c => addCharacter({ ...c, id: generateId() }))
        showToast(`Импортировано ${chars.length} персонажей`)
      }
    } catch (err) {
      showToast('Ошибка импорта файла', 'error')
    }
    // Сбрасываем input
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
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Персонажи</h1>
        <div className="flex gap-2">
          {/* Скрытый input для файлов */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleFileImport}
          />
          <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>
            📥
          </Button>
          {characters.length > 0 && (
            <Button variant="secondary" size="sm" onClick={() => {
              exportAllCharacters(characters)
              showToast('Бэкап сохранён')
            }}>
              💾
            </Button>
          )}
          <Button onClick={() => navigate(tab === 'npcs' ? '/npc/create' : '/character/create')}>
            + Создать
          </Button>
        </div>
      </div>

      {/* Вкладки */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
        {(['characters', 'npcs'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors
              ${tab === t ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {t === 'characters' ? '🧙 Персонажи' : '👤 НПС'}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">{tab === 'npcs' ? '👤' : '🎭'}</p>
          <p className="text-lg font-medium">
            {tab === 'npcs' ? 'НПС пока нет' : 'Персонажей пока нет'}
          </p>
          <p className="text-sm mt-1">Нажми «Создать» чтобы начать</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map(c => (
            <Card key={c.id} onClick={() => navigate(`/character/${c.id}`)}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{c.name || 'Без имени'}</p>
                  <p className="text-sm text-gray-400 mt-0.5">
                    {c.aspects.find(a => a.slotId === 'high-concept')?.value || 'Концепция не заполнена'}
                  </p>
                </div>
                <Badge variant="indigo">{c.isNpc ? 'НПС' : 'Игрок'}</Badge>
              </div>
            </Card>
          ))}
        </ul>
      )}

      {/* Модалка подтверждения импорта */}
      <Modal
        isOpen={showImportModal}
        onClose={() => { setShowImportModal(false); setPendingImport(null) }}
        title="Импортировать персонажа?"
        confirmLabel="Импортировать"
        onConfirm={confirmImport}
      >
        {pendingImport && (
          <div className="flex flex-col gap-1">
            <p>Добавить персонажа <strong>{pendingImport.name || 'Без имени'}</strong>?</p>
            <p className="text-gray-400 text-xs mt-1">Система: {pendingImport.systemId}</p>
          </div>
        )}
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  )
}