interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export default function Textarea({ label, error, hint, className = '', ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <textarea
        className={`border rounded-lg px-3 py-2 text-sm outline-none transition-colors resize-none
          focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
          ${error ? 'border-red-400' : 'border-gray-300'}
          ${className}`}
        rows={3}
        {...props}
      />
      {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}