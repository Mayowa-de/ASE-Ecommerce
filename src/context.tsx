import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { pathForScreen, resolveAppRoute } from './routes'
import { apiRequest, jsonBody } from './lib/api'
import type {
  Screen,
  CartItem,
  Order,
  Address,
  Review,
  Product,
  HeroSlide,
  StoreConfig,
  Customer,
  AdminCategory,
} from './types'
import {
  MOCK_ORDERS,
  PRODUCTS,
  HERO_SLIDES,
  STORE_CONFIG,
  MOCK_CUSTOMERS,
  ADMIN_CATEGORIES,
  getProductById,
  getVariantById,
} from './data'

export interface NavParams {
  productId?: string
  orderId?: string
  categoryId?: string
  query?: string
  reviewProductId?: string
  editProductId?: string
}

export interface AuthUser {
  id: string
  name: string
  email: string
  phone: string | null
  role: 'CUSTOMER' | 'ADMIN'
}

interface AppContextValue {
  screen: Screen
  params: NavParams
  navigate: (screen: Screen, params?: NavParams) => void
  goBack: () => void

  appMode: 'customer' | 'admin'
  setAppMode: (mode: 'customer' | 'admin') => void

  loginModalOpen: boolean
  setLoginModalOpen: (open: boolean) => void

  searchQuery: string
  setSearchQuery: (q: string) => void

  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: string, variantId: string) => void
  updateQuantity: (productId: string, variantId: string, qty: number) => void
  cartCount: number
  cartTotal: number
  clearCart: () => void

  isLoggedIn: boolean
  setIsLoggedIn: (v: boolean) => void
  userName: string
  authUser: AuthUser | null
  authReady: boolean
  signIn: (email: string, password: string, admin?: boolean) => Promise<void>
  register: (name: string, email: string, phone: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (name: string, phone: string) => Promise<void>
  backendError: string | null
  productLoading: boolean
  refreshProducts: () => Promise<void>

  darkMode: boolean
  toggleDarkMode: () => void

  bibleEnabled: boolean
  toggleBible: () => void

  wishlist: string[]
  toggleWishlist: (productId: string) => void

  orders: Order[]
  addOrder: (order: Order) => void
  updateOrderStatus: (orderId: string, status: Order['status']) => void

  addresses: Address[]

  reviews: Review[]
  addReview: (review: Review) => void
  removeReview: (reviewId: string) => void

  products: Product[]
  setProducts: (p: Product[]) => void

  heroSlides: HeroSlide[]
  setHeroSlides: (s: HeroSlide[]) => void

  storeConfig: StoreConfig
  setStoreConfig: (c: StoreConfig) => void

  customers: Customer[]

  adminCategories: AdminCategory[]
  setAdminCategories: (c: AdminCategory[]) => void

  previewMode: boolean
}

const AppContext = createContext<AppContextValue>(null!)

interface AppProviderProps {
  children: React.ReactNode
  initialScreen?: Screen
  initialParams?: NavParams
  initialAppMode?: 'customer' | 'admin'
  previewMode?: boolean
}

