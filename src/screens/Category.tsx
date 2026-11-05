import { useState } from 'react'
import { useApp } from '../context'
import ProductCard from '../components/ProductCard'
import CatalogEmptyState from '../components/CatalogEmptyState'
import type { Category } from '../types'

type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'top-rated'

const SORT_LABELS: Record<SortOption, string> = {
  featured: 'Featured',
  newest: 'Newest',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  'top-rated': 'Highest Rated',
}

export default function Category() {
  const { params, products, navigate, refreshProducts, productLoading, backendError } = useApp()
  const categoryId = params.categoryId as Category | undefined
  const [sort, setSort] = useState<SortOption>('featured')

  const filtered = products.filter(
    (p) => p.active && (!categoryId || p.category === categoryId)
  )

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price-asc') return Math.min(...a.variants.map((v) => v.price)) - Math.min(...b.variants.map((v) => v.price))
    if (sort === 'price-desc') return Math.min(...b.variants.map((v) => v.price)) - Math.min(...a.variants.map((v) => v.price))
    if (sort === 'top-rated') return b.rating - a.rating
    if (sort === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
    return 0
  })

  return (
    <div style={{ padding: '20px 16px 24px' }}>
      <div className="mx-auto w-full max-w-[760px] px-4 md:px-6">
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <button
            onClick={() => navigate('categories')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: '0.8125rem',
              color: 'var(--c-text2)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 0 8px',
              marginBottom: 4,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            All Categories
          </button>
          <h1 className="relative pb-2 font-serif text-[1.375rem] font-bold text-brand-ink after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-7 after:rounded-sm after:bg-brand-gold after:content-['']">
            {categoryId ?? 'All Products'}
          </h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--c-text2)', marginTop: 12 }}>
            {sorted.length} product{sorted.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Sort row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 18,
            overflowX: 'auto',
            paddingBottom: 4,
          }}
        >
          <span style={{ fontSize: '0.75rem', color: 'var(--c-text2)', fontWeight: 500, flexShrink: 0 }}>Sort:</span>
          {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
            <button
              key={key}
              onClick={() => setSort(key)}
              style={{
                padding: '6px 12px',
                borderRadius: 100,
                border: sort === key ? '1.5px solid var(--c-primary)' : '1.5px solid var(--c-border)',
                background: sort === key ? 'var(--c-primary)' : 'var(--c-surface)',
                color: sort === key ? '#fff' : 'var(--c-text2)',
                fontSize: '0.75rem',
                fontWeight: sort === key ? 600 : 400,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'all 0.15s ease',
                minHeight: 36,
              }}
            >
              {SORT_LABELS[key]}
            </button>
          ))}
        </div>

        {/* Grid */}
        {products.length === 0 ? (
          productLoading || backendError ? null : <CatalogEmptyState onRetry={() => void refreshProducts()} onBrowse={() => navigate('shop')} />
        ) : sorted.length === 0 ? (
          <div style={{ padding: '48px 0', textAlign: 'center', color: 'var(--c-text2)' }}>
            <p style={{ marginBottom: 16 }}>No products in this category yet.</p>
            <button className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-[1.5px] border-brand bg-transparent px-[22px] py-3 text-sm font-semibold text-brand transition duration-150 hover:bg-[#F7F0E3] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40" onClick={() => navigate('shop')}>
              Browse All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 min-[560px]:grid-cols-3 md:grid-cols-4" role="list">
            {sorted.map((product) => (
              <div key={product.id} role="listitem">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
