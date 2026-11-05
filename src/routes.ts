import { matchRoutes } from "react-router-dom"
import type { NavParams } from "./context"
import type { Screen } from "./types"

export interface AppRoute {
  path: string
  screen: Screen
}

export const APP_ROUTES: AppRoute[] = [
  { path: "/", screen: "home" },
  { path: "/shop", screen: "shop" },
  { path: "/categories", screen: "categories" },
  { path: "/category/:categoryId", screen: "category" },
  { path: "/search", screen: "search" },
  { path: "/favorites", screen: "favorites" },
  { path: "/products/:productId", screen: "product" },
  { path: "/cart", screen: "cart" },
  { path: "/login", screen: "auth" },
  { path: "/forgot-password", screen: "forgot-password" },
  { path: "/checkout", screen: "checkout" },
  { path: "/order-confirmation/:orderId", screen: "order-confirmation" },
  { path: "/orders/:orderId/cancelled", screen: "order-cancelled" },
  { path: "/orders/:orderId", screen: "order-details" },
  { path: "/orders", screen: "orders" },
  { path: "/account", screen: "account" },
  { path: "/account/profile", screen: "account-profile" },
  { path: "/account/wishlist", screen: "account-wishlist" },
  { path: "/account/reviews", screen: "account-reviews" },
  { path: "/account/reviews/:reviewProductId", screen: "review-submit" },
  { path: "/account/addresses", screen: "account-addresses" },
  { path: "/account/preferences", screen: "account-preferences" },
  { path: "/privacy", screen: "privacy" },
  { path: "/terms", screen: "terms" },
  { path: "/help", screen: "help-support" },
  { path: "/bible", screen: "bible" },
  { path: "/design-handoff", screen: "design-handoff" },
  { path: "/admin/login", screen: "admin-login" },
  { path: "/admin", screen: "admin-dashboard" },
  { path: "/admin/products", screen: "admin-products" },
  { path: "/admin/products/new", screen: "admin-product-editor" },
  { path: "/admin/products/:editProductId", screen: "admin-product-editor" },
  { path: "/admin/categories", screen: "admin-categories" },
  { path: "/admin/orders", screen: "admin-orders" },
  { path: "/admin/customers", screen: "admin-customers" },
  { path: "/admin/homepage", screen: "admin-homepage" },
  { path: "/admin/reviews", screen: "admin-reviews" },
  { path: "/admin/settings", screen: "admin-settings" },
]

export function resolveAppRoute(pathname: string, search = "") {
  const matches = matchRoutes(
    APP_ROUTES.map((route) => ({ ...route, id: route.screen })),
    pathname,
  )
  const match = matches?.at(-1)
  const params = (match?.params ?? {}) as NavParams
  const query = new URLSearchParams(search).get("q") ?? undefined

  return {
    screen: (match?.route.id as Screen | undefined) ?? "home",
    params: { ...params, query },
  }
}

export function pathForScreen(screen: Screen, params: NavParams = {}, searchQuery = "") {
  const encoded = (value?: string) => encodeURIComponent(value ?? "")
  const paths: Record<Screen, string> = {
    home: "/",
    shop: "/shop",
    product: params.productId ? `/products/${encoded(params.productId)}` : "/shop",
    cart: "/cart",
    auth: "/login",
    checkout: "/checkout",
    "order-confirmation": params.orderId ? `/order-confirmation/${encoded(params.orderId)}` : "/orders",
    "order-details": params.orderId ? `/orders/${encoded(params.orderId)}` : "/orders",
    "order-cancelled": params.orderId ? `/orders/${encoded(params.orderId)}/cancelled` : "/orders",
    orders: "/orders",
    account: "/account",
    "account-profile": "/account/profile",
    "account-wishlist": "/account/wishlist",
    "account-reviews": "/account/reviews",
    "account-addresses": "/account/addresses",
    "account-preferences": "/account/preferences",
    privacy: "/privacy",
    terms: "/terms",
    categories: "/categories",
    category: params.categoryId ? `/category/${encoded(params.categoryId)}` : "/categories",
    search: "/search",
    favorites: "/favorites",
    "forgot-password": "/forgot-password",
    "help-support": "/help",
    "review-submit": params.reviewProductId ? `/account/reviews/${encoded(params.reviewProductId)}` : "/account/reviews",
    bible: "/bible",
    "design-handoff": "/design-handoff",
    "admin-login": "/admin/login",
    "admin-dashboard": "/admin",
    "admin-products": "/admin/products",
    "admin-product-editor": params.editProductId ? `/admin/products/${encoded(params.editProductId)}` : "/admin/products/new",
    "admin-categories": "/admin/categories",
    "admin-orders": "/admin/orders",
    "admin-customers": "/admin/customers",
    "admin-homepage": "/admin/homepage",
    "admin-reviews": "/admin/reviews",
    "admin-settings": "/admin/settings",
  }
  const pathname = paths[screen]
  const query = screen === "search" ? (params.query ?? searchQuery).trim() : ""
  return query ? `${pathname}?q=${encodeURIComponent(query)}` : pathname
}
