import type { Skill, StressTrack } from '../types'

// Возвращает количество боксов для трека на основе навыка
export function getStressBoxCount(skillRating: number): number {
  if (skillRating >= 3) return 4  // базовые 2 + бокс 3 + бокс 4
  if (skillRating >= 1) return 3  // базовые 2 + бокс 3
  return 2                         // только базовые
}

// Пересчитывает боксы стресс-трека при изменении навыков
export function recalculateStressTracks(
  stressTracks: StressTrack[],
  skills: Skill[]
): StressTrack[] {
  const physiqueRating = skills.find(s => s.skillId === 'physique')?.rating ?? 0
  const willRating = skills.find(s => s.skillId === 'will')?.rating ?? 0

  return stressTracks.map(track => {
    const isPhysical = track.trackId === 'physical'
    const isMental = track.trackId === 'mental'
    if (!isPhysical && !isMental) return track

    const rating = isPhysical ? physiqueRating : willRating
    const targetCount = getStressBoxCount(rating)
    const currentCount = track.boxes.length

    if (currentCount === targetCount) return track

    // Добавляем или убираем боксы
    const boxes = Array.from({ length: targetCount }, (_, i) => ({
      index: i,
      checked: track.boxes[i]?.checked ?? false,
    }))

    return { ...track, boxes }
  })
}