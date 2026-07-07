/** Which topics get shared transformer math content vs. concept-only teaching */

export const CANONICAL_NUMERICAL_TOPIC_ID = 'q-k-v'

export const CANONICAL_NUMERICAL_LABEL = {
  hinglish: 'Q, K, V — Query, Key, Value',
  english: 'Q, K, V — Query, Key, Value',
}

/** Topics with their own hand-calculated numerical lab (no generic fallback) */
export const NUMERICAL_LAB_CONCEPT_IDS = new Set([
  'what-is-vector',
  'why-vectors',
  'vectors-in-ai',
  'similarity-distance',
  'llm-introduction',
  'q-k-v',
  'attention-mechanism',
  'wq-wk-wv',
  'softmax',
  'kv-cache',
  'masked-attention',
  'multihead-attention',
  'prediction',
])

/** Topics where matrix-shape sections are meaningful (tensor math) */
export const MATRIX_TEACHING_CONCEPT_IDS = new Set([
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
  'output-projection-wo',
  'residual-connections',
  'cross-entropy-loss',
  'prefill-decode',
  'gelu-swish-ffn',
])

export function hasNumericalLab(conceptId: string): boolean {
  return NUMERICAL_LAB_CONCEPT_IDS.has(conceptId)
}

export function hasMatrixTeaching(conceptId: string): boolean {
  return MATRIX_TEACHING_CONCEPT_IDS.has(conceptId)
}

export function numericalPointer(lang: 'hinglish' | 'english'): string {
  if (lang === 'hinglish') {
    return `Poora hand-calculated walkthrough ("The cat drinks milk", d=2) sirf **${CANONICAL_NUMERICAL_LABEL.hinglish}** topic mein hai — wahan Playground tab kholo. Har topic ka apna focus yahan rehta hai, repeat nahi.`
  }
  return `The full hand-calculated walkthrough ("The cat drinks milk", d=2) lives only in **${CANONICAL_NUMERICAL_LABEL.english}** — open its Playground tab. Each topic keeps its own focus here, without repetition.`
}
