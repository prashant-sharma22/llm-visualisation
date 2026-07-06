import { motion } from 'framer-motion'
import { AnimatedSoftmax, MatrixGrid, MatMulPulse, SvgDefs } from './primitives'

type AnimProps = { step: number }

function FlowBox({ label, x, y, active, color = '#8b5cf6' }: { label: string; x: number; y: number; active: boolean; color?: string }) {
  return (
    <motion.g animate={{ opacity: active ? 1 : 0.35 }}>
      <rect x={x} y={y} width={100} height={36} rx={8} fill="#1a1d2e" stroke={active ? color : '#374151'} strokeWidth={active ? 2 : 1} />
      <text x={x + 50} y={y + 22} textAnchor="middle" fill={active ? '#e8eaf6' : '#6b7280'} fontSize={9} fontWeight={600}>
        {label}
      </text>
    </motion.g>
  )
}

export function VerticalFlow({ steps, step }: { steps: string[]; step: number }) {
  return (
    <svg viewBox="0 0 200 320" className="w-full max-w-xs">
      <SvgDefs />
      {steps.map((s, i) => (
        <g key={s}>
          <FlowBox label={s} x={50} y={20 + i * 58} active={step >= i} color={i === step ? '#22d3ee' : '#8b5cf6'} />
          {i < steps.length - 1 && step > i && (
            <line x1={100} y1={56 + i * 58} x2={100} y2={78 + i * 58} stroke="#22d3ee" strokeWidth={2} />
          )}
        </g>
      ))}
    </svg>
  )
}

export function KDTreeAnim({ step }: AnimProps) {
  return (
    <svg viewBox="0 0 360 280" className="w-full max-w-lg">
      <SvgDefs />
      {step >= 0 && [[2,3],[5,4],[9,6],[4,7],[8,1],[7,2]].map(([x,y], i) => (
        <circle key={i} cx={30+x*30} cy={200-y*20} r={5} fill={step >= 0 ? '#8b5cf6' : '#374151'} />
      ))}
      {step >= 1 && <line x1={30} y1={140} x2={330} y2={140} stroke="#fb7185" strokeWidth={2} strokeDasharray="4" />}
      {step >= 2 && <line x1={180} y1={40} x2={180} y2={240} stroke="#22d3ee" strokeWidth={2} strokeDasharray="4" />}
      {step >= 3 && (
        <motion.circle cx={180} cy={120} r={20} fill="none" stroke="#34d399" strokeWidth={2} animate={{ r: [20, 30, 20] }} transition={{ repeat: Infinity, duration: 2 }} />
      )}
      {step >= 4 && <text x={180} y={270} textAnchor="middle" fill="#34d399" fontSize={10}>Nearest found</text>}
    </svg>
  )
}

export function AnnoyAnim({ step }: AnimProps) {
  const trees = 3
  return (
    <svg viewBox="0 0 400 240" className="w-full max-w-lg">
      <SvgDefs />
      {Array.from({ length: trees }).map((_, i) => (
        <g key={i}>
          <rect x={40 + i * 110} y={40} width={90} height={120} rx={8} fill="#1a1d2e" stroke={step >= i ? '#8b5cf6' : '#374151'} />
          <text x={85 + i * 110} y={30} textAnchor="middle" fill="#9ca3af" fontSize={9}>Tree {i + 1}</text>
          <circle cx={85 + i * 110} cy={70} r={12} fill="#2a2d42" stroke="#8b5cf6" />
          <line x1={85 + i * 110} y1={82} x2={60 + i * 110} y2={120} stroke="#374151" />
          <line x1={85 + i * 110} y1={82} x2={110 + i * 110} y2={120} stroke="#374151" />
        </g>
      ))}
      {step >= 3 && <text x={200} y={190} textAnchor="middle" fill="#22d3ee" fontSize={10}>Merge candidates</text>}
      {step >= 4 && <text x={200} y={220} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={600}>Best approximate</text>}
    </svg>
  )
}

