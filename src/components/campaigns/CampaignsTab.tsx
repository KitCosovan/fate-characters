// src/components/campaigns/CampaignsTab.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCampaignStore } from '../../store/campaignStore'
import { useCharacterStore } from '../../store/characterStore'
import type { Campaign, Character, CampaignRole } from '../../types'
import { generateId } from '../../utils'
import { Modal } from '../ui'
import { IconCharacter, IconNpc, IconDelete, IconEdit, IconPlus, IconFire } from '../ui/FateIcons'

const CAMPAIGN_COLORS = [
  '#c8a96e', '#e07070', '#70a0e0', '#70c070',
  '#a070e0', '#e09060', '#70c0c0', '#e070a0',
]

const SYSTEM_LABELS: Record<string, string> = {
  'fate-core': 'Fate Core',
  'fate-accelerated': 'Accelerated',
  'book-of-ashes': 'Книга Пепла',
}

const ROLE_LABELS: Record<CampaignRole, string> = { 'gm': 'Мастер', 'player': 'Игрок' }
const ROLE_COLORS: Record<CampaignRole, string> = { 'gm': '#c8a96e', 'player': '#70a0e0' }

// ── Модалка создания ───────────────────────────────────────────────────
// При СОЗДАНИИ роль выбирается один раз и не меняется
// При РЕДАКТИРОВАНИИ — только название, описание, цвет (без роли)
interface CampaignModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (name: string, description: string, systemId: string, color: string, userRole: CampaignRole) => void
  initial?: Campaign
}

