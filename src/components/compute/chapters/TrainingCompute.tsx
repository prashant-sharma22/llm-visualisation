import { motion } from 'framer-motion'
import { SvgDefs } from '../../animations/primitives'
import { EquationBox, MatrixValues } from '../MatrixValues'

type Props = { step: number }

export function GradientDescentCompute({ step }: Props) {
  const thetaStart = 0.42
  const grad = -0.03
  const lr = 0.1
  const thetaNew = thetaStart - lr * grad
  const lossStart = 2.4
  const lossAfter = 2.1
  const iter = Math.min(step, 5)

  const ballX = 60 + iter * 45
  const ballY = 140 - iter * 12

  return (
    <svg viewBox="0 0 520 300" className="w-full">
      <SvgDefs />
      <text x={260} y={18} textAnchor="middle" fill="#94a3b8" fontSize={11}>
        {step < 2
          ? 'Forward pass → compute loss'
          : step < 4
            ? 'Backward: gradient flows to each parameter'
            : 'θ_new = θ − η·∇L — ONE parameter at a time'}
      </text>

      <path d="M 40 180 Q 260 40 480 180" fill="none" stroke="#374151" strokeWidth={2} />
      <text x={260} y={35} textAnchor="middle" fill="#64748b" fontSize={10}>
        Loss landscape
      </text>

      <motion.circle cx={ballX} cy={ballY} r={14} fill="#8b5cf6" animate={{ cx: ballX, cy: ballY }} transition={{ type: 'spring' }} />

      {step >= 2 && (
        <line x1={ballX} y1={ballY} x2={ballX + 35} y2={ballY + 25} stroke="#fb7185" strokeWidth={2} />
      )}
      {step >= 2 && (
        <text x={ballX + 40} y={ballY + 30} fill="#fb7185" fontSize={10}>
          ∇L
        </text>
      )}

      {step >= 3 && (
        <EquationBox
          x={30}
          y={200}
          highlight
          lines={[
            'Parameter w (one of billions):',
            `Old:  ${thetaStart}`,
            `Grad: ${grad}`,
            `η:    ${lr}`,
            `New:  ${thetaStart} − ${lr}×(${grad}) = ${thetaNew.toFixed(2)}`,
          ]}
        />
      )}

      {step >= 4 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <text x={300} y={215} fill="#94a3b8" fontSize={10}>
            Loss: {lossStart} → {lossAfter}
          </text>
          <text x={300} y={235} fill="#34d399" fontSize={10}>
            Repeat × 1000s iterations → parameters converge
          </text>
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={300 + i * 28} y={250} width={20} height={8 + i * 6} fill="#8b5cf6" opacity={0.4 + i * 0.12} />
          ))}
          <text x={370} y={275} fill="#64748b" fontSize={8}>
            training timeline
          </text>
        </motion.g>
      )}
    </svg>
  )
}

export function LayerNormCompute({ step }: Props) {
  const before = [5000, 8000, 10000]
  const after = [-1.07, 0, 1.07]

  return (
    <svg viewBox="0 0 520 280" className="w-full">
      <SvgDefs />
      <text x={260} y={18} textAnchor="middle" fill="#94a3b8" fontSize={11}>
        {step < 3 ? 'Huge activations → normalize' : 'LN(x) = γ·(x−μ)/σ + β'}
      </text>

      <text x={130} y={50} textAnchor="middle" fill="#f472b6" fontSize={10}>
        Before
      </text>
      {before.map((v, i) => (
        <g key={i}>
          <rect x={60 + i * 70} y={60} width={50} height={v / 80} fill="#f472b6" opacity={0.7} />
          <text x={85 + i * 70} y={55} textAnchor="middle" fill="#fda4af" fontSize={9}>
            {v}
          </text>
        </g>
      ))}

      {step >= 2 && <text x={260} y={140} textAnchor="middle" fill="#fbbf24" fontSize={20}>↓</text>}

      {step >= 2 && (
        <g>
          <text x={390} y={50} textAnchor="middle" fill="#34d399" fontSize={10}>
            After LN
          </text>
          {after.map((v, i) => (
            <g key={i}>
              <rect x={320 + i * 70} y={120 + (1 - v) * 20} width={50} height={30 + v * 15} fill="#34d399" opacity={0.7} />
              <text x={345 + i * 70} y={175} textAnchor="middle" fill="#6ee7b7" fontSize={10}>
                {v.toFixed(2)}
              </text>
            </g>
          ))}
        </g>
      )}

      {step >= 4 && (
        <EquationBox x={140} y={195} lines={['μ = mean(x)', 'σ = std(x)', 'LN = (x−μ)/σ']} highlight />
      )}
    </svg>
  )
}

