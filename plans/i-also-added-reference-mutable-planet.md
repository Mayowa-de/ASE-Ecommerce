# ASE — Full E-Commerce Expansion Plan

## Context

The user has attached `e-commerce-app-spec.md` plus three reference images (an existing My Orders prototype screenshot, the business flyer/marketing material, and the branded packaging bag). The existing app has ~13 customer screens and no admin area. The new spec requires a significantly expanded, fully connected application with ~25 customer screens, a complete admin area (9 screens), richer data structures, a desktop experience, and a fixed bottom-nav correction (`Products` → `Categories`).

### Business Contact Info (from reference images — use in footer/help/settings)
- **WhatsApp:** 07076186828
- **Phone:** 08143027490
- **Location:** CCC Oba Olutunu Model Parish, Odeda, Ogun State
- **Bottom nav (existing prototype):** Home / Products / Orders / Account — **spec changes "Products" → "Categories"**

---

## Architecture Decisions

### Navigation
Keep the existing history-stack navigation in `context.tsx`. Extend the `Screen` union to cover all new screens. Add a top-level `appMode: 'customer' | 'admin'` in context to switch the entire shell between customer-facing and admin-facing layouts. Admin is accessible via a prototype toggle (a small "Admin" link at the bottom of the Account screen, or in Settings) — no real auth for admin in prototype.

### Admin shell
Admin gets its own layout: a compact top bar on mobile and a left sidebar on desktop (≥1024px), separate from the customer `Header` + `BottomNav`. Admin never shows customer BottomNav.

### Desktop experience
At `≥1024px`, the customer Header expands to show full horizontal nav (Home, Shop, Search, Favorites, Orders, Account, Cart). A desktop Footer replaces the mobile bottom nav. Product grids become 3–4 columns. Product detail becomes two-column (image left, info right).

---

## Data Layer Changes

### `src/types.ts` — extend existing types

```ts
// Extend Variant
interface Variant {
  id: string
  label: string
  price: number
  stock: number  // NEW — default 25
}

// Extend Product
interface Product {
  id: string
  name: string
  category: Category
  variants: Variant[]
  comingSoon?: boolean
  description: string
  featured: boolean        // NEW
  active: boolean          // NEW (admin can deactivate)
  rating: number           // NEW — default 0
  reviewCount: number      // NEW — default 0
}

// Extend Order
type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Out for Delivery' | 'Delivered' | 'Cancelled'
type PaymentStatus = 'Pending' | 'Paid' | 'Failed'
interface Order {
  // existing fields...
  paymentStatus: PaymentStatus  // NEW
  deliveryFee: number           // NEW — 0 = "calculated"
  subtotal: number              // NEW (derived but stored)
}

// NEW types
interface HeroSlide {
  id: string
  badge: string
  headline: string
  description: string
  cta: string
  ctaScreen: Screen
  active: boolean
  order: number
}

interface AdminCategory {
  id: string
  name: string         // matches Category union for now
  description: string
  active: boolean
  displayOrder: number
}

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  registeredAt: string
  orderCount: number
}

// Screen union — add new screens
type Screen =
  | 'home' | 'shop' | 'product' | 'cart' | 'auth'
  | 'checkout' | 'order-confirmation' | 'order-details'
  | 'order-cancelled' | 'orders' | 'account'
  | 'account-profile' | 'account-wishlist' | 'account-reviews'
  | 'account-addresses' | 'account-preferences'
  | 'privacy' | 'terms'
  // NEW customer screens:
  | 'categories' | 'category' | 'search' | 'favorites'
  | 'forgot-password' | 'help-support' | 'review-submit'
  // NEW admin screens:
  | 'admin-dashboard' | 'admin-products' | 'admin-product-editor'
  | 'admin-categories' | 'admin-orders' | 'admin-customers'
  | 'admin-homepage' | 'admin-reviews' | 'admin-settings'
```

### `src/data.ts` — extend existing data

- Add `stock: 25` to every existing variant.
- Add `featured: true` to 4 products (Candles, Miss Paris, Bible, Goya Oil), `false` for rest.
- Add `active: true` to all, `rating: 0`, `reviewCount: 0`.
- Cross Wewe: `active: false`, `comingSoon: true`, no variants.
- Add `HERO_SLIDES: HeroSlide[]` — 3 slides using spec copy.
- Add `ADMIN_CATEGORIES: AdminCategory[]` — 5 categories mirroring `CATEGORIES`.
- Add `MOCK_CUSTOMERS: Customer[]` — 2–3 demo customers.
- Add `STORE_CONFIG` object: `{ whatsapp: '07076186828', phone: '08143027490', location: 'CCC Oba Olutunu Model Parish, Odeda, Ogun State', deliveryStates: ['Lagos', 'Ogun'] }`.
- Update `MOCK_ORDERS` to include `paymentStatus`, `deliveryFee`, `subtotal`.

