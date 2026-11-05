import type { Product, Category, Order, HeroSlide, StoreConfig, Customer, AdminCategory } from './types'

export const STORE_CONFIG: StoreConfig = {
  storeName: 'Adeola Spiritual Enterprises',
  phone: '08143027490',
  whatsapp: '07076186828',
  location: 'CCC Oba Olutunu Model Parish, Odeda, Ogun State',
  deliveryStates: ['Lagos', 'Ogun', 'Ondo'],
  email: '',
}

export const PRODUCTS: Product[] = [
  {
    id: 'candles',
    name: 'Candles',
    category: 'Candles',
    variants: [
      { id: 'small', label: 'Small', price: 700, stock: 25 },
      { id: 'medium', label: 'Medium', price: 900, stock: 25 },
    ],
    description:
      'Pure wax candles for prayer, vigil, and worship. Each candle is prepared with care to support your spiritual practice.',
    featured: true,
    active: true,
    rating: 4.8,
    reviewCount: 12,
  },
  {
    id: 'st-michael',
    name: 'St. Michael',
    category: 'Spiritual Items',
    variants: [{ id: 'solo', label: 'Solo', price: 1700, stock: 25 }],
    description:
      'St. Michael spiritual item — blessed for protection, strength, and divine guidance. A cherished tool in Celestial Church practice.',
    featured: false,
    active: true,
    rating: 4.9,
    reviewCount: 7,
  },
  {
    id: 'divine-grace',
    name: 'Divine Grace',
    category: 'Spiritual Items',
    variants: [{ id: 'solo', label: 'Solo', price: 1700, stock: 25 }],
    description:
      'Divine Grace — a spiritually significant item for anointing and blessings, used in prayer and consecration ceremonies.',
    featured: false,
    active: true,
    rating: 4.7,
    reviewCount: 5,
  },
  {
    id: 'onola',
    name: 'Onola',
    category: 'Spiritual Items',
    variants: [{ id: 'solo', label: 'Solo', price: 2000, stock: 25 }],
    description:
      'Onola — a traditional spiritual item for cleansing, protection, and prayer support within Celestial Church worship.',
    featured: false,
    active: true,
    rating: 4.6,
    reviewCount: 4,
  },
  {
    id: 'back-to-sender',
    name: 'Back to Sender',
    category: 'Spiritual Items',
    variants: [{ id: 'solo', label: 'Solo', price: 2000, stock: 25 }],
    description:
      'Back to Sender — a powerful spiritual item for divine protection against negative forces, used in intercessory prayer.',
    featured: false,
    active: true,
    rating: 4.8,
    reviewCount: 9,
  },
  {
    id: 'miss-paris',
    name: 'Miss Paris',
    category: 'Perfumes',
    variants: [
      { id: 'solo', label: 'Solo', price: 1700, stock: 25 },
      { id: 'big', label: 'Big', price: 4000, stock: 25 },
    ],
    description:
      'Miss Paris — an elegant, enduring fragrance used in worship and personal anointing. Available in solo and large sizes.',
    featured: true,
    active: true,
    rating: 4.9,
    reviewCount: 18,
  },
  {
    id: 'amure',
    name: 'Amure',
    category: 'Perfumes',
    variants: [{ id: 'standard', label: 'Standard', price: 800, stock: 25 }],
    description:
      'Amure — a delicate, gentle fragrance for daily spiritual use and personal worship in the Celestial Church tradition.',
    featured: false,
    active: true,
    rating: 4.5,
    reviewCount: 6,
  },
  {
    id: 'cross-wewe',
    name: 'Cross Wewe',
    category: 'Spiritual Items',
    variants: [],
    comingSoon: true,
    description: 'Cross Wewe — a new spiritual item arriving soon. Check back for availability.',
    featured: false,
    active: false,
    rating: 0,
    reviewCount: 0,
  },
  {
    id: 'bible',
    name: 'Bible',
    category: 'Bibles',
    variants: [
      { id: 'small', label: 'Small', price: 6000, stock: 25 },
      { id: 'medium', label: 'Medium', price: 9000, stock: 25 },
    ],
    description:
      'Holy Bible — King James Version, the standard text for Celestial Church worship. Available in small and medium editions.',
    featured: true,
    active: true,
    rating: 5.0,
    reviewCount: 24,
  },
  {
    id: 'papa-perfume',
    name: 'Papa Perfume',
    category: 'Perfumes',
    variants: [{ id: 'standard', label: 'Standard', price: 2000, stock: 25 }],
    description: 'Papa Perfume — a classic, beloved spiritual fragrance for anointing and daily worship use.',
    featured: false,
    active: true,
    rating: 4.7,
    reviewCount: 11,
  },
  {
    id: 'goya-oil',
    name: 'Goya Oil',
    category: 'Oils',
    variants: [{ id: 'standard', label: 'Standard', price: 1000, stock: 25 }],
    description:
      'Goya anointing oil — blessed for prayer, consecration, and spiritual healing in Celestial Church practice.',
    featured: true,
    active: true,
    rating: 4.8,
    reviewCount: 15,
  },
]

