import { Suspense, useEffect, useRef, useState } from 'react'
import type { Concept, VisualizationMode } from '../../types/concept'
import { useLanguage } from '../../context/LanguageContext'
import { AnimationStage } from './AnimationStage'
import { DryRunPanel } from './DryRunPanel'
import { VisualizationModes } from './VisualizationModes'
import { getAnimationForConcept } from '../animations/registry'
import { isPro3DConcept } from '../animations/pro-3d-ids'
import { ErrorBoundary } from './ErrorBoundary'
import { getDryRunForConcept, getDryRunStepCount } from '../../data/animation-dry-runs'
import { getComputeStepCount } from '../../data/compute-step-counts'

interface ConceptVisualizerProps {
  concept: Concept
  isActive?: boolean
}

function AnimationPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-[420px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-violet-500/25 bg-[#050810]/80 p-8 text-center">
      <div className="h-10 w-10 animate-pulse rounded-full bg-violet-600/30" />
      <p className="max-w-sm text-sm text-gray-400">{label}</p>
    </div>
  )
}

export function ConceptVisualizer({ concept, isActive = false }: ConceptVisualizerProps) {
  const { t, lang } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [speed, setSpeed] = useState(1)
  const [mode, setMode] = useState<VisualizationMode>('animation')
  const is3D = isPro3DConcept(concept.id)
  const computeSteps = getComputeStepCount(concept.id)
  const totalSteps = computeSteps ?? getDryRunStepCount(concept)
  const dryRun = getDryRunForConcept(concept, step)
  const Animation = getAnimationForConcept(concept.id)
  const currentStep = concept.steps[step % concept.steps.length]
  const caption = t(currentStep?.caption ?? { hinglish: '', english: '' })
  const stepWhy = currentStep?.why ? t(currentStep.why) : undefined
  const baseInterval = 2800

  // 3D: only mount when active (one WebGL context). 2D: mount when near viewport.
  const shouldMountAnim = mode === 'animation' && inView && (is3D ? isActive : true)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '120px 0px', threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [concept.id])

  useEffect(() => {
    setStep(0)
    setIsPlaying(true)
    setMode('animation')
  }, [concept.id])

  useEffect(() => {
    if (!isPlaying || mode !== 'animation' || !shouldMountAnim) return
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % totalSteps)
    }, baseInterval / speed)
    return () => clearInterval(timer)
  }, [isPlaying, totalSteps, concept.id, speed, mode, shouldMountAnim])

  const handleReplay = () => {
    setStep(0)
    setIsPlaying(true)
  }

  const placeholderText =
    lang === 'hinglish'
      ? is3D && !isActive
        ? '3D animation — is topic pe scroll karo (ek time pe ek 3D scene)'
        : 'Animation load ho rahi hai...'
      : is3D && !isActive
        ? '3D animation — scroll to this topic (one 3D scene at a time)'
        : 'Loading animation...'

  const animationSlot = (
    <div ref={containerRef}>
      <AnimationStage
        step={step}
        totalSteps={totalSteps}
        onStepChange={setStep}
        caption={caption}
        stepWhy={stepWhy}
        whyLabel={lang === 'hinglish' ? 'Kyun?' : 'Why?'}
        isPlaying={isPlaying && shouldMountAnim}
        onPlayToggle={() => setIsPlaying((p) => !p)}
        speed={speed}
        onSpeedChange={setSpeed}
        onReplay={handleReplay}
      >
        {shouldMountAnim ? (
          <ErrorBoundary>
            <Suspense fallback={<AnimationPlaceholder label={placeholderText} />}>
              <Animation step={step} />
            </Suspense>
          </ErrorBoundary>
        ) : (
          <AnimationPlaceholder label={placeholderText} />
        )}
      </AnimationStage>
      <DryRunPanel dryRun={dryRun} stepIndex={step} totalSteps={totalSteps} />
    </div>
  )

  return (
    <VisualizationModes
      mode={mode}
      onModeChange={setMode}
      concept={concept}
      animationSlot={animationSlot}
    />
  )
}
