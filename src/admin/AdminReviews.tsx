import { useApp } from '../context'

export default function AdminReviews() {
  const { reviews, removeReview, products } = useApp()

  function getProductName(id: string) {
    return products.find((p) => p.id === id)?.name ?? id
  }

  return (
    <div style={{ maxWidth: 720 }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: 'var(--c-text)', margin: '0 0 20px' }}>
        Reviews
      </h1>

      {reviews.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--c-text2)' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" style={{ margin: '0 auto 16px', display: 'block', color: 'var(--c-border)' }}>
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
          </svg>
          <p style={{ fontSize: '0.875rem' }}>No reviews yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {reviews.map((review) => (
            <div
              key={review.id}
              style={{
                padding: '14px 16px',
                backgroundColor: 'var(--c-surface)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                gap: 14,
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--c-text)' }}>
                    {review.authorName}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--c-text2)' }}>·</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--c-primary)', fontWeight: 500 }}>
                    {getProductName(review.productId)}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 2, marginBottom: 6 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < review.rating ? 'var(--c-gold)' : 'none'} stroke="var(--c-gold)" strokeWidth="1.5">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                    </svg>
                  ))}
                  <span style={{ fontSize: '0.75rem', color: 'var(--c-text2)', marginLeft: 4 }}>{review.date}</span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--c-text2)', margin: 0, lineHeight: 1.5 }}>
                  {review.comment}
                </p>
              </div>
              <button
                onClick={() => {
                  if (confirm('Remove this review?')) removeReview(review.id)
                }}
                style={{
                  alignSelf: 'flex-start',
                  padding: '6px 8px',
                  background: 'none',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  color: 'var(--c-error)',
                  flexShrink: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14H6L5 6"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
