import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createEmptyCharacter, generateId, getSystemConfig } from '../utils'
import { useCharacterStore } from '../store/characterStore'
import type { Character, NpcTemplate } from '../types'
import { Input, Button } from '../components/ui'
import NpcTemplateSelector from '../components/npc/NpcTemplateSelector'
import SystemSelector from '../components/system/SystemSelector'
import AspectsSection from '../components/character/AspectsSection'
import SkillPyramid from '../components/character/SkillPyramid'
import ApproachesSection from '../components/character/ApproachesSection'
import StuntsSection from '../components/character/StuntsSection'
import StressSection from '../components/character/StressSection'
import RefreshSection from '../components/character/RefreshSection'
import NotesSection from '../components/character/NotesSection'

const Divider = () => <div style={{ width: '100%', height: '1px', background: 'var(--border)' }} />

export default function CreateNpcPage() {
  const navigate = useNavigate()
  const addCharacter = useCharacterStore(state => state.addCharacter)
  const [step, setStep] = useState<'template' | 'form'>('template')
  const [systemId, setSystemId] = useState('fate-core')
  const [character, setCharacter] = useState<Character>(() =>
    createEmptyCharacter(getSystemConfig('fate-core'), true)
  )

  const config = getSystemConfig(systemId)

  const update = (fields: Partial<Character>) => {
    setCharacter(prev => ({ ...prev, ...fields }))
  }

  const handleSystemChange = (newSystemId: string) => {
    setSystemId(newSystemId)
    const newConfig = getSystemConfig(newSystemId)
    setCharacter(createEmptyCharacter(newConfig, true))
  }

  const handleTemplateSelect = (template: NpcTemplate) => {
    setSystemId(template.character.systemId)
    setCharacter({
      ...template.character,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    setStep('form')
  }

  const handleSave = () => {
    if (!character.name.trim()) {
      alert('Введи имя НПС')
      return
    }
    addCharacter(character)
    navigate('/')
  }

  if (step === 'template') {
    return (
      <div className="flex flex-col gap-6">
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
          }}>Новый НПС</h1>
        </div>
        <NpcTemplateSelector
          onSelect={handleTemplateSelect}
          onSkip={() => setStep('form')}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex items-center gap-3">
        <button onClick={() => setStep('template')} className="text-gray-400 hover:text-gray-600 text-xl">←</button>
        <h1 className="text-xl font-bold text-gray-800">Новый НПС</h1>
      </div>

      <SystemSelector selected={systemId} onSelect={handleSystemChange} />

      <div style={{ width: '100%', height: '1px', background: 'var(--border)' }} />

      <Input
        label="Имя НПС"
        placeholder="Как зовут персонажа?"
        value={character.name}
        onChange={e => update({ name: e.target.value })}
      />

      <div style={{ width: '100%', height: '1px', background: 'var(--border)' }} />

      <AspectsSection
        slots={config.aspectSlots}
        aspects={character.aspects}
        onChange={aspects => update({ aspects })}
      />

      <div style={{ width: '100%', height: '1px', background: 'var(--border)' }} />

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

      <div style={{ width: '100%', height: '1px', background: 'var(--border)' }} />

      <StuntsSection
        stunts={character.stunts}
        maxStunts={config.maxStunts}
        onChange={stunts => update({ stunts })}
      />

      <div style={{ width: '100%', height: '1px', background: 'var(--border)' }} />

      <StressSection
        stressTracks={character.stressTracks}
        stressConfig={config.stressTracks}
        consequences={character.consequences}
        onStressChange={stressTracks => update({ stressTracks })}
        onConsequenceChange={consequences => update({ consequences })}
      />

      <div style={{ width: '100%', height: '1px', background: 'var(--border)' }} />

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

      <Button size="lg" onClick={handleSave} className="w-full mt-2">
        Сохранить НПС
      </Button>
    </div>
  )
}