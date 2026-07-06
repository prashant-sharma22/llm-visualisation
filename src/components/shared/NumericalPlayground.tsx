import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Concept } from '../../types/concept'
import { useLanguage } from '../../context/LanguageContext'
import { getDefaultLab, getLabForConcept } from '../../data/numerical-lab'

interface NumericalPlaygroundProps {
  concept: Concept
}

export function NumericalPlayground({ concept }: NumericalPlaygroundProps) {
  const { lang, t } = useLanguage()
  const steps = getLabForConcept(concept.id) ?? getDefaultLab()
  const [step, setStep] = useState(0)
  const current = steps[step]

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/30 to-violet-950/20 p-6">
      <div className="mb-4 flex items-center gap-2 text-cyan-300">
        <Calculator size={20} />
        <h4 className="font-semibold">
          {lang === 'hinglish' ? 'Numerical Lab — Haath Se Calculate' : 'Numerical Lab — Calculate By Hand'}
        </h4>
      </div>
      <p className="mb-4 text-xs text-gray-400">
        {lang === 'hinglish'
          ? '"The cat sat" · d=2 · har multiplication step-by-step'
          : '"The cat sat" · d=2 · every multiplication step-by-step'}
      </p>

      <div className="mb-2 flex gap-1">
        {steps.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setStep(i)}
            className={`h-1.5 flex-1 rounded-full transition ${
              i === step ? 'bg-cyan-400' : i < step ? 'bg-cyan-700' : 'bg-gray-700'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3"
        >
          <div className="rounded-lg bg-violet-600/20 px-3 py-2 text-sm font-medium text-violet-200">
            Step {step + 1}/{steps.length}: {t(current.title)}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-[var(--color-border)] bg-[#0d1117] p-3">
              <p className="mb-1 text-[10px] uppercase tracking-wider text-gray-500">Formula</p>
              <code className="text-sm text-amber-300">{current.formula}</code>
            </div>
            <div className="rounded-lg border border-[var(--color-border)] bg-[#0d1117] p-3">
              <p className="mb-1 text-[10px] uppercase tracking-wider text-gray-500">Shapes</p>
              <code className="text-sm text-cyan-300">{current.shapes}</code>
            </div>
          </div>

          <div className="rounded-lg border border-[var(--color-border)] bg-[#0d1117] p-4">
            <p className="mb-2 text-[10px] uppercase tracking-wider text-gray-500">
              {lang === 'hinglish' ? 'Calculation (likho aur verify karo)' : 'Calculation (write & verify)'}
            </p>
            <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-gray-300">{current.work}</pre>
          </div>

          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="rounded-lg border border-emerald-500/40 bg-emerald-950/30 p-4"
          >
            <p className="mb-1 text-[10px] uppercase tracking-wider text-emerald-400">Result</p>
            <pre className="font-mono text-sm text-emerald-200">{current.result}</pre>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 flex justify-between">
        <button
          type="button"
          disabled={step === 0}
          onClick={() => setStep((s) => s - 1)}
          className="flex items-center gap-1 rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm disabled:opacity-30"
        >
          <ChevronLeft size={16} />
          {lang === 'hinglish' ? 'Pehle' : 'Prev'}
        </button>
        <button
          type="button"
          disabled={step >= steps.length - 1}
          onClick={() => setStep((s) => s + 1)}
          className="flex items-center gap-1 rounded-lg bg-cyan-600 px-3 py-2 text-sm text-white disabled:opacity-30"
        >
          {lang === 'hinglish' ? 'Agla' : 'Next'}
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
