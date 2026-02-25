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
import ScarsSection from '../components/character/ScarsSection'
import EquipmentSection from '../components/character/EquipmentSection'

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
    setCharacter(createEmptyCharacter(getSystemConfig(newSystemId)))
  }

  const handleSave = () => {
    if (!character.name.trim()) {
      alert('Введи имя персонажа')
      return
    }
    addCharacter(character)
    navigate('/')
  }

  const Divider = () => <div className="w-full h-px bg-gray-200" />

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/')} className="text-gray-400 hover:text-gray-600 text-xl">←</button>
        <h1 className="text-xl font-bold text-gray-800">Новый персонаж</h1>
      </div>

      <SystemSelector selected={systemId} onSelect={handleSystemChange} />
      <Divider />

      <Input
        label="Имя персонажа"
        placeholder="Как зовут персонажа?"
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
          <div className="w-full h-px bg-gray-200" />
          <ScarsSection
            scars={character.scars}
            maxScars={config.maxScars ?? 3}
            onChange={scars => update({ scars })}
          />
        </>
      )}

      {config.hasEquipment && (
        <>
          <div className="w-full h-px bg-gray-200" />
          <EquipmentSection
            equipment={character.equipment}
            totalSlots={config.equipmentSlots ?? 6}
            onChange={equipment => update({ equipment })}
          />
        </>
      )}

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