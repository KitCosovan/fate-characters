import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createEmptyCharacter, getSystemConfig } from '../utils'
import { useCharacterStore } from '../store/characterStore'
import type { Character } from '../types'
import { Input, Button } from '../components/ui'
import SystemSelector from '../components/system/SystemSelector'
import AspectsSection from '../components/character/AspectsSection'
import SkillPyramid from '../components/character/SkillPyramid'
import ApproachesSection from '../components/character/ApproachesSection'
import StuntsSection from '../components/character/StuntsSection'
import StressSection from '../components/character/StressSection'
import RefreshSection from '../components/character/RefreshSection'

export default function CreateCharacterPage() {
  const navigate = useNavigate()
  const addCharacter = useCharacterStore(state => state.addCharacter)
  const [systemId, setSystemId] = useState('fate-core')
  const [character, setCharacter] = useState<Character>(() =>
    createEmptyCharacter(getSystemConfig('fate-core'))
  )

  const config = getSystemConfig(systemId)

  const update = (fields: Partial<Character>) => {
    setCharacter(prev => ({ ...prev, ...fields }))
  }

  const handleSystemChange = (newSystemId: string) => {
    setSystemId(newSystemId)
    const newConfig = getSystemConfig(newSystemId)
    setCharacter(createEmptyCharacter(newConfig))
  }

  const handleSave = () => {
    if (!character.name.trim()) {
      alert('Введи имя персонажа')
      return
    }
    addCharacter(character)
    navigate('/')
  }

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/')} className="text-gray-400 hover:text-gray-600 text-xl">←</button>
        <h1 className="text-xl font-bold text-gray-800">Новый персонаж</h1>
      </div>

      <SystemSelector selected={systemId} onSelect={handleSystemChange} />

      <div className="w-full h-px bg-gray-200" />

      <Input
        label="Имя персонажа"
        placeholder="Как зовут персонажа?"
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
        Сохранить персонажа
      </Button>
    </div>
  )
}