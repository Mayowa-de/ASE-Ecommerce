import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useApp } from '../context'
import type { Order } from '../types'
import { ApiError, apiRequest, jsonBody } from '../lib/api'

type VerificationState = 'checking' | 'pending' | 'failed'

export default function PaymentCallback() {
  const [searchParams] = useSearchParams()
  const { addOrder, clearCart, navigate, refreshProducts } = useApp()
  const [state, setState] = useState<VerificationState>('checking')
  const [message, setMessage] = useState('We are checking your payment directly with Paystack.')
  const [canRetry, setCanRetry] = useState(false)
  const started = useRef(false)
  const reference = searchParams.get('reference') ?? searchParams.get('trxref')

  async function verifyPayment() {
    if (!reference) {
      setCanRetry(false)
      setState('failed')
      setMessage('No payment reference was returned. Your cart is still available so you can try again.')
      return
    }

    setState('checking')
    setMessage('We are checking your payment directly with Paystack.')
    try {
      const result = await apiRequest<{ order: Order; paymentStatus: 'Paid' | 'Pending' }>('/payments/paystack/verify', {
        method: 'POST',
        body: jsonBody({ reference }),
      })
      if (result.paymentStatus === 'Paid') {
        addOrder(result.order)
        clearCart()
        void refreshProducts()
        navigate('order-confirmation', { orderId: result.order.id })
        return
      }
      setState('pending')
      setCanRetry(true)
      setMessage('Paystack is still processing this payment. You can check again in a moment.')
    } catch (error) {
      setState('failed')
      setCanRetry(!(error instanceof ApiError && error.status === 409))
      setMessage(error instanceof Error ? error.message : 'We could not confirm this payment. Your cart is still available.')
    }
  }

  useEffect(() => {
    if (started.current) return
    started.current = true
    void verifyPayment()
  }, [])

  const isChecking = state === 'checking'

  return (
    <main className="grid min-h-screen place-items-center bg-background px-4 py-10 text-brand-ink">
      <section className="w-full max-w-md rounded-2xl border border-brand-border bg-brand-surface p-6 text-center shadow-lg sm:p-8" aria-live="polite">
        <div className={`mx-auto mb-5 grid size-14 place-items-center rounded-full ${isChecking ? 'bg-brand/10 text-brand' : state === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
          {isChecking ? (
            <svg className="size-7 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 12a9 9 0 1 1-6.22-8.56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          ) : state === 'pending' ? (
            <svg className="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2" strokeLinecap="round"/></svg>
          ) : (
            <svg className="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" strokeLinecap="round"/></svg>
          )}
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-muted">Paystack payment</p>
        <h1 className="mt-2 font-serif text-2xl font-bold">{isChecking ? 'Verifying payment' : state === 'pending' ? 'Payment processing' : 'Payment not confirmed'}</h1>
        <p className="mt-3 text-sm leading-6 text-brand-muted">{message}</p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          {(state === 'pending' || (state === 'failed' && canRetry)) && (
            <button type="button" onClick={() => void verifyPayment()} className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
              {state === 'pending' ? 'Check payment again' : 'Try verification again'}
            </button>
          )}
          {state === 'failed' && (
            <button type="button" onClick={() => navigate('cart')} className="inline-flex min-h-11 items-center justify-center rounded-lg border border-brand px-5 py-2 text-sm font-semibold text-brand transition hover:bg-brand/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
              Return to cart
            </button>
          )}
        </div>
      </section>
    </main>
  )
}
