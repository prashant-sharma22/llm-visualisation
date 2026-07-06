import { useEffect, useState } from 'react'
import type { Concept, VisualizationMode } from '../../types/concept'
import { useLanguage } from '../../context/LanguageContext'
import { AnimationStage } from './AnimationStage'
import { VisualizationModes } from './VisualizationModes'
import { getAnimationForConcept } from '../animations/registry'

interface ConceptVisualizerProps {
  concept: Concept
}

export function ConceptVisualizer({ concept }: ConceptVisualizerProps) {
  const { t, lang } = useLanguage()
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [speed, setSpeed] = useState(1)
  const [mode, setMode] = useState<VisualizationMode>('animation')
  const totalSteps = concept.steps.length
  const Animation = getAnimationForConcept(concept.id)
  const currentStep = concept.steps[step]
  const caption = t(currentStep?.caption ?? { hinglish: '', english: '' })
  const stepWhy = currentStep?.why ? t(currentStep.why) : undefined
  const baseInterval = 2800

  useEffect(() => {
    setStep(0)
    setIsPlaying(true)
    setMode('animation')
  }, [concept.id])

  useEffect(() => {
    if (!isPlaying || mode !== 'animation') return
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % totalSteps)
    }, baseInterval / speed)
    return () => clearInterval(timer)
  }, [isPlaying, totalSteps, concept.id, speed, mode])

  const handleReplay = () => {
    setStep(0)
    setIsPlaying(true)
  }

  const animationSlot = (
    <AnimationStage
      step={step}
      totalSteps={totalSteps}
      onStepChange={setStep}
      caption={caption}
      stepWhy={stepWhy}
      whyLabel={lang === 'hinglish' ? 'Kyun?' : 'Why?'}
      isPlaying={isPlaying}
      onPlayToggle={() => setIsPlaying((p) => !p)}
      speed={speed}
      onSpeedChange={setSpeed}
      onReplay={handleReplay}
    >
      <Animation step={step} />
    </AnimationStage>
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
