import { useState } from 'react'
import { useApp } from '../context'
import { formatPrice, formatStateList } from '../data'
import ProductImage from '../components/ProductImage'
import VariantSelector from '../components/VariantSelector'
import QuantityControl from '../components/QuantityControl'
import StatusBadge from '../components/StatusBadge'

const SAMPLE_REVIEWS = [
  { id: 'r1', author: 'Blessing O.', rating: 5, comment: 'Excellent quality. Arrived in good condition.', date: 'Nov 2024' },
  { id: 'r2', author: 'Emmanuel A.', rating: 5, comment: 'Perfect for our vigil nights. Highly recommended.', date: 'Oct 2024' },
]

function StarRating({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <span aria-label={`${value} out of ${max} stars`} style={{ display: 'inline-flex', gap: 2 }}>
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < value ? 'var(--c-gold)' : 'none'} stroke="var(--c-gold)" strokeWidth="1.5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </span>
  )
}

export default function ProductDetail() {
  const { params, addToCart, navigate, wishlist, toggleWishlist, isLoggedIn, storeConfig, products, productLoading, backendError, refreshProducts } = useApp()
  const product = products.find((item) => item.id === params.productId)

  const [selectedVariantId, setSelectedVariantId] = useState(product?.variants[0]?.id ?? '')
  const [quantity, setQuantity] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  if (!product) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12 text-center text-brand-muted">
        <p>{productLoading ? 'Loading product…' : backendError ? 'This product could not be loaded from the catalogue.' : 'Product not found.'}</p>
        {backendError && !productLoading && <button type="button" className="mt-4 rounded-lg bg-brand px-4 py-2 font-semibold text-white hover:opacity-90" onClick={() => void refreshProducts()}>Try again</button>}
        <button className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-0 bg-brand px-[22px] py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(53,16,92,0.25)] transition duration-150 hover:bg-[#4a1880] hover:shadow-[0_4px_14px_rgba(53,16,92,0.35)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40" onClick={() => navigate('shop')} style={{ marginTop: 16 }}>
          Back to Shop
        </button>
      </div>
    )
  }

  const variant = product.variants.find((v) => v.id === selectedVariantId)
  const isWished = wishlist.includes(product.id)

  function handleAddToCart() {
    if (!variant || variant.stock < 1 || quantity > variant.stock || !product || product.comingSoon) return
    addToCart({ productId: product.id, variantId: variant.id, quantity })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 2000)
  }

  function handleBuyNow() {
    if (!variant || variant.stock < 1 || quantity > variant.stock || !product || product.comingSoon) return
    addToCart({ productId: product.id, variantId: variant.id, quantity })
    if (!isLoggedIn) {
      navigate('auth')
    } else {
      navigate('checkout')
    }
  }

  return (
    <div className="pdp-layout">
      {/* Product image */}
      <div className="pdp-image-col" style={{ padding: '16px 16px 0' }}>
        <div style={{ position: 'relative' }}>
          <ProductImage category={product.category} size="lg" comingSoon={product.comingSoon} />
          {/* Wishlist on detail */}
          <button
            className="wish-btn"
            onClick={() => toggleWishlist(product.id)}
            aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={isWished}
            style={{ top: 12, right: 12 }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={isWished ? 'var(--c-error)' : 'none'}
              stroke={isWished ? 'var(--c-error)' : 'var(--c-text2)'}
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '20px 16px' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--c-text2)', marginBottom: 6, fontWeight: 500 }}>
          {product.category}
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.25rem, 5vw, 1.625rem)',
            fontWeight: 700,
            color: 'var(--c-text)',
            margin: '0 0 8px',
            lineHeight: 1.2,
          }}
        >
          {product.name}
        </h1>

        {product.comingSoon ? (
          <StatusBadge status="Coming Soon" />
        ) : (
          <>
            <p
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--c-primary)',
                margin: '0 0 20px',
              }}
            >
              {variant ? formatPrice(variant.price) : product.variants.length > 0 ? `From ${formatPrice(Math.min(...product.variants.map((v) => v.price)))}` : '—'}
            </p>

            {/* Variant selector */}
            {product.variants.length > 1 && (
              <div style={{ marginBottom: 20 }}>
                <p
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: 'var(--c-text)',
                    marginBottom: 10,
                  }}
                >
                  Size
                </p>
                <VariantSelector
                  variants={product.variants}
                  selected={selectedVariantId}
                  onChange={(variantId) => { setSelectedVariantId(variantId); setQuantity(1) }}
                />
              </div>
            )}

            {variant && <p className={`mb-4 text-sm font-medium ${variant.stock > 0 ? 'text-brand-muted' : 'text-red-700'}`} aria-live="polite">
              {variant.stock > 0 ? `${variant.stock} ${variant.stock === 1 ? 'unit' : 'units'} available for ${variant.label}` : `${variant.label} is out of stock`}
            </p>}

            {/* Quantity */}
            <div style={{ marginBottom: 20 }}>
              <p
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--c-text)',
                  marginBottom: 10,
                }}
              >
                Quantity
              </p>
              <QuantityControl value={quantity} onChange={setQuantity} max={variant?.stock ?? 0} disabled={!variant || variant.stock === 0} />
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                className={`inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg px-[22px] py-3 text-sm font-semibold transition duration-150 active:scale-[0.97] ${justAdded ? 'border-0 bg-brand-gold text-[#24103D] shadow-[0_4px_16px_rgba(201,154,36,0.28)] hover:bg-[#E7C978]' : 'border-[1.5px] border-brand bg-transparent text-brand hover:bg-[#F7F0E3]'}`}
                onClick={handleAddToCart}
                disabled={!variant || variant.stock < 1 || quantity > variant.stock}
                style={{ width: '100%' }}
              >
                {justAdded ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
              <button
                className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-0 bg-brand px-[22px] py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(53,16,92,0.25)] transition duration-150 hover:bg-[#4a1880] hover:shadow-[0_4px_14px_rgba(53,16,92,0.35)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
                onClick={handleBuyNow}
                disabled={!variant || variant.stock < 1 || quantity > variant.stock}
                style={{ width: '100%' }}
              >
                Buy Now
              </button>
            </div>
          </>
        )}

        {/* Description */}
        <div
          style={{
            marginTop: 24,
            paddingTop: 20,
            borderTop: '1px solid var(--c-border)',
          }}
        >
          <h2
            style={{
              fontSize: '0.9375rem',
              fontWeight: 600,
              color: 'var(--c-text)',
              marginBottom: 8,
            }}
          >
            About this product
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--c-text2)', lineHeight: 1.6, margin: 0 }}>
            {product.description}
          </p>
        </div>

        {/* Delivery info */}
        <div
          style={{
            marginTop: 20,
            padding: 14,
            backgroundColor: 'var(--c-cream)',
            borderRadius: 'var(--radius)',
          }}
        >
          <h3 style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--c-text)', marginBottom: 8 }}>
            Delivery information
          </h3>
          <ul style={{ fontSize: '0.8125rem', color: 'var(--c-text2)', margin: 0, paddingLeft: 16, lineHeight: 2 }}>
            <li>Delivers to {formatStateList(storeConfig.deliveryStates)} States only</li>
            <li>Cash on Delivery, Bank Transfer, or Card</li>
            <li>Account required to place an order</li>
          </ul>
        </div>

        {/* Reviews */}
        {product.category !== 'Spiritual Items' || true ? (
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--c-border)' }}>
            <h2
              style={{
                fontSize: '0.9375rem',
                fontWeight: 600,
                color: 'var(--c-text)',
                marginBottom: 16,
              }}
            >
              Product Reviews
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {SAMPLE_REVIEWS.map((r) => (
                <div
                  key={r.id}
                  style={{
                    padding: 14,
                    backgroundColor: 'var(--c-surface)',
                    border: '1px solid var(--c-border)',
                    borderRadius: 'var(--radius)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--c-text)' }}>{r.author}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--c-text2)' }}>{r.date}</span>
                  </div>
                  <StarRating value={r.rating} />
                  <p style={{ fontSize: '0.8125rem', color: 'var(--c-text2)', margin: '6px 0 0', lineHeight: 1.5 }}>
                    {r.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
