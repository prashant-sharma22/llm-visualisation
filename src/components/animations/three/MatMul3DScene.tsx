import { useMemo } from 'react'
import { Line, Text } from '@react-three/drei'
import { SceneCanvas } from './SceneCanvas'
import { MatrixPlane3D } from './MatrixPlane3D'

const L_TOY = [
  [1, 0, 1],
  [0, 1, 0],
  [1, 1, 0],
]
const R_TOY = [
  [1, 0, 1, 0],
  [0, 1, 0, 1],
  [1, 0, 0, 1],
]

/** L @ R — 3-plane matrix multiply (Brendan Bycroft / 3b1b style) */
export function MatMul3DScene({ step }: { step: number }) {
  const activeK = step >= 3 ? (step >= 4 ? 1 : 0) : -1
  const lines = useMemo(() => {
    if (step < 2) return []
    const out: [number, number, number][][] = []
    for (let k = 0; k < 4; k++) {
      out.push([
        [-1.2, 0.5 - k * 0.35, 0.8],
        [0, 0.5 - k * 0.35, 0],
        [1.2, 0.5 - k * 0.35, -0.8],
      ])
    }
    return out
  }, [step])

  return (
    <SceneCanvas camera={[6, 5, 8]} autoRotate={step < 4}>
      <Text position={[0, 3.2, 0]} fontSize={0.35} color="#e2e8f0" anchorX="center">
        {step < 2 ? 'Matrices in 3D space' : step < 4 ? 'Dot product along K' : 'L @ R = Output'}
      </Text>

      <MatrixPlane3D
        rows={3}
        cols={3}
        position={[-2.8, 0.2, 0]}
        rotation={[0, 0.55, 0]}
        label="L (I×K)"
        values={L_TOY}
        showValues={step >= 2}
        seed={1}
        highlightRow={step >= 3 ? activeK : undefined}
        opacity={step >= 0 ? 1 : 0.3}
        pulse={step === 0}
      />

      <MatrixPlane3D
        rows={3}
        cols={4}
        position={[0, 2.2, 0]}
        rotation={[-0.9, 0, 0]}
        label="R (K×J)"
        values={R_TOY}
        showValues={step >= 2}
        seed={2}
        highlightCol={step >= 3 ? activeK : undefined}
        opacity={step >= 1 ? 1 : 0.2}
        pulse={step === 1}
      />

      <MatrixPlane3D
        rows={3}
        cols={4}
        position={[2.8, 0.2, 0]}
        rotation={[0, -0.55, 0]}
        label="L @ R"
        seed={5}
        showValues={step >= 4}
        values={[
          [1, 0, 1, 0],
          [0, 1, 0, 1],
          [2, 1, 0, 1],
        ]}
        glowCells={
          step >= 4
            ? [
                [0, 0],
                [0, 2],
                [1, 1],
                [2, 0],
                [2, 1],
              ]
            : step >= 3
              ? [[0, 0]]
              : []
        }
        opacity={step >= 2 ? 1 : 0.15}
        pulse={step >= 4}
      />

      {lines.map((pts, i) => (
        <Line
          key={i}
          points={pts}
          color={step >= 3 && i === activeK ? '#fbbf24' : '#334155'}
          lineWidth={step >= 3 && i === activeK ? 2.5 : 1}
          transparent
          opacity={step >= 2 ? 0.9 : 0}
        />
      ))}

      {step >= 3 && (
        <mesh position={[0, 0.15, 0]}>
          <octahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={1.2} />
        </mesh>
      )}
    </SceneCanvas>
  )
}