export function HNSWAnim({ step }: AnimProps) {
  return (
    <svg viewBox="0 0 360 260" className="w-full max-w-lg">
      <SvgDefs />
      {step >= 0 && <text x={180} y={25} textAnchor="middle" fill="#a78bfa" fontSize={10}>Layer 2 (sparse)</text>}
      {step >= 0 && [[80,50],[280,50]].map(([x,y], i) => <circle key={`l2-${i}`} cx={x} cy={y} r={10} fill="#8b5cf6" />)}
      {step >= 1 && <line x1={80} y1={50} x2={280} y2={50} stroke="#8b5cf6" strokeWidth={2} />}
      {step >= 2 && <text x={180} y={100} textAnchor="middle" fill="#22d3ee" fontSize={10}>Layer 1</text>}
      {step >= 2 && [[60,120],[180,120],[300,120]].map(([x,y], i) => <circle key={`l1-${i}`} cx={x} cy={y} r={8} fill="#22d3ee" />)}
      {step >= 3 && <text x={180} y={165} textAnchor="middle" fill="#34d399" fontSize={10}>Layer 0 (dense)</text>}
      {step >= 3 && Array.from({ length: 7 }).map((_, i) => <circle key={`l0-${i}`} cx={50 + i * 45} cy={190} r={6} fill="#34d399" />)}
      {step >= 4 && <motion.circle cx={180} cy={50} r={4} fill="#fbbf24" animate={{ cy: [50, 120, 190] }} transition={{ duration: 2, repeat: Infinity }} />}
    </svg>
  )
}

export function VectorDBAnim({ step }: AnimProps) {
  return <VerticalFlow steps={['Documents', 'Embed', 'Index', 'Query', 'Top-K']} step={step} />
}

export function TokenizationAnim({ step }: AnimProps) {
  return <VerticalFlow steps={['Sentence', 'Tokenizer', 'Tokens', 'Vocab IDs', 'To Model']} step={step} />
}

export function EmbeddingsAnim({ step }: AnimProps) {
  return <VerticalFlow steps={['Token IDs', 'E lookup', 'N×D matrix', '+ Position', 'Input X']} step={step} />
}

export function TransformerFlowAnim({ step }: AnimProps) {
  return <VerticalFlow steps={['Tokenize', 'Embed+PE', 'Attention', 'FFN × L', 'Softmax']} step={step} />
}

export function QKVAnim({ step }: AnimProps) {
  return (
    <svg viewBox="0 0 400 260" className="w-full max-w-lg">
      <SvgDefs />
      <FlowBox label="X (N×D)" x={150} y={15} active={step >= 0} />
      {step >= 0 && <MatMulPulse x={200} y={58} active={step === 0} />}
      {step >= 1 && (
        <>
          <FlowBox label="Q = XWq" x={30} y={75} active color="#8b5cf6" />
          <FlowBox label="K = XWk" x={150} y={75} active color="#22d3ee" />
          <FlowBox label="V = XWv" x={270} y={75} active color="#34d399" />
          <MatrixGrid rows={2} cols={2} x={35} y={130} label="Wq" glowCells={step >= 1 ? [[0, 0], [1, 1]] : []} />
          <MatrixGrid rows={2} cols={2} x={155} y={130} label="Wk" glowCells={step >= 1 ? [[0, 1]] : []} />
          <MatrixGrid rows={2} cols={2} x={275} y={130} label="Wv" glowCells={step >= 1 ? [[1, 0]] : []} />
        </>
      )}
      {step >= 2 && (
        <>
          <MatMulPulse x={200} y={195} active />
          <MatrixGrid rows={3} cols={3} x={140} y={205} label="Q·Kᵀ scores" glowCells={[[0, 0], [0, 1], [1, 1]]} />
        </>
      )}
      {step >= 3 && <text x={200} y={248} textAnchor="middle" fill="#a78bfa" fontSize={10}>softmax → weights (sum=1)</text>}
      {step >= 4 && <text x={200} y={248} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={600}>weights × V → context</text>}
    </svg>
  )
}

export function GenericConceptAnim({ step }: AnimProps) {
  return <VerticalFlow steps={['Input', 'Why?', 'Process', 'Transform', 'Output']} step={step} />
}

