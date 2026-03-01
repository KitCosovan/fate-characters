import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCharacterStore } from '../store/characterStore'
import { Button, Modal } from '../components/ui'
import CharacterSheet from '../components/character/CharacterSheet'
import ShareModal from '../components/ui/ShareModal'
import ToastNotifications from '../components/ui/ToastNotifications'
import { exportCharacter, getSystemConfig } from '../utils'
import { useToast } from '../hooks/useToast'
import type { Character } from '../types'
import SkillAdvancement from '../components/character/SkillAdvancement'
import { IconEdit, IconSave, IconShare, IconDelete, IconBack, IconAdvancement, IconNotFound } from '../components/ui/FateIcons'

const SYSTEM_LABELS: Record<string, string> = {
  'fate-core': 'Fate Core',
  'fate-accelerated': 'Fate Accelerated',
  'book-of-ashes': 'Книга Пепла',
}

export default function CharacterDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getById, updateCharacter, removeCharacter } = useCharacterStore()
  const character = getById(id ?? '')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const { toasts, showToast, removeToast } = useToast()
  const [showAdvancement, setShowAdvancement] = useState(false)

  // ← config ПОСЛЕ всех хуков, но до return
  if (!character) {
    return (
      <div style={{ textAlign: 'center', padding: '64px 0' }}>
        <p style={{ fontSize: '48px', marginBottom: '12px' }}><IconNotFound size={64} /></p>
        <p style={{ fontSize: '16px', color: 'var(--text-dim)', marginBottom: '16px' }}>Персонаж не найден</p>
        <Button variant="ghost" onClick={() => navigate('/')}>На главную</Button>
      </div>
    )
  }

  // Теперь character гарантированно не undefined
  const config = getSystemConfig(character.systemId)

  const handleUpdate = (updated: Character) => updateCharacter(updated)
  const handleNotesChange = (notes: string) => updateCharacter({ ...character, notes })
  const handleDelete = () => { removeCharacter(character.id); navigate('/') }
  const handleExport = () => { exportCharacter(character); showToast('Персонаж сохранён как JSON') }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '32px' }}>

      {/* Шапка */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'var(--surface-2)', border: '1px solid var(--border)',
              borderRadius: '8px', color: 'var(--text-dim)', width: '32px', height: '32px',
              cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          ><IconBack size={20} /></button>
          <div>
            <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '20px', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
              {character.name}
            </h1>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
              {character.isNpc ? 'НПС' : 'Персонаж'} · {SYSTEM_LABELS[character.systemId] ?? character.systemId}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="secondary" size="sm" onClick={() => navigate(character.isNpc ? `/npc/${character.id}/edit` : `/character/${character.id}/edit`)}><IconEdit size={18} /></Button>
          <Button variant="secondary" size="sm" onClick={handleExport}><IconSave size={18} /></Button>
          <Button variant="secondary" size="sm" onClick={() => setShowShareModal(true)}><IconShare size={18} /></Button>
          <Button variant="danger" size="sm" onClick={() => setShowDeleteModal(true)}><IconDelete size={18} /></Button>
        </div>
      </div>

      {/* Лист персонажа */}
      <CharacterSheet
        character={character}
        onStressChange={handleUpdate}
        onConsequenceChange={handleUpdate}
        onNotesChange={handleNotesChange}
      />

      {/* Развитие навыков */}
      {config.skillMode !== 'approaches' && (
        <>
          <button
            onClick={() => setShowAdvancement(v => !v)}
            style={{
              background: showAdvancement ? 'var(--accent-glow)' : 'var(--surface-2)',
              border: `1px solid ${showAdvancement ? 'var(--border-accent)' : 'var(--border)'}`,
              borderRadius: '12px', padding: '11px 16px', cursor: 'pointer',
              color: showAdvancement ? 'var(--accent)' : 'var(--text-dim)',
              fontSize: '13px', fontWeight: 600, fontFamily: 'DM Sans, sans-serif',
              width: '100%', transition: 'all 0.15s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}
          >
            <span><IconAdvancement size={18} /></span>
            {showAdvancement ? 'Скрыть развитие' : 'Развитие навыков'}
          </button>

          {showAdvancement && (
            <div className="fade-up">
              <SkillAdvancement
                skills={config.skills}
                selected={character.skills}
                onChange={skills => updateCharacter({ ...character, skills })}
              />
            </div>
          )}
        </>
      )}

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Удалить персонажа?"
        confirmLabel="Удалить"
        confirmVariant="danger"
        onConfirm={handleDelete}
      >
        <p style={{ margin: 0 }}>
          Персонаж <strong style={{ color: 'var(--text)' }}>{character.name}</strong> будет удалён безвозвратно.
        </p>
      </Modal>

      <ShareModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} character={character} />
      <ToastNotifications toasts={toasts} onRemove={removeToast} />
    </div>
  )
}