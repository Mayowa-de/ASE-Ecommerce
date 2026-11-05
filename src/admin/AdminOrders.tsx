import { fieldClassName, inputClassName, inputErrorClassName } from "../components/formStyles"
import { useState } from 'react'
import { useApp } from '../context'
import { formatPrice } from '../data'
import StatusBadge from '../components/StatusBadge'
import type { OrderStatus } from '../types'

const STATUSES: OrderStatus[] = ['Pending', 'Confirmed', 'Processing', 'Out for Delivery', 'Delivered', 'Cancelled']

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useApp()
  const [search, setSearch] = useState('')

  const filtered = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.deliveryState.toLowerCase().includes(search.toLowerCase())
  )

  const sorted = [...filtered].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div style={{ maxWidth: 900 }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: 'var(--c-text)', margin: '0 0 4px' }}>
          Orders
        </h1>
        <p style={{ fontSize: '0.8125rem', color: 'var(--c-text2)', margin: 0 }}>
          {orders.length} order{orders.length !== 1 ? 's' : ''} total
        </p>
      </div>

      <div style={{ position: 'relative', marginBottom: 16 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--c-text2)" strokeWidth="1.75" strokeLinecap="round" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        </svg>
        <input
          type="search"
          className={inputClassName}
          placeholder="Search by order ID or state…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ paddingLeft: 38 }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {sorted.map((order) => (
          <div
            key={order.id}
            style={{
              backgroundColor: 'var(--c-surface)',
              borderRadius: 'var(--radius-lg)',
              padding: '14px 16px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--c-text)', margin: '0 0 3px' }}>
                  #{order.id}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--c-text2)', margin: 0 }}>
                  {new Date(order.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })} · {order.deliveryState}
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                <StatusBadge status={order.paymentStatus} />
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--c-primary)' }}>
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.8125rem', color: 'var(--c-text2)', margin: '0 0 12px', lineHeight: 1.4 }}>
              {order.items.map((it) => `${it.product.name} ×${it.quantity}`).join(', ')}
            </p>

            {/* Status update */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--c-text2)', flexShrink: 0 }}>Status:</span>
              <select
                className={inputClassName}
                value={order.status}
                onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                style={{ minHeight: 36, fontSize: '0.8125rem', flex: 1 }}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <StatusBadge status={order.status} />
            </div>
          </div>
        ))}

        {sorted.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--c-text2)', padding: '32px 0', fontSize: '0.875rem' }}>
            No orders found.
          </p>
        )}
      </div>
    </div>
  )
}
