import { fieldClassName, inputClassName, inputErrorClassName } from "../components/formStyles"
import { useState, useEffect } from 'react'
import { useApp } from '../context'
import ProductCard from '../components/ProductCard'
import CatalogEmptyState from '../components/CatalogEmptyState'

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'top-rated'

export default function Search() {
  const { searchQuery, setSearchQuery, products, navigate, refreshProducts, productLoading, backendError } = useApp()
  const [input, setInput] = useState(searchQuery)
  const [sort, setSort] = useState<SortOption>('relevance')

  useEffect(() => {
    setInput(searchQuery)
  }, [searchQuery])

  const q = searchQuery.toLowerCase().trim()

  const results = q
    ? products.filter(
        (p) =>
          p.active &&
          (p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q))
      )
    : []

  const sorted = [...results].sort((a, b) => {
    if (sort === 'price-asc') return Math.min(...a.variants.map((v) => v.price)) - Math.min(...b.variants.map((v) => v.price))
    if (sort === 'price-desc') return Math.min(...b.variants.map((v) => v.price)) - Math.min(...a.variants.map((v) => v.price))
    if (sort === 'top-rated') return b.rating - a.rating
    return 0
  })

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setSearchQuery(input.trim())
  }

  return (
    <div style={{ padding: '16px 16px 24px' }}>
      <div className="mx-auto w-full max-w-[760px] px-4 md:px-6">
        {/* Search form */}
        <form onSubmit={handleSearch} style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--c-text2)"
                strokeWidth="1.75"
                strokeLinecap="round"
                style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="search"
                className={inputClassName}
                placeholder="Search products…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ paddingLeft: 40 }}
                autoFocus
              />
            </div>
            <button type="submit" className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-0 bg-brand px-[22px] py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(53,16,92,0.25)] transition duration-150 hover:bg-[#4a1880] hover:shadow-[0_4px_14px_rgba(53,16,92,0.35)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40" style={{ flexShrink: 0 }}>
              Search
            </button>
          </div>
        </form>

        {/* Sort bar (only when there are results) */}
        {sorted.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, overflowX: 'auto' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--c-text2)', fontWeight: 500, flexShrink: 0 }}>Sort:</span>
            {(['relevance', 'price-asc', 'price-desc', 'top-rated'] as SortOption[]).map((key) => {
              const label = { relevance: 'Relevance', 'price-asc': 'Price ↑', 'price-desc': 'Price ↓', 'top-rated': 'Top Rated' }[key]
              return (
                <button
                  key={key}
                  onClick={() => setSort(key)}
                  style={{
                    padding: '5px 11px',
                    borderRadius: 100,
                    border: sort === key ? '1.5px solid var(--c-primary)' : '1.5px solid var(--c-border)',
                    background: sort === key ? 'var(--c-primary)' : 'var(--c-surface)',
                    color: sort === key ? '#fff' : 'var(--c-text2)',
                    fontSize: '0.75rem',
                    fontWeight: sort === key ? 600 : 400,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    minHeight: 34,
                    transition: 'all 0.15s ease',
                  }}
                >
                  {label}
                </button>
              )
            })}
          </div>
        )}

        {/* Results */}
        {products.length === 0 ? (
          productLoading || backendError ? null : <CatalogEmptyState onRetry={() => void refreshProducts()} onBrowse={() => navigate('shop')} />
        ) : !q ? (
          <div style={{ padding: '48px 0', textAlign: 'center', color: 'var(--c-text2)' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" style={{ margin: '0 auto 16px', display: 'block', color: 'var(--c-border)' }}>
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.125rem', fontWeight: 700, color: 'var(--c-text)', marginBottom: 8 }}>Search our products</p>
            <p style={{ fontSize: '0.875rem' }}>Try searching for Candles, Bible, Oil, or Perfume</p>
          </div>
        ) : sorted.length === 0 ? (
          <div style={{ padding: '48px 0', textAlign: 'center', color: 'var(--c-text2)' }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.125rem', fontWeight: 700, color: 'var(--c-text)', marginBottom: 8 }}>
              No results for "{searchQuery}"
            </p>
            <p style={{ fontSize: '0.875rem', marginBottom: 20 }}>Try a different search term or browse our categories.</p>
            <button className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-[1.5px] border-brand bg-transparent px-[22px] py-3 text-sm font-semibold text-brand transition duration-150 hover:bg-[#F7F0E3] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40" onClick={() => navigate('categories')}>
              Browse Categories
            </button>
          </div>
        ) : (
          <>
            <p style={{ fontSize: '0.8125rem', color: 'var(--c-text2)', marginBottom: 14 }}>
              {sorted.length} result{sorted.length !== 1 ? 's' : ''} for "{searchQuery}"
            </p>
            <div className="grid grid-cols-2 gap-3 min-[560px]:grid-cols-3 md:grid-cols-4" role="list">
              {sorted.map((product) => (
                <div key={product.id} role="listitem">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
