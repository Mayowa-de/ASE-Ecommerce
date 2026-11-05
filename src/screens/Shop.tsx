import { fieldClassName, inputClassName, inputErrorClassName } from "../components/formStyles"
import { useState } from 'react'
import { CATEGORIES } from '../data'
import { useApp } from '../context'
import type { Category } from '../types'
import ProductCard from '../components/ProductCard'
import CatalogEmptyState from '../components/CatalogEmptyState'

const ALL = 'All'
type Filter = Category | typeof ALL

export default function Shop() {
  const { products, refreshProducts, navigate, productLoading, backendError } = useApp()
  const [filter, setFilter] = useState<Filter>(ALL)
  const [query, setQuery] = useState('')

  const visible = products.filter((p) => {
    const matchCat = filter === ALL || p.category === filter
    const matchQ = query === '' || p.name.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQ
  })

  return (
    <div style={{ padding: '16px 16px 0' }}>
      <div className="mx-auto w-full max-w-[760px] px-4 md:px-6">
        {/* Search */}
        <div style={{ marginBottom: 14, position: 'relative' }}>
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--c-text2)',
              pointerEvents: 'none',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </span>
          <input
            type="search"
            className={inputClassName}
            placeholder="Search products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search products"
            style={{ paddingLeft: 38 }}
          />
        </div>

        {/* Category filter */}
        <nav
          aria-label="Filter by category"
          style={{
            display: 'flex',
            gap: 8,
            overflowX: 'auto',
            paddingBottom: 4,
            marginBottom: 16,
            scrollbarWidth: 'none',
          }}
        >
          {[ALL, ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as Filter)}
              aria-pressed={filter === cat}
              style={{
                flexShrink: 0,
                padding: '0 16px',
                borderRadius: 100,
                border: `1.5px solid ${filter === cat ? 'var(--c-primary)' : 'var(--c-border)'}`,
                backgroundColor: filter === cat ? 'var(--c-primary)' : 'var(--c-surface)',
                color: filter === cat ? '#fff' : 'var(--c-text)',
                fontSize: '0.8125rem',
                fontWeight: 500,
                cursor: 'pointer',
                minHeight: 44,
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* Count */}
        <p
          style={{ fontSize: '0.75rem', color: 'var(--c-text2)', marginBottom: 12 }}
          aria-live="polite"
          aria-atomic="true"
        >
          {visible.length} {visible.length === 1 ? 'product' : 'products'}
          {filter !== ALL ? ` in ${filter}` : ''}
          {query ? ` matching "${query}"` : ''}
        </p>

        {/* Grid */}
        {products.length === 0 ? (
          productLoading || backendError ? null : <CatalogEmptyState onRetry={() => void refreshProducts()} onBrowse={() => navigate('categories')} />
        ) : visible.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 16px', color: 'var(--c-text2)' }}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              style={{ margin: '0 auto 12px', display: 'block', opacity: 0.4 }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <p style={{ fontWeight: 600, marginBottom: 4 }}>No products found</p>
            <p style={{ fontSize: '0.875rem' }}>Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 min-[560px]:grid-cols-3 md:grid-cols-4" role="list" aria-label="Products">
            {visible.map((product) => (
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
