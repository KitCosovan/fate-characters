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
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
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
        <h1 style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '20px',
          fontWeight: 700,
          color: 'var(--text)',
          margin: 0,
        }}>Редактировать</h1>
      </div>

      <Input
        label="Имя персонажа"
        value={character.name}
        onChange={e => update({ name: e.target.value })}
      />

      <div className="w-full h-px bg-gray-200" />

      <AspectsSection
        slots={config.aspectSlots}
        aspects={character.aspects}
        onChange={aspects => update({ aspects })}
      />

      <div className="w-full h-px bg-gray-200" />

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
        />
      )}

      <div className="w-full h-px bg-gray-200" />

      <StuntsSection
        stunts={character.stunts}
        maxStunts={config.maxStunts}
        onChange={stunts => update({ stunts })}
      />

      <div className="w-full h-px bg-gray-200" />

      <StressSection
        stressTracks={character.stressTracks}
        stressConfig={config.stressTracks}
        consequences={character.consequences}
        onStressChange={stressTracks => update({ stressTracks })}
        onConsequenceChange={consequences => update({ consequences })}
      />

      <div className="w-full h-px bg-gray-200" />

      <RefreshSection
        refresh={character.refresh}
        currentFatePoints={character.currentFatePoints}
        onRefreshChange={refresh => update({ refresh })}
        onFatePointsChange={currentFatePoints => update({ currentFatePoints })}
      />

      <Button size="lg" onClick={handleSave} className="w-full mt-2">
        Сохранить изменения
      </Button>
    </div>
  )
}