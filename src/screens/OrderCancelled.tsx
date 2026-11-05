import { useApp } from '../context'
import { formatPrice } from '../data'
import StatusBadge from '../components/StatusBadge'

export default function OrderCancelled() {
  const { navigate, orders, params } = useApp()
  const order = orders.find((o) => o.id === params.orderId) ?? orders.find((o) => o.status === 'Cancelled') ?? orders[0]

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 16px 24px',
        textAlign: 'center',
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          backgroundColor: '#fce8e8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--c-error)" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>

      <h1
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--c-text)',
          marginBottom: 8,
        }}
      >
        Order Cancelled
      </h1>
      <p style={{ fontSize: '0.9375rem', color: 'var(--c-text2)', marginBottom: 24, lineHeight: 1.5 }}>
        This order has been cancelled. If you believe this is a mistake, please contact us.
      </p>

      {order && (
        <div
          style={{
            width: '100%',
            maxWidth: 440,
            backgroundColor: 'var(--c-surface)',
            border: '1px solid var(--c-border)',
            borderRadius: 'var(--radius)',
            padding: 16,
            marginBottom: 24,
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--c-text)' }}>Order #{order.id}</span>
            <StatusBadge status="Cancelled" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--c-text2)' }}>Total</span>
            <span style={{ fontWeight: 700, color: 'var(--c-primary)' }}>{formatPrice(order.total)}</span>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 440 }}>
        <button
          className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-0 bg-brand px-[22px] py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(53,16,92,0.25)] transition duration-150 hover:bg-[#4a1880] hover:shadow-[0_4px_14px_rgba(53,16,92,0.35)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => navigate('shop')}
          style={{ width: '100%' }}
        >
          Shop Again
        </button>
        <button
          className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-[1.5px] border-brand bg-transparent px-[22px] py-3 text-sm font-semibold text-brand transition duration-150 hover:bg-[#F7F0E3] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => navigate('orders')}
          style={{ width: '100%' }}
        >
          View All Orders
        </button>
      </div>
    </div>
  )
}
