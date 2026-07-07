import type { ComponentType } from 'react'
import { VerticalFlow } from '../animations/foundation-anims'
import { AttentionCompute, SoftmaxCompute } from './chapters/AttentionCompute'
import { EmbeddingCompute, ParametersCompute } from './chapters/EmbeddingCompute'
import { QKVCompute } from './chapters/QKVCompute'
import { TokenizationCompute } from './chapters/TokenizationCompute'
import {
  FeedForwardCompute,
  GradientDescentCompute,
  KVCacheCompute,
  LayerNormCompute,
  PredictionCompute,
} from './chapters/TrainingCompute'

type AnimProps = { step: number }

function TransformerFlowCompute({ step }: AnimProps) {
  return <VerticalFlow steps={['Tokenize', 'Embed', 'QKV', 'Attention', 'FFN', 'Predict']} step={Math.min(step, 5)} />
}

function ResidualCompute({ step }: AnimProps) {
  return <EmbeddingCompute step={step} />
}

/** Concepts that use computation visualizations (live matrix math) */
export const COMPUTE_CONCEPT_IDS = new Set([
  'tokenization',
  'embeddings',
  'parameters',
  'wq-wk-wv',
  'q-k-v',
  'attention-mechanism',
  'softmax',
  'layer-normalization',
  'feed-forward',
  'masked-attention',
  'multihead-attention',
  'kv-cache',
  'transformer-flow',
  'prediction',
  'gradient-descent',
  'backpropagation',
  'residual-connections',
  'output-projection-wo',
  'gelu-swish-ffn',
  'cross-entropy-loss',
  'prefill-decode',
  'token-sampling',
  'autoregressive-generation',
  'teacher-forcing',
])

const computeRegistry: Record<string, ComponentType<AnimProps>> = {
  tokenization: TokenizationCompute,
  embeddings: EmbeddingCompute,
  parameters: ParametersCompute,
  'wq-wk-wv': ParametersCompute,
  'q-k-v': QKVCompute,
  'attention-mechanism': AttentionCompute,
  softmax: SoftmaxCompute,
  'layer-normalization': LayerNormCompute,
  'feed-forward': FeedForwardCompute,
  'gelu-swish-ffn': FeedForwardCompute,
  'masked-attention': AttentionCompute,
  'multihead-attention': AttentionCompute,
  'kv-cache': KVCacheCompute,
  'transformer-flow': TransformerFlowCompute,
  prediction: PredictionCompute,
  'gradient-descent': GradientDescentCompute,
  backpropagation: GradientDescentCompute,
  'residual-connections': ResidualCompute,
  'output-projection-wo': PredictionCompute,
  'cross-entropy-loss': PredictionCompute,
  'prefill-decode': KVCacheCompute,
  'token-sampling': PredictionCompute,
  'autoregressive-generation': TokenizationCompute,
  'teacher-forcing': TokenizationCompute,
}

export function isComputeConcept(id: string) {
  return COMPUTE_CONCEPT_IDS.has(id)
}

export function getComputeAnimation(id: string): ComponentType<AnimProps> | null {
  return computeRegistry[id] ?? null
}

export { COMPUTE_STEP_COUNTS, getComputeStepCount } from '../../data/compute-step-counts'
