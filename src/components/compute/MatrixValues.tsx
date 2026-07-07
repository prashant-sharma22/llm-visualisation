import { motion } from 'framer-motion'

interface MatrixValuesProps {
  matrix: number[][]
  label: string
  x?: number
  y?: number
  cellSize?: number
  highlightRow?: number
  highlightCol?: number
  highlightCell?: [number, number]
  filledCells?: Set<string>
  dimEmpty?: boolean
}

export function MatrixValues({
  matrix,
  label,
  x = 0,
  y = 0,
  cellSize = 40,
  highlightRow,
  highlightCol,
  highlightCell,
  filledCells,
  dimEmpty = false,
}: MatrixValuesProps) {
  const rows = matrix.length
  const cols = matrix[0]?.length ?? 0
  const gap = 4

  return (
    <g>
      <text x={x + (cols * (cellSize + gap)) / 2} y={y - 10} textAnchor="middle" fill="#c4b5fd" fontSize={11} fontWeight={600}>
        {label}
      </text>
      {matrix.map((row, r) =>
        row.map((val, c) => {
          const key = `${r},${c}`
          const isFilled = filledCells ? filledCells.has(key) : true
          const isCell = highlightCell?.[0] === r && highlightCell?.[1] === c
          const isRow = highlightRow === r
          const isCol = highlightCol === c
          const highlight = isCell || isRow || isCol
          const showVal = isFilled && val !== 0
          return (
            <motion.g key={key}>
              <rect
                x={x + c * (cellSize + gap)}
                y={y + r * (cellSize + gap)}
                width={cellSize}
                height={cellSize}
                rx={5}
                fill={
                  isCell ? '#fbbf24' : highlight ? '#312e81' : isFilled ? '#12141f' : '#0a0c14'
                }
                stroke={isCell ? '#fcd34d' : highlight ? '#8b5cf6' : '#374151'}
                strokeWidth={highlight || isCell ? 2.5 : 1}
                opacity={dimEmpty && !isFilled ? 0.35 : 1}
              />
              {showVal && (
                <text
                  x={x + c * (cellSize + gap) + cellSize / 2}
                  y={y + r * (cellSize + gap) + cellSize / 2 + 4}
                  textAnchor="middle"
                  fill={isCell ? '#1c1917' : '#e2e8f0'}
                  fontSize={10}
                  fontFamily="ui-monospace, monospace"
                  fontWeight={isCell ? 700 : 400}
                >
                  {val.toFixed(2)}
                </text>
              )}
              {!showVal && isFilled && val === 0 && (
                <text
                  x={x + c * (cellSize + gap) + cellSize / 2}
                  y={y + r * (cellSize + gap) + cellSize / 2 + 4}
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize={10}
                  fontFamily="ui-monospace, monospace"
                >
                  0
                </text>
              )}
            </motion.g>
          )
        })
      )}
      <text x={x + (cols * (cellSize + gap)) / 2} y={y + rows * (cellSize + gap) + 14} textAnchor="middle" fill="#64748b" fontSize={9}>
        {rows}×{cols}
      </text>
    </g>
  )
}

export function MultiplySign({ x, y, active }: { x: number; y: number; active?: boolean }) {
  return (
    <motion.text
      x={x}
      y={y}
      textAnchor="middle"
      fill={active ? '#fbbf24' : '#94a3b8'}
      fontSize={22}
      fontWeight={700}
      animate={active ? { scale: [1, 1.15, 1] } : {}}
      transition={{ repeat: active ? Infinity : 0, duration: 1.2 }}
    >
      ×
    </motion.text>
  )
}

export function ArrowDown({ x, y, label }: { x: number; y: number; label?: string }) {
  return (
    <g>
      <line x1={x} y1={y} x2={x} y2={y + 24} stroke="#22d3ee" strokeWidth={2} markerEnd="url(#arrow)" />
      {label && (
        <text x={x + 8} y={y + 14} fill="#22d3ee" fontSize={9}>
          {label}
        </text>
      )}
    </g>
  )
}

export function EquationBox({ x, y, lines, highlight }: { x: number; y: number; lines: string[]; highlight?: boolean }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={200}
        height={lines.length * 18 + 16}
        rx={8}
        fill={highlight ? '#1e1b4b' : '#0d1117'}
        stroke={highlight ? '#fbbf24' : '#334155'}
        strokeWidth={highlight ? 2 : 1}
      />
      {lines.map((line, i) => (
        <text key={i} x={x + 10} y={y + 20 + i * 18} fill={highlight ? '#fef3c7' : '#cbd5e1'} fontSize={10} fontFamily="ui-monospace, monospace">
          {line}
        </text>
      ))}
    </g>
  )
}
