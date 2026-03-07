// src/pages/CampaignRoomPage.tsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCampaignRoomStore } from '../store/campaignRoomStore'
import { useCampaignStore } from '../store/campaignStore'
import { useAuthStore } from '../store/authStore'
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

// ── Мини-карточка персонажа игрока ──────────────────────────────────
function PlayerCard({ character, ownerName, isMe, onClick }: {
  character: Character
  ownerName: string
  isMe: boolean
  onClick: () => void
}) {
  const concept = character.aspects.find(a =>
    a.slotId === 'high-concept' || a.slotId === 'concept'
  )?.value

  const totalStress = character.stressTracks.reduce((sum, t) => sum + t.boxes.length, 0)
  const usedStress  = character.stressTracks.reduce((sum, t) => sum + t.boxes.filter(b => b.checked).length, 0)

  return (
    <div
      onClick={onClick}
      style={{
        background: isMe ? 'var(--accent-glow)' : 'var(--surface)',
        border: `1px solid ${isMe ? 'var(--border-accent)' : 'var(--border)'}`,
        borderRadius: '16px', padding: '16px', cursor: 'pointer',
        transition: 'all 0.15s', display: 'flex', flexDirection: 'column', gap: '10px',
      }}
      onMouseEnter={e => { if (!isMe) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-accent)' }}
      onMouseLeave={e => { if (!isMe) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
            <div style={{ width: 16, height: 16, flexShrink: 0 }}><IconCharacter size={16} /></div>
            <p style={{ fontFamily: 'Cinzel, serif', fontSize: '15px', fontWeight: 700, color: 'var(--text)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {character.name || 'Без имени'}
            </p>
          </div>
          {concept && (
            <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {concept}
            </p>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
          {isMe && (
            <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px', background: 'var(--accent)', color: 'var(--bg)' }}>
              Мой
            </span>
          )}
          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{ownerName}</span>
        </div>
      </div>

      {/* Стресс */}
      {totalStress > 0 && (
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {character.stressTracks.map(track =>
            track.boxes.map((box, i) => (
              <div key={`${track.trackId}-${i}`} style={{
                width: 14, height: 14, borderRadius: '3px',
                background: box.checked ? 'var(--accent)' : 'transparent',
                border: `1px solid ${box.checked ? 'var(--accent)' : 'var(--border)'}`,
                transition: 'all 0.15s',
              }} />
            ))
          )}
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginLeft: '4px', alignSelf: 'center' }}>
            {usedStress}/{totalStress}
          </span>
        </div>
      )}

      {/* Последствия */}
      {character.consequences.some(c => c.value) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {character.consequences.filter(c => c.value).map((c, i) => (
            <p key={i} style={{ fontSize: '11px', color: '#e07070', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              ⚡ {c.value}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

// ── НПС-карточка с контролем видимости (ГМ) или ограниченным видом ──
function NpcCard({ character, isGm, onToggleVisibility, onEditFields, onClick }: {
  character: Character
  isGm: boolean
  onToggleVisibility: () => void
  onEditFields: () => void
  onClick: () => void
}) {
  const concept = character.aspects.find(a =>
    a.slotId === 'high-concept' || a.slotId === 'concept'
  )?.value

  const isVisible = character.visibleToPlayers !== false

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: '16px', padding: '16px',
      opacity: isGm ? 1 : isVisible ? 1 : 0.5,
      transition: 'all 0.15s',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        <div style={{ width: 18, height: 18, flexShrink: 0, marginTop: '2px' }}><IconNpc size={18} /></div>
        <div style={{ flex: 1, minWidth: 0, cursor: 'pointer' }} onClick={onClick}>
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: '14px', fontWeight: 700, color: 'var(--text)', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {character.name || 'Без имени'}
          </p>
          {concept && (
            <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {concept}
            </p>
          )}
        </div>

        {/* ГМ-контроли */}
        {isGm && (
          <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
            {/* Видимые поля */}
            <button
              onClick={onEditFields}
              title="Настроить что видят игроки"
              style={{
                background: 'var(--surface-2)', border: '1px solid var(--border)',
                borderRadius: '8px', padding: '4px 8px', cursor: 'pointer',
                fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              Поля
            </button>
            {/* Тоггл видимости */}
            <button
              onClick={onToggleVisibility}
              title={isVisible ? 'Скрыть от игроков' : 'Показать игрокам'}
              style={{
                padding: '4px 8px', borderRadius: '8px', border: 'none',
                cursor: 'pointer', fontSize: '11px', fontWeight: 600,
                fontFamily: 'DM Sans, sans-serif', transition: 'all 0.15s',
                background: isVisible ? 'rgba(112,192,112,0.15)' : 'var(--surface-2)',
                color: isVisible ? '#70c070' : 'var(--text-muted)',
              }}
            >
              {isVisible ? '👁 Виден' : '🙈 Скрыт'}
            </button>
          </div>
        )}
      </div>

      {/* Что видит игрок */}
      {!isGm && isVisible && character.visibleFields && character.visibleFields.length > 0 && (
        <div style={{ marginTop: '8px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {character.visibleFields.map(f => (
            <span key={f} style={{
              fontSize: '10px', padding: '2px 7px', borderRadius: '20px',
              background: 'var(--surface-2)', color: 'var(--text-muted)',
            }}>
              {NPC_FIELD_LABELS[f]}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Модалка настройки видимых полей НПС ─────────────────────────────
function NpcFieldsModal({ character, onClose, onSave }: {
  character: Character
  onClose: () => void
  onSave: (fields: NpcVisibleField[]) => void
}) {
  const [selected, setSelected] = useState<NpcVisibleField[]>(
    character.visibleFields?.length ? character.visibleFields : ALL_NPC_FIELDS
  )

  const toggle = (field: NpcVisibleField) => {
    setSelected(prev =>
      prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    )
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50,
      background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px',
    }} onClick={onClose}>
      <div style={{
        background: 'var(--surface)', borderRadius: '20px', padding: '24px',
        maxWidth: '360px', width: '100%',
        border: '1px solid var(--border)',
      }} onClick={e => e.stopPropagation()}>
        <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '16px', fontWeight: 700, color: 'var(--text)', margin: '0 0 6px' }}>
          Видимость для игроков
        </h3>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 16px' }}>
          {character.name} — выбери что видят игроки
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          {/* Всё разом */}
          <button
            onClick={() => setSelected(selected.length === ALL_NPC_FIELDS.length ? [] : [...ALL_NPC_FIELDS])}
            style={{
              padding: '8px 12px', borderRadius: '10px', border: 'none',
              background: selected.length === ALL_NPC_FIELDS.length ? 'var(--accent-glow)' : 'var(--surface-2)',
              outline: selected.length === ALL_NPC_FIELDS.length ? '1px solid var(--border-accent)' : '1px solid var(--border)',
              cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: '13px',
              fontWeight: 600, color: selected.length === ALL_NPC_FIELDS.length ? 'var(--accent)' : 'var(--text-muted)',
              textAlign: 'left',
            }}
          >
            Все поля
          </button>

          {ALL_NPC_FIELDS.map(field => (
            <button key={field} onClick={() => toggle(field)} style={{
              padding: '8px 12px', borderRadius: '10px', border: 'none',
              background: selected.includes(field) ? 'var(--accent-glow)' : 'var(--surface-2)',
              outline: selected.includes(field) ? '1px solid var(--border-accent)' : '1px solid var(--border)',
              cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: '13px',
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
          }}>
            Отмена
          </button>
          <button onClick={() => { onSave(selected); onClose() }} style={{
            flex: 1, padding: '10px', borderRadius: '10px', border: 'none',
            background: 'var(--accent)', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px', fontWeight: 600, color: 'var(--bg)',
          }}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Главная страница комнаты ─────────────────────────────────────────
export default function CampaignRoomPage() {
  const { id: campaignId } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const user = useAuthStore(s => s.user)
  const { getById } = useCampaignStore()

  const {
    members, characters, myRole, loading, error,
    joinRoom, leaveRoom,
    setNpcVisibility, setNpcVisibleFields,
    generateInviteCode,
  } = useCampaignRoomStore()

  const [inviteCode, setInviteCode] = useState<string | null>(null)
  const [showInvite, setShowInvite] = useState(false)
  const [editingNpc, setEditingNpc] = useState<Character | null>(null)
  const [copiedInvite, setCopiedInvite] = useState(false)

  const campaign = campaignId ? getById(campaignId) : undefined
  const isGm = myRole === 'gm'

  useEffect(() => {
    if (!campaignId || !user) return
    joinRoom(campaignId, user.id)
    return () => leaveRoom()
  }, [campaignId, user?.id])

  // Подтянуть инвайт-код если он есть
  useEffect(() => {
    if (campaign?.inviteCode) setInviteCode(campaign.inviteCode)
  }, [campaign?.inviteCode])

  const handleGenerateInvite = async () => {
    if (!campaignId) return
    const code = await generateInviteCode(campaignId)
    if (code) {
      setInviteCode(code)
      setShowInvite(true)
    }
  }

  const inviteUrl = inviteCode
    ? `${window.location.origin}${window.location.pathname}#/join/${inviteCode}`
    : null

  const copyInvite = async () => {
    if (!inviteUrl) return
    await navigator.clipboard.writeText(inviteUrl)
    setCopiedInvite(true)
    setTimeout(() => setCopiedInvite(false), 2000)
  }

  // Разделить персонажей
  const playerChars  = characters.filter(c => !c.isNpc)
  const npcChars     = characters.filter(c => c.isNpc)
  const visibleNpcs  = isGm ? npcChars : npcChars.filter(c => c.visibleToPlayers !== false)

  // Найти имя владельца
  const getOwnerName = (ownerId?: string) => {
    if (!ownerId) return '—'
    if (ownerId === user?.id) return 'Я'
    const member = members.find(m => m.userId === ownerId)
    return member?.displayName ?? 'Игрок'
  }

  if (!user) return (
    <div style={{ textAlign: 'center', padding: '64px', color: 'var(--text-muted)' }}>
      Войди в аккаунт чтобы открыть комнату кампании
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '32px' }}>

      {/* Шапка */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button onClick={() => navigate('/')} style={{
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: '8px', color: 'var(--text-dim)', width: '32px', height: '32px',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <IconBack size={20} />
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '18px', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
            {campaign?.name ?? 'Комната кампании'}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
              {members.length} участников
            </p>
            <span style={{
              fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px',
              background: isGm ? 'rgba(200,169,110,0.15)' : 'rgba(112,160,224,0.15)',
              color: isGm ? '#c8a96e' : '#70a0e0',
            }}>
              {isGm ? '⚔️ Мастер' : '🎲 Игрок'}
            </span>
          </div>
        </div>

        {/* ГМ: кнопка инвайта */}
        {isGm && (
          <button
            onClick={() => inviteCode ? setShowInvite(true) : handleGenerateInvite()}
            style={{
              background: 'var(--surface-2)', border: '1px solid var(--border)',
              borderRadius: '10px', padding: '8px 12px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px',
              fontSize: '12px', fontWeight: 600, color: 'var(--text-dim)',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            <IconShare size={16} /> Инвайт
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
            <button onClick={() => setShowInvite(false)} style={{
              background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '18px',
            }}>×</button>
          </div>

          {/* Код */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              flex: 1, background: 'var(--surface-2)', border: '1px solid var(--border)',
              borderRadius: '10px', padding: '12px 16px', textAlign: 'center',
            }}>
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '24px', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.15em' }}>
                {inviteCode}
              </span>
            </div>
            <button onClick={copyInvite} style={{
              padding: '12px 16px', borderRadius: '10px', border: 'none',
              background: copiedInvite ? '#70c070' : 'var(--accent)',
              color: copiedInvite ? '#fff' : 'var(--bg)',
              cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
              fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap', transition: 'background 0.2s',
            }}>
              {copiedInvite ? '✓ Скопировано' : '🔗 Ссылка'}
            </button>
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0, textAlign: 'center' }}>
            Игроки вводят код на вкладке «Кампании» или переходят по ссылке
          </p>
        </div>
      )}

      {loading && (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>Загрузка...</p>
      )}

      {error && (
        <p style={{ textAlign: 'center', color: '#e07070', fontSize: '14px' }}>{error}</p>
      )}

      {/* Персонажи игроков */}
      {playerChars.length > 0 && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h2 style={{
            fontFamily: 'Cinzel, serif', fontSize: '13px', fontWeight: 700,
            color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase',
            margin: 0, paddingBottom: '10px', borderBottom: '1px solid var(--border)',
          }}>
            Персонажи ({playerChars.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {playerChars.map(c => (
              <PlayerCard
                key={c.id}
                character={c}
                ownerName={getOwnerName(c.ownerId)}
                isMe={c.ownerId === user.id}
                onClick={() => navigate(`/character/${c.id}`)}
              />
            ))}
          </div>
        </section>
      )}

      {/* НПС */}
      {(isGm ? npcChars : visibleNpcs).length > 0 && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h2 style={{
            fontFamily: 'Cinzel, serif', fontSize: '13px', fontWeight: 700,
            color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase',
            margin: 0, paddingBottom: '10px', borderBottom: '1px solid var(--border)',
          }}>
            НПС {isGm ? `(${npcChars.length})` : `(${visibleNpcs.length})`}
            {isGm && npcChars.length > visibleNpcs.length && (
              <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--text-muted)', marginLeft: '8px', textTransform: 'none' }}>
                {npcChars.length - visibleNpcs.length} скрыто от игроков
              </span>
            )}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(isGm ? npcChars : visibleNpcs).map(c => (
              <NpcCard
                key={c.id}
                character={c}
                isGm={isGm}
                onToggleVisibility={() => setNpcVisibility(c.id, !c.visibleToPlayers)}
                onEditFields={() => setEditingNpc(c)}
                onClick={() => navigate(`/character/${c.id}`)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Пусто */}
      {!loading && playerChars.length === 0 && npcChars.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--text-muted)' }}>
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>
            Комната пустая
          </p>
          <p style={{ fontSize: '13px', margin: 0 }}>
            {isGm
              ? 'Пригласи игроков и привяжи персонажей к кампании'
              : 'Ожидай других игроков...'}
          </p>
        </div>
      )}

      {/* Модалка настройки полей НПС */}
      {editingNpc && (
        <NpcFieldsModal
          character={editingNpc}
          onClose={() => setEditingNpc(null)}
          onSave={fields => setNpcVisibleFields(editingNpc.id, fields)}
        />
      )}
    </div>
  )
}
