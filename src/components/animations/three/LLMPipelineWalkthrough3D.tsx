import { Text } from '@react-three/drei'
import { SceneCanvas } from './SceneCanvas'
import { MatrixPlane3D } from './MatrixPlane3D'
import { MatMul3DScene } from './MatMul3DScene'

const X_VALUES = [
  [0.21, 0.88],
  [0.76, 0.12],
]
const A_VALUES = [
  [0.67, 0.33],
  [0.33, 0.67],
]
const LOGITS = [1.2, 0.3, 2.1, 0.5]

const STEP_LABELS = [
  '① Tokenize "The cat"',
  '② Embedding lookup → X',
  '③ Q = X·Wq, K = X·Wk, V = X·Wv',
  '④ Attention: softmax(Q·Kᵀ/√d)',
  '⑤ Output = A·V + LayerNorm',
  '⑥ Feed-Forward (D → 4D → D)',
  '⑦ Training: W ← W − lr·∇W',
  '⑧ KV cache grows at decode',
  '⑨ Linear head → logits',
  '⑩ Softmax → next token "sat"',
]

export function LLMPipelineWalkthrough3DScene({ step }: { step: number }) {
  if (step === 6) {
    return <MatMul3DScene step={4} />
  }

  return (
    <SceneCanvas camera={[6, 4, 8]} autoRotate={step < 2}>
      <Text position={[0, 3.2, 0]} fontSize={0.26} color="#e2e8f0" anchorX="center">
        {STEP_LABELS[step] ?? STEP_LABELS[0]}
      </Text>

      {step === 0 && (
        <group>
          {['The', 'cat'].map((tok, i) => (
            <Text key={tok} position={[(i - 0.5) * 1.8, 0.5, 0]} fontSize={0.45} color="#c4b5fd" anchorX="center">
              {tok}
            </Text>
          ))}
          <Text position={[0, -0.8, 0]} fontSize={0.2} color="#94a3b8" anchorX="center">
            IDs → [42, 891]
          </Text>
        </group>
      )}

      {step === 1 && (
        <MatrixPlane3D
          rows={2}
          cols={2}
          position={[0, 0, 0]}
          rotation={[-0.35, 0.25, 0]}
          label="X (2×2)"
          values={X_VALUES}
          showValues
          glowCells={[[0, 0], [1, 1]]}
        />
      )}

      {(step === 2) && (
        <>
          <MatrixPlane3D rows={2} cols={2} position={[-2.2, 0.3, 0]} rotation={[0, 0.4, 0]} label="X" values={X_VALUES} showValues />
          <Text position={[0, 0.3, 0]} fontSize={0.35} color="#fbbf24">
            ×
          </Text>
          <MatrixPlane3D rows={2} cols={2} position={[2.2, 0.3, 0]} rotation={[0, -0.4, 0]} label="Wq,Wk,Wv" seed={7} />
          <group position={[0, -2, 0]}>
            <MatrixPlane3D rows={2} cols={2} position={[-1.5, 0, 0]} rotation={[0, 0.2, 0]} label="Q" seed={20} showValues values={X_VALUES} />
            <MatrixPlane3D rows={2} cols={2} position={[0, 0, 0]} rotation={[0, 0, 0]} label="K" seed={21} showValues values={X_VALUES} />
            <MatrixPlane3D rows={2} cols={2} position={[1.5, 0, 0]} rotation={[0, -0.2, 0]} label="V" seed={22} showValues values={X_VALUES} />
          </group>
        </>
      )}

      {step === 7 && (
        <group>
          <MatrixPlane3D rows={2} cols={2} position={[-1.5, 0.5, 0]} rotation={[0, 0.3, 0]} label="cache K" showValues values={X_VALUES} glowCells={[[0, 0], [1, 1]]} />
          <MatrixPlane3D rows={2} cols={2} position={[1.5, 0.5, 0]} rotation={[0, -0.3, 0]} label="cache V" showValues values={X_VALUES} glowCells={[[0, 1], [1, 0]]} />
          <Text position={[0, -1.5, 0]} fontSize={0.18} color="#22d3ee" anchorX="center">
            Q₃ fresh · K₁,K₂,V₁,V₂ from cache — no recompute
          </Text>
        </group>
      )}

      {step === 3 && (
        <MatrixPlane3D
          rows={2}
          cols={2}
          position={[0, 0, 0]}
          rotation={[-0.5, 0.3, 0]}
          label="A = softmax(QKᵀ/√d)"
          values={A_VALUES}
          showValues
          glowCells={[[0, 0], [0, 1], [1, 0], [1, 1]]}
          pulse
        />
      )}

      {step === 4 && (
        <>
          <MatrixPlane3D rows={2} cols={2} position={[-1.8, 0, 0]} rotation={[0, 0.3, 0]} label="A·V" seed={40} showValues values={[[0.45, 0.52], [0.52, 0.45]]} />
          <Text position={[0, 0, 0]} fontSize={0.3} color="#fbbf24">
            →
          </Text>
          <MatrixPlane3D rows={2} cols={2} position={[1.8, 0, 0]} rotation={[0, -0.3, 0]} label="LayerNorm" seed={41} showValues values={[[0.0, 0.71], [-0.71, 0.0]]} pulse />
        </>
      )}

      {step === 5 && (
        <group>
          <Text position={[0, 1.2, 0]} fontSize={0.2} color="#94a3b8" anchorX="center">
            FFN: D → 4D → D
          </Text>
          {[0, 1, 2, 3].map((i) => (
            <mesh key={i} position={[(i - 1.5) * 0.55, 0, 0]}>
              <boxGeometry args={[0.4, 0.4, 0.4]} />
              <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.5} />
            </mesh>
          ))}
          <Text position={[0, -1.2, 0]} fontSize={0.16} color="#67e8f9" anchorX="center">
            [1.2, -0.3, 0.8, 0.1] → GELU → out
          </Text>
        </group>
      )}

      {step === 8 && (
        <group>
          {LOGITS.map((v, i) => (
            <group key={i} position={[(i - 1.5) * 1.1, 0, 0]}>
              <mesh>
                <boxGeometry args={[0.7, v * 0.35 + 0.2, 0.3]} />
                <meshStandardMaterial
                  color={i === 2 ? '#fbbf24' : '#6366f1'}
                  emissive={i === 2 ? '#fbbf24' : '#6366f1'}
                  emissiveIntensity={i === 2 ? 0.9 : 0.35}
                />
              </mesh>
              <Text position={[0, -0.6, 0]} fontSize={0.14} color="#e2e8f0" anchorX="center">
                {v.toFixed(1)}
              </Text>
            </group>
          ))}
          <Text position={[0, 1.2, 0]} fontSize={0.18} color="#c4b5fd" anchorX="center">
            logits = h · W_out
          </Text>
        </group>
      )}

      {step === 9 && (
        <group>
          <Text position={[0, 1.5, 0]} fontSize={0.35} color="#34d399" anchorX="center">
            p("sat") = 0.65
          </Text>
          {[
            ['The', 0.12],
            ['cat', 0.08],
            ['sat', 0.65],
            ['…', 0.15],
          ].map(([tok, p], i) => (
            <Text key={tok} position={[(i - 1.5) * 1.6, 0.2 - i * 0.15, 0]} fontSize={0.22} color={tok === 'sat' ? '#fbbf24' : '#94a3b8'} anchorX="center">
              {tok} {(Number(p) * 100).toFixed(0)}%
            </Text>
          ))}
        </group>
      )}
    </SceneCanvas>
  )
}
