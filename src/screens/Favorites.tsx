import { useApp } from '../context'
import ProductCard from '../components/ProductCard'

export default function Favorites() {
  const { wishlist, products, navigate, isLoggedIn, setLoginModalOpen } = useApp()

  if (!isLoggedIn) {
    return (
      <div style={{ padding: '64px 16px', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--c-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--c-text2)" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 700, color: 'var(--c-text)', marginBottom: 8 }}>
          Your Favourites
        </h2>
        <p style={{ color: 'var(--c-text2)', fontSize: '0.875rem', marginBottom: 24 }}>
          Sign in to save and view your favourite products.
        </p>
        <button className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-0 bg-brand px-[22px] py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(53,16,92,0.25)] transition duration-150 hover:bg-[#4a1880] hover:shadow-[0_4px_14px_rgba(53,16,92,0.35)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40" onClick={() => setLoginModalOpen(true)} style={{ minWidth: 200 }}>
          Sign In
        </button>
      </div>
    )
  }

  const wishedProducts = wishlist
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products

  if (wishedProducts.length === 0) {
    return (
      <div style={{ padding: '64px 16px', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--c-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--c-text2)" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 700, color: 'var(--c-text)', marginBottom: 8 }}>
          No favourites yet
        </h2>
        <p style={{ color: 'var(--c-text2)', fontSize: '0.875rem', marginBottom: 24 }}>
          Tap the heart icon on any product to save it here.
        </p>
        <button className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-0 bg-brand px-[22px] py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(53,16,92,0.25)] transition duration-150 hover:bg-[#4a1880] hover:shadow-[0_4px_14px_rgba(53,16,92,0.35)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40" onClick={() => navigate('shop')} style={{ minWidth: 200 }}>
          Browse Products
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px 16px 24px' }}>
      <div className="mx-auto w-full max-w-[760px] px-4 md:px-6">
        <div style={{ marginBottom: 20 }}>
          <h1 className="relative pb-2 font-serif text-[1.375rem] font-bold text-brand-ink after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-7 after:rounded-sm after:bg-brand-gold after:content-['']">
            Favourites
          </h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--c-text2)', marginTop: 12 }}>
            {wishedProducts.length} saved item{wishedProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 min-[560px]:grid-cols-3 md:grid-cols-4" role="list">
          {wishedProducts.map((product) => (
            <div key={product.id} role="listitem">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
