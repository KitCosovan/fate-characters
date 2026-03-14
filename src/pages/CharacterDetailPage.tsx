import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import { useCharacterStore } from '../store/characterStore'
import { useCampaignStore } from '../store/campaignStore'
import { fetchRemoteCharacterById } from '../utils/supabaseSync'
import { Button, Modal } from '../components/ui'
import CharacterSheet from '../components/character/CharacterSheet'
import ShareModal from '../components/ui/ShareModal'
import ToastNotifications from '../components/ui/ToastNotifications'
import { exportCharacter, getSystemConfig } from '../utils'
import { useToast } from '../hooks/useToast'
import type { Character, NpcVisibleField } from '../types'
import SkillAdvancement from '../components/character/SkillAdvancement'
import { IconEdit, IconSave, IconShare, IconDelete, IconBack, IconAdvancement, IconNotFound } from '../components/ui/FateIcons'

const SYSTEM_LABELS: Record<string, string> = {
  'fate-core': 'Fate Core',
  'fate-accelerated': 'Fate Accelerated',
  'book-of-ashes': 'Книга Пепла',
}

// Применить ограничения видимых полей НПС для игроков
function applyNpcVisibleFields(character: Character, visibleFields: NpcVisibleField[]): Character {
  if (!visibleFields.length) return character // пустой массив = всё видно

  const show = new Set(visibleFields)

  return {
    ...character,
    // Скрыть аспекты если не разрешены
    aspects: show.has('aspects') || show.has('concept')
      ? character.aspects.map(a => {
          // Концепция — отдельный флаг
          if ((a.slotId === 'high-concept' || a.slotId === 'concept') && !show.has('concept')) {
            return { ...a, value: '???' }
          }
          if (a.slotId !== 'high-concept' && a.slotId !== 'concept' && !show.has('aspects')) {
            return { ...a, value: '???' }
          }
          return a
        })
      : character.aspects.map(a => ({ ...a, value: '???' })),
    // Скрыть навыки
    skills: show.has('skills') ? character.skills : [],
    // Скрыть стресс
    stressTracks: show.has('stress')
      ? character.stressTracks
      : character.stressTracks.map(t => ({ ...t, boxes: t.boxes.map(b => ({ ...b, checked: false })) })),
    // Скрыть последствия
    consequences: show.has('consequences')
      ? character.consequences
      : character.consequences.map(c => ({ ...c, value: '' })),
    // Скрыть трюки
    stunts: show.has('stunts') ? character.stunts : [],
  }
}

