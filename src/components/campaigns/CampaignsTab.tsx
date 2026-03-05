// src/components/campaigns/CampaignsTab.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCampaignStore } from '../../store/campaignStore'
import { useCharacterStore } from '../../store/characterStore'
import type { Campaign, Character } from '../../types'
import { generateId } from '../../utils'
import { Modal } from '../ui'
import { IconCharacter, IconNpc, IconDelete, IconEdit, IconPlus, IconFire } from '../ui/FateIcons'

const CAMPAIGN_COLORS = [
  '#c8a96e', // gold (default)
  '#e07070', // red
  '#70a0e0', // blue
  '#70c070', // green
  '#a070e0', // purple
  '#e09060', // orange
  '#70c0c0', // teal
  '#e070a0', // pink
]

const SYSTEM_LABELS: Record<string, string> = {
  'fate-core': 'Fate Core',
  'fate-accelerated': 'Accelerated',
  'book-of-ashes': 'Книга Пепла',
}

interface CreateCampaignModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (name: string, description: string, systemId: string, color: string) => void
  initial?: Campaign
}

function CreateCampaignModal({ isOpen, onClose, onSave, initial }: CreateCampaignModalProps) {
  const [name, setName] = useState(initial?.name ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [systemId, setSystemId] = useState(initial?.systemId ?? 'fate-core')
  const [color, setColor] = useState(initial?.color ?? CAMPAIGN_COLORS[0])

  const handleSave = () => {
    if (!name.trim()) return
    onSave(name.trim(), description.trim(), systemId, color)
    setName(''); setDescription(''); setSystemId('fate-core'); setColor(CAMPAIGN_COLORS[0])
  }

  const inputStyle = {
    background: 'var(--input-bg)', border: '1px solid var(--input-border)',
    borderRadius: '10px', padding: '10px 14px', fontSize: '14px',
    color: 'var(--input-text)', outline: 'none', fontFamily: 'DM Sans, sans-serif',
    width: '100%', boxSizing: 'border-box' as const,
  }

  const labelStyle = {
    fontSize: '11px', fontWeight: 700 as const, color: 'var(--text-dim)',
    textTransform: 'uppercase' as const, letterSpacing: '0.08em',
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initial ? 'Редактировать кампанию' : 'Новая кампания'}
      confirmLabel={initial ? 'Сохранить' : 'Создать'}
      onConfirm={handleSave}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Название */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={labelStyle}>Название кампании</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Например: Пепел Империи"
            autoFocus
            onKeyDown={e => e.key === 'Enter' && handleSave()}
            style={inputStyle}
            onFocus={e => { e.target.style.borderColor = 'var(--input-border-focus)'; e.target.style.boxShadow = 'var(--input-shadow-focus)' }}
            onBlur={e => { e.target.style.borderColor = 'var(--input-border)'; e.target.style.boxShadow = 'none' }}
          />
        </div>

        {/* Описание */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={labelStyle}>Описание (необязательно)</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Краткое описание кампании..."
            rows={2}
            style={{ ...inputStyle, resize: 'vertical' }}
            onFocus={e => { e.target.style.borderColor = 'var(--input-border-focus)'; e.target.style.boxShadow = 'var(--input-shadow-focus)' }}
            onBlur={e => { e.target.style.borderColor = 'var(--input-border)'; e.target.style.boxShadow = 'none' }}
          />
        </div>

        {/* Система */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={labelStyle}>Система</label>
          <select
            value={systemId}
            onChange={e => setSystemId(e.target.value)}
            style={{ ...inputStyle }}
          >
            <option value="fate-core">Fate Core</option>
            <option value="fate-accelerated">Fate Accelerated</option>
            <option value="book-of-ashes">Книга Пепла</option>
          </select>
        </div>

        {/* Цвет */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={labelStyle}>Цвет</label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {CAMPAIGN_COLORS.map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: c, border: 'none', cursor: 'pointer',
                  outline: color === c ? `3px solid var(--accent)` : '2px solid transparent',
                  outlineOffset: '2px', transition: 'outline 0.15s',
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </Modal>
  )
}

// Модалка назначения кампании персонажу
interface AssignCampaignModalProps {
  isOpen: boolean
  character: Character | null
  campaigns: Campaign[]
  onClose: () => void
  onAssign: (characterId: string, campaignId: string | null) => void
}

function AssignCampaignModal({ isOpen, character, campaigns, onClose, onAssign }: AssignCampaignModalProps) {
  if (!character) return null
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Кампания для ${character.name || 'персонажа'}`}
      confirmLabel="Готово"
      onConfirm={onClose}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button
          onClick={() => onAssign(character.id, null)}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 14px', borderRadius: '10px', border: 'none',
            background: !character.campaignId ? 'var(--accent-glow)' : 'var(--surface-2)',
            outline: !character.campaignId ? '1px solid var(--border-accent)' : '1px solid var(--border)',
            cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
            color: 'var(--text)', fontSize: '13px', textAlign: 'left',
          }}
        >
          <span style={{ fontSize: '16px' }}>📂</span>
          <span>Без кампании</span>
          {!character.campaignId && <span style={{ marginLeft: 'auto', color: 'var(--accent)', fontSize: '12px' }}>✓</span>}
        </button>
        {campaigns.map(camp => (
          <button
            key={camp.id}
            onClick={() => onAssign(character.id, camp.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 14px', borderRadius: '10px', border: 'none',
              background: character.campaignId === camp.id ? 'var(--accent-glow)' : 'var(--surface-2)',
              outline: character.campaignId === camp.id ? '1px solid var(--border-accent)' : '1px solid var(--border)',
              cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
              color: 'var(--text)', fontSize: '13px', textAlign: 'left',
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: camp.color, flexShrink: 0 }} />
            <span>{camp.name}</span>
            {character.campaignId === camp.id && <span style={{ marginLeft: 'auto', color: 'var(--accent)', fontSize: '12px' }}>✓</span>}
          </button>
        ))}
        {campaigns.length === 0 && (
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', padding: '8px 0', margin: 0 }}>
            Создай кампанию сначала
          </p>
        )}
      </div>
    </Modal>
  )
}

export default function CampaignsTab() {
  const navigate = useNavigate()
  const { campaigns, addCampaign, updateCampaign, removeCampaign } = useCampaignStore()
  const { characters, updateCharacter } = useCharacterStore()

  const [showCreate, setShowCreate] = useState(false)
  const [editCampaign, setEditCampaign] = useState<Campaign | null>(null)
  const [expandedCampaign, setExpandedCampaign] = useState<string | null>(null)
  const [assignTarget, setAssignTarget] = useState<Character | null>(null)

  const handleCreate = (name: string, description: string, systemId: string, color: string) => {
    addCampaign({
      id: generateId(),
      name, description, systemId, color,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    setShowCreate(false)
  }

  const handleEdit = (name: string, description: string, systemId: string, color: string) => {
    if (!editCampaign) return
    updateCampaign({ ...editCampaign, name, description, systemId, color })
    setEditCampaign(null)
  }

  const handleDelete = (id: string) => {
    if (!confirm('Удалить кампанию? Персонажи останутся, но потеряют привязку.')) return
    // Отвязываем всех персонажей
    characters.filter(c => c.campaignId === id).forEach(c => {
      updateCharacter({ ...c, campaignId: undefined })
    })
    removeCampaign(id)
  }

  const handleAssign = (characterId: string, campaignId: string | null) => {
    const char = characters.find(c => c.id === characterId)
    if (!char) return
    updateCharacter({ ...char, campaignId: campaignId ?? undefined })
    setAssignTarget(prev => prev ? { ...prev, campaignId: campaignId ?? undefined } : null)
  }

  // Персонажи без кампании
  const unassigned = characters.filter(c => !c.campaignId)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Кнопка создать */}
      <button
        onClick={() => setShowCreate(true)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          padding: '11px', borderRadius: '12px', border: '1px dashed var(--border)',
          background: 'transparent', color: 'var(--accent)', cursor: 'pointer',
          fontSize: '13px', fontWeight: 600, fontFamily: 'DM Sans, sans-serif',
          transition: 'all 0.15s',
        }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border-accent)'; el.style.background = 'var(--accent-glow)' }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.background = 'transparent' }}
      >
        <div style={{ width: 16, height: 16, display: 'flex', alignItems: 'center' }}>
          <IconPlus size={16} />
        </div>
        Новая кампания
      </button>

      {/* Список кампаний */}
      {campaigns.map(campaign => {
        const members = characters.filter(c => c.campaignId === campaign.id)
        const players = members.filter(c => !c.isNpc)
        const npcs = members.filter(c => c.isNpc)
        const isOpen = expandedCampaign === campaign.id

        return (
          <div key={campaign.id} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '16px', overflow: 'hidden',
            borderLeft: `3px solid ${campaign.color}`,
          }}>
            {/* Шапка кампании */}
            <div
              onClick={() => setExpandedCampaign(isOpen ? null : campaign.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '14px 16px', cursor: 'pointer',
              }}
            >
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: campaign.color, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: 'Cinzel, serif', fontSize: '15px', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
                  {campaign.name}
                </p>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                  {SYSTEM_LABELS[campaign.systemId]} · {members.length} участников
                </p>
              </div>
              {/* Кнопки */}
              <div style={{ display: 'flex', gap: '4px' }} onClick={e => e.stopPropagation()}>
                <button
                  onClick={() => setEditCampaign(campaign)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '6px', borderRadius: '8px', display: 'flex' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
                >
                  <IconEdit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(campaign.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '6px', borderRadius: '8px', display: 'flex' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
                >
                  <IconDelete size={16} />
                </button>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s', display: 'inline-block' }}>▼</span>
            </div>

            {/* Содержимое кампании */}
            {isOpen && (
              <div style={{ borderTop: '1px solid var(--border)', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {campaign.description && (
                  <p style={{ fontSize: '13px', color: 'var(--text-dim)', margin: 0, lineHeight: 1.5 }}>
                    {campaign.description}
                  </p>
                )}

                {/* Игроки */}
                {players.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                      Персонажи ({players.length})
                    </p>
                    {players.map(c => (
                      <div
                        key={c.id}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          padding: '8px 12px', borderRadius: '10px',
                          background: 'var(--surface-2)', border: '1px solid var(--border)',
                          cursor: 'pointer',
                        }}
                        onClick={() => navigate(`/character/${c.id}`)}
                      >
                        <div style={{ width: 18, height: 18, flexShrink: 0 }}><IconCharacter size={18} /></div>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', flex: 1 }}>{c.name || 'Без имени'}</span>
                        <button
                          onClick={e => { e.stopPropagation(); setAssignTarget(c) }}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '11px', fontFamily: 'DM Sans, sans-serif', padding: '2px 6px', borderRadius: '6px' }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent)'}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
                        >
                          переместить
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* НПС */}
                {npcs.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                      НПС ({npcs.length})
                    </p>
                    {npcs.map(c => (
                      <div
                        key={c.id}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          padding: '8px 12px', borderRadius: '10px',
                          background: 'var(--surface-2)', border: '1px solid var(--border)',
                          cursor: 'pointer',
                        }}
                        onClick={() => navigate(`/character/${c.id}`)}
                      >
                        <div style={{ width: 18, height: 18, flexShrink: 0 }}><IconNpc size={18} /></div>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', flex: 1 }}>{c.name || 'Без имени'}</span>
                        <button
                          onClick={e => { e.stopPropagation(); setAssignTarget(c) }}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '11px', fontFamily: 'DM Sans, sans-serif', padding: '2px 6px', borderRadius: '6px' }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent)'}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
                        >
                          переместить
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {members.length === 0 && (
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', padding: '8px 0', margin: 0 }}>
                    Нет участников — назначь персонажей из вкладок
                  </p>
                )}
              </div>
            )}
          </div>
        )
      })}

      {/* Без кампании */}
      {unassigned.length > 0 && campaigns.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
            Без кампании ({unassigned.length})
          </p>
          {unassigned.map(c => (
            <div
              key={c.id}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 14px', borderRadius: '12px',
                background: 'var(--surface)', border: '1px solid var(--border)',
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/character/${c.id}`)}
            >
              <div style={{ width: 20, height: 20, flexShrink: 0 }}>
                {c.isNpc ? <IconNpc size={20} /> : <IconCharacter size={20} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', margin: 0 }}>{c.name || 'Без имени'}</p>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>{c.isNpc ? 'НПС' : 'Персонаж'}</p>
              </div>
              <button
                onClick={e => { e.stopPropagation(); setAssignTarget(c) }}
                style={{
                  background: 'var(--surface-2)', border: '1px solid var(--border)',
                  borderRadius: '8px', padding: '4px 10px', cursor: 'pointer',
                  color: 'var(--text-muted)', fontSize: '11px', fontWeight: 600,
                  fontFamily: 'DM Sans, sans-serif',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border-accent)'; el.style.color = 'var(--accent)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.color = 'var(--text-muted)' }}
              >
                + в кампанию
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Пустой стейт */}
      {campaigns.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 56, height: 56 }}><IconFire size={56} /></div>
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: '16px', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
            Кампаний пока нет
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
            Создай кампанию и группируй персонажей по историям
          </p>
        </div>
      )}

      {/* Модалки */}
      <CreateCampaignModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        onSave={handleCreate}
      />
      <CreateCampaignModal
        isOpen={!!editCampaign}
        onClose={() => setEditCampaign(null)}
        onSave={handleEdit}
        initial={editCampaign ?? undefined}
      />
      <AssignCampaignModal
        isOpen={!!assignTarget}
        character={assignTarget}
        campaigns={campaigns}
        onClose={() => setAssignTarget(null)}
        onAssign={handleAssign}
      />
    </div>
  )
}
