import { motion } from 'framer-motion'
import { COURSE_SENTENCE, TOKEN_IDS, TOKENS } from '../../../data/course-example'
import { SvgDefs } from '../../animations/primitives'
import { MatrixValues } from '../MatrixValues'

type Props = { step: number }

export function TokenizationCompute({ step }: Props) {
  const words = COURSE_SENTENCE.split(' ')
  const activeWord = Math.min(step, words.length - 1)
  const showIds = step >= words.length
  const showTable = step >= words.length + 2

  return (
    <svg viewBox="0 0 520 300" className="w-full">
      <SvgDefs />
      <text x={260} y={22} textAnchor="middle" fill="#94a3b8" fontSize={11}>
        {step < words.length
          ? 'Tokenizer scans word by word'
          : showTable
            ? 'Token ID travels to embedding row'
            : 'Each word → Token ID'}
      </text>

      <text x={260} y={50} textAnchor="middle" fill="#e2e8f0" fontSize={14} fontFamily="Georgia, serif">
        &quot;{COURSE_SENTENCE}&quot;
      </text>

      {words.map((w: string, i: number) => (
        <motion.g key={w}>
          <motion.rect
            x={60 + i * 100}
            y={70}
            width={80}
            height={36}
            rx={8}
            fill={i <= activeWord ? '#312e81' : '#12141f'}
            stroke={i === activeWord ? '#fbbf24' : '#374151'}
            strokeWidth={i === activeWord ? 2.5 : 1}
            animate={i === activeWord ? { filter: 'drop-shadow(0 0 8px #fbbf24)' } : {}}
          />
          <text x={100 + i * 100} y={93} textAnchor="middle" fill="#fff" fontSize={12} fontWeight={600}>
            {w}
          </text>
          {showIds && (
            <motion.g initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <text x={100 + i * 100} y={130} textAnchor="middle" fill="#22d3ee" fontSize={11}>
                → {TOKENS[i]}
              </text>
              <text x={100 + i * 100} y={152} textAnchor="middle" fill="#fbbf24" fontSize={12} fontWeight={700}>
                ID {TOKEN_IDS[i]}
              </text>
            </motion.g>
          )}
        </motion.g>
      ))}

      {showTable && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <text x={260} y={185} textAnchor="middle" fill="#a78bfa" fontSize={10}>
            Embedding lookup table (vocabulary)
          </text>
          <MatrixValues
            matrix={[
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
              [0.9, 0.1],
              [0, 0],
              [0.5, 0.5],
              [0, 0],
              [0, 0],
              [0, 0],
              [0.2, 0.8],
            ]}
            label="E (vocab × D) — row 10 highlighted"
            x={180}
            y={195}
            cellSize={22}
            highlightRow={10}
            filledCells={new Set(['10,0', '10,1', '8,0', '8,1', '21,0', '21,1'])}
          />
          <motion.circle
            cx={100 + activeWord * 100}
            cy={152}
            r={6}
            fill="#fbbf24"
            animate={{ cy: [152, 220], opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <text x={260} y={290} textAnchor="middle" fill="#34d399" fontSize={10}>
            &quot;{TOKENS[activeWord % 4]}&quot; (ID {TOKEN_IDS[activeWord % 4]}) → row {TOKEN_IDS[activeWord % 4]} in E
          </text>
        </motion.g>
      )}
    </svg>
  )
}
