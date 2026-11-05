import { useApp } from '../context'
import { formatStateList } from '../data'

export default function Terms() {
  const { storeConfig } = useApp()

  return (
    <div
      style={{
        padding: '20px 16px',
        maxWidth: 680,
        margin: '0 auto',
        color: 'var(--c-text)',
      }}
    >
      <div
        style={{
          fontSize: '0.6875rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--c-text2)',
          marginBottom: 8,
          fontWeight: 500,
        }}
      >
        Legal
      </div>
      <h1
        style={{
          fontSize: '1.375rem',
          fontWeight: 700,
          color: 'var(--c-text)',
          marginBottom: 6,
          lineHeight: 1.2,
        }}
      >
        Terms &amp; Conditions
      </h1>
      <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: 24 }}>
        Effective date: 1 January 2024 · adeolaspiritualstore.com.ng
      </p>

      {[
        {
          title: '1. Acceptance of Terms',
          body: 'By using adeolaspiritualstore.com.ng and placing orders, you agree to these Terms & Conditions. If you do not agree, you may not use the platform.',
        },
        {
          title: '2. Account Requirement',
          body: 'A registered account is required to place orders. You are responsible for maintaining the security of your account credentials.',
        },
        {
          title: '3. Product Availability and Pricing',
          body: 'All prices are displayed in Nigerian Naira (₦) and are subject to change without notice. Product availability is not guaranteed. We reserve the right to cancel orders if a product is out of stock.',
        },
        {
          title: '4. Delivery',
          body: `We currently deliver to ${formatStateList(storeConfig.deliveryStates)} States only. Delivery timelines are estimates and may vary. We are not responsible for delays caused by external factors.`,
        },
        {
          title: '5. Payment',
          body: 'Accepted payment methods are Cash on Delivery, Bank Transfer, and Card (processed via Paystack / Flutterwave). Orders are confirmed upon successful payment verification.',
        },
        {
          title: '6. Returns and Cancellations',
          body: 'Due to the nature of spiritual and religious products, all sales are final unless the product was delivered damaged or incorrect. Contact us within 48 hours of delivery to report an issue.',
        },
        {
          title: '7. Product Reviews',
          body: 'Product Reviews are available to customers after a confirmed delivery. Reviews must be honest and respectful. We reserve the right to remove reviews that violate community standards.',
        },
        {
          title: '8. Intellectual Property',
          body: 'All content, including product descriptions, images, and brand materials, is the property of Adeola Spiritual Enterprises. Unauthorized reproduction is prohibited.',
        },
        {
          title: '9. Limitation of Liability',
          body: 'Adeola Spiritual Enterprises is not liable for indirect, incidental, or consequential damages arising from the use of this platform. Our total liability is limited to the value of the order in question.',
        },
        {
          title: '10. Contact',
          body: 'For questions regarding these terms, contact us at adeolaspiritualstore.com.ng.',
        },
      ].map(({ title, body }) => (
        <section key={title} style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--c-text)', marginBottom: 8 }}>
            {title}
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--c-text2)', lineHeight: 1.65, margin: 0 }}>
            {body}
          </p>
        </section>
      ))}
    </div>
  )
}