export function WeightMatricesAnim({ step }: AnimProps) {
  return (
    <svg viewBox="0 0 400 240" className="w-full max-w-lg">
      <SvgDefs />
      <rect x={150} y={20} width={100} height={32} rx={6} fill="#1a1d2e" stroke="#8b5cf6" strokeWidth={2} />
      <text x={200} y={40} textAnchor="middle" fill="#e8eaf6" fontSize={10}>X (N×D)</text>
      {step >= 1 && <MatMulPulse x={200} y={60} active />}
      {step >= 1 && <MatrixGrid rows={3} cols={3} x={155} y={70} label="Wq (D×D)" glowCells={[[0, 0], [1, 2]]} />}
      {step >= 2 && (
        <>
          <text x={200} y={175} textAnchor="middle" fill="#a78bfa" fontSize={10}>Q = X · Wq</text>
          <MatrixGrid rows={2} cols={3} x={140} y={185} label="Q (N×D)" glowCells={[[0, 0], [1, 1]]} />
        </>
      )}
      {step >= 3 && <text x={200} y={230} textAnchor="middle" fill="#22d3ee" fontSize={9}>Same for Wk, Wv → K, V</text>}
    </svg>
  )
}

export function ParametersAnim({ step }: AnimProps) {
  const theta = (0.5 - step * 0.08).toFixed(2)
  const loss = (9 - step * 2).toFixed(1)
  return (
    <svg viewBox="0 0 360 200" className="w-full max-w-lg">
      <SvgDefs />
      <text x={180} y={25} textAnchor="middle" fill="#9ca3af" fontSize={10}>θ (parameter) = {theta}</text>
      {step >= 0 && <text x={80} y={70} fill="#8b5cf6" fontSize={10}>pred = θ·x = {(parseFloat(theta) * 2).toFixed(2)}</text>}
      {step >= 1 && <text x={80} y={95} fill="#fb7185" fontSize={10}>target = 4.0</text>}
      {step >= 2 && <text x={80} y={120} fill="#fbbf24" fontSize={10}>loss = {loss}</text>}
      {step >= 3 && <text x={80} y={145} fill="#22d3ee" fontSize={10}>∂L/∂θ = -6.0</text>}
      {step >= 4 && (
        <motion.text x={180} y={175} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={600} initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
          θ_new = {theta} - 0.01×(-6) = {(parseFloat(theta) + 0.06).toFixed(2)}
        </motion.text>
      )}
    </svg>
  )
}

export function AttentionMechanismAnim({ step }: AnimProps) {
  const scores = [[1, 0], [0, 1]]
  return (
    <svg viewBox="0 0 400 260" className="w-full max-w-lg">
      <SvgDefs />
      {step >= 0 && <MatrixGrid rows={2} cols={2} x={50} y={40} label="Q·Kᵀ" glowCells={step >= 0 ? [[0, 0], [1, 1]] : []} />}
      {step >= 1 && (
        <>
          <MatMulPulse x={200} y={70} active />
          <text x={250} y={75} fill="#fbbf24" fontSize={12}>÷ √d</text>
          <text x={250} y={95} fill="#9ca3af" fontSize={9}>variance control</text>
        </>
      )}
      {step >= 2 && <AnimatedSoftmax values={[scores[0][0], 0.5]} x={50} y={130} step={step - 1} />}
      {step >= 3 && (
        <>
          <MatMulPulse x={200} y={200} active />
          <MatrixGrid rows={2} cols={2} x={250} y={170} label="× V" glowCells={[[0, 0], [1, 1]]} />
        </>
      )}
      {step >= 4 && <text x={200} y={250} textAnchor="middle" fill="#34d399" fontSize={10}>Context vectors out</text>}
    </svg>
  )
}

export function SoftmaxAnim({ step }: AnimProps) {
  return (
    <svg viewBox="0 0 320 200" className="w-full max-w-md">
      <SvgDefs />
      <AnimatedSoftmax values={[2.0, 1.0, 0.1]} x={50} y={50} step={step} />
      {step >= 3 && <text x={160} y={185} textAnchor="middle" fill="#34d399" fontSize={10}>Σ probabilities = 1.00</text>}
    </svg>
  )
}

