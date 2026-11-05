import { useApp } from '../context'
import { formatStateList } from '../data'

export default function PrivacyPolicy() {
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
        Privacy Policy
      </h1>
      <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: 24 }}>
        Effective date: 1 January 2024 · adeolaspiritualstore.com.ng
      </p>

      {[
        {
          title: '1. Information We Collect',
          body: 'We collect your name, email address, phone number, and delivery address when you place an order or create an account. We also collect order history and communication records related to your purchases.',
        },
        {
          title: '2. How We Use Your Information',
          body: 'Your information is used solely to process and deliver your orders, communicate order status updates, and improve our service. We do not sell or share your personal information with third parties for marketing purposes.',
        },
        {
          title: '3. Delivery Information',
          body: `Your name, phone number, and delivery address are shared only with our delivery partners and only to the extent necessary to complete your delivery. We currently deliver to ${formatStateList(storeConfig.deliveryStates)} States only.`,
        },
        {
          title: '4. Payment Information',
          body: 'We do not store card payment details on our servers. Card payments are processed securely by our payment providers (Paystack / Flutterwave). Bank transfer details are provided separately and are not stored beyond the transaction.',
        },
        {
          title: '5. Data Retention',
          body: 'We retain your account and order information for as long as your account is active or as required by applicable law. You may request deletion of your account and associated data at any time.',
        },
        {
          title: '6. Your Rights',
          body: 'You have the right to access, correct, or delete your personal information. To exercise these rights, contact us at adeolaspiritualstore.com.ng.',
        },
        {
          title: '7. Cookies',
          body: 'Necessary cookies support sign-in and account security. Analytics and marketing cookies are optional and are used only when you choose to allow them. You can change or withdraw your choice at any time using Cookie preferences below.',
        },
        {
          title: '8. Contact',
          body: 'For privacy-related questions, contact us at adeolaspiritualstore.com.ng.',
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
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event('ase:open-cookie-settings'))}
        className="mb-8 min-h-11 rounded-lg border border-brand px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        Cookie preferences
      </button>
    </div>
  )
}
