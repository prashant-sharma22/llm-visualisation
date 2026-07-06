import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Command, Search, X } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { searchConcepts, type SearchResult } from '../../utils/search'

interface SearchModalProps {
  open: boolean
  onClose: () => void
  onSelect: (conceptId: string) => void
}

export function SearchModal({ open, onClose, onSelect }: SearchModalProps) {
  const { lang, t } = useLanguage()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => searchConcepts(query, lang), [query, lang])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (results.length === 0) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => (i + 1) % results.length)
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => (i - 1 + results.length) % results.length)
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        const pick = results[activeIndex]
        if (pick) {
          onSelect(pick.conceptId)
          onClose()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, results, activeIndex, onClose, onSelect])

  const pick = (result: SearchResult) => {
    onSelect(result.conceptId)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 p-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={lang === 'hinglish' ? 'Search' : 'Search'}
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-violet-500/30 bg-[var(--color-surface)] shadow-2xl shadow-violet-950/50"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-4 py-3">
              <Search size={18} className="shrink-0 text-violet-400" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  lang === 'hinglish'
                    ? 'Search — KV cache, attention, vectors, RAG...'
                    : 'Search — KV cache, attention, vectors, RAG...'
                }
                className="flex-1 bg-transparent text-base text-white outline-none placeholder:text-gray-500"
              />
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-white/5 hover:text-white"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[min(60vh,480px)] overflow-y-auto">
              {query.trim().length < 2 ? (
                <div className="px-4 py-8 text-center text-sm text-gray-500">
                  {lang === 'hinglish'
                    ? 'Kam se kam 2 characters type karo — poori curriculum search hogi'
                    : 'Type at least 2 characters to search the full curriculum'}
                </div>
              ) : results.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-gray-500">
                  {lang === 'hinglish' ? 'Koi result nahi mila' : 'No results found'}
                </div>
              ) : (
                <ul className="py-2">
                  {results.map((result, i) => (
                    <li key={result.conceptId}>
                      <button
                        type="button"
                        onClick={() => pick(result)}
                        onMouseEnter={() => setActiveIndex(i)}
                        className={`flex w-full flex-col gap-1 px-4 py-3 text-left transition ${
                          i === activeIndex ? 'bg-violet-600/15' : 'hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium text-white">{t(result.title)}</span>
                          <ArrowRight
                            size={14}
                            className={`shrink-0 ${i === activeIndex ? 'text-violet-400' : 'text-gray-600'}`}
                          />
                        </div>
                        <span className="text-xs text-violet-300/80">{t(result.sectionTitle)}</span>
                        <span className="text-xs text-gray-400 line-clamp-1">{t(result.tagline)}</span>
                        {result.matches[0] && (
                          <span className="mt-1 text-xs text-gray-500 line-clamp-2">
                            {result.matches[0].snippet}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-[var(--color-border)] px-4 py-2 text-[10px] text-gray-500">
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">↑↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">↵</kbd>
                open
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">esc</kbd>
                close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function SearchTrigger({ onClick }: { onClick: () => void }) {
  const { lang } = useLanguage()

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onClick()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClick])

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-gray-400 transition hover:border-violet-500/50 hover:bg-[var(--color-surface-2)] hover:text-gray-200 md:min-w-[200px] md:justify-between"
    >
      <span className="flex items-center gap-2">
        <Search size={16} className="text-violet-400" />
        <span className="hidden sm:inline">{lang === 'hinglish' ? 'Search...' : 'Search...'}</span>
      </span>
      <kbd className="hidden items-center gap-0.5 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-gray-500 md:flex">
        <Command size={10} />K
      </kbd>
    </button>
  )
}
