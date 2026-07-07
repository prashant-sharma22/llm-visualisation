import { Clock } from 'lucide-react'
import type { Bilingual, Concept } from '../types/concept'
import { useLanguage } from '../context/LanguageContext'
import { ConceptVisualizer } from './shared/ConceptVisualizer'
import { ExplanationPanel } from './shared/ExplanationPanel'
import { QuizPanel } from './shared/QuizPanel'

interface ConceptSectionProps {
  concept: Concept
  sectionTitle?: Bilingual
  isActive?: boolean
}

export function ConceptSection({ concept, sectionTitle, isActive }: ConceptSectionProps) {
  const { t } = useLanguage()

  return (
    <section id={concept.id} className="scroll-mt-24">
      <div className="mb-8">
        <div className="mb-2 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-violet-600/20 px-3 py-1 text-xs font-medium text-violet-300">
            {sectionTitle ? t(sectionTitle) : concept.sectionId.replace(/-/g, ' ')}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Clock size={12} />
            {concept.duration}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white md:text-3xl">{t(concept.title)}</h2>
        <p className="mt-2 max-w-2xl text-base text-gray-400">{t(concept.tagline)}</p>
      </div>

      <div className="mb-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/50 p-5">
        <p className="text-[15px] leading-relaxed text-gray-300">{t(concept.intro)}</p>
      </div>

      <div className="mb-10">
        <h3 className="mb-4 flex flex-wrap items-center gap-3 text-sm font-semibold uppercase tracking-wider text-violet-400">
          <span>{t({ hinglish: 'Interactive Visualization', english: 'Interactive Visualization' })}</span>
          <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] normal-case text-amber-300">
            {t({ hinglish: '10 modes · speed control · why per step', english: '10 modes · speed control · why per step' })}
          </span>
        </h3>
        <ConceptVisualizer concept={concept} isActive={isActive} />
      </div>

      <ExplanationPanel
        explanation={concept.explanation}
        analogy={concept.analogy}
        keyPoints={concept.keyPoints}
        teaching={concept.teaching}
      />

      <QuizPanel concept={concept} />
    </section>
  )
}
