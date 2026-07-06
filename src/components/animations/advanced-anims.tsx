import { motion } from 'framer-motion'
import { AnimatedSoftmax, MatrixGrid, MatMulPulse, SvgDefs, Token } from './primitives'

type AnimProps = { step: number }

function ResidualSkip({ step, x, y }: { step: number; x: number; y: number }) {
  return (
    <motion.path
      d={`M ${x} ${y} Q ${x - 40} ${y + 30} ${x} ${y + 60}`}
      fill="none"
      stroke={step >= 2 ? '#fbbf24' : '#374151'}
      strokeWidth={2}
      strokeDasharray="6"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: step >= 2 ? 1 : 0 }}
    />
  )
}

export function ResidualAnim({ step }: AnimProps) {
  return (
    <svg viewBox="0 0 360 240" className="w-full max-w-lg">
      <SvgDefs />
      <rect x={130} y={30} width={100} height={36} rx={8} fill="#1a1d2e" stroke={step >= 0 ? '#8b5cf6' : '#374151'} strokeWidth={2} />
      <text x={180} y={53} textAnchor="middle" fill="#e8eaf6" fontSize={10} fontWeight={600}>x (input)</text>
      {step >= 1 && (
        <>
          <MatMulPulse x={180} y={75} active />
          <rect x={130} y={85} width={100} height={36} rx={8} fill="#1a1d2e" stroke="#22d3ee" strokeWidth={2} />
          <text x={180} y={108} textAnchor="middle" fill="#22d3ee" fontSize={10}>F(x) sublayer</text>
        </>
      )}
      <ResidualSkip step={step} x={240} y={40} />
      {step >= 2 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <text x={180} y={145} textAnchor="middle" fill="#fbbf24" fontSize={12} fontWeight={700}>x + F(x)</text>
          <MatrixGrid rows={2} cols={2} x={140} y={155} glowCells={[[0, 0], [1, 1]]} label="skip add" />
        </motion.g>
      )}
      {step >= 3 && (
        <>
          <rect x={130} y={195} width={100} height={32} rx={8} fill="#1a1d2e" stroke="#34d399" strokeWidth={2} />
          <text x={180} y={216} textAnchor="middle" fill="#34d399" fontSize={10}>LayerNorm</text>
        </>
      )}
      {step >= 4 && <text x={180} y={235} textAnchor="middle" fill="#9ca3af" fontSize={9}>Gradient highway via skip</text>}
    </svg>
  )
}

export function RoPEAnim({ step }: AnimProps) {
  const angle = step * 30
  return (
    <svg viewBox="0 0 360 260" className="w-full max-w-lg">
      <SvgDefs />
      <text x={180} y={20} textAnchor="middle" fill="#a78bfa" fontSize={10}>Rotate Q,K by position angle θ</text>
      {['pos=0', 'pos=1', 'pos=2'].map((p, i) => (
        <g key={p}>
          <circle cx={70 + i * 110} cy={80} r={35} fill="none" stroke="#374151" />
          <motion.line
            x1={70 + i * 110}
            y1={80}
            x2={70 + i * 110 + Math.cos((angle + i * 40) * Math.PI / 180) * 30}
            y2={80 - Math.sin((angle + i * 40) * Math.PI / 180) * 30}
            stroke="#8b5cf6"
            strokeWidth={3}
            animate={{ rotate: step >= 1 ? angle + i * 40 : 0 }}
            style={{ transformOrigin: `${70 + i * 110}px 80px` }}
          />
          <text x={70 + i * 110} y={130} textAnchor="middle" fill="#9ca3af" fontSize={9}>{p}</text>
        </g>
      ))}
      {step >= 2 && <text x={180} y={165} textAnchor="middle" fill="#22d3ee" fontSize={10}>Q·K depends on relative angle (m-n)</text>}
      {step >= 3 && <MatrixGrid rows={3} cols={3} x={130} y={180} label="Attention" glowCells={[[0, 1], [1, 2]]} />}
      {step >= 4 && <text x={180} y={250} textAnchor="middle" fill="#34d399" fontSize={10}>Llama/Mistral standard</text>}
    </svg>
  )
}

export function GQAAnim({ step }: AnimProps) {
  const qHeads = 4
  const kvGroups = 2
  return (
    <svg viewBox="0 0 400 220" className="w-full max-w-xl">
      <SvgDefs />
      {Array.from({ length: qHeads }).map((_, i) => (
        <motion.rect
          key={`q-${i}`}
          x={40 + i * 85}
          y={30}
          width={70}
          height={40}
          rx={6}
          fill="#1a1d2e"
          stroke="#8b5cf6"
          strokeWidth={step >= 0 ? 2 : 1}
          animate={step >= 2 ? { opacity: [1, 0.7, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.15 }}
        />
      ))}
      <text x={200} y={20} textAnchor="middle" fill="#a78bfa" fontSize={9}>4 Query heads</text>
      {step >= 1 &&
        Array.from({ length: kvGroups }).map((_, i) => (
          <g key={`kv-${i}`}>
            <rect x={100 + i * 180} y={110} width={100} height={50} rx={8} fill="#1a1d2e" stroke="#22d3ee" strokeWidth={2} />
            <text x={150 + i * 180} y={140} textAnchor="middle" fill="#22d3ee" fontSize={10}>K,V group {i + 1}</text>
            {[0, 1].map((j) => (
              <line key={j} x1={75 + j * 85} y1={70} x2={150 + i * 180} y2={110} stroke="#374151" strokeWidth={1} />
            ))}
          </g>
        ))}
      {step >= 3 && <text x={200} y={185} textAnchor="middle" fill="#fbbf24" fontSize={10}>KV cache 2× smaller vs MHA</text>}
      {step >= 4 && <text x={200} y={210} textAnchor="middle" fill="#34d399" fontSize={10}>Broadcast shared K,V to Q heads</text>}
    </svg>
  )
}

export function BertGptAnim({ step }: AnimProps) {
  return (
    <svg viewBox="0 0 400 240" className="w-full max-w-xl">
      <SvgDefs />
      <text x={100} y={25} textAnchor="middle" fill="#22d3ee" fontSize={11} fontWeight={600}>BERT</text>
      <text x={300} y={25} textAnchor="middle" fill="#8b5cf6" fontSize={11} fontWeight={600}>GPT</text>
      {['The', '[MASK]', 'sat'].map((t, i) => (
        <Token key={`b-${t}`} label={t} x={50 + i * 55} y={40} active={step >= 0} color="#22d3ee" />
      ))}
      {['The', 'cat', '→'].map((t, i) => (
        <Token key={`g-${t}`} label={t} x={230 + i * 55} y={40} active={step >= 1} color="#8b5cf6" />
      ))}
      {step >= 2 && (
        <>
          <text x={100} y={110} textAnchor="middle" fill="#22d3ee" fontSize={9}>Bidirectional ✓✓</text>
          <MatrixGrid rows={3} cols={3} x={55} y={120} glowCells={[[0, 0], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2]]} />
        </>
      )}
      {step >= 3 && (
        <>
          <text x={300} y={110} textAnchor="middle" fill="#8b5cf6" fontSize={9}>Causal (left only)</text>
          <MatrixGrid rows={3} cols={3} x={255} y={120} glowCells={[[0, 0], [1, 0], [1, 1], [2, 0], [2, 1], [2, 2]]} />
        </>
      )}
      {step >= 4 && <text x={200} y={220} textAnchor="middle" fill="#34d399" fontSize={10}>Chat LLMs = GPT-style decoder</text>}
    </svg>
  )
}

export function BackpropAnim({ step }: AnimProps) {
  const layers = ['Loss', 'Out', 'FFN', 'Attn', 'Embed']
  return (
    <svg viewBox="0 0 400 200" className="w-full max-w-xl">
      <SvgDefs />
      {layers.map((l, i) => (
        <motion.g key={l}>
          <rect x={40 + i * 70} y={80} width={60} height={32} rx={6} fill="#1a1d2e" stroke={step >= 4 - i ? '#fb7185' : '#374151'} strokeWidth={2} />
          <text x={70 + i * 70} y={100} textAnchor="middle" fill={step >= 4 - i ? '#fb7185' : '#6b7280'} fontSize={8}>{l}</text>
          {i < layers.length - 1 && step >= 4 - i && (
            <motion.line
              x1={100 + i * 70}
              y1={96}
              x2={110 + i * 70}
              y2={96}
              stroke="#fb7185"
              strokeWidth={2}
              markerEnd="url(#arrow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
            />
          )}
        </motion.g>
      ))}
      {step >= 0 && step < 2 && <text x={200} y={50} textAnchor="middle" fill="#22d3ee" fontSize={10}>Forward →</text>}
      {step >= 2 && <text x={200} y={50} textAnchor="middle" fill="#fb7185" fontSize={10}>← Backward (chain rule)</text>}
      {step >= 4 && <text x={200} y={160} textAnchor="middle" fill="#34d399" fontSize={10}>θ -= η · ∂L/∂θ</text>}
    </svg>
  )
}

export function CrossEntropyAnim({ step }: AnimProps) {
  const logits = [1.2, 0.3, 2.1]
  const exps = logits.map((v) => Math.exp(v))
  const sum = exps.reduce((a, b) => a + b, 0)
  const probs = exps.map((e) => e / sum)
  return (
    <svg viewBox="0 0 380 220" className="w-full max-w-lg">
      <SvgDefs />
      {step >= 0 && logits.map((v, i) => (
        <g key={i}>
          <rect x={80 + i * 90} y={40} width={70} height={30} rx={6} fill="#1a1d2e" stroke="#8b5cf6" />
          <text x={115 + i * 90} y={60} textAnchor="middle" fill="#e8eaf6" fontSize={10}>{v}</text>
        </g>
      ))}
      {step >= 1 && <AnimatedSoftmax values={logits} x={80} y={90} step={step} />}
      {step >= 3 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <text x={190} y={175} textAnchor="middle" fill="#fbbf24" fontSize={10}>
            true="sat" idx=2 → loss = -log({probs[2].toFixed(2)}) = {(-Math.log(probs[2])).toFixed(2)}
          </text>
        </motion.g>
      )}
      {step >= 4 && <text x={190} y={200} textAnchor="middle" fill="#34d399" fontSize={10}>Minimize CE = maximize P(true token)</text>}
    </svg>
  )
}

export function LoRAAnim({ step }: AnimProps) {
  return (
    <svg viewBox="0 0 380 220" className="w-full max-w-lg">
      <SvgDefs />
      <rect x={140} y={30} width={100} height={40} rx={8} fill="#1a1d2e" stroke="#6b7280" strokeWidth={2} strokeDasharray="4" />
      <text x={190} y={55} textAnchor="middle" fill="#6b7280" fontSize={10}>W (frozen)</text>
      {step >= 1 && (
        <>
          <rect x={60} y={100} width={60} height={30} rx={6} fill="#1a1d2e" stroke="#22d3ee" strokeWidth={2} />
          <text x={90} y={120} textAnchor="middle" fill="#22d3ee" fontSize={9}>A (train)</text>
          <MatMulPulse x={130} y={115} active={step === 1} />
          <rect x={140} y={100} width={60} height={30} rx={6} fill="#1a1d2e" stroke="#22d3ee" strokeWidth={2} />
          <text x={170} y={120} textAnchor="middle" fill="#22d3ee" fontSize={9}>B (train)</text>
        </>
      )}
      {step >= 2 && (
        <motion.text x={190} y={160} textAnchor="middle" fill="#fbbf24" fontSize={11} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          h = xW + xAB
        </motion.text>
      )}
      {step >= 3 && <MatrixGrid rows={2} cols={2} x={155} y={170} label="ΔW low-rank" glowCells={[[0, 1]]} />}
      {step >= 4 && <text x={190} y={215} textAnchor="middle" fill="#34d399" fontSize={9}>Train only A,B — 0.1% params</text>}
    </svg>
  )
}

export function PrefillDecodeAnim({ step }: AnimProps) {
  const tokens = ['The', 'cat', 'sat', 'on', 'mat']
  return (
    <svg viewBox="0 0 420 240" className="w-full max-w-xl">
      <SvgDefs />
      <text x={120} y={25} textAnchor="middle" fill="#22d3ee" fontSize={10} fontWeight={600}>PREFILL (parallel)</text>
      {tokens.slice(0, 3).map((t, i) => (
        <Token key={`p-${t}`} label={t} x={40 + i * 55} y={40} active={step >= 0 && step < 3} color="#22d3ee" delay={i * 0.1} />
      ))}
      {step >= 1 && (
        <motion.rect x={40} y={85} width={155} height={24} rx={4} fill="#22d3ee" fillOpacity={0.2} stroke="#22d3ee" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} />
      )}
      <text x={300} y={25} textAnchor="middle" fill="#8b5cf6" fontSize={10} fontWeight={600}>DECODE (sequential)</text>
      {tokens.slice(3).map((t, i) => (
        <motion.g key={`d-${t}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: step >= 2 + i ? 1 : 0.3, x: 0 }}>
          <Token label={t} x={240 + i * 55} y={40} active={step >= 2 + i} color="#8b5cf6" />
        </motion.g>
      ))}
      {step >= 2 && (
        <g>
          <rect x={240} y={85} width={50} height={60} rx={4} fill="#1a1d2e" stroke="#8b5cf6" />
          <text x={265} y={105} textAnchor="middle" fill="#a78bfa" fontSize={8}>KV</text>
          <text x={265} y={120} textAnchor="middle" fill="#a78bfa" fontSize={8}>cache</text>
          <text x={265} y={135} textAnchor="middle" fill="#9ca3af" fontSize={7}>grows</text>
        </g>
      )}
      {step >= 4 && <text x={210} y={200} textAnchor="middle" fill="#34d399" fontSize={10}>TTFT=prefill · TPOT=decode</text>}
    </svg>
  )
}

export function TokenSamplingAnim({ step }: AnimProps) {
  const logits = [2.0, 1.0, 0.5, 0.1]
  const temps = [0.5, 1.0, 1.5]
  const t = temps[Math.min(step, 2)]
  const scaled = logits.map((v) => v / t)
  const exps = scaled.map((v) => Math.exp(v))
  const sum = exps.reduce((a, b) => a + b, 0)
  const probs = exps.map((e) => e / sum)
  return (
    <svg viewBox="0 0 400 220" className="w-full max-w-xl">
      <SvgDefs />
      <text x={200} y={20} textAnchor="middle" fill="#9ca3af" fontSize={10}>Temperature T = {t}</text>
      {logits.map((v, i) => (
        <g key={i}>
          <rect x={60 + i * 80} y={40} width={60} height={24} rx={4} fill="#1a1d2e" stroke="#8b5cf6" />
          <text x={90 + i * 80} y={56} textAnchor="middle" fill="#e8eaf6" fontSize={9}>{step >= 1 ? scaled[i].toFixed(1) : v}</text>
          {step >= 2 && (
            <motion.rect
              x={60 + i * 80}
              y={120 - probs[i] * 70}
              width={60}
              height={probs[i] * 70}
              fill="#22d3ee"
              opacity={0.7}
              rx={3}
              initial={{ height: 0 }}
              animate={{ height: probs[i] * 70 }}
            />
          )}
          {step >= 2 && (
            <text x={90 + i * 80} y={140} textAnchor="middle" fill="#22d3ee" fontSize={8}>{(probs[i] * 100).toFixed(0)}%</text>
          )}
        </g>
      ))}
      {step >= 3 && <text x={200} y={175} textAnchor="middle" fill="#fbbf24" fontSize={10}>Top-p cut tail tokens</text>}
      {step >= 4 && <text x={200} y={200} textAnchor="middle" fill="#34d399" fontSize={10}>🎲 Sample from distribution</text>}
    </svg>
  )
}

export function RAGAnim({ step }: AnimProps) {
  return (
    <svg viewBox="0 0 400 240" className="w-full max-w-xl">
      <SvgDefs />
      <Token label="Query" x={30} y={100} active={step >= 0} color="#fbbf24" />
      {step >= 1 && (
        <>
          <line x1={90} y1={115} x2={140} y2={80} stroke="#22d3ee" strokeWidth={2} />
          <rect x={140} y={50} width={80} height={36} rx={6} fill="#1a1d2e" stroke="#22d3ee" />
          <text x={180} y={72} textAnchor="middle" fill="#22d3ee" fontSize={9}>Embed</text>
        </>
      )}
      {step >= 2 && (
        <>
          <rect x={250} y={30} width={120} height={100} rx={8} fill="#12141f" stroke="#8b5cf6" />
          <text x={310} y={50} textAnchor="middle" fill="#a78bfa" fontSize={9}>Vector DB</text>
          {[0, 1, 2].map((i) => (
            <motion.rect
              key={i}
              x={260}
              y={60 + i * 22}
              width={100}
              height={16}
              rx={3}
              fill={i === 0 ? '#8b5cf6' : '#2a2d42'}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.15 }}
            />
          ))}
        </>
      )}
      {step >= 3 && (
        <>
          <line x1={180} y1={115} x2={250} y2={115} stroke="#34d399" strokeWidth={2} />
          <rect x={100} y={150} width={200} height={50} rx={8} fill="#1a1d2e" stroke="#34d399" />
          <text x={200} y={175} textAnchor="middle" fill="#34d399" fontSize={9}>Prompt + chunks + query</text>
        </>
      )}
      {step >= 4 && <Token label="Answer" x={170} y={210} active color="#34d399" />}
    </svg>
  )
}

export function DPOAnim({ step }: AnimProps) {
  return (
    <svg viewBox="0 0 360 200" className="w-full max-w-lg">
      <SvgDefs />
      <rect x={40} y={50} width={120} height={50} rx={8} fill="#1a1d2e" stroke={step >= 1 ? '#34d399' : '#374151'} strokeWidth={2} />
      <text x={100} y={72} textAnchor="middle" fill="#34d399" fontSize={10}>Chosen ✓</text>
      <rect x={200} y={50} width={120} height={50} rx={8} fill="#1a1d2e" stroke={step >= 1 ? '#fb7185' : '#374151'} strokeWidth={2} />
      <text x={260} y={72} textAnchor="middle" fill="#fb7185" fontSize={10}>Rejected ✗</text>
      {step >= 2 && (
        <motion.text x={180} y={130} textAnchor="middle" fill="#fbbf24" fontSize={11} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          L_DPO pushes ↑P(chosen) vs P(rejected)
        </motion.text>
      )}
      {step >= 3 && <MatrixGrid rows={2} cols={2} x={145} y={140} glowCells={[[0, 0]]} label="policy shift" />}
      {step >= 4 && <text x={180} y={190} textAnchor="middle" fill="#a78bfa" fontSize={9}>No reward model needed</text>}
    </svg>
  )
}

export function PositionalEncodingAnim({ step }: AnimProps) {
  const waves = Array.from({ length: 8 })
  return (
    <svg viewBox="0 0 400 220" className="w-full max-w-xl">
      <SvgDefs />
      <Token label="embed" x={30} y={90} active={step >= 0} />
      {step >= 1 && <text x={120} y={85} fill="#fbbf24" fontSize={16}>+</text>}
      {step >= 1 &&
        waves.map((_, i) => (
          <motion.circle
            key={i}
            cx={160 + i * 28}
            cy={100 + Math.sin((i + step) * 0.8) * 25}
            r={6}
            fill="#22d3ee"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.05 }}
          />
        ))}
      {step >= 2 && <text x={260} y={70} fill="#9ca3af" fontSize={9}>PE(pos) sin/cos</text>}
      {step >= 3 && <Token label="X" x={320} y={90} active color="#8b5cf6" />}
      {step >= 4 && <text x={200} y={180} textAnchor="middle" fill="#34d399" fontSize={10}>Each position unique fingerprint</text>}
    </svg>
  )
}

export function ALiBiAnim({ step }: AnimProps) {
  const n = 4
  return (
    <svg viewBox="0 0 300 260" className="w-full max-w-md">
      <SvgDefs />
      {Array.from({ length: n * n }).map((_, idx) => {
        const r = Math.floor(idx / n)
        const c = idx % n
        const dist = Math.abs(r - c)
        const bias = -0.5 * dist
        const bright = step >= 2 && dist <= 1
        return (
          <motion.g key={idx}>
            <rect x={80 + c * 40} y={50 + r * 40} width={36} height={36} rx={4} fill={bright ? '#8b5cf6' : '#1a1d2e'} stroke="#374151" />
            {step >= 1 && (
              <text x={98 + c * 40} y={73 + r * 40} textAnchor="middle" fill={bright ? '#fff' : '#6b7280'} fontSize={8}>
                {bias.toFixed(1)}
              </text>
            )}
          </motion.g>
        )
      })}
      {step >= 3 && <text x={150} y={230} textAnchor="middle" fill="#34d399" fontSize={10}>Far tokens penalized</text>}
    </svg>
  )
}

export function CrossAttentionAnim({ step }: AnimProps) {
  return (
    <svg viewBox="0 0 400 240" className="w-full max-w-xl">
      <SvgDefs />
      <text x={100} y={25} textAnchor="middle" fill="#22d3ee" fontSize={9}>Encoder</text>
      {['K', 'V'].map((l, i) => (
        <rect key={l} x={60 + i * 70} y={40} width={60} height={30} rx={6} fill="#1a1d2e" stroke="#22d3ee" strokeWidth={step >= 1 ? 2 : 1} />
      ))}
      <text x={300} y={25} textAnchor="middle" fill="#8b5cf6" fontSize={9}>Decoder</text>
      <rect x={270} y={40} width={60} height={30} rx={6} fill="#1a1d2e" stroke="#8b5cf6" strokeWidth={step >= 1 ? 2 : 1} />
      <text x={300} y={60} textAnchor="middle" fill="#a78bfa" fontSize={9}>Q</text>
      {step >= 2 && (
        <>
          <line x1={300} y1={70} x2={130} y2={55} stroke="#fbbf24" strokeWidth={2} />
          <text x={200} y={100} textAnchor="middle" fill="#fbbf24" fontSize={10}>Q_dec × K_encᵀ</text>
        </>
      )}
      {step >= 3 && <MatrixGrid rows={2} cols={4} x={120} y={120} label="cross scores" glowCells={[[0, 1], [1, 2]]} />}
      {step >= 4 && <text x={200} y={220} textAnchor="middle" fill="#34d399" fontSize={10}>× V_enc → decoder context</text>}
    </svg>
  )
}

export function AutoregressiveAnim({ step }: AnimProps) {
  const seq = ['The', 'cat', 'sat', 'on']
  const visible = step + 1
  return (
    <svg viewBox="0 0 400 200" className="w-full max-w-xl">
      <SvgDefs />
      {seq.map((t, i) => (
        <motion.g key={t} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: i < visible ? 1 : 0.2, scale: 1 }}>
          <Token label={t} x={50 + i * 80} y={80} active={i < visible} color={i === visible - 1 ? '#fbbf24' : '#8b5cf6'} />
        </motion.g>
      ))}
      {step >= 1 && (
        <motion.text x={50 + visible * 80 - 40} y={130} textAnchor="middle" fill="#fbbf24" fontSize={10} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          predict →
        </motion.text>
      )}
      {step >= 3 && <text x={200} y={170} textAnchor="middle" fill="#34d399" fontSize={10}>{'P(t_i | t_1..t_{i-1})'}</text>}
    </svg>
  )
}

export function GradientDescentAnim({ step }: AnimProps) {
  const y = step >= 3 ? 60 : 120 - step * 20
  return (
    <svg viewBox="0 0 360 200" className="w-full max-w-lg">
      <SvgDefs />
      <path d="M 40 160 Q 180 20 320 160" fill="none" stroke="#374151" strokeWidth={2} />
      <text x={180} y={15} textAnchor="middle" fill="#9ca3af" fontSize={9}>Loss landscape</text>
      <motion.circle cx={80 + step * 50} cy={y} r={12} fill="#8b5cf6" animate={{ cx: 80 + step * 50, cy: y }} transition={{ type: 'spring' }} />
      {step >= 1 && <line x1={80 + step * 50} y1={y} x2={80 + step * 50 + 30} y2={y + 20} stroke="#fb7185" strokeWidth={2} />}
      {step >= 2 && <text x={80 + step * 50 + 35} y={y + 25} fill="#fb7185" fontSize={9}>∇L</text>}
      {step >= 4 && <text x={180} y={190} textAnchor="middle" fill="#34d399" fontSize={10}>θ -= η · ∇L</text>}
    </svg>
  )
}

export function AdamAnim({ step }: AnimProps) {
  return (
    <svg viewBox="0 0 360 200" className="w-full max-w-lg">
      <SvgDefs />
      {['g', 'm', 'v', 'θ'].map((l, i) => (
        <motion.rect
          key={l}
          x={50 + i * 75}
          y={70}
          width={55}
          height={40}
          rx={6}
          fill="#1a1d2e"
          stroke={step >= i ? '#8b5cf6' : '#374151'}
          strokeWidth={2}
          animate={step === i ? { filter: 'drop-shadow(0 0 8px #8b5cf6)' } : {}}
        />
      ))}
      {['g', 'm', 'v', 'θ'].map((l, i) => (
        <text key={`t-${l}`} x={77 + i * 75} y={95} textAnchor="middle" fill="#e8eaf6" fontSize={11}>{l}</text>
      ))}
      {step >= 4 && <text x={180} y={150} textAnchor="middle" fill="#34d399" fontSize={10}>Adaptive per-parameter LR</text>}
    </svg>
  )
}

export function PrefixCacheAnim({ step }: AnimProps) {
  const blocks = 6
  return (
    <svg viewBox="0 0 400 220" className="w-full max-w-xl">
      <SvgDefs />
      <text x={120} y={25} textAnchor="middle" fill="#a78bfa" fontSize={9}>Prefix (cached)</text>
      {Array.from({ length: blocks }).map((_, i) => (
        <rect
          key={i}
          x={40 + i * 28}
          y={40}
          width={24}
          height={50}
          rx={3}
          fill={step >= 1 ? '#8b5cf6' : '#2a2d42'}
          opacity={i < 4 ? 1 : 0.3}
        />
      ))}
      {step >= 2 && <text x={120} y={110} textAnchor="middle" fill="#22d3ee" fontSize={9}>Cache HIT ✓</text>}
      <text x={300} y={25} textAnchor="middle" fill="#fbbf24" fontSize={9}>New suffix</text>
      {step >= 3 && [0, 1].map((i) => <Token key={i} label={`T${i}`} x={260 + i * 60} y={40} active color="#fbbf24" />)}
      {step >= 4 && <text x={200} y={180} textAnchor="middle" fill="#34d399" fontSize={10}>Skip prefill for shared system prompt</text>}
    </svg>
  )
}

export function TensorParallelAnim({ step }: AnimProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full max-w-xl">
      <SvgDefs />
      {['GPU 0', 'GPU 1'].map((g, gi) => (
        <g key={g}>
          <rect x={60 + gi * 180} y={40} width={120} height={100} rx={8} fill="#12141f" stroke="#8b5cf6" />
          <text x={120 + gi * 180} y={60} textAnchor="middle" fill="#a78bfa" fontSize={9}>{g}</text>
          <MatrixGrid rows={2} cols={2} x={85 + gi * 180} y={70} glowCells={step >= 1 ? [[0, gi]] : []} label="W slice" />
        </g>
      ))}
      {step >= 2 && (
        <>
          <line x1={180} y1={90} x2={240} y2={90} stroke="#22d3ee" strokeWidth={2} />
          <text x={210} y={85} textAnchor="middle" fill="#22d3ee" fontSize={8}>all-reduce</text>
        </>
      )}
      {step >= 4 && <text x={200} y={175} textAnchor="middle" fill="#34d399" fontSize={10}>Split weights across GPUs</text>}
    </svg>
  )
}

export function BeamSearchAnim({ step }: AnimProps) {
  const beams = step >= 2 ? 3 : step >= 1 ? 2 : 1
  return (
    <svg viewBox="0 0 360 220" className="w-full max-w-lg">
      <SvgDefs />
      <circle cx={180} cy={30} r={14} fill="#8b5cf6" />
      {Array.from({ length: beams }).map((_, i) => (
        <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <line x1={180} y1={44} x2={80 + i * 100} y2={90} stroke="#374151" strokeWidth={2} />
          <circle cx={80 + i * 100} cy={100} r={10} fill={i === 0 && step >= 3 ? '#34d399' : '#22d3ee'} />
        </motion.g>
      ))}
      {step >= 4 && <text x={180} y={180} textAnchor="middle" fill="#34d399" fontSize={10}>Keep top-B hypotheses</text>}
    </svg>
  )
}

export function ModernLLMAnim({ step }: AnimProps) {
  const models = [
    { name: 'GPT-4', color: '#34d399' },
    { name: 'Llama 3', color: '#8b5cf6' },
    { name: 'DeepSeek', color: '#22d3ee' },
    { name: 'Claude', color: '#fbbf24' },
  ]
  return (
    <svg viewBox="0 0 400 220" className="w-full max-w-xl">
      <SvgDefs />
      <rect x={150} y={20} width={100} height={36} rx={8} fill="#1a1d2e" stroke="#8b5cf6" strokeWidth={2} />
      <text x={200} y={43} textAnchor="middle" fill="#e8eaf6" fontSize={10}>Decoder-Only</text>
      {models.map((m, i) => (
        <motion.g key={m.name} initial={{ opacity: 0 }} animate={{ opacity: step >= i ? 1 : 0.3 }}>
          <line x1={200} y1={56} x2={60 + i * 95} y2={100} stroke="#374151" />
          <rect x={20 + i * 95} y={100} width={80} height={40} rx={6} fill="#1a1d2e" stroke={m.color} strokeWidth={2} />
          <text x={60 + i * 95} y={125} textAnchor="middle" fill={m.color} fontSize={8}>{m.name}</text>
        </motion.g>
      ))}
      {step >= 4 && <text x={200} y={180} textAnchor="middle" fill="#9ca3af" fontSize={9}>RoPE + GQA + SwiGLU + Alignment</text>}
    </svg>
  )
}
