import type { Character, SystemConfig } from '../types'

export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
  warnings: ValidationError[]
}

export const validateCharacter = (character: Character, config: SystemConfig): ValidationResult => {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  // Имя
  if (!character.name.trim()) {
    errors.push({ field: 'name', message: 'Имя персонажа не заполнено' })
  }

  // Обязательные аспекты
  config.aspectSlots
    .filter(slot => slot.required)
    .forEach(slot => {
      const aspect = character.aspects.find(a => a.slotId === slot.id)
      if (!aspect?.value?.trim()) {
        errors.push({ field: `aspect-${slot.id}`, message: `Аспект «${slot.label}» обязателен` })
      }
    })

  // Пирамида навыков
  if (config.skillMode === 'pyramid' && config.pyramidLevels) {
    config.pyramidLevels.forEach(({ rating, count }) => {
      const filled = character.skills.filter(s => s.rating === rating && s.skillId).length
      if (filled < count) {
        warnings.push({
          field: `skills-${rating}`,
          message: `+${rating}: заполнено ${filled} из ${count}`,
        })
      }
    })

    // Нет дублей
    const skillIds = character.skills.map(s => s.skillId).filter(Boolean)
    const unique = new Set(skillIds)
    if (skillIds.length !== unique.size) {
      errors.push({ field: 'skills', message: 'Один навык выбран дважды' })
    }
  }

  // Подходы — все должны быть заполнены
  if (config.skillMode === 'approaches') {
    const filled = character.skills.filter(s => s.skillId).length
    if (filled < config.skills.length) {
      warnings.push({
        field: 'approaches',
        message: `Заполнено ${filled} из ${config.skills.length} подходов`,
      })
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}