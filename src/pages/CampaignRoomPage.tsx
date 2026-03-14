// src/pages/CampaignRoomPage.tsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCampaignRoomStore } from '../store/campaignRoomStore'
import { useCampaignStore } from '../store/campaignStore'
import { useAuthStore } from '../store/authStore'
import { supabase } from '../lib/supabase'
import type { Character, NpcVisibleField } from '../types'
import { IconCharacter, IconNpc, IconBack, IconShare } from '../components/ui/FateIcons'

const NPC_FIELD_LABELS: Record<NpcVisibleField, string> = {
  concept:      'Концепция',
  aspects:      'Аспекты',
  skills:       'Навыки',
  stress:       'Стресс',
  consequences: 'Последствия',
  stunts:       'Трюки',
}

const ALL_NPC_FIELDS: NpcVisibleField[] = ['concept', 'aspects', 'skills', 'stress', 'consequences', 'stunts']

function PlayerCard({ character, ownerName, isMe, onClick }: {
  character: Character; ownerName: string; isMe: boolean; onClick: () => void
}) {
  const concept = character.aspects.find(a =>
    a.slotId === 'high-concept' || a.slotId === 'concept'
  )?.value
  const totalStress = character.stressTracks.reduce((s, t) => s + t.boxes.length, 0)
  const usedStress  = character.stressTracks.reduce((s, t) => s + t.boxes.filter(b => b.checked).length, 0)

  return (
    <div onClick={onClick} style={{
      background: isMe ? 'var(--accent-glow)' : 'var(--surface)',
      border: `1px solid ${isMe ? 'var(--border-accent)' : 'var(--border)'}`,
      borderRadius: '16px', padding: '16px', cursor: 'pointer',
      display: 'flex', flexDirection: 'column', gap: '10px',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
            <div style={{ width: 16, height: 16, flexShrink: 0 }}><IconCharacter size={16} /></div>
            <p style={{ fontFamily: 'Cinzel, serif', fontSize: '15px', fontWeight: 700, color: 'var(--text)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {character.name || 'Без имени'}
            </p>
          </div>
          {concept && <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{concept}</p>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
          {isMe && <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px', background: 'var(--accent)', color: 'var(--bg)' }}>Мой</span>}
          {/* Показываем имя/email владельца */}
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {ownerName}
          </span>
        </div>
      </div>
      {totalStress > 0 && (
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', alignItems: 'center' }}>
          {character.stressTracks.map(track =>
            track.boxes.map((box, i) => (
              <div key={`${track.trackId}-${i}`} style={{
                width: 14, height: 14, borderRadius: '3px',
                background: box.checked ? 'var(--accent)' : 'transparent',
                border: `1px solid ${box.checked ? 'var(--accent)' : 'var(--border)'}`,
              }} />
            ))
          )}
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginLeft: '4px' }}>{usedStress}/{totalStress}</span>
        </div>
      )}
      {character.consequences.some(c => c.value) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {character.consequences.filter(c => c.value).map((c, i) => (
            <p key={i} style={{ fontSize: '11px', color: '#e07070', margin: 0 }}>⚡ {c.value}</p>
          ))}
        </div>
      )}
    </div>
  )
}

function NpcCard({ character, isGm, onToggleVisibility, onEditFields, onClick }: {
  character: Character; isGm: boolean
  onToggleVisibility: () => void; onEditFields: () => void; onClick: () => void
}) {
  const concept = character.aspects.find(a => a.slotId === 'high-concept' || a.slotId === 'concept')?.value
  const isVisible = character.visibleToPlayers === true

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: '16px', padding: '16px',
      opacity: isGm ? 1 : isVisible ? 1 : 0.5,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        <div style={{ width: 18, height: 18, flexShrink: 0, marginTop: '2px' }}><IconNpc size={18} /></div>
        <div style={{ flex: 1, minWidth: 0, cursor: 'pointer' }} onClick={onClick}>
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: '14px', fontWeight: 700, color: 'var(--text)', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {character.name || 'Без имени'}
          </p>
          {concept && <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: 0 }}>{concept}</p>}
        </div>
        {isGm && (
          <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
            <button onClick={onEditFields} style={{
              background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '8px',
              padding: '4px 8px', cursor: 'pointer', fontSize: '11px', fontWeight: 600,
              color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif',
            }}>Поля</button>
            <button onClick={onToggleVisibility} style={{
              padding: '4px 8px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              fontSize: '11px', fontWeight: 600, fontFamily: 'DM Sans, sans-serif',
              background: isVisible ? 'rgba(112,192,112,0.15)' : 'var(--surface-2)',
              color: isVisible ? '#70c070' : 'var(--text-muted)',
            }}>
              {isVisible ? '👁 Виден' : '🙈 Скрыт'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function NpcFieldsModal({ character, onClose, onSave }: {
  character: Character; onClose: () => void; onSave: (fields: NpcVisibleField[]) => void
}) {
  const [selected, setSelected] = useState<NpcVisibleField[]>(
    character.visibleFields?.length ? character.visibleFields : ALL_NPC_FIELDS
  )
  const toggle = (f: NpcVisibleField) =>
    setSelected(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px',
    }} onClick={onClose}>
      <div style={{
        background: 'var(--surface)', borderRadius: '20px', padding: '24px',
        maxWidth: '360px', width: '100%', border: '1px solid var(--border)',
      }} onClick={e => e.stopPropagation()}>
        <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '16px', fontWeight: 700, color: 'var(--text)', margin: '0 0 16px' }}>
          {character.name} — что видят игроки
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          <button onClick={() => setSelected(selected.length === ALL_NPC_FIELDS.length ? [] : [...ALL_NPC_FIELDS])} style={{
            padding: '8px 12px', borderRadius: '10px', border: 'none', cursor: 'pointer',
            background: selected.length === ALL_NPC_FIELDS.length ? 'var(--accent-glow)' : 'var(--surface-2)',
            outline: selected.length === ALL_NPC_FIELDS.length ? '1px solid var(--border-accent)' : '1px solid var(--border)',
            fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600,
            color: selected.length === ALL_NPC_FIELDS.length ? 'var(--accent)' : 'var(--text-muted)', textAlign: 'left',
          }}>Все поля</button>
          {ALL_NPC_FIELDS.map(field => (
            <button key={field} onClick={() => toggle(field)} style={{
              padding: '8px 12px', borderRadius: '10px', border: 'none', cursor: 'pointer',
              background: selected.includes(field) ? 'var(--accent-glow)' : 'var(--surface-2)',
              outline: selected.includes(field) ? '1px solid var(--border-accent)' : '1px solid var(--border)',
              fontFamily: 'DM Sans, sans-serif', fontSize: '13px',
              color: selected.includes(field) ? 'var(--accent)' : 'var(--text-dim)',
              textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              {NPC_FIELD_LABELS[field]}
              {selected.includes(field) && <span style={{ color: 'var(--accent)' }}>✓</span>}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={onClose} style={{
            flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid var(--border)',
            background: 'var(--surface-2)', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)',
          }}>Отмена</button>
          <button onClick={() => { onSave(selected); onClose() }} style={{
            flex: 1, padding: '10px', borderRadius: '10px', border: 'none',
            background: 'var(--accent)', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px', fontWeight: 600, color: 'var(--bg)',
          }}>Сохранить</button>
        </div>
      </div>
    </div>
  )
}

export default function CampaignRoomPage() {
  const { id: campaignId } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const user = useAuthStore(s => s.user)
  const { getById, updateCampaign } = useCampaignStore()
  const {
    members, characters, myRole, loading,
    joinRoom, leaveRoom, setNpcVisibility, setNpcVisibleFields,
  } = useCampaignRoomStore()

  const [inviteCode, setInviteCode]       = useState<string | null>(null)
  const [showInvite, setShowInvite]       = useState(false)
  const [editingNpc, setEditingNpc]       = useState<Character | null>(null)
  const [copied, setCopied]               = useState(false)
  const [inviteLoading, setInviteLoading] = useState(false)

  const campaign = campaignId ? getById(campaignId) : undefined
  const isGm = myRole === 'gm'

  useEffect(() => {
    if (!campaignId || !user || !campaign) return
    joinRoom(campaignId, user.id, campaign.userRole)
    return () => leaveRoom()
  }, [campaignId, user?.id])

  useEffect(() => {
    if (campaign?.inviteCode) setInviteCode(campaign.inviteCode)
  }, [campaign?.inviteCode])

  const handleGenerateInvite = async () => {
    if (!campaignId || !user) return
    setInviteLoading(true)

    // Починить user_id если null
    await supabase.from('campaigns')
      .update({ user_id: user.id })
      .eq('id', campaignId)
      .is('user_id', null)

    const code = Math.random().toString(36).slice(2, 8).toUpperCase()
    const { error } = await supabase.from('campaigns')
      .update({ invite_code: code })
      .eq('id', campaignId)

    if (!error) {
      if (campaign) updateCampaign({ ...campaign, inviteCode: code })
      setInviteCode(code)
      setShowInvite(true)
    }
    setInviteLoading(false)
  }

  const inviteUrl = inviteCode
    ? `${window.location.origin}${window.location.pathname}#/join/${inviteCode}`
    : null

  const copyInvite = async () => {
    if (!inviteUrl) return
    await navigator.clipboard.writeText(inviteUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const playerChars = characters.filter(c => !c.isNpc)
  const npcChars    = characters.filter(c => c.isNpc)
  const visibleNpcs = isGm ? npcChars : npcChars.filter(c => c.visibleToPlayers === true)

  // Имя владельца из campaign_members (display_name = email или введённое имя)
  const getOwnerName = (ownerId?: string) => {
    if (!ownerId) return '—'
    if (ownerId === user?.id) return 'Я'
    const member = members.find(m => m.userId === ownerId)
    // display_name содержит email или имя введённое при вступлении
    return member?.displayName ?? 'Игрок'
  }

  if (!user) return (
    <div style={{ textAlign: 'center', padding: '64px', color: 'var(--text-muted)' }}>
      Войди в аккаунт чтобы открыть комнату
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px', paddingBottom: '48px', maxWidth: '720px', margin: '0 auto' }}>

      {/* Шапка */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button onClick={() => navigate(-1)} style={{
          background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '8px',
          color: 'var(--text-dim)', width: '36px', height: '36px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <IconBack size={20} />
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '18px', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
            {campaign?.name ?? 'Комната кампании'}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px', flexWrap: 'wrap' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{members.length} участников</p>
            {/* Список участников с именами */}
            {members.length > 0 && (
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {members.map(m => (
                  <span key={m.id} style={{
                    fontSize: '10px', padding: '1px 7px', borderRadius: '20px',
                    background: 'var(--surface-2)',
                    color: m.role === 'gm' ? '#c8a96e' : '#70a0e0',
                  }}>
                    {m.userId === user.id ? 'Я' : (m.displayName ?? 'Игрок')}
                    {m.role === 'gm' ? ' ⚔️' : ''}
                  </span>
                ))}
              </div>
            )}
            {myRole && (
              <span style={{
                fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px',
                background: isGm ? 'rgba(200,169,110,0.15)' : 'rgba(112,160,224,0.15)',
                color: isGm ? '#c8a96e' : '#70a0e0',
              }}>
                {isGm ? '⚔️ Мастер' : '🎲 Игрок'}
              </span>
            )}
          </div>
        </div>
        {isGm && (
          <button
            onClick={() => inviteCode ? setShowInvite(true) : handleGenerateInvite()}
            disabled={inviteLoading}
            style={{
              background: 'var(--surface-2)', border: '1px solid var(--border)',
              borderRadius: '10px', padding: '8px 14px', cursor: inviteLoading ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px',
              fontSize: '13px', fontWeight: 600, color: 'var(--text-dim)',
              fontFamily: 'DM Sans, sans-serif', opacity: inviteLoading ? 0.6 : 1,
            }}
            onMouseEnter={e => { if (!inviteLoading) { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border-accent)'; el.style.color = 'var(--accent)' } }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.color = 'var(--text-dim)' }}
          >
            <IconShare size={16} />
            {inviteLoading ? 'Создаю...' : inviteCode ? 'Инвайт' : 'Создать инвайт'}
          </button>
        )}
      </div>

      {/* Инвайт-панель */}
      {showInvite && inviteCode && (
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border-accent)',
          borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontFamily: 'Cinzel, serif', fontSize: '13px', fontWeight: 700, color: 'var(--accent)', margin: 0 }}>
              Пригласить игроков
            </p>
            <button onClick={() => setShowInvite(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '20px', lineHeight: 1 }}>×</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              flex: 1, background: 'var(--surface-2)', border: '1px solid var(--border)',
              borderRadius: '10px', padding: '14px 16px', textAlign: 'center',
            }}>
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '26px', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.2em' }}>
                {inviteCode}
              </span>
            </div>
            <button onClick={copyInvite} style={{
              padding: '14px 16px', borderRadius: '10px', border: 'none',
              background: copied ? '#70c070' : 'var(--accent)',
              color: copied ? '#fff' : 'var(--bg)', cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600,
              whiteSpace: 'nowrap', transition: 'background 0.2s',
            }}>
              {copied ? '✓ Скопировано' : '🔗 Ссылка'}
            </button>
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0, textAlign: 'center' }}>
            Игроки вводят код на странице /join или переходят по ссылке
          </p>
        </div>
      )}

      {loading && <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>Загрузка...</p>}

      {/* Персонажи */}
      {playerChars.length > 0 && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h2 style={{
            fontFamily: 'Cinzel, serif', fontSize: '13px', fontWeight: 700, color: 'var(--accent)',
            letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0,
            paddingBottom: '10px', borderBottom: '1px solid var(--border)',
          }}>
            Персонажи ({playerChars.length})
          </h2>
          {playerChars.map(c => (
            <PlayerCard key={c.id} character={c}
              ownerName={getOwnerName(c.ownerId)}
              isMe={c.ownerId === user.id}
              onClick={() => navigate(`/character/${c.id}`)}
            />
          ))}
        </section>
      )}

      {/* НПС */}
      {(isGm ? npcChars : visibleNpcs).length > 0 && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h2 style={{
            fontFamily: 'Cinzel, serif', fontSize: '13px', fontWeight: 700, color: 'var(--accent)',
            letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0,
            paddingBottom: '10px', borderBottom: '1px solid var(--border)',
          }}>
            НПС {isGm ? `(${npcChars.length})` : `(${visibleNpcs.length})`}
            {isGm && npcChars.length > visibleNpcs.length && (
              <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--text-muted)', marginLeft: '8px', textTransform: 'none' }}>
                {npcChars.length - visibleNpcs.length} скрыто
              </span>
            )}
          </h2>
          {(isGm ? npcChars : visibleNpcs).map(c => (
            <NpcCard key={c.id} character={c} isGm={isGm}
              onToggleVisibility={() => setNpcVisibility(c.id, !c.visibleToPlayers)}
              onEditFields={() => setEditingNpc(c)}
              onClick={() => navigate(`/character/${c.id}`)}
            />
          ))}
        </section>
      )}

      {!loading && playerChars.length === 0 && npcChars.length === 0 && (
        <div style={{ textAlign: 'center', padding: '64px 24px', color: 'var(--text-muted)' }}>
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>
            Комната пустая
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>
            {isGm ? 'Нажми «Создать инвайт» выше чтобы пригласить игроков' : 'Ожидай других игроков...'}
          </p>
        </div>
      )}

      {editingNpc && (
        <NpcFieldsModal character={editingNpc} onClose={() => setEditingNpc(null)}
          onSave={fields => setNpcVisibleFields(editingNpc.id, fields)}
        />
      )}
    </div>
  )
}
