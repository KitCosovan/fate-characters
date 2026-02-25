import type { SystemConfig } from '../types'

export const fateCoreConfig: SystemConfig = {
  id: 'fate-core',
  name: 'Fate Core',
  description: 'Стандартная система Fate Core',
  skillMode: 'pyramid',
  refreshDefault: 3,
  maxStunts: 5,
  freeAspects: 3,

  aspectSlots: [
    {
      id: 'high-concept',
      label: 'Основная концепция',
      required: true,
      placeholder: 'Кто ваш персонаж в двух словах?',
    },
    {
      id: 'trouble',
      label: 'Проблема',
      required: true,
      placeholder: 'Что усложняет жизнь персонажа?',
    },
    {
      id: 'aspect-1',
      label: 'Аспект',
      required: false,
      placeholder: 'Свободный аспект',
    },
    {
      id: 'aspect-2',
      label: 'Аспект',
      required: false,
      placeholder: 'Свободный аспект',
    },
    {
      id: 'aspect-3',
      label: 'Аспект',
      required: false,
      placeholder: 'Свободный аспект',
    },
  ],

  skills: [
    { id: 'athletics', name: 'Атлетика', description: 'Физическая активность, уклонение' },
    { id: 'burglary', name: 'Взлом', description: 'Кражи, обход защиты' },
    { id: 'contacts', name: 'Связи', description: 'Знакомства, поиск людей' },
    { id: 'crafts', name: 'Ремесло', description: 'Создание и починка вещей' },
    { id: 'deceive', name: 'Обман', description: 'Ложь, маскировка' },
    { id: 'drive', name: 'Вождение', description: 'Управление транспортом' },
    { id: 'empathy', name: 'Эмпатия', description: 'Чтение эмоций, мотивов' },
    { id: 'fight', name: 'Драка', description: 'Рукопашный бой' },
    { id: 'investigate', name: 'Расследование', description: 'Поиск улик, анализ' },
    { id: 'lore', name: 'Знания', description: 'Образование, эрудиция' },
    { id: 'notice', name: 'Внимание', description: 'Восприятие, бдительность' },
    { id: 'physique', name: 'Телосложение', description: 'Сила, выносливость' },
    { id: 'provoke', name: 'Провокация', description: 'Запугивание, раздражение' },
    { id: 'rapport', name: 'Общение', description: 'Убеждение, харизма' },
    { id: 'resources', name: 'Ресурсы', description: 'Богатство, имущество' },
    { id: 'shoot', name: 'Стрельба', description: 'Дальний бой' },
    { id: 'stealth', name: 'Скрытность', description: 'Прятаться, двигаться тихо' },
    { id: 'will', name: 'Воля', description: 'Ментальная стойкость' },
  ],

  stressTracks: [
    { id: 'physical', label: 'Физический стресс', boxes: 2 },
    { id: 'mental', label: 'Ментальный стресс', boxes: 2 },
  ],
}