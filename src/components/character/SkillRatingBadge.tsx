const RATING_LABELS: Record<number, string> = {
  4: 'Великолепный',
  3: 'Хороший',
  2: 'Неплохой',
  1: 'Средний',
}

const RATING_COLORS: Record<number, string> = {
  4: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  3: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  2: 'bg-blue-100 text-blue-800 border-blue-300',
  1: 'bg-gray-100 text-gray-700 border-gray-300',
}

interface SkillRatingBadgeProps {
  rating: number
}

export default function SkillRatingBadge({ rating }: SkillRatingBadgeProps) {
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded border ${RATING_COLORS[rating] ?? 'bg-gray-100'}`}>
      +{rating} {RATING_LABELS[rating] ?? ''}
    </span>
  )
}