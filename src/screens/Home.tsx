import { useState, useEffect, useRef } from 'react'
import { useApp } from '../context'
import ProductCard from '../components/ProductCard'
import { CategoryImage } from '../components/ProductImage'
import Footer from '../components/Footer'
import CatalogEmptyState from '../components/CatalogEmptyState'
import type { Category } from '../types'

function HeroCarousel() {
  const { navigate, heroSlides } = useApp()
  const activeSlides = heroSlides.filter((s) => s.active).sort((a, b) => a.order - b.order)
  const [active, setActive] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX = useRef<number | null>(null)

  function startTimer() {
    timerRef.current = setInterval(() => {
      setActive((a) => (a + 1) % activeSlides.length)
    }, 4500)
  }

  useEffect(() => {
    if (activeSlides.length < 2) return
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlides.length])

  function go(idx: number) {
    setActive(idx)
    if (timerRef.current) clearInterval(timerRef.current)
    startTimer()
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) {
      go(dx < 0 ? (active + 1) % activeSlides.length : (active - 1 + activeSlides.length) % activeSlides.length)
    }
    touchStartX.current = null
  }

  if (activeSlides.length === 0) return null
  const slide = activeSlides[active] ?? activeSlides[0]

  return (
    <section
      aria-label="Featured offers"
      style={{
        position: 'relative',
        width: '100%',
        background: 'linear-gradient(145deg, #1a0830 0%, #35105C 55%, #4a1040 100%)',
        overflow: 'hidden',
        userSelect: 'none',
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Background shimmer */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 80% 20%, rgba(201,154,36,0.18) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(90,30,140,0.25) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Arrow — left */}
      {activeSlides.length > 1 && (
        <button
          onClick={() => go((active - 1 + activeSlides.length) % activeSlides.length)}
          aria-label="Previous slide"
          style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 44, zIndex: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.5)', transition: 'color 0.15s ease',
            WebkitTapHighlightColor: 'transparent',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.9)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
      )}

      {/* Content */}
      <div
        style={{
          padding: 'clamp(28px, 6vw, 56px) clamp(48px, 9vw, 80px)',
          minHeight: 'clamp(210px, 44vw, 310px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 12,
          textAlign: 'center',
        }}
      >
        <p
          key={`badge-${active}`}
          style={{
            fontSize: '0.625rem', fontWeight: 600, color: 'var(--c-champagne)',
            letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0,
            animation: 'fadeUp 0.4s ease both',
          }}
        >
          {slide.badge}
        </p>
        <h2
          key={`hl-${active}`}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 5vw, 2.375rem)',
            color: '#ffffff',
            margin: 0,
            lineHeight: 1.15,
            whiteSpace: 'pre-line',
            animation: 'fadeUp 0.45s ease 0.05s both',
          }}
        >
          {slide.headline}
        </h2>
        <p
          key={`body-${active}`}
          style={{
            fontSize: 'clamp(0.75rem, 2.5vw, 0.9375rem)',
            color: 'rgba(255,255,255,0.7)',
            margin: 0,
            lineHeight: 1.55,
            animation: 'fadeUp 0.5s ease 0.1s both',
          }}
        >
          {slide.description}
        </p>
        <div key={`cta-${active}`} style={{ marginTop: 6, animation: 'fadeUp 0.55s ease 0.15s both' }}>
          <button
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-0 bg-brand-gold px-[22px] py-3 text-sm font-semibold text-[#24103D] shadow-[0_4px_16px_rgba(201,154,36,0.28)] transition duration-150 hover:bg-[#E7C978] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() => navigate(slide.ctaScreen)}
            style={{ fontSize: '0.8125rem', padding: '0.625rem 1.625rem' }}
          >
            {slide.cta}
          </button>
        </div>
      </div>

      {/* Arrow — right */}
      {activeSlides.length > 1 && (
        <button
          onClick={() => go((active + 1) % activeSlides.length)}
          aria-label="Next slide"
          style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: 44, zIndex: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.5)', transition: 'color 0.15s ease',
            WebkitTapHighlightColor: 'transparent',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.9)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      )}

      {/* Dots */}
      {activeSlides.length > 1 && (
        <div
          aria-label="Slide pagination"
          role="tablist"
          style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6, zIndex: 10 }}
        >
          {activeSlides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => go(i)}
              style={{
                width: i === active ? 22 : 6,
                height: 6,
                borderRadius: 3,
                border: 'none',
                background: i === active ? 'var(--c-gold)' : 'rgba(255,255,255,0.3)',
                cursor: 'pointer',
                padding: 0,
                minWidth: 6,
                transition: 'width 0.3s ease, background 0.3s ease',
                WebkitTapHighlightColor: 'transparent',
              }}
            />
          ))}
        </div>
      )}
    </section>
  )
}

