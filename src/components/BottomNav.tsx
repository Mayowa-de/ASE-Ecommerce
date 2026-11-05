import { useApp } from '../context'
import type { Screen } from '../types'

interface NavItem {
  id: string
  label: string
  screen: Screen
  icon: (active: boolean) => React.ReactNode
}

const items: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    screen: 'home',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'var(--c-primary)' : 'none'} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
  },
  {
    id: 'shop',
    label: 'Products',
    screen: 'shop',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" fill={active ? 'var(--c-primary)' : 'none'} />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    id: 'orders',
    label: 'Orders',
    screen: 'orders',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" fill={active ? 'var(--c-primary)' : 'none'} />
        <polyline points="14,2 14,8 20,8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="13" y2="17" />
      </svg>
    ),
  },
  {
    id: 'account',
    label: 'Account',
    screen: 'account',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" fill={active ? 'var(--c-primary)' : 'none'} />
        <circle cx="12" cy="7" r="4" fill={active ? 'var(--c-primary)' : 'none'} />
      </svg>
    ),
  },
]

const ACTIVE_SCREENS: Record<string, string> = {
  home: 'home',
  shop: 'shop',
  categories: 'shop',
  category: 'shop',
  search: 'shop',
  product: 'shop',
  orders: 'orders',
  'order-details': 'orders',
  'order-cancelled': 'orders',
  account: 'account',
  'account-profile': 'account',
  'account-wishlist': 'account',
  'account-reviews': 'account',
  'account-addresses': 'account',
  'account-preferences': 'account',
  favorites: 'account',
}

const HIDDEN_SCREENS = new Set([
  'auth',
  'checkout',
  'order-confirmation',
  'forgot-password',
])

const bibleItem: NavItem = {
  id: 'bible',
  label: 'Bible',
  screen: 'bible',
  icon: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" fill={active ? 'var(--c-primary)' : 'none'} />
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" fill={active ? 'var(--c-primary)' : 'none'} />
    </svg>
  ),
}

export default function BottomNav() {
  const { screen, navigate, isLoggedIn, setLoginModalOpen, bibleEnabled, previewMode } = useApp()

  if (HIDDEN_SCREENS.has(screen)) return null

  const activeTab = ACTIVE_SCREENS[screen] ?? (screen === 'bible' ? 'bible' : '')

  const visibleItems = bibleEnabled
    ? [items[0], bibleItem, ...items.slice(1)]
    : items

  function handleNavClick(item: NavItem) {
    if (item.screen === 'account' && !isLoggedIn) {
      setLoginModalOpen(true)
      return
    }
    navigate(item.screen)
  }

  return (
    <nav
      aria-label="Main navigation"
      className="mobile-bottom-nav"
      style={{
        position: previewMode ? 'absolute' : 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--c-border)',
        display: 'grid',
        gridTemplateColumns: `repeat(${visibleItems.length}, 1fr)`,
        paddingBottom: 'env(safe-area-inset-bottom)',
        height: 'calc(66px + env(safe-area-inset-bottom))',
        boxShadow: '0 -1px 0 rgba(53,16,92,0.06)',
      }}
    >
      {visibleItems.map((item) => {
        const active = activeTab === item.id
        return (
          <button
            key={item.id}
            onClick={() => handleNavClick(item)}
            aria-label={item.label}
            aria-current={active ? 'page' : undefined}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px 4px',
              position: 'relative',
              WebkitTapHighlightColor: 'transparent',
              minHeight: 66,
              color: active ? 'var(--c-primary)' : 'var(--c-text2)',
              transition: 'color 0.15s ease',
            }}
          >
            {item.icon(active)}
            <span
              style={{
                fontSize: '0.625rem',
                fontWeight: active ? 600 : 400,
                lineHeight: 1,
                color: 'inherit',
                transition: 'font-weight 0.15s ease',
                letterSpacing: '0.01em',
              }}
            >
              {item.label}
            </span>
            {active && (
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 28,
                  height: 3,
                  backgroundColor: 'var(--c-gold)',
                  borderRadius: '0 0 3px 3px',
                }}
              />
            )}
          </button>
        )
      })}
    </nav>
  )
}
