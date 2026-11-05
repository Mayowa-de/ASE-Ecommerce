import { fieldClassName, inputClassName, inputErrorClassName } from "../components/formStyles"
import { useState } from 'react'
import { useApp } from '../context'

const ALL_STATES = ['Lagos', 'Ogun', 'Oyo', 'Osun', 'Ondo', 'Ekiti', 'Kwara', 'Abuja', 'Rivers']

export default function AdminSettings() {
  const { storeConfig, setStoreConfig } = useApp()
  const [form, setForm] = useState({ ...storeConfig })
  const [saved, setSaved] = useState(false)

  function toggleState(state: string) {
    setForm((f) => ({
      ...f,
      deliveryStates: f.deliveryStates.includes(state)
        ? f.deliveryStates.filter((s) => s !== state)
        : [...f.deliveryStates, state],
    }))
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setStoreConfig(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function field(label: string, key: keyof typeof form, type = 'text') {
    return (
      <div className={fieldClassName}>
        <label>{label}</label>
        <input
          type={type}
          className={inputClassName}
          value={form[key] as string}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        />
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col">
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: 'var(--c-text)', margin: '0 0 24px' }}>
        Store Settings
      </h1>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {field('Store Name', 'storeName')}
        {field('Phone Number', 'phone', 'tel')}
        {field('WhatsApp Number', 'whatsapp', 'tel')}
        {field('Store Location / Address', 'location')}
        {field('Email (optional)', 'email', 'email')}

        {/* Delivery states */}
        <div className={fieldClassName}>
          <label>Delivery States</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
            {ALL_STATES.map((state) => {
              const selected = form.deliveryStates.includes(state)
              return (
                <button
                  key={state}
                  type="button"
                  onClick={() => toggleState(state)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 100,
                    border: '1.5px solid',
                    borderColor: selected ? 'var(--c-primary)' : 'var(--c-border)',
                    background: selected ? 'var(--c-primary)' : 'var(--c-surface)',
                    color: selected ? '#fff' : 'var(--c-text2)',
                    fontSize: '0.8125rem',
                    fontWeight: selected ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    minHeight: 36,
                  }}
                >
                  {state}
                </button>
              )
            })}
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--c-text2)', marginTop: 6 }}>
            Currently delivering to: {form.deliveryStates.join(', ') || 'None selected'}
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-0 bg-brand px-[22px] py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(53,16,92,0.25)] transition duration-150 hover:bg-[#4a1880] hover:shadow-[0_4px_14px_rgba(53,16,92,0.35)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
          style={{ width: '100%', marginTop: 8 }}
        >
          {saved ? '✓ Saved!' : 'Save Settings'}
        </button>
      </form>
    </div>
  )
}
