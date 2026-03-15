// src/pages/ViewCharacterPage.tsx
import { useEffect, useState } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '../lib/supabase'
import type { Character } from '../types'
import CharacterSheet from '../components/character/CharacterSheet'
import { IconNotFound, IconBack } from '../components/ui/FateIcons'

async function loadCharacter(shortId?: string, base64?: string): Promise<Character | null> {
  if (shortId) {
    const { data, error } = await supabase
      .from('shared_characters').select('data').eq('short_id', shortId).single()
    if (error || !data) return null
    return data.data as Character
  }
  if (base64) {
    try { return JSON.parse(atob(base64)) as Character } catch { return null }
  }
  return null
}

export default function ViewCharacterPage() {
  const { shortId } = useParams<{ shortId?: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const base64 = searchParams.get('shared') ?? undefined

  const [character, setCharacter] = useState<Character | null>(null)
  const [loading, setLoading]     = useState(true)
  const [notFound, setNotFound]   = useState(false)

  useEffect(() => {
    loadCharacter(shortId, base64).then(char => {
      if (char) setCharacter(char)
      else setNotFound(true)
      setLoading(false)
    })
  }, [shortId, base64])

  const SYSTEM_LABELS: Record<string, string> = {
    'fate-core':        t('systems.fate-core'),
    'fate-accelerated': t('systems.fate-accelerated'),
    'book-of-ashes':    t('systems.book-of-ashes'),
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
      {t('view.loading')}
    </div>
  )

  if (notFound || !character) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
      <IconNotFound size={64} />
      <p style={{ fontSize: '16px', color: 'var(--text-dim)', margin: 0 }}>{t('view.not_found')}</p>
      <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>{t('view.not_found_hint')}</p>
    </div>
  )

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '24px', paddingBottom: '48px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={() => navigate(-1)} style={{
          background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '8px',
          color: 'var(--text-dim)', width: '32px', height: '32px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}><IconBack size={20} /></button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '20px', fontWeight: 700, color: 'var(--text)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {character.name || t('character.unnamed')}
          </h1>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
            {character.isNpc ? t('character.npc') : t('character.player')} · {SYSTEM_LABELS[character.systemId] ?? character.systemId}
          </p>
        </div>
        <span style={{
          fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '20px',
          background: 'var(--surface-2)', color: 'var(--text-muted)',
          border: '1px solid var(--border)', whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          👁 {t('view.view_only')}
        </span>
      </div>
      <CharacterSheet character={character} />
    </div>
  )
}
