import { useState, useEffect, useRef } from 'react'
import { useApp } from '../context'

const BIBLE_API_URL = import.meta.env.VITE_BIBLE_API_URL?.replace(/\/+$/, '')

interface BibleBook {
  name: string
  abbr: string
  chapters: number
}

const BOOKS: BibleBook[] = [
  { name: 'Genesis', abbr: 'genesis', chapters: 50 },
  { name: 'Exodus', abbr: 'exodus', chapters: 40 },
  { name: 'Leviticus', abbr: 'leviticus', chapters: 27 },
  { name: 'Numbers', abbr: 'numbers', chapters: 36 },
  { name: 'Deuteronomy', abbr: 'deuteronomy', chapters: 34 },
  { name: 'Joshua', abbr: 'joshua', chapters: 24 },
  { name: 'Judges', abbr: 'judges', chapters: 21 },
  { name: 'Ruth', abbr: 'ruth', chapters: 4 },
  { name: '1 Samuel', abbr: '1+samuel', chapters: 31 },
  { name: '2 Samuel', abbr: '2+samuel', chapters: 24 },
  { name: '1 Kings', abbr: '1+kings', chapters: 22 },
  { name: '2 Kings', abbr: '2+kings', chapters: 25 },
  { name: '1 Chronicles', abbr: '1+chronicles', chapters: 29 },
  { name: '2 Chronicles', abbr: '2+chronicles', chapters: 36 },
  { name: 'Ezra', abbr: 'ezra', chapters: 10 },
  { name: 'Nehemiah', abbr: 'nehemiah', chapters: 13 },
  { name: 'Esther', abbr: 'esther', chapters: 10 },
  { name: 'Job', abbr: 'job', chapters: 42 },
  { name: 'Psalms', abbr: 'psalms', chapters: 150 },
  { name: 'Proverbs', abbr: 'proverbs', chapters: 31 },
  { name: 'Ecclesiastes', abbr: 'ecclesiastes', chapters: 12 },
  { name: 'Song of Solomon', abbr: 'song+of+solomon', chapters: 8 },
  { name: 'Isaiah', abbr: 'isaiah', chapters: 66 },
  { name: 'Jeremiah', abbr: 'jeremiah', chapters: 52 },
  { name: 'Lamentations', abbr: 'lamentations', chapters: 5 },
  { name: 'Ezekiel', abbr: 'ezekiel', chapters: 48 },
  { name: 'Daniel', abbr: 'daniel', chapters: 12 },
  { name: 'Hosea', abbr: 'hosea', chapters: 14 },
  { name: 'Joel', abbr: 'joel', chapters: 3 },
  { name: 'Amos', abbr: 'amos', chapters: 9 },
  { name: 'Obadiah', abbr: 'obadiah', chapters: 1 },
  { name: 'Jonah', abbr: 'jonah', chapters: 4 },
  { name: 'Micah', abbr: 'micah', chapters: 7 },
  { name: 'Nahum', abbr: 'nahum', chapters: 3 },
  { name: 'Habakkuk', abbr: 'habakkuk', chapters: 3 },
  { name: 'Zephaniah', abbr: 'zephaniah', chapters: 3 },
  { name: 'Haggai', abbr: 'haggai', chapters: 2 },
  { name: 'Zechariah', abbr: 'zechariah', chapters: 14 },
  { name: 'Malachi', abbr: 'malachi', chapters: 4 },
  { name: 'Matthew', abbr: 'matthew', chapters: 28 },
  { name: 'Mark', abbr: 'mark', chapters: 16 },
  { name: 'Luke', abbr: 'luke', chapters: 24 },
  { name: 'John', abbr: 'john', chapters: 21 },
  { name: 'Acts', abbr: 'acts', chapters: 28 },
  { name: 'Romans', abbr: 'romans', chapters: 16 },
  { name: '1 Corinthians', abbr: '1+corinthians', chapters: 16 },
  { name: '2 Corinthians', abbr: '2+corinthians', chapters: 13 },
  { name: 'Galatians', abbr: 'galatians', chapters: 6 },
  { name: 'Ephesians', abbr: 'ephesians', chapters: 6 },
  { name: 'Philippians', abbr: 'philippians', chapters: 4 },
  { name: 'Colossians', abbr: 'colossians', chapters: 4 },
  { name: '1 Thessalonians', abbr: '1+thessalonians', chapters: 5 },
  { name: '2 Thessalonians', abbr: '2+thessalonians', chapters: 3 },
  { name: '1 Timothy', abbr: '1+timothy', chapters: 6 },
  { name: '2 Timothy', abbr: '2+timothy', chapters: 4 },
  { name: 'Titus', abbr: 'titus', chapters: 3 },
  { name: 'Philemon', abbr: 'philemon', chapters: 1 },
  { name: 'Hebrews', abbr: 'hebrews', chapters: 13 },
  { name: 'James', abbr: 'james', chapters: 5 },
  { name: '1 Peter', abbr: '1+peter', chapters: 5 },
  { name: '2 Peter', abbr: '2+peter', chapters: 3 },
  { name: '1 John', abbr: '1+john', chapters: 5 },
  { name: '2 John', abbr: '2+john', chapters: 1 },
  { name: '3 John', abbr: '3+john', chapters: 1 },
  { name: 'Jude', abbr: 'jude', chapters: 1 },
  { name: 'Revelation', abbr: 'revelation', chapters: 22 },
]

