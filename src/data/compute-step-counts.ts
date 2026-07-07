/** Step counts for compute chapters — kept in data layer to avoid circular imports */
export const COMPUTE_STEP_COUNTS: Record<string, number> = {
  tokenization: 10,
  embeddings: 10,
  parameters: 6,
  'wq-wk-wv': 6,
  'q-k-v': 10,
  'attention-mechanism': 8,
  softmax: 6,
  'layer-normalization': 5,
  'feed-forward': 4,
  'masked-attention': 8,
  'multihead-attention': 8,
  'kv-cache': 6,
  'transformer-flow': 6,
  prediction: 5,
  'gradient-descent': 6,
  backpropagation: 6,
  'prefill-decode': 6,
  'cross-entropy-loss': 5,
  'token-sampling': 5,
  'autoregressive-generation': 10,
  'teacher-forcing': 10,
  'output-projection-wo': 5,
  'gelu-swish-ffn': 4,
  'residual-connections': 10,
}

export function getComputeStepCount(id: string): number | null {
  return COMPUTE_STEP_COUNTS[id] ?? null
}
