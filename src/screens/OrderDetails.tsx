import { useApp } from '../context'
import { formatPrice } from '../data'
import StatusBadge from '../components/StatusBadge'
import ProductImage from '../components/ProductImage'

export default function OrderDetails() {
  const { orders, params, navigate } = useApp()
  const order = orders.find((o) => o.id === params.orderId) ?? orders[0]

  if (!order) {
    return (
      <div style={{ padding: '48px 16px', textAlign: 'center', color: 'var(--c-text2)' }}>
        <p>Order not found.</p>
        <button className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-0 bg-brand px-[22px] py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(53,16,92,0.25)] transition duration-150 hover:bg-[#4a1880] hover:shadow-[0_4px_14px_rgba(53,16,92,0.35)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40" onClick={() => navigate('orders')} style={{ marginTop: 16 }}>
          My Orders
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: '16px 16px 0' }}>
      {/* Order header */}
      <div
        style={{
          backgroundColor: 'var(--c-surface)',
          border: '1px solid var(--c-border)',
          borderRadius: 'var(--radius)',
          padding: '14px 16px',
          marginBottom: 14,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--c-text)', margin: '0 0 4px' }}>
              Order #{order.id}
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--c-text2)', margin: 0 }}>
              Placed on {new Date(order.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <StatusBadge status={order.status} />
        </div>
      </div>

      {/* Items */}
      <div style={{ marginBottom: 14 }}>
        <h2 style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--c-text2)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Items
        </h2>
        <div
          style={{
            backgroundColor: 'var(--c-surface)',
            border: '1px solid var(--c-border)',
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
          }}
        >
          {order.items.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 12,
                padding: '12px 14px',
                borderBottom: i < order.items.length - 1 ? '1px solid var(--c-border)' : 'none',
                alignItems: 'center',
              }}
            >
              <div style={{ width: 56, flexShrink: 0 }}>
                <ProductImage category={item.product.category} size="sm" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--c-text)', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.product.name}
                </p>
                {item.product.variants.length > 1 && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--c-text2)', margin: '0 0 2px' }}>
                    {item.variant.label}
                  </p>
                )}
                <p style={{ fontSize: '0.75rem', color: 'var(--c-text2)', margin: 0 }}>
                  Qty: {item.quantity}
                </p>
              </div>
              <p style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--c-primary)', flexShrink: 0 }}>
                {formatPrice(item.variant.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div
        style={{
          backgroundColor: 'var(--c-cream)',
          borderRadius: 'var(--radius)',
          padding: '14px 16px',
          marginBottom: 14,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--c-text2)' }}>Subtotal</span>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--c-text)' }}>{formatPrice(order.total)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid var(--c-border)' }}>
          <span style={{ fontWeight: 700, color: 'var(--c-text)' }}>Total Paid</span>
          <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--c-primary)' }}>{formatPrice(order.total)}</span>
        </div>
      </div>

      {/* Delivery details */}
      <div style={{ backgroundColor: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: 'var(--radius)', padding: '14px 16px', marginBottom: 14 }}>
        <h2 style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--c-text2)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Delivery Details
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--c-text2)', margin: '0 0 3px' }}>Delivery address</p>
            <p style={{ fontSize: '0.875rem', color: 'var(--c-text)', margin: 0 }}>{order.address}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--c-text2)', margin: '0 0 3px' }}>Payment method</p>
            <p style={{ fontSize: '0.875rem', color: 'var(--c-text)', margin: 0 }}>{order.paymentMethod}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--c-text2)', margin: '0 0 3px' }}>Status</p>
            <StatusBadge status={order.status} />
          </div>
        </div>
      </div>

      {order.status === 'Delivered' && (
        <button
          className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-[1.5px] border-brand bg-transparent px-[22px] py-3 text-sm font-semibold text-brand transition duration-150 hover:bg-[#F7F0E3] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => navigate('account-reviews')}
          style={{ width: '100%', marginBottom: 10 }}
        >
          Write a Product Review
        </button>
      )}

      {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
        <div
          style={{
            padding: '12px 14px',
            backgroundColor: 'var(--c-cream)',
            borderRadius: 'var(--radius)',
            fontSize: '0.8125rem',
            color: 'var(--c-text2)',
            marginBottom: 10,
          }}
        >
          Need help with this order? Contact us at{' '}
          <strong style={{ color: 'var(--c-primary)' }}>adeolaspiritualstore.com.ng</strong>
        </div>
      )}
    </div>
  )
}
