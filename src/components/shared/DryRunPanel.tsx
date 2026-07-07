import { Calculator, Layers, Shapes } from 'lucide-react'
import type { AnimDryRun } from '../../data/animation-dry-runs'
import { useLanguage } from '../../context/LanguageContext'

interface DryRunPanelProps {
  dryRun: AnimDryRun
  stepIndex: number
  totalSteps: number
}

export function DryRunPanel({ dryRun, stepIndex, totalSteps }: DryRunPanelProps) {
  const { t, lang } = useLanguage()

  return (
    <div className="border-t border-cyan-500/20 bg-gradient-to-br from-cyan-950/25 to-violet-950/15 px-4 py-4 md:px-5">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-cyan-600/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-300">
          {lang === 'hinglish' ? 'Dry Run' : 'Dry Run'} · {stepIndex + 1}/{totalSteps}
        </span>
        <h4 className="text-sm font-semibold text-white">{t(dryRun.title)}</h4>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-gray-300">{t(dryRun.description)}</p>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-violet-500/20 bg-[#0d1117]/80 p-3">
          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-violet-300">
            <Calculator size={12} />
            Formula
          </div>
          <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs text-violet-100/90">{dryRun.formula}</pre>
        </div>
        <div className="rounded-xl border border-cyan-500/20 bg-[#0d1117]/80 p-3 md:col-span-1">
          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
            <Layers size={12} />
            {lang === 'hinglish' ? 'Values (numbers)' : 'Values (numbers)'}
          </div>
          <pre className="max-h-32 overflow-auto whitespace-pre-wrap font-mono text-xs text-cyan-100/90">{dryRun.values}</pre>
        </div>
        <div className="rounded-xl border border-amber-500/20 bg-[#0d1117]/80 p-3">
          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-amber-300">
            <Shapes size={12} />
            {lang === 'hinglish' ? 'Shapes' : 'Shapes'}
          </div>
          <pre className="whitespace-pre-wrap font-mono text-xs text-amber-100/90">{dryRun.shapes}</pre>
        </div>
      </div>
    </div>
  )
}
