import type { Category } from '../types'

const ICONS: Record<Category | 'default', React.ReactNode> = {
  Candles: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Flame */}
      <path d="M24 6c0 0-5 5-5 10a5 5 0 0010 0c0-5-5-10-5-10z" fill="rgba(231,201,120,0.6)" stroke="#E7C978" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 10c0 0-2 3-2 6a2 2 0 004 0c0-3-2-6-2-6z" fill="#E7C978"/>
      {/* Candle body */}
      <rect x="18" y="22" width="12" height="20" rx="2" stroke="#E7C978" strokeWidth="1.5" fill="rgba(231,201,120,0.2)"/>
      {/* Wick */}
      <line x1="24" y1="18" x2="24" y2="22" stroke="#E7C978" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Wax drip */}
      <path d="M18 26c0 0-2 2-2 4v10a2 2 0 002 2h12a2 2 0 002-2V30c0-2-2-4-2-4" stroke="#E7C978" strokeWidth="1" fill="none" opacity="0.4"/>
    </svg>
  ),
  Bibles: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Book */}
      <rect x="8" y="8" width="32" height="36" rx="3" stroke="#E7C978" strokeWidth="1.5" fill="rgba(231,201,120,0.15)"/>
      {/* Spine */}
      <line x1="14" y1="8" x2="14" y2="44" stroke="#E7C978" strokeWidth="1.5"/>
      {/* Cross on cover */}
      <line x1="24" y1="16" x2="24" y2="36" stroke="#E7C978" strokeWidth="2" strokeLinecap="round"/>
      <line x1="17" y1="23" x2="31" y2="23" stroke="#E7C978" strokeWidth="2" strokeLinecap="round"/>
      {/* Pages lines */}
      <line x1="18" y1="30" x2="30" y2="30" stroke="#E7C978" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
      <line x1="18" y1="34" x2="27" y2="34" stroke="#E7C978" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
    </svg>
  ),
  Oils: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bottle neck */}
      <rect x="20" y="8" width="8" height="10" rx="2" stroke="#E7C978" strokeWidth="1.5" fill="rgba(231,201,120,0.15)"/>
      {/* Cap */}
      <rect x="19" y="6" width="10" height="5" rx="1.5" stroke="#E7C978" strokeWidth="1.5" fill="rgba(231,201,120,0.3)"/>
      {/* Bottle body */}
      <path d="M16 18h16l2 4v14a4 4 0 01-4 4H18a4 4 0 01-4-4V22l2-4z" stroke="#E7C978" strokeWidth="1.5" fill="rgba(231,201,120,0.15)"/>
      {/* Oil level */}
      <path d="M14 30h20" stroke="#E7C978" strokeWidth="1" opacity="0.5"/>
      <path d="M16 30v8a4 4 0 004 4h8a4 4 0 004-4v-8H16z" fill="rgba(231,201,120,0.25)"/>
      {/* Droplet */}
      <path d="M24 34c0 0-3 3-3 5a3 3 0 006 0c0-2-3-5-3-5z" fill="#E7C978" opacity="0.7"/>
    </svg>
  ),
  Perfumes: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bottle */}
      <rect x="12" y="18" width="20" height="22" rx="4" stroke="#E7C978" strokeWidth="1.5" fill="rgba(231,201,120,0.15)"/>
      {/* Bottle top */}
      <rect x="16" y="12" width="12" height="8" rx="2" stroke="#E7C978" strokeWidth="1.5" fill="rgba(231,201,120,0.2)"/>
      {/* Nozzle */}
      <rect x="22" y="8" width="10" height="6" rx="1.5" stroke="#E7C978" strokeWidth="1.5" fill="rgba(231,201,120,0.3)"/>
      {/* Spray dots */}
      <circle cx="34" cy="7" r="1" fill="#E7C978" opacity="0.6"/>
      <circle cx="37" cy="10" r="1.2" fill="#E7C978" opacity="0.5"/>
      <circle cx="36" cy="4" r="0.8" fill="#E7C978" opacity="0.4"/>
      {/* Label line */}
      <line x1="16" y1="28" x2="28" y2="28" stroke="#E7C978" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      <line x1="16" y1="32" x2="24" y2="32" stroke="#E7C978" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
    </svg>
  ),
  'Spiritual Items': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cross */}
      <line x1="24" y1="8" x2="24" y2="40" stroke="#E7C978" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="12" y1="18" x2="36" y2="18" stroke="#E7C978" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Star points */}
      <circle cx="24" cy="24" r="3" fill="rgba(231,201,120,0.5)" stroke="#E7C978" strokeWidth="1"/>
      {/* Ornament */}
      <circle cx="24" cy="8" r="2" fill="#E7C978" opacity="0.6"/>
      <circle cx="24" cy="40" r="1.5" fill="#E7C978" opacity="0.4"/>
      <circle cx="12" cy="18" r="1.5" fill="#E7C978" opacity="0.4"/>
      <circle cx="36" cy="18" r="1.5" fill="#E7C978" opacity="0.4"/>
    </svg>
  ),
  default: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="14" stroke="#E7C978" strokeWidth="1.5" fill="rgba(231,201,120,0.1)"/>
      <path d="M24 16v8l5 5" stroke="#E7C978" strokeWidth="1.75" strokeLinecap="round"/>
      <circle cx="24" cy="24" r="2" fill="#E7C978"/>
    </svg>
  ),
}

interface ProductImageProps {
  category: Category
  size?: 'sm' | 'md' | 'lg'
  comingSoon?: boolean
  className?: string
  style?: React.CSSProperties
}

export default function ProductImage({ category, size = 'md', comingSoon, style }: ProductImageProps) {
  const iconSizes = { sm: 40, md: 52, lg: 72 }
  const iconSize = iconSizes[size]

  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '1 / 1',
        background: 'linear-gradient(135deg, #24103D 0%, #35105C 50%, #5a1e8c 100%)',
        borderRadius: 'var(--radius)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
        ...style,
      }}
    >
      {/* Subtle texture overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 70% 30%, rgba(201,154,36,0.12) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{ width: iconSize, height: iconSize, position: 'relative', zIndex: 1 }}
        aria-hidden="true"
      >
        {ICONS[category] ?? ICONS.default}
      </div>
      {comingSoon && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6px 4px',
          }}
        >
          <span
            style={{
              fontSize: '0.625rem',
              fontWeight: 600,
              color: '#E7C978',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Coming Soon
          </span>
        </div>
      )}
    </div>
  )
}

export function CategoryImage({ category }: { category: Category }) {
  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '3 / 2',
        background: 'linear-gradient(140deg, #24103D 0%, #35105C 40%, #6b2fa0 100%)',
        borderRadius: 'var(--radius)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 60% 40%, rgba(201,154,36,0.15) 0%, transparent 65%)',
        }}
      />
      <div style={{ width: 48, height: 48 }} aria-hidden="true">
        {ICONS[category] ?? ICONS.default}
      </div>
    </div>
  )
}
