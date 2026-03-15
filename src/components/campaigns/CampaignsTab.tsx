// src/components/campaigns/CampaignsTab.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCampaignStore } from '../../store/campaignStore'
import { useCharacterStore } from '../../store/characterStore'
import { fetchCampaignCharacters } from '../../utils/supabaseSync'
import type { Campaign, Character, CampaignRole } from '../../types'
import { generateId } from '../../utils'
import { Modal } from '../ui'
import { IconCharacter, IconNpc, IconDelete, IconEdit, IconPlus, IconFire } from '../ui/FateIcons'

const CAMPAIGN_COLORS = [
  '#c8a96e', '#e07070', '#70a0e0', '#70c070',
  '#a070e0', '#e09060', '#70c0c0', '#e070a0',
]
const ROLE_COLORS: Record<CampaignRole, string> = { 'gm': '#c8a96e', 'player': '#70a0e0' }

// ── Модалка создания / редактирования ─────────────────────────────────
interface CampaignModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (name: string, description: string, systemId: string, color: string, userRole: CampaignRole) => void
  initial?: Campaign
}

function CampaignModal({ isOpen, onClose, onSave, initial }: CampaignModalProps) {
  const { t } = useTranslation()
  const isEdit = !!initial
  const [name, setName]        = useState(initial?.name ?? '')
  const [description, setDesc] = useState(initial?.description ?? '')
  const [systemId, setSystem]  = useState(initial?.systemId ?? 'fate-core')
  const [color, setColor]      = useState(initial?.color ?? CAMPAIGN_COLORS[0])
  const [userRole, setRole]    = useState<CampaignRole>(initial?.userRole ?? 'gm')

  const handleSave = () => {
    if (!name.trim()) return
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
      title={isEdit ? t('campaigns.modal_title_edit') : t('campaigns.modal_title_create')}
      confirmLabel={isEdit ? t('campaigns.save') : t('campaigns.create')}
      onConfirm={handleSave}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={labelStyle}>{t('campaigns.name_label')}</label>
          <input value={name} onChange={e => setName(e.target.value)}
            placeholder={t('campaigns.name_placeholder')} autoFocus
            onKeyDown={e => e.key === 'Enter' && handleSave()} style={inputStyle}
            onFocus={e => { e.target.style.borderColor = 'var(--input-border-focus)' }}
            onBlur={e => { e.target.style.borderColor = 'var(--input-border)' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={labelStyle}>{t('campaigns.desc_label')}</label>
          <textarea value={description} onChange={e => setDesc(e.target.value)}
            placeholder={t('campaigns.desc_placeholder')} rows={2}
            style={{ ...inputStyle, resize: 'vertical' }}
            onFocus={e => { e.target.style.borderColor = 'var(--input-border-focus)' }}
            onBlur={e => { e.target.style.borderColor = 'var(--input-border)' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={labelStyle}>{t('campaigns.system_label')}</label>
          <select value={systemId} onChange={e => setSystem(e.target.value)} style={inputStyle}>
            <option value="fate-core">{t('systems.fate-core')}</option>
            <option value="fate-accelerated">{t('systems.fate-accelerated')}</option>
            <option value="book-of-ashes">{t('systems.book-of-ashes')}</option>
          </select>
        </div>

        {!isEdit && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={labelStyle}>{t('campaigns.role_label')}</label>
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
                  {role === 'gm' ? '⚔️ ' : '🎲 '}{role === 'gm' ? t('campaigns.role_gm') : t('campaigns.role_player')}
                </button>
              ))}
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
              {userRole === 'gm' ? t('campaigns.role_gm_hint') : t('campaigns.role_player_hint')}
            </p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={labelStyle}>{t('campaigns.color_label')}</label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingBottom: '4px', paddingTop: '2px' }}>
            {CAMPAIGN_COLORS.map(c => (
              <button key={c} onClick={() => setColor(c)} style={{
                width: '32px', height: '32px', borderRadius: '50%', background: c,
                border: 'none', cursor: 'pointer',
                outline: color === c ? '3px solid var(--accent)' : '2px solid transparent', outlineOffset: '2px',
              }} />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

// ── Модалка назначения ─────────────────────────────────────────────────
interface AssignModalProps {
  isOpen: boolean; character: Character | null; campaigns: Campaign[]
  onClose: () => void; onAssign: (characterId: string, campaignId: string | null) => void
}

function AssignModal({ isOpen, character, campaigns, onClose, onAssign }: AssignModalProps) {
  const { t } = useTranslation()
  if (!character) return null
  return (
    <Modal isOpen={isOpen} onClose={onClose}
      title={`${t('campaigns.assign_title', 'Кампания для')} «${character.name || t('character.unnamed')}»`}
      confirmLabel={t('common.done')} onConfirm={onClose}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button onClick={() => onAssign(character.id, null)} style={{
          display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
          borderRadius: '10px', border: 'none',
          background: !character.campaignId ? 'var(--accent-glow)' : 'var(--surface-2)',
          outline: !character.campaignId ? '1px solid var(--border-accent)' : '1px solid var(--border)',
          cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', color: 'var(--text)', fontSize: '13px',
        }}>
          <span>📂</span>
          <span style={{ flex: 1 }}>{t('campaigns.no_campaign', 'Без кампании')}</span>
          {!character.campaignId && <span style={{ color: 'var(--accent)' }}>✓</span>}
        </button>
        {campaigns.map(camp => (
          <button key={camp.id} onClick={() => onAssign(character.id, camp.id)} style={{
            display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
            borderRadius: '10px', border: 'none',
            background: character.campaignId === camp.id ? 'var(--accent-glow)' : 'var(--surface-2)',
            outline: character.campaignId === camp.id ? '1px solid var(--border-accent)' : '1px solid var(--border)',
            cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', color: 'var(--text)', fontSize: '13px',
          }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: camp.color, flexShrink: 0 }} />
            <span style={{ flex: 1 }}>{camp.name}</span>
            <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '20px', background: 'var(--surface-3)', color: ROLE_COLORS[camp.userRole] }}>
              {camp.userRole === 'gm' ? t('campaigns.role_gm') : t('campaigns.role_player')}
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
  const { t } = useTranslation()
  const { campaigns, addCampaign, updateCampaign, removeCampaign } = useCampaignStore()
  const { characters, updateCharacter } = useCharacterStore()

  const [showCreate, setShowCreate]     = useState(false)
  const [editCampaign, setEditCampaign] = useState<Campaign | null>(null)
  const [expanded, setExpanded]         = useState<string | null>(null)
  const [assignTarget, setAssignTarget] = useState<Character | null>(null)
  const [remoteCharsCache, setRemoteCharsCache] = useState<Record<string, Character[]>>({})
  const [loadingChars, setLoadingChars]         = useState<string | null>(null)

  const SYSTEM_LABELS: Record<string, string> = {
    'fate-core':        t('systems.fate-core'),
    'fate-accelerated': t('systems.fate-accelerated'),
    'book-of-ashes':    t('systems.book-of-ashes'),
  }

  const handleCreate = (name: string, description: string, systemId: string, color: string, userRole: CampaignRole) => {
    addCampaign({ id: generateId(), name, description, systemId, color, userRole, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
    setShowCreate(false)
  }

  const handleEdit = (name: string, description: string, systemId: string, color: string, userRole: CampaignRole) => {
    if (!editCampaign) return
    updateCampaign({ ...editCampaign, name, description, systemId, color, userRole })
    setEditCampaign(null)
  }

  const handleDelete = (id: string) => {
    if (!confirm(t('campaigns.delete_confirm'))) return
    characters.filter(c => c.campaignId === id).forEach(c => updateCharacter({ ...c, campaignId: undefined }))
    removeCampaign(id)
  }

  const handleAssign = (characterId: string, campaignId: string | null) => {
    const char = characters.find(c => c.id === characterId)
    if (!char) return
    updateCharacter({ ...char, campaignId: campaignId ?? undefined })
    setAssignTarget(prev => prev?.id === characterId ? { ...prev, campaignId: campaignId ?? undefined } : prev)
  }

  const handleExpand = async (campaignId: string) => {
    if (expanded === campaignId) { setExpanded(null); return }
    setExpanded(campaignId)
    if (!remoteCharsCache[campaignId]) {
      setLoadingChars(campaignId)
      const remote = await fetchCampaignCharacters(campaignId)
      setRemoteCharsCache(prev => ({ ...prev, [campaignId]: remote }))
      setLoadingChars(null)
    }
  }

  const unassigned = characters.filter(c => !c.campaignId)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      <button onClick={() => setShowCreate(true)} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        padding: '11px', borderRadius: '12px', border: '1px dashed var(--border)',
        background: 'transparent', color: 'var(--accent)', cursor: 'pointer',
        fontSize: '13px', fontWeight: 600, fontFamily: 'DM Sans, sans-serif',
      }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border-accent)'; el.style.background = 'var(--accent-glow)' }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.background = 'transparent' }}
      >
        <div style={{ width: 16, height: 16 }}><IconPlus size={16} /></div>
        {t('campaigns.new')}
      </button>

      {campaigns.map(campaign => {
        const isOpen = expanded === campaign.id
        const isGm   = campaign.userRole === 'gm'
        const localMembers  = characters.filter(c => c.campaignId === campaign.id)
        const remoteMembers = remoteCharsCache[campaign.id] ?? []
        const localIds = new Set(localMembers.map(c => c.id))
        const allMembers = [...localMembers, ...remoteMembers.filter(c => !localIds.has(c.id))]
        const players = allMembers.filter(c => !c.isNpc)
        const npcs    = allMembers.filter(c => c.isNpc)
        const isLoadingChars = loadingChars === campaign.id

        return (
          <div key={campaign.id} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '16px', overflow: 'hidden', borderLeft: `3px solid ${campaign.color}`,
          }}>
            <div onClick={() => handleExpand(campaign.id)}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', cursor: 'pointer' }}
            >
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: campaign.color, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: 'Cinzel, serif', fontSize: '15px', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
                  {campaign.name}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
                    {SYSTEM_LABELS[campaign.systemId]} · {t('campaigns.members', { count: allMembers.length })}
                  </p>
                  <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px', background: 'var(--surface-2)', color: ROLE_COLORS[campaign.userRole] }}>
                    {campaign.userRole === 'gm' ? '⚔️' : '🎲'} {campaign.userRole === 'gm' ? t('campaigns.role_gm') : t('campaigns.role_player')}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }} onClick={e => e.stopPropagation()}>
                <button onClick={() => navigate(`/campaign/${campaign.id}/room`)} style={{
                  background: 'var(--accent-glow)', border: '1px solid var(--border-accent)',
                  borderRadius: '8px', padding: '5px 10px', cursor: 'pointer',
                  color: 'var(--accent)', fontSize: '11px', fontWeight: 700,
                  fontFamily: 'DM Sans, sans-serif', whiteSpace: 'nowrap',
                }}>
                  {t('campaigns.enter')}
                </button>
                <button onClick={() => setEditCampaign(campaign)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '6px', borderRadius: '8px', display: 'flex' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
                ><IconEdit size={16} /></button>
                <button onClick={() => handleDelete(campaign.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '6px', borderRadius: '8px', display: 'flex' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#e07070'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
                ><IconDelete size={16} /></button>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'inline-block', transform: isOpen ? 'rotate(0)' : 'rotate(-90deg)', transition: 'transform 0.2s' }}>▼</span>
            </div>

            {isOpen && (
              <div style={{ borderTop: '1px solid var(--border)', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {campaign.description && (
                  <p style={{ fontSize: '13px', color: 'var(--text-dim)', margin: 0, lineHeight: 1.5 }}>{campaign.description}</p>
                )}
                {isLoadingChars && (
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0, textAlign: 'center' }}>{t('common.loading')}</p>
                )}

                {players.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                      {t('campaigns.players_section', { count: players.length })}
                    </p>
                    {players.map(c => {
                      const isLocal = localIds.has(c.id)
                      return (
                        <div key={c.id} onClick={() => navigate(`/character/${c.id}`)} style={{
                          display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px',
                          borderRadius: '10px', background: 'var(--surface-2)', border: '1px solid var(--border)', cursor: 'pointer',
                        }}>
                          <div style={{ width: 18, height: 18, flexShrink: 0 }}><IconCharacter size={18} /></div>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', flex: 1 }}>{c.name || t('character.unnamed')}</span>
                          {!isLocal && (
                            <span style={{ fontSize: '10px', color: 'var(--text-muted)', padding: '2px 6px', borderRadius: '6px', background: 'var(--surface-3)' }}>
                              {t('campaigns.role_player').toLowerCase()}
                            </span>
                          )}
                          {isLocal && (
                            <button onClick={e => { e.stopPropagation(); setAssignTarget(c) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '11px', fontFamily: 'DM Sans, sans-serif', padding: '2px 6px', borderRadius: '6px' }}>
                              {t('campaigns.move')}
                            </button>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}

                {isGm && npcs.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                      {t('campaigns.npcs_section', { count: npcs.length })}
                    </p>
                    {npcs.map(c => (
                      <div key={c.id} onClick={() => navigate(`/character/${c.id}`)} style={{
                        display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px',
                        borderRadius: '10px', background: 'var(--surface-2)', border: '1px solid var(--border)', cursor: 'pointer',
                      }}>
                        <div style={{ width: 18, height: 18, flexShrink: 0 }}><IconNpc size={18} /></div>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', flex: 1 }}>{c.name || t('character.unnamed')}</span>
                        <button onClick={e => { e.stopPropagation(); setAssignTarget(c) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '11px', fontFamily: 'DM Sans, sans-serif', padding: '2px 6px', borderRadius: '6px' }}>
                          {t('campaigns.move')}
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {!isLoadingChars && allMembers.length === 0 && (
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', padding: '8px 0', margin: 0 }}>
                    {t('campaigns.no_members')}
                  </p>
                )}
              </div>
            )}
          </div>
        )
      })}

      {unassigned.length > 0 && campaigns.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
            {t('campaigns.unassigned', { count: unassigned.length })}
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
                <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', margin: 0 }}>{c.name || t('character.unnamed')}</p>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>{c.isNpc ? t('systems.npc_badge') : t('systems.player_badge')}</p>
              </div>
              <button onClick={e => { e.stopPropagation(); setAssignTarget(c) }} style={{
                background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '8px',
                padding: '4px 10px', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '11px',
                fontWeight: 600, fontFamily: 'DM Sans, sans-serif',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border-accent)'; el.style.color = 'var(--accent)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.color = 'var(--text-muted)' }}
              >
                {t('campaigns.assign')}
              </button>
            </div>
          ))}
        </div>
      )}

      {campaigns.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 56, height: 56 }}><IconFire size={56} /></div>
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: '16px', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
            {t('campaigns.empty_title')}
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
            {t('campaigns.empty_hint')}
          </p>
        </div>
      )}

      <CampaignModal isOpen={showCreate} onClose={() => setShowCreate(false)} onSave={handleCreate} />
      <CampaignModal isOpen={!!editCampaign} onClose={() => setEditCampaign(null)} onSave={handleEdit} initial={editCampaign ?? undefined} />
      <AssignModal isOpen={!!assignTarget} character={assignTarget} campaigns={campaigns} onClose={() => setAssignTarget(null)} onAssign={handleAssign} />
    </div>
  )
}
