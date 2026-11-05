import { AppProvider, useApp } from './context'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import LoginModal from './components/LoginModal'
import Home from './screens/Home'
import Shop from './screens/Shop'
import ProductDetail from './screens/ProductDetail'
import Cart from './screens/Cart'
import Auth from './screens/Auth'
import Checkout from './screens/Checkout'
import PaymentCallback from './screens/PaymentCallback'
import OrderConfirmation from './screens/OrderConfirmation'
import OrderDetails from './screens/OrderDetails'
import OrderCancelled from './screens/OrderCancelled'
import MyOrders from './screens/MyOrders'
import Account from './screens/Account'
import {
  AccountProfile,
  AccountWishlist,
  AccountReviews,
  AccountAddresses,
  AccountPreferences,
} from './screens/AccountSubScreens'
import PrivacyPolicy from './screens/PrivacyPolicy'
import Terms from './screens/Terms'
import Categories from './screens/Categories'
import Category from './screens/Category'
import Search from './screens/Search'
import Favorites from './screens/Favorites'
import ForgotPassword from './screens/ForgotPassword'
import HelpSupport from './screens/HelpSupport'
import Bible from './screens/Bible'

import AdminShell from './admin/AdminShell'
import AdminDashboard from './admin/AdminDashboard'
import AdminProducts from './admin/AdminProducts'
import AdminProductEditor from './admin/AdminProductEditor'
import AdminCategories from './admin/AdminCategories'
import AdminOrders from './admin/AdminOrders'
import AdminCustomers from './admin/AdminCustomers'
import AdminHomepage from './admin/AdminHomepage'
import AdminReviews from './admin/AdminReviews'
import AdminSettings from './admin/AdminSettings'
import AdminLogin from './admin/AdminLogin'
import type { Screen } from './types'
import type { NavParams } from './context'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { APP_ROUTES } from './routes'
import CookieConsentBanner from './components/CookieConsentBanner'
import InstallAppButton from './components/InstallAppButton'

const NO_HEADER = new Set(['auth', 'checkout', 'payment-callback', 'order-confirmation', 'forgot-password', 'bible', 'admin-login'])
const NO_BOTTOM_NAV = new Set(['auth', 'checkout', 'payment-callback', 'order-confirmation', 'forgot-password', 'admin-login'])

const ADMIN_SCREENS = new Set([
  'admin-dashboard',
  'admin-products',
  'admin-product-editor',
  'admin-categories',
  'admin-orders',
  'admin-customers',
  'admin-homepage',
  'admin-reviews',
  'admin-settings',
])

const CATALOG_SCREENS = new Set(['home', 'shop', 'categories', 'category', 'search', 'favorites', 'product'])

function AdminRouter() {
  const { screen } = useApp()
  return (
    <AdminShell>
      {screen === 'admin-dashboard' && <AdminDashboard />}
      {screen === 'admin-products' && <AdminProducts />}
      {screen === 'admin-product-editor' && <AdminProductEditor />}
      {screen === 'admin-categories' && <AdminCategories />}
      {screen === 'admin-orders' && <AdminOrders />}
      {screen === 'admin-customers' && <AdminCustomers />}
      {screen === 'admin-homepage' && <AdminHomepage />}
      {screen === 'admin-reviews' && <AdminReviews />}
      {screen === 'admin-settings' && <AdminSettings />}
    </AdminShell>
  )
}

function CustomerRouter() {
  const { screen } = useApp()
  return (
    <>
      {screen === 'home' && <Home />}
      {screen === 'shop' && <Shop />}
      {screen === 'categories' && <Categories />}
      {screen === 'category' && <Category />}
      {screen === 'search' && <Search />}
      {screen === 'favorites' && <Favorites />}
      {screen === 'product' && <ProductDetail />}
      {screen === 'cart' && <Cart />}
      {screen === 'auth' && <Auth />}
      {screen === 'forgot-password' && <ForgotPassword />}
      {screen === 'checkout' && <Checkout />}
      {screen === 'payment-callback' && <PaymentCallback />}
      {screen === 'order-confirmation' && <OrderConfirmation />}
      {screen === 'order-details' && <OrderDetails />}
      {screen === 'order-cancelled' && <OrderCancelled />}
      {screen === 'orders' && <MyOrders />}
      {screen === 'account' && <Account />}
      {screen === 'account-profile' && <AccountProfile />}
      {screen === 'account-wishlist' && <AccountWishlist />}
      {screen === 'account-reviews' && <AccountReviews />}
      {screen === 'account-addresses' && <AccountAddresses />}
      {screen === 'account-preferences' && <AccountPreferences />}
      {screen === 'privacy' && <PrivacyPolicy />}
      {screen === 'terms' && <Terms />}
      {screen === 'help-support' && <HelpSupport />}
      {screen === 'review-submit' && <Account />}
      {screen === 'bible' && <Bible />}
    </>
  )
}