export function LayerNormAnim({ step }: AnimProps) {
  const vals = [2, 4, 6]
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length
  const std = Math.sqrt(vals.reduce((a, v) => a + (v - mean) ** 2, 0) / vals.length)
  const norm = vals.map((v) => ((v - mean) / std).toFixed(2))
  return (
    <svg viewBox="0 0 380 220" className="w-full max-w-lg">
      <SvgDefs />
      {vals.map((v, i) => (
        <g key={i}>
          <rect x={60 + i * 90} y={40} width={70} height={30} rx={6} fill="#1a1d2e" stroke="#8b5cf6" />
          <text x={95 + i * 90} y={60} textAnchor="middle" fill="#e8eaf6" fontSize={10}>{step >= 1 ? norm[i] : v}</text>
        </g>
      ))}
      {step >= 1 && <text x={190} y={95} textAnchor="middle" fill="#fbbf24" fontSize={10}>μ={mean.toFixed(1)}, σ={std.toFixed(2)}</text>}
      {step >= 2 && <text x={190} y={120} textAnchor="middle" fill="#9ca3af" fontSize={9}>(x - μ) / σ</text>}
      {step >= 3 && (
        <>
          <text x={190} y={150} textAnchor="middle" fill="#22d3ee" fontSize={10}>× γ + β (learnable)</text>
          <MatrixGrid rows={1} cols={3} x={95} y={165} glowCells={[[0, 0], [0, 1], [0, 2]]} />
        </>
      )}
      {step >= 4 && <text x={190} y={210} textAnchor="middle" fill="#34d399" fontSize={10}>Stable training ✓</text>}
    </svg>
  )
}

export function FeedForwardAnim({ step }: AnimProps) {
  const widths = [40, step >= 1 ? 120 : 40, step >= 3 ? 40 : 40]
  return (
    <svg viewBox="0 0 400 200" className="w-full max-w-lg">
      <SvgDefs />
      {['D', '4D', 'D'].map((l, i) => (
        <motion.g key={l}>
          <motion.rect x={80 + i * 110} y={80} width={widths[i]} height={50} rx={8} fill="#1a1d2e" stroke={step >= i ? '#8b5cf6' : '#374151'} strokeWidth={2} animate={{ width: widths[i] }} />
          <text x={80 + i * 110 + widths[i] / 2} y={110} textAnchor="middle" fill="#e8eaf6" fontSize={10}>{l}</text>
        </motion.g>
      ))}
      {step >= 2 && <text x={200} y={155} textAnchor="middle" fill="#fbbf24" fontSize={11}>ReLU / GELU</text>}
      {step >= 4 && <text x={200} y={185} textAnchor="middle" fill="#34d399" fontSize={9}>~2/3 of transformer params</text>}
    </svg>
  )
}

export function PredictionAnim({ step }: AnimProps) {
  const probs = [0.15, 0.12, 0.45, 0.08, 0.2]
  const maxIdx = probs.indexOf(Math.max(...probs))
  return (
    <svg viewBox="0 0 400 220" className="w-full max-w-xl">
      <SvgDefs />
      <rect x={150} y={30} width={100} height={32} rx={6} fill="#1a1d2e" stroke="#8b5cf6" strokeWidth={2} />
      <text x={200} y={50} textAnchor="middle" fill="#e8eaf6" fontSize={9}>h[last]</text>
      {step >= 1 && <MatMulPulse x={200} y={70} active />}
      {step >= 2 &&
        probs.map((p, i) => (
          <motion.rect
            key={i}
            x={60 + i * 60}
            y={150 - p * 100}
            width={45}
            height={p * 100}
            fill={i === maxIdx && step >= 3 ? '#34d399' : '#8b5cf6'}
            opacity={0.7}
            rx={3}
            initial={{ height: 0 }}
            animate={{ height: step >= 2 ? p * 100 : 0 }}
          />
        ))}
      {step >= 4 && <text x={200} y={200} textAnchor="middle" fill="#34d399" fontSize={10}>Next token = argmax or sample</text>}
    </svg>
  )
}

export function makeFlowAnim(steps: string[]) {
  return function FlowAnim({ step }: AnimProps) {
    return <VerticalFlow steps={steps} step={step} />
  }
}
