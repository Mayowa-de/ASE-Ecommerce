import { useApp } from '../context'
import { formatPrice } from '../data'

export default function OrderConfirmation() {
  const { navigate, orders, params } = useApp()
  const order = orders.find((o) => o.id === params.orderId) ?? orders[0]

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--c-bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '48px 16px 32px',
        textAlign: 'center',
      }}
    >
      {/* Success icon */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          backgroundColor: '#e8f5ec',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
          animation: 'popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--c-success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>

      <h1
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.375rem, 5vw, 1.75rem)',
          fontWeight: 700,
          color: 'var(--c-text)',
          marginBottom: 8,
        }}
      >
        Order Confirmed!
      </h1>
      <p style={{ fontSize: '0.9375rem', color: 'var(--c-text2)', marginBottom: 24, lineHeight: 1.5 }}>
        {order?.paymentStatus === 'Paid'
          ? 'Payment received. Your order has been placed and we will confirm your delivery details shortly.'
          : 'Your order has been placed. Payment will be collected on delivery.'}
      </p>

      {order && (
        <div
          style={{
            width: '100%',
            maxWidth: 440,
            backgroundColor: 'var(--c-surface)',
            border: '1px solid var(--c-border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            marginBottom: 24,
            textAlign: 'left',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--c-primary)',
              padding: '14px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.875rem' }}>
              Order #{order.id}
            </span>
            <span style={{ color: 'var(--c-champagne)', fontSize: '0.75rem' }}>{order.date}</span>
          </div>

          <div style={{ padding: 16 }}>
            {order.items.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.875rem',
                  padding: '6px 0',
                  borderBottom: i < order.items.length - 1 ? '1px solid var(--c-border)' : 'none',
                }}
              >
                <span style={{ color: 'var(--c-text)' }}>
                  {item.product.name}
                  {item.product.variants.length > 1 ? ` · ${item.variant.label}` : ''} ×{item.quantity}
                </span>
                <span style={{ fontWeight: 600, color: 'var(--c-text)' }}>
                  {formatPrice(item.variant.price * item.quantity)}
                </span>
              </div>
            ))}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 12,
                paddingTop: 12,
                borderTop: '2px solid var(--c-border)',
              }}
            >
              <span style={{ fontWeight: 700, color: 'var(--c-text)' }}>Total</span>
              <span style={{ fontWeight: 700, color: 'var(--c-primary)', fontSize: '1rem' }}>
                {formatPrice(order.total)}
              </span>
            </div>

            <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--c-border)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--c-text2)', marginBottom: 4 }}>Delivery address</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--c-text)' }}>{order.address}</div>
            </div>
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--c-text2)', marginBottom: 4 }}>Payment method</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--c-text)' }}>{order.paymentMethod}</div>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 440 }}>
        <button
          className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-0 bg-brand px-[22px] py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(53,16,92,0.25)] transition duration-150 hover:bg-[#4a1880] hover:shadow-[0_4px_14px_rgba(53,16,92,0.35)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => navigate('orders')}
          style={{ width: '100%' }}
        >
          Track My Orders
        </button>
        <button
          className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-[1.5px] border-brand bg-transparent px-[22px] py-3 text-sm font-semibold text-brand transition duration-150 hover:bg-[#F7F0E3] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => navigate('home')}
          style={{ width: '100%' }}
        >
          Continue Shopping
        </button>
      </div>

      <style>{`
        @keyframes popIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
