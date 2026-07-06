import { Globe, Languages } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { SearchModal, SearchTrigger } from './SearchModal'

interface HeaderProps {
  searchOpen: boolean
  onSearchOpen: () => void
  onSearchClose: () => void
  onNavigate: (conceptId: string) => void
}

export function Header({ searchOpen, onSearchOpen, onSearchClose, onNavigate }: HeaderProps) {
  const { lang, toggle } = useLanguage()

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 md:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 text-lg font-bold text-white shadow-lg shadow-violet-900/40">
              L
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold tracking-tight text-white md:text-xl">
                LLM Visualiser
              </h1>
              <p className="truncate text-xs text-gray-400">
                {lang === 'hinglish'
                  ? 'Har concept — animation + poori explanation'
                  : 'Every concept — animation + full explanation'}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <SearchTrigger onClick={onSearchOpen} />
            <button
              type="button"
              onClick={toggle}
              className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm font-medium transition hover:border-violet-500/50 hover:bg-[var(--color-surface-2)] md:px-4"
            >
              {lang === 'hinglish' ? (
                <>
                  <Languages size={16} className="text-violet-400" />
                  <span className="hidden sm:inline">English</span>
                </>
              ) : (
                <>
                  <Globe size={16} className="text-cyan-400" />
                  <span className="hidden sm:inline">Hinglish</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>
      <SearchModal open={searchOpen} onClose={onSearchClose} onSelect={onNavigate} />
    </>
  )
}
