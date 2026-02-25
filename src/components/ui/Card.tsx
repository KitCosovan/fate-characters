interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  accent?: boolean
}

export default function Card({ children, className = '', onClick, accent }: CardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--surface)',
        border: accent ? '1px solid var(--border-accent)' : '1px solid var(--border)',
        borderRadius: '16px',
        padding: '16px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        boxShadow: accent ? '0 0 20px var(--accent-glow)' : 'none',
      }}
      onMouseEnter={e => {
        if (onClick) {
          const el = e.currentTarget as HTMLElement
          el.style.background = 'var(--surface-2)'
          el.style.transform = 'translateY(-1px)'
          el.style.borderColor = 'var(--border-accent)'
        }
      }}
      onMouseLeave={e => {
        if (onClick) {
          const el = e.currentTarget as HTMLElement
          el.style.background = 'var(--surface)'
          el.style.transform = 'translateY(0)'
          el.style.borderColor = accent ? 'var(--border-accent)' : 'var(--border)'
        }
      }}
      className={className}
    >
      {children}
    </div>
  )
}