import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function MatrixGrid({
  rows,
  cols,
  activeCells = [],
  glowCells = [],
  label,
  x = 0,
  y = 0,
  cellSize = 28,
}: {
  rows: number
  cols: number
  activeCells?: [number, number][]
  glowCells?: [number, number][]
  label?: string
  x?: number
  y?: number
  cellSize?: number
}) {
  const activeSet = new Set(activeCells.map(([r, c]) => `${r},${c}`))
  const glowSet = new Set(glowCells.map(([r, c]) => `${r},${c}`))

  return (
    <g>
      {label && (
        <text x={x + (cols * cellSize) / 2} y={y - 8} textAnchor="middle" fill="#a78bfa" fontSize={10} fontWeight={600}>
          {label}
        </text>
      )}
      {Array.from({ length: rows * cols }).map((_, idx) => {
        const r = Math.floor(idx / cols)
        const c = idx % cols
        const key = `${r},${c}`
        const isGlow = glowSet.has(key)
        const isActive = activeSet.has(key) || isGlow
        return (
          <motion.rect
            key={key}
            x={x + c * (cellSize + 4)}
            y={y + r * (cellSize + 4)}
            width={cellSize}
            height={cellSize}
            rx={4}
            fill={isGlow ? '#8b5cf6' : isActive ? '#1e1b4b' : '#12141f'}
            stroke={isGlow ? '#c4b5fd' : isActive ? '#8b5cf6' : '#374151'}
            strokeWidth={isGlow ? 2.5 : 1}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: isGlow ? [1, 1.08, 1] : 1,
              opacity: 1,
              filter: isGlow ? 'drop-shadow(0 0 6px rgba(139,92,246,0.8))' : 'none',
            }}
            transition={isGlow ? { repeat: Infinity, duration: 1.2 } : { delay: idx * 0.02 }}
          />
        )
      })}
    </g>
  )
}

export function AnimatedSoftmax({
  values,
  x,
  y,
  step,
}: {
  values: number[]
  x: number
  y: number
  step: number
}) {
  const exps = values.map((v) => Math.exp(v))
  const sum = exps.reduce((a, b) => a + b, 0)
  const probs = exps.map((e) => e / sum)

  return (
    <g>
      <text x={x} y={y - 10} fill="#9ca3af" fontSize={10}>
        Softmax (exp → normalize)
      </text>
      {values.map((v, i) => (
        <motion.g key={i}>
          <rect x={x + i * 70} y={y} width={60} height={24} rx={4} fill="#1a1d2e" stroke="#374151" />
          <text x={x + 30 + i * 70} y={y + 16} textAnchor="middle" fill="#9ca3af" fontSize={9}>
            {step >= 1 ? exps[i].toFixed(1) : v.toFixed(1)}
          </text>
          {step >= 2 && (
            <motion.rect
              x={x + i * 70}
              y={y + 90 - probs[i] * 50}
              width={60}
              height={probs[i] * 50}
              fill="#22d3ee"
              opacity={0.7}
              rx={3}
              initial={{ height: 0 }}
              animate={{ height: probs[i] * 50 }}
              transition={{ delay: i * 0.1 }}
            />
          )}
          {step >= 2 && (
            <text x={x + 30 + i * 70} y={y + 95} textAnchor="middle" fill="#22d3ee" fontSize={8}>
              {(probs[i] * 100).toFixed(0)}%
            </text>
          )}
        </motion.g>
      ))}
    </g>
  )
}

export function MatMulPulse({ x, y, active }: { x: number; y: number; active: boolean }) {
  return (
    <motion.g
      animate={active ? { scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] } : {}}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      <text x={x} y={y} textAnchor="middle" fill="#fbbf24" fontSize={14} fontWeight={700}>
        ×
      </text>
    </motion.g>
  )
}

export function Token({
  label,
  x,
  y,
  active = false,
  color = '#8b5cf6',
  delay = 0,
}: {
  label: string
  x: number
  y: number
  active?: boolean
  color?: string
  delay?: number
}) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200 }}
    >
      <motion.rect
        x={x}
        y={y}
        width={56}
        height={32}
        rx={8}
        fill={active ? color : '#1a1d2e'}
        stroke={active ? color : '#2a2d42'}
        strokeWidth={2}
        animate={active ? { filter: `drop-shadow(0 0 8px ${color})` } : {}}
      />
      <text
        x={x + 28}
        y={y + 20}
        textAnchor="middle"
        fill={active ? '#fff' : '#9ca3af'}
        fontSize={11}
        fontWeight={600}
        fontFamily="Inter, sans-serif"
      >
        {label}
      </text>
    </motion.g>
  )
}

export function FlowArrow({
  x1,
  y1,
  x2,
  y2,
  active = false,
  delay = 0,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  active?: boolean
  delay?: number
}) {
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={active ? '#22d3ee' : '#374151'}
      strokeWidth={2}
      markerEnd="url(#arrow)"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ delay, duration: 0.6 }}
    />
  )
}

export function SvgDefs() {
  return (
    <defs>
      <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6" fill="#22d3ee" />
      </marker>
      <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#22d3ee" />
      </linearGradient>
    </defs>
  )
}

export function StepLabel({ children, step }: { children: ReactNode; step: number }) {
  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute left-4 top-4 rounded-lg bg-violet-600/20 px-3 py-1 text-xs font-medium text-violet-300 backdrop-blur"
    >
      {children}
    </motion.div>
  )
}
