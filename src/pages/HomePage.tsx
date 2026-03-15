// src/pages/HomePage.tsx
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCharacterStore } from '../store/characterStore'
import { Button, Card, Badge, Modal } from '../components/ui'
import { exportAllCharacters, importCharacterFromFile, importAllFromFile, decodeCharacterFromUrl } from '../utils'
import { useToast } from '../hooks/useToast'
import { generateId } from '../utils'
import type { Character } from '../types'
import SearchBar from '../components/ui/SearchBar'
import FilterPanel from '../components/ui/FilterPanel'
import EmptyState from '../components/ui/EmptyState'
import ToastNotifications from '../components/ui/ToastNotifications'
import { IconImport, IconSave, IconCharacter, IconNpc, IconMasks } from '../components/ui/FateIcons'
import CampaignsTab from '../components/campaigns/CampaignsTab'

type Tab = 'characters' | 'npcs' | 'campaigns'

export default function HomePage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { characters, addCharacter } = useCharacterStore()

  const [tab, setTab] = useState<Tab>('characters')
  const [showImportModal, setShowImportModal] = useState(false)
  const [pendingImport, setPendingImport] = useState<Character | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toasts, showToast, removeToast } = useToast()
  const [search, setSearch] = useState('')
  const [systemFilter, setSystemFilter] = useState<string | null>(null)

  useEffect(() => {
    decodeCharacterFromUrl().then(shared => {
      if (shared) {
        setPendingImport(shared)
        setShowImportModal(true)
        window.history.replaceState(null, '', window.location.pathname)
      }
    })
  }, [])

  const TABS = [
    { id: 'characters' as Tab, label: t('tabs.characters'), icon: <IconCharacter size={16} /> },
    { id: 'npcs' as Tab,       label: t('tabs.npcs'),       icon: <IconNpc size={16} /> },
    { id: 'campaigns' as Tab,  label: t('tabs.campaigns'),  icon: <IconMasks size={16} /> },
  ]

  const SYSTEM_LABELS: Record<string, string> = {
    'fate-core':        t('systems.fate-core'),
    'fate-accelerated': t('systems.fate-accelerated'),
    'book-of-ashes':    t('systems.book-of-ashes'),
  }

  const filtered = characters.filter(c => {
    if (tab === 'campaigns') return false
    if (tab === 'npcs' ? !c.isNpc : c.isNpc) return false
    if (systemFilter && c.systemId !== systemFilter) return false
    if (search) {
      const q = search.toLowerCase()
      if (!c.name.toLowerCase().includes(q) && !c.aspects.some(a => a.value.toLowerCase().includes(q))) return false
    }
    return true
  })

  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      try {
        const character = await importCharacterFromFile(file)
        setPendingImport(character)
        setShowImportModal(true)
      } catch {
        const chars = await importAllFromFile(file)
        chars.forEach(c => addCharacter({ ...c, id: generateId() }))
        showToast(t('character.imported', { name: `${chars.length}` }))
      }
    } catch {
      showToast(t('character.import_error'), 'error')
    }
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const confirmImport = () => {
    if (!pendingImport) return
    addCharacter({ ...pendingImport, id: generateId() })
    setPendingImport(null)
    setShowImportModal(false)
    showToast(t('character.imported', { name: pendingImport.name || t('character.unnamed') }))
  }

  const tabTitle = tab === 'npcs'
    ? t('home.title_npcs')
    : tab === 'campaigns'
      ? t('home.title_campaigns')
      : t('home.title_characters')

  return (
    <div className="fade-up">
      {/* Шапка */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '20px', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
            {tabTitle}
          </h1>
          {tab !== 'campaigns' && (
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
              {filtered.length === 1
                ? t('home.count_one', { count: filtered.length })
                : t('home.count_many', { count: filtered.length })}
            </p>
          )}
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input ref={fileInputRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleFileImport} />
          {tab !== 'campaigns' && (
            <>
              <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>
                <IconImport size={18} />
              </Button>
              {characters.length > 0 && (
                <Button variant="secondary" size="sm" onClick={() => { exportAllCharacters(characters); showToast(t('character.backup_saved')) }}>
                  <IconSave size={18} />
                </Button>
              )}
              <Button size="sm" onClick={() => navigate(tab === 'npcs' ? '/npc/create' : '/character/create')}>
                {t('home.create')}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Вкладки */}
      <div style={{
        display: 'flex', gap: '4px', background: 'var(--surface)',
        borderRadius: '12px', padding: '4px', marginBottom: '12px', border: '1px solid var(--border)',
      }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: '9px', borderRadius: '9px', border: 'none',
            fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            transition: 'all 0.15s ease', fontFamily: 'DM Sans, sans-serif',
            background: tab === t.id ? 'var(--surface-3)' : 'transparent',
            color: tab === t.id ? 'var(--text)' : 'var(--text-muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
          }}>
            <div style={{ width: 16, height: 16, display: 'flex', alignItems: 'center', flexShrink: 0 }}>{t.icon}</div>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'campaigns' && <CampaignsTab />}

      {tab !== 'campaigns' && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            <SearchBar value={search} onChange={setSearch} placeholder={t('home.search_placeholder')} />
            <FilterPanel selected={systemFilter} onChange={setSystemFilter} />
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              icon={tab === 'npcs' ? <IconNpc size={64} /> : <IconCharacter size={64} />}
              title={search
                ? t('home.no_results')
                : tab === 'npcs' ? t('home.empty_npcs') : t('home.empty_characters')}
              description={search ? t('home.no_results_hint', { query: search }) : t('home.empty_hint')}
              action={!search ? { label: t('home.create'), onClick: () => navigate(tab === 'npcs' ? '/npc/create' : '/character/create') } : undefined}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filtered.map((c, i) => (
                <div key={c.id} className="fade-up" style={{ animationDelay: `${i * 0.04}s` }}>
                  <Card onClick={() => navigate(`/character/${c.id}`)}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: 'Cinzel, serif', fontSize: '16px', fontWeight: 700, color: 'var(--text)', margin: '0 0 4px' }}>
                          {c.name || t('character.unnamed')}
                        </p>
                        <p style={{ fontSize: '13px', color: 'var(--text-dim)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {c.aspects.find(a => a.slotId === 'high-concept' || a.slotId === 'concept')?.value || t('character.concept_empty')}
                        </p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', flexShrink: 0 }}>
                        <Badge variant="accent">{SYSTEM_LABELS[c.systemId] ?? c.systemId}</Badge>
                        <Badge variant={c.isNpc ? 'dim' : 'green'}>
                          {c.isNpc ? t('systems.npc_badge') : t('systems.player_badge')}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <Modal
        isOpen={showImportModal}
        onClose={() => { setShowImportModal(false); setPendingImport(null) }}
        title={t('character.import')}
        confirmLabel={t('character.import_btn')}
        onConfirm={confirmImport}
      >
        {pendingImport && (
          <div>
            <p style={{ margin: '0 0 4px' }}>
              {t('character.import_body', { name: pendingImport.name || t('character.unnamed') })}
            </p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
              {SYSTEM_LABELS[pendingImport.systemId] ?? pendingImport.systemId}
            </p>
          </div>
        )}
      </Modal>

      <ToastNotifications toasts={toasts} onRemove={removeToast} />
    </div>
  )
}
