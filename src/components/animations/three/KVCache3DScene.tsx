import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import type { Mesh } from 'three'
import { SceneCanvas } from './SceneCanvas'
import { MatrixPlane3D } from './MatrixPlane3D'

function CacheSlot({
  position,
  label,
  filled,
  active,
}: {
  position: [number, number, number]
  label: string
  filled: boolean
  active?: boolean
}) {
  const ref = useRef<Mesh>(null)
  useFrame((state) => {
    if (!ref.current || !active) return
    ref.current.position.z = position[2] + Math.sin(state.clock.elapsedTime * 2) * 0.05
  })
  return (
    <group position={position}>
      <mesh ref={ref}>
        <boxGeometry args={[0.9, 0.45, 0.35]} />
        <meshStandardMaterial
          color={filled ? '#8b5cf6' : '#1e293b'}
          emissive={filled ? '#8b5cf6' : '#000'}
          emissiveIntensity={active ? 1 : filled ? 0.4 : 0}
        />
      </mesh>
      <Text position={[0, 0, 0.22]} fontSize={0.14} color="#e2e8f0" anchorX="center">
        {label}
      </Text>
    </group>
  )
}

export function KVCache3DScene({ step }: { step: number }) {
  const tokens = ['The', 'cat', 'sat']
  const tokenCount = step >= 2 ? 3 : step >= 1 ? 2 : 1

  return (
    <SceneCanvas camera={[6, 3, 8]}>
      <Text position={[0, 3.2, 0]} fontSize={0.28} color="#e2e8f0" anchorX="center">
        {step === 0 && 'Prefill: compute K1, V1 for "The"'}
        {step === 1 && 'Store in KV cache - reuse at decode'}
        {step === 2 && 'Append K2, V2 - old K,V NOT recomputed'}
        {step === 3 && 'Decode: fresh Q only x cached K^T'}
        {step === 4 && 'Cache grows: seq_len x layers x heads'}
      </Text>

      {/* Token strip */}
      {tokens.map(
        (t, i) =>
          i < tokenCount && (
            <group key={t} position={[-2 + i * 2, 2, 0]}>
              <mesh>
                <boxGeometry args={[1.2, 0.5, 0.2]} />
                <meshStandardMaterial
                  color={i === tokenCount - 1 && step >= 2 ? '#fbbf24' : '#22d3ee'}
                  emissive={i === tokenCount - 1 ? '#fbbf24' : '#22d3ee'}
                  emissiveIntensity={0.5}
                />
              </mesh>
              <Text position={[0, 0, 0.15]} fontSize={0.18} color="#fff" anchorX="center">
                {t}
              </Text>
            </group>
          )
      )}

      {/* 3 layers of cache */}
      {[0, 1, 2].map((layer) => (
        <group key={layer} position={[-3, 0.5 - layer * 1.2, 0]}>
          <Text position={[-0.5, 0.6, 0]} fontSize={0.14} color="#a78bfa" anchorX="left">
            Layer {layer + 1}
          </Text>
          {tokens.map((_, ti) => (
            <CacheSlot
              key={ti}
              position={[ti * 1.1, 0, 0]}
              label={`K${ti + 1}`}
              filled={ti < tokenCount && step >= 1}
              active={ti === tokenCount - 1 && step >= 1 && step <= 2}
            />
          ))}
          {tokens.map((_, ti) => (
            <CacheSlot
              key={`v-${ti}`}
              position={[ti * 1.1, -0.55, 0]}
              label={`V${ti + 1}`}
              filled={ti < tokenCount && step >= 1}
              active={ti === tokenCount - 1 && step >= 1 && step <= 2}
            />
          ))}
        </group>
      ))}

      {step >= 3 && (
        <group position={[2.5, 0, 0]}>
          <MatrixPlane3D rows={1} cols={3} position={[0, 0.5, 0]} rotation={[0, -0.5, 0]} label="Q_new" seed={40} glowCells={[[0, 0]]} pulse />
          <Text position={[0, -0.8, 0]} fontSize={0.16} color="#fbbf24" anchorX="center">
            Q NOT cached
          </Text>
        </group>
      )}

      {step >= 4 && (
        <mesh position={[0, -2.8, 0]}>
          <boxGeometry args={[3 + tokenCount * 0.8, 0.35, 0.2]} />
          <meshStandardMaterial color="#fb7185" emissive="#fb7185" emissiveIntensity={0.6} />
        </mesh>
      )}
      {step >= 4 && (
        <Text position={[0, -2.8, 0.3]} fontSize={0.14} color="#fff" anchorX="center">
          GPU memory up
        </Text>
      )}
    </SceneCanvas>
  )
}
