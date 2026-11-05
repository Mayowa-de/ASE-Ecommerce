import { useApp } from '../context'
import { getProductById, getVariantById, formatPrice, formatStateList } from '../data'
import ProductImage from '../components/ProductImage'
import QuantityControl from '../components/QuantityControl'

export default function Cart() {
  const { cart, products, updateQuantity, removeFromCart, cartTotal, navigate, isLoggedIn, storeConfig } = useApp()

  function handleCheckout() {
    if (!isLoggedIn) {
      navigate('auth')
    } else {
      navigate('checkout')
    }
  }

  if (cart.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 24px',
          textAlign: 'center',
          gap: 16,
        }}
      >
        <svg
          width="56"
          height="56"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          style={{ color: 'var(--c-border)', display: 'block' }}
        >
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        <div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--c-text)',
              marginBottom: 8,
            }}
          >
            Your cart is empty
          </h2>
          <p style={{ color: 'var(--c-text2)', fontSize: '0.875rem' }}>
            Browse our products and add items to get started.
          </p>
        </div>
        <button className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-0 bg-brand px-[22px] py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(53,16,92,0.25)] transition duration-150 hover:bg-[#4a1880] hover:shadow-[0_4px_14px_rgba(53,16,92,0.35)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40" onClick={() => navigate('shop')}>
          Browse Products
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: '16px 16px 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {cart.map((item) => {
          const product = products.find((candidate) => candidate.id === item.productId)
          const variant = product ? getVariantById(product, item.variantId) : undefined
          if (!product || !variant) return null

          const lineTotal = variant.price * item.quantity

          return (
            <article
              key={`${item.productId}-${item.variantId}`}
              style={{
                display: 'flex',
                gap: 12,
                backgroundColor: 'var(--c-surface)',
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--radius)',
                padding: 12,
              }}
            >
              {/* Thumbnail */}
              <div style={{ width: 72, flexShrink: 0 }}>
                <ProductImage category={product.category} size="sm" />
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        color: 'var(--c-text)',
                        margin: '0 0 2px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {product.name}
                    </p>
                    {product.variants.length > 1 && (
                      <p style={{ fontSize: '0.75rem', color: 'var(--c-text2)', margin: '0 0 6px' }}>
                        {variant.label}
                      </p>
                    )}
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: '0.9375rem',
                        color: 'var(--c-primary)',
                        margin: 0,
                      }}
                    >
                      {formatPrice(lineTotal)}
                    </p>
                  </div>
                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.productId, item.variantId)}
                    aria-label={`Remove ${product.name} from cart`}
                    style={{
                      flexShrink: 0,
                      width: 32,
                      height: 32,
                      minWidth: 44,
                      minHeight: 44,
                      margin: '-6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--c-text2)',
                      borderRadius: 6,
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <polyline points="3,6 5,6 21,6" />
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                    </svg>
                  </button>
                </div>
                {/* Qty control */}
                <div style={{ marginTop: 10 }}>
                  <QuantityControl
                    value={item.quantity}
                    onChange={(qty) => updateQuantity(item.productId, item.variantId, qty)}
                  />
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* Order summary */}
      <div
        style={{
          backgroundColor: 'var(--c-cream)',
          borderRadius: 'var(--radius)',
          padding: 16,
          marginBottom: 16,
        }}
      >
        <h2 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--c-text)', marginBottom: 12 }}>
          Order Summary
        </h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--c-text2)' }}>
            Subtotal ({cart.reduce((s, c) => s + c.quantity, 0)} items)
          </span>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--c-text)' }}>
            {formatPrice(cartTotal)}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid var(--c-border)' }}>
          <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--c-text)' }}>Total</span>
          <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--c-primary)' }}>
            {formatPrice(cartTotal)}
          </span>
        </div>
        <p style={{ fontSize: '0.6875rem', color: 'var(--c-text2)', marginTop: 6 }}>
          Delivery fee calculated at checkout. Available: {formatStateList(storeConfig.deliveryStates)}.
        </p>
      </div>

      {!isLoggedIn && (
        <div
          style={{
            backgroundColor: 'var(--c-surface)',
            border: '1px solid var(--c-border)',
            borderRadius: 'var(--radius)',
            padding: '12px 14px',
            marginBottom: 14,
            display: 'flex',
            gap: 10,
            alignItems: 'flex-start',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--c-info)" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <p style={{ fontSize: '0.8125rem', color: 'var(--c-text)', margin: 0, lineHeight: 1.4 }}>
            An account is required to place an order.{' '}
            <button
              onClick={() => navigate('auth')}
              style={{ color: 'var(--c-primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              Sign in or create account
            </button>
          </p>
        </div>
      )}

      <button
        className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-0 bg-brand px-[22px] py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(53,16,92,0.25)] transition duration-150 hover:bg-[#4a1880] hover:shadow-[0_4px_14px_rgba(53,16,92,0.35)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
        onClick={handleCheckout}
        style={{ width: '100%', marginBottom: 10 }}
      >
        Proceed to Checkout
      </button>
      <button
        className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-0 bg-transparent px-[22px] py-3 text-sm font-semibold text-brand transition duration-150 hover:bg-[#F7F0E3] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
        onClick={() => navigate('shop')}
        style={{ width: '100%', marginBottom: 4 }}
      >
        Continue Shopping
      </button>
    </div>
  )
}
