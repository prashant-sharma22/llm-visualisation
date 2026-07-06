import { motion } from 'framer-motion'
import { SvgDefs } from './primitives'

type AnimProps = { step: number }

export function RLHFAnim({ step }: AnimProps) {
  const stages = ['SFT', 'Reward Model', 'RL (PPO)']
  return (
    <svg viewBox="0 0 420 260" className="w-full max-w-xl">
      <SvgDefs />
      {stages.map((s, i) => (
        <motion.g key={s}>
          <rect
            x={40 + i * 120}
            y={60}
            width={100}
            height={50}
            rx={8}
            fill={step >= i ? '#1a1d2e' : '#12141f'}
            stroke={step >= i ? '#8b5cf6' : '#374151'}
            strokeWidth={step === i ? 3 : 1}
          />
          <text x={90 + i * 120} y={90} textAnchor="middle" fill={step >= i ? '#a78bfa' : '#6b7280'} fontSize={10} fontWeight={600}>
            {s}
          </text>
          {i < 2 && step > i && (
            <motion.line x1={140 + i * 120} y1={85} x2={160 + i * 120} y2={85} stroke="#22d3ee" strokeWidth={2} markerEnd="url(#arrow)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
          )}
        </motion.g>
      ))}
      {step >= 3 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <text x={210} y={150} textAnchor="middle" fill="#fbbf24" fontSize={11}>
            + Reasoning traces (CoT)
          </text>
          {['think', 'step', 'answer'].map((t, i) => (
            <rect key={t} x={130 + i * 55} y={165} width={48} height={24} rx={4} fill="#1a1d2e" stroke="#fbbf24" />
          ))}
        </motion.g>
      )}
      {step >= 4 && (
        <motion.text x={210} y={230} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={600} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          o1 / R1 — more thinking = better answers
        </motion.text>
      )}
    </svg>
  )
}

export function ChainOfThoughtAnim({ step }: AnimProps) {
  const steps = ['Problem', 'Step 1', 'Step 2', 'Answer']
  return (
    <svg viewBox="0 0 400 200" className="w-full max-w-lg">
      <SvgDefs />
      {steps.map((s, i) => (
        <motion.g key={s}>
          <motion.rect
            x={30 + i * 90}
            y={80}
            width={75}
            height={40}
            rx={8}
            fill="#1a1d2e"
            stroke={step >= i ? '#8b5cf6' : '#374151'}
            strokeWidth={step === i ? 3 : 1}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: step >= i ? 1 : 0.3, y: 0 }}
            transition={{ delay: i * 0.2 }}
          />
          <text x={67 + i * 90} y={105} textAnchor="middle" fill={step >= i ? '#e8eaf6' : '#6b7280'} fontSize={9} fontWeight={600}>
            {s}
          </text>
          {i < 3 && step > i && (
            <line x1={105 + i * 90} y1={100} x2={120 + i * 90} y2={100} stroke="#22d3ee" strokeWidth={2} />
          )}
        </motion.g>
      ))}
      {step >= 0 && (
        <text x={200} y={50} textAnchor="middle" fill="#fbbf24" fontSize={10}>
          "Let's think step by step"
        </text>
      )}
      {step >= 4 && (
        <motion.text x={200} y={160} textAnchor="middle" fill="#34d399" fontSize={11} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Decompose → solve → synthesize
        </motion.text>
      )}
    </svg>
  )
}

