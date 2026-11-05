import { useEffect, useState } from 'react'
import { apiRequest } from '../lib/api'
import { formatPrice } from '../data'
import StatusBadge from '../components/StatusBadge'

interface DashboardData {
  totalOrders: number
  revenue: number
  pendingOrders: number
  activeProducts: number
  lowStockVariants: number
  deliveredOrders: number
  customerCount: number
  recentOrders: { id: string; customerName: string; itemCount: number; total: number; status: string; createdAt: string }[]
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [error, setError] = useState('')
  useEffect(() => { let active = true; void apiRequest<DashboardData>('/admin/dashboard').then((result) => { if (active) setData(result) }).catch((reason: Error) => { if (active) setError(reason.message) }); return () => { active = false } }, [])
  const cards = data ? [
    ['Total Orders', data.totalOrders, `${data.pendingOrders} pending`],
    ['Revenue', formatPrice(data.revenue), 'Paid orders'],
    ['Active Products', data.activeProducts, `${data.lowStockVariants} low stock variants`],
    ['Customers', data.customerCount, `${data.deliveredOrders} delivered orders`],
  ] : []
  return <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6">
    <header className="mb-6"><h1 className="font-serif text-2xl font-bold text-brand-ink">Dashboard</h1><p className="mt-1 text-sm text-brand-muted">Live store activity and order totals</p></header>
    {error && <div role="alert" className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</div>}
    {!data && !error && <p className="py-12 text-center text-sm text-brand-muted">Loading dashboard data…</p>}
    {data && <>
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">{cards.map(([label, value, sub]) => <article key={label} className="rounded-xl border border-brand-border bg-brand-surface p-4 shadow-sm"><p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">{label}</p><p className="mt-2 text-2xl font-bold text-brand-ink">{value}</p><p className="mt-1 text-xs text-brand-muted">{sub}</p></article>)}</section>
      <section className="mt-8 overflow-hidden rounded-xl border border-brand-border bg-brand-surface shadow-sm"><div className="border-b border-brand-border px-4 py-4"><h2 className="font-serif text-lg font-bold text-brand-ink">Recent Orders</h2></div>
        {data.recentOrders.length === 0 ? <p className="p-6 text-sm text-brand-muted">No orders have been placed yet.</p> : data.recentOrders.map((order) => <article key={order.id} className="flex flex-wrap items-center gap-3 border-b border-brand-border px-4 py-4 last:border-0"><div className="min-w-0 flex-1"><p className="font-semibold text-brand-ink">#{order.id}</p><p className="text-xs text-brand-muted">{order.customerName} · {order.itemCount} items · {new Date(order.createdAt).toLocaleDateString()}</p></div><StatusBadge status={order.status as 'Pending'} /><p className="w-full text-right font-bold text-brand">{formatPrice(order.total)}</p></article>)}
      </section>
    </>}
  </div>
}
