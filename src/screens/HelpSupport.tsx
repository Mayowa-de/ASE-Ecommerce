import { useApp } from '../context'
import { formatStateList } from '../data'

export default function HelpSupport() {
  const { storeConfig } = useApp()
  const waNumber = `234${storeConfig.whatsapp.replace(/^0/, '')}`
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent('Hello, I need help with my order on Adeola Spiritual Store.')}`

  return (
    <div style={{ padding: '20px 16px 32px' }}>
      <div className="mx-auto w-full max-w-[540px] px-4 md:px-6">
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 className="relative pb-2 font-serif text-[1.375rem] font-bold text-brand-ink after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-7 after:rounded-sm after:bg-brand-gold after:content-['']">
            Help & Support
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--c-text2)', marginTop: 12, lineHeight: 1.6 }}>
            We are here to help. Reach us via WhatsApp or visit our store in person.
          </p>
        </div>

        {/* WhatsApp CTA — primary */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '20px',
            backgroundColor: '#25D366',
            borderRadius: 'var(--radius-lg)',
            textDecoration: 'none',
            marginBottom: 16,
            boxShadow: '0 4px 16px rgba(37,211,102,0.28)',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.transform = 'translateY(-2px)'
            el.style.boxShadow = '0 8px 24px rgba(37,211,102,0.36)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.transform = 'translateY(0)'
            el.style.boxShadow = '0 4px 16px rgba(37,211,102,0.28)'
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: '1rem', color: '#fff', margin: '0 0 2px' }}>
              Chat on WhatsApp
            </p>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.85)', margin: 0 }}>
              {storeConfig.whatsapp} · Tap to start chat
            </p>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" style={{ marginLeft: 'auto', flexShrink: 0, opacity: 0.7 }}>
            <path d="M9 18l6-6-6-6" />
          </svg>
        </a>

        {/* Phone */}
        <a
          href={`tel:${storeConfig.phone}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '16px',
            backgroundColor: 'var(--c-surface)',
            borderRadius: 'var(--radius-lg)',
            textDecoration: 'none',
            marginBottom: 12,
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--c-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--c-primary)" strokeWidth="1.75" strokeLinecap="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9a2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.91 14a16 16 0 006.09 6.09l.37-.37a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
          </div>
          <div>
            <p style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--c-text)', margin: '0 0 2px' }}>Call us</p>
            <p style={{ fontSize: '0.875rem', color: 'var(--c-text2)', margin: 0 }}>{storeConfig.phone}</p>
          </div>
        </a>

        {/* Store location */}
        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--c-surface)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: 28,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--c-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--c-primary)" strokeWidth="1.75" strokeLinecap="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <p style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--c-text)', margin: '0 0 4px' }}>Visit our store</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--c-text2)', margin: '0 0 8px', lineHeight: 1.5 }}>
                {storeConfig.location}
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--c-text2)', margin: 0, fontStyle: 'italic' }}>
                Please call ahead to confirm opening hours
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.125rem', fontWeight: 700, color: 'var(--c-text)', marginBottom: 16 }}>
          Frequently Asked
        </h2>

        {[
          {
            q: 'Which states do you deliver to?',
            a: `We currently deliver to ${formatStateList(storeConfig.deliveryStates)} States only.`,
          },
          {
            q: 'How long does delivery take?',
            a: 'Delivery typically takes 1–3 business days depending on your location within the state.',
          },
          {
            q: 'What payment methods do you accept?',
            a: 'We accept Cash on Delivery, Bank Transfer, and card payments.',
          },
          {
            q: 'Can I return or exchange a product?',
            a: 'Due to the spiritual nature of our products, all sales are final unless the item was damaged or incorrect. Contact us within 48 hours of delivery.',
          },
          {
            q: 'How do I track my order?',
            a: 'Sign in to your account and go to My Orders to view your order status in real time.',
          },
        ].map(({ q, a }) => (
          <div
            key={q}
            style={{
              padding: '14px 16px',
              backgroundColor: 'var(--c-surface)',
              borderRadius: 'var(--radius)',
              marginBottom: 10,
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--c-text)', margin: '0 0 6px' }}>{q}</p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--c-text2)', margin: 0, lineHeight: 1.6 }}>{a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
