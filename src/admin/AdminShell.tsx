import { useEffect, useState } from 'react'
import { useApp } from '../context'
import type { Screen } from '../types'

interface AdminNavItem {
  label: string
  screen: Screen
  icon: React.ReactNode
}

const NAV_ITEMS: AdminNavItem[] = [
  {
    label: 'Dashboard',
    screen: 'admin-dashboard',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  },
  {
    label: 'Products',
    screen: 'admin-products',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
  },
  {
    label: 'Categories',
    screen: 'admin-categories',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>,
  },
  {
    label: 'Orders',
    screen: 'admin-orders',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="9" y1="13" x2="15" y2="13"/></svg>,
  },
  {
    label: 'Customers',
    screen: 'admin-customers',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  },
  {
    label: 'Homepage',
    screen: 'admin-homepage',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
  },
  {
    label: 'Reviews',
    screen: 'admin-reviews',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>,
  },
  {
    label: 'Settings',
    screen: 'admin-settings',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  },
  {
    label: 'Design Handoff',
    screen: 'design-handoff',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { screen, navigate, signOut, previewMode } = useApp()
  const [moreOpen, setMoreOpen] = useState(false)
  const [showBottomNav, setShowBottomNav] = useState(() =>
    window.matchMedia('(max-width: 997px)').matches,
  )

  useEffect(() => {
    const viewport = window.matchMedia('(max-width: 997px)')
    const updateBottomNav = () => setShowBottomNav(viewport.matches)
    updateBottomNav()
    viewport.addEventListener('change', updateBottomNav)
    return () => viewport.removeEventListener('change', updateBottomNav)
  }, [])

  const currentLabel = NAV_ITEMS.find((n) => n.screen === screen)?.label ?? 'Admin'

  return (
    <div style={{ minHeight: '100%', height: previewMode ? '100%' : undefined, position: 'relative', overflow: previewMode ? 'hidden' : undefined, display: 'flex', flexDirection: 'column', backgroundColor: 'var(--c-bg)' }}>
      {/* Desktop sidebar */}
      <aside
        className="admin-sidebar"
        style={previewMode ? { background: '#1a0830', position: 'absolute', display: 'flex' } : { background: '#1a0830' }}
      >
        {/* Logo */}
        <div style={{ padding: '20px 20px 12px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 32, height: 32, background: 'var(--c-primary)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '0.6875rem', color: 'var(--c-gold)' }}>ASE</span>
            </div>
            <div>
              <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1 }}>Admin Panel</p>
              <p style={{ fontSize: '0.625rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>Adeola Spiritual</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: '10px 12px', flex: 1 }}>
          {NAV_ITEMS.map((item) => {
            const active = screen === item.screen
            return (
              <button
                key={item.screen}
                onClick={() => navigate(item.screen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: 'none',
                  background: active ? 'rgba(255,255,255,0.12)' : 'none',
                  color: active ? '#fff' : 'rgba(255,255,255,0.55)',
                  fontSize: '0.875rem',
                  fontWeight: active ? 600 : 400,
                  cursor: 'pointer',
                  textAlign: 'left',
                  marginBottom: 2,
                  transition: 'all 0.15s ease',
                  WebkitTapHighlightColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'
                }}
                onMouseLeave={(e) => {
                  if (!active) (e.currentTarget as HTMLElement).style.background = 'none'
                }}
              >
                {item.icon}
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Back to store */}
        <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={() => navigate('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              width: '100%',
              padding: '10px 12px',
              borderRadius: 8,
              border: 'none',
              background: 'rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.55)',
              fontSize: '0.8125rem',
              cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Visit Storefront
          </button>
          <button
            onClick={() => { void signOut().finally(() => navigate('admin-login')) }}
            className="mt-2 flex min-h-10 w-full items-center gap-2 rounded-lg border border-white/10 bg-transparent px-3 text-left text-xs font-medium text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/></svg>
            Sign out
          </button>
        </div>
      </aside>

      <header className="admin-mobile-header">
        <div className="admin-mobile-brand-mark" aria-hidden="true">ASE</div>
        <div className="min-w-0 flex-1">
          <p className="admin-mobile-eyebrow">Store administration</p>
          <h1 className="admin-mobile-title">{currentLabel}</h1>
        </div>
        <button type="button" className="admin-storefront-button" onClick={() => navigate('home')} aria-label="Visit storefront">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9M9 20v-6h6v6"/></svg>
          <span>Store</span>
        </button>
      </header>

      {/* Main content */}
      <main className="admin-main min-w-0 flex-1 px-4 pb-8 pt-5">
        {children}
      </main>

      {showBottomNav && <nav className="admin-mobile-nav" aria-label="Admin navigation">
        {['admin-dashboard', 'admin-orders', 'admin-products'].map((target) => {
          const item = NAV_ITEMS.find((navItem) => navItem.screen === target)!
          const active = screen === item.screen || (screen === 'admin-product-editor' && item.screen === 'admin-products')
          return <button key={item.screen} type="button" className={`admin-mobile-nav-item${active ? ' is-active' : ''}`} onClick={() => navigate(item.screen)} aria-current={active ? 'page' : undefined}>
            {item.icon}<span>{item.label}</span>
          </button>
        })}
        <button type="button" className={`admin-mobile-nav-item${moreOpen || !['admin-dashboard', 'admin-orders', 'admin-products', 'admin-product-editor'].includes(screen) ? ' is-active' : ''}`} onClick={() => setMoreOpen(true)} aria-expanded={moreOpen}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg><span>More</span>
        </button>
      </nav>}

      {moreOpen && <div className="admin-mobile-sheet-backdrop" onClick={() => setMoreOpen(false)}>
        <section className="admin-mobile-sheet" role="dialog" aria-modal="true" aria-labelledby="admin-more-title" onClick={(event) => event.stopPropagation()}>
          <div className="admin-mobile-sheet-handle" />
          <div className="mb-3 flex items-center justify-between"><h2 id="admin-more-title" className="font-serif text-lg font-bold text-brand-ink">Manage store</h2><button type="button" className="admin-sheet-close" onClick={() => setMoreOpen(false)} aria-label="Close menu">×</button></div>
          <div className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.filter((item) => !['admin-dashboard', 'admin-orders', 'admin-products'].includes(item.screen)).map((item) => <button key={item.screen} type="button" className={`admin-sheet-link${screen === item.screen || (screen === 'admin-product-editor' && item.screen === 'admin-products') ? ' is-active' : ''}`} onClick={() => { setMoreOpen(false); navigate(item.screen) }}>{item.icon}<span>{item.label}</span></button>)}
          </div>
          <button type="button" className="admin-sheet-signout" onClick={() => { setMoreOpen(false); void signOut().finally(() => navigate('admin-login')) }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/></svg>Sign out of admin</button>
        </section>
      </div>}
    </div>
  )
}
