interface CatalogEmptyStateProps {
  title?: string
  message?: string
  onRetry: () => void
  onBrowse?: () => void
}

export default function CatalogEmptyState({
  title = 'Our catalogue is being refreshed',
  message = 'There are no products to display right now. Please try again shortly.',
  onRetry,
  onBrowse,
}: CatalogEmptyStateProps) {
  return (
    <section className="mx-auto my-8 flex w-full max-w-xl flex-col items-center rounded-2xl border border-brand-border bg-brand-surface px-6 py-10 text-center shadow-sm sm:px-10" role="status" aria-live="polite">
      <div className="mb-5 grid size-16 place-items-center rounded-full bg-[#F7F0E3] text-brand" aria-hidden="true">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8.5 5 3h14l2 5.5" />
          <path d="M4 8.5h16v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19.5z" />
          <path d="M9 12a3 3 0 0 0 6 0" />
        </svg>
      </div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-gold">Catalogue update</p>
      <h2 className="font-serif text-xl font-bold text-brand-ink">{title}</h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-brand-muted">{message}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={onRetry} className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4a1880] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
          Refresh catalogue
        </button>
        {onBrowse && <button type="button" onClick={onBrowse} className="inline-flex min-h-11 items-center justify-center rounded-lg border border-brand-border bg-white px-5 py-2.5 text-sm font-semibold text-brand transition hover:bg-[#F7F0E3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
          Browse all products
        </button>}
      </div>
    </section>
  )
}
