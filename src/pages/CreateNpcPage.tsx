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
import ScarsSection from '../components/character/ScarsSection'
import EquipmentSection from '../components/character/EquipmentSection'
import SaveTemplateModal from '../components/npc/SaveTemplateModal'
import { saveCustomTemplate } from '../data/customTemplates'
import { IconSave } from '../components/ui/FateIcons'
import { recalculateStressTracks } from '../utils/stressUtils'

const Divider = () => <div style={{ width: '100%', height: '1px', background: 'var(--border)' }} />

export default function CreateNpcPage() {
  const navigate = useNavigate()
  const addCharacter = useCharacterStore(state => state.addCharacter)
  const [step, setStep] = useState<'template' | 'form'>('template')
  const [systemId, setSystemId] = useState('fate-core')
  const [character, setCharacter] = useState<Character>(() =>
    createEmptyCharacter(getSystemConfig('fate-core'), true)
  )
  const [showSaveTemplate, setShowSaveTemplate] = useState(false)

  const config = getSystemConfig(systemId)

  const update = (fields: Partial<Character>) => {
    setCharacter(prev => {
      const updated = { ...prev, ...fields }
      if (fields.skills) {
        updated.stressTracks = recalculateStressTracks(updated.stressTracks, fields.skills)
      }
      return updated
    })
  }

  const handleSystemChange = (newSystemId: string) => {
    setSystemId(newSystemId)
    setCharacter(createEmptyCharacter(getSystemConfig(newSystemId), true))
  }

  const handleTemplateSelect = (template: NpcTemplate) => {
    const newConfig = getSystemConfig(systemId)
    const base = createEmptyCharacter(newConfig, true)

    // Адаптируем аспекты под слоты текущей системы
    const aspects = newConfig.aspectSlots.map((slot, i) => ({
      slotId: slot.id,
      value: template.character.aspects[i]?.value ?? '',
    }))

    // Оставляем только навыки доступные в текущей системе
    const validSkillIds = new Set(newConfig.skills.map(s => s.id))
    const skills = template.character.skills.filter(s => validSkillIds.has(s.skillId))

    setCharacter({
      ...base,
      aspects,
      skills: newConfig.skillMode === 'approaches' ? [] : skills,
      stunts: template.character.stunts,
      refresh: template.character.refresh,
      currentFatePoints: template.character.refresh,
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

  const handleSaveAsTemplate = (name: string, iconId: string) => {
    const highConcept = character.aspects.find(
      a => a.slotId === 'high-concept' || a.slotId === 'concept'
    )?.value || 'Пользовательский шаблон'

    const characterData = Object.fromEntries(
      Object.entries(character).filter(([k]) => !['id', 'createdAt', 'updatedAt'].includes(k))
    ) as typeof character

    saveCustomTemplate({
      id: `custom-${generateId()}`,
      name,
      description: highConcept,
      iconId,
      isCustom: true,
      character: {
        ...characterData,
        name: '',
        currentFatePoints: character.refresh,
      },
    })
    setShowSaveTemplate(false)
  }

  // ШАГ 1 — выбор системы и шаблона
  if (step === 'template') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'var(--surface-2)', border: '1px solid var(--border)',
              borderRadius: '8px', color: 'var(--text-dim)', width: '32px', height: '32px',
              cursor: 'pointer', fontSize: '16px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}
          >←</button>
          <h1 style={{
            fontFamily: 'Cinzel, serif', fontSize: '20px',
            fontWeight: 700, color: 'var(--text)', margin: 0,
          }}>Новый НПС</h1>
        </div>

        <SystemSelector selected={systemId} onSelect={handleSystemChange} />

        <Divider />

        <NpcTemplateSelector
          onSelect={handleTemplateSelect}
          onSkip={() => setStep('form')}
        />
      </div>
    )
  }

  // ШАГ 2 — форма создания
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '32px' }}>

      {/* Шапка */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={() => setStep('template')}
          style={{
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: '8px', color: 'var(--text-dim)', width: '32px', height: '32px',
            cursor: 'pointer', fontSize: '16px', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}
        >←</button>
        <div>
          <h1 style={{
            fontFamily: 'Cinzel, serif', fontSize: '20px',
            fontWeight: 700, color: 'var(--text)', margin: 0,
          }}>Новый НПС</h1>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
            {config.name}
          </p>
        </div>
      </div>

      <Input
        label="Имя НПС"
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
        />
      )}
      <Divider />

      <StuntsSection
        stunts={character.stunts}
        maxStunts={config.maxStunts}
        systemId={systemId}
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

      {/* Кнопка "Сохранить как шаблон" */}
      <button
        onClick={() => setShowSaveTemplate(true)}
        style={{
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: '12px', padding: '11px 16px', cursor: 'pointer',
          color: 'var(--text-dim)', fontSize: '13px', fontWeight: 600,
          fontFamily: 'DM Sans, sans-serif', width: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          transition: 'all 0.15s',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = 'var(--border-accent)'
          el.style.color = 'var(--accent)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = 'var(--border)'
          el.style.color = 'var(--text-dim)'
        }}
      >
        <div style={{ width: 16, height: 16, display: 'flex', alignItems: 'center' }}>
          <IconSave size={16} />
        </div>
        Сохранить как шаблон
      </button>

      <Button size="lg" onClick={handleSave}>
        Сохранить НПС
      </Button>

      <SaveTemplateModal
        isOpen={showSaveTemplate}
        onClose={() => setShowSaveTemplate(false)}
        onSave={handleSaveAsTemplate}
        defaultName={character.name}
      />
    </div>
  )
}
