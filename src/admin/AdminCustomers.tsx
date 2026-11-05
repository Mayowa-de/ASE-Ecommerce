import { useEffect, useState } from 'react'
import { apiRequest } from '../lib/api'
import type { Customer } from '../types'

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [error, setError] = useState('')
  useEffect(() => {
    let active = true
    void apiRequest<{ customers: (Omit<Customer, 'registeredAt'> & { createdAt: string })[] }>('/admin/customers')
      .then(({ customers: rows }) => { if (active) setCustomers(rows.map(({ createdAt, ...row }) => ({ ...row, registeredAt: createdAt }))) })
      .catch((reason: Error) => { if (active) setError(reason.message) })
    return () => { active = false }
  }, [])

  return (
    <div style={{ maxWidth: 800 }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: 'var(--c-text)', margin: '0 0 20px' }}>
        Customers
      </h1>

      <div style={{ backgroundColor: 'var(--c-surface)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        <div className="admin-customer-head" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 12, padding: '10px 16px', borderBottom: '1px solid var(--c-border)', backgroundColor: 'var(--c-cream)' }}>
          {['Customer', 'Contact', 'Orders'].map((h) => (
            <span key={h} style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--c-text2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</span>
          ))}
        </div>

        {error && <p role="alert" style={{ padding: 16, color: '#b91c1c' }}>{error}</p>}
        {customers.map((cust, i) => {
          return (
            <div
              key={cust.id}
              className="admin-customer-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr auto',
                gap: 12,
                padding: '14px 16px',
                borderBottom: i < customers.length - 1 ? '1px solid var(--c-border)' : 'none',
                alignItems: 'center',
              }}
            >
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--c-text)', margin: '0 0 2px' }}>
                  {cust.name}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--c-text2)', margin: 0 }}>
                  Joined {new Date(cust.registeredAt).toLocaleDateString('en-NG', { month: 'short', year: 'numeric' })}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--c-text)', margin: '0 0 2px' }}>{cust.email}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--c-text2)', margin: 0 }}>{cust.phone || '—'}</p>
              </div>
              <span
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: 'var(--c-primary)',
                  minWidth: 32,
                  textAlign: 'center',
                }}
              >
                {cust.orderCount}
              </span>
            </div>
          )
        })}

        {customers.length === 0 && (
          <p style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--c-text2)', fontSize: '0.875rem' }}>
            No customers yet.
          </p>
        )}
      </div>
    </div>
  )
}
