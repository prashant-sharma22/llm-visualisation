import { motion } from 'framer-motion'
import { FlowArrow, SvgDefs, Token } from './primitives'

type AnimProps = { step: number }

const tokens = ['The', 'cat', 'sat', 'on']

export function MaskedAttentionAnim({ step }: AnimProps) {
  const size = 4
  return (
    <div className="relative w-full max-w-lg">
      <svg viewBox="0 0 400 320" className="w-full">
        <SvgDefs />
        {step >= 0 &&
          tokens.map((t, i) => (
            <Token key={t} label={t} x={40 + i * 70} y={30} active={step >= 0} delay={i * 0.1} />
          ))}
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={100} textAnchor="middle" fill="#a78bfa" fontSize={12} fontWeight={600}>
              Q · Kᵀ / √d
            </text>
            {['Q', 'K', 'V'].map((l, i) => (
              <motion.rect
                key={l}
                x={120 + i * 60}
                y={110}
                width={40}
                height={28}
                rx={6}
                fill="#1a1d2e"
                stroke="#8b5cf6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.15 }}
              />
            ))}
          </motion.g>
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={165} textAnchor="middle" fill="#9ca3af" fontSize={11}>
              Attention Matrix
            </text>
            {Array.from({ length: size * size }).map((_, idx) => {
              const r = Math.floor(idx / size)
              const c = idx % size
              const masked = c > r
              const active = !masked && step >= 2
              return (
                <motion.rect
                  key={idx}
                  x={130 + c * 28}
                  y={175 + r * 28}
                  width={24}
                  height={24}
                  rx={4}
                  fill={masked ? (step >= 3 ? '#1f1215' : '#2a1a1f') : active ? '#8b5cf6' : '#1a1d2e'}
                  stroke={masked && step >= 3 ? '#fb7185' : '#374151'}
                  strokeWidth={masked && step >= 3 ? 2 : 1}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, opacity: masked && step >= 3 ? 0.4 : 1 }}
                  transition={{ delay: idx * 0.03 }}
                />
              )
            })}
            {step >= 3 && (
              <text x={200} y={310} textAnchor="middle" fill="#fb7185" fontSize={10}>
                −∞ mask on future tokens
              </text>
            )}
          </motion.g>
        )}
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <FlowArrow x1={200} y1={290} x2={200} y2={250} active />
            <text x={200} y={248} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={600}>
              Output = softmax(masked) × V
            </text>
          </motion.g>
        )}
      </svg>
    </div>
  )
}

export function MultiheadAttentionAnim({ step }: AnimProps) {
  const heads = ['H1', 'H2', 'H3', 'H4']
  const colors = ['#8b5cf6', '#22d3ee', '#34d399', '#fbbf24']
  return (
    <svg viewBox="0 0 440 300" className="w-full max-w-lg">
      <SvgDefs />
      <Token label="Input X" x={180} y={20} active={step >= 0} />
      {step >= 1 &&
        heads.map((h, i) => (
          <motion.g key={h} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <FlowArrow x1={208} y1={52} x2={60 + i * 90} y2={90} active={step >= 1} />
            <rect x={40 + i * 90} y={90} width={70} height={50} rx={8} fill="#1a1d2e" stroke={colors[i]} strokeWidth={2} />
            <text x={75 + i * 90} y={110} textAnchor="middle" fill={colors[i]} fontSize={10} fontWeight={700}>
              {h}
            </text>
            <text x={75 + i * 90} y={125} textAnchor="middle" fill="#9ca3af" fontSize={8}>
              Q,K,V
            </text>
          </motion.g>
        ))}
      {step >= 2 &&
        heads.map((h, i) => (
          <motion.circle
            key={`att-${h}`}
            cx={75 + i * 90}
            cy={170}
            r={18}
            fill="none"
            stroke={colors[i]}
            strokeWidth={2}
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
          />
        ))}
      {step >= 3 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <rect x={100} y={210} width={240} height={36} rx={8} fill="#1a1d2e" stroke="#8b5cf6" strokeWidth={2} />
          <text x={220} y={233} textAnchor="middle" fill="#e8eaf6" fontSize={11} fontWeight={600}>
            Concat(head₁…head₄)
          </text>
        </motion.g>
      )}
      {step >= 4 && (
        <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <FlowArrow x1={220} y1={246} x2={220} y2={268} active />
          <rect x={150} y={268} width={140} height={28} rx={6} fill="url(#glow)" opacity={0.3} stroke="#8b5cf6" />
          <text x={220} y={286} textAnchor="middle" fill="#fff" fontSize={10} fontWeight={600}>
            Wᴼ projection
          </text>
        </motion.g>
      )}
    </svg>
  )
}

export function KVCacheAnim({ step }: AnimProps) {
  const layers = 3
  return (
    <svg viewBox="0 0 460 300" className="w-full max-w-xl">
      <SvgDefs />
      <text x={20} y={25} fill="#9ca3af" fontSize={10}>
        KV Cache
      </text>
      {Array.from({ length: layers }).map((_, li) => (
        <g key={li}>
          <rect x={20} y={40 + li * 80} width={120} height={60} rx={8} fill="#1a1d2e" stroke="#374151" />
          <text x={80} y={65 + li * 80} textAnchor="middle" fill="#a78bfa" fontSize={10}>
            Layer {li + 1}
          </text>
          {step >= 1 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: step >= 1 ? 1 : 0 }}>
              {['K', 'V'].map((k, ki) => (
                <rect
                  key={k}
                  x={30 + ki * 50}
                  y={72 + li * 80}
                  width={40}
                  height={20}
                  rx={4}
                  fill={step >= 1 ? '#8b5cf6' : '#2a2d42'}
                  opacity={0.7}
                />
              ))}
            </motion.g>
          )}
        </g>
      ))}
      {step >= 0 && (
        <motion.g animate={{ x: step >= 2 ? 0 : 0 }}>
          <Token label="T₁" x={180} y={50} active color="#22d3ee" />
          {step >= 1 && <Token label="T₂" x={260} y={50} active delay={0.2} color="#34d399" />}
          {step >= 2 && <Token label="T₃" x={340} y={50} active delay={0.4} color="#fbbf24" />}
        </motion.g>
      )}
      {step >= 2 && (
        <motion.text
          x={300}
          y={140}
          textAnchor="middle"
          fill="#22d3ee"
          fontSize={11}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Reuse cached K,V
        </motion.text>
      )}
      {step >= 3 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <text x={300} y={180} textAnchor="middle" fill="#9ca3af" fontSize={10}>
            Q_new × [K₁,K₂,K₃]ᵀ
          </text>
          {[0, 1, 2].map((i) => (
            <motion.rect
              key={i}
              x={250 + i * 35}
              y={190}
              width={28}
              height={28}
              rx={4}
              fill="#8b5cf6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.15 }}
            />
          ))}
        </motion.g>
      )}
      {step >= 4 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <rect x={200} y={240} width={200} height={40} rx={8} fill="#1f1215" stroke="#fb7185" />
          <text x={300} y={258} textAnchor="middle" fill="#fb7185" fontSize={10}>
            Memory grows ↑
          </text>
          <text x={300} y={272} textAnchor="middle" fill="#9ca3af" fontSize={9}>
            seq_len × layers × heads
          </text>
        </motion.g>
      )}
    </svg>
  )
}
