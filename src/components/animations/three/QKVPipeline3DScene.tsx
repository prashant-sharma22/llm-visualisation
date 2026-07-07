import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line, Text } from '@react-three/drei'
import type { Group } from 'three'
import { SceneCanvas } from './SceneCanvas'
import { MatrixPlane3D } from './MatrixPlane3D'
import { MatMul3DScene } from './MatMul3DScene'

function WeightBlock({
  label,
  position,
  color,
  visible,
  morph,
}: {
  label: string
  position: [number, number, number]
  color: string
  visible: boolean
  morph?: number
}) {
  const ref = useRef<Group>(null)
  useFrame((state) => {
    if (!ref.current || !visible) return
    const t = state.clock.elapsedTime
    ref.current.rotation.y = Math.sin(t * 0.8) * 0.15
    if (morph !== undefined) {
      ref.current.scale.setScalar(0.85 + morph * 0.15 + Math.sin(t * 2) * 0.03)
    }
  })
  if (!visible) return null
  return (
    <group ref={ref} position={position}>
      <mesh>
        <boxGeometry args={[1.1, 1.1, 0.25]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} metalness={0.5} />
      </mesh>
      <Text position={[0, 0, 0.2]} fontSize={0.22} color="#fff" anchorX="center" anchorY="middle">
        {label}
      </Text>
    </group>
  )
}

/** X → Wq/Wk/Wv → Q,K,V → attention */
export function QKVPipeline3DScene({ step }: { step: number }) {
  return (
    <SceneCanvas camera={[7, 4, 8]} autoRotate={step < 2}>
      <Text position={[0, 3.3, 0]} fontSize={0.3} color="#e2e8f0" anchorX="center">
        {step === 0 && 'Input embeddings X (N x D)'}
        {step === 1 && 'Learned weight matrices Wq, Wk, Wv'}
        {step === 2 && 'Matrix multiply: Q = X*Wq  K = X*Wk  V = X*Wv'}
        {step === 3 && 'Q, K, V tensors ready for attention'}
        {step === 4 && 'Attention: softmax(Q*K^T/sqrt(d)) * V'}
      </Text>

      <MatrixPlane3D
        rows={3}
        cols={4}
        position={[0, 0.5, 0]}
        rotation={[-0.4, 0.3, 0]}
        label="X"
        seed={10}
        opacity={step >= 0 ? 1 : 0.2}
        pulse={step === 0}
      />

      <WeightBlock label="Wq" position={[-2.8, -0.8, 1]} color="#8b5cf6" visible={step >= 1} morph={step >= 2 ? 1 : 0} />
      <WeightBlock label="Wk" position={[0, -0.8, 1.5]} color="#22d3ee" visible={step >= 1} morph={step >= 2 ? 1 : 0} />
      <WeightBlock label="Wv" position={[2.8, -0.8, 1]} color="#34d399" visible={step >= 1} morph={step >= 2 ? 1 : 0} />

      {step >= 2 && (
        <>
          <Line points={[[0, 0, 0], [-2.8, -0.5, 1]]} color="#8b5cf6" lineWidth={1.5} />
          <Line points={[[0, 0, 0], [0, -0.5, 1.5]]} color="#22d3ee" lineWidth={1.5} />
          <Line points={[[0, 0, 0], [2.8, -0.5, 1]]} color="#34d399" lineWidth={1.5} />
        </>
      )}

      {step >= 3 && (
        <>
          <MatrixPlane3D rows={3} cols={3} position={[-2.5, -2, 0]} rotation={[0, 0.4, 0]} label="Q" seed={20} glowCells={[[0, 0]]} />
          <MatrixPlane3D rows={3} cols={3} position={[0, -2, 0]} rotation={[0, 0, 0]} label="K" seed={21} glowCells={[[1, 1]]} />
          <MatrixPlane3D rows={3} cols={3} position={[2.5, -2, 0]} rotation={[0, -0.4, 0]} label="V" seed={22} glowCells={[[2, 0]]} />
        </>
      )}

      {step >= 4 && (
        <group position={[0, -3.2, 0]}>
          <MatrixPlane3D rows={3} cols={3} position={[0, 0, 0]} rotation={[-0.6, 0, 0]} label="scores" seed={30} glowCells={[[0, 1], [1, 1], [2, 2]]} pulse />
        </group>
      )}
    </SceneCanvas>
  )
}

export function WeightMatrices3DScene({ step }: { step: number }) {
  if (step <= 1) return <MatMul3DScene step={step} />
  return <QKVPipeline3DScene step={step} />
}
