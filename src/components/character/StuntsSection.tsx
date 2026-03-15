// src/components/character/StuntsSection.tsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Stunt } from '../../types'
import { Button } from '../ui'
import StuntCard from './StuntCard'
import StuntLibraryModal from './StuntLibraryModal'
import { generateId } from '../../utils'
import { SectionTitle } from './AspectsSection'
import type { LibraryStunt } from '../../data/stuntLibrary'
import { IconBook } from '../ui/FateIcons'

interface StuntsSectionProps {
  stunts: Stunt[]
  maxStunts: number
  systemId?: string
  onChange: (stunts: Stunt[]) => void
}

export default function StuntsSection({ stunts, maxStunts, systemId = 'fate-core', onChange }: StuntsSectionProps) {
  const { t } = useTranslation()
  const [showLibrary, setShowLibrary] = useState(false)

  const addStunt = () => {
    if (stunts.length >= maxStunts) return
    onChange([...stunts, { id: generateId(), name: '', description: '' }])
  }
  const addFromLibrary = (libraryStunt: LibraryStunt) => {
    if (stunts.length >= maxStunts) return
    onChange([...stunts, { id: generateId(), name: libraryStunt.name, description: libraryStunt.description }])
  }
  const removeStunt = (id: string) => onChange(stunts.filter(s => s.id !== id))
  const updateStunt = (updated: Stunt) => onChange(stunts.map(s => s.id === updated.id ? updated : s))
  const canAdd = stunts.length < maxStunts

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <SectionTitle>{t('stunts.label')}</SectionTitle>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{stunts.length} / {maxStunts}</span>
      </div>

      {stunts.map(stunt => (
        <StuntCard key={stunt.id} stunt={stunt} onRemove={() => removeStunt(stunt.id)} onChange={updateStunt} />
      ))}

      {canAdd && (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="secondary" onClick={addStunt} style={{ flex: 1 }}>
            {t('stunts_section.add_custom')}
          </Button>
          <button onClick={() => setShowLibrary(true)} style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 14px', borderRadius: '12px',
            background: 'var(--surface-2)', border: '1px solid var(--border)', cursor: 'pointer',
            color: 'var(--text-dim)', fontSize: '13px', fontWeight: 600, fontFamily: 'DM Sans, sans-serif',
            transition: 'all 0.15s', whiteSpace: 'nowrap',
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border-accent)'; el.style.color = 'var(--accent)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.color = 'var(--text-dim)' }}
          >
            <div style={{ width: 16, height: 16, display: 'flex', alignItems: 'center' }}><IconBook size={16} /></div>
            {t('stunts_section.add_library')}
          </button>
        </div>
      )}

      <StuntLibraryModal isOpen={showLibrary} onClose={() => setShowLibrary(false)} onSelect={addFromLibrary} systemId={systemId} />
    </div>
  )
}
