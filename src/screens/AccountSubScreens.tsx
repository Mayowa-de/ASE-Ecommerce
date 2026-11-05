import { fieldClassName, inputClassName, inputErrorClassName } from "../components/formStyles"
import { useEffect, useState } from 'react'
import { useApp } from '../context'
import { getProductById, formatPrice } from '../data'
import ProductCard from '../components/ProductCard'

function SectionShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: '16px 16px 0' }}>
      {children}
    </div>
  )
}

// --- Profile ---
export function AccountProfile() {
  const { authUser, userName, updateProfile } = useApp()
  const [name, setName] = useState(authUser?.name ?? userName)
  const [email] = useState(authUser?.email ?? '')
  const [phone, setPhone] = useState(authUser?.phone ?? '')
  const [saved, setSaved] = useState(false)

  useEffect(() => { setName(authUser?.name ?? userName); setPhone(authUser?.phone ?? '') }, [authUser, userName])
  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    await updateProfile(name, phone)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <SectionShell title="Profile">
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className={fieldClassName}>
          <label htmlFor="pr-name">Full Name</label>
          <input id="pr-name" type="text" className={inputClassName} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </div>
        <div className={fieldClassName}>
          <label htmlFor="pr-email">Email Address</label>
          <input id="pr-email" type="email" className={inputClassName} value={email} readOnly autoComplete="email" inputMode="email" />
        </div>
        <div className={fieldClassName}>
          <label htmlFor="pr-phone">Phone Number</label>
          <input id="pr-phone" type="tel" className={inputClassName} value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" inputMode="tel" />
        </div>
        <button type="submit" className={`inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg px-[22px] py-3 text-sm font-semibold transition duration-150 active:scale-[0.97] ${saved ? 'border-0 bg-brand-gold text-[#24103D] shadow-[0_4px_16px_rgba(201,154,36,0.28)] hover:bg-[#E7C978]' : 'border-0 bg-brand text-white shadow-[0_2px_8px_rgba(53,16,92,0.25)] hover:bg-[#4a1880]'}`}>
          {saved ? '✓ Changes Saved' : 'Save Changes'}
        </button>
      </form>
    </SectionShell>
  )
}

// --- Wishlist ---
export function AccountWishlist() {
  const { wishlist, products } = useApp()
  const wishedProducts = products.filter((p) => wishlist.includes(p.id))

  if (wishedProducts.length === 0) {
    return (
      <SectionShell title="Wishlist">
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--c-text2)' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" style={{ margin: '0 auto 12px', display: 'block', opacity: 0.4 }}>
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
          <p style={{ fontWeight: 600, marginBottom: 4 }}>Your wishlist is empty</p>
          <p style={{ fontSize: '0.875rem' }}>Save products you love to find them easily later.</p>
        </div>
      </SectionShell>
    )
  }

  return (
    <SectionShell title="Wishlist">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
        {wishedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </SectionShell>
  )
}

