import { fieldClassName, inputClassName, inputErrorClassName } from "../components/formStyles"
import { useState } from 'react'
import { useApp } from '../context'

type Mode = 'login' | 'register'

export default function Auth() {
  const { signIn, register, navigate, goBack } = useApp()
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  function validate() {
    const e: Record<string, string> = {}
    if (mode === 'register' && !name.trim()) e.name = 'Full name is required'
    if (!email.trim()) e.email = 'Email address is required'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email address'
    if (!password) e.password = 'Password is required'
    else if (password.length < 8) e.password = 'Password must be at least 8 characters'
    if (mode === 'register' && !phone.trim()) e.phone = 'Phone number is required'
    return e
  }

  function clearFormError() {
    setErrors((previous) => {
      if (!previous.form) return previous
      const { form: _form, ...fieldErrors } = previous
      return fieldErrors
    })
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
      navigate('home')
    } catch (error) {
      setErrors({ form: error instanceof Error ? error.message : 'Unable to sign in.' })
    } finally { setLoading(false) }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--c-bg)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px 16px',
          borderBottom: '1px solid var(--c-border)',
          backgroundColor: 'var(--c-surface)',
        }}
      >
        <button
          onClick={goBack}
          aria-label="Go back"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--c-primary)',
            fontWeight: 500,
            fontSize: '0.875rem',
            padding: '4px 0',
            minHeight: 44,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>
      </div>

      <div style={{ flex: 1, padding: '32px 16px', maxWidth: 440, width: '100%', margin: '0 auto' }}>
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div
            style={{
              width: 52,
              height: 52,
              backgroundColor: 'var(--c-primary)',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: '1rem',
                color: 'var(--c-gold)',
              }}
            >
              ASE
            </span>
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--c-text)',
              marginBottom: 6,
            }}
          >
            {mode === 'login' ? 'Welcome back' : 'Create account'}
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--c-text2)' }}>
            {mode === 'login'
              ? 'Sign in to your ASE account to continue.'
              : 'Register to shop and track your orders.'}
          </p>
        </div>

        {/* Tab toggle */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 0,
            border: '1.5px solid var(--c-border)',
            borderRadius: 'var(--radius-sm)',
            overflow: 'hidden',
            marginBottom: 24,
          }}
          role="tablist"
        >
          {(['login', 'register'] as Mode[]).map((m) => (
            <button
              key={m}
              role="tab"
              aria-selected={mode === m}
              onClick={() => { setMode(m); setErrors({}) }}
              style={{
                padding: '10px',
                border: 'none',
                backgroundColor: mode === m ? 'var(--c-primary)' : 'var(--c-surface)',
                color: mode === m ? '#fff' : 'var(--c-text2)',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {m === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate aria-busy={loading} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {errors.form && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-800" role="alert" aria-live="assertive">{errors.form}</div>}
          {mode === 'register' && (
            <div className={fieldClassName}>
              <label htmlFor="fullname">Full Name</label>
              <input
                id="fullname"
                type="text"
                className={[inputClassName, errors.name && inputErrorClassName].filter(Boolean).join(" ")}
                placeholder="Adewale Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />
              {errors.name && <span className="error-msg">{errors.name}</span>}
            </div>
          )}

          <div className={fieldClassName}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className={[inputClassName, errors.email && inputErrorClassName].filter(Boolean).join(" ")}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearFormError() }}
              autoComplete="email"
              inputMode="email"
              required
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          {mode === 'register' && (
            <div className={fieldClassName}>
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                className={[inputClassName, errors.phone && inputErrorClassName].filter(Boolean).join(" ")}
                placeholder="08012345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                inputMode="tel"
                required
              />
              {errors.phone && <span className="error-msg">{errors.phone}</span>}
            </div>
          )}

          <div className={fieldClassName}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className={[inputClassName, errors.password && inputErrorClassName].filter(Boolean).join(" ")}
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => { setPassword(e.target.value); clearFormError() }}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              required
            />
            {errors.password && <span className="error-msg">{errors.password}</span>}
          </div>

          <button
            type="submit"
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-0 bg-brand px-[22px] py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(53,16,92,0.25)] transition duration-150 hover:bg-[#4a1880] hover:shadow-[0_4px_14px_rgba(53,16,92,0.35)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
            disabled={loading}
            style={{ width: '100%', marginTop: 4 }}
          >
            {loading ? <><svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg><span>Checking your details…</span></> : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p style={{ fontSize: '0.75rem', color: 'var(--c-text2)', textAlign: 'center', marginTop: 20, lineHeight: 1.5 }}>
          By continuing, you agree to our{' '}
          <button
            onClick={() => navigate('terms')}
            style={{ color: 'var(--c-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: 'inherit' }}
          >
            Terms & Conditions
          </button>{' '}
          and{' '}
          <button
            onClick={() => navigate('privacy')}
            style={{ color: 'var(--c-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: 'inherit' }}
          >
            Privacy Policy
          </button>
          .
        </p>
      </div>
    </div>
  )
}
