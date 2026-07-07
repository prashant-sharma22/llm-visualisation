import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { HelpCircle, RotateCcw } from 'lucide-react'

interface AnimationStageProps {
  children: ReactNode
  step: number
  totalSteps: number
  onStepChange: (step: number) => void
  caption?: string
  stepWhy?: string
  whyLabel?: string
  isPlaying: boolean
  onPlayToggle: () => void
  speed: number
  onSpeedChange: (speed: number) => void
  onReplay: () => void
}

const SPEEDS = [0.25, 0.5, 1, 2, 4]

export function AnimationStage({
  children,
  step,
  totalSteps,
  onStepChange,
  caption,
  stepWhy,
  whyLabel = 'Kyun?',
  isPlaying,
  onPlayToggle,
  speed,
  onSpeedChange,
  onReplay,
}: AnimationStageProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] glow-accent">
      <div className="grid-bg absolute inset-0 opacity-50" />
      <div className="relative flex min-h-[420px] items-center justify-center p-4 md:min-h-[460px] md:p-6">
        <motion.div
          key={step}
          initial={{ opacity: 0.6, filter: 'blur(4px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          {children}
        </motion.div>
      </div>

      {stepWhy && (
        <motion.div
          key={`why-${step}`}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative flex gap-2 border-t border-amber-500/20 bg-amber-950/20 px-4 py-2.5 text-sm text-amber-100/90"
        >
          <HelpCircle size={16} className="mt-0.5 shrink-0 text-amber-400" />
          <span>
            <strong className="text-amber-300">{whyLabel} </strong>
            {stepWhy}
          </span>
        </motion.div>
      )}

      {caption && (
        <motion.div
          key={caption}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: [0.22, 1, 0.36, 1] }}
          className="relative border-t border-[var(--color-border)] bg-[var(--color-surface-2)]/80 px-4 py-3 text-center text-sm text-violet-200/90 backdrop-blur"
        >
          {caption}
        </motion.div>
      )}

      <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPlayToggle}
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            type="button"
            onClick={onReplay}
            className="flex items-center gap-1 rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm transition hover:border-violet-500/50"
            title="Replay from step 1"
          >
            <RotateCcw size={14} />
            Replay
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => onStepChange(step - 1)}
            className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm disabled:opacity-30"
          >
            Prev
          </button>
          <span className="min-w-[4rem] text-center text-xs text-gray-400">
            {step + 1} / {totalSteps}
          </span>
          <button
            type="button"
            disabled={step >= totalSteps - 1}
            onClick={() => onStepChange(step + 1)}
            className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm disabled:opacity-30"
          >
            Next
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Speed</span>
          {SPEEDS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onSpeedChange(s)}
              className={`rounded px-2 py-1 text-xs transition ${
                speed === s ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {s}×
            </button>
          ))}
        </div>

        <div className="hidden gap-1 md:flex">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onStepChange(i)}
              className={`h-2 w-2 rounded-full transition ${
                i === step ? 'scale-125 bg-violet-400' : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