### `src/context.tsx` — extend existing context

Add:
- `appMode: 'customer' | 'admin'`, `setAppMode()`
- `heroSlides` + `setHeroSlides` (admin can edit)
- `adminCategories` + `setAdminCategories`
- `products` (mutable from `PRODUCTS`), `setProducts` (admin can edit, add, delete)
- `customers: Customer[]` (read-only mock)
- `storeConfig` + `setStoreConfig`
- `searchQuery` + `setSearchQuery` (for search results screen)

---

## Files to Create / Modify

### Modified files

| File | Change |
|------|--------|
| `src/types.ts` | Extend all types as above |
| `src/data.ts` | Add stock, featured, active, heroSlides, storeConfig, customers |
| `src/context.tsx` | Add appMode, mutable products/heroSlides/categories/storeConfig |
| `src/App.tsx` | Add admin shell branch; render new customer + admin screens |
| `src/components/BottomNav.tsx` | Change "Products" → "Categories", link to `categories` |
| `src/components/Header.tsx` | Add desktop expanded nav (≥1024px); add mobile search icon |
| `src/screens/Home.tsx` | Update to use mutable `heroSlides` and `products` from context; add brand message section; add desktop footer |
| `src/screens/Account.tsx` | Add Help & Support link; add Admin access button (prototype) |
| `src/screens/Auth.tsx` | Add Confirm Password field for register; add Forgot Password link |
| `src/screens/Checkout.tsx` | Fix delivery states to Lagos/Ogun only; add deliveryFee field |
| `src/screens/OrderDetails.tsx` | Add payment status badge; WhatsApp support link |
| `src/screens/MyOrders.tsx` | Add payment status column; extended order statuses |

### New customer-facing screen files

| File | Description |
|------|-------------|
| `src/screens/Categories.tsx` | Grid of all active categories; taps into `category` with `categoryId` param |
| `src/screens/Category.tsx` | Per-category product grid with filters/sort; reads `categoryId` from params |
| `src/screens/Search.tsx` | Search results page; reads `searchQuery` from context; filters/sort |
| `src/screens/Favorites.tsx` | Full wishlist page (rename/expand existing AccountWishlist) |
| `src/screens/ForgotPassword.tsx` | Email entry → confirmation message (prototype only, no real email) |
| `src/screens/HelpSupport.tsx` | WhatsApp button + store address; no contact form |
| `src/screens/ReviewSubmit.tsx` | Standalone review submission page (driven by orderId param) |

### New admin files

| File | Description |
|------|-------------|
| `src/admin/AdminShell.tsx` | Admin layout: top bar + sidebar (desktop), top bar only (mobile) |
| `src/admin/AdminDashboard.tsx` | Stats: total orders, pending, revenue, products, low stock; recent orders table |
| `src/admin/AdminProducts.tsx` | Searchable product table; toggle active/featured; link to editor |
| `src/admin/AdminProductEditor.tsx` | Form to add/edit a product: name, category, description, variants (price + stock), featured, active |
| `src/admin/AdminCategories.tsx` | Category list; edit name/description; toggle active; reorder |
| `src/admin/AdminOrders.tsx` | Orders table with search; status update dropdown per row |
| `src/admin/AdminCustomers.tsx` | Customer list with name/email/phone/order count; expandable order history |
| `src/admin/AdminHomepage.tsx` | Hero slides CRUD: add/edit/remove/reorder/toggle active; featured products toggle |
| `src/admin/AdminReviews.tsx` | Review list per product; remove button; no approval queue |
| `src/admin/AdminSettings.tsx` | Edit storeConfig: business name, WhatsApp, phone, location, delivery states |

### New shared components

| File | Description |
|------|-------------|
| `src/components/Footer.tsx` | Desktop footer (hidden on mobile; visible ≥1024px): brand, nav links, categories, store info, WhatsApp, legal |
| `src/components/Breadcrumb.tsx` | Generic breadcrumb: `[{label, screen?}]` |
| `src/components/Rating.tsx` | Star display (read-only) + star input (interactive) |
| `src/components/SearchBar.tsx` | Standalone search input with submit; navigates to `search` screen |
| `src/components/Toast.tsx` + `ToastContext` | Simple toast notification system (add-to-cart, review submitted, saved, etc.) |
| `src/components/EmptyState.tsx` | Reusable empty state: icon, heading, body, optional CTA |
| `src/components/Skeleton.tsx` | Skeleton loader for product cards and order cards |
| `src/components/FilterDrawer.tsx` | Mobile bottom-sheet filter drawer for Shop/Category/Search |