export const CATEGORIES: Category[] = ['Candles', 'Bibles', 'Oils', 'Perfumes', 'Spiritual Items']

export const ADMIN_CATEGORIES: AdminCategory[] = [
  { id: 'cat-candles', name: 'Candles', description: 'Pure wax candles for prayer and vigil', active: true, displayOrder: 1 },
  { id: 'cat-bibles', name: 'Bibles', description: 'Holy Bibles in various editions', active: true, displayOrder: 2 },
  { id: 'cat-oils', name: 'Oils', description: 'Anointing and healing oils', active: true, displayOrder: 3 },
  { id: 'cat-perfumes', name: 'Perfumes', description: 'Spiritual fragrances for worship', active: true, displayOrder: 4 },
  { id: 'cat-spiritual', name: 'Spiritual Items', description: 'Sacred items for Celestial Church practice', active: true, displayOrder: 5 },
]

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    badge: 'New Arrivals',
    headline: 'Faith. Worship.\nSpirit.',
    description: 'Authentic spiritual products for the Celestial Church community.',
    cta: 'Shop Now',
    ctaScreen: 'shop',
    active: true,
    order: 1,
  },
  {
    id: 'slide-2',
    badge: 'Essentials',
    headline: 'Anointed Oils\n& Candles',
    description: 'Pure candles and blessed oils for your prayer life and vigil nights.',
    cta: 'View Oils & Candles',
    ctaScreen: 'shop',
    active: true,
    order: 2,
  },
  {
    id: 'slide-3',
    badge: 'Featured',
    headline: 'Sacred Bibles\n& Perfumes',
    description: 'King James Bibles and worship fragrances for every believer.',
    cta: 'Explore Products',
    ctaScreen: 'shop',
    active: true,
    order: 3,
  },
]

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Adewale Johnson',
    email: 'adewale@example.com',
    phone: '08012345678',
    registeredAt: '2024-09-15',
    orderCount: 2,
  },
  {
    id: 'cust-2',
    name: 'Blessing Okafor',
    email: 'blessing@example.com',
    phone: '08098765432',
    registeredAt: '2024-10-01',
    orderCount: 1,
  },
  {
    id: 'cust-3',
    name: 'Emmanuel Adeyemi',
    email: 'emmanuel@example.com',
    phone: '07056789012',
    registeredAt: '2024-11-20',
    orderCount: 1,
  },
]

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ASE-2024-001',
    date: '2024-11-10',
    status: 'Delivered',
    paymentStatus: 'Paid',
    items: [
      {
        product: PRODUCTS.find((p) => p.id === 'bible')!,
        variant: { id: 'medium', label: 'Medium', price: 9000, stock: 25 },
        quantity: 1,
      },
      {
        product: PRODUCTS.find((p) => p.id === 'goya-oil')!,
        variant: { id: 'standard', label: 'Standard', price: 1000, stock: 25 },
        quantity: 2,
      },
    ],
    subtotal: 11000,
    deliveryFee: 1500,
    total: 12500,
    address: '14 Celestial Close, Shagamu, Ogun State',
    paymentMethod: 'Bank Transfer',
    deliveryState: 'Ogun',
  },
  {
    id: 'ASE-2024-002',
    date: '2024-12-03',
    status: 'Processing',
    paymentStatus: 'Paid',
    items: [
      {
        product: PRODUCTS.find((p) => p.id === 'miss-paris')!,
        variant: { id: 'big', label: 'Big', price: 4000, stock: 25 },
        quantity: 1,
      },
      {
        product: PRODUCTS.find((p) => p.id === 'candles')!,
        variant: { id: 'medium', label: 'Medium', price: 900, stock: 25 },
        quantity: 3,
      },
    ],
    subtotal: 6700,
    deliveryFee: 1500,
    total: 8200,
    address: '7 Harmony Street, Ikorodu, Lagos State',
    paymentMethod: 'Cash on Delivery',
    deliveryState: 'Lagos',
  },
]

export function formatPrice(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`
}

export function formatStateList(states: string[]): string {
  if (states.length === 0) return ''
  if (states.length === 1) return states[0]
  if (states.length === 2) return `${states[0]} and ${states[1]}`
  return `${states.slice(0, -1).join(', ')}, and ${states[states.length - 1]}`
}

export function getProductById(id: string, products?: Product[]): Product | undefined {
  return (products ?? PRODUCTS).find((p) => p.id === id)
}

export function getVariantById(product: Product, variantId: string) {
  return product.variants.find((v) => v.id === variantId)
}
