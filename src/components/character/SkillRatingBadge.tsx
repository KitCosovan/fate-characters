// src/components/character/SkillRatingBadge.tsx
import { useTranslation } from 'react-i18next'

interface SkillRatingBadgeProps { rating: number }

export default function SkillRatingBadge({ rating }: SkillRatingBadgeProps) {
  const { t } = useTranslation()
  const label = t(`skill_badge.${rating}`, `+${rating}`)
  return (
    <span style={{
      display: 'inline-block', padding: '4px 12px', borderRadius: '20px',
      fontSize: '12px', fontWeight: 700, letterSpacing: '0.03em',
      background: 'var(--accent-glow)', color: 'var(--accent)', border: '1px solid var(--border-accent)',
    }}>
      {label}
    </span>
  )
}
