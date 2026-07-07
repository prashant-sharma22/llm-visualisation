import { motion } from 'framer-motion'
import { K, Q, fmt } from '../../../data/course-example'
import { SvgDefs } from '../../animations/primitives'
import { EquationBox, MatrixValues } from '../MatrixValues'

type Props = { step: number }

export function AttentionCompute({ step }: Props) {
  const qi = 0
  const kj = 3
  const qVec = Q[qi]
  const kVec = K[kj]
  const dot = qVec[0] * kVec[0] + qVec[1] * kVec[1]
  const scaled = dot / Math.sqrt(2)
  const showTranspose = step >= 2
  const showDot = step >= 1 && step < 5
  const showMatrix = step >= 5
  const showScale = step >= 6

  const scoreMatrix = [
    [0.36, 0.24, 0.31, 0.36],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]
  const scaledMatrix = scoreMatrix.map((row) => row.map((v) => (v ? v / Math.sqrt(2) : 0)))

  return (
    <svg viewBox="0 0 560 340" className="w-full">
      <SvgDefs />
      <text x={280} y={18} textAnchor="middle" fill="#94a3b8" fontSize={11}>
        {step < 2
          ? 'Q moves toward K — attention scores = Q·Kᵀ'
          : step < 5
            ? 'ONE dot product: Q₁ · K₄'
            : step < 6
              ? 'Fill score matrix cell by cell'
              : 'Scale by √d — prevents softmax explosion'}
      </text>

      <MatrixValues matrix={Q} label="Q" x={20} y={35} highlightRow={showDot ? qi : undefined} cellSize={32} />
      <text x={175} y={80} fill="#fbbf24" fontSize={16} fontWeight={700}>
        ·
      </text>
      <MatrixValues
        matrix={showTranspose ? K.map((r: number[]) => [r[0]]) : K}
        label={showTranspose ? 'Kᵀ (cols→rows)' : 'K'}
        x={200}
        y={35}
        highlightRow={showDot ? kj : undefined}
        cellSize={32}
      />

      {showDot && (
        <EquationBox
          x={20}
          y={200}
          highlight
          lines={[
            `Q[${qi}] · K[${kj}]`,
            `${fmt(qVec[0])}×${fmt(kVec[0])} + ${fmt(qVec[1])}×${fmt(kVec[1])}`,
            `= ${fmt(qVec[0] * kVec[0])} + ${fmt(qVec[1] * kVec[1])} = ${fmt(dot)}`,
          ]}
        />
      )}

      {showMatrix && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <MatrixValues
            matrix={showScale ? scaledMatrix : scoreMatrix}
            label={showScale ? 'S / √2' : 'S = Q·Kᵀ'}
            x={300}
            y={180}
            cellSize={28}
            highlightCell={[0, 3]}
            filledCells={new Set(['0,0', '0,1', '0,2', '0,3'])}
            dimEmpty
          />
        </motion.g>
      )}

      {showScale && (
        <text x={280} y={330} textAnchor="middle" fill="#34d399" fontSize={10}>
          Without scaling: 500, 900... → unstable. ÷√d = {fmt(scaled, 2)} keeps softmax stable
        </text>
      )}
    </svg>
  )
}

