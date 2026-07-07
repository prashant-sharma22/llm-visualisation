import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line, Plane, Text } from '@react-three/drei'
import type { Mesh } from 'three'
import { SceneCanvas } from './SceneCanvas'

const POINTS: [number, number, number, string, string][] = [
  [-1.8, 0.2, -0.5, 'p1', '[0.2, 0.8]'],
  [1.6, 0.5, 0.8, 'p2', '[0.9, 0.1]'],
  [0.3, -0.3, 1.2, 'p3', '[0.5, 0.5]'],
  [-0.5, 0.8, -1.0, 'p4', '[0.1, 0.9]'],
]

const QUERY: [number, number, number] = [0.55, 0.45, 0.2]

function DataPoint({
  position,
  label,
  coords,
  color,
  active,
}: {
  position: [number, number, number]
  label: string
  coords?: string
  color: string
  active?: boolean
}) {
  const ref = useRef<Mesh>(null)
  useFrame((state) => {
    if (!ref.current || !active) return
    ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.12)
  })
  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 1.1 : 0.4} />
      </mesh>
      <Text position={[0, 0.35, 0]} fontSize={0.18} color="#e2e8f0" anchorX="center">
        {label}
      </Text>
      {coords && (
        <Text position={[0, 0.12, 0]} fontSize={0.11} color="#94a3b8" anchorX="center">
          {coords}
        </Text>
      )}
    </group>
  )
}

export function Annoy3DScene({ step }: { step: number }) {
  const leftSet = useMemo(() => new Set([0, 3]), [])

  const hyperplaneVisible = step >= 1
  const treesVisible = step >= 3
  const queryVisible = step >= 4

  return (
    <SceneCanvas camera={[0, 2, 7]} autoRotate={step < 2}>
      <Text position={[0, 2.8, 0]} fontSize={0.28} color="#22d3ee" anchorX="center">
        {step === 0 && 'Embedding vectors in R^d'}
        {step === 1 && 'Random pair -> hyperplane split'}
        {step === 2 && 'Recursive left / right subtrees'}
        {step === 3 && 'Forest: M independent trees'}
        {step === 4 && 'Query -> merge candidates -> best NN'}
      </Text>

      {POINTS.map(([x, y, z, label, coords], i) => {
        const side = leftSet.has(i) ? 'left' : 'right'
        const showSplit = step >= 2
        const color =
          queryVisible && i === 2
            ? '#fbbf24'
            : showSplit
              ? side === 'left'
                ? '#8b5cf6'
                : '#34d399'
              : '#6366f1'
        return (
          <DataPoint
            key={label}
            position={[x, y, z]}
            label={label}
            coords={coords}
            color={color}
            active={queryVisible && i === 2}
          />
        )
      })}

      {hyperplaneVisible && (
        <Plane args={[5, 4]} rotation={[-0.3, 0.4, 0.15]} position={[0, 0.2, 0]}>
          <meshStandardMaterial color="#f472b6" transparent opacity={0.18} side={2} />
        </Plane>
      )}

      {step >= 1 && (
        <>
          <Line points={[POINTS[0].slice(0, 3) as [number, number, number], POINTS[3].slice(0, 3) as [number, number, number]]} color="#f472b6" lineWidth={2} />
          <Text position={[0, 1.2, 0]} fontSize={0.16} color="#f9a8d4" anchorX="center">
            hyperplane perp (p1 - p4)
          </Text>
        </>
      )}

      {treesVisible &&
        [0, 1, 2].map((ti) => (
          <group key={ti} position={[(ti - 1) * 2.4, -1.6, 0]}>
            <Text position={[0, 0.9, 0]} fontSize={0.14} color="#94a3b8" anchorX="center">
              Tree {ti + 1}
            </Text>
            <Line points={[[0, 0.5, 0], [-0.4, -0.2, 0]]} color="#64748b" />
            <Line points={[[0, 0.5, 0], [0.4, -0.2, 0]]} color="#64748b" />
            <mesh position={[0, 0.5, 0]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial color="#475569" />
            </mesh>
          </group>
        ))}

      {queryVisible && (
        <>
          <DataPoint position={QUERY} label="q" coords="[0.55, 0.45]" color="#fbbf24" active />
          {POINTS.map(([x, y, z], i) => (
            <Line
              key={i}
              points={[QUERY, [x, y, z]]}
              color={i === 2 ? '#fbbf24' : '#334155'}
              lineWidth={i === 2 ? 2 : 0.8}
              transparent
              opacity={i === 2 ? 0.9 : 0.25}
            />
          ))}
          <Text position={[0, -2.3, 0]} fontSize={0.2} color="#fbbf24" anchorX="center">
            cos(q, p3) = 0.97 — best match
          </Text>
        </>
      )}
    </SceneCanvas>
  )
}