interface HandoffFrame {
  label: string
  screen: Screen
  params?: NavParams
}

const CUSTOMER_HANDOFF_FRAMES: HandoffFrame[] = [
  { label: '01 · Home', screen: 'home' },
  { label: '02 · Products', screen: 'shop' },
  { label: '03 · Categories', screen: 'categories' },
  { label: '04 · Category — Candles', screen: 'category', params: { categoryId: 'Candles' } },
  { label: '05 · Search Results', screen: 'search' },
  { label: '06 · Favorites', screen: 'favorites' },
  { label: '07 · Product Detail', screen: 'product', params: { productId: 'bible' } },
  { label: '08 · Cart', screen: 'cart' },
  { label: '09 · Sign In / Register', screen: 'auth' },
  { label: '10 · Forgot Password', screen: 'forgot-password' },
  { label: '11 · Checkout', screen: 'checkout' },
  { label: '12 · Order Confirmation', screen: 'order-confirmation', params: { orderId: 'ASE-2024-001' } },
  { label: '13 · Order Details', screen: 'order-details', params: { orderId: 'ASE-2024-001' } },
  { label: '14 · Order Cancelled', screen: 'order-cancelled', params: { orderId: 'ASE-2024-002' } },
  { label: '15 · My Orders', screen: 'orders' },
  { label: '16 · Account', screen: 'account' },
  { label: '17 · Profile', screen: 'account-profile' },
  { label: '18 · Wishlist', screen: 'account-wishlist' },
  { label: '19 · Product Reviews', screen: 'account-reviews' },
  { label: '20 · Address Book', screen: 'account-addresses' },
  { label: '21 · Preferences', screen: 'account-preferences' },
  { label: '22 · Privacy Policy', screen: 'privacy' },
  { label: '23 · Terms & Conditions', screen: 'terms' },
  { label: '24 · Help & Support', screen: 'help-support' },
  { label: '25 · KJV Bible', screen: 'bible' },
]

const ADMIN_HANDOFF_FRAMES: HandoffFrame[] = [
  { label: '26 · Admin Dashboard', screen: 'admin-dashboard' },
  { label: '27 · Admin Products', screen: 'admin-products' },
  { label: '28 · Admin Product Editor', screen: 'admin-product-editor', params: { editProductId: 'candles' } },
  { label: '29 · Admin Categories', screen: 'admin-categories' },
  { label: '30 · Admin Orders', screen: 'admin-orders' },
  { label: '31 · Admin Customers', screen: 'admin-customers' },
  { label: '32 · Admin Homepage', screen: 'admin-homepage' },
  { label: '33 · Admin Reviews', screen: 'admin-reviews' },
  { label: '34 · Admin Settings', screen: 'admin-settings' },
]

function HandoffPreviewShell() {
  const { screen, appMode } = useApp()

  if (appMode === 'admin') {
    return (
      <div className="handoff-preview handoff-preview-admin h-full">
        <AdminRouter />
      </div>
    )
  }

  const isFullScreen = NO_HEADER.has(screen)
  const mainPaddingTop = isFullScreen ? 0 : 58
  const mainPaddingBottom = NO_BOTTOM_NAV.has(screen) ? 0 : 66

  return (
    <div className="handoff-preview relative h-full overflow-hidden bg-background">
      {!isFullScreen && <Header />}
      <main
        className={`h-full overflow-hidden ${mainPaddingTop ? 'pt-[58px]' : ''} ${mainPaddingBottom ? 'pb-[66px]' : ''}`}
      >
        <CustomerRouter />
      </main>
      <BottomNav />
    </div>
  )
}

function HandoffFramePreview({ frame, admin = false }: { frame: HandoffFrame; admin?: boolean }) {
  return (
    <article className={admin ? 'handoff-frame handoff-frame-admin' : 'handoff-frame'}>
      <div className="handoff-frame-label">{frame.label}</div>
      <div className="handoff-frame-viewport">
        <AppProvider
          initialScreen={frame.screen}
          initialParams={frame.params}
          initialAppMode={admin ? 'admin' : 'customer'}
          previewMode
        >
          <HandoffPreviewShell />
        </AppProvider>
      </div>
    </article>
  )
}