function CampaignModal({ isOpen, onClose, onSave, initial }: CampaignModalProps) {
  const isEdit = !!initial
  const [name, setName]       = useState(initial?.name ?? '')
  const [description, setDesc] = useState(initial?.description ?? '')
  const [systemId, setSystem]  = useState(initial?.systemId ?? 'fate-core')
  const [color, setColor]      = useState(initial?.color ?? CAMPAIGN_COLORS[0])
  const [userRole, setRole]    = useState<CampaignRole>(initial?.userRole ?? 'gm')

  const handleSave = () => {
    if (!name.trim()) return
    // При редактировании передаём существующую роль без изменений
    onSave(name.trim(), description.trim(), systemId, color, isEdit ? initial!.userRole : userRole)
  }

  const inputStyle: React.CSSProperties = {
    background: 'var(--input-bg)', border: '1px solid var(--input-border)',
    borderRadius: '10px', padding: '10px 14px', fontSize: '14px',
    color: 'var(--input-text)', outline: 'none', fontFamily: 'DM Sans, sans-serif',
    width: '100%', boxSizing: 'border-box',
  }
  const labelStyle: React.CSSProperties = {
    fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)',
    textTransform: 'uppercase', letterSpacing: '0.08em',
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}
      title={isEdit ? 'Редактировать кампанию' : 'Новая кампания'}
      confirmLabel={isEdit ? 'Сохранить' : 'Создать'} onConfirm={handleSave}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={labelStyle}>Название</label>
          <input value={name} onChange={e => setName(e.target.value)}
            placeholder="Например: Пепел Империи" autoFocus
            onKeyDown={e => e.key === 'Enter' && handleSave()} style={inputStyle}
            onFocus={e => { e.target.style.borderColor = 'var(--input-border-focus)' }}
            onBlur={e => { e.target.style.borderColor = 'var(--input-border)' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={labelStyle}>Описание</label>
          <textarea value={description} onChange={e => setDesc(e.target.value)}
            placeholder="Краткое описание..." rows={2}
            style={{ ...inputStyle, resize: 'vertical' }}
            onFocus={e => { e.target.style.borderColor = 'var(--input-border-focus)' }}
            onBlur={e => { e.target.style.borderColor = 'var(--input-border)' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={labelStyle}>Система</label>
          <select value={systemId} onChange={e => setSystem(e.target.value)} style={inputStyle}>
            <option value="fate-core">Fate Core</option>
            <option value="fate-accelerated">Fate Accelerated</option>
            <option value="book-of-ashes">Книга Пепла</option>
          </select>
        </div>

        {/* Роль — только при создании, потом заблокирована */}
        {!isEdit && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={labelStyle}>Моя роль в кампании</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['gm', 'player'] as CampaignRole[]).map(role => (
                <button key={role} onClick={() => setRole(role)} style={{
                  flex: 1, padding: '10px', borderRadius: '10px', border: 'none',
                  cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                  fontSize: '13px', fontWeight: 600, transition: 'all 0.15s',
                  background: userRole === role ? 'var(--accent-glow)' : 'var(--surface-2)',
                  color: userRole === role ? ROLE_COLORS[role] : 'var(--text-muted)',
                  outline: userRole === role ? `1px solid ${ROLE_COLORS[role]}` : '1px solid var(--border)',
                }}>
                  {role === 'gm' ? '⚔️ ' : '🎲 '}{ROLE_LABELS[role]}
                </button>
              ))}
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
              {userRole === 'gm'
                ? 'Создаёшь кампанию как Мастер — полный доступ к НПС'
                : 'Присоединяешься как Игрок — только свои персонажи и чужие'}
            </p>
          </div>
        )}

        {/* Цвет */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={labelStyle}>Цвет</label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {CAMPAIGN_COLORS.map(c => (
              <button key={c} onClick={() => setColor(c)} style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: c, border: 'none', cursor: 'pointer',
                outline: color === c ? '3px solid var(--accent)' : '2px solid transparent',
                outlineOffset: '2px', transition: 'outline 0.15s',
              }} />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

// ── Модалка назначения в кампанию ──────────────────────────────────────
interface AssignModalProps {
  isOpen: boolean
  character: Character | null
  campaigns: Campaign[]
  onClose: () => void
  onAssign: (characterId: string, campaignId: string | null) => void
}

function AssignModal({ isOpen, character, campaigns, onClose, onAssign }: AssignModalProps) {
  if (!character) return null
  return (
    <Modal isOpen={isOpen} onClose={onClose}
      title={`Кампания для «${character.name || 'персонажа'}»`}
      confirmLabel="Готово" onConfirm={onClose}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button onClick={() => onAssign(character.id, null)} style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '10px 14px', borderRadius: '10px', border: 'none',
          background: !character.campaignId ? 'var(--accent-glow)' : 'var(--surface-2)',
          outline: !character.campaignId ? '1px solid var(--border-accent)' : '1px solid var(--border)',
          cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', color: 'var(--text)', fontSize: '13px',
        }}>
          <span>📂</span> <span style={{ flex: 1 }}>Без кампании</span>
          {!character.campaignId && <span style={{ color: 'var(--accent)' }}>✓</span>}
        </button>
        {campaigns.map(camp => (
          <button key={camp.id} onClick={() => onAssign(character.id, camp.id)} style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 14px', borderRadius: '10px', border: 'none',
            background: character.campaignId === camp.id ? 'var(--accent-glow)' : 'var(--surface-2)',
            outline: character.campaignId === camp.id ? '1px solid var(--border-accent)' : '1px solid var(--border)',
            cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', color: 'var(--text)', fontSize: '13px',
          }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: camp.color, flexShrink: 0 }} />
            <span style={{ flex: 1 }}>{camp.name}</span>
            <span style={{
              fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '20px',
              background: 'var(--surface-3)', color: ROLE_COLORS[camp.userRole],
            }}>
              {ROLE_LABELS[camp.userRole]}
            </span>
            {character.campaignId === camp.id && <span style={{ color: 'var(--accent)' }}>✓</span>}
          </button>
        ))}
      </div>
    </Modal>
  )
}

