// src/pages/EditNpcPage.tsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCharacterStore } from '../store/characterStore'
import { getSystemConfig } from '../utils'
import type { Character } from '../types'
import { Input, Button } from '../components/ui'
import AspectsSection from '../components/character/AspectsSection'
import SkillPyramid from '../components/character/SkillPyramid'
import ApproachesSection from '../components/character/ApproachesSection'
import StuntsSection from '../components/character/StuntsSection'
import StressSection from '../components/character/StressSection'
import RefreshSection from '../components/character/RefreshSection'
import ScarsSection from '../components/character/ScarsSection'
import EquipmentSection from '../components/character/EquipmentSection'
import NotesSection from '../components/character/NotesSection'

const Divider = () => <div style={{ width: '100%', height: '1px', background: 'var(--border)' }} />

export default function EditNpcPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { getById, updateCharacter } = useCharacterStore()
  const existing = getById(id ?? '')
  const [character, setCharacter] = useState<Character | null>(null)

  useEffect(() => {
    if (existing) setCharacter(existing)
    else navigate('/')
  }, [existing, navigate])

  if (!character) return null

  const config = getSystemConfig(character.systemId)

  const update = (fields: Partial<Character>) => {
    setCharacter(prev => prev ? { ...prev, ...fields } : prev)
  }

  const handleSave = () => {
    if (!character.name.trim()) { alert(t('edit_npc.no_name')); return }
    updateCharacter(character)
    navigate(`/character/${character.id}`)
  }

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/')} style={{
          background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '8px',
          color: 'var(--text-dim)', width: '32px', height: '32px', cursor: 'pointer',
          fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>←</button>
        <div>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '20px', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
            {t('edit_npc.title')}
          </h1>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{config.name}</p>
        </div>
      </div>

      <Input label={t('create_npc.name_label')} value={character.name} onChange={e => update({ name: e.target.value })} />
      <Divider />

      <AspectsSection slots={config.aspectSlots} aspects={character.aspects} onChange={aspects => update({ aspects })} />
      <Divider />

      {config.skillMode === 'approaches' ? (
        <ApproachesSection approaches={config.skills} selected={character.skills} onChange={skills => update({ skills })} />
      ) : (
        <SkillPyramid skills={config.skills} selected={character.skills} onChange={skills => update({ skills })} pyramidLevels={config.pyramidLevels} />
      )}
      <Divider />

      <StuntsSection stunts={character.stunts} maxStunts={config.maxStunts} onChange={stunts => update({ stunts })} />
      <Divider />

      <StressSection
        stressTracks={character.stressTracks} stressConfig={config.stressTracks} consequences={character.consequences}
        onStressChange={stressTracks => update({ stressTracks })} onConsequenceChange={consequences => update({ consequences })}
      />

      {config.hasScars && (<><Divider /><ScarsSection scars={character.scars} maxScars={config.maxScars ?? 3} onChange={scars => update({ scars })} /></>)}
      {config.hasEquipment && (<><Divider /><EquipmentSection equipment={character.equipment} totalSlots={config.equipmentSlots ?? 6} onChange={equipment => update({ equipment })} /></>)}

      <Divider />
      <RefreshSection refresh={character.refresh} currentFatePoints={character.currentFatePoints} onRefreshChange={refresh => update({ refresh })} onFatePointsChange={currentFatePoints => update({ currentFatePoints })} />
      <Divider />
      <NotesSection notes={character.notes ?? ''} onChange={notes => update({ notes })} />

      <Button size="lg" onClick={handleSave} className="w-full mt-2">
        {t('edit_npc.save')}
      </Button>
    </div>
  )
}
