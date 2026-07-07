import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Lang } from '../types/concept'

interface LanguageContextValue {
  lang: Lang
  toggle: () => void
  setLang: (lang: Lang) => void
  t: (bilingual: { hinglish: string; english: string }) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('english')

  const toggle = () => setLang((l) => (l === 'hinglish' ? 'english' : 'hinglish'))
  const t = (bilingual: { hinglish: string; english: string }) => bilingual[lang]

  return (
    <LanguageContext.Provider value={{ lang, toggle, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
