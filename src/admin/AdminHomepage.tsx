import { fieldClassName, inputClassName, inputErrorClassName } from "../components/formStyles"
import { useState } from 'react'
import { useApp } from '../context'
import type { HeroSlide } from '../types'
import type { Screen } from '../types'

function newSlide(): HeroSlide {
  return {
    id: `slide-${Date.now()}`,
    badge: 'New',
    headline: 'New Headline',
    description: 'Description text here.',
    cta: 'Shop Now',
    ctaScreen: 'shop' as Screen,
    active: true,
    order: Date.now(),
  }
}

export default function AdminHomepage() {
  const { heroSlides, setHeroSlides, products, setProducts } = useApp()
  const [editSlide, setEditSlide] = useState<HeroSlide | null>(null)

  const sorted = [...heroSlides].sort((a, b) => a.order - b.order)

  function toggleSlide(id: string) {
    setHeroSlides(heroSlides.map((s) => s.id === id ? { ...s, active: !s.active } : s))
  }

  function removeSlide(id: string) {
    if (confirm('Remove this hero slide?')) {
      setHeroSlides(heroSlides.filter((s) => s.id !== id))
    }
  }

  function saveSlide(slide: HeroSlide) {
    const exists = heroSlides.some((s) => s.id === slide.id)
    if (exists) {
      setHeroSlides(heroSlides.map((s) => s.id === slide.id ? slide : s))
    } else {
      setHeroSlides([...heroSlides, slide])
    }
    setEditSlide(null)
  }

  function toggleFeatured(productId: string) {
    setProducts(products.map((p) => p.id === productId ? { ...p, featured: !p.featured } : p))
  }

  return (
    <div style={{ maxWidth: 720 }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: 'var(--c-text)', margin: '0 0 4px' }}>
        Homepage
      </h1>
      <p style={{ fontSize: '0.875rem', color: 'var(--c-text2)', margin: '0 0 24px' }}>
        Manage hero slides and featured products shown on the home screen.
      </p>

      {/* Hero Slides */}
      <section style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.125rem', fontWeight: 700, color: 'var(--c-text)', margin: 0 }}>
            Hero Slides
          </h2>
          <button
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-[1.5px] border-brand bg-transparent px-[22px] py-3 text-sm font-semibold text-brand transition duration-150 hover:bg-[#F7F0E3] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() => setEditSlide(newSlide())}
            style={{ fontSize: '0.8125rem', padding: '6px 12px', minHeight: 36 }}
          >
            + Add Slide
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {sorted.map((slide) => (
            <div
              key={slide.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                padding: '14px 16px',
                backgroundColor: 'var(--c-surface)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)',
                opacity: slide.active ? 1 : 0.55,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 8,
                  background: 'linear-gradient(135deg, #1a0830, #35105C)',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--c-text)', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {slide.headline.replace('\n', ' ')}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--c-text2)', margin: 0 }}>
                  {slide.badge} · CTA: "{slide.cta}"
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button
                  onClick={() => setEditSlide(slide)}
                  style={{ padding: '6px 10px', background: 'var(--c-cream)', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: '0.75rem', color: 'var(--c-text)', fontWeight: 500 }}
                >
                  Edit
                </button>
                <button
                  onClick={() => toggleSlide(slide.id)}
                  style={{
                    width: 40,
                    height: 24,
                    borderRadius: 12,
                    border: 'none',
                    background: slide.active ? 'var(--c-primary)' : 'var(--c-border)',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'background 0.2s ease',
                  }}
                >
                  <span style={{ position: 'absolute', top: 3, left: slide.active ? 18 : 3, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left 0.2s ease', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                </button>
                <button onClick={() => removeSlide(slide.id)} style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--c-error)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14H6L5 6"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.125rem', fontWeight: 700, color: 'var(--c-text)', margin: '0 0 14px' }}>
          Featured Products
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {products.filter((p) => p.active && !p.comingSoon).map((p) => (
            <label
              key={p.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 16px',
                backgroundColor: 'var(--c-surface)',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={p.featured}
                onChange={() => toggleFeatured(p.id)}
                style={{ width: 18, height: 18, accentColor: 'var(--c-primary)', cursor: 'pointer' }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 500, fontSize: '0.875rem', color: 'var(--c-text)', margin: '0 0 1px' }}>{p.name}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--c-text2)', margin: 0 }}>{p.category}</p>
              </div>
              {p.featured && <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--c-gold)', background: '#fef6e0', padding: '2px 8px', borderRadius: 100 }}>Featured</span>}
            </label>
          ))}
        </div>
      </section>

      {/* Slide editor modal */}
      {editSlide && (
        <>
          <div className="modal-backdrop" onClick={() => setEditSlide(null)} />
          <div className="modal-sheet" style={{ padding: 24 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.125rem', fontWeight: 700, color: 'var(--c-text)', margin: '0 0 16px' }}>
              Edit Slide
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Badge', key: 'badge' as const },
                { label: 'Headline', key: 'headline' as const },
                { label: 'Description', key: 'description' as const },
                { label: 'CTA Button Text', key: 'cta' as const },
              ].map(({ label, key }) => (
                <div className={fieldClassName} key={key}>
                  <label>{label}</label>
                  <input
                    type="text"
                    className={inputClassName}
                    value={editSlide[key]}
                    onChange={(e) => setEditSlide({ ...editSlide, [key]: e.target.value })}
                  />
                </div>
              ))}
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-0 bg-brand px-[22px] py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(53,16,92,0.25)] transition duration-150 hover:bg-[#4a1880] hover:shadow-[0_4px_14px_rgba(53,16,92,0.35)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40" onClick={() => saveSlide(editSlide)} style={{ flex: 1 }}>Save Slide</button>
                <button className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-[1.5px] border-brand bg-transparent px-[22px] py-3 text-sm font-semibold text-brand transition duration-150 hover:bg-[#F7F0E3] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40" onClick={() => setEditSlide(null)}>Cancel</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
