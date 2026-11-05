import { useState } from 'react'
import { useApp } from '../context'
import type { Screen } from '../types'

const SCREEN_TITLES: Partial<Record<string, string>> = {
  shop: 'Products',
  cart: 'Cart',
  orders: 'My Orders',
  'order-details': 'Order Details',
  'order-cancelled': 'Order',
  checkout: 'Checkout',
  'order-confirmation': 'Order Confirmed',
  account: 'Account',
  'account-profile': 'Profile',
  'account-wishlist': 'Wishlist',
  'account-reviews': 'Product Reviews',
  'account-addresses': 'Address Book',
  'account-preferences': 'Preferences',
  privacy: 'Privacy Policy',
  terms: 'Terms & Conditions',
  auth: 'Sign In',
  product: '',
  categories: 'Categories',
  category: '',
  search: 'Search',
  favorites: 'Favourites',
  'help-support': 'Help & Support',
  'forgot-password': 'Reset Password',
  'review-submit': 'Write a Review',
}

const BACK_SCREENS = new Set([
  'cart',
  'product',
  'checkout',
  'order-confirmation',
  'order-details',
  'order-cancelled',
  'account-profile',
  'account-wishlist',
  'account-reviews',
  'account-addresses',
  'account-preferences',
  'privacy',
  'terms',
  'auth',
  'favorites',
  'search',
  'help-support',
  'forgot-password',
  'review-submit',
  'category',
])

const DESKTOP_NAV: { label: string; screen: Screen }[] = [
  { label: 'Home', screen: 'home' },
  { label: 'Categories', screen: 'categories' },
  { label: 'Shop All', screen: 'shop' },
  { label: 'Orders', screen: 'orders' },
  { label: 'Account', screen: 'account' },
]

function ASELogo() {
  return (
    <div
      style={{
        backgroundColor: 'var(--c-primary)',
        borderRadius: 10,
        width: 36,
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 2px 8px rgba(53,16,92,0.3)',
      }}
      aria-hidden="true"
    >
      <span
        style={{
          color: 'var(--c-gold)',
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: '0.75rem',
          letterSpacing: '0.05em',
        }}
      >
        ASE
      </span>
    </div>
  )
}

export default function Header() {
  const { screen, navigate, goBack, cartCount, setSearchQuery, previewMode, isLoggedIn, setLoginModalOpen, bibleEnabled } = useApp()
  const showBack = BACK_SCREENS.has(screen)
  const title = SCREEN_TITLES[screen]
  const showHome = screen === 'home'
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchInput, setSearchInput] = useState('')

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (searchInput.trim()) {
      setSearchQuery(searchInput.trim())
      navigate('search')
      setSearchOpen(false)
      setSearchInput('')
    }
  }

  const noCartScreens = new Set(['auth', 'privacy', 'terms', 'checkout', 'order-confirmation'])
  const desktopNavItems = bibleEnabled
    ? [...DESKTOP_NAV, { label: 'Bible', screen: 'bible' as const }]
    : DESKTOP_NAV

  function isDesktopNavActive(item: { label: string; screen: Screen }) {
    if (screen === item.screen) return true
    if (item.screen === 'orders') return ['order-details', 'order-cancelled'].includes(screen)
    if (item.screen === 'account') return screen.startsWith('account-') || screen === 'favorites'
    if (item.screen === 'shop') return ['product', 'category', 'search'].includes(screen)
    return false
  }

  function handleDesktopNav(screenTarget: Screen) {
    if (screenTarget === 'account' && !isLoggedIn) {
      setLoginModalOpen(true)
      return
    }
    navigate(screenTarget)
  }

  return (
    <header
      style={{
        position: previewMode ? 'absolute' : 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--c-border)',
        height: 58,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: 10,
        boxShadow: '0 1px 0 rgba(53,16,92,0.06)',
      }}
    >
      {/* Left */}
      <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center' }}>
        {showBack ? (
          <button
            onClick={goBack}
            aria-label="Go back"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              margin: '-10px -8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--c-primary)',
              borderRadius: 8,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
        ) : (
          <button
            onClick={() => navigate('home')}
            aria-label="Adeola Spiritual Enterprises — Home"
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <ASELogo />
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: '1rem',
                color: 'var(--c-primary)',
                lineHeight: 1,
              }}
            >
              ASE
            </span>
          </button>
        )}
      </div>

      {/* Desktop nav links */}
      <nav
        className="desktop-only"
        style={{ flex: 1, gap: 4, justifyContent: 'flex-start', marginLeft: 16 }}
        aria-label="Site navigation"
      >
        {desktopNavItems.map((item) => (
          <button
            key={item.screen}
            onClick={() => handleDesktopNav(item.screen)}
            style={{
              padding: '6px 12px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: isDesktopNavActive(item) ? 'var(--c-primary)' : 'var(--c-text2)',
              borderRadius: 8,
              transition: 'color 0.15s ease, background 0.15s ease',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--c-primary)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = isDesktopNavActive(item) ? 'var(--c-primary)' : 'var(--c-text2)')}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Center title (mobile) — shown when there's no desktop nav */}
      {!searchOpen && (
        <div
          className="mobile-only"
          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {title ? (
            <h1
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--c-text)',
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {title}
            </h1>
          ) : null}
        </div>
      )}

      {/* Search expand (mobile) */}
      {searchOpen && (
        <form
          onSubmit={handleSearchSubmit}
          style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <input
            type="search"
            autoFocus
            placeholder="Search products…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            style={{
              flex: 1,
              height: 38,
              background: 'var(--c-cream)',
              border: '1.5px solid var(--c-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '0 12px',
              fontSize: '0.9375rem',
              color: 'var(--c-text)',
              outline: 'none',
            }}
          />
          <button
            type="button"
            onClick={() => { setSearchOpen(false); setSearchInput('') }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--c-text2)', padding: 4, minWidth: 44, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            Cancel
          </button>
        </form>
      )}

      {/* Right actions */}
      {!searchOpen && (
        <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: 0 }}>
          {/* Search icon */}
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--c-text2)',
              borderRadius: 8,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          {/* Cart */}
          {!noCartScreens.has(screen) && (
            <button
              onClick={() => navigate('cart')}
              aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--c-text)',
                borderRadius: 8,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {cartCount > 0 && (
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: 7,
                    right: 7,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    backgroundColor: 'var(--c-gold)',
                    color: 'var(--c-dark-brand)',
                    fontSize: '0.5625rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 1,
                  }}
                >
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
          )}
        </div>
      )}
    </header>
  )
}
