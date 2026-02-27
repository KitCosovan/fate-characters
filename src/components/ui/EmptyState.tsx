interface EmptyStateProps {
  icon?: string
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export default function EmptyState({ icon = '🎭', title, description, action }: EmptyStateProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '64px 24px',
      textAlign: 'center',
      gap: '12px',
    }}>
      <div style={{
        fontSize: '52px',
        lineHeight: 1,
        marginBottom: '4px',
        filter: 'grayscale(0.3)',
      }}>
        {icon}
      </div>
      <p style={{
        fontFamily: 'Cinzel, serif',
        fontSize: '16px',
        fontWeight: 700,
        color: 'var(--text)',
        margin: 0,
      }}>
        {title}
      </p>
      {description && (
        <p style={{
          fontSize: '13px',
          color: 'var(--text-muted)',
          margin: 0,
          maxWidth: '260px',
          lineHeight: 1.5,
        }}>
          {description}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          style={{
            marginTop: '8px',
            background: 'var(--accent)',
            color: 'var(--bg)',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--accent-dim)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--accent)'}
        >
          {action.label}
        </button>
      )}
    </div>
  )
}