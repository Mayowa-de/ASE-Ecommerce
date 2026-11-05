import { useApp } from '../context'
import { CategoryImage } from '../components/ProductImage'
import type { Category } from '../types'

const CATEGORY_DESC: Record<Category, string> = {
  Candles: 'Pure wax candles for prayer, vigil, and worship',
  Bibles: 'Holy Bibles in small and medium editions',
  Oils: 'Anointing oils for healing and consecration',
  Perfumes: 'Spiritual fragrances for worship and anointing',
  'Spiritual Items': 'Sacred items for Celestial Church practice',
}

export default function Categories() {
  const { products, navigate } = useApp()

  const activeCategories = Array.from(
    new Set(products.filter((p) => p.active && !p.comingSoon).map((p) => p.category))
  )

  return (
    <div style={{ padding: '20px 16px 24px' }}>
      <div className="mx-auto w-full max-w-[760px] px-4 md:px-6">
        <div style={{ marginBottom: 24 }}>
          <h1 className="relative mb-1 pb-2 font-serif text-[1.375rem] font-bold text-brand-ink after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-7 after:rounded-sm after:bg-brand-gold after:content-['']">
            Browse Categories
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--c-text2)', marginTop: 12 }}>
            {activeCategories.length} categories · {products.filter((p) => p.active && !p.comingSoon).length} products
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 14,
          }}
        >
          {activeCategories.map((cat) => {
            const count = products.filter((p) => p.category === cat && p.active && !p.comingSoon).length
            return (
              <button
                key={cat}
                onClick={() => navigate('category', { categoryId: cat })}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  textAlign: 'left',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                  WebkitTapHighlightColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = 'var(--shadow-md)'
                  el.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = 'var(--shadow-sm)'
                  el.style.transform = 'translateY(0)'
                }}
              >
                <CategoryImage category={cat} />
                <div
                  style={{
                    padding: '12px 14px 14px',
                    backgroundColor: 'var(--c-surface)',
                  }}
                >
                  <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '0.9375rem', color: 'var(--c-text)', margin: '0 0 4px', lineHeight: 1.2 }}>
                    {cat}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--c-text2)', margin: '0 0 4px', lineHeight: 1.4 }}>
                    {CATEGORY_DESC[cat]}
                  </p>
                  <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--c-primary)', margin: 0 }}>
                    {count} product{count !== 1 ? 's' : ''} →
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Shop All CTA */}
        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <button
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-[1.5px] border-brand bg-transparent px-[22px] py-3 text-sm font-semibold text-brand transition duration-150 hover:bg-[#F7F0E3] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() => navigate('shop')}
            style={{ minWidth: 200 }}
          >
            View All Products
          </button>
        </div>
      </div>
    </div>
  )
}