export function AppProvider({
  children,
  initialScreen = 'home',
  initialParams = {},
  initialAppMode = 'customer',
  previewMode = false,
}: AppProviderProps) {
  const location = useLocation()
  const routerNavigate = useNavigate()
  const routeState = resolveAppRoute(location.pathname, location.search)
  const screen = previewMode ? initialScreen : routeState.screen
  const params = previewMode ? initialParams : routeState.params
  const routeIsAdmin = screen.startsWith('admin-')
  const appMode = previewMode ? initialAppMode : routeIsAdmin ? 'admin' : 'customer'
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState(previewMode ? 'candle' : '')

  const [cart, setCart] = useState<CartItem[]>(
    previewMode
      ? [
          { productId: 'candles', variantId: 'medium', quantity: 2 },
          { productId: 'bible', variantId: 'small', quantity: 1 },
        ]
      : []
  )
  const [authUser, setAuthUser] = useState<AuthUser | null>(previewMode ? {
    id: 'preview-customer', name: 'Adewale Johnson', email: 'adewale@example.com', phone: '08012345678', role: initialAppMode === 'admin' ? 'ADMIN' : 'CUSTOMER',
  } : null)
  const [isLoggedIn, setIsLoggedIn] = useState(previewMode)
  const [authReady, setAuthReady] = useState(previewMode)
  const [backendError, setBackendError] = useState<string | null>(null)
  const [productLoading, setProductLoading] = useState(!previewMode)
  const [darkMode, setDarkMode] = useState(false)
  const [bibleEnabled, setBibleEnabled] = useState(previewMode)
  const [wishlist, setWishlist] = useState<string[]>(previewMode ? ['miss-paris', 'goya-oil'] : [])
  const [orders, setOrders] = useState<Order[]>(previewMode ? MOCK_ORDERS : [])
  const [reviews, setReviews] = useState<Review[]>(
    previewMode
      ? [
          {
            id: 'review-preview-1',
            productId: 'bible',
            rating: 5,
            comment: 'Beautiful quality and carefully packaged. It arrived in excellent condition.',
            date: '2025-01-12',
            authorName: 'Adewale Johnson',
          },
        ]
      : []
  )
  const [addresses] = useState<Address[]>(previewMode ? [
    {
      id: 'addr-1',
      name: 'Adewale Johnson',
      phone: '08012345678',
      street: '14 Celestial Close, Shagamu',
      state: 'Ogun',
      isDefault: true,
    },
  ] : [])

  const [products, setProducts] = useState<Product[]>(previewMode ? PRODUCTS : [])
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(HERO_SLIDES)
  const [storeConfig, setStoreConfig] = useState<StoreConfig>(STORE_CONFIG)
  const [adminCategories, setAdminCategories] = useState<AdminCategory[]>(ADMIN_CATEGORIES)
  const customers: Customer[] = previewMode ? MOCK_CUSTOMERS : []

  const refreshProducts = useCallback(async () => {
    setProductLoading(true)
    setBackendError(null)
    try {
      const result = await apiRequest<{ products: Product[] }>('/products')
      if (!Array.isArray(result.products)) throw new Error('The catalogue service returned an invalid response.')
      setProducts(result.products)
    } catch (error) {
      setProducts([])
      setBackendError(error instanceof Error ? error.message : 'The catalogue service is unavailable.')
    } finally {
      setProductLoading(false)
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const navigate = useCallback((nextScreen: Screen, nextParams: NavParams = {}) => {
    routerNavigate(pathForScreen(nextScreen, nextParams, searchQuery))
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [routerNavigate, searchQuery])

  const goBack = useCallback(() => {
    if (window.history.length > 1) routerNavigate(-1)
    else routerNavigate('/')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [routerNavigate])

  const setAppMode = useCallback((mode: 'customer' | 'admin') => {
    routerNavigate(mode === 'admin' ? '/admin' : '/')
  }, [routerNavigate])

  useEffect(() => {
    if (!previewMode) setSearchQuery(new URLSearchParams(location.search).get('q') ?? '')
  }, [location.search, previewMode])

  useEffect(() => {
    if (previewMode) return
    let active = true
    void refreshProducts()
    void apiRequest<{ user: AuthUser }>('/auth/me')
      .then(({ user }) => { if (active) { setAuthUser(user); setIsLoggedIn(true) } })
      .catch(() => { if (active) { setAuthUser(null); setIsLoggedIn(false) } })
      .finally(() => { if (active) setAuthReady(true) })
    return () => { active = false }
  }, [previewMode, refreshProducts])

  useEffect(() => {
    if (previewMode || !authUser) { if (!previewMode) setOrders([]); return }
    let active = true
    void apiRequest<{ orders: Order[] }>('/orders')
      .then(({ orders: remoteOrders }) => { if (active) setOrders(remoteOrders) })
      .catch(() => { if (active) setOrders([]) })
    return () => { active = false }
  }, [authUser, previewMode])

  const signIn = useCallback(async (email: string, password: string, admin = false) => {
    const result = await apiRequest<{ user: AuthUser }>(admin ? '/auth/admin/login' : '/auth/login', {
      method: 'POST', body: jsonBody({ email, password }),
    }, false)
    setAuthUser(result.user)
    setIsLoggedIn(true)
  }, [])

  const register = useCallback(async (name: string, email: string, phone: string, password: string) => {
    const result = await apiRequest<{ user: AuthUser }>('/auth/register', {
      method: 'POST', body: jsonBody({ name, email, phone, password }),
    }, false)
    setAuthUser(result.user)
    setIsLoggedIn(true)
  }, [])

  const signOut = useCallback(async () => {
    try { await apiRequest<void>('/auth/logout', { method: 'POST' }) }
    finally { setAuthUser(null); setIsLoggedIn(false); setOrders([]) }
  }, [])

  const updateProfile = useCallback(async (name: string, phone: string) => {
    const result = await apiRequest<{ user: AuthUser }>('/profile', {
      method: 'PUT', body: jsonBody({ name, phone: phone || null }),
    })
    setAuthUser(result.user)
  }, [])

  const addToCart = useCallback((item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (c) => c.productId === item.productId && c.variantId === item.variantId
      )
      if (existing) {
        return prev.map((c) =>
          c.productId === item.productId && c.variantId === item.variantId
            ? { ...c, quantity: c.quantity + item.quantity }
            : c
        )
      }
      return [...prev, item]
    })
  }, [])

  const removeFromCart = useCallback((productId: string, variantId: string) => {
    setCart((prev) =>
      prev.filter((c) => !(c.productId === productId && c.variantId === variantId))
    )
  }, [])

  const updateQuantity = useCallback((productId: string, variantId: string, qty: number) => {
    if (qty <= 0) {
      setCart((prev) =>
        prev.filter((c) => !(c.productId === productId && c.variantId === variantId))
      )
    } else {
      setCart((prev) =>
        prev.map((c) =>
          c.productId === productId && c.variantId === variantId ? { ...c, quantity: qty } : c
        )
      )
    }
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const cartCount = cart.reduce((sum, c) => sum + c.quantity, 0)

  const cartTotal = cart.reduce((sum, c) => {
    const product = products.find((p) => p.id === c.productId)
    const variant = product ? getVariantById(product, c.variantId) : undefined
    return sum + (variant?.price ?? 0) * c.quantity
  }, 0)

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }, [])

  const addOrder = useCallback((order: Order) => {
    setOrders((prev) => [order, ...prev])
  }, [])

  const updateOrderStatus = useCallback((orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    )
  }, [])

  const addReview = useCallback((review: Review) => {
    setReviews((prev) => [...prev, review])
  }, [])

  const removeReview = useCallback((reviewId: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId))
  }, [])

  return (
    <AppContext.Provider
      value={{
        screen,
        params,
        navigate,
        goBack,
        appMode,
        setAppMode,
        loginModalOpen,
        setLoginModalOpen,
        searchQuery,
        setSearchQuery,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        cartTotal,
        clearCart,
        isLoggedIn,
        setIsLoggedIn,
        userName: authUser?.name ?? (previewMode ? 'Adewale Johnson' : ''),
        authUser,
        authReady,
        signIn,
        register,
        signOut,
        updateProfile,
        backendError,
        productLoading,
        refreshProducts,
        darkMode,
        toggleDarkMode: () => setDarkMode((v) => !v),
        bibleEnabled,
        toggleBible: () => setBibleEnabled((v) => !v),
        wishlist,
        toggleWishlist,
        orders,
        addOrder,
        updateOrderStatus,
        addresses,
        reviews,
        addReview,
        removeReview,
        products,
        setProducts,
        heroSlides,
        setHeroSlides,
        storeConfig,
        setStoreConfig,
        customers,
        adminCategories,
        setAdminCategories,
        previewMode,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