// ── Основной компонент ─────────────────────────────────────────────────
export default function CampaignsTab() {
  const navigate = useNavigate()
  const { campaigns, addCampaign, updateCampaign, removeCampaign } = useCampaignStore()
  const { characters, updateCharacter } = useCharacterStore()

  const [showCreate, setShowCreate]     = useState(false)
  const [editCampaign, setEditCampaign] = useState<Campaign | null>(null)
  const [expanded, setExpanded]         = useState<string | null>(null)
  const [assignTarget, setAssignTarget] = useState<Character | null>(null)

  const handleCreate = (name: string, description: string, systemId: string, color: string, userRole: CampaignRole) => {
    addCampaign({
      id: generateId(), name, description, systemId, color, userRole,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    })
    setShowCreate(false)
  }

  const handleEdit = (name: string, description: string, systemId: string, color: string, userRole: CampaignRole) => {
    if (!editCampaign) return
    updateCampaign({ ...editCampaign, name, description, systemId, color, userRole })
    setEditCampaign(null)
  }

  const handleDelete = (id: string) => {
    if (!confirm('Удалить кампанию? Персонажи останутся, но потеряют привязку.')) return
    characters.filter(c => c.campaignId === id).forEach(c => updateCharacter({ ...c, campaignId: undefined }))
    removeCampaign(id)
  }

  const handleAssign = (characterId: string, campaignId: string | null) => {
    const char = characters.find(c => c.id === characterId)
    if (!char) return
    updateCharacter({ ...char, campaignId: campaignId ?? undefined })
    setAssignTarget(prev => prev?.id === characterId ? { ...prev, campaignId: campaignId ?? undefined } : prev)
  }

  const unassigned = characters.filter(c => !c.campaignId)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      <button onClick={() => setShowCreate(true)} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        padding: '11px', borderRadius: '12px', border: '1px dashed var(--border)',
        background: 'transparent', color: 'var(--accent)', cursor: 'pointer',
        fontSize: '13px', fontWeight: 600, fontFamily: 'DM Sans, sans-serif', transition: 'all 0.15s',
      }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border-accent)'; el.style.background = 'var(--accent-glow)' }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.background = 'transparent' }}
      >
        <div style={{ width: 16, height: 16 }}><IconPlus size={16} /></div>
        Новая кампания
      </button>

      {campaigns.map(campaign => {
        const members = characters.filter(c => c.campaignId === campaign.id)
        const players = members.filter(c => !c.isNpc)
        const npcs    = members.filter(c => c.isNpc)
        const isOpen  = expanded === campaign.id
        const isGm    = campaign.userRole === 'gm'

        return (
          <div key={campaign.id} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '16px', overflow: 'hidden',
            borderLeft: `3px solid ${campaign.color}`,
          }}>
            {/* Шапка */}
            <div onClick={() => setExpanded(isOpen ? null : campaign.id)}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', cursor: 'pointer' }}
            >
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: campaign.color, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: 'Cinzel, serif', fontSize: '15px', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
                  {campaign.name}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
                    {SYSTEM_LABELS[campaign.systemId]} · {members.length} участников
                  </p>
                  {/* Роль — только отображение, не кликабельно */}
                  <span style={{
                    fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px',
                    background: 'var(--surface-2)', color: ROLE_COLORS[campaign.userRole],
                    outline: `1px solid ${ROLE_COLORS[campaign.userRole]}44`,
                  }}>
                    {campaign.userRole === 'gm' ? '⚔️' : '🎲'} {ROLE_LABELS[campaign.userRole]}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }} onClick={e => e.stopPropagation()}>
                {/* Кнопка войти в комнату */}
                <button
                  onClick={() => navigate(`/campaign/${campaign.id}/room`)}
                  style={{
                    background: 'var(--accent-glow)', border: '1px solid var(--border-accent)',
                    borderRadius: '8px', padding: '5px 10px', cursor: 'pointer',
                    color: 'var(--accent)', fontSize: '11px', fontWeight: 700,
                    fontFamily: 'DM Sans, sans-serif', whiteSpace: 'nowrap',
                  }}
                >
                  Войти →
                </button>
                <button onClick={() => setEditCampaign(campaign)} style={{
                  background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
                  padding: '6px', borderRadius: '8px', display: 'flex',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
                >
                  <IconEdit size={16} />
                </button>
                <button onClick={() => handleDelete(campaign.id)} style={{
                  background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
                  padding: '6px', borderRadius: '8px', display: 'flex',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#e07070'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
                >
                  <IconDelete size={16} />
                </button>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'inline-block', transform: isOpen ? 'rotate(0)' : 'rotate(-90deg)', transition: 'transform 0.2s' }}>▼</span>
            </div>

            {/* Содержимое */}
            {isOpen && (
              <div style={{ borderTop: '1px solid var(--border)', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {campaign.description && (
                  <p style={{ fontSize: '13px', color: 'var(--text-dim)', margin: 0, lineHeight: 1.5 }}>{campaign.description}</p>
                )}

                {/* Персонажи */}
                {players.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                      Персонажи ({players.length})
                    </p>
                    {players.map(c => (
                      <div key={c.id} onClick={() => navigate(`/character/${c.id}`)} style={{
                        display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px',
                        borderRadius: '10px', background: 'var(--surface-2)', border: '1px solid var(--border)', cursor: 'pointer',
                      }}>
                        <div style={{ width: 18, height: 18, flexShrink: 0 }}><IconCharacter size={18} /></div>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', flex: 1 }}>{c.name || 'Без имени'}</span>
                        <button onClick={e => { e.stopPropagation(); setAssignTarget(c) }} style={{
                          background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
                          fontSize: '11px', fontFamily: 'DM Sans, sans-serif', padding: '2px 6px', borderRadius: '6px',
                        }}>переместить</button>
                      </div>
                    ))}
                  </div>
                )}

                {/* НПС — только для ГМ в локальном списке */}
                {isGm && npcs.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                      НПС ({npcs.length})
                    </p>
                    {npcs.map(c => (
                      <div key={c.id} onClick={() => navigate(`/character/${c.id}`)} style={{
                        display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px',
                        borderRadius: '10px', background: 'var(--surface-2)', border: '1px solid var(--border)', cursor: 'pointer',
                      }}>
                        <div style={{ width: 18, height: 18, flexShrink: 0 }}><IconNpc size={18} /></div>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', flex: 1 }}>{c.name || 'Без имени'}</span>
                        <button onClick={e => { e.stopPropagation(); setAssignTarget(c) }} style={{
                          background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
                          fontSize: '11px', fontFamily: 'DM Sans, sans-serif', padding: '2px 6px', borderRadius: '6px',
                        }}>переместить</button>
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
            <div key={c.id} onClick={() => navigate(`/character/${c.id}`)} style={{
              display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
              borderRadius: '12px', background: 'var(--surface)', border: '1px solid var(--border)', cursor: 'pointer',
            }}>
              <div style={{ width: 20, height: 20, flexShrink: 0 }}>
                {c.isNpc ? <IconNpc size={20} /> : <IconCharacter size={20} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', margin: 0 }}>{c.name || 'Без имени'}</p>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>{c.isNpc ? 'НПС' : 'Персонаж'}</p>
              </div>
              <button onClick={e => { e.stopPropagation(); setAssignTarget(c) }} style={{
                background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '8px',
                padding: '4px 10px', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '11px',
                fontWeight: 600, fontFamily: 'DM Sans, sans-serif',
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

      {campaigns.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 56, height: 56 }}><IconFire size={56} /></div>
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: '16px', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
            Кампаний пока нет
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
            Создай кампанию — выбери роль Мастера или Игрока
          </p>
        </div>
      )}

      <CampaignModal isOpen={showCreate} onClose={() => setShowCreate(false)} onSave={handleCreate} />
      <CampaignModal isOpen={!!editCampaign} onClose={() => setEditCampaign(null)} onSave={handleEdit} initial={editCampaign ?? undefined} />
      <AssignModal isOpen={!!assignTarget} character={assignTarget} campaigns={campaigns} onClose={() => setAssignTarget(null)} onAssign={handleAssign} />
    </div>
  )
}
