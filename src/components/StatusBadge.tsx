import type { OrderStatus, PaymentStatus } from '../types'

type BadgeVariant = OrderStatus | PaymentStatus | 'Coming Soon'

const CONFIG: Record<string, { className: string; dot: string }> = {
  Delivered: { className: 'badge badge-delivered', dot: '#218739' },
  Cancelled: { className: 'badge badge-cancelled', dot: '#C62828' },
  Pending: { className: 'badge badge-pending', dot: '#B77900' },
  Confirmed: { className: 'badge badge-confirmed', dot: '#35105C' },
  Processing: { className: 'badge badge-processing', dot: '#2468A2' },
  'Out for Delivery': { className: 'badge badge-out-for-delivery', dot: '#b85c00' },
  'Coming Soon': { className: 'badge badge-coming-soon', dot: '#35105C' },
  Paid: { className: 'badge badge-paid', dot: '#218739' },
  Failed: { className: 'badge badge-failed', dot: '#C62828' },
}

interface StatusBadgeProps {
  status: BadgeVariant
  className?: string
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const config = CONFIG[status] ?? CONFIG.Pending
  return (
    <span className={`${config.className} ${className}`} aria-label={`Status: ${status}`}>
      <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden="true">
        <circle cx="3" cy="3" r="3" fill={config.dot} />
      </svg>
      {status}
    </span>
  )
}