export function FeedForwardCompute({ step }: Props) {
  const labels = ['D=2', '4D=8', 'D=2']

  return (
    <svg viewBox="0 0 520 260" className="w-full">
      <SvgDefs />
      <text x={260} y={18} textAnchor="middle" fill="#94a3b8" fontSize={11}>
        Each token processed independently — expand then compress
      </text>

      {[0, 1, 2].map((i) => (
        <g key={i} opacity={step >= i ? 1 : 0.3}>
          <rect x={80 + i * 140} y={80} width={100} height={40 + i * 30} rx={8} fill="#1a1d2e" stroke={step === i ? '#fbbf24' : '#8b5cf6'} strokeWidth={2} />
          <text x={130 + i * 140} y={105 + i * 10} textAnchor="middle" fill="#e2e8f0" fontSize={12}>
            {labels[i]}
          </text>
          {i < 2 && step > i && <text x={195 + i * 140} y={110} fill="#22d3ee" fontSize={16}>→</text>}
        </g>
      ))}

      {step >= 3 && (
        <text x={260} y={200} textAnchor="middle" fill="#34d399" fontSize={10}>
          W₁: (D, 4D) · GELU · W₂: (4D, D) — per token, not across sequence
        </text>
      )}
    </svg>
  )
}

export function KVCacheCompute({ step }: Props) {
  const tokens = ['The', 'cat', 'drinks']
  const visible = Math.min(step + 1, 3)

  return (
    <svg viewBox="0 0 520 300" className="w-full">
      <SvgDefs />
      <text x={260} y={18} textAnchor="middle" fill="#94a3b8" fontSize={11}>
        {step < 3 ? 'Generate one token at a time — cache K,V' : 'Q fresh each step · K,V reused'}
      </text>

      {tokens.slice(0, visible).map((t, i) => (
        <g key={t}>
          <rect x={80 + i * 120} y={45} width={70} height={32} rx={6} fill="#312e81" stroke="#8b5cf6" />
          <text x={115 + i * 120} y={66} textAnchor="middle" fill="#fff" fontSize={11}>
            {t}
          </text>
        </g>
      ))}

      {step >= 1 && (
        <MatrixValues matrix={[[0.57, 0.16], [0.36, 0.58]].slice(0, visible)} label="cache K ✓ stored" x={60} y={100} cellSize={32} />
      )}
      {step >= 1 && (
        <MatrixValues matrix={[[0.37, 0.26], [0.16, 0.68]].slice(0, visible)} label="cache V ✓ stored" x={260} y={100} cellSize={32} />
      )}

      {step >= 2 && (
        <g>
          <text x={260} y={200} textAnchor="middle" fill="#fbbf24" fontSize={11}>
            Q₃ computed fresh — NOT cached
          </text>
          <MatrixValues matrix={[[0.21, -0.31]]} label="Q (decode only)" x={200} y={210} />
        </g>
      )}

      {step >= 4 && (
        <g>
          <text x={130} y={275} textAnchor="middle" fill="#f472b6" fontSize={9}>
            Without cache: O(n²) recompute
          </text>
          <text x={390} y={275} textAnchor="middle" fill="#34d399" fontSize={9}>
            With cache: O(n) per token
          </text>
        </g>
      )}
    </svg>
  )
}

export function PredictionCompute({ step }: Props) {
  const logits = [1.2, 0.3, 2.1, 0.5]
  const words = ['The', 'cat', 'milk', '…']
  const probs = [0.12, 0.08, 0.65, 0.15]

  return (
    <svg viewBox="0 0 520 280" className="w-full">
      <SvgDefs />
      <text x={260} y={18} textAnchor="middle" fill="#94a3b8" fontSize={11}>
        Last hidden → Linear → logits → softmax → P(next token)
      </text>

      <MatrixValues matrix={[[0.52, 0.45]]} label="h (last position)" x={40} y={40} />
      {step >= 1 && <text x={160} y={75} fill="#fbbf24" fontSize={16}>× W_out</text>}
      {step >= 1 && (
        <g>
          {logits.map((l, i) => (
            <rect key={i} x={200 + i * 55} y={90 - l * 15} width={40} height={l * 15 + 10} fill="#6366f1" />
          ))}
          <text x={310} y={55} textAnchor="middle" fill="#a78bfa" fontSize={10}>
            logits
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          {words.map((w, i) => (
            <g key={w}>
              <text x={80 + i * 100} y={180} textAnchor="middle" fill={w === 'milk' ? '#fbbf24' : '#94a3b8'} fontSize={12} fontWeight={w === 'milk' ? 700 : 400}>
                {w} {(probs[i] * 100).toFixed(0)}%
              </text>
              <rect x={55 + i * 100} y={190} width={50} height={probs[i] * 60} fill={w === 'milk' ? '#fbbf24' : '#8b5cf6'} opacity={0.7} />
            </g>
          ))}
          <text x={260} y={270} textAnchor="middle" fill="#34d399" fontSize={10}>
            P(&quot;milk&quot;) = 65% — target token after &quot;The cat drinks&quot;
          </text>
        </g>
      )}
    </svg>
  )
}
