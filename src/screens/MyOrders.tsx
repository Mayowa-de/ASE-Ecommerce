import { useApp } from '../context'
import { formatPrice } from '../data'
import StatusBadge from '../components/StatusBadge'

export default function MyOrders() {
  const { orders, navigate, isLoggedIn } = useApp()

  if (!isLoggedIn) {
    return (
      <div style={{ padding: '48px 16px', textAlign: 'center' }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" style={{ color: 'var(--c-border)', margin: '0 auto 16px', display: 'block' }}>
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14,2 14,8 20,8" />
        </svg>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 700, color: 'var(--c-text)', marginBottom: 8 }}>
          Your orders
        </h2>
        <p style={{ color: 'var(--c-text2)', fontSize: '0.875rem', marginBottom: 24 }}>
          Sign in to view your order history.
        </p>
        <button className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-0 bg-brand px-[22px] py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(53,16,92,0.25)] transition duration-150 hover:bg-[#4a1880] hover:shadow-[0_4px_14px_rgba(53,16,92,0.35)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40" onClick={() => navigate('auth')}>
          Sign In
        </button>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div style={{ padding: '48px 16px', textAlign: 'center' }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" style={{ color: 'var(--c-border)', margin: '0 auto 16px', display: 'block' }}>
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14,2 14,8 20,8" />
        </svg>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 700, color: 'var(--c-text)', marginBottom: 8 }}>
          No orders yet
        </h2>
        <p style={{ color: 'var(--c-text2)', fontSize: '0.875rem', marginBottom: 24 }}>
          Your orders will appear here once you shop.
        </p>
        <button className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-0 bg-brand px-[22px] py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(53,16,92,0.25)] transition duration-150 hover:bg-[#4a1880] hover:shadow-[0_4px_14px_rgba(53,16,92,0.35)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40" onClick={() => navigate('shop')}>
          Browse Products
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: '16px 16px 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {orders.map((order) => (
          <button
            key={order.id}
            onClick={() => navigate('order-details', { orderId: order.id })}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              backgroundColor: 'var(--c-surface)',
              border: '1px solid var(--c-border)',
              borderRadius: 'var(--radius)',
              padding: '14px 16px',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
              WebkitTapHighlightColor: 'transparent',
              transition: 'box-shadow 0.15s ease',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(53,16,92,0.1)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = 'none')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--c-text)', margin: '0 0 3px' }}>
                  Order #{order.id}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--c-text2)', margin: 0 }}>
                  {new Date(order.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <StatusBadge status={order.status} />
            </div>

            <div style={{ fontSize: '0.8125rem', color: 'var(--c-text2)', lineHeight: 1.4 }}>
              {order.items.map((item, i) => (
                <span key={i}>
                  {item.product.name}
                  {item.quantity > 1 ? ` ×${item.quantity}` : ''}
                  {i < order.items.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--c-primary)' }}>
                {formatPrice(order.total)}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--c-text2)', display: 'flex', alignItems: 'center', gap: 4 }}>
                View details
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
