/**
 * Production 3D animations — vector search & LLM internals.
 * Inspired by Brendan Bycroft LLM viz, 3b1b matrix style, HNSW graph refs.
 */
import { HNSW3DScene } from './three/HNSW3DScene'
import { KVCache3DScene } from './three/KVCache3DScene'
import { MatMul3DScene } from './three/MatMul3DScene'
import { Annoy3DScene } from './three/Annoy3DScene'
import { LLMPipelineWalkthrough3DScene } from './three/LLMPipelineWalkthrough3D'
import {
  Attention3DScene,
  KDTree3DScene,
  VectorDB3DScene,
  WeightUpdate3DScene,
} from './three/More3DScenes'
import { QKVPipeline3DScene, WeightMatrices3DScene } from './three/QKVPipeline3DScene'

type AnimProps = { step: number }

export function HNSWAnim3D({ step }: AnimProps) {
  return <HNSW3DScene step={step} />
}

export function KDTreeAnim3D({ step }: AnimProps) {
  return <KDTree3DScene step={step} />
}

export function QKVAnim3D({ step }: AnimProps) {
  return <QKVPipeline3DScene step={step} />
}

export function WeightMatricesAnim3D({ step }: AnimProps) {
  return <WeightMatrices3DScene step={step} />
}

export function KVCacheAnim3D({ step }: AnimProps) {
  return <KVCache3DScene step={step} />
}

export function AttentionMechanismAnim3D({ step }: AnimProps) {
  return <Attention3DScene step={step} />
}

export function ParametersAnim3D({ step }: AnimProps) {
  return <WeightUpdate3DScene step={step} />
}

export function VectorDBAnim3D({ step }: AnimProps) {
  return <VectorDB3DScene step={step} />
}

export function MatMulAnim3D({ step }: AnimProps) {
  return <MatMul3DScene step={step} />
}

export function EmbeddingsAnim3D({ step }: AnimProps) {
  return <MatMul3DScene step={step} />
}

export function MaskedAttentionAnim3D({ step }: AnimProps) {
  return <QKVPipeline3DScene step={Math.min(step, 4)} />
}

export function MultiheadAttentionAnim3D({ step }: AnimProps) {
  return <QKVPipeline3DScene step={step} />
}

export function AnnoyAnim3D({ step }: AnimProps) {
  return <Annoy3DScene step={step} />
}

export function TransformerFlowAnim3D({ step }: AnimProps) {
  return <LLMPipelineWalkthrough3DScene step={step} />
}
