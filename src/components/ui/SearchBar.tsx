interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function SearchBar({ value, onChange, placeholder = 'Поиск по имени или аспектам...' }: SearchBarProps) {
  return (
    <div style={{ position: 'relative' }}>
      <span style={{
        position: 'absolute',
        left: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '15px',
        pointerEvents: 'none',
      }}>
        🔍
      </span>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          background: 'var(--input-bg)',
          border: '1px solid var(--input-border)',
          borderRadius: '12px',
          padding: '10px 36px 10px 38px',
          fontSize: '14px',
          color: 'var(--input-text)',
          outline: 'none',
          fontFamily: 'DM Sans, sans-serif',
          transition: 'border-color 0.15s, box-shadow 0.15s',
        }}
        onFocus={e => {
          e.target.style.borderColor = 'var(--input-border-focus)'
          e.target.style.boxShadow = 'var(--input-shadow-focus)'
        }}
        onBlur={e => {
          e.target.style.borderColor = 'var(--input-border)'
          e.target.style.boxShadow = 'none'
        }}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '16px',
            padding: '2px',
            lineHeight: 1,
          }}
        >×</button>
      )}
    </div>
  )
}