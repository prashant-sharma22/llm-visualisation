import { motion } from 'framer-motion'
import { SvgDefs } from './primitives'

type AnimProps = { step: number }

export function QuantizationAnim({ step }: AnimProps) {
  const weights = [0.82, -0.45, 1.23, -0.11, 0.67]
  return (
    <svg viewBox="0 0 400 260" className="w-full max-w-lg">
      <SvgDefs />
      <text x={100} y={25} textAnchor="middle" fill="#a78bfa" fontSize={11} fontWeight={600}>
        FP16
      </text>
      {weights.map((w, i) => (
        <motion.g key={i}>
          <rect x={40} y={40 + i * 32} width={120} height={24} rx={4} fill="#1a1d2e" stroke="#8b5cf6" />
          <text x={100} y={57 + i * 32} textAnchor="middle" fill="#e8eaf6" fontSize={10}>
            {w.toFixed(2)}
          </text>
        </motion.g>
      ))}
      {step >= 1 && (
        <motion.text x={200} y={120} textAnchor="middle" fill="#fbbf24" fontSize={20} initial={{ scale: 0 }} animate={{ scale: 1 }}>
          →
        </motion.text>
      )}
      {step >= 2 && (
        <g>
          <text x={300} y={25} textAnchor="middle" fill="#22d3ee" fontSize={11} fontWeight={600}>
            INT4
          </text>
          {weights.map((_, i) => (
            <motion.rect
              key={i}
              x={240}
              y={40 + i * 32}
              width={120}
              height={24}
              rx={4}
              fill="#1a1d2e"
              stroke="#22d3ee"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
          {[3, -2, 5, 0, 2].map((v, i) => (
            <text key={i} x={300} y={57 + i * 32} textAnchor="middle" fill="#22d3ee" fontSize={10}>
              {v}
            </text>
          ))}
        </g>
      )}
      {step >= 3 && (
        <motion.text x={200} y={210} textAnchor="middle" fill="#9ca3af" fontSize={10} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          scale factor × integer = approximate float
        </motion.text>
      )}
      {step >= 4 && (
        <motion.text x={200} y={240} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={600} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          4× smaller · faster inference
        </motion.text>
      )}
    </svg>
  )
}

export function SparseAttentionAnim({ step }: AnimProps) {
  const n = 6
  return (
    <svg viewBox="0 0 320 300" className="w-full max-w-md">
      <SvgDefs />
      <text x={160} y={20} textAnchor="middle" fill="#9ca3af" fontSize={10}>
        {step < 2 ? 'Dense O(n²)' : 'Sparse pattern'}
      </text>
      {Array.from({ length: n * n }).map((_, idx) => {
        const r = Math.floor(idx / n)
        const c = idx % n
        const window = Math.abs(r - c) <= 1
        const global = r === 0 || c === 0
        const sparse = window || (step >= 2 && global)
        const show = step < 2 ? true : sparse
        return (
          <motion.rect
            key={idx}
            x={80 + c * 28}
            y={40 + r * 28}
            width={24}
            height={24}
            rx={3}
            fill={show ? (sparse && step >= 2 ? '#22d3ee' : '#8b5cf6') : '#1a1d2e'}
            opacity={show ? (sparse && step >= 2 ? 0.8 : 0.5) : 0.15}
            stroke={show ? '#8b5cf6' : '#374151'}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: idx * 0.02 }}
          />
        )
      })}
      {step >= 3 && (
        <motion.text x={160} y={230} textAnchor="middle" fill="#34d399" fontSize={11} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Sliding window + global tokens
        </motion.text>
      )}
      {step >= 4 && (
        <motion.text x={160} y={260} textAnchor="middle" fill="#a78bfa" fontSize={10} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          100K+ context feasible
        </motion.text>
      )}
    </svg>
  )
}

export function DistillationAnim({ step }: AnimProps) {
  return (
    <svg viewBox="0 0 400 260" className="w-full max-w-lg">
      <SvgDefs />
      <motion.rect x={120} y={30} width={160} height={70} rx={12} fill="#1a1d2e" stroke="#8b5cf6" strokeWidth={3} initial={{ scale: 0.8 }} animate={{ scale: 1 }} />
      <text x={200} y={60} textAnchor="middle" fill="#a78bfa" fontSize={12} fontWeight={700}>
        Teacher (70B)
      </text>
      <text x={200} y={80} textAnchor="middle" fill="#9ca3af" fontSize={9}>
        soft labels + dark knowledge
      </text>
      {step >= 1 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {[0, 1, 2].map((i) => (
            <motion.circle key={i} cx={200} cy={110 + i * 8} r={3} fill="#fbbf24" animate={{ y: [0, 40, 80] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }} />
          ))}
        </motion.g>
      )}
      {step >= 2 && (
        <motion.rect x={150} y={170} width={100} height={50} rx={10} fill="#1a1d2e" stroke="#22d3ee" strokeWidth={2} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} />
      )}
      <text x={200} y={200} textAnchor="middle" fill="#22d3ee" fontSize={11} fontWeight={600}>
        Student (1-3B)
      </text>
      {step >= 4 && (
        <motion.text x={200} y={250} textAnchor="middle" fill="#34d399" fontSize={10} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          On-device · fast · capable enough
        </motion.text>
      )}
    </svg>
  )
}

export function SpeculativeDecodingAnim({ step }: AnimProps) {
  const draftTokens = ['The', 'cat', 'sat']
  return (
    <svg viewBox="0 0 440 260" className="w-full max-w-xl">
      <SvgDefs />
      <text x={100} y={25} textAnchor="middle" fill="#22d3ee" fontSize={10} fontWeight={600}>
        Draft (1B)
      </text>
      {draftTokens.map((t, i) => (
        <motion.g key={t}>
          <rect x={50 + i * 60} y={40} width={50} height={28} rx={6} fill="#1a1d2e" stroke="#22d3ee" opacity={step >= 0 ? 1 : 0.3} />
          <text x={75 + i * 60} y={58} textAnchor="middle" fill="#22d3ee" fontSize={10}>
            {t}
          </text>
        </motion.g>
      ))}
      {step >= 1 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <text x={320} y={25} textAnchor="middle" fill="#8b5cf6" fontSize={10} fontWeight={600}>
            Target (70B)
          </text>
          <rect x={250} y={40} width={140} height={28} rx={6} fill="#1a1d2e" stroke="#8b5cf6" strokeWidth={2} />
          <text x={320} y={58} textAnchor="middle" fill="#a78bfa" fontSize={9}>
            parallel verify
          </text>
        </motion.g>
      )}
      {step >= 2 &&
        draftTokens.map((t, i) => (
          <motion.text key={`check-${t}`} x={75 + i * 60} y={100} textAnchor="middle" fontSize={14} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }}>
            {i < 2 ? '✓' : '✗'}
          </motion.text>
        ))}
      {step >= 3 && (
        <motion.text x={220} y={140} textAnchor="middle" fill="#34d399" fontSize={11} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Accept ✓ tokens · reject at ✗ · continue
        </motion.text>
      )}
      {step >= 4 && (
        <motion.text x={220} y={200} textAnchor="middle" fill="#fbbf24" fontSize={12} fontWeight={600} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          2-3× faster · lossless
        </motion.text>
      )}
    </svg>
  )
}
