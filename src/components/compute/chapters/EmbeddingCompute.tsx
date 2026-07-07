import { motion } from 'framer-motion'
import { EMBEDDING_TABLE, TOKEN_IDS, TOKENS, X } from '../../../data/course-example'
import { SvgDefs } from '../../animations/primitives'
import { ArrowDown, MatrixValues } from '../MatrixValues'

type Props = { step: number }

export function EmbeddingCompute({ step }: Props) {
  const tokenIdx = Math.min(Math.floor(step / 2), 3)
  const id = TOKEN_IDS[tokenIdx]
  const row = EMBEDDING_TABLE[id]
  const filledX = new Set<string>()
  for (let r = 0; r <= tokenIdx; r++) {
    for (let c = 0; c < 2; c++) filledX.add(`${r},${c}`)
  }

  return (
    <svg viewBox="0 0 520 320" className="w-full">
      <SvgDefs />
      <text x={260} y={20} textAnchor="middle" fill="#94a3b8" fontSize={11}>
        {step < 2
          ? `Lookup row ${id} for "${TOKENS[tokenIdx]}"`
          : step < 8
            ? 'Each row slides into sentence matrix X'
            : 'Embedding Matrix X — rows = tokens, cols = features'}
      </text>

      <MatrixValues
        matrix={[[row[0], row[1]]]}
        label={`E[${id}] = "${TOKENS[tokenIdx]}"`}
        x={40}
        y={40}
        highlightCell={[0, step % 2]}
      />

      {step >= 1 && <ArrowDown x={80} y={100} label="copy row" />}

      <MatrixValues
        matrix={step >= 8 ? X : X.map((r: number[], i: number) => (i <= tokenIdx ? r : [0, 0]))}
        label="X (N × D)"
        x={280}
        y={40}
        highlightRow={tokenIdx}
        filledCells={step >= 8 ? undefined : filledX}
        dimEmpty
      />

      {step >= 2 && step < 8 && (
        <motion.line
          x1={120}
          y1={130}
          x2={280}
          y2={60 + tokenIdx * 44}
          stroke="#fbbf24"
          strokeWidth={2}
          strokeDasharray="6 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
        />
      )}

      {step >= 8 && (
        <g>
          <text x={40} y={260} fill="#64748b" fontSize={9}>
            Rows = tokens: {TOKENS.join(', ')}
          </text>
          <text x={40} y={276} fill="#64748b" fontSize={9}>
            Columns = features (D={2})
          </text>
          <text x={40} y={300} fill="#34d399" fontSize={10}>
            Shape: ({X.length}, {X[0].length}) — every row copied from vocabulary table E
          </text>
        </g>
      )}
    </svg>
  )
}

export function ParametersCompute({ step }: Props) {
  return (
    <svg viewBox="0 0 520 300" className="w-full">
      <SvgDefs />
      <text x={260} y={20} textAnchor="middle" fill="#94a3b8" fontSize={11}>
        {step === 0
          ? 'Wq, Wk, Wv already exist — NOT generated at runtime'
          : step < 3
            ? 'Each number is one trainable parameter'
            : 'GPT-2: ~117M parameters = 117M learnable numbers'}
      </text>

      {['Wq', 'Wk', 'Wv'].map((name, i) => (
        <g key={name} opacity={step >= i ? 1 : 0.3}>
          <MatrixValues
            matrix={i === 0 ? [[0.31, -0.44], [0.81, 0.12]] : i === 1 ? [[0.6, 0.1], [0.3, 0.7]] : [[0.4, 0.2], [0.1, 0.8]]}
            label={name}
            x={60 + i * 140}
            y={50}
            highlightCell={step === i + 1 ? [0, 0] : undefined}
          />
        </g>
      ))}

      {step >= 1 && step < 4 && (
        <text x={260} y={175} textAnchor="middle" fill="#fbbf24" fontSize={10}>
          Hover concept: Wq[0,0] = 0.31 → &quot;This is one parameter&quot;
        </text>
      )}

      {step >= 4 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <text x={260} y={200} textAnchor="middle" fill="#e2e8f0" fontSize={13} fontWeight={600}>
            7 Billion Parameters
          </text>
          <text x={260} y={222} textAnchor="middle" fill="#94a3b8" fontSize={10}>
            = 7,000,000,000 learnable numbers (weights + biases)
          </text>
          <text x={260} y={250} textAnchor="middle" fill="#34d399" fontSize={10}>
            Training adjusts each one via gradient descent
          </text>
        </motion.g>
      )}
    </svg>
  )
}
