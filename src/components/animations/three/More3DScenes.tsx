import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import type { Group } from 'three'
import { SceneCanvas } from './SceneCanvas'
import { MatMul3DScene } from './MatMul3DScene'

export function KDTree3DScene({ step }: { step: number }) {
  const points: [number, number, number][] = [
    [-2, 0, 1],
    [-1, 0, -0.5],
    [0.5, 0, 0.8],
    [1.5, 0, -1],
    [2.5, 0, 0.3],
    [-0.5, 0, 1.8],
  ]

  return (
    <SceneCanvas camera={[5, 6, 7]} autoRotate={step < 3}>
      <Text position={[0, 3.5, 0]} fontSize={0.28} color="#e2e8f0" anchorX="center">
        {step === 0 && '2D points in space'}
        {step === 1 && 'Split on X axis (median)'}
        {step === 2 && 'Split on Y axis (alternate)'}
        {step === 3 && 'Search + backtrack'}
        {step === 4 && 'Nearest neighbor found'}
      </Text>

      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} />
        </mesh>
      ))}

      {step >= 1 && (
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <planeGeometry args={[6, 0.02]} />
          <meshStandardMaterial color="#fb7185" emissive="#fb7185" emissiveIntensity={0.8} side={2} />
        </mesh>
      )}
      {step >= 2 && (
        <mesh position={[0.5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[4, 0.02]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.8} side={2} />
        </mesh>
      )}
      {step >= 3 && (
        <mesh position={[1.5, 0, 0.3]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial color="#34d399" transparent opacity={0.25} wireframe />
        </mesh>
      )}
      {step >= 4 && (
        <mesh position={[1.5, 0, 0.3]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={1.2} />
        </mesh>
      )}
    </SceneCanvas>
  )
}

/** Live weight update during gradient descent */
export function WeightUpdate3DScene({ step }: { step: number }) {
  const group = useRef<Group>(null)
  const theta = 0.5 - step * 0.08
  const loss = Math.max(1, 9 - step * 2)

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.elapsedTime * 0.25
  })

  return (
    <SceneCanvas camera={[4, 3, 6]}>
      <Text position={[0, 3, 0]} fontSize={0.26} color="#e2e8f0" anchorX="center">
        {step === 0 && 'θ = learned weight (parameter)'}
        {step === 1 && 'Forward: pred = θ · x'}
        {step === 2 && 'Loss = (pred − target)²'}
        {step === 3 && 'Backward: ∂L/∂θ'}
        {step === 4 && 'θ_new = θ − lr · gradient'}
      </Text>

      <group ref={group}>
        {Array.from({ length: 16 }).map((_, i) => {
          const r = Math.floor(i / 4)
          const c = i % 4
          const delta = step >= 4 ? Math.sin(i + step) * 0.15 : 0
          const v = theta + delta * (i % 3)
          return (
            <mesh key={i} position={[(c - 1.5) * 0.45, (1.5 - r) * 0.45, 0]}>
              <boxGeometry args={[0.35, 0.35, 0.35 + Math.abs(v) * 0.3]} />
              <meshStandardMaterial
                color={v > 0 ? '#22d3ee' : '#f472b6'}
                emissive={step >= 4 ? '#fbbf24' : v > 0 ? '#22d3ee' : '#f472b6'}
                emissiveIntensity={step >= 3 ? 0.9 : 0.35}
              />
            </mesh>
          )
        })}
      </group>

      <Text position={[2.5, 1, 0]} fontSize={0.2} color="#fbbf24" anchorX="left">
        loss = {loss.toFixed(1)}
      </Text>
      <Text position={[2.5, 0.5, 0]} fontSize={0.18} color="#94a3b8" anchorX="left">
        θ = {theta.toFixed(2)}
      </Text>
    </SceneCanvas>
  )
}

export function Attention3DScene({ step }: { step: number }) {
  return <MatMul3DScene step={Math.min(step, 4)} />
}

export function VectorDB3DScene({ step }: { step: number }) {
  return (
    <SceneCanvas camera={[7, 4, 9]} autoRotate>
      <Text position={[0, 3, 0]} fontSize={0.26} color="#e2e8f0" anchorX="center">
        RAG: Embed → Index → Query → Retrieve → Generate
      </Text>
      {['Docs', 'Embed', 'Index', 'Query', 'Top-K'].map((label, i) => (
        <group key={label} position={[-4 + i * 2, 0, 0]}>
          <mesh>
            <boxGeometry args={[1.4, 0.8, 0.3]} />
            <meshStandardMaterial
              color={step >= i ? '#8b5cf6' : '#1e293b'}
              emissive={step >= i ? '#8b5cf6' : '#000'}
              emissiveIntensity={step === i ? 1 : 0.3}
            />
          </mesh>
          <Text position={[0, 0, 0.2]} fontSize={0.16} color="#fff" anchorX="center">
            {label}
          </Text>
        </group>
      ))}
    </SceneCanvas>
  )
}
