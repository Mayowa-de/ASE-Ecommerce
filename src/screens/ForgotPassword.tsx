import { fieldClassName, inputClassName, inputErrorClassName } from "../components/formStyles"
import { useState } from 'react'
import { useApp } from '../context'

type Step = 'email' | 'sent'

export default function ForgotPassword() {
  const { navigate } = useApp()
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError('Enter a valid email address')
      return
    }
    setError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep('sent')
    }, 1000)
  }

  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 16px' }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        {step === 'email' ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'var(--c-cream)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--c-primary)" strokeWidth="1.75" strokeLinecap="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--c-text)',
                  marginBottom: 8,
                }}
              >
                Forgot Password
              </h1>
              <p style={{ fontSize: '0.875rem', color: 'var(--c-text2)', lineHeight: 1.5 }}>
                Enter your email address and we will send you instructions to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className={fieldClassName}>
                <label htmlFor="fp-email">Email Address</label>
                <input
                  id="fp-email"
                  type="email"
                  className={[inputClassName, error && inputErrorClassName].filter(Boolean).join(" ")}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  inputMode="email"
                  autoComplete="email"
                  autoFocus
                />
                {error && <span className="error-msg">{error}</span>}
              </div>

              <button type="submit" className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-0 bg-brand px-[22px] py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(53,16,92,0.25)] transition duration-150 hover:bg-[#4a1880] hover:shadow-[0_4px_14px_rgba(53,16,92,0.35)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40" disabled={loading} style={{ width: '100%' }}>
                {loading ? 'Sending…' : 'Send Reset Instructions'}
              </button>

              <button
                type="button"
                className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-0 bg-transparent px-[22px] py-3 text-sm font-semibold text-brand transition duration-150 hover:bg-[#F7F0E3] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
                onClick={() => navigate('home')}
                style={{ width: '100%' }}
              >
                Back to Home
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: '#e8f5ec',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--c-success)" strokeWidth="2" strokeLinecap="round">
                <polyline points="20,6 9,17 4,12" />
              </svg>
            </div>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.375rem',
                fontWeight: 700,
                color: 'var(--c-text)',
                marginBottom: 12,
              }}
            >
              Check your email
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--c-text2)', lineHeight: 1.6, marginBottom: 28 }}>
              If an account exists for <strong style={{ color: 'var(--c-text)' }}>{email}</strong>, you will receive password reset instructions shortly.
            </p>
            <button className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-0 bg-brand px-[22px] py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(53,16,92,0.25)] transition duration-150 hover:bg-[#4a1880] hover:shadow-[0_4px_14px_rgba(53,16,92,0.35)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40" onClick={() => navigate('home')} style={{ width: '100%', marginBottom: 10 }}>
              Back to Home
            </button>
            <button
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-0 bg-transparent px-[22px] py-3 text-sm font-semibold text-brand transition duration-150 hover:bg-[#F7F0E3] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => setStep('email')}
              style={{ width: '100%', fontSize: '0.875rem' }}
            >
              Try a different email
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