---

## Responsive Breakpoints

| Breakpoint | Behaviour |
|------------|-----------|
| 320–767px | Mobile: compact header, bottom nav, 2-col product grid |
| 768–1023px | Tablet: 3-col product grid, no desktop footer yet, still bottom nav |
| 1024px+ | Desktop: expanded header with full nav, no bottom nav, desktop footer, 4-col product grid, two-col product detail |

Desktop-only CSS classes to add in `index.css`:
```css
.desktop-header-nav { display: none; }
@media (min-width: 1024px) {
  .desktop-header-nav { display: flex; }
  .mobile-bottom-nav { display: none; }
  .desktop-footer { display: block; }
}
```

---

## Implementation Order

1. **Types + data** — extend `types.ts` and `data.ts` (foundation; everything else depends on this)
2. **Context** — add mutable products/heroSlides/adminCategories/storeConfig/appMode
3. **Shared components** — Footer, Breadcrumb, Rating, SearchBar, Toast, EmptyState, Skeleton, FilterDrawer
4. **BottomNav fix** — Products → Categories, navigate to `categories`
5. **Header** — add desktop expanded nav, mobile search icon
6. **New customer screens** — Categories, Category, Search, Favorites, ForgotPassword, HelpSupport, ReviewSubmit
7. **Updated customer screens** — Home (heroSlides from context, brand section, desktop footer), Auth (confirm pwd, forgot link), Account (help link, admin toggle), Checkout (Lagos/Ogun only), OrderDetails (payment status, WhatsApp link)
8. **App.tsx** — add admin shell branch; wire all new screens
9. **Admin shell + screens** — AdminShell, then Dashboard → Products → ProductEditor → Categories → Orders → Customers → Homepage → Reviews → Settings

---

## Key Spec Constraints to Preserve

- Bottom nav: exactly **Home / Categories / Orders / Account** — Cart is NOT in bottom nav
- Cross Wewe: `comingSoon: true`, no price, not purchasable
- Delivery states: **Lagos and Ogun only** (extendable via admin settings)
- Order statuses: Pending → Confirmed → Processing → Out for Delivery → Delivered → Cancelled
- Payment statuses: **Pending / Paid / Failed** only
- Reviews: require `status === 'Delivered'`; publish immediately; 1–5 stars + written text
- WhatsApp is the **only** online support channel — no contact form
- No coupons
- No fake business claims; editable placeholders where info is missing

---

## Remaining Fixes (implementation in progress)

The major implementation is complete. These targeted fixes remain:

1. **`src/screens/Checkout.tsx`** — Change `DELIVERY_STATES = ['Lagos', 'Ogun', 'Ondo']` → `['Lagos', 'Ogun']`; fix delivery note text; add `paymentStatus: 'Pending'`, `subtotal: cartTotal`, `deliveryFee: 0` to the `Order` object in `handleSubmit`
2. **`src/screens/AccountSubScreens.tsx`** — Add `authorName: user?.name ?? 'Anonymous'` to the `addReview()` call (new required field on `Review` interface)
3. **`src/screens/ProductDetail.tsx`** — Fix delivery text: "Lagos, Ogun, and Ondo States" → "Lagos and Ogun States only"
4. **`src/screens/PrivacyPolicy.tsx`** — Fix Section 3: "Lagos, Ogun, and Ondo States" → "Lagos and Ogun States"
5. **`src/screens/Terms.tsx`** — Fix Section 4: "Lagos, Ogun, and Ondo States only" → "Lagos and Ogun States only"
6. **TypeScript check** — `pnpm tsc --noEmit` must pass with zero errors

## Verification

1. `pnpm tsc --noEmit` — must pass with zero errors after types changes
2. Navigate every screen in the preview; confirm no dead-end navigation
3. Check bottom nav at 320px/375px/414px/768px — 4 equal columns, Home/Categories/Orders/Account
4. Add a product as admin → verify it appears in shop/categories
5. Mark a product featured → verify it appears on homepage featured section
6. Edit a hero slide → verify homepage carousel updates
7. Place an order as customer → admin can update status to Delivered → customer can submit review
8. Toggle dark mode → verify admin and customer areas both respond correctly
9. Verify desktop ≥1024px: expanded header visible, bottom nav hidden, footer visible
