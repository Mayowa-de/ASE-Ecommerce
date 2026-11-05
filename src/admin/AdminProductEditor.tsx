import { fieldClassName, inputClassName, inputErrorClassName } from "../components/formStyles"
import { useEffect, useState } from 'react'
import { useApp } from '../context'
import type { Category, Product, Variant } from '../types'
import { apiRequest, jsonBody } from '../lib/api'

const CATEGORIES: Category[] = ['Candles', 'Bibles', 'Oils', 'Perfumes', 'Spiritual Items']

function newVariant(): Variant {
  return { id: `variant-${Date.now()}`, label: '', price: 0, stock: 0 }
}

function toSlug(value: string) {
  return value.trim().toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function AdminProductEditor() {
  const { products, setProducts, params, navigate, productLoading } = useApp()
  const editId = params.editProductId
  const existing = editId ? products.find((p) => p.id === editId) : undefined

  const [name, setName] = useState(existing?.name ?? '')
  const [category, setCategory] = useState<Category>(existing?.category ?? 'Candles')
  const [description, setDescription] = useState(existing?.description ?? '')
  const [featured, setFeatured] = useState(existing?.featured ?? false)
  const [active, setActive] = useState(existing?.active ?? true)
  const [comingSoon, setComingSoon] = useState(existing?.comingSoon ?? false)
  const [variants, setVariants] = useState<Variant[]>(
    existing?.variants.length ? existing.variants : [newVariant()]
  )
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!existing) return
    setName(existing.name)
    setCategory(existing.category)
    setDescription(existing.description)
    setFeatured(existing.featured)
    setActive(existing.active)
    setComingSoon(existing.comingSoon ?? false)
    setVariants(existing.variants)
  }, [existing?.id, productLoading])

  function validate() {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Product name is required'
    if (!description.trim()) e.description = 'Description is required'
    if (!comingSoon) {
      variants.forEach((v, i) => {
        if (!v.label.trim()) e[`v-label-${i}`] = 'Required'
        if (v.price <= 0) e[`v-price-${i}`] = 'Must be > 0'
        if (!Number.isInteger(v.stock) || v.stock < 0) e[`v-stock-${i}`] = 'Enter a whole number of 0 or more'
      })
      const slugs = variants.map((variant) => toSlug(variant.label))
      if (slugs.some((slug) => !slug)) e.variants = 'Each variant needs a valid label.'
      if (new Set(slugs).size !== slugs.length) e.variants = 'Variant labels must be unique.'
    }
    return e
  }

  async function handleSave() {
    const errs = validate()
    setErrors(errs)
    setFormError('')
    if (Object.keys(errs).length > 0) return

    const slug = existing?.id ?? toSlug(name)
    if (!slug) { setFormError('Enter a product name that can be used as a product URL.'); return }
    const payload = {
      slug,
      name: name.trim(),
      categorySlug: category.toLowerCase().replace(/\s+/g, '-'),
      description: description.trim(),
      featured,
      active,
      comingSoon,
      variants: comingSoon ? [] : variants.map((variant) => ({
        slug: toSlug(variant.label),
        label: variant.label.trim(),
        price: Number(variant.price),
        stock: Number(variant.stock),
      })),
    }

    setSaving(true)
    try {
      const response = existing
        ? await apiRequest<{ product: Product }>(`/products/${encodeURIComponent(existing.id)}`, { method: 'PATCH', body: jsonBody(payload) })
        : await apiRequest<{ product: Product }>('/products', { method: 'POST', body: jsonBody(payload) })
      const savedProduct = response.product
      setProducts(existing
        ? products.map((product) => product.id === existing.id ? savedProduct : product)
        : [...products, savedProduct])
      navigate('admin-products')
    } catch (reason) {
      setFormError(reason instanceof Error ? reason.message : 'The product could not be saved. Check your connection and try again.')
    } finally {
      setSaving(false)
    }
  }

  function addVariant() {
    setVariants((v) => [...v, newVariant()])
  }

  function removeVariant(idx: number) {
    setVariants((v) => v.filter((_, i) => i !== idx))
  }

  function updateVariant(idx: number, field: keyof Variant, value: string | number) {
    setVariants((v) => v.map((vv, i) => i === idx ? { ...vv, [field]: value } : vv))
    setFormError('')
  }

  if (editId && productLoading) return <div className="mx-auto max-w-xl py-16 text-center text-sm text-brand-muted" role="status">Loading product and stock…</div>
  if (editId && !existing) return <div className="mx-auto max-w-xl rounded-2xl border border-brand-border bg-brand-surface p-6 text-center shadow-sm"><h1 className="font-serif text-xl font-bold text-brand-ink">Product not found</h1><p className="mt-2 text-sm text-brand-muted">This product could not be loaded from the catalogue.</p><button type="button" className="mt-5 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white" onClick={() => navigate('admin-products')}>Back to Products</button></div>

  return (
    <div style={{ maxWidth: 600 }}>
      <div style={{ marginBottom: 24 }}>
        <button
          onClick={() => navigate('admin-products')}
          style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.8125rem', color: 'var(--c-text2)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0 8px' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
          Back to Products
        </button>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: 'var(--c-text)', margin: 0 }}>
          {existing ? 'Edit Product' : 'Add Product'}
        </h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {formError && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">{formError}</div>}
        {errors.variants && <p className="error-msg" role="alert">{errors.variants}</p>}
        <div className={fieldClassName}>
          <label htmlFor="p-name">Product Name</label>
          <input id="p-name" type="text" className={[inputClassName, errors.name && inputErrorClassName].filter(Boolean).join(" ")} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Goya Oil" />
          {errors.name && <span className="error-msg">{errors.name}</span>}
        </div>

        <div className={fieldClassName}>
          <label htmlFor="p-cat">Category</label>
          <select id="p-cat" className={inputClassName} value={category} onChange={(e) => setCategory(e.target.value as Category)}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className={fieldClassName}>
          <label htmlFor="p-desc">Description</label>
          <textarea
            id="p-desc"
            className={[inputClassName, errors.description && inputErrorClassName].filter(Boolean).join(" ")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Product description…"
            rows={3}
            style={{ resize: 'vertical', minHeight: 80 }}
          />
          {errors.description && <span className="error-msg">{errors.description}</span>}
        </div>

        {/* Toggles */}
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {[
            { label: 'Active', value: active, setter: setActive },
            { label: 'Featured', value: featured, setter: setFeatured },
            { label: 'Coming Soon', value: comingSoon, setter: setComingSoon },
          ].map(({ label, value, setter }) => (
            <label key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500, color: 'var(--c-text)' }}>
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setter(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: 'var(--c-primary)', cursor: 'pointer' }}
              />
              {label}
            </label>
          ))}
        </div>

        {/* Variants */}
        {!comingSoon && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <p style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--c-text)', margin: 0 }}>Variants</p>
              <button className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-[1.5px] border-brand bg-transparent px-[22px] py-3 text-sm font-semibold text-brand transition duration-150 hover:bg-[#F7F0E3] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40" onClick={addVariant} style={{ fontSize: '0.75rem', padding: '6px 12px', minHeight: 34 }}>
                + Add Variant
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {variants.map((v, i) => (
                <div key={v.id} className="admin-product-variant-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 8, alignItems: 'end' }}>
                  <div className={fieldClassName} style={{ gap: 4 }}>
                    <label style={{ fontSize: '0.6875rem', color: 'var(--c-text2)' }}>Variant</label>
                    <input className={[inputClassName, errors[`v-label-${i}`] && inputErrorClassName].filter(Boolean).join(" ")} value={v.label} onChange={(e) => updateVariant(i, 'label', e.target.value)} placeholder="e.g. Small" style={{ minHeight: 40 }} />
                  </div>
                  <div className={fieldClassName} style={{ gap: 4 }}>
                    <label style={{ fontSize: '0.6875rem', color: 'var(--c-text2)' }}>Price (₦)</label>
                    <input type="number" className={[inputClassName, errors[`v-price-${i}`] && inputErrorClassName].filter(Boolean).join(" ")} value={v.price || ''} onChange={(e) => updateVariant(i, 'price', Number(e.target.value))} placeholder="0" style={{ minHeight: 40 }} />
                  </div>
                  <div className={fieldClassName} style={{ gap: 4 }}>
                    <label style={{ fontSize: '0.6875rem', color: 'var(--c-text2)' }}>Units in stock</label>
                    <input type="number" min="0" step="1" inputMode="numeric" aria-label={`${v.label || `Variant ${i + 1}`} units in stock`} className={[inputClassName, errors[`v-stock-${i}`] && inputErrorClassName].filter(Boolean).join(" ")} value={v.stock} onChange={(e) => updateVariant(i, 'stock', e.target.value === '' ? 0 : Number(e.target.value))} placeholder="0" style={{ minHeight: 40 }} />
                    {errors[`v-stock-${i}`] && <span className="error-msg">{errors[`v-stock-${i}`]}</span>}
                  </div>
                  {variants.length > 1 && (
                    <button onClick={() => removeVariant(i)} style={{ width: 36, height: 40, background: 'var(--c-cream)', border: 'none', borderRadius: 8, cursor: 'pointer', color: 'var(--c-error)', display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14H6L5 6"/></svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 10, paddingTop: 8 }}>
          <button className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-lg border-0 bg-brand px-[22px] py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(53,16,92,0.25)] transition duration-150 hover:bg-[#4a1880] hover:shadow-[0_4px_14px_rgba(53,16,92,0.35)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40" onClick={handleSave} disabled={saving || (Boolean(editId) && productLoading)}>
            {saving ? 'Saving…' : existing ? 'Save Changes' : 'Add Product'}
          </button>
          <button className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-[1.5px] border-brand bg-transparent px-[22px] py-3 text-sm font-semibold text-brand transition duration-150 hover:bg-[#F7F0E3] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40" onClick={() => navigate('admin-products')}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
