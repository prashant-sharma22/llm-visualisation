import type { Bilingual } from '../../types/concept'
import { useLanguage } from '../../context/LanguageContext'

interface SectionDividerProps {
  order: number
  title: Bilingual
  topicCount: number
  isIntro?: boolean
}

export function SectionDivider({ order, title, topicCount, isIntro }: SectionDividerProps) {
  const { t, lang } = useLanguage()

  return (
    <div
      className={`relative scroll-mt-24 rounded-2xl border p-6 md:p-8 ${
        isIntro
          ? 'border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-violet-950/30 to-violet-950/20'
          : 'border-violet-500/20 bg-gradient-to-r from-violet-950/30 to-transparent'
      }`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${
            isIntro ? 'bg-cyan-600/30 text-cyan-200' : 'bg-violet-600/30 text-violet-200'
          }`}
        >
          {String(order).padStart(2, '0')}
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            {lang === 'hinglish' ? 'Section' : 'Section'} {order}
          </p>
          <h2 className="text-xl font-bold text-white md:text-2xl">{t(title)}</h2>
        </div>
        <span className="ml-auto rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
          {topicCount} {lang === 'hinglish' ? 'topics' : 'topics'}
        </span>
      </div>
      {isIntro && (
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-300">
          {lang === 'hinglish'
            ? 'Yahan se shuru karo — bilkul zero se. Pehle AI & vectors samjho, phir LLM ka big picture, phir vector search algorithms. Bina iske baaki topics adhure lagenge.'
            : 'Start here — from absolute zero. Learn AI & vectors first, then the LLM big picture, then vector search algorithms. Without this foundation the rest feels incomplete.'}
        </p>
      )}
    </div>
  )
}
