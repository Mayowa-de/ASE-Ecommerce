export type Screen =
  | 'home'
  | 'shop'
  | 'product'
  | 'cart'
  | 'auth'
  | 'checkout'
  | 'order-confirmation'
  | 'order-details'
  | 'order-cancelled'
  | 'orders'
  | 'account'
  | 'account-profile'
  | 'account-wishlist'
  | 'account-reviews'
  | 'account-addresses'
  | 'account-preferences'
  | 'privacy'
  | 'terms'
  | 'categories'
  | 'category'
  | 'search'
  | 'favorites'
  | 'forgot-password'
  | 'help-support'
  | 'review-submit'
  | 'bible'
  | 'design-handoff'
  | 'admin-login'
  | 'admin-dashboard'
  | 'admin-products'
  | 'admin-product-editor'
  | 'admin-categories'
  | 'admin-orders'
  | 'admin-customers'
  | 'admin-homepage'
  | 'admin-reviews'
  | 'admin-settings'

export type Category = 'Candles' | 'Bibles' | 'Oils' | 'Perfumes' | 'Spiritual Items'

export interface Variant {
  id: string
  label: string
  price: number
  stock: number
}

export interface Product {
  id: string
  name: string
  category: Category
  variants: Variant[]
  comingSoon?: boolean
  description: string
  featured: boolean
  active: boolean
  rating: number
  reviewCount: number
}

export interface CartItem {
  productId: string
  variantId: string
  quantity: number
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'

export type PaymentStatus = 'Pending' | 'Paid' | 'Failed'

export interface OrderItem {
  product: Product
  variant: Variant
  quantity: number
}

export interface Order {
  id: string
  date: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  total: number
  address: string
  paymentMethod: string
  deliveryState: string
}

export interface Address {
  id: string
  name: string
  phone: string
  street: string
  state: string
  isDefault: boolean
}

export interface Review {
  id: string
  productId: string
  rating: number
  comment: string
  date: string
  authorName: string
}

export interface HeroSlide {
  id: string
  badge: string
  headline: string
  description: string
  cta: string
  ctaScreen: Screen
  active: boolean
  order: number
}

export interface StoreConfig {
  storeName: string
  phone: string
  whatsapp: string
  location: string
  deliveryStates: string[]
  email: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  registeredAt: string
  orderCount: number
}

export interface AdminCategory {
  id: string
  name: Category
  description: string
  active: boolean
  displayOrder: number
}
