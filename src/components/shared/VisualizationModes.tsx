import type { ReactNode } from 'react'
import type { Concept, VisualizationMode } from '../../types/concept'
import { useLanguage } from '../../context/LanguageContext'
import { CANONICAL_NUMERICAL_TOPIC_ID, hasMatrixTeaching, numericalPointer } from '../../data/content-scope'
import { NumericalPlayground } from './NumericalPlayground'
import {
  Box,
  Brain,
  Cpu,
  Film,
  FunctionSquare,
  GitBranch,
  Grid3x3,
  Layers,
  Smile,
  Terminal,
  Wand2,
} from 'lucide-react'

const MODES: { id: VisualizationMode; icon: typeof Film; label: BilingualLabel }[] = [
  { id: 'animation', icon: Film, label: { h: 'Final Animation', e: 'Final Animation' } },
  { id: 'analogy', icon: Brain, label: { h: 'Real World Analogy', e: 'Real World Analogy' } },
  { id: 'cartoon', icon: Smile, label: { h: 'Simplified Cartoon', e: 'Simplified Cartoon' } },
  { id: 'math', icon: FunctionSquare, label: { h: 'Math Diagram', e: 'Math Diagram' } },
  { id: 'matrix', icon: Grid3x3, label: { h: 'Matrix View', e: 'Matrix View' } },
  { id: 'tensor', icon: Layers, label: { h: 'Tensor Flow', e: 'Tensor Flow' } },
  { id: 'gpu', icon: Cpu, label: { h: 'GPU Memory', e: 'GPU Memory' } },
  { id: 'code', icon: Terminal, label: { h: 'Code View', e: 'Code View' } },
  { id: 'neural', icon: GitBranch, label: { h: 'Neural Network', e: 'Neural Network' } },
  { id: 'playground', icon: Wand2, label: { h: 'Playground', e: 'Playground' } },
]

interface BilingualLabel {
  h: string
  e: string
}

interface VisualizationModesProps {
  mode: VisualizationMode
  onModeChange: (mode: VisualizationMode) => void
  concept: Concept
  animationSlot: ReactNode
}

function AsciiBlock({ text }: { text: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-cyan-500/20 bg-[#0d1117] p-4 text-xs leading-relaxed font-mono text-cyan-200/90">
      {text}
    </pre>
  )
}

export function VisualizationModes({ mode, onModeChange, concept, animationSlot }: VisualizationModesProps) {
  const { lang, t } = useLanguage()
  const teaching = concept.teaching

  const matrixText = teaching?.matrixDimensions && hasMatrixTeaching(concept.id) ? t(teaching.matrixDimensions) : ''
  const asciiText = teaching?.asciiDiagram ? t(teaching.asciiDiagram) : ''
  const memoryText = teaching?.internalMemory ? t(teaching.internalMemory) : ''
  const buildText = teaching?.buildFromScratch ? t(teaching.buildFromScratch) : teaching?.dryRun ? t(teaching.dryRun) : ''
  const derivText = teaching?.mathematicalDerivation ? t(teaching.mathematicalDerivation) : ''

  const renderPanel = () => {
    switch (mode) {
      case 'animation':
        return animationSlot
      case 'analogy':
        return (
          <div className="mx-auto max-w-lg rounded-2xl border border-amber-500/30 bg-amber-950/20 p-8 text-center">
            <Brain className="mx-auto mb-4 text-amber-400" size={40} />
            <p className="text-lg leading-relaxed text-amber-100">{t(concept.analogy)}</p>
            {teaching?.intuition && (
              <p className="mt-4 text-sm text-gray-400">{t(teaching.intuition)}</p>
            )}
          </div>
        )
      case 'cartoon':
        return (
          <div className="flex flex-col items-center gap-4 p-4">
            <div className="flex gap-3 text-5xl">🧑‍🏫 → 🧠 → 💡</div>
            <p className="max-w-md text-center text-sm text-gray-300">
              {lang === 'hinglish'
                ? `${t(concept.title)} — simple cartoon view: input aata hai, brain process karta hai, output nikalta hai. Neeche full detail mein dekho.`
                : `Simple cartoon view of ${t(concept.title)}: input → process → output.`}
            </p>
            <AsciiBlock text={asciiText || `Input → [${concept.id}] → Output`} />
          </div>
        )
      case 'math':
        return (
          <div className="w-full max-w-2xl p-4">
            <AsciiBlock text={derivText || asciiText || 'Mathematical derivation — see full explanation below.'} />
          </div>
        )
      case 'matrix':
        return (
          <div className="w-full max-w-2xl p-4">
            <div className="mb-3 flex items-center gap-2 text-violet-300">
              <Grid3x3 size={18} />
              <span className="font-semibold">Matrix Shapes at Every Step</span>
            </div>
            {matrixText ? (
              <AsciiBlock text={matrixText} />
            ) : (
              <div className="rounded-xl border border-violet-500/30 bg-violet-950/20 p-6 text-sm text-gray-300">
                <p>{numericalPointer(lang)}</p>
                <button
                  type="button"
                  onClick={() => document.getElementById(CANONICAL_NUMERICAL_TOPIC_ID)?.scrollIntoView({ behavior: 'smooth' })}
                  className="mt-3 text-violet-300 underline hover:text-violet-200"
                >
                  {lang === 'hinglish' ? 'Q, K, V topic pe jao' : 'Go to Q, K, V topic'}
                </button>
              </div>
            )}
          </div>
        )
      case 'tensor':
        return (
          <div className="w-full max-w-2xl p-4">
            <div className="mb-3 flex items-center gap-2 text-cyan-300">
              <Layers size={18} />
              <span className="font-semibold">Tensor Flow</span>
            </div>
            <AsciiBlock
              text={
                asciiText ||
                `Input Tensor\n   ↓ shape\nIntermediate\n   ↓ shape\nOutput Tensor`
              }
            />
            {buildText && <div className="mt-4 text-sm text-gray-400">{buildText.slice(0, 300)}...</div>}
          </div>
        )
      case 'gpu':
        return (
          <div className="w-full max-w-2xl p-4">
            <div className="mb-3 flex items-center gap-2 text-rose-300">
              <Cpu size={18} />
              <span className="font-semibold">GPU / Memory View</span>
            </div>
            <AsciiBlock
              text={
                memoryText ||
                `GPU HBM (slow, large)
┌─────────────────────┐
│  Model Weights (static) │
│  Activations (temp)     │
│  KV Cache (grows)       │
└─────────────────────┘
SRAM (fast, small) — Flash Attention tiles`
              }
            />
          </div>
        )
      case 'code':
        return (
          <div className="w-full max-w-2xl p-4">
            <AsciiBlock
              text={`# Pseudocode: ${concept.id}
def forward(x):
    # See build-from-scratch section
    ${buildText.split('\n').slice(0, 6).join('\n    ') || '    pass'}`}
            />
          </div>
        )
      case 'neural':
        return (
          <div className="flex flex-col items-center p-6">
            <Box className="mb-4 text-violet-400" size={36} />
            <AsciiBlock text={asciiText || `Layers connected\nInput → Hidden → Output`} />
          </div>
        )
      case 'playground':
        return (
          <div className="flex justify-center p-4">
            <NumericalPlayground concept={concept} />
          </div>
        )
      default:
        return animationSlot
    }
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {MODES.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => onModeChange(id)}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs transition ${
              mode === id
                ? 'border-violet-500 bg-violet-600/20 text-violet-200'
                : 'border-[var(--color-border)] text-gray-400 hover:text-gray-200'
            }`}
          >
            <Icon size={12} />
            {lang === 'hinglish' ? label.h : label.e}
          </button>
        ))}
      </div>
      {renderPanel()}
    </div>
  )
}
