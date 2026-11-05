import { useEffect, useState } from 'react'

const CONSENT_KEY = 'ase-cookie-consent-v1'
const OPEN_SETTINGS_EVENT = 'ase:open-cookie-settings'

type CookieConsent = {
  necessary: true
  analytics: boolean
  marketing: boolean
  savedAt: string
  version: 1
}

const necessaryOnly = (): CookieConsent => ({
  necessary: true,
  analytics: false,
  marketing: false,
  savedAt: new Date().toISOString(),
  version: 1,
})

function readConsent(): CookieConsent | null {
  try {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) return null
    const value = JSON.parse(stored) as Partial<CookieConsent>
    if (value.version !== 1 || typeof value.analytics !== 'boolean' || typeof value.marketing !== 'boolean') return null
    return { necessary: true, analytics: value.analytics, marketing: value.marketing, savedAt: value.savedAt ?? '', version: 1 }
  } catch {
    return null
  }
}

export default function CookieConsentBanner() {
  const [consent, setConsent] = useState<CookieConsent | null>(readConsent)
  const [customizing, setCustomizing] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    const openSettings = () => {
      const saved = readConsent()
      setAnalytics(saved?.analytics ?? false)
      setMarketing(saved?.marketing ?? false)
      setCustomizing(true)
      setConsent(null)
    }
    window.addEventListener(OPEN_SETTINGS_EVENT, openSettings)
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, openSettings)
  }, [])

  const save = (choice: CookieConsent) => {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(choice))
    } catch {
      // Keep the choice for this visit if browser storage is unavailable.
    }
    setConsent(choice)
    setCustomizing(false)
  }

  if (consent && !customizing) return null

  return (
    <section className="fixed inset-x-0 bottom-0 z-[120] border-t border-brand-border bg-brand-surface shadow-[0_-10px_35px_rgba(26,8,48,0.18)]" aria-label="Cookie preferences" aria-live="polite">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:py-5">
        <div className="min-w-0 flex-1">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-brand">Your privacy choices</p>
          <h2 className="mt-1 font-serif text-lg font-bold text-brand-ink">Cookies that support your experience</h2>
          <p className="mt-1 max-w-3xl text-xs leading-5 text-brand-muted sm:text-sm">
            Necessary cookies support sign-in and account security. With your permission, analytics can help improve the store and marketing cookies can measure relevant promotions. Your choice is saved on this device.
            {' '}<a href="/privacy" className="font-semibold text-brand underline underline-offset-2">Privacy policy</a>
          </p>
          {customizing && (
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <label className="flex min-h-14 items-center gap-2 rounded-lg border border-brand-border bg-background px-3 py-2 text-xs">
                <input type="checkbox" checked readOnly aria-label="Necessary cookies, always on" className="size-4 accent-brand" />
                <span className="min-w-0 flex-1"><strong className="block text-brand-ink">Necessary</strong><small className="mt-0.5 block leading-4 text-brand-muted">Sign-in and account security</small></span>
                <em className="shrink-0 text-[0.65rem] not-italic font-semibold text-brand-muted">Always on</em>
              </label>
              <label className="flex min-h-14 items-center gap-2 rounded-lg border border-brand-border bg-background px-3 py-2 text-xs">
                <input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} className="size-4 accent-brand" />
                <span className="min-w-0"><strong className="block text-brand-ink">Analytics</strong><small className="mt-0.5 block leading-4 text-brand-muted">Help us understand and improve store usage</small></span>
              </label>
              <label className="flex min-h-14 items-center gap-2 rounded-lg border border-brand-border bg-background px-3 py-2 text-xs">
                <input type="checkbox" checked={marketing} onChange={(event) => setMarketing(event.target.checked)} className="size-4 accent-brand" />
                <span className="min-w-0"><strong className="block text-brand-ink">Marketing</strong><small className="mt-0.5 block leading-4 text-brand-muted">Measure relevant promotions and campaigns</small></span>
              </label>
            </div>
          )}
        </div>
        <div className="grid w-full shrink-0 grid-cols-1 gap-2 sm:grid-cols-3 lg:w-[380px] lg:grid-cols-1 xl:grid-cols-3">
          <button type="button" className="min-h-11 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand" onClick={() => save({ necessary: true, analytics: true, marketing: true, savedAt: new Date().toISOString(), version: 1 })}>
            Accept all
          </button>
          <button type="button" className="min-h-11 rounded-lg border border-brand px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand" onClick={() => save(necessaryOnly())}>
            Only necessary
          </button>
          {!customizing ? (
            <button type="button" className="min-h-11 rounded-lg border border-brand-border px-4 py-2 text-sm font-semibold text-brand-ink transition hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand" onClick={() => { setAnalytics(false); setMarketing(false); setCustomizing(true) }}>
              Customize
            </button>
          ) : (
            <>
              <button type="button" className="min-h-11 rounded-lg border border-brand px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand" onClick={() => save({ necessary: true, analytics, marketing, savedAt: new Date().toISOString(), version: 1 })}>
                Save my choices
              </button>
              <button type="button" className="min-h-11 rounded-lg border border-brand-border px-4 py-2 text-sm font-semibold text-brand-ink transition hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand" onClick={() => { setCustomizing(false); setConsent(readConsent()) }}>Cancel</button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