export function ToolUsageAnim({ step }: AnimProps) {
  return (
    <svg viewBox="0 0 400 240" className="w-full max-w-lg">
      <SvgDefs />
      <circle cx={80} cy={120} r={35} fill="#1a1d2e" stroke="#8b5cf6" strokeWidth={2} />
      <text x={80} y={125} textAnchor="middle" fill="#a78bfa" fontSize={10} fontWeight={600}>
        LLM
      </text>
      {step >= 1 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <line x1={115} y1={120} x2={180} y2={80} stroke="#22d3ee" strokeWidth={2} />
          <rect x={180} y={55} width={80} height={40} rx={6} fill="#1a1d2e" stroke="#22d3ee" />
          <text x={220} y={80} textAnchor="middle" fill="#22d3ee" fontSize={9}>
            calc()
          </text>
        </motion.g>
      )}
      {step >= 2 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <line x1={260} y1={80} x2={300} y2={120} stroke="#34d399" strokeWidth={2} />
          <text x={280} y={105} fill="#34d399" fontSize={9}>
            5875
          </text>
        </motion.g>
      )}
      {step >= 3 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <line x1={115} y1={120} x2={180} y2={160} stroke="#fbbf24" strokeWidth={2} />
          <rect x={180} y={145} width={80} height={40} rx={6} fill="#1a1d2e" stroke="#fbbf24" />
          <text x={220} y={170} textAnchor="middle" fill="#fbbf24" fontSize={9}>
            search()
          </text>
        </motion.g>
      )}
      {step >= 4 && (
        <motion.text x={200} y={220} textAnchor="middle" fill="#e8eaf6" fontSize={11} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          ReAct: Thought → Action → Observation
        </motion.text>
      )}
    </svg>
  )
}

export function TreeOfThoughtAnim({ step }: AnimProps) {
  return (
    <svg viewBox="0 0 400 260" className="w-full max-w-lg">
      <SvgDefs />
      <circle cx={200} cy={40} r={20} fill="#8b5cf6" />
      <text x={200} y={45} textAnchor="middle" fill="#fff" fontSize={9}>
        Root
      </text>
      {step >= 1 &&
        [120, 200, 280].map((x, i) => (
          <motion.g key={x} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.15 }}>
            <line x1={200} y1={60} x2={x} y2={100} stroke="#374151" strokeWidth={2} />
            <circle cx={x} cy={110} r={16} fill={step >= 2 && i === 1 ? '#34d399' : '#1a1d2e'} stroke={step >= 2 && i === 1 ? '#34d399' : '#8b5cf6'} strokeWidth={2} />
          </motion.g>
        ))}
      {step >= 2 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <line x1={200} y1={126} x2={200} y2={170} stroke="#34d399" strokeWidth={3} />
          <circle cx={200} cy={185} r={16} fill="#34d399" />
          <text x={200} y={190} textAnchor="middle" fill="#fff" fontSize={8}>
            best
          </text>
        </motion.g>
      )}
      {step >= 3 && (
        <motion.text x={320} y={110} fill="#fb7185" fontSize={9} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          pruned ✗
        </motion.text>
      )}
      {step >= 4 && (
        <motion.text x={200} y={240} textAnchor="middle" fill="#a78bfa" fontSize={11} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Explore → evaluate → search best path
        </motion.text>
      )}
    </svg>
  )
}

export function ContextEngineeringAnim({ step }: AnimProps) {
  const blocks = [
    { label: 'System', color: '#8b5cf6' },
    { label: 'Examples', color: '#22d3ee' },
    { label: 'RAG docs', color: '#34d399' },
    { label: 'History', color: '#fbbf24' },
    { label: 'Tools', color: '#fb7185' },
  ]
  return (
    <svg viewBox="0 0 300 320" className="w-full max-w-sm">
      <SvgDefs />
      <rect x={60} y={20} width={180} height={260} rx={10} fill="#12141f" stroke="#374151" strokeWidth={2} />
      <text x={150} y={15} textAnchor="middle" fill="#9ca3af" fontSize={10}>
        Context Window
      </text>
      {blocks.map((b, i) => (
        <motion.rect
          key={b.label}
          x={75}
          y={35 + i * 48}
          width={150}
          height={38}
          rx={6}
          fill="#1a1d2e"
          stroke={b.color}
          strokeWidth={step >= i ? 2 : 1}
          opacity={step >= i ? 1 : 0.3}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: step >= i ? 1 : 0.3 }}
          transition={{ delay: i * 0.15 }}
        />
      ))}
      {blocks.map((b, i) => (
        <text key={`t-${b.label}`} x={150} y={58 + i * 48} textAnchor="middle" fill={b.color} fontSize={10} fontWeight={600} opacity={step >= i ? 1 : 0.3}>
          {b.label}
        </text>
      ))}
      {step >= 4 && (
        <motion.text x={150} y={300} textAnchor="middle" fill="#34d399" fontSize={10} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Strategic ordering matters
        </motion.text>
      )}
    </svg>
  )
}

