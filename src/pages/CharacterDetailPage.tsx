import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCharacterStore } from '../store/characterStore'
import { Button, Modal, Toast } from '../components/ui'
import CharacterSheet from '../components/character/CharacterSheet'
import { exportCharacter, encodeCharacterToUrl } from '../utils'
import { useToast } from '../hooks/useToast'
import type { Character } from '../types'

export default function CharacterDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getById, updateCharacter, removeCharacter } = useCharacterStore()
  const character = getById(id ?? '')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [shareUrl, setShareUrl] = useState('')
  const { toast, showToast, hideToast } = useToast()

  if (!character) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-4xl mb-3">🌀</p>
        <p className="text-lg font-medium">Персонаж не найден</p>
        <Button variant="ghost" onClick={() => navigate('/')}>На главную</Button>
      </div>
    )
  }

  const handleUpdate = (updated: Character) => {
    updateCharacter(updated)
  }

  const handleDelete = () => {
    removeCharacter(character.id)
    navigate('/')
  }

  const handleExport = () => {
    exportCharacter(character)
    showToast('Персонаж сохранён как JSON')
  }

  const handleShare = () => {
    const url = encodeCharacterToUrl(character)
    setShareUrl(url)
    setShowShareModal(true)
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shareUrl)
    showToast('Ссылка скопирована!')
  }

  const systemLabel = character.systemId === 'fate-accelerated' ? 'Fate Accelerated' : 'Fate Core'

  return (
    <div className="flex flex-col gap-6 pb-8">

      {/* Шапка */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className="text-gray-400 hover:text-gray-600 text-xl">←</button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">{character.name}</h1>
            <p className="text-xs text-gray-400">{character.isNpc ? 'НПС' : 'Персонаж'} · {systemLabel}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => navigate(`/character/${character.id}/edit`)}>
            ✏️
          </Button>
          <Button variant="secondary" size="sm" onClick={handleExport}>
            💾
          </Button>
          <Button variant="secondary" size="sm" onClick={handleShare}>
            🔗
          </Button>
          <Button variant="danger" size="sm" onClick={() => setShowDeleteModal(true)}>
            🗑
          </Button>
        </div>
      </div>

      {/* Лист персонажа */}
      <CharacterSheet
        character={character}
        onStressChange={handleUpdate}
        onConsequenceChange={handleUpdate}
      />

      {/* Модалка удаления */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Удалить персонажа?"
        confirmLabel="Удалить"
        confirmVariant="danger"
        onConfirm={handleDelete}
      >
        Персонаж <strong>{character.name}</strong> будет удалён безвозвратно.
      </Modal>

      {/* Модалка поделиться */}
      <Modal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title="Поделиться персонажем"
        confirmLabel="Скопировать ссылку"
        onConfirm={handleCopyUrl}
      >
        <div className="flex flex-col gap-3">
          <p>Отправь эту ссылку другу — он сможет импортировать персонажа одним нажатием.</p>
          <div className="bg-gray-100 rounded-lg p-2 text-xs break-all text-gray-600 max-h-20 overflow-y-auto">
            {shareUrl}
          </div>
        </div>
      </Modal>

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

    </div>
  )
}