export default function CharacterDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getById, updateCharacter, removeCharacter } = useCharacterStore()
  const campaigns = useCampaignStore(s => s.campaigns)

  const localCharacter = getById(id ?? '')
  const [character, setCharacter] = useState<Character | undefined>(localCharacter)
  const [loading, setLoading] = useState(!localCharacter)
  const [notFound, setNotFound] = useState(false)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const { toasts, showToast, removeToast } = useToast()
  const [showAdvancement, setShowAdvancement] = useState(false)

  useEffect(() => {
    if (localCharacter) {
      setCharacter(localCharacter)
      setLoading(false)
      return
    }
    if (!id) { setNotFound(true); return }
    setLoading(true)
    fetchRemoteCharacterById(id).then(remote => {
      if (remote) setCharacter(remote)
      else setNotFound(true)
      setLoading(false)
    })
  }, [id])

  useEffect(() => {
    if (localCharacter) setCharacter(localCharacter)
  }, [localCharacter])

  // Роль в кампании персонажа
  const campaign = character?.campaignId
    ? campaigns.find(c => c.id === character.campaignId)
    : undefined
  const isGm = campaign?.userRole === 'gm'

  // isOwner: нет ownerId = локальный = мой
  const isOwner = !character?.ownerId

  // Применить фильтр полей НПС для игроков
  const displayCharacter = useMemo(() => {
    if (!character) return character
    if (!character.isNpc) return character
    if (isOwner || isGm) return character // владелец и ГМ видят всё
    // Игрок — применяем visible_fields
    const fields = character.visibleFields ?? []
    return applyNpcVisibleFields(character, fields as NpcVisibleField[])
  }, [character, isOwner, isGm])

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--text-muted)', fontSize: '14px' }}>
      Загрузка...
    </div>
  )

  if (notFound || !displayCharacter) return (
    <div style={{ textAlign: 'center', padding: '64px 0' }}>
      <p style={{ marginBottom: '12px' }}><IconNotFound size={64} /></p>
      <p style={{ fontSize: '16px', color: 'var(--text-dim)', marginBottom: '16px' }}>Персонаж не найден</p>
      <Button variant="ghost" onClick={() => navigate(-1)}>← Назад</Button>
    </div>
  )

  const config = getSystemConfig(displayCharacter.systemId)

  const handleUpdate = (updated: Character) => {
    updateCharacter(updated)
    setCharacter(updated)
  }
  const handleNotesChange = (notes: string) => handleUpdate({ ...displayCharacter, notes })
  const handleDelete = () => { removeCharacter(displayCharacter.id); navigate(-1) }
  const handleExport = () => { exportCharacter(displayCharacter); showToast('Персонаж сохранён как JSON') }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '32px' }}>

      {/* Шапка */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigate(-1)} style={{
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: '8px', color: 'var(--text-dim)', width: '32px', height: '32px',
            cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><IconBack size={20} /></button>
          <div>
            <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '20px', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
              {displayCharacter.name}
            </h1>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
              {displayCharacter.isNpc ? 'НПС' : 'Персонаж'} · {SYSTEM_LABELS[displayCharacter.systemId] ?? displayCharacter.systemId}
              {!isOwner && <span style={{ marginLeft: '8px', color: 'var(--accent)', fontWeight: 600 }}>· просмотр</span>}
            </p>
          </div>
        </div>
        {isOwner && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="secondary" size="sm" onClick={() => navigate(displayCharacter.isNpc ? `/npc/${displayCharacter.id}/edit` : `/character/${displayCharacter.id}/edit`)}><IconEdit size={18} /></Button>
            <Button variant="secondary" size="sm" onClick={handleExport}><IconSave size={18} /></Button>
            <Button variant="secondary" size="sm" onClick={() => setShowShareModal(true)}><IconShare size={18} /></Button>
            <Button variant="danger" size="sm" onClick={() => setShowDeleteModal(true)}><IconDelete size={18} /></Button>
          </div>
        )}
      </div>

      <CharacterSheet
        character={displayCharacter}
        onStressChange={isOwner ? handleUpdate : undefined}
        onConsequenceChange={isOwner ? handleUpdate : undefined}
        onNotesChange={isOwner ? handleNotesChange : undefined}
      />

      {isOwner && config.skillMode !== 'approaches' && (
        <>
          <button onClick={() => setShowAdvancement(v => !v)} style={{
            background: showAdvancement ? 'var(--accent-glow)' : 'var(--surface-2)',
            border: `1px solid ${showAdvancement ? 'var(--border-accent)' : 'var(--border)'}`,
            borderRadius: '12px', padding: '11px 16px', cursor: 'pointer',
            color: showAdvancement ? 'var(--accent)' : 'var(--text-dim)',
            fontSize: '13px', fontWeight: 600, fontFamily: 'DM Sans, sans-serif',
            width: '100%', transition: 'all 0.15s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}>
            <span><IconAdvancement size={18} /></span>
            {showAdvancement ? 'Скрыть развитие' : 'Развитие навыков'}
          </button>
          {showAdvancement && (
            <div className="fade-up">
              <SkillAdvancement
                skills={config.skills}
                selected={displayCharacter.skills}
                onChange={skills => updateCharacter({ ...displayCharacter, skills })}
              />
            </div>
          )}
        </>
      )}

      {isOwner && (
        <>
          <Modal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            title="Удалить персонажа?"
            confirmLabel="Удалить"
            confirmVariant="danger"
            onConfirm={handleDelete}
          >
            <p style={{ margin: 0 }}>
              Персонаж <strong style={{ color: 'var(--text)' }}>{displayCharacter.name}</strong> будет удалён безвозвратно.
            </p>
          </Modal>
          <ShareModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} character={displayCharacter} />
        </>
      )}

      <ToastNotifications toasts={toasts} onRemove={removeToast} />
    </div>
  )
}
