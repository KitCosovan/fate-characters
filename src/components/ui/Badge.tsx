interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'green' | 'red' | 'dim'
  className?: string
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const styles: Record<string, React.CSSProperties> = {
    default: { background: 'var(--surface-3)', color: 'var(--text-dim)' },
    accent: { background: 'rgba(232,160,32,0.15)', color: 'var(--accent)', border: '1px solid var(--border-accent)' },
    green: { background: 'rgba(64,192,120,0.15)', color: 'var(--success)' },
    red: { background: 'rgba(232,64,80,0.15)', color: 'var(--danger)' },
    dim: { background: 'var(--surface-2)', color: 'var(--text-muted)' },
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