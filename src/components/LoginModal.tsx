import { fieldClassName, inputClassName, inputErrorClassName } from "./formStyles"
import { useState, useEffect } from 'react'
import { useApp } from '../context'

type Mode = 'login' | 'register'

export default function LoginModal() {
  const { loginModalOpen, setLoginModalOpen, signIn, register } = useApp()
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [showPwd, setShowPwd] = useState(false)

  useEffect(() => {
    if (loginModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [loginModalOpen])

  useEffect(() => {
    if (!loginModalOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [loginModalOpen])

  if (!loginModalOpen) return null

  function reset() {
    setEmail(''); setPassword(''); setConfirmPassword('')
    setName(''); setPhone(''); setErrors({}); setLoading(false); setShowPwd(false)
  }

  function close() { setLoginModalOpen(false); reset() }

  function switchMode(m: Mode) { setMode(m); setErrors({}) }

  function clearFormError() {
    setErrors((previous) => {
      if (!previous.form) return previous
      const { form: _form, ...fieldErrors } = previous
      return fieldErrors
    })
  }

  function validate() {
    const e: Record<string, string> = {}
    if (mode === 'register' && !name.trim()) e.name = 'Full name is required'
    if (!email.trim()) e.email = 'Email address is required'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email address'
    if (!password) e.password = 'Password is required'
    else if (password.length < 8) e.password = 'Minimum 8 characters'
    if (mode === 'register' && password && confirmPassword && password !== confirmPassword)
      e.confirmPassword = 'Passwords do not match'
    if (mode === 'register' && !phone.trim()) e.phone = 'Phone number is required'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setLoading(true)
    try {
      if (mode === 'login') await signIn(email, password)
      else await register(name, email, phone, password)
      close()
    } catch (error) {
      setErrors({ form: error instanceof Error ? error.message : 'Unable to sign in.' })
    } finally { setLoading(false) }
  }

  const eyeIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      {showPwd
        ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
        : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
      }
    </svg>
  )

  return (
    <div className="modal-backdrop" onClick={close} aria-hidden="false">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={mode === 'login' ? 'Sign in' : 'Create account'}
        className="modal-sheet"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Purple gradient header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1a0830 0%, #35105C 60%, #4e1880 100%)',
            borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
            padding: '32px 28px 28px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative orbs */}
          <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(201,154,36,0.12)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -20, left: 10, width: 80, height: 80, borderRadius: '50%', background: 'rgba(201,154,36,0.08)', pointerEvents: 'none' }} />

          {/* Close button */}
          <button
            onClick={close}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.12)',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.7)',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.22)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Logo mark */}
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: 'rgba(201,154,36,0.18)',
              border: '1.5px solid rgba(201,154,36,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}
          >
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '0.9375rem', color: 'var(--c-gold)', letterSpacing: '0.02em' }}>
              ASE
            </span>
          </div>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.375rem', fontWeight: 700, color: '#fff', margin: '0 0 4px', lineHeight: 1.25 }}>
            {mode === 'login' ? 'Welcome back' : 'Join our community'}
          </h2>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
            {mode === 'login'
              ? 'Sign in to track orders & manage your account'
              : 'Create an account to shop and track your orders'}
          </p>

          {/* Faith tagline */}
          <p style={{ fontSize: '0.6875rem', color: 'rgba(201,154,36,0.8)', margin: '12px 0 0', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
            Faith · Purity · Blessings
          </p>
        </div>

        {/* Form area */}
        <div style={{ padding: '24px 28px 28px' }}>
          {/* Tab toggle */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              background: 'var(--c-cream)',
              borderRadius: 'var(--radius-sm)',
              padding: 3,
              marginBottom: 22,
            }}
            role="tablist"
          >
            {(['login', 'register'] as Mode[]).map((m) => (
              <button
                key={m}
                role="tab"
                aria-selected={mode === m}
                onClick={() => switchMode(m)}
                style={{
                  padding: '9px 12px',
                  border: 'none',
                  borderRadius: 'calc(var(--radius-sm) - 2px)',
                  backgroundColor: mode === m ? 'var(--c-surface)' : 'transparent',
                  color: mode === m ? 'var(--c-primary)' : 'var(--c-text2)',
                  fontWeight: mode === m ? 600 : 500,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  WebkitTapHighlightColor: 'transparent',
                  boxShadow: mode === m ? 'var(--shadow-sm)' : 'none',
                }}
              >
                {m === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} noValidate aria-busy={loading} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {errors.form && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-800" role="alert" aria-live="assertive">{errors.form}</div>}
            {mode === 'register' && (
              <div className={fieldClassName}>
                <label htmlFor="modal-fullname">Full Name</label>
                <input
                  id="modal-fullname"
                  type="text"
                  className={[inputClassName, errors.name && inputErrorClassName].filter(Boolean).join(" ")}
                  placeholder="Adewale Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
                {errors.name && <span className="error-msg">{errors.name}</span>}
              </div>
            )}

            <div className={fieldClassName}>
              <label htmlFor="modal-email">Email Address</label>
              <input
                id="modal-email"
                type="email"
                className={[inputClassName, errors.email && inputErrorClassName].filter(Boolean).join(" ")}
                placeholder="you@example.com"
                value={email}
                  onChange={(e) => { setEmail(e.target.value); clearFormError() }}
                autoComplete="email"
                inputMode="email"
              />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            {mode === 'register' && (
              <div className={fieldClassName}>
                <label htmlFor="modal-phone">Phone Number</label>
                <input
                  id="modal-phone"
                  type="tel"
                  className={[inputClassName, errors.phone && inputErrorClassName].filter(Boolean).join(" ")}
                  placeholder="08012345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  inputMode="tel"
                />
                {errors.phone && <span className="error-msg">{errors.phone}</span>}
              </div>
            )}

            <div className={fieldClassName}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label htmlFor="modal-password">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => { close(); navigate('forgot-password') }}
                    style={{ fontSize: '0.75rem', color: 'var(--c-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 500 }}
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  id="modal-password"
                  type={showPwd ? 'text' : 'password'}
                  className={[inputClassName, errors.password && inputErrorClassName].filter(Boolean).join(" ")}
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearFormError() }}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  style={{ paddingRight: 44 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  aria-label={showPwd ? 'Hide password' : 'Show password'}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--c-text2)', padding: 4 }}
                >
                  {eyeIcon}
                </button>
              </div>
              {errors.password && <span className="error-msg">{errors.password}</span>}
            </div>

            {mode === 'register' && (
              <div className={fieldClassName}>
                <label htmlFor="modal-confirm-password">Confirm Password</label>
                <input
                  id="modal-confirm-password"
                  type="password"
                  className={[inputClassName, errors.confirmPassword && inputErrorClassName].filter(Boolean).join(" ")}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
                {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}
              </div>
            )}

            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-0 bg-brand px-[22px] py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(53,16,92,0.25)] transition duration-150 hover:bg-[#4a1880] hover:shadow-[0_4px_14px_rgba(53,16,92,0.35)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
              disabled={loading}
              style={{ width: '100%', marginTop: 6, fontSize: '0.9375rem', padding: '0.8125rem' }}
            >
              {loading
                ? <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}>
                      <path d="M21 12a9 9 0 11-6.219-8.56"/>
                    </svg>
                    Please wait…
                  </span>
                : mode === 'login' ? 'Sign In' : 'Create Account'
              }
            </button>
          </form>

          <p style={{ fontSize: '0.6875rem', color: 'var(--c-text2)', textAlign: 'center', marginTop: 18, lineHeight: 1.7 }}>
            By continuing you agree to our{' '}
            <button onClick={() => { close(); navigate('terms') }} style={{ color: 'var(--c-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: 'inherit', fontWeight: 500 }}>Terms</button>
            {' '}and{' '}
            <button onClick={() => { close(); navigate('privacy') }} style={{ color: 'var(--c-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: 'inherit', fontWeight: 500 }}>Privacy Policy</button>
          </p>
        </div>
      </div>
    </div>
  )
}
