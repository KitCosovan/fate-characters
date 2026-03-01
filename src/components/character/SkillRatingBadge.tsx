interface SkillRatingBadgeProps {
  rating: number
}

const RATING_LABELS: Record<number, string> = {
  1: '+1 Средний',
  2: '+2 Неплохой',
  3: '+3 Хороший',
  4: '+4 Великолепный',
  5: '+5 Легендарный',
  6: '+6 Эпический',
  7: '+7 Мифический',
  8: '+8 Запредельный',
  9: '+9 Сверхъестественный',
  10: '+10 Абсолютный',
  0: '+0 Посредственный',
}

export default function SkillRatingBadge({ rating }: SkillRatingBadgeProps) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 700,
      letterSpacing: '0.03em',
      background: 'var(--accent-glow)',
      color: 'var(--accent)',
      border: '1px solid var(--border-accent)',
    }}>
      {RATING_LABELS[rating] ?? `+${rating}`}
    </span>
  )
}