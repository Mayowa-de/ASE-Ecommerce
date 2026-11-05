import type { Variant } from '../types'

interface VariantSelectorProps {
  variants: Variant[]
  selected: string
  onChange: (variantId: string) => void
  disabled?: boolean
}

export default function VariantSelector({ variants, selected, onChange, disabled }: VariantSelectorProps) {
  if (variants.length === 0) return null
  if (variants.length === 1) return null

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }} role="group" aria-label="Select size">
      {variants.map((v) => (
        <button
          key={v.id}
          onClick={() => onChange(v.id)}
          disabled={disabled}
          aria-pressed={selected === v.id}
          aria-label={`${v.label} — ₦${v.price.toLocaleString('en-NG')}`}
          className={`variant-pill${selected === v.id ? ' selected' : ''}${disabled ? ' disabled-variant' : ''}`}
        >
          {v.label}
        </button>
      ))}
    </div>
  )
}
