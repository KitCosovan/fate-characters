interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export default function Input({ label, error, hint, className = '', style: extStyle, ...props }: InputProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && (
        <label style={{
          fontSize: '11px',
          fontWeight: 600,
          color: 'var(--text-dim)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>
          {label}
        </label>
      )}
      <input
        style={{
          background: 'var(--input-bg)',
          border: `1px solid ${error ? 'var(--danger)' : 'var(--input-border)'}`,
          borderRadius: '10px',
          padding: '10px 14px',
          fontSize: '14px',
          color: 'var(--input-text)',
          outline: 'none',
          transition: 'border-color 0.15s, box-shadow 0.15s',
          fontFamily: 'DM Sans, sans-serif',
          width: '100%',
          ...extStyle,
        }}
        placeholder={props.placeholder}
        onFocus={e => {
          e.target.style.borderColor = error ? 'var(--danger)' : 'var(--input-border-focus)'
          e.target.style.boxShadow = error ? 'none' : 'var(--input-shadow-focus)'
        }}
        onBlur={e => {
          e.target.style.borderColor = error ? 'var(--danger)' : 'var(--input-border)'
          e.target.style.boxShadow = 'none'
        }}
        className={className}
        {...props}
      />
      {hint && !error && <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{hint}</p>}
      {error && <p style={{ fontSize: '12px', color: 'var(--danger)', margin: 0 }}>{error}</p>}
    </div>
  )
}