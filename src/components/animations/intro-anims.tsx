import { motion } from 'framer-motion'
import { SvgDefs } from './primitives'

type AnimProps = { step: number }

function Arrow({ x1, y1, x2, y2, active }: { x1: number; y1: number; x2: number; y2: number; active: boolean }) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={active ? '#22d3ee' : '#374151'} strokeWidth={2} markerEnd="url(#arrow)" />
  )
}

export function WhatIsAIAnim({ step }: AnimProps) {
  const layers = [
    { label: 'AI', sub: 'Smart systems', y: 30, color: '#22d3ee' },
    { label: 'ML', sub: 'Learn from data', y: 75, color: '#8b5cf6' },
    { label: 'DL', sub: 'Neural nets', y: 120, color: '#a78bfa' },
    { label: 'LLM', sub: 'Language', y: 165, color: '#fbbf24' },
  ]
  return (
    <svg viewBox="0 0 400 240" className="w-full max-w-lg">
      <SvgDefs />
      <text x={200} y={18} textAnchor="middle" fill="#a78bfa" fontSize={11}>AI Hierarchy — Russian Doll</text>
      {layers.map((l, i) => (
        <motion.g key={l.label} animate={{ opacity: step >= i ? 1 : 0.25 }}>
          <rect
            x={80 + i * 15}
            y={l.y}
            width={240 - i * 30}
            height={38}
            rx={8}
            fill="#1a1d2e"
            stroke={step >= i ? l.color : '#374151'}
            strokeWidth={step === i ? 2.5 : 1.5}
          />
          <text x={110 + i * 15} y={l.y + 16} fill={l.color} fontSize={11} fontWeight={600}>{l.label}</text>
          <text x={110 + i * 15} y={l.y + 30} fill="#9ca3af" fontSize={8}>{l.sub}</text>
          {i === 3 && step >= 3 && (
            <text x={280} y={l.y + 22} fill="#34d399" fontSize={8}>← course focus</text>
          )}
        </motion.g>
      ))}
      {step >= 4 && (
        <text x={200} y={225} textAnchor="middle" fill="#34d399" fontSize={10}>
          Each layer nests inside the previous
        </text>
      )}
    </svg>
  )
}

export function SimilarityDistanceAnim({ step }: AnimProps) {
  const ax = 80
  const ay = 160
  const bx = 200
  const by = 70
  const cx = 300
  const cy = 160
  return (
    <svg viewBox="0 0 400 220" className="w-full max-w-lg">
      <SvgDefs />
      <line x1={40} y1={180} x2={360} y2={180} stroke="#374151" strokeWidth={1} />
      <line x1={40} y1={180} x2={40} y2={40} stroke="#374151" strokeWidth={1} />
      {step >= 0 && (
        <>
          <circle cx={ax} cy={ay} r={6} fill="#8b5cf6" />
          <text x={ax} y={ay + 18} textAnchor="middle" fill="#8b5cf6" fontSize={9}>A "cat"</text>
          <circle cx={bx} cy={by} r={6} fill="#22d3ee" />
          <text x={bx} y={by - 12} textAnchor="middle" fill="#22d3ee" fontSize={9}>B "dog"</text>
          <circle cx={cx} cy={cy} r={6} fill="#f87171" />
          <text x={cx} y={cy + 18} textAnchor="middle" fill="#f87171" fontSize={9}>C "car"</text>
        </>
      )}
      {step >= 1 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <line x1={ax} y1={ay} x2={bx} y2={by} stroke="#fbbf24" strokeWidth={2} strokeDasharray="4 3" />
          <text x={140} y={110} fill="#fbbf24" fontSize={9}>d ≈ 0.14 (close)</text>
          <line x1={ax} y1={ay} x2={cx} y2={cy} stroke="#6b7280" strokeWidth={1} strokeDasharray="4 3" />
          <text x={200} y={175} fill="#6b7280" fontSize={9}>d = 1.41 (far)</text>
        </motion.g>
      )}
      {step >= 2 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <line x1={40} y1={ay} x2={ax} y2={ay} stroke="#8b5cf6" strokeWidth={1.5} />
          <line x1={40} y1={ay} x2={40} y2={by} stroke="#22d3ee" strokeWidth={1.5} />
          <text x={200} y={30} textAnchor="middle" fill="#a78bfa" fontSize={10}>cos(A,B) ≈ 0.99 ✓</text>
        </motion.g>
      )}
      {step >= 3 && <text x={200} y={210} textAnchor="middle" fill="#34d399" fontSize={10}>Similar direction = similar meaning</text>}
      {step >= 4 && <text x={200} y={48} textAnchor="middle" fill="#fbbf24" fontSize={9}>→ KD Tree finds nearest fast</text>}
    </svg>
  )
}

export function WhatIsVectorAnim({ step }: AnimProps) {
  const showPoint = step >= 1
  const showMag = step >= 2
  const showHighD = step >= 3
  return (
    <svg viewBox="0 0 400 240" className="w-full max-w-lg">
      <SvgDefs />
      <line x1={40} y1={200} x2={360} y2={200} stroke="#374151" strokeWidth={1} />
      <line x1={40} y1={200} x2={40} y2={30} stroke="#374151" strokeWidth={1} />
      <text x={370} y={205} fill="#6b7280" fontSize={10}>X</text>
      <text x={30} y={25} fill="#6b7280" fontSize={10}>Y</text>
      {step >= 0 && (
        <text x={200} y={20} textAnchor="middle" fill="#a78bfa" fontSize={11}>v = [3, 4]</text>
      )}
      {showPoint && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <line x1={40} y1={200} x2={130} y2={80} stroke="#8b5cf6" strokeWidth={3} />
          <circle cx={130} cy={80} r={6} fill="#fbbf24" />
          <text x={140} y={75} fill="#fbbf24" fontSize={10}>(3, 4)</text>
        </motion.g>
      )}
      {showMag && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <text x={200} y={140} textAnchor="middle" fill="#34d399" fontSize={12}>|v| = √(9+16) = 5</text>
        </motion.g>
      )}
      {showHighD && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <rect x={220} y={50} width={150} height={140} rx={8} fill="#1a1d2e" stroke="#22d3ee" strokeWidth={1} />
          <text x={295} y={75} textAnchor="middle" fill="#22d3ee" fontSize={9}>768D embedding</text>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x={235 + (i % 4) * 32} y={90 + Math.floor(i / 4) * 28} width={24} height={16} rx={3} fill="#2a2d42" stroke="#8b5cf6" strokeWidth={0.5} />
          ))}
          <text x={295} y={175} textAnchor="middle" fill="#9ca3af" fontSize={8}>... 768 numbers</text>
        </motion.g>
      )}
      {step >= 4 && <text x={200} y={230} textAnchor="middle" fill="#34d399" fontSize={10}>Ordered numbers = vector</text>}
    </svg>
  )
}

export function WhyVectorsAnim({ step }: AnimProps) {
  const items = ['Text "hello"', 'Image 🖼', 'Audio 🔊']
  return (
    <svg viewBox="0 0 400 220" className="w-full max-w-lg">
      <SvgDefs />
      {items.map((label, i) => (
        <motion.g key={label} animate={{ opacity: step >= i ? 1 : 0.3 }}>
          <rect x={30} y={40 + i * 55} width={100} height={36} rx={8} fill="#1a1d2e" stroke={step >= i ? '#8b5cf6' : '#374151'} strokeWidth={2} />
          <text x={80} y={62 + i * 55} textAnchor="middle" fill="#e8eaf6" fontSize={9}>{label}</text>
          {step >= i + 1 && <Arrow x1={130} y1={58 + i * 55} x2={175} y2={58 + i * 55} active />}
          {step >= i + 1 && (
            <rect x={180} y={46 + i * 55} width={90} height={24} rx={6} fill="#2a2d42" stroke="#22d3ee" strokeWidth={1} />
          )}
          {step >= i + 1 && (
            <text x={225} y={62 + i * 55} textAnchor="middle" fill="#22d3ee" fontSize={8}>[0.2, ...]</text>
          )}
        </motion.g>
      ))}
      {step >= 3 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <rect x={290} y={70} width={90} height={80} rx={8} fill="#1a1d2e" stroke="#34d399" strokeWidth={2} />
          <text x={335} y={95} textAnchor="middle" fill="#34d399" fontSize={9}>GPU</text>
          <text x={335} y={115} textAnchor="middle" fill="#9ca3af" fontSize={8}>matrix</text>
          <text x={335} y={130} textAnchor="middle" fill="#9ca3af" fontSize={8}>multiply</text>
        </motion.g>
      )}
      {step >= 4 && <text x={200} y={210} textAnchor="middle" fill="#fbbf24" fontSize={10}>Everything → numbers → math</text>}
    </svg>
  )
}

