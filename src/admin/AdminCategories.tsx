import { useApp } from '../context'

export default function AdminCategories() {
  const { adminCategories, setAdminCategories, products } = useApp()

  function toggleActive(id: string) {
    setAdminCategories(adminCategories.map((c) => c.id === id ? { ...c, active: !c.active } : c))
  }

  const sorted = [...adminCategories].sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <div style={{ maxWidth: 700 }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: 'var(--c-text)', margin: '0 0 20px' }}>
        Categories
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {sorted.map((cat) => {
          const count = products.filter((p) => p.category === cat.name && p.active).length
          return (
            <div
              key={cat.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '14px 16px',
                backgroundColor: 'var(--c-surface)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--c-text)', margin: '0 0 3px' }}>
                  {cat.name}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--c-text2)', margin: 0 }}>
                  {cat.description} · {count} product{count !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={() => toggleActive(cat.id)}
                style={{
                  width: 44,
                  height: 26,
                  borderRadius: 13,
                  border: 'none',
                  background: cat.active ? 'var(--c-primary)' : 'var(--c-border)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background 0.2s ease',
                  flexShrink: 0,
                }}
                aria-label={`${cat.active ? 'Deactivate' : 'Activate'} ${cat.name}`}
                aria-pressed={cat.active}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: 3,
                    left: cat.active ? 20 : 3,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: '#fff',
                    transition: 'left 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  }}
                />
              </button>
            </div>
          )
        })}
      </div>

      <p style={{ fontSize: '0.75rem', color: 'var(--c-text2)', marginTop: 16, lineHeight: 1.5 }}>
        Categories are linked to the product catalogue. Deactivating a category hides it from the storefront but does not remove products.
      </p>
    </div>
  )
}
