import { fieldClassName, inputClassName, inputErrorClassName } from "../components/formStyles"
import { useEffect, useRef, useState } from 'react'
import { useApp } from '../context'
import { getProductById, getVariantById, formatPrice, formatStateList } from '../data'
import type { Order, PaymentStatus } from '../types'
import { apiRequest, jsonBody } from '../lib/api'

const PAYMENT_METHODS = ['Cash on Delivery', 'Bank Transfer'] as const

type PaymentMethod = (typeof PAYMENT_METHODS)[number]
type CheckoutStage = 'review' | 'processing' | 'success'

export default function Checkout() {
  const { cart, products, cartTotal, clearCart, addOrder, navigate, storeConfig, authUser, refreshProducts } = useApp()

  const [name, setName] = useState(authUser?.name ?? '')
  const [phone, setPhone] = useState(authUser?.phone ?? '')
  const [email, setEmail] = useState(authUser?.email ?? '')
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [payment, setPayment] = useState<PaymentMethod>('Cash on Delivery')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [reviewOpen, setReviewOpen] = useState(false)
  const [checkoutStage, setCheckoutStage] = useState<CheckoutStage>('review')

  const dialogRef = useRef<HTMLDivElement>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)
  const processingRef = useRef(false)
  const timersRef = useRef<number[]>([])

  const orderItems = cart
    .map((item) => {
      const product = products.find((candidate) => candidate.id === item.productId)
      const variant = product ? getVariantById(product, item.variantId) : undefined
      if (!product || !variant) return null
      return { product, variant, quantity: item.quantity }
    })
    .filter(Boolean) as Order['items']

  const deliveryStateLabel = formatStateList(storeConfig.deliveryStates)
  const isCashOnDelivery = payment === 'Cash on Delivery'
  const isProcessing = checkoutStage !== 'review'

  useEffect(() => {
    return () => timersRef.current.forEach((timer) => window.clearTimeout(timer))
  }, [])

  useEffect(() => {
    if (!reviewOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusFrame = window.requestAnimationFrame(() => dialogRef.current?.focus())

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && checkoutStage === 'review') closeReview()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.cancelAnimationFrame(focusFrame)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [reviewOpen, checkoutStage])

  function schedule(callback: () => void, delay: number) {
    const timer = window.setTimeout(callback, delay)
    timersRef.current.push(timer)
  }

  function validate() {
    const nextErrors: Record<string, string> = {}
    if (!name.trim()) nextErrors.name = 'Full name is required'
    if (!phone.trim()) nextErrors.phone = 'Phone number is required'
    if (!email.trim()) nextErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) nextErrors.email = 'Enter a valid email'
    if (!address.trim()) nextErrors.address = 'Delivery address is required'
    if (!state) nextErrors.state = 'Select a delivery state'
    if (orderItems.length === 0) nextErrors.cart = 'Your cart has no available items'
    return nextErrors
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setCheckoutStage('review')
    setReviewOpen(true)
  }

  function closeReview() {
    if (processingRef.current) return
    setReviewOpen(false)
    setCheckoutStage('review')
    window.requestAnimationFrame(() => submitButtonRef.current?.focus())
  }

  async function finalizeOrder(_paymentStatus: PaymentStatus) {
    if (orderItems.length === 0) {
      processingRef.current = false
      setReviewOpen(false)
      setCheckoutStage('review')
      setErrors({ cart: 'Your cart has no available items' })
      return
    }

    try {
      const { order } = await apiRequest<{ order: Order }>('/orders', {
        method: 'POST',
        body: jsonBody({ items: cart, address: `${address.trim()}, ${state} State`, deliveryState: state, paymentMethod: payment }),
      })
      addOrder(order)
      clearCart()
      void refreshProducts()
      processingRef.current = false
      setReviewOpen(false)
      navigate('order-confirmation', { orderId: order.id })
    } catch (reason) {
      processingRef.current = false
      setCheckoutStage('review')
      setErrors({ cart: reason instanceof Error ? reason.message : 'Unable to place your order.' })
    }
  }

  function confirmOrder() {
    if (processingRef.current) return
    processingRef.current = true
    setCheckoutStage('processing')

    void finalizeOrder(isCashOnDelivery ? 'Pending' : 'Pending')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--c-bg)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px',
          borderBottom: '1px solid var(--c-border)',
          backgroundColor: 'var(--c-surface)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <button
          onClick={() => navigate('cart')}
          aria-label="Go back to cart"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--c-primary)',
            fontWeight: 500,
            fontSize: '0.875rem',
            minHeight: 44,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Cart
        </button>
        <h1 style={{ flex: 1, textAlign: 'center', fontSize: '1rem', fontWeight: 600, margin: 0 }}>
          Checkout
        </h1>
        <div style={{ width: 80 }} />
      </div>

      <div style={{ padding: '20px 16px', maxWidth: 600, margin: '0 auto' }}>
        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <section aria-labelledby="contact-heading">
            <h2 id="contact-heading" style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--c-text)', marginBottom: 14 }}>
              Contact Information
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className={fieldClassName}>
                <label htmlFor="co-name">Full Name</label>
                <input
                  id="co-name"
                  type="text"
                  className={[inputClassName, errors.name && inputErrorClassName].filter(Boolean).join(" ")}
                  placeholder="Adewale Johnson"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                />
                {errors.name && <span className="error-msg">{errors.name}</span>}
              </div>
              <div className={fieldClassName}>
                <label htmlFor="co-phone">Phone Number</label>
                <input
                  id="co-phone"
                  type="tel"
                  className={[inputClassName, errors.phone && inputErrorClassName].filter(Boolean).join(" ")}
                  placeholder="08012345678"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  autoComplete="tel"
                  inputMode="tel"
                />
                {errors.phone && <span className="error-msg">{errors.phone}</span>}
              </div>
              <div className={fieldClassName}>
                <label htmlFor="co-email">Email Address</label>
                <input
                  id="co-email"
                  type="email"
                  className={[inputClassName, errors.email && inputErrorClassName].filter(Boolean).join(" ")}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  inputMode="email"
                />
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </div>
            </div>
          </section>

          <section aria-labelledby="delivery-heading">
            <h2 id="delivery-heading" style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--c-text)', marginBottom: 14 }}>
              Delivery Address
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className={fieldClassName}>
                <label htmlFor="co-address">Street Address</label>
                <input
                  id="co-address"
                  type="text"
                  className={[inputClassName, errors.address && inputErrorClassName].filter(Boolean).join(" ")}
                  placeholder="14 Celestial Close, Shagamu"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  autoComplete="street-address"
                />
                {errors.address && <span className="error-msg">{errors.address}</span>}
              </div>
              <div className={fieldClassName}>
                <label htmlFor="co-state">Delivery State</label>
                <select
                  id="co-state"
                  className={[inputClassName, errors.state && inputErrorClassName].filter(Boolean).join(" ")}
                  value={state}
                  onChange={(event) => setState(event.target.value)}
                  autoComplete="address-level1"
                >
                  <option value="">Select state…</option>
                  {storeConfig.deliveryStates.map((deliveryState) => (
                    <option key={deliveryState} value={deliveryState}>
                      {deliveryState} State
                    </option>
                  ))}
                </select>
                {errors.state && <span className="error-msg">{errors.state}</span>}
              </div>
              <div
                style={{
                  padding: '10px 12px',
                  backgroundColor: 'var(--c-cream)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.75rem',
                  color: 'var(--c-text2)',
                }}
              >
                We currently deliver to {deliveryStateLabel} States only.
              </div>
            </div>
          </section>

          <section aria-labelledby="payment-heading">
            <h2 id="payment-heading" style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--c-text)', marginBottom: 14 }}>
              Payment Method
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }} role="radiogroup" aria-labelledby="payment-heading">
              {PAYMENT_METHODS.map((method) => (
                <label
                  key={method}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '14px',
                    border: `1.5px solid ${payment === method ? 'var(--c-primary)' : 'var(--c-border)'}`,
                    borderRadius: 'var(--radius)',
                    cursor: 'pointer',
                    backgroundColor: payment === method ? 'rgba(53,16,92,0.04)' : 'var(--c-surface)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={payment === method}
                    onChange={() => setPayment(method)}
                    style={{ accentColor: 'var(--c-primary)', width: 18, height: 18 }}
                  />
                  <div>
                    <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--c-text)' }}>{method}</span>
                    {method === 'Card' && (
                      <p style={{ fontSize: '0.75rem', color: 'var(--c-text2)', margin: '2px 0 0' }}>
                        Processed securely via Paystack / Flutterwave
                      </p>
                    )}
                    {method === 'Bank Transfer' && (
                      <p style={{ fontSize: '0.75rem', color: 'var(--c-text2)', margin: '2px 0 0' }}>
                        Complete payment securely before your order is placed
                      </p>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </section>

          <section aria-labelledby="summary-heading" style={{ backgroundColor: 'var(--c-cream)', borderRadius: 'var(--radius)', padding: 16 }}>
            <h2 id="summary-heading" style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--c-text)', marginBottom: 12 }}>
              Order Summary
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
              {orderItems.map((item) => (
                <div key={`${item.product.id}-${item.variant.id}`} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: '0.8125rem' }}>
                  <span style={{ color: 'var(--c-text2)' }}>
                    {item.product.name}
                    {item.product.variants.length > 1 ? ` (${item.variant.label})` : ''} ×{item.quantity}
                  </span>
                  <span style={{ fontWeight: 600, color: 'var(--c-text)', flexShrink: 0 }}>
                    {formatPrice(item.variant.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid var(--c-border)' }}>
              <span style={{ fontWeight: 700, color: 'var(--c-text)' }}>Total</span>
              <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--c-primary)' }}>{formatPrice(cartTotal)}</span>
            </div>
          </section>

          {errors.cart && <span className="error-msg" role="alert">{errors.cart}</span>}

          <button
            ref={submitButtonRef}
            type="submit"
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-0 bg-brand px-[22px] py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(53,16,92,0.25)] transition duration-150 hover:bg-[#4a1880] hover:shadow-[0_4px_14px_rgba(53,16,92,0.35)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
            style={{ width: '100%', fontSize: '1rem', padding: '0.875rem' }}
          >
            Review Order
          </button>
        </form>
      </div>

      {reviewOpen && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isProcessing) closeReview()
          }}
        >
          <div
            ref={dialogRef}
            className="modal-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-review-title"
            tabIndex={-1}
            style={{ maxWidth: 500 }}
          >
            {checkoutStage === 'review' ? (
              <>
                <div style={{ padding: '22px 20px 16px', borderBottom: '1px solid var(--c-border)' }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'var(--c-cream)',
                      color: 'var(--c-primary)',
                      marginBottom: 12,
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                    </svg>
                  </div>
                  <h2 id="order-review-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.375rem', fontWeight: 700, color: 'var(--c-text)', margin: '0 0 6px' }}>
                    Confirm your order
                  </h2>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--c-text2)', lineHeight: 1.5, margin: 0 }}>
                    Check your delivery and payment details before continuing.
                  </p>
                </div>

                <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <section aria-label="Items">
                    <p style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--c-text2)', margin: '0 0 8px' }}>
                      Items
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {orderItems.map((item) => (
                        <div key={`${item.product.id}-${item.variant.id}`} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: '0.8125rem' }}>
                          <span style={{ color: 'var(--c-text)' }}>
                            {item.product.name}{item.product.variants.length > 1 ? ` · ${item.variant.label}` : ''} ×{item.quantity}
                          </span>
                          <span style={{ fontWeight: 600, color: 'var(--c-text)', flexShrink: 0 }}>
                            {formatPrice(item.variant.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, paddingTop: 14, borderTop: '1px solid var(--c-border)' }}>
                    <div>
                      <p style={{ fontSize: '0.6875rem', color: 'var(--c-text2)', margin: '0 0 4px' }}>Contact</p>
                      <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--c-text)', margin: '0 0 2px' }}>{name.trim()}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--c-text2)', margin: 0 }}>{phone.trim()}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--c-text2)', margin: 0, overflowWrap: 'anywhere' }}>{email.trim()}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.6875rem', color: 'var(--c-text2)', margin: '0 0 4px' }}>Deliver to</p>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--c-text)', lineHeight: 1.45, margin: 0 }}>
                        {address.trim()}, {state} State
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12, padding: '12px 14px', backgroundColor: 'var(--c-cream)', borderRadius: 'var(--radius)' }}>
                    <div>
                      <p style={{ fontSize: '0.6875rem', color: 'var(--c-text2)', margin: '0 0 3px' }}>Payment</p>
                      <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--c-text)', margin: 0 }}>{payment}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '0.6875rem', color: 'var(--c-text2)', margin: '0 0 3px' }}>Total</p>
                      <p style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--c-primary)', margin: 0 }}>{formatPrice(cartTotal)}</p>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10, padding: '0 20px 20px' }}>
                  <button type="button" className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-[1.5px] border-brand bg-transparent px-[22px] py-3 text-sm font-semibold text-brand transition duration-150 hover:bg-[#F7F0E3] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40" onClick={closeReview} style={{ flex: 1 }}>
                    Back to Edit
                  </button>
                  <button type="button" className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-0 bg-brand px-[22px] py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(53,16,92,0.25)] transition duration-150 hover:bg-[#4a1880] hover:shadow-[0_4px_14px_rgba(53,16,92,0.35)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40" onClick={confirmOrder} style={{ flex: 1 }}>
                    {isCashOnDelivery ? 'Place Order' : 'Proceed to Payment'}
                  </button>
                </div>
              </>
            ) : (
              <div
                aria-live="polite"
                style={{
                  minHeight: 300,
                  padding: '44px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                {checkoutStage === 'processing' ? (
                  <>
                    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="var(--c-primary)" strokeWidth="2" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite', marginBottom: 18 }}>
                      <path d="M21 12a9 9 0 11-6.22-8.56" />
                    </svg>
                    <h2 id="order-review-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 700, color: 'var(--c-text)', margin: '0 0 8px' }}>
                      {isCashOnDelivery ? 'Placing your order…' : 'Connecting securely…'}
                    </h2>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--c-text2)', lineHeight: 1.5, margin: 0 }}>
                      {isCashOnDelivery
                        ? 'Please wait while we confirm your order.'
                        : 'Handing your payment over to Paystack / Flutterwave.'}
                    </p>
                  </>
                ) : (
                  <>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--c-cream)', color: 'var(--c-success)', marginBottom: 18 }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <h2 id="order-review-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 700, color: 'var(--c-text)', margin: '0 0 8px' }}>
                      Payment successful
                    </h2>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--c-text2)', lineHeight: 1.5, margin: 0 }}>
                      Your payment was confirmed. We are placing your order now.
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