export function VectorsInAIAnim({ step }: AnimProps) {
  const boxes = ['Embed', 'Search', 'Attention', 'Generate']
  return (
    <svg viewBox="0 0 400 200" className="w-full max-w-xl">
      <SvgDefs />
      {boxes.map((b, i) => (
        <motion.g key={b} animate={{ opacity: step >= i ? 1 : 0.35 }}>
          <rect x={30 + i * 90} y={80} width={75} height={50} rx={8} fill="#1a1d2e" stroke={step === i ? '#fbbf24' : step > i ? '#34d399' : '#374151'} strokeWidth={2} />
          <text x={67 + i * 90} y={110} textAnchor="middle" fill="#e8eaf6" fontSize={9}>{b}</text>
          {i < boxes.length - 1 && step > i && <Arrow x1={105 + i * 90} y1={105} x2={120 + i * 90} y2={105} active />}
        </motion.g>
      ))}
      {step >= 0 && <text x={200} y={40} textAnchor="middle" fill="#a78bfa" fontSize={10}>Raw text / image</text>}
      {step >= 0 && <Arrow x1={200} y1={48} x2={67} y2={78} active={step >= 0} />}
      {step >= 4 && <text x={200} y={170} textAnchor="middle" fill="#34d399" fontSize={10}>AI = vector pipeline</text>}
    </svg>
  )
}

export function LLMIntroAnim({ step }: AnimProps) {
  const tokens = ['The', 'cat', 'sat']
  const visible = Math.min(step + 1, tokens.length + 1)
  return (
    <svg viewBox="0 0 400 240" className="w-full max-w-xl">
      <SvgDefs />
      <text x={200} y={25} textAnchor="middle" fill="#a78bfa" fontSize={11}>Autoregressive Generation</text>
      {step >= 0 && (
        <rect x={120} y={45} width={160} height={30} rx={8} fill="#1a1d2e" stroke="#8b5cf6" strokeWidth={1} />
      )}
      {step >= 0 && <text x={200} y={65} textAnchor="middle" fill="#e8eaf6" fontSize={9}>Prompt: "The cat"</text>}
      {tokens.map((t, i) => (
        <motion.g key={t} animate={{ opacity: i < visible - 1 || (i === visible - 2 && step >= 2) ? 1 : 0.25 }}>
          <rect x={80 + i * 80} y={100} width={60} height={32} rx={6} fill="#2a2d42" stroke={i === visible - 2 ? '#fbbf24' : '#8b5cf6'} strokeWidth={1.5} />
          <text x={110 + i * 80} y={120} textAnchor="middle" fill="#e8eaf6" fontSize={10}>{t}</text>
        </motion.g>
      ))}
      {step >= 1 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <rect x={140} y={150} width={120} height={40} rx={8} fill="#1a1d2e" stroke="#22d3ee" strokeWidth={2} />
          <text x={200} y={168} textAnchor="middle" fill="#22d3ee" fontSize={8}>Transformer × L</text>
          <text x={200} y={182} textAnchor="middle" fill="#9ca3af" fontSize={8}>Attention + FFN</text>
        </motion.g>
      )}
      {step >= 2 && (
        <motion.g initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <text x={200} y={215} textAnchor="middle" fill="#34d399" fontSize={10}>P(next) → pick token → repeat</text>
        </motion.g>
      )}
      {step >= 3 && (
        <motion.rect x={320} y={100} width={50} height={32} rx={6} fill="#1a1d2e" stroke="#fbbf24" strokeWidth={2} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} />
      )}
      {step >= 3 && <text x={345} y={120} textAnchor="middle" fill="#fbbf24" fontSize={9}>?</text>}
      {step >= 4 && <text x={345} y={145} textAnchor="middle" fill="#34d399" fontSize={9}>sat</text>}
    </svg>
  )
}

export function CourseRoadmapAnim({ step }: AnimProps) {
  const sections = ['Intro', 'Search', 'Found.', 'Trans.', 'Train', 'Agents']
  return (
    <svg viewBox="0 0 400 220" className="w-full max-w-xl">
      <SvgDefs />
      <line x1={50} y1={120} x2={350} y2={120} stroke="#374151" strokeWidth={2} />
      {sections.map((s, i) => (
        <motion.g key={s} animate={{ opacity: step >= i ? 1 : 0.3 }}>
          <circle cx={50 + i * 60} cy={120} r={step >= i ? 14 : 10} fill={step >= i ? '#8b5cf6' : '#1a1d2e'} stroke={step >= i ? '#a78bfa' : '#374151'} strokeWidth={2} />
          <text x={50 + i * 60} y={124} textAnchor="middle" fill="#e8eaf6" fontSize={7} fontWeight={600}>{i + 1}</text>
          <text x={50 + i * 60} y={155} textAnchor="middle" fill="#9ca3af" fontSize={7}>{s}</text>
          {i === 0 && step >= 0 && (
            <text x={50} y={95} textAnchor="middle" fill="#34d399" fontSize={8}>✓ You are here</text>
          )}
        </motion.g>
      ))}
      {step >= 4 && (
        <motion.text x={200} y={195} textAnchor="middle" fill="#fbbf24" fontSize={11} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Next → KD Tree
        </motion.text>
      )}
    </svg>
  )
}
