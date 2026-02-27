interface SkillRatingBadgeProps {
  rating: number
}

const RATING_LABELS: Record<number, string> = {
  4: '+4 Великолепный',
  3: '+3 Хороший',
  2: '+2 Неплохой',
  1: '+1 Средний',
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