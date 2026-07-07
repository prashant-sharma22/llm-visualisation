import { motion } from 'framer-motion'
import { Q, WQ, X, fmt } from '../../../data/course-example'
import { SvgDefs } from '../../animations/primitives'
import { EquationBox, MatrixValues, MultiplySign } from '../MatrixValues'

type Props = { step: number }

/** Cell-by-cell Q = X · Wq walkthrough */
export function QKVCompute({ step }: Props) {
  const phase = step
  const targetRow = 0
  const targetCol = phase >= 4 ? 1 : 0
  const showOneCell = phase >= 1 && phase <= 3
  const showFullQ = phase >= 4
  const showWK = phase >= 6
  const showWV = phase >= 8

  const a0 = X[targetRow][0]
  const a1 = X[targetRow][1]
  const term1 = a0 * (targetCol === 0 ? WQ[0][0] : WQ[0][1])
  const term2 = a1 * (targetCol === 0 ? WQ[1][0] : WQ[1][1])
  const result = Q[targetRow][targetCol]

  const filledQ = new Set<string>()
  if (showOneCell) filledQ.add(`${targetRow},${targetCol}`)
  if (showFullQ) {
    for (let r = 0; r < 4; r++) for (let c = 0; c < 2; c++) filledQ.add(`${r},${c}`)
  }

  return (
    <svg viewBox="0 0 560 340" className="w-full">
      <SvgDefs />
      <text x={280} y={18} textAnchor="middle" fill="#94a3b8" fontSize={11}>
        {phase < 4
          ? 'ONE cell at a time: Q = X · Wq'
          : phase < 6
            ? 'Fill all cells of Q — repeat for every (row, col)'
            : phase < 8
              ? 'Same process for K = X · Wk'
              : 'Same process for V = X · Wv'}
      </text>

      <MatrixValues matrix={X} label="X (N×D)" x={20} y={35} highlightRow={showOneCell ? targetRow : undefined} />
      <MultiplySign x={175} y={95} active={showOneCell} />
      <MatrixValues
        matrix={WQ}
        label="Wq (D×D)"
        x={210}
        y={35}
        highlightCol={showOneCell ? targetCol : undefined}
      />

      <text x={340} y={95} fill="#94a3b8" fontSize={18}>
        =
      </text>

      <MatrixValues
        matrix={showFullQ ? Q : Q.map((r: number[]) => r.map(() => 0))}
        label="Q"
        x={370}
        y={35}
        highlightCell={showOneCell ? [targetRow, targetCol] : undefined}
        filledCells={filledQ}
        dimEmpty
      />

      {showOneCell && (
        <EquationBox
          x={20}
          y={230}
          highlight
          lines={[
            `Q[${targetRow},${targetCol}] = row${targetRow} · col${targetCol}`,
            `${fmt(a0)}×${fmt(targetCol === 0 ? WQ[0][0] : WQ[0][1])} + ${fmt(a1)}×${fmt(targetCol === 0 ? WQ[1][0] : WQ[1][1])}`,
            `= ${fmt(term1)} + ${fmt(term2)} = ${fmt(result)}`,
          ]}
        />
      )}

      {showFullQ && !showWK && (
        <text x={280} y={320} textAnchor="middle" fill="#34d399" fontSize={10}>
          Q[0]=[{Q[0].map(fmt).join(', ')}] ... all {Q.length}×{Q[0].length} cells computed
        </text>
      )}

      {showWK && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <MatrixValues matrix={[[0.57, 0.16], [0.36, 0.58], [0.45, 0.4], [0.33, 0.64]]} label="K = X·Wk" x={80} y={230} cellSize={32} />
          {showWV && (
            <MatrixValues matrix={[[0.37, 0.26], [0.16, 0.68], [0.25, 0.5], [0.13, 0.74]]} label="V = X·Wv" x={300} y={230} cellSize={32} />
          )}
        </motion.g>
      )}
    </svg>
  )
}
