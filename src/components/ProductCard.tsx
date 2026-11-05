import { useState } from 'react'
import type { Product } from '../types'
import { formatPrice } from '../data'
import { useApp } from '../context'
import ProductImage from './ProductImage'
import StatusBadge from './StatusBadge'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { navigate, addToCart, wishlist, toggleWishlist } = useApp()
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0]?.id ?? ''
  )
  const [justAdded, setJustAdded] = useState(false)

  const variant = product.variants.find((v) => v.id === selectedVariant)
  const isWished = wishlist.includes(product.id)
  const multiVariant = product.variants.length > 1
  const isOutOfStock = !variant || variant.stock <= 0

  const minPrice = product.variants.length > 0
    ? Math.min(...product.variants.map((v) => v.price))
    : null

  function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation()
    if (!variant || variant.stock <= 0 || product.comingSoon) return
    addToCart({ productId: product.id, variantId: variant.id, quantity: 1 })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  function handleWishlist(e: React.MouseEvent) {
    e.stopPropagation()
    toggleWishlist(product.id)
  }

  return (
    <article
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-brand-border bg-brand-surface transition duration-200 hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(53,16,92,0.12)]"
      onClick={() => navigate('product', { productId: product.id })}
    >
      {/* Image */}
      <div className="relative p-2">
        <ProductImage category={product.category} comingSoon={product.comingSoon} />
        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          aria-label={isWished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={isWished}
          className="wish-btn right-4 top-4"
        >
          <svg
            width="16"
            height="16"
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

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1.5 px-2.5 pb-2.5 pt-2">
        <h3 className="m-0 line-clamp-2 text-[0.8125rem] font-semibold leading-tight text-brand-ink">
          {product.name}
        </h3>

        {product.comingSoon ? (
          <StatusBadge status="Coming Soon" />
        ) : (
          <>
            <p className="m-0 text-sm font-bold text-brand">
              {multiVariant && minPrice !== null
                ? `From ${formatPrice(minPrice)}`
                : variant
                ? formatPrice(variant.price)
                : '—'}
            </p>

            {variant && <p className={`m-0 text-[0.6875rem] font-medium ${isOutOfStock ? 'text-red-700' : 'text-brand-muted'}`} aria-live="polite">
              {isOutOfStock ? 'Out of stock' : `${variant.stock} ${variant.stock === 1 ? 'unit' : 'units'} available`}
            </p>}

            {/* Variant picker for multi-variant */}
            {multiVariant && (
              <div className="flex flex-wrap gap-1" onClick={(e) => e.stopPropagation()}>
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedVariant(v.id)
                    }}
                    aria-pressed={selectedVariant === v.id}
                    className={`min-h-7 cursor-pointer rounded border-[1.5px] px-2 py-[3px] text-[0.6875rem] font-medium transition ${selectedVariant === v.id ? 'border-brand bg-brand text-white' : 'border-brand-border bg-brand-surface text-brand-muted hover:border-brand hover:text-brand'}`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock || product.comingSoon}
              className={`mt-auto inline-flex min-h-9 w-full items-center justify-center gap-1.5 rounded-lg border-0 px-3 py-2 text-xs font-semibold transition duration-150 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40 ${justAdded ? 'bg-brand-gold text-[#24103D] shadow-[0_4px_16px_rgba(201,154,36,0.28)] hover:bg-[#E7C978]' : 'bg-brand text-white shadow-[0_2px_8px_rgba(53,16,92,0.25)] hover:bg-[#4a1880]'}`}
              aria-label={`Add ${product.name} to cart`}
            >
              {justAdded ? '✓ Added' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </>
        )}
      </div>
    </article>
  )
}