export function SoftmaxCompute({ step }: Props) {
  const raw = [7, 2, 5]
  const exps = raw.map((v) => Math.exp(v))
  const sum = exps.reduce((a, b) => a + b, 0)
  const probs = exps.map((e) => e / sum)

  return (
    <svg viewBox="0 0 520 300" className="w-full">
      <SvgDefs />
      <text x={260} y={18} textAnchor="middle" fill="#94a3b8" fontSize={11}>
        {step < 2 ? 'Raw scores (one row)' : step < 4 ? 'Exponentiate each value' : 'Divide by sum → probabilities'}
      </text>

      <text x={260} y={45} textAnchor="middle" fill="#a78bfa" fontSize={10}>
        Attention Distribution — bars sum to exactly 1.0
      </text>

      {raw.map((v, i) => (
        <g key={i}>
          <text x={100 + i * 110} y={70} textAnchor="middle" fill="#64748b" fontSize={9}>
            score {i + 1}
          </text>
          <rect x={70 + i * 110} y={78} width={60} height={24} rx={4} fill="#1a1d2e" stroke="#374151" />
          <text x={100 + i * 110} y={94} textAnchor="middle" fill="#e2e8f0" fontSize={11} fontFamily="monospace">
            {step >= 2 ? `e^${v}` : v}
          </text>
          {step >= 2 && (
            <text x={100 + i * 110} y={115} textAnchor="middle" fill="#22d3ee" fontSize={9}>
              = {exps[i].toFixed(1)}
            </text>
          )}
          {step >= 4 && (
            <motion.rect
              x={70 + i * 110}
              y={200 - probs[i] * 80}
              width={60}
              height={probs[i] * 80}
              fill="#8b5cf6"
              rx={4}
              initial={{ height: 0 }}
              animate={{ height: probs[i] * 80 }}
            />
          )}
          {step >= 4 && (
            <text x={100 + i * 110} y={215} textAnchor="middle" fill="#fbbf24" fontSize={11} fontWeight={700}>
              {(probs[i] * 100).toFixed(0)}%
            </text>
          )}
        </g>
      ))}

      {step >= 3 && step < 4 && (
        <text x={260} y={150} textAnchor="middle" fill="#fbbf24" fontSize={10}>
          sum = {exps.map((e) => e.toFixed(1)).join(' + ')} = {sum.toFixed(1)}
        </text>
      )}

      {step >= 4 && (
        <text x={260} y={240} textAnchor="middle" fill="#34d399" fontSize={10}>
          Σp = {(probs.reduce((a, b) => a + b, 0)).toFixed(2)} ✓ — valid attention weights
        </text>
      )}
    </svg>
  )
}

export function ValueCompute({ step }: Props) {
  const weights = [0.8, 0.1, 0.1]
  const vRows = [
    [0.37, 0.26],
    [0.16, 0.68],
    [0.25, 0.5],
  ]
  const out = [
    weights[0] * vRows[0][0] + weights[1] * vRows[1][0] + weights[2] * vRows[2][0],
    weights[0] * vRows[0][1] + weights[1] * vRows[1][1] + weights[2] * vRows[2][1],
  ]

  return (
    <svg viewBox="0 0 520 300" className="w-full">
      <SvgDefs />
      <text x={260} y={18} textAnchor="middle" fill="#94a3b8" fontSize={11}>
        {step < 3 ? 'Attention weights × Value = weighted sum' : 'Q searches · K matches · V carries information'}
      </text>

      <text x={80} y={50} fill="#a78bfa" fontSize={10}>
        Weights
      </text>
      {weights.map((w, i) => (
        <g key={i}>
          <rect x={40} y={60 + i * 36} width={50} height={28} rx={4} fill="#312e81" stroke="#8b5cf6" />
          <text x={65} y={78} textAnchor="middle" fill="#fff" fontSize={11}>
            {w}
          </text>
          <text x={110} y={78} fill="#94a3b8" fontSize={14}>
            ×
          </text>
          <MatrixValues matrix={[vRows[i]]} label={`V${i + 1}`} x={130} y={55 + i * 36} cellSize={24} />
        </g>
      ))}

      {step >= 2 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <text x={320} y={100} fill="#fbbf24" fontSize={18}>
            =
          </text>
          <MatrixValues matrix={[out]} label="Output vector" x={350} y={70} highlightCell={[0, 0]} />
          <EquationBox
            x={280}
            y={160}
            lines={[
              `${weights[0]}×[${vRows[0].join(',')}] +`,
              `${weights[1]}×[${vRows[1].join(',')}] +`,
              `${weights[2]}×[${vRows[2].join(',')}]`,
              `= [${out.map((v) => v.toFixed(2)).join(', ')}]`,
            ]}
            highlight={step >= 3}
          />
        </motion.g>
      )}
    </svg>
  )
}
