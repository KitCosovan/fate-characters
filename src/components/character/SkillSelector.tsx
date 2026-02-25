import type { SkillDefinition } from '../../types'

interface SkillSelectorProps {
  skills: SkillDefinition[]
  value: string
  usedSkillIds: string[]
  onChange: (skillId: string) => void
}

export default function SkillSelector({ skills, value, usedSkillIds, onChange }: SkillSelectorProps) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="border border-gray-300 rounded-lg px-2 py-1.5 text-sm outline-none
        focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-white flex-1"
    >
      <option value="">— выбрать навык —</option>
      {skills.map(skill => (
        <option
          key={skill.id}
          value={skill.id}
          disabled={usedSkillIds.includes(skill.id) && skill.id !== value}
        >
          {skill.name}
        </option>
      ))}
    </select>
  )
}