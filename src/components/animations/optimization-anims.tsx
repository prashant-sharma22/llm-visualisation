import { motion } from 'framer-motion'
import { SvgDefs } from './primitives'

type AnimProps = { step: number }

export function FlashAttentionAnim({ step }: AnimProps) {
  const tiles = 3
  return (
    <svg viewBox="0 0 400 280" className="w-full max-w-lg">
      <SvgDefs />
      <text x={200} y={20} textAnchor="middle" fill="#a78bfa" fontSize={12} fontWeight={600}>
        SRAM (fast on-chip)
      </text>
      <rect x={80} y={30} width={240} height={80} rx={10} fill="#1a1d2e" stroke="#22d3ee" strokeWidth={2} strokeDasharray={step >= 1 ? '0' : '4'} />
      {step >= 0 &&
        Array.from({ length: tiles }).map((_, i) => (
          <motion.rect
            key={i}
            x={95 + i * 70}
            y={45}
            width={55}
            height={50}
            rx={6}
            fill={step >= 1 && i === step % tiles ? '#8b5cf6' : '#2a2d42'}
            stroke="#8b5cf6"
            animate={step >= 1 ? { opacity: [0.5, 1, 0.5] } : {}}
            transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.3 }}
          />
        ))}
      <text x={200} y={140} textAnchor="middle" fill="#9ca3af" fontSize={11}>
        HBM (slow) — full n×n matrix ✗
      </text>
      <rect x={60} y={155} width={280} height={50} rx={8} fill="#1f1215" stroke="#fb7185" strokeDasharray="6" opacity={step >= 3 ? 0.3 : 0.8} />
      {step >= 2 && (
        <motion.text x={200} y={185} textAnchor="middle" fill="#34d399" fontSize={11} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Online softmax — running max/sum
        </motion.text>
      )}
      {step >= 4 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <text x={200} y={240} textAnchor="middle" fill="#22d3ee" fontSize={12} fontWeight={600}>
            O(n) memory · 2-4× faster
          </text>
        </motion.g>
      )}
    </svg>
  )
}

export function PagedAttentionAnim({ step }: AnimProps) {
  const blocks = 8
  return (
    <svg viewBox="0 0 420 280" className="w-full max-w-lg">
      <SvgDefs />
      <text x={20} y={20} fill="#9ca3af" fontSize={10}>
        GPU Memory
      </text>
      <rect x={20} y={30} width={380} height={100} rx={8} fill="#12141f" stroke="#374151" />
      {Array.from({ length: blocks }).map((_, i) => {
        const allocated = step >= 1 && [0, 1, 2, 5, 6].includes(i)
        const freed = step >= 3 && [3, 4, 7].includes(i)
        return (
          <motion.rect
            key={i}
            x={30 + i * 44}
            y={45}
            width={36}
            height={70}
            rx={4}
            fill={allocated ? '#8b5cf6' : freed ? '#1a1d2e' : '#2a2d42'}
            stroke={freed && step >= 3 ? '#34d399' : allocated ? '#a78bfa' : '#374151'}
            strokeWidth={freed && step >= 3 ? 2 : 1}
            animate={freed && step >= 3 ? { opacity: [1, 0.5, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        )
      })}
      {step >= 2 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <text x={210} y={155} textAnchor="middle" fill="#a78bfa" fontSize={11}>
            Block Table: logical → physical
          </text>
          {[0, 1, 2].map((r) => (
            <g key={r}>
              <text x={60} y={175 + r * 22} fill="#9ca3af" fontSize={9}>
                Req {String.fromCharCode(65 + r)}
              </text>
              {[0, 1, 2, 3].map((c) => (
                <rect key={c} x={100 + c * 30} y={162 + r * 22} width={24} height={16} rx={3} fill="#8b5cf6" opacity={0.6} />
              ))}
            </g>
          ))}
        </motion.g>
      )}
      {step >= 4 && (
        <motion.text x={210} y={260} textAnchor="middle" fill="#34d399" fontSize={11} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Continuous batching — new requests fill free blocks
        </motion.text>
      )}
    </svg>
  )
}

export function MoEAnim({ step }: AnimProps) {
  const experts = ['E1', 'E2', 'E3', 'E4']
  const colors = ['#8b5cf6', '#22d3ee', '#34d399', '#fbbf24']
  const active = step >= 2 ? [0, 2] : []
  return (
    <svg viewBox="0 0 400 280" className="w-full max-w-lg">
      <SvgDefs />
      <motion.circle cx={200} cy={40} r={24} fill="#1a1d2e" stroke="#8b5cf6" strokeWidth={2} initial={{ scale: 0 }} animate={{ scale: 1 }} />
      <text x={200} y={45} textAnchor="middle" fill="#fff" fontSize={10} fontWeight={600}>
        Token
      </text>
      {step >= 1 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <rect x={150} y={75} width={100} height={30} rx={6} fill="#1a1d2e" stroke="#fbbf24" />
          <text x={200} y={95} textAnchor="middle" fill="#fbbf24" fontSize={10}>
            Router / Gate
          </text>
          {experts.map((e, i) => (
            <motion.line key={e} x1={200} y1={105} x2={70 + i * 85} y2={140} stroke="#374151" strokeWidth={1} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
          ))}
        </motion.g>
      )}
      {experts.map((e, i) => (
        <motion.g key={e}>
          <rect
            x={45 + i * 85}
            y={140}
            width={70}
            height={60}
            rx={8}
            fill={active.includes(i) ? colors[i] : '#1a1d2e'}
            fillOpacity={active.includes(i) ? 0.3 : 1}
            stroke={active.includes(i) ? colors[i] : '#374151'}
            strokeWidth={active.includes(i) ? 3 : 1}
          />
          <text x={80 + i * 85} y={175} textAnchor="middle" fill={active.includes(i) ? colors[i] : '#6b7280'} fontSize={11} fontWeight={700}>
            {e}
          </text>
        </motion.g>
      ))}
      {step >= 3 && active.map((ei, idx) => (
        <motion.circle key={ei} cx={80 + ei * 85} cy={140} r={6} fill={colors[ei]} initial={{ scale: 0 }} animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: idx * 0.2 }} />
      ))}
      {step >= 4 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <text x={200} y={240} textAnchor="middle" fill="#34d399" fontSize={11}>
            Weighted merge → output
          </text>
          <rect x={140} y={250} width={120} height={24} rx={6} fill="url(#glow)" opacity={0.4} />
        </motion.g>
      )}
    </svg>
  )
}
