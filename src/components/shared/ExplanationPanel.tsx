import type { ReactNode } from 'react'
import type { Bilingual, BilingualList, ConceptTeaching } from '../../types/concept'
import { useLanguage } from '../../context/LanguageContext'
import {
  AlertTriangle,
  Brain,
  Building2,
  Calculator,
  ChevronDown,
  Cpu,
  HelpCircle,
  Lightbulb,
  ListChecks,
  MessageSquare,
  Microscope,
  Ruler,
  ScrollText,
  Target,
  Terminal,
  Zap,
} from 'lucide-react'
import { useState } from 'react'

interface ExplanationPanelProps {
  explanation: Bilingual
  analogy: Bilingual
  keyPoints: BilingualList
  teaching?: Partial<ConceptTeaching>
}

function renderMarkdownish(text: string) {
  if (!text.trim()) return null
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-violet-200">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="rounded bg-violet-950/60 px-1.5 py-0.5 text-sm text-cyan-300">
          {part.slice(1, -1)}
        </code>
      )
    }
    return part.split('\n').map((line, j, arr) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < arr.length - 1 && <br />}
      </span>
    ))
  })
}

function AsciiBlock({ text }: { text: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-cyan-500/20 bg-[#0d1117] p-4 text-xs leading-relaxed font-mono text-cyan-200/90">
      {text}
    </pre>
  )
}

function SectionCard({
  icon,
  title,
  children,
  variant = 'default',
  defaultOpen = true,
}: {
  icon: ReactNode
  title: string
  children: ReactNode
  variant?: 'default' | 'code' | 'warning' | 'quiz' | 'why'
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const borders = {
    default: 'border-[var(--color-border)]',
    code: 'border-cyan-500/30',
    warning: 'border-amber-500/30',
    quiz: 'border-violet-500/30',
    why: 'border-amber-500/40',
  }
  return (
    <div className={`rounded-2xl border bg-[var(--color-surface)] ${borders[variant]}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-6 text-left"
      >
        <div className="flex items-center gap-2 text-violet-300">
          {icon}
          <h4 className="font-semibold text-white">{title}</h4>
        </div>
        <ChevronDown size={18} className={`text-gray-500 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="border-t border-[var(--color-border)] px-6 pb-6 text-sm leading-relaxed text-gray-300">{children}</div>}
    </div>
  )
}

function QuestionList({ items }: { items: string[] }) {
  return (
    <ol className="list-decimal space-y-3 pl-5">
      {items.map((q, i) => (
        <li key={i}>{renderMarkdownish(q)}</li>
      ))}
    </ol>
  )
}

export function ExplanationPanel({ explanation, analogy, keyPoints, teaching }: ExplanationPanelProps) {
  const { lang, t } = useLanguage()
  const points = keyPoints[lang]

  const L = {
    hinglish: {
      whyFirst: '⚡ Pehle Kyun Samjho (Why-First)',
      invented: '1. Kyun Banaya Gaya? (Why Invented)',
      intuition: '2. Intuition — 15 Saal Ke Level Pe',
      build: '3. Zero Se Build Karo (Build From Scratch)',
      derivation: '4. Mathematical Derivation',
      matrix: '5. Matrix Shapes — Har Step Pe',
      numerical: '6. Numerical Example (Haath Se)',
      questions: '7. Common Questions (Kyun? Kaise? What If?)',
      memory: '8. Internal Memory — Tensors Kahan Rehte Hain',
      production: '9. Production Engineering (OpenAI/Meta/vLLM)',
      interview: '10. Interview Questions',
      mistakes: '11. Common Mistakes',
      recap: '12. Recap & Cheat Sheet',
      problem: 'Problem Statement',
      full: 'Poori Explanation',
      analogy: 'Real-Life Analogy',
      keyPoints: 'Key Points',
      diagram: 'ASCII Diagram',
    },
    english: {
      whyFirst: '⚡ Understand Why First',
      invented: '1. Why Was This Invented?',
      intuition: '2. Intuition — Explain Like I\'m 15',
      build: '3. Build From Scratch',
      derivation: '4. Mathematical Derivation',
      matrix: '5. Matrix Shapes at Every Step',
      numerical: '6. Numerical Example (By Hand)',
      questions: '7. Common Questions (Why? How? What If?)',
      memory: '8. Internal Memory — Where Tensors Live',
      production: '9. Production Engineering',
      interview: '10. Interview Questions',
      mistakes: '11. Common Mistakes',
      recap: '12. Recap & Cheat Sheet',
      problem: 'Problem Statement',
      full: 'Full Explanation',
      analogy: 'Real-Life Analogy',
      keyPoints: 'Key Points',
      diagram: 'ASCII Diagram',
    },
  }[lang]

  const hasContent = (text?: Bilingual) => text && (text.hinglish.trim() || text.english.trim())
  const hasList = (list?: BilingualList) => list && list[lang].some((s) => s.trim())

  return (
    <div className="space-y-5">
      {hasContent(teaching?.whyFirst) && (
        <div className="rounded-2xl border-2 border-amber-500/50 bg-gradient-to-br from-amber-950/40 to-orange-950/20 p-6 md:p-8">
          <div className="mb-3 flex items-center gap-2 text-amber-300">
            <Zap size={22} />
            <h3 className="text-lg font-bold text-amber-100">{L.whyFirst}</h3>
          </div>
          <div className="text-[15px] leading-relaxed text-amber-50/90">{renderMarkdownish(t(teaching!.whyFirst!))}</div>
        </div>
      )}

      {hasContent(teaching?.whyInvented) && (
        <SectionCard icon={<Zap size={18} className="text-amber-400" />} title={L.invented}>
          {renderMarkdownish(t(teaching!.whyInvented!))}
        </SectionCard>
      )}

      {hasContent(teaching?.intuition) && (
        <SectionCard icon={<Brain size={18} className="text-violet-400" />} title={L.intuition}>
          {renderMarkdownish(t(teaching!.intuition!))}
        </SectionCard>
      )}

      {hasContent(teaching?.problemStatement) && (
        <SectionCard icon={<Target size={18} className="text-rose-400" />} title={L.problem} defaultOpen={false}>
          {renderMarkdownish(t(teaching!.problemStatement!))}
        </SectionCard>
      )}

      {hasContent(teaching?.buildFromScratch) && (
        <SectionCard icon={<Building2 size={18} className="text-emerald-400" />} title={L.build}>
          {renderMarkdownish(t(teaching!.buildFromScratch!))}
        </SectionCard>
      )}

      <SectionCard icon={<ScrollText size={18} className="text-violet-400" />} title={L.full} defaultOpen={false}>
        <div className="text-[15px] leading-relaxed">{renderMarkdownish(t(explanation))}</div>
      </SectionCard>

      {hasContent(teaching?.mathematicalDerivation) && (
        <SectionCard icon={<Microscope size={18} className="text-cyan-400" />} title={L.derivation} variant="code">
          {renderMarkdownish(t(teaching!.mathematicalDerivation!))}
        </SectionCard>
      )}

      {hasContent(teaching?.asciiDiagram) && (
        <SectionCard icon={<Terminal size={18} className="text-cyan-400" />} title={L.diagram} variant="code">
          <AsciiBlock text={t(teaching!.asciiDiagram!)} />
        </SectionCard>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {hasContent(teaching?.matrixDimensions) && (
          <SectionCard icon={<Ruler size={18} className="text-violet-400" />} title={L.matrix}>
            {renderMarkdownish(t(teaching!.matrixDimensions!))}
          </SectionCard>
        )}
        {hasContent(teaching?.numericalExample) && (
          <SectionCard icon={<Calculator size={18} className="text-cyan-400" />} title={L.numerical}>
            {renderMarkdownish(t(teaching!.numericalExample!))}
          </SectionCard>
        )}
      </div>

      {hasList(teaching?.commonQuestions) && (
        <SectionCard icon={<HelpCircle size={18} className="text-amber-400" />} title={L.questions} variant="quiz">
          <QuestionList items={teaching!.commonQuestions![lang]} />
        </SectionCard>
      )}

      {hasContent(teaching?.internalMemory) && (
        <SectionCard icon={<Cpu size={18} className="text-rose-400" />} title={L.memory}>
          {renderMarkdownish(t(teaching!.internalMemory!))}
        </SectionCard>
      )}

      {hasContent(teaching?.productionEngineering) && (
        <SectionCard icon={<Zap size={18} className="text-emerald-400" />} title={L.production}>
          {renderMarkdownish(t(teaching!.productionEngineering!))}
        </SectionCard>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <SectionCard icon={<Lightbulb size={18} className="text-amber-400" />} title={L.analogy} defaultOpen={false}>
          <p>{t(analogy)}</p>
        </SectionCard>
        <SectionCard icon={<ListChecks size={18} className="text-emerald-400" />} title={L.keyPoints} defaultOpen={false}>
          <ul className="space-y-2">
            {points.map((point, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                {point}
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      {hasList(teaching?.interviewQuestions) && (
        <SectionCard icon={<HelpCircle size={18} className="text-violet-400" />} title={L.interview} variant="quiz">
          <QuestionList items={teaching!.interviewQuestions![lang]} />
        </SectionCard>
      )}

      {hasList(teaching?.commonMistakes) && (
        <SectionCard icon={<AlertTriangle size={18} className="text-amber-400" />} title={L.mistakes} variant="warning">
          <ul className="space-y-2">
            {teaching!.commonMistakes![lang].map((m, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-amber-500">✗</span>
                {m}
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      {hasContent(teaching?.recap) && (
        <SectionCard icon={<MessageSquare size={18} className="text-cyan-400" />} title={L.recap}>
          {renderMarkdownish(t(teaching!.recap!))}
        </SectionCard>
      )}
    </div>
  )
}
