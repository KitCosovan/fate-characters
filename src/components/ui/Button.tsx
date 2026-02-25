interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base: React.CSSProperties = {
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: 600,
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    letterSpacing: '0.02em',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
  }

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: 'var(--accent)',
      color: '#0d0d10',
    },
    secondary: {
      background: 'var(--surface-3)',
      color: 'var(--text)',
      border: '1px solid var(--border)',
    },
    danger: {
      background: 'var(--danger)',
      color: '#fff',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--accent)',
    },
  }

  const sizes: Record<string, React.CSSProperties> = {
    sm: { padding: '6px 12px', fontSize: '13px' },
    md: { padding: '10px 18px', fontSize: '14px' },
    lg: { padding: '14px 24px', fontSize: '15px', width: '100%', borderRadius: '12px' },
  }

  return (
    <button
      style={{ ...base, ...variants[variant], ...sizes[size] }}
      className={className}
      onMouseEnter={e => {
        if (variant === 'primary') (e.currentTarget as HTMLElement).style.background = 'var(--accent-dim)'
        if (variant === 'secondary') (e.currentTarget as HTMLElement).style.background = 'var(--surface-3)'
        if (variant === 'danger') (e.currentTarget as HTMLElement).style.background = 'var(--danger-dim)'
      }}
      onMouseLeave={e => {
        if (variant === 'primary') (e.currentTarget as HTMLElement).style.background = 'var(--accent)'
        if (variant === 'secondary') (e.currentTarget as HTMLElement).style.background = 'var(--surface-3)'
        if (variant === 'danger') (e.currentTarget as HTMLElement).style.background = 'var(--danger)'
      }}
      {...props}
    >
      {children}
    </button>
  )
}