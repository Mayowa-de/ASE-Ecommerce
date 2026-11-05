interface QuantityControlProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  disabled?: boolean
}

export default function QuantityControl({
  value,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
}: QuantityControlProps) {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: 0 }}
      role="group"
      aria-label="Quantity"
    >
      <button
        className="qty-btn"
        onClick={() => onChange(value - 1)}
        disabled={disabled || value <= min}
        aria-label="Decrease quantity"
        style={{ borderRadius: 'var(--radius-sm) 0 0 var(--radius-sm)', borderRight: 'none' }}
      >
        −
      </button>
      <span
        aria-live="polite"
        aria-label={`Quantity: ${value}`}
        style={{
          minWidth: 48,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.9375rem',
          fontWeight: 600,
          color: 'var(--c-text)',
          border: '1.5px solid var(--c-border)',
          borderLeft: 'none',
          borderRight: 'none',
          backgroundColor: 'var(--c-surface)',
          userSelect: 'none',
        }}
      >
        {value}
      </span>
      <button
        className="qty-btn"
        onClick={() => onChange(value + 1)}
        disabled={disabled || value >= max}
        aria-label="Increase quantity"
        style={{ borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', borderLeft: 'none' }}
      >
        +
      </button>
    </div>
  )
}
