import type { NpcTemplate } from '../types'

export const npcTemplates: NpcTemplate[] = [
  {
    id: 'fighter',
    name: '⚔️ Боец',
    description: 'Крепкий противник в ближнем бою',
    character: {
      systemId: 'fate-core',
      name: '',
      description: '',
      isNpc: true,
      refresh: 1,
      currentFatePoints: 1,
      aspects: [
        { slotId: 'high-concept', value: 'Опытный боец' },
        { slotId: 'trouble', value: 'Живёт только дракой' },
        { slotId: 'aspect-1', value: '' },
        { slotId: 'aspect-2', value: '' },
        { slotId: 'aspect-3', value: '' },
      ],
      skills: [
        { skillId: 'fight', rating: 3 },
        { skillId: 'physique', rating: 2 },
        { skillId: 'athletics', rating: 2 },
        { skillId: 'will', rating: 1 },
      ],
      stunts: [
        {
          id: 'stunt-1',
          name: 'Сокрушительный удар',
          description: '+2 к Драке при атаке безоружным противником',
        },
      ],
      stressTracks: [
        { trackId: 'physical', boxes: [{ index: 0, checked: false }, { index: 1, checked: false }, { index: 2, checked: false }] },
        { trackId: 'mental', boxes: [{ index: 0, checked: false }, { index: 1, checked: false }] },
      ],
      consequences: [
        { severity: 'mild', label: 'Лёгкое', value: '' },
        { severity: 'moderate', label: 'Умеренное', value: '' },
        { severity: 'severe', label: 'Тяжёлое', value: '' },
      ],
    },
  },
  {
    id: 'socialite',
    name: '🗣️ Переговорщик',
    description: 'Мастер слова и манипуляций',
    character: {
      systemId: 'fate-core',
      name: '',
      description: '',
      isNpc: true,
      refresh: 1,
      currentFatePoints: 1,
      aspects: [
        { slotId: 'high-concept', value: 'Хитрый манипулятор' },
        { slotId: 'trouble', value: 'Слабое тело, острый язык' },
        { slotId: 'aspect-1', value: '' },
        { slotId: 'aspect-2', value: '' },
        { slotId: 'aspect-3', value: '' },
      ],
      skills: [
        { skillId: 'rapport', rating: 3 },
        { skillId: 'deceive', rating: 3 },
        { skillId: 'empathy', rating: 2 },
        { skillId: 'contacts', rating: 2 },
        { skillId: 'provoke', rating: 1 },
      ],
      stunts: [
        {
          id: 'stunt-1',
          name: 'Читать людей',
          description: '+2 к Эмпатии при первом разговоре с незнакомцем',
        },
      ],
      stressTracks: [
        { trackId: 'physical', boxes: [{ index: 0, checked: false }, { index: 1, checked: false }] },
        { trackId: 'mental', boxes: [{ index: 0, checked: false }, { index: 1, checked: false }, { index: 2, checked: false }] },
      ],
      consequences: [
        { severity: 'mild', label: 'Лёгкое', value: '' },
        { severity: 'moderate', label: 'Умеренное', value: '' },
        { severity: 'severe', label: 'Тяжёлое', value: '' },
      ],
    },
  },
  {
    id: 'mook',
    name: '👤 Мелкий враг',
    description: 'Слабый противник, массовка',
    character: {
      systemId: 'fate-core',
      name: '',
      description: '',
      isNpc: true,
      refresh: 1,
      currentFatePoints: 1,
      aspects: [
        { slotId: 'high-concept', value: 'Обычный головорез' },
        { slotId: 'trouble', value: 'Трус в душе' },
        { slotId: 'aspect-1', value: '' },
        { slotId: 'aspect-2', value: '' },
        { slotId: 'aspect-3', value: '' },
      ],
      skills: [
        { skillId: 'fight', rating: 2 },
        { skillId: 'athletics', rating: 1 },
        { skillId: 'physique', rating: 1 },
      ],
      stunts: [],
      stressTracks: [
        { trackId: 'physical', boxes: [{ index: 0, checked: false }, { index: 1, checked: false }] },
        { trackId: 'mental', boxes: [{ index: 0, checked: false }, { index: 1, checked: false }] },
      ],
      consequences: [
        { severity: 'mild', label: 'Лёгкое', value: '' },
        { severity: 'moderate', label: 'Умеренное', value: '' },
        { severity: 'severe', label: 'Тяжёлое', value: '' },
      ],
    },
  },
  {
    id: 'boss',
    name: '💀 Босс',
    description: 'Сильный противник, главный злодей',
    character: {
      systemId: 'fate-core',
      name: '',
      description: '',
      isNpc: true,
      refresh: 3,
      currentFatePoints: 3,
      aspects: [
        { slotId: 'high-concept', value: 'Безжалостный злодей' },
        { slotId: 'trouble', value: 'Паранойя и недоверие' },
        { slotId: 'aspect-1', value: 'Всегда на шаг впереди' },
        { slotId: 'aspect-2', value: '' },
        { slotId: 'aspect-3', value: '' },
      ],
      skills: [
        { skillId: 'fight', rating: 4 },
        { skillId: 'provoke', rating: 3 },
        { skillId: 'deceive', rating: 3 },
        { skillId: 'physique', rating: 2 },
        { skillId: 'will', rating: 2 },
        { skillId: 'notice', rating: 1 },
      ],
      stunts: [
        {
          id: 'stunt-1',
          name: 'Неудержимый',
          description: '+2 к защите от Преодолений направленных на него',
        },
        {
          id: 'stunt-2',
          name: 'Запугивание',
          description: 'Может использовать Провокацию вместо Драки для создания преимуществ в бою',
        },
      ],
      stressTracks: [
        { trackId: 'physical', boxes: [{ index: 0, checked: false }, { index: 1, checked: false }, { index: 2, checked: false }, { index: 3, checked: false }] },
        { trackId: 'mental', boxes: [{ index: 0, checked: false }, { index: 1, checked: false }, { index: 2, checked: false }] },
      ],
      consequences: [
        { severity: 'mild', label: 'Лёгкое', value: '' },
        { severity: 'moderate', label: 'Умеренное', value: '' },
        { severity: 'severe', label: 'Тяжёлое', value: '' },
      ],
    },
  },
]