export function AIAgentsAnim({ step }: AnimProps) {
  const loop = ['Goal', 'Plan', 'Act', 'Observe']
  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-sm">
      <SvgDefs />
      <circle cx={150} cy={150} r={100} fill="none" stroke="#374151" strokeWidth={1} strokeDasharray="4" />
      {loop.map((l, i) => {
        const angle = (i / loop.length) * Math.PI * 2 - Math.PI / 2
        const x = 150 + Math.cos(angle) * 85
        const y = 150 + Math.sin(angle) * 85
        return (
          <motion.g key={l}>
            <circle cx={x} cy={y} r={28} fill={step >= i ? '#1a1d2e' : '#12141f'} stroke={step >= i ? '#8b5cf6' : '#374151'} strokeWidth={step === i ? 3 : 1} />
            <text x={x} y={y + 4} textAnchor="middle" fill={step >= i ? '#a78bfa' : '#6b7280'} fontSize={9} fontWeight={600}>
              {l}
            </text>
          </motion.g>
        )
      })}
      <circle cx={150} cy={150} r={25} fill="#8b5cf6" opacity={0.3} />
      <text x={150} y={155} textAnchor="middle" fill="#fff" fontSize={10} fontWeight={700}>
        Agent
      </text>
      {step >= 4 && (
        <motion.text x={150} y={280} textAnchor="middle" fill="#34d399" fontSize={10} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Loop until goal complete
        </motion.text>
      )}
    </svg>
  )
}

export function MCPAnim({ step }: AnimProps) {
  return (
    <svg viewBox="0 0 400 240" className="w-full max-w-xl">
      <SvgDefs />
      <rect x={30} y={80} width={100} height={60} rx={10} fill="#1a1d2e" stroke="#8b5cf6" strokeWidth={2} />
      <text x={80} y={105} textAnchor="middle" fill="#a78bfa" fontSize={10} fontWeight={600}>
        MCP Client
      </text>
      <text x={80} y={122} textAnchor="middle" fill="#9ca3af" fontSize={8}>
        Cursor / Claude
      </text>
      {step >= 1 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <rect x={170} y={95} width={60} height={30} rx={6} fill="#1a1d2e" stroke="#22d3ee" />
          <text x={200} y={115} textAnchor="middle" fill="#22d3ee" fontSize={9}>
            MCP
          </text>
          <line x1={130} y1={110} x2={170} y2={110} stroke="#22d3ee" strokeWidth={2} />
        </motion.g>
      )}
      {['GitHub', 'Jira', 'DB'].map((s, i) => (
        <motion.g key={s}>
          <rect x={270} y={50 + i * 55} width={90} height={40} rx={8} fill="#1a1d2e" stroke={step >= 2 ? '#34d399' : '#374151'} strokeWidth={step >= 2 ? 2 : 1} opacity={step >= 2 ? 1 : 0.4} />
          <text x={315} y={75 + i * 55} textAnchor="middle" fill="#34d399" fontSize={9}>
            {s} MCP
          </text>
          {step >= 2 && <line x1={230} y1={110} x2={270} y2={70 + i * 55} stroke="#374151" strokeWidth={1} />}
        </motion.g>
      ))}
      {step >= 3 && (
        <motion.text x={200} y={200} textAnchor="middle" fill="#fbbf24" fontSize={10} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Resources · Tools · Prompts
        </motion.text>
      )}
      {step >= 4 && (
        <motion.text x={200} y={225} textAnchor="middle" fill="#a78bfa" fontSize={10} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          USB-C for AI integrations
        </motion.text>
      )}
    </svg>
  )
}
