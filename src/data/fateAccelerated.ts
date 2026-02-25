import type { SystemConfig } from '../types'

export const fateAcceleratedConfig: SystemConfig = {
  id: 'fate-accelerated',
  name: 'Fate Accelerated',
  description: 'Упрощённая версия Fate с подходами вместо навыков',
  skillMode: 'approaches',
  refreshDefault: 3,
  maxStunts: 3,
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

  // В Accelerated подходы — это те же "навыки" но с фиксированным набором
  skills: [
    { id: 'careful', name: 'Осторожный', description: 'Медленно и методично' },
    { id: 'clever', name: 'Хитрый', description: 'Умно и творчески' },
    { id: 'flashy', name: 'Эффектный', description: 'С размахом и стилем' },
    { id: 'forceful', name: 'Напористый', description: 'Силой и прямолинейно' },
    { id: 'quick', name: 'Быстрый', description: 'Моментально и проворно' },
    { id: 'sneaky', name: 'Хитрый', description: 'Тайно и обманом' },
  ],

  stressTracks: [
    { id: 'physical', label: 'Стресс', boxes: 3 },
  ],
}