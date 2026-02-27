interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'green' | 'red' | 'dim'
  className?: string
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const styles: Record<string, React.CSSProperties> = {
    default: {
      background: 'var(--surface-3)',
      color: 'var(--text-dim)',
      border: '1px solid var(--border)',
    },
    accent: {
      background: 'var(--accent-glow)',
      color: 'var(--accent)',
      border: '1px solid var(--border-accent)',
    },
    green: {
      background: 'rgba(from var(--success) r g b / 0.12)',
      color: 'var(--success)',
      border: '1px solid rgba(from var(--success) r g b / 0.3)',
    },
    red: {
      background: 'rgba(from var(--danger) r g b / 0.12)',
      color: 'var(--danger)',
      border: '1px solid rgba(from var(--danger) r g b / 0.3)',
    },
    dim: {
      background: 'var(--surface-2)',
      color: 'var(--text-muted)',
      border: '1px solid var(--border)',
    },
  }

  return (
    <span
      style={{
        ...styles[variant],
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: '20px',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
      }}
      className={className}
    >
      {children}
    </span>
  )
}