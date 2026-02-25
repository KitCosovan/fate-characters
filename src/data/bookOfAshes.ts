import type { SystemConfig } from '../types'

export const bookOfAshesConfig: SystemConfig = {
  id: 'book-of-ashes',
  name: 'Книга Пепла',
  description: 'Тёмное фэнтези. Шрамы меняют персонажа навсегда.',
  skillMode: 'pyramid',
  refreshDefault: 3,
  maxStunts: 5,
  freeAspects: 2,
  hasScars: true,
  maxScars: 3,
  hasEquipment: true,
  equipmentSlots: 6,

  // Пирамида меньше чем в Core: 1×+3, 2×+2, 3×+1
  pyramidLevels: [
    { rating: 3, count: 1 },
    { rating: 2, count: 2 },
    { rating: 1, count: 3 },
  ],

  aspectSlots: [
    {
      id: 'concept',
      label: 'Концепция',
      required: true,
      placeholder: 'Кто этот человек и почему он в Походе Пепла?',
    },
    {
      id: 'vice',
      label: 'Порок',
      required: true,
      placeholder: 'Внутренняя слабость или тёмная сторона персонажа',
    },
    {
      id: 'bright-side',
      label: 'Светлая сторона',
      required: true,
      placeholder: 'То хорошее, что не даёт окончательно сломаться',
    },
    {
      id: 'phase-1',
      label: 'Аспект из фазы 1',
      required: false,
      placeholder: 'Из твоего приключения',
    },
    {
      id: 'phase-2',
      label: 'Аспект из фазы 2',
      required: false,
      placeholder: 'Из чужого приключения, где ты появился',
    },
  ],

  skills: [
    { id: 'athletics', name: 'Атлетика', description: 'Физическая активность, уклонение' },
    { id: 'burglary', name: 'Взлом', description: 'Кражи, обход защиты' },
    { id: 'contacts', name: 'Связи', description: 'Знакомства, поиск людей' },
    { id: 'crafts', name: 'Ремесло', description: 'Создание и починка вещей, ремонт брони' },
    { id: 'deceive', name: 'Обман', description: 'Ложь, маскировка' },
    { id: 'drive', name: 'Верховая езда', description: 'Управление транспортом и лошадьми' },
    { id: 'empathy', name: 'Эмпатия', description: 'Чтение эмоций и мотивов' },
    { id: 'fight', name: 'Бой', description: 'Ближний бой' },
    { id: 'investigate', name: 'Расследование', description: 'Поиск улик, анализ' },
    { id: 'lore', name: 'Образованность', description: 'Знания, медицина, лечение' },
    { id: 'notice', name: 'Внимательность', description: 'Восприятие, бдительность' },
    { id: 'physique', name: 'Телосложение', description: 'Сила, выносливость, физический стресс' },
    { id: 'provoke', name: 'Провокация', description: 'Запугивание, раздражение' },
    { id: 'rapport', name: 'Общение', description: 'Убеждение, харизма' },
    { id: 'shoot', name: 'Стрельба', description: 'Дальний бой' },
    { id: 'stealth', name: 'Скрытность', description: 'Прятаться, двигаться тихо' },
    { id: 'will', name: 'Воля', description: 'Ментальная стойкость, ментальный стресс' },
    { id: 'prayer', name: 'Молитва', description: 'Взывать к Пламени, атаковать существ Тьмы' },
    { id: 'travel', name: 'Путешествия', description: 'Навигация, выживание, знание дорог' },
    { id: 'deals', name: 'Сделки', description: 'Торговля, переговоры, социальное лечение' },
  ],

  stressTracks: [
    { id: 'physical', label: 'Физический стресс', boxes: 2 },
    { id: 'mental', label: 'Ментальный стресс', boxes: 2 },
  ],
}