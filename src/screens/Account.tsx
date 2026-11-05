import { useApp } from '../context'
import type { Screen } from '../types'

interface MenuItem {
  icon: React.ReactNode
  label: string
  screen?: Screen
  action?: () => void
  danger?: boolean
  value?: string
  toggle?: boolean
  toggleOn?: boolean
}

export default function Account() {
  const {
    isLoggedIn,
    signOut,
    navigate,
    userName,
    wishlist,
    orders,
    darkMode,
    toggleDarkMode,
    bibleEnabled,
    toggleBible,
    reviews,
    setLoginModalOpen,
  } = useApp()

  if (!isLoggedIn) {
    return (
      <div style={{ padding: '56px 16px', textAlign: 'center' }}>
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--c-cream), var(--c-surface))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--c-text2)" strokeWidth="1.5">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.375rem', fontWeight: 700, color: 'var(--c-text)', marginBottom: 8 }}>
          My Account
        </h2>
        <p style={{ color: 'var(--c-text2)', fontSize: '0.875rem', marginBottom: 28, lineHeight: 1.5 }}>
          Sign in to manage your profile, orders, and wishlist.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 300, margin: '0 auto' }}>
          <button className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-0 bg-brand px-[22px] py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(53,16,92,0.25)] transition duration-150 hover:bg-[#4a1880] hover:shadow-[0_4px_14px_rgba(53,16,92,0.35)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40" onClick={() => setLoginModalOpen(true)} style={{ width: '100%' }}>
            Sign In
          </button>
          <button className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-[1.5px] border-brand bg-transparent px-[22px] py-3 text-sm font-semibold text-brand transition duration-150 hover:bg-[#F7F0E3] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40" onClick={() => setLoginModalOpen(true)} style={{ width: '100%' }}>
            Create Account
          </button>
        </div>
      </div>
    )
  }

  const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length
  const canReview = deliveredOrders > 0 && reviews.length < deliveredOrders

  const sections: { title: string; items: MenuItem[] }[] = [
    {
      title: 'My Account',
      items: [
        {
          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
          label: 'Profile',
          screen: 'account-profile',
        },
        {
          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
          label: 'Favourites',
          screen: 'favorites',
          value: wishlist.length > 0 ? `${wishlist.length}` : undefined,
        },
        {
          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>,
          label: 'Product Reviews',
          screen: 'account-reviews',
          value: canReview ? 'Eligible' : undefined,
        },
        {
          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
          label: 'Address Book',
          screen: 'account-addresses',
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5 5 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2 22l5.072-1.33A9.963 9.963 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>,
          label: 'Help & Support',
          screen: 'help-support',
        },
        {
          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
          label: 'Privacy Policy',
          screen: 'privacy',
        },
        {
          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>,
          label: 'Terms & Conditions',
          screen: 'terms',
        },
      ],
    },
    {
      title: 'Settings',
      items: [
        {
          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
          label: 'Preferences',
          screen: 'account-preferences',
        },
        {
          icon: darkMode
            ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
          label: 'Dark Mode',
          action: toggleDarkMode,
          toggle: true,
          toggleOn: darkMode,
        },
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
            </svg>
          ),
          label: 'Bible Reader',
          action: toggleBible,
          toggle: true,
          toggleOn: bibleEnabled,
        },
      ],
    },
    {
      title: 'Account Actions',
      items: [
        {
          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
          label: 'Sign Out',
          action: () => { void signOut().finally(() => navigate('home')) },
        },
        {
          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>,
          label: 'Delete Account',
          danger: true,
          action: () => {
            if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
              void signOut()
              navigate('home')
            }
          },
        },
      ],
    },
  ]

  return (
    <div style={{ padding: '16px 16px 0' }}>
      {/* Profile header card */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '16px',
          background: 'linear-gradient(135deg, var(--c-primary), var(--c-primary-h))',
          borderRadius: 'var(--radius-lg)',
          marginBottom: 20,
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            border: '2px solid rgba(255,255,255,0.25)',
          }}
        >
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: 'var(--c-champagne)', fontSize: '1.25rem' }}>
            {userName.charAt(0)}
          </span>
        </div>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontWeight: 700, fontSize: '1rem', color: '#fff', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {userName}
          </p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
            {orders.length} order{orders.length !== 1 ? 's' : ''} placed
          </p>
        </div>
      </div>

      {/* Menu sections */}
      {sections.map((section) => (
        <div key={section.title} style={{ marginBottom: 16 }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--c-text2)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8, paddingLeft: 2 }}>
            {section.title}
          </p>
          <div
            style={{
              backgroundColor: 'var(--c-surface)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {section.items.map((item, i) => (
              <button
                key={item.label}
                onClick={item.action ?? (item.screen ? () => navigate(item.screen!) : undefined)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 16px',
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  borderBottom: i < section.items.length - 1 ? '1px solid var(--c-border)' : 'none',
                  cursor: 'pointer',
                  color: item.danger ? 'var(--c-error)' : 'var(--c-text)',
                  textAlign: 'left',
                  minHeight: 52,
                  WebkitTapHighlightColor: 'transparent',
                  transition: 'background 0.1s ease',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'var(--c-cream)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'transparent')}
              >
                <span style={{ color: item.danger ? 'var(--c-error)' : 'var(--c-text2)', flexShrink: 0 }}>
                  {item.icon}
                </span>
                <span style={{ flex: 1, fontSize: '0.9375rem', fontWeight: 500 }}>{item.label}</span>
                {item.toggle ? (
                  <div
                    aria-hidden="true"
                    style={{
                      width: 44,
                      height: 26,
                      borderRadius: 13,
                      background: item.toggleOn ? 'var(--c-primary)' : 'var(--c-border)',
                      position: 'relative',
                      flexShrink: 0,
                      transition: 'background 0.2s ease',
                    }}
                  >
                    <span style={{
                      position: 'absolute',
                      top: 3,
                      left: item.toggleOn ? 21 : 3,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: '#fff',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                      transition: 'left 0.2s ease',
                    }} />
                  </div>
                ) : item.value ? (
                  <span style={{ fontSize: '0.75rem', color: item.value === 'Eligible' ? 'var(--c-success)' : 'var(--c-text2)', fontWeight: 500 }}>
                    {item.value}
                  </span>
                ) : item.screen ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--c-border)" strokeWidth="2" strokeLinecap="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                ) : null}
              </button>
            ))}
          </div>
        </div>
      ))}

      <p style={{ fontSize: '0.6875rem', color: 'var(--c-text2)', textAlign: 'center', padding: '16px 0 8px' }}>
        © {new Date().getFullYear()} Adeola Spiritual Enterprises
      </p>
    </div>
  )
}