// --- Product Reviews ---
export function AccountReviews() {
  const { orders, reviews, addReview } = useApp()
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered')
  const [selectedProduct, setSelectedProduct] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const reviewableProducts = deliveredOrders
    .flatMap((o) => o.items.map((i) => i.product))
    .filter((p, idx, arr) => arr.findIndex((q) => q.id === p.id) === idx)
    .filter((p) => !reviews.some((r) => r.productId === p.id))

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedProduct || !comment.trim()) return
    addReview({
      id: `rev-${Date.now()}`,
      productId: selectedProduct,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      authorName: 'You',
    })
    setSelectedProduct('')
    setComment('')
    setRating(5)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <SectionShell title="Product Reviews">
      {deliveredOrders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--c-text2)' }}>
          <p style={{ fontWeight: 600, marginBottom: 8 }}>No delivered orders yet</p>
          <p style={{ fontSize: '0.875rem' }}>Product Reviews unlock after an order is delivered.</p>
        </div>
      ) : reviewableProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--c-text2)' }}>
          <p style={{ fontWeight: 600, marginBottom: 8 }}>All products reviewed</p>
          <p style={{ fontSize: '0.875rem' }}>Thank you for your feedback!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {submitted && (
            <div style={{ padding: '12px 14px', backgroundColor: '#e8f5ec', borderRadius: 'var(--radius)', fontSize: '0.875rem', color: 'var(--c-success)', fontWeight: 500 }}>
              ✓ Review submitted. Thank you!
            </div>
          )}
          <div className={fieldClassName}>
            <label htmlFor="rv-product">Select Product</label>
            <select id="rv-product" className={inputClassName} value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} required>
              <option value="">Choose a product…</option>
              {reviewableProducts.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className={fieldClassName}>
            <label>Rating</label>
            <div style={{ display: 'flex', gap: 6 }} role="group" aria-label="Rating">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  aria-label={`${n} star${n > 1 ? 's' : ''}`}
                  aria-pressed={rating >= n}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', minWidth: 44, minHeight: 44 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill={rating >= n ? 'var(--c-gold)' : 'none'} stroke="var(--c-gold)" strokeWidth="1.5">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          <div className={fieldClassName}>
            <label htmlFor="rv-comment">Your Review</label>
            <textarea
              id="rv-comment"
              className={inputClassName}
              rows={4}
              placeholder="Share your experience with this product…"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              style={{ resize: 'vertical', fontFamily: 'inherit' }}
            />
          </div>
          <button type="submit" className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-0 bg-brand px-[22px] py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(53,16,92,0.25)] transition duration-150 hover:bg-[#4a1880] hover:shadow-[0_4px_14px_rgba(53,16,92,0.35)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40" style={{ width: '100%' }}>
            Submit Review
          </button>
        </form>
      )}

      {reviews.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--c-text)', marginBottom: 12 }}>Your Reviews</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {reviews.map((r) => {
              const product = getProductById(r.productId)
              return (
                <div key={r.id} style={{ padding: '12px 14px', backgroundColor: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: 'var(--radius)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--c-text)' }}>{product?.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--c-text2)' }}>{r.date}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 2, marginBottom: 6 }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < r.rating ? 'var(--c-gold)' : 'none'} stroke="var(--c-gold)" strokeWidth="1.5">
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                      </svg>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--c-text2)', margin: 0 }}>{r.comment}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </SectionShell>
  )
}

// --- Address Book ---
export function AccountAddresses() {
  const { addresses } = useApp()

  return (
    <SectionShell title="Address Book">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        {addresses.map((addr) => (
          <div
            key={addr.id}
            style={{
              padding: '14px 16px',
              backgroundColor: 'var(--c-surface)',
              border: `1.5px solid ${addr.isDefault ? 'var(--c-primary)' : 'var(--c-border)'}`,
              borderRadius: 'var(--radius)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--c-text)' }}>{addr.name}</span>
              {addr.isDefault && (
                <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--c-primary)', backgroundColor: 'rgba(53,16,92,0.08)', padding: '2px 8px', borderRadius: 100 }}>
                  Default
                </span>
              )}
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--c-text2)', margin: '0 0 4px' }}>{addr.phone}</p>
            <p style={{ fontSize: '0.875rem', color: 'var(--c-text2)', margin: 0 }}>{addr.street}, {addr.state} State</p>
          </div>
        ))}
      </div>
      <button className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-[1.5px] border-brand bg-transparent px-[22px] py-3 text-sm font-semibold text-brand transition duration-150 hover:bg-[#F7F0E3] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40" style={{ width: '100%' }}>
        + Add New Address
      </button>
    </SectionShell>
  )
}

// --- Preferences ---
export function AccountPreferences() {
  const [notifications, setNotifications] = useState(true)
  const [smsUpdates, setSmsUpdates] = useState(false)

  function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid var(--c-border)' }}>
        <span style={{ fontSize: '0.9375rem', color: 'var(--c-text)', fontWeight: 500 }}>{label}</span>
        <button
          role="switch"
          aria-checked={value}
          aria-label={label}
          onClick={() => onChange(!value)}
          style={{
            width: 44,
            height: 24,
            borderRadius: 12,
            backgroundColor: value ? 'var(--c-primary)' : 'var(--c-border)',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            transition: 'background 0.2s ease',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: 3,
              left: value ? 23 : 3,
              width: 18,
              height: 18,
              borderRadius: '50%',
              backgroundColor: '#fff',
              transition: 'left 0.2s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }}
          />
        </button>
      </div>
    )
  }

  return (
    <SectionShell title="Preferences">
      <div style={{ backgroundColor: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
        <Toggle value={notifications} onChange={setNotifications} label="Order Notifications" />
        <Toggle value={smsUpdates} onChange={setSmsUpdates} label="SMS Order Updates" />
      </div>
    </SectionShell>
  )
}
