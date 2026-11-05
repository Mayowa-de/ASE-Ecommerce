import { useState } from "react"
import { useApp } from "../context"
import { ApiError } from "../lib/api"

export default function AdminLogin() {
  const { signIn, navigate } = useApp()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setLoading(true)
    try {
      await signIn(email, password, true)
      navigate("admin-dashboard")
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : "The admin service could not be reached.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-background px-4 py-10 text-brand-ink">
      <section className="w-full max-w-md rounded-2xl border border-brand-border bg-brand-surface p-7 shadow-lg sm:p-9">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">Store administration</p>
        <h1 className="mb-2 font-serif text-3xl font-bold">Admin sign in</h1>
        <p className="mb-7 text-sm text-brand-muted">Use an administrator account provisioned for this store.</p>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block space-y-1.5 text-sm font-medium">
            <span>Email address</span>
            <input className="block min-h-12 w-full rounded-lg border border-brand-border bg-brand-surface px-4 py-3 text-brand-ink outline-none focus:border-brand" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label className="block space-y-1.5 text-sm font-medium">
            <span>Password</span>
            <input className="block min-h-12 w-full rounded-lg border border-brand-border bg-brand-surface px-4 py-3 text-brand-ink outline-none focus:border-brand" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          <button className="w-full rounded-lg bg-brand px-5 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60" disabled={loading}>
            {loading ? "Signing in…" : "Sign in to admin"}
          </button>
        </form>
        <button className="mt-5 text-sm font-medium text-brand-muted underline-offset-4 hover:underline" onClick={() => navigate("home")}>Back to store</button>
      </section>
    </main>
  )
}