const OT_END = 39

interface Verse {
  verse: number
  text: string
}

type Panel = 'books' | 'chapters' | 'reading'

export default function Bible() {
  const { goBack } = useApp()
  const [bookIdx, setBookIdx] = useState(43) // John
  const [chapter, setChapter] = useState(3)
  const [verses, setVerses] = useState<Verse[]>([])
  const [reference, setReference] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [panel, setPanel] = useState<Panel>('reading')
  const [fontSize, setFontSize] = useState(17)
  const contentRef = useRef<HTMLDivElement>(null)

  const book = BOOKS[bookIdx]

  async function fetchChapter(bIdx: number, ch: number) {
    setLoading(true)
    setError('')
    try {
      if (!BIBLE_API_URL) throw new Error('VITE_BIBLE_API_URL is not configured.')
      const b = BOOKS[bIdx]
      const res = await fetch(`${BIBLE_API_URL}/${b.abbr}+${ch}?translation=kjv`)
      if (!res.ok) throw new Error(`Bible API returned ${res.status}.`)
      const data: { error?: string; reference?: string; verses?: { verse: number; text: string }[] } = await res.json()
      if (data.error) throw new Error(data.error)
      if (!data.reference || !Array.isArray(data.verses)) throw new Error('The Bible API returned an unexpected response.')
      setVerses(data.verses.map((v) => ({ verse: v.verse, text: v.text.trim() })))
      setReference(data.reference)
      setPanel('reading')
      contentRef.current?.scrollTo({ top: 0, behavior: 'instant' })
    } catch (reason) {
      setError(reason instanceof TypeError
        ? "Couldn't reach the Bible service. Check your connection and try again."
        : reason instanceof Error && reason.message.includes('VITE_BIBLE_API_URL')
          ? 'Bible service URL is missing. Set VITE_BIBLE_API_URL in the frontend .env and restart Vite.'
          : "Couldn't load this chapter. Check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchChapter(bookIdx, chapter)
  }, [])

  function goToBook(idx: number) {
    setBookIdx(idx)
    setChapter(1)
    setPanel('chapters')
  }

  function goToChapter(ch: number) {
    setChapter(ch)
    fetchChapter(bookIdx, ch)
  }

  function prevChapter() {
    if (chapter > 1) {
      const next = chapter - 1
      setChapter(next)
      fetchChapter(bookIdx, next)
    } else if (bookIdx > 0) {
      const nb = bookIdx - 1
      const nc = BOOKS[nb].chapters
      setBookIdx(nb)
      setChapter(nc)
      fetchChapter(nb, nc)
    }
  }

  function nextChapter() {
    if (chapter < book.chapters) {
      const next = chapter + 1
      setChapter(next)
      fetchChapter(bookIdx, next)
    } else if (bookIdx < BOOKS.length - 1) {
      const nb = bookIdx + 1
      setBookIdx(nb)
      setChapter(1)
      fetchChapter(nb, 1)
    }
  }

  const hasPrev = bookIdx > 0 || chapter > 1
  const hasNext = bookIdx < BOOKS.length - 1 || chapter < book.chapters

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', backgroundColor: 'var(--c-bg)' }}>

      {/* Top bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '0 16px',
        height: 56,
        backgroundColor: 'var(--c-primary)',
        flexShrink: 0,
      }}>
        <button
          onClick={goBack}
          aria-label="Go back"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 10, cursor: 'pointer', color: '#fff', flexShrink: 0 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.0625rem', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.2 }}>
            Holy Bible
          </h1>
          <p style={{ fontSize: '0.625rem', color: 'rgba(201,154,36,0.9)', margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
            King James Version
          </p>
        </div>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round">
          <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
        </svg>
      </div>

      {/* Toolbar */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backgroundColor: 'rgba(var(--c-bg-rgb, 255,255,255), 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--c-border)',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        {/* Book + Chapter selector */}
        <button
          onClick={() => setPanel(panel === 'books' ? 'reading' : 'books')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '7px 12px',
            background: panel === 'books' ? 'var(--c-primary)' : 'var(--c-cream)',
            color: panel === 'books' ? '#fff' : 'var(--c-text)',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.875rem',
            transition: 'all 0.15s ease',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
          </svg>
          {book.name}
        </button>

        <button
          onClick={() => setPanel(panel === 'chapters' ? 'reading' : 'chapters')}
          style={{
            padding: '7px 12px',
            background: panel === 'chapters' ? 'var(--c-primary)' : 'var(--c-cream)',
            color: panel === 'chapters' ? '#fff' : 'var(--c-text)',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.875rem',
            transition: 'all 0.15s ease',
          }}
        >
          Ch. {chapter}
        </button>

        <div style={{ flex: 1 }} />

        {/* Font size */}
        <button onClick={() => setFontSize((s) => Math.max(13, s - 1))} style={iconBtn} aria-label="Decrease font size">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
        <span style={{ fontSize: '0.75rem', color: 'var(--c-text2)', minWidth: 24, textAlign: 'center' }}>{fontSize}</span>
        <button onClick={() => setFontSize((s) => Math.min(28, s + 1))} style={iconBtn} aria-label="Increase font size">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>

      {/* Book picker panel */}
      {panel === 'books' && (
        <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--c-text2)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 10px 4px' }}>
            Old Testament
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 20 }}>
            {BOOKS.slice(0, OT_END).map((b, i) => (
              <button key={b.abbr} onClick={() => goToBook(i)} style={bookBtn(i === bookIdx)}>
                {b.name}
              </button>
            ))}
          </div>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--c-text2)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 10px 4px' }}>
            New Testament
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {BOOKS.slice(OT_END).map((b, i) => (
              <button key={b.abbr} onClick={() => goToBook(OT_END + i)} style={bookBtn(OT_END + i === bookIdx)}>
                {b.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chapter picker panel */}
      {panel === 'chapters' && (
        <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--c-text2)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 12px 4px' }}>
            {book.name} — Select Chapter
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
            {Array.from({ length: book.chapters }, (_, i) => i + 1).map((ch) => (
              <button
                key={ch}
                onClick={() => goToChapter(ch)}
                style={{
                  padding: '12px 4px',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  background: ch === chapter ? 'var(--c-primary)' : 'var(--c-cream)',
                  color: ch === chapter ? '#fff' : 'var(--c-text)',
                  fontWeight: ch === chapter ? 700 : 500,
                  fontSize: '0.9375rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {ch}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Reading panel */}
      {panel === 'reading' && (
        <div ref={contentRef} style={{ flex: 1, overflow: 'auto' }}>
          {loading && (
            <div style={{ padding: '60px 0', textAlign: 'center' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--c-primary)" strokeWidth="2" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite', display: 'block', margin: '0 auto 12px' }}>
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
              </svg>
              <p style={{ color: 'var(--c-text2)', fontSize: '0.875rem', margin: 0 }}>Loading…</p>
            </div>
          )}

          {error && !loading && (
            <div style={{ padding: '40px 24px', textAlign: 'center' }}>
              <p style={{ color: 'var(--c-error)', fontSize: '0.875rem', marginBottom: 16 }}>{error}</p>
              <button className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-0 bg-brand px-[22px] py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(53,16,92,0.25)] transition duration-150 hover:bg-[#4a1880] hover:shadow-[0_4px_14px_rgba(53,16,92,0.35)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40" onClick={() => fetchChapter(bookIdx, chapter)} style={{ padding: '10px 24px' }}>
                Retry
              </button>
            </div>
          )}

          {!loading && !error && verses.length > 0 && (
            <div style={{ padding: '24px 20px 32px', maxWidth: 680, margin: '0 auto' }}>
              {/* Chapter heading */}
              <div style={{ marginBottom: 28, textAlign: 'center' }}>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.375rem',
                  fontWeight: 700,
                  color: 'var(--c-primary)',
                  margin: '0 0 4px',
                }}>
                  {reference}
                </h2>
                <p style={{ fontSize: '0.6875rem', color: 'var(--c-gold)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
                  King James Version
                </p>
                <div style={{ width: 40, height: 2, background: 'var(--c-gold)', borderRadius: 1, margin: '10px auto 0' }} />
              </div>

              {/* Verses */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {verses.map((v) => (
                  <p key={v.verse} style={{ margin: 0, fontSize: fontSize, lineHeight: 1.85, color: 'var(--c-text)' }}>
                    <sup style={{
                      fontWeight: 700,
                      color: 'var(--c-primary)',
                      fontSize: '0.65em',
                      marginRight: 5,
                      verticalAlign: 'super',
                    }}>
                      {v.verse}
                    </sup>
                    {v.text}
                  </p>
                ))}
              </div>

              {/* Prev / Next nav */}
              <div style={{ display: 'flex', gap: 12, marginTop: 40, justifyContent: 'space-between' }}>
                <button
                  onClick={prevChapter}
                  disabled={!hasPrev}
                  style={navBtn(!hasPrev)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                  {chapter > 1 ? `Ch. ${chapter - 1}` : BOOKS[bookIdx - 1]?.name ?? ''}
                </button>
                <button
                  onClick={nextChapter}
                  disabled={!hasNext}
                  style={{ ...navBtn(!hasNext), flexDirection: 'row-reverse' }}
                >
                  {chapter < book.chapters ? `Ch. ${chapter + 1}` : BOOKS[bookIdx + 1]?.name ?? ''}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const iconBtn: React.CSSProperties = {
  width: 32,
  height: 32,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'var(--c-cream)',
  border: 'none',
  borderRadius: 8,
  cursor: 'pointer',
  color: 'var(--c-text2)',
  flexShrink: 0,
}

function bookBtn(active: boolean): React.CSSProperties {
  return {
    padding: '10px 12px',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    background: active ? 'var(--c-primary)' : 'var(--c-surface)',
    color: active ? '#fff' : 'var(--c-text)',
    fontWeight: active ? 600 : 400,
    fontSize: '0.875rem',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.15s ease',
    boxShadow: active ? 'none' : 'var(--shadow-sm)',
  }
}

function navBtn(disabled: boolean): React.CSSProperties {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 16px',
    background: disabled ? 'var(--c-cream)' : 'var(--c-surface)',
    border: 'none',
    borderRadius: 'var(--radius)',
    cursor: disabled ? 'default' : 'pointer',
    color: disabled ? 'var(--c-border)' : 'var(--c-primary)',
    fontWeight: 600,
    fontSize: '0.875rem',
    boxShadow: disabled ? 'none' : 'var(--shadow-sm)',
    flex: 1,
    transition: 'all 0.15s ease',
    opacity: disabled ? 0.4 : 1,
  }
}
