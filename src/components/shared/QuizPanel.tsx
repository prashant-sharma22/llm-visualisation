import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, HelpCircle, XCircle } from 'lucide-react'
import type { Concept } from '../../types/concept'
import { useLanguage } from '../../context/LanguageContext'

interface QuizItem {
  question: string
  answer: string
}

function parseQuizItems(lines: string[]): QuizItem[] {
  return lines
    .map((line) => {
      const qMatch = line.match(/\*\*Q:\*\*\s*(.+?)(?:\n|\*\*A:\*\*|$)/s)
      const aMatch = line.match(/\*\*A:\*\*\s*(.+)/s)
      if (qMatch && aMatch) return { question: qMatch[1].trim(), answer: aMatch[1].trim() }
      if (line.includes('?')) {
        const parts = line.split('?')
        return { question: parts[0].replace(/\*\*/g, '').trim() + '?', answer: parts.slice(1).join('?').trim() || 'See explanation above.' }
      }
      if (line.startsWith('**') && line.includes('→')) {
        const [q, a] = line.split('→')
        return { question: q.replace(/\*\*/g, '').trim(), answer: a?.trim() ?? '' }
      }
      return { question: line.replace(/\*\*/g, ''), answer: 'See full explanation section above.' }
    })
    .filter((item) => item.question.length > 5)
}

interface QuizPanelProps {
  concept: Concept
}

export function QuizPanel({ concept }: QuizPanelProps) {
  const { lang } = useLanguage()
  const teaching = concept.teaching
  const interview = teaching?.interviewQuestions?.[lang] ?? []
  const common = teaching?.commonQuestions?.[lang] ?? []
  const items = parseQuizItems([...interview, ...common]).slice(0, 8)

  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState({ correct: 0, tried: 0 })

  if (items.length === 0) return null

  const current = items[index]

  const handleAnswer = (knew: boolean) => {
    setScore((s) => ({ correct: s.correct + (knew ? 1 : 0), tried: s.tried + 1 }))
    setRevealed(false)
    setIndex((i) => (i + 1) % items.length)
  }

  const L = lang === 'hinglish'
    ? { title: 'Practice Quiz — Interview Ready', reveal: 'Answer Dekho', knew: 'Samajh aa gaya ✓', review: 'Dobara padho', progress: 'Score' }
    : { title: 'Practice Quiz — Interview Ready', reveal: 'Reveal Answer', knew: 'Got it ✓', review: 'Review again', progress: 'Score' }

  return (
    <div className="mt-8 rounded-2xl border border-violet-500/30 bg-[var(--color-surface)] p-6 md:p-8">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-violet-300">
          <HelpCircle size={20} />
          <h3 className="text-lg font-semibold text-white">{L.title}</h3>
        </div>
        <span className="text-sm text-gray-400">
          {L.progress}: {score.correct}/{score.tried} · {index + 1}/{items.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] p-6"
        >
          <p className="mb-4 text-base leading-relaxed text-gray-200">{current.question}</p>

          {!revealed ? (
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500"
            >
              {L.reveal}
            </button>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-4 text-sm leading-relaxed text-emerald-100">
                {current.answer}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => handleAnswer(true)}
                  className="flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-950/30 px-4 py-2 text-sm text-emerald-300 transition hover:bg-emerald-900/40"
                >
                  <CheckCircle size={16} />
                  {L.knew}
                </button>
                <button
                  type="button"
                  onClick={() => handleAnswer(false)}
                  className="flex items-center gap-2 rounded-lg border border-rose-500/40 bg-rose-950/30 px-4 py-2 text-sm text-rose-300 transition hover:bg-rose-900/40"
                >
                  <XCircle size={16} />
                  {L.review}
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
