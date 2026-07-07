import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line, Text } from '@react-three/drei'
import type { Mesh } from 'three'
import { SceneCanvas } from './SceneCanvas'

const LAYER_Y = [2.2, 0.8, -0.6]
const LAYER_LABELS = ['LAYER 2 (sparse)', 'LAYER 1', 'LAYER 0 (dense)']

function Node({
  position,
  color,
  scale = 1,
  active,
}: {
  position: [number, number, number]
  color: string
  scale?: number
  active?: boolean
}) {
  const ref = useRef<Mesh>(null)
  useFrame((state) => {
    if (!ref.current || !active) return
    ref.current.scale.setScalar(scale + Math.sin(state.clock.elapsedTime * 3) * 0.08)
  })
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[0.18, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 1.2 : 0.35} />
    </mesh>
  )
}

export function HNSW3DScene({ step }: { step: number }) {
  const layer2: [number, number, number][] = useMemo(
    () => [
      [-2, LAYER_Y[0], 0],
      [2.2, LAYER_Y[0], 0.5],
    ],
    []
  )
  const layer1: [number, number, number][] = useMemo(
    () => [
      [-2.5, LAYER_Y[1], 0],
      [-0.5, LAYER_Y[1], 0.8],
      [1.8, LAYER_Y[1], -0.3],
    ],
    []
  )
  const layer0: [number, number, number][] = useMemo(
    () => [
      [-3, LAYER_Y[2], 0],
      [-1.5, LAYER_Y[2], 0.6],
      [0, LAYER_Y[2], -0.2],
      [1.2, LAYER_Y[2], 0.4],
      [2.5, LAYER_Y[2], -0.5],
      [3.2, LAYER_Y[2], 0.2],
      [0.8, LAYER_Y[2], 1],
    ],
    []
  )

  const path: [number, number, number][] = useMemo(() => {
    if (step < 1) return []
    if (step === 1) return [layer2[0], layer2[1]]
    if (step === 2) return [layer2[0], layer2[1], layer1[1]]
    return [layer2[0], layer2[1], layer1[1], layer0[2], layer0[4]]
  }, [step, layer2, layer1, layer0])

  const similarity = step >= 4 ? 0.96 : step >= 3 ? 0.82 : 0.45

  return (
    <SceneCanvas camera={[0, 1.5, 9]} autoRotate={step < 2}>
      <Text position={[-3.8, 3, 0]} fontSize={0.22} color="#22d3ee" rotation={[0, 0.3, 0]}>
        HNSW GRAPH
      </Text>

      {LAYER_LABELS.map((label, li) => (
        <Text
          key={label}
          position={[-3.5, LAYER_Y[li], 0]}
          fontSize={0.16}
          color={step >= li ? '#94a3b8' : '#334155'}
          anchorX="left"
        >
          {label}
        </Text>
      ))}

      {layer2.map((p, i) => (
        <Node key={`l2-${i}`} position={p} color="#a855f7" active={step >= 1 && i <= 1} scale={1.2} />
      ))}
      {step >= 2 &&
        layer1.map((p, i) => (
          <Node key={`l1-${i}`} position={p} color="#22d3ee" active={step >= 2 && i === 1} />
        ))}
      {step >= 3 &&
        layer0.map((p, i) => (
          <Node
            key={`l0-${i}`}
            position={p}
            color={i === 4 && step >= 4 ? '#fbbf24' : '#34d399'}
            active={i === 4 && step >= 4}
          />
        ))}

      {step >= 1 && (
        <Node position={[-3.2, LAYER_Y[0] + 0.5, 1]} color="#f472b6" active scale={0.9} />
      )}
      {step >= 1 && (
        <Text position={[-3.2, LAYER_Y[0] + 0.9, 1]} fontSize={0.18} color="#f472b6">
          Q
        </Text>
      )}

      {path.length > 1 && (
        <Line points={path} color="#fbbf24" lineWidth={2.5} />
      )}

      {/* Similarity ring */}
      <mesh position={[3.5, 1.2, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[1.1, 0.06, 16, 64, similarity * Math.PI * 2]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[3.5, 1.2, 0]}>
        <torusGeometry args={[1.1, 0.02, 8, 64]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <Text position={[3.5, 1.2, 0.1]} fontSize={0.45} color="#f8fafc" anchorX="center" anchorY="middle">
        {Math.round(similarity * 100)}%
      </Text>
      <Text position={[3.5, 0.5, 0.1]} fontSize={0.14} color="#22d3ee" anchorX="center">
        COSINE SIMILARITY
      </Text>

      <Text position={[0, -2.5, 0]} fontSize={0.14} color="#94a3b8" anchorX="center">
        {step >= 4
          ? 'TRAVERSAL: ENTRY → L2 → L1 → L0 | VISITED: 20 | STOP'
          : step >= 2
            ? 'Greedy search → descend layers'
            : 'Random entry point on top layer'}
      </Text>
    </SceneCanvas>
  )
}
