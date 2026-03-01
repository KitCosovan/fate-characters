import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
import SkillAdvancement from '../components/character/SkillAdvancement'

const Divider = () => <div style={{ width: '100%', height: '1px', background: 'var(--border)' }} />

export default function EditCharacterPage() {
  const { id } = useParams()
  const navigate = useNavigate()
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
    if (!character.name.trim()) {
      alert('Введи имя персонажа')
      return
    }
    updateCharacter(character)
    navigate(`/character/${character.id}`)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={() => navigate(`/character/${character.id}`)}
          style={{
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            color: 'var(--text-dim)',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >←</button>
        <div>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '20px', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
            Редактировать
          </h1>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{config.name}</p>
        </div>
      </div>

      <Input
        label="Имя персонажа"
        value={character.name}
        onChange={e => update({ name: e.target.value })}
      />
      <Divider />

      <AspectsSection
        slots={config.aspectSlots}
        aspects={character.aspects}
        onChange={aspects => update({ aspects })}
      />
      <Divider />

      {config.skillMode === 'approaches' ? (
        <ApproachesSection
          approaches={config.skills}
          selected={character.skills}
          onChange={skills => update({ skills })}
        />
      ) : (
        <SkillPyramid
          skills={config.skills}
          selected={character.skills}
          onChange={skills => update({ skills })}
          pyramidLevels={config.pyramidLevels}
        />
      )}

      <Divider />
      <SkillAdvancement
        skills={config.skills}
        selected={character.skills}
        onChange={skills => update({ skills })}
      />

      <Divider />

      <StuntsSection
        stunts={character.stunts}
        maxStunts={config.maxStunts}
        onChange={stunts => update({ stunts })}
      />
      <Divider />

      <StressSection
        stressTracks={character.stressTracks}
        stressConfig={config.stressTracks}
        consequences={character.consequences}
        onStressChange={stressTracks => update({ stressTracks })}
        onConsequenceChange={consequences => update({ consequences })}
      />
      <Divider />

      {config.hasScars && (
        <>
          <ScarsSection
            scars={character.scars ?? []}
            maxScars={config.maxScars ?? 3}
            onChange={scars => update({ scars })}
          />
          <Divider />
        </>
      )}

      {config.hasEquipment && (
        <>
          <EquipmentSection
            equipment={character.equipment ?? []}
            totalSlots={config.equipmentSlots ?? 6}
            onChange={equipment => update({ equipment })}
          />
          <Divider />
        </>
      )}

      <RefreshSection
        refresh={character.refresh}
        currentFatePoints={character.currentFatePoints}
        onRefreshChange={refresh => update({ refresh })}
        onFatePointsChange={currentFatePoints => update({ currentFatePoints })}
      />
      <Divider />

      <NotesSection
        notes={character.notes ?? ''}
        onChange={notes => update({ notes })}
      />

      <Button size="lg" onClick={handleSave}>
        Сохранить изменения
      </Button>
    </div>
  )
}