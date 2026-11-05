import { fieldClassName, inputClassName, inputErrorClassName } from "../components/formStyles"
import { useState } from 'react'
import { useApp } from '../context'
import { formatPrice } from '../data'
import { apiRequest } from '../lib/api'

export default function AdminProducts() {
  const { products, setProducts, navigate } = useApp()
  const [search, setSearch] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState('')

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  function toggleFeatured(id: string) {
    setProducts(products.map((p) => p.id === id ? { ...p, featured: !p.featured } : p))
  }

  function toggleActive(id: string) {
    setProducts(products.map((p) => p.id === id ? { ...p, active: !p.active } : p))
  }

  async function deleteProduct(id: string, name: string) {
    if (!window.confirm(`Remove “${name}” from the storefront? Existing order history will be retained.`)) return
    setDeletingId(id)
    setDeleteError('')
    try {
      await apiRequest<void>(`/products/${encodeURIComponent(id)}`, { method: 'DELETE' })
      setProducts(products.filter((product) => product.id !== id))
    } catch (reason) {
      setDeleteError(reason instanceof Error ? reason.message : 'The product could not be removed. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div style={{ maxWidth: 900 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: 'var(--c-text)', margin: 0 }}>
          Products
        </h1>
        <button
          className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-0 bg-brand px-[22px] py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(53,16,92,0.25)] transition duration-150 hover:bg-[#4a1880] hover:shadow-[0_4px_14px_rgba(53,16,92,0.35)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => navigate('admin-product-editor')}
          style={{ fontSize: '0.875rem' }}
        >
          + Add Product
        </button>
      </div>

      {deleteError && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">{deleteError}</div>}

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--c-text2)" strokeWidth="1.75" strokeLinecap="round" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        </svg>
        <input
          type="search"
          className={inputClassName}
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ paddingLeft: 38 }}
        />
      </div>

      {/* Table */}
      <div className="admin-products-table" style={{ backgroundColor: 'var(--c-surface)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        {/* Header */}
        <div className="admin-products-head" style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto auto auto', gap: 12, padding: '10px 16px', borderBottom: '1px solid var(--c-border)', backgroundColor: 'var(--c-cream)' }}>
          {['Product', 'Price', 'Stock', 'Featured', 'Active', ''].map((h, i) => (
            <span key={`${h}-${i}`} style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--c-text2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</span>
          ))}
        </div>

        {filtered.map((product, i) => {
          const minPrice = product.variants.length > 0 ? Math.min(...product.variants.map((v) => v.price)) : 0
          const minStock = product.variants.length > 0 ? Math.min(...product.variants.map((v) => v.stock)) : 0

          return (
            <div
              key={product.id}
              className="admin-products-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto auto auto auto auto',
                gap: 12,
                padding: '12px 16px',
                borderBottom: i < filtered.length - 1 ? '1px solid var(--c-border)' : 'none',
                alignItems: 'center',
              }}
            >
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--c-text)', margin: '0 0 2px' }}>
                  {product.name}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--c-text2)', margin: 0 }}>
                  {product.category} · {product.comingSoon ? 'Coming Soon' : `${product.variants.length} variant${product.variants.length !== 1 ? 's' : ''}`}
                </p>
              </div>
              <span data-label="Price" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--c-text)', whiteSpace: 'nowrap' }}>
                {product.variants.length > 0 ? `from ${formatPrice(minPrice)}` : '—'}
              </span>
              <span data-label="Stock"
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: minStock < 5 ? 'var(--c-error)' : 'var(--c-text)',
                  whiteSpace: 'nowrap',
                }}
              >
                {product.comingSoon ? '—' : minStock}
              </span>
              <div className="admin-products-cell" data-label="Featured"><button
                onClick={() => toggleFeatured(product.id)}
                style={{
                  width: 40,
                  height: 24,
                  borderRadius: 12,
                  border: 'none',
                  background: product.featured ? 'var(--c-gold)' : 'var(--c-border)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background 0.2s ease',
                  flexShrink: 0,
                }}
                aria-label={`${product.featured ? 'Remove' : 'Mark'} as featured`}
                aria-pressed={product.featured}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: 3,
                    left: product.featured ? 18 : 3,
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: '#fff',
                    transition: 'left 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  }}
                />
              </button></div>
              <div className="admin-products-cell" data-label="Remove">
                <button type="button" className="admin-product-delete" disabled={deletingId === product.id} onClick={() => void deleteProduct(product.id, product.name)} aria-label={`Remove ${product.name} from storefront`} title="Remove from storefront">
                  {deletingId === product.id ? <span className="text-xs">…</span> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="m19 6-1 14H6L5 6"/><path d="M10 11v5M14 11v5"/></svg>}
                </button>
              </div>
              <div className="admin-products-cell" data-label="Active"><button
                onClick={() => toggleActive(product.id)}
                style={{
                  width: 40,
                  height: 24,
                  borderRadius: 12,
                  border: 'none',
                  background: product.active ? 'var(--c-primary)' : 'var(--c-border)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background 0.2s ease',
                  flexShrink: 0,
                }}
                aria-label={`${product.active ? 'Deactivate' : 'Activate'} product`}
                aria-pressed={product.active}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: 3,
                    left: product.active ? 18 : 3,
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: '#fff',
                    transition: 'left 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  }}
                />
              </button></div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <p style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--c-text2)', fontSize: '0.875rem' }}>
            No products found.
          </p>
        )}
      </div>
    </div>
  )
}