function DesignHandoff() {
  const { navigate } = useApp()

  return (
    <div className="design-handoff-canvas">
      <header className="design-handoff-header">
        <div>
          <p className="design-handoff-eyebrow">Temporary export canvas</p>
          <h1>ASE Design Handoff Gallery</h1>
          <p>
            34 live screen frames · 25 customer screens · 9 admin screens. Use Figma Make’s Copy design action,
            then paste into a Figma Design page.
          </p>
        </div>
        <button className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-lg border-[1.5px] border-[#E7C978] bg-transparent px-[22px] py-3 text-sm font-semibold text-[#E7C978] transition duration-150 hover:bg-white/10 active:scale-[0.97]" onClick={() => navigate('admin-dashboard')}>
          Exit Gallery
        </button>
      </header>

      <section className="design-handoff-section" aria-labelledby="customer-handoff-title">
        <div className="design-handoff-section-heading">
          <span>01</span>
          <div>
            <h2 id="customer-handoff-title">Customer storefront</h2>
            <p>Mobile reference frames · 390 × 844</p>
          </div>
        </div>
        <div className="design-handoff-grid design-handoff-grid-customer">
          {CUSTOMER_HANDOFF_FRAMES.map((frame) => (
            <HandoffFramePreview key={frame.label} frame={frame} />
          ))}
        </div>
      </section>

      <section className="design-handoff-section" aria-labelledby="admin-handoff-title">
        <div className="design-handoff-section-heading">
          <span>02</span>
          <div>
            <h2 id="admin-handoff-title">Admin operations</h2>
            <p>Desktop reference frames · 1180 × 820</p>
          </div>
        </div>
        <div className="design-handoff-grid design-handoff-grid-admin">
          {ADMIN_HANDOFF_FRAMES.map((frame) => (
            <HandoffFramePreview key={frame.label} frame={frame} admin />
          ))}
        </div>
      </section>
    </div>
  )
}

function AppShell() {
  const { screen, appMode, authReady, authUser, products, productLoading, backendError, refreshProducts, previewMode } = useApp()

  if (screen === 'design-handoff') {
    return <DesignHandoff />
  }

  if (screen === 'admin-login') return <AdminLogin />

  if (ADMIN_SCREENS.has(screen)) {
    if (!authReady) return <div className="grid min-h-screen place-items-center bg-background text-brand-muted">Checking admin session…</div>
    if (authUser?.role !== 'ADMIN') return <Navigate to="/admin/login" replace />
  }

  if (appMode === 'admin' || ADMIN_SCREENS.has(screen)) {
    return <AdminRouter />
  }

  const isFullScreen = NO_HEADER.has(screen)
  const mainPaddingTop = isFullScreen ? 0 : 58
  const mainPaddingBottom = NO_BOTTOM_NAV.has(screen) ? 0 : 66

  return (
    <div className="flex min-h-full flex-col bg-background text-brand-ink">
      {!isFullScreen && <Header />}

      <main
        id="main-content"
        className={`min-w-0 flex-1 overflow-x-hidden ${mainPaddingTop ? 'pt-[58px]' : ''} ${mainPaddingBottom ? 'pb-[calc(66px+env(safe-area-inset-bottom))]' : ''}`}
      >
        {!previewMode && CATALOG_SCREENS.has(screen) && (productLoading ? (
          <div className="mx-auto mt-4 w-[calc(100%-2rem)] max-w-[760px] rounded-xl border border-brand-border bg-brand-surface px-4 py-3 text-sm text-brand-muted" role="status" aria-live="polite">
            Loading products…
          </div>
        ) : backendError ? (
          <section className="mx-auto mt-4 flex w-[calc(100%-2rem)] max-w-[760px] flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
            <div><p className="font-semibold">Products are temporarily unavailable.</p><p className="mt-1">{backendError}</p></div>
            <button type="button" onClick={() => void refreshProducts()} className="min-h-10 rounded-lg border border-red-300 bg-white px-4 py-2 font-semibold text-red-800 transition hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700">Try again</button>
          </section>
        ) : null)}
        <CustomerRouter />
      </main>

      <BottomNav />
      <LoginModal />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          {APP_ROUTES.map((route) => (
            <Route key={`${route.screen}:${route.path}`} path={route.path} element={<AppShell />} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <CookieConsentBanner />
        <InstallAppButton />
      </AppProvider>
    </BrowserRouter>
  )
}
