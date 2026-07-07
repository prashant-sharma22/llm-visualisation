import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import type { Group } from 'three'
import { cellValue, valueColor } from './matrix-utils'

interface MatrixPlane3DProps {
  rows: number
  cols: number
  position: [number, number, number]
  rotation: [number, number, number]
  label: string
  seed?: number
  values?: (number | string)[][]
  showValues?: boolean
  highlightRow?: number
  highlightCol?: number
  glowCells?: [number, number][]
  opacity?: number
  cellScale?: number
  pulse?: boolean
}

export function MatrixPlane3D({
  rows,
  cols,
  position,
  rotation,
  label,
  seed = 0,
  values,
  showValues = false,
  highlightRow,
  highlightCol,
  glowCells = [],
  opacity = 1,
  cellScale = 0.32,
  pulse = false,
}: MatrixPlane3DProps) {
  const group = useRef<Group>(null)
  const glowSet = useMemo(() => new Set(glowCells.map(([r, c]) => `${r},${c}`)), [glowCells])

  useFrame((state) => {
    if (!group.current || !pulse) return
    group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.04
  })

  const gap = 0.08
  const h = rows * (cellScale + gap)

  return (
    <group ref={group} position={position} rotation={rotation}>
      <Text position={[0, h / 2 + 0.45, 0]} fontSize={0.28} color="#c4b5fd" anchorX="center">
        {label}
      </Text>
      {Array.from({ length: rows * cols }).map((_, idx) => {
        const r = Math.floor(idx / cols)
        const c = idx % cols
        const rawVal = values?.[r]?.[c]
        const v = typeof rawVal === 'number' ? rawVal : cellValue(r, c, seed)
        const isGlow = glowSet.has(`${r},${c}`)
        const isRow = highlightRow === r
        const isCol = highlightCol === c
        const highlight = isGlow || isRow || isCol
        const x = (c - (cols - 1) / 2) * (cellScale + gap)
        const y = ((rows - 1) / 2 - r) * (cellScale + gap)
        const display =
          showValues && rawVal !== undefined
            ? typeof rawVal === 'number'
              ? rawVal.toFixed(2)
              : String(rawVal)
            : null
        return (
          <group key={idx} position={[x, y, 0]}>
            <mesh>
              <boxGeometry args={[cellScale, cellScale, cellScale * 0.35]} />
              <meshStandardMaterial
                color={valueColor(v, highlight)}
                emissive={highlight ? '#fbbf24' : valueColor(v)}
                emissiveIntensity={highlight ? 0.85 : 0.25}
                transparent
                opacity={opacity}
                metalness={0.3}
                roughness={0.4}
              />
            </mesh>
            {display && (
              <Text position={[0, 0, cellScale * 0.22]} fontSize={cellScale * 0.38} color="#f8fafc" anchorX="center" anchorY="middle">
                {display}
              </Text>
            )}
          </group>
        )
      })}
    </group>
  )
}