const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  Candles: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="12" y1="2" x2="12" y2="4"/><path d="M12 4c0 2-2 3-2 5s1 3 2 3 2-1 2-3-2-3-2-5z"/><line x1="8" y1="12" x2="16" y2="12"/><rect x="8" y="12" width="8" height="10" rx="1"/></svg>,
  Bibles: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/><line x1="12" y1="8" x2="12" y2="14"/><line x1="9" y1="11" x2="15" y2="11"/></svg>,
  Oils: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9 3h6l1 8H8L9 3z"/><path d="M8 11v7a2 2 0 002 2h4a2 2 0 002-2v-7"/><path d="M12 7v4"/></svg>,
  Perfumes: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M7 3h10v2a3 3 0 013 3v9a3 3 0 01-3 3H7a3 3 0 01-3-3V8a3 3 0 013-3V3z"/><path d="M15 3v2M9 3v2"/><path d="M12 10v7M9 13h6"/></svg>,
  'Spiritual Items': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="12" y1="2" x2="12" y2="22"/><line x1="5" y1="9" x2="19" y2="9"/></svg>,
}

export default function Home() {
  const { navigate, products, refreshProducts, productLoading, backendError } = useApp()

  const featuredProducts = products.filter((p) => p.featured && p.active && !p.comingSoon)
  const activeCategories = Array.from(
    new Set(products.filter((p) => p.active && !p.comingSoon).map((p) => p.category))
  ) as Category[]

  return (
    <div>
      <HeroCarousel />

      {/* Brand message bar */}
      <div
        style={{
          background: 'linear-gradient(90deg, var(--c-dark-brand), var(--c-primary), var(--c-dark-brand))',
          padding: '14px 16px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
            fontWeight: 600,
            color: 'var(--c-champagne)',
            margin: 0,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          Faith &nbsp;·&nbsp; Purity &nbsp;·&nbsp; Blessings
        </p>
      </div>

      {/* Categories */}
      <section aria-labelledby="categories-heading" style={{ padding: '28px 16px 0' }}>
        <div className="mx-auto w-full max-w-[760px] px-4 md:px-6">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 18 }}>
            <h2 id="categories-heading" className="relative pb-2 font-serif text-lg font-bold text-brand-ink after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-7 after:rounded-sm after:bg-brand-gold after:content-['']">
              Browse Categories
            </h2>
            <button
              onClick={() => navigate('categories')}
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--c-primary)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 0',
                minHeight: 44,
              }}
            >
              See all →
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 10,
            }}
          >
            {activeCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => navigate('category', { categoryId: cat })}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '12px 8px',
                  borderRadius: 'var(--radius)',
                  transition: 'background 0.15s ease, transform 0.15s ease',
                  WebkitTapHighlightColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'var(--c-cream)'
                  el.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'none'
                  el.style.transform = 'translateY(0)'
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--c-primary), var(--c-primary-h))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--c-champagne)',
                    flexShrink: 0,
                    boxShadow: '0 3px 10px rgba(53,16,92,0.2)',
                  }}
                >
                  {CATEGORY_ICONS[cat]}
                </div>
                <span
                  style={{
                    fontSize: '0.625rem',
                    fontWeight: 600,
                    color: 'var(--c-text)',
                    textAlign: 'center',
                    lineHeight: 1.3,
                    wordBreak: 'break-word',
                  }}
                >
                  {cat}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section aria-labelledby="featured-heading" style={{ padding: '28px 16px 0' }}>
        <div className="mx-auto w-full max-w-[760px] px-4 md:px-6">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 18 }}>
            <h2 id="featured-heading" className="relative pb-2 font-serif text-lg font-bold text-brand-ink after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-7 after:rounded-sm after:bg-brand-gold after:content-['']">
              Featured Products
            </h2>
            <button
              onClick={() => navigate('shop')}
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--c-primary)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 0',
                minHeight: 44,
              }}
            >
              View all →
            </button>
          </div>
          {products.length === 0 ? (
            productLoading || backendError ? null : <CatalogEmptyState onRetry={() => void refreshProducts()} onBrowse={() => navigate('shop')} />
          ) : featuredProducts.length === 0 ? (
            <p className="rounded-xl border border-brand-border bg-brand-surface px-4 py-6 text-center text-sm text-brand-muted">No featured products at the moment. Browse the full catalogue to see what’s available.</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 min-[560px]:grid-cols-3 md:grid-cols-4" role="list" aria-label="Featured products">
              {featuredProducts.slice(0, 4).map((product) => (
                <div key={product.id} role="listitem">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trust / info bar */}
      <div style={{ padding: '24px 16px 0' }}>
        <div className="mx-auto w-full max-w-[760px] px-4 md:px-6">
          <section
            aria-label="Store information"
            style={{
              padding: '16px',
              background: 'linear-gradient(135deg, var(--c-cream), #fff)',
              borderRadius: 'var(--radius-lg)',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 10,
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {[
              {
                label: 'Lagos & Ogun delivery',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--c-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="1" y="3" width="15" height="13" rx="1"/>
                    <path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                ),
              },
              {
                label: 'Authentic products',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--c-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/>
                  </svg>
                ),
              },
              {
                label: 'Secure checkout',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--c-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                ),
              },
            ].map(({ icon, label }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--c-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
                  {icon}
                </div>
                <span style={{ fontSize: '0.625rem', fontWeight: 500, color: 'var(--c-text2)', lineHeight: 1.3 }}>{label}</span>
              </div>
            ))}
          </section>
        </div>
      </div>

      {/* View All CTA */}
      <div style={{ padding: '24px 16px 0', textAlign: 'center' }}>
        <button
          className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-[1.5px] border-brand bg-transparent px-[22px] py-3 text-sm font-semibold text-brand transition duration-150 hover:bg-[#F7F0E3] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => navigate('shop')}
          style={{ minWidth: 220 }}
        >
          View All Products
        </button>
      </div>

      {/* Footer links (mobile only) */}
      <footer
        style={{
          padding: '24px 16px 8px',
          display: 'flex',
          justifyContent: 'center',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        {[
          { label: 'Help & Support', screen: 'help-support' as const },
          { label: 'Privacy Policy', screen: 'privacy' as const },
          { label: 'Terms & Conditions', screen: 'terms' as const },
        ].map(({ label, screen }) => (
          <button
            key={label}
            onClick={() => navigate(screen)}
            style={{
              fontSize: '0.75rem',
              color: 'var(--c-text2)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 0',
            }}
          >
            {label}
          </button>
        ))}
      </footer>
      <p style={{ textAlign: 'center', fontSize: '0.6875rem', color: 'var(--c-text2)', margin: '0 16px 16px', paddingBottom: 4 }}>
        © {new Date().getFullYear()} Adeola Spiritual Enterprises
      </p>

      {/* Desktop footer */}
      <Footer />
    </div>
  )
}
