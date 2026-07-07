import type { Bilingual, Concept } from '../types/concept'
import { COMPUTE_STEP_COUNTS } from './compute-step-counts'
import { getDefaultLab, getLabForConcept, type LabStep } from './numerical-lab'

const COMPUTE_STEP_OVERRIDE = COMPUTE_STEP_COUNTS

export interface AnimDryRun {
  title: Bilingual
  description: Bilingual
  formula: string
  values: string
  shapes: string
}

const pipelineWalkthrough: AnimDryRun[] = [
  {
    title: { hinglish: 'Tokenize "The cat drinks milk"', english: 'Tokenize "The cat drinks milk"' },
    description: {
      hinglish: 'Sentence ko tokens mein todo — har word glow karke token ID milti hai.',
      english: 'Split sentence into tokens — each word glows and gets a token ID.',
    },
    formula: 'ids = tokenizer("The cat drinks milk")',
    values: 'The→10, cat→21, drinks→8, milk→17',
    shapes: 'seq_len = 4',
  },
  {
    title: { hinglish: 'Embedding lookup', english: 'Embedding lookup' },
    description: {
      hinglish: 'Har token ID se D-dim vector — X matrix banti hai.',
      english: 'D-dim vector per token ID — forms matrix X.',
    },
    formula: 'X = Embedding[token_ids]   shape (N, D)',
    values: 'The → [0.21, 0.88]\ncat → [0.76, 0.12]\nX = [[0.21, 0.88], [0.76, 0.12]]',
    shapes: 'X: (2, 2)',
  },
  {
    title: { hinglish: 'Q, K, V projections', english: 'Q, K, V projections' },
    description: {
      hinglish: 'Wq, Wk, Wv se multiply — training mein yeh weights update hote hain.',
      english: 'Multiply by Wq, Wk, Wv — these weights update during training.',
    },
    formula: 'Q = X·Wq,  K = X·Wk,  V = X·Wv',
    values: 'Wq=I (toy)\nQ=[[0.21,0.88],[0.76,0.12]]',
    shapes: 'W: (D,D), Q,K,V: (N,D)',
  },
  {
    title: { hinglish: 'Attention + softmax', english: 'Attention + softmax' },
    description: {
      hinglish: 'Q·Kᵀ, scale, softmax — har row probability (sum=1).',
      english: 'Q·Kᵀ, scale, softmax — each row sums to 1.',
    },
    formula: "A = softmax(Q·Kᵀ / √d)",
    values: 'S=[[0.71,0.29],[0.29,0.71]]\nA=[[0.67,0.33],[0.33,0.67]]',
    shapes: 'A: (N,N)',
  },
  {
    title: { hinglish: 'A·V + LayerNorm', english: 'A·V + LayerNorm' },
    description: {
      hinglish: 'Weighted V sum, phir LayerNorm — mean 0, std 1.',
      english: 'Weighted sum of V, then LayerNorm — mean 0, std 1.',
    },
    formula: 'O = A·V → LN(O + residual)',
    values: 'O=[[0.45,0.52],[0.52,0.45]]\nLN: (x-μ)/σ',
    shapes: 'O: (N,D)',
  },
  {
    title: { hinglish: 'Feed-Forward', english: 'Feed-Forward' },
    description: {
      hinglish: 'D → 4D → D MLP har position pe.',
      english: 'D → 4D → D MLP at each position.',
    },
    formula: 'FFN(x) = W₂·GELU(W₁·x)',
    values: 'x→[1.2,-0.3,0.8,0.1]→GELU→out',
    shapes: 'W₁:(D,4D)',
  },
  {
    title: { hinglish: 'Training weight update', english: 'Training weight update' },
    description: {
      hinglish: 'Gradient se Wq,Wk,Wv change — Adam optimizer.',
      english: 'Gradients change Wq,Wk,Wv — Adam optimizer.',
    },
    formula: 'W ← W - lr·∇W',
    values: 'Wq[0,0]: 1.000→0.992\nloss: 2.4→2.1',
    shapes: 'W: (D,D)',
  },
  {
    title: { hinglish: 'KV cache at decode', english: 'KV cache at decode' },
    description: {
      hinglish: 'Purane K,V reuse — sirf naya K,V append.',
      english: 'Reuse old K,V — only append new K,V.',
    },
    formula: 'cache_K = [K₁..Kₜ]',
    values: 'cache (2,D) after "The cat"\nQ₃ fresh only',
    shapes: 'cache grows',
  },
  {
    title: { hinglish: 'Output logits', english: 'Output logits' },
    description: {
      hinglish: 'Last hidden → vocab scores.',
      english: 'Last hidden → vocab scores.',
    },
    formula: 'logits = h·W_out',
    values: 'logits=[1.2, 0.3, 2.1, ...]',
    shapes: 'W_out: (D,V)',
  },
  {
    title: { hinglish: 'Next token', english: 'Next token' },
    description: {
      hinglish: 'Softmax → pick "sat".',
      english: 'Softmax → pick "sat".',
    },
    formula: 'p = softmax(logits)',
    values: 'p=[0.12,0.08,0.65,...] → "sat"',
    shapes: 'p: (V,)',
  },
]

const annoyDryRun: AnimDryRun[] = [
  {
    title: { hinglish: 'Vectors in space', english: 'Vectors in space' },
    description: { hinglish: 'Har point ek embedding vector.', english: 'Each point is an embedding vector.' },
    formula: 'P = {p₁..pₙ}',
    values: 'p₁=[0.2,0.8] p₂=[0.9,0.1] p₃=[0.5,0.5] p₄=[0.1,0.9]',
    shapes: '(n, d)',
  },
  {
    title: { hinglish: 'Random pair', english: 'Random pair' },
    description: { hinglish: 'Do random points — hyperplane unke beech.', english: 'Two random points — hyperplane between them.' },
    formula: 'plane ⊥ (pₐ-pᵦ)',
    values: 'pₐ=p₁, pᵦ=p₄, mid=[0.15,0.85]',
    shapes: '2 half-spaces',
  },
  {
    title: { hinglish: 'Split', english: 'Split' },
    description: { hinglish: 'Left/right subtrees — random, not median.', english: 'Left/right subtrees — random, not median.' },
    formula: 'side = sign(dot(q-mid, n))',
    values: 'p₁→LEFT p₂→RIGHT p₃→RIGHT p₄→LEFT',
    shapes: 'depth+1',
  },
  {
    title: { hinglish: 'Multiple trees', english: 'Multiple trees' },
    description: { hinglish: 'M=10-100 trees, alag random splits.', english: 'M=10-100 trees, different random splits.' },
    formula: 'forest = {T₁..Tₘ}',
    values: 'M=3 trees built',
    shapes: 'M × n',
  },
  {
    title: { hinglish: 'Query merge', english: 'Query merge' },
    description: { hinglish: 'Har tree se candidates, best pick.', english: 'Candidates from each tree, pick best.' },
    formula: 'best = argmax cos(q, candidates)',
    values: 'q=[0.55,0.45] → p₃ cos=0.97',
    shapes: 'approx NN',
  },
]

const hnswDryRun: AnimDryRun[] = [
  { title: { hinglish: 'Layer 2', english: 'Layer 2' }, description: { hinglish: 'Sparse top layer.', english: 'Sparse top layer.' }, formula: 'L₂ sparse', values: '2 nodes', shapes: '|L₂|<<|L₀|' },
  { title: { hinglish: 'Query Q', english: 'Query Q' }, description: { hinglish: 'Entry point se start.', english: 'Start at entry point.' }, formula: 'ep=random', values: 'Q=[0.55,0.45]', shapes: '(d,)' },
  { title: { hinglish: 'Descend L2→L1', english: 'Descend L2→L1' }, description: { hinglish: 'Greedy local best.', english: 'Greedy local best.' }, formula: 'greedy(Q,L)', values: 'A→B cos=0.82', shapes: 'visited:2' },
  { title: { hinglish: 'Layer 0', english: 'Layer 0' }, description: { hinglish: 'Dense search.', english: 'Dense search.' }, formula: 'argmin dist', values: '20 nodes checked', shapes: 'visited:20' },
  { title: { hinglish: 'Match', english: 'Match' }, description: { hinglish: '96% cosine similarity.', english: '96% cosine similarity.' }, formula: 'cos=0.96', values: 'p*=nearest doc', shapes: 'O(log n)' },
]

const kvCacheDryRun: AnimDryRun[] = [
  { title: { hinglish: 'Prefill "The"', english: 'Prefill "The"' }, description: { hinglish: 'Compute K₁,V₁.', english: 'Compute K₁,V₁.' }, formula: 'K₁,V₁=f(X₁)', values: 'K₁=[0.21,0.88]', shapes: '(1,D)' },
  { title: { hinglish: 'Cache store', english: 'Cache store' }, description: { hinglish: 'GPU memory save.', english: 'Save in GPU memory.' }, formula: 'cache[0]=K₁', values: 'L layers × cache', shapes: 'per layer' },
  { title: { hinglish: 'Append "cat"', english: 'Append "cat"' }, description: { hinglish: 'Only K₂,V₂ new.', english: 'Only K₂,V₂ new.' }, formula: 'append K₂', values: 'cache (2,D)', shapes: 'no recompute' },
  { title: { hinglish: 'Q₃ × cache', english: 'Q₃ × cache' }, description: { hinglish: 'Fresh Q, cached K.', english: 'Fresh Q, cached K.' }, formula: 'softmax(Q·Kᵀ)', values: 'A=[0.62,0.38]', shapes: 'Q:(1,D)' },
  { title: { hinglish: 'Memory ↑', english: 'Memory ↑' }, description: { hinglish: 'seq_len × L × D.', english: 'seq_len × L × D.' }, formula: 'mem∝seq·L·D', values: '128K ctx = GBs', shapes: 'Q not cached' },
]

const layerNormDryRun: AnimDryRun[] = [
  {
    title: { hinglish: 'Input x', english: 'Input x' },
    description: { hinglish: 'Attention output se pehle values.', english: 'Values before normalization.' },
    formula: 'x = [1.0, 3.0, 2.0, 4.0]',
    values: 'μ = (1+3+2+4)/4 = 2.5',
    shapes: 'vector (D,)',
  },
  {
    title: { hinglish: 'Mean μ', english: 'Mean μ' },
    description: { hinglish: 'Har feature ka average.', english: 'Average across features.' },
    formula: 'μ = (1/D) Σ xᵢ',
    values: 'μ = 2.5',
    shapes: 'scalar',
  },
  {
    title: { hinglish: 'Variance σ²', english: 'Variance σ²' },
    description: { hinglish: 'Spread measure.', english: 'Spread measure.' },
    formula: 'σ² = (1/D) Σ (xᵢ−μ)²',
    values: 'σ² = 1.25, σ = 1.118',
    shapes: 'scalar',
  },
  {
    title: { hinglish: 'Normalize', english: 'Normalize' },
    description: { hinglish: 'Mean 0, std 1 — training stable.', english: 'Mean 0, std 1 — stable training.' },
    formula: 'LN(x) = γ·(x−μ)/σ + β',
    values: 'γ=1, β=0 → [-1.34, 0.45, -0.45, 1.34]',
    shapes: 'output (D,)',
  },
]

const feedForwardDryRun: AnimDryRun[] = [
  {
    title: { hinglish: 'Input h', english: 'Input h' },
    description: { hinglish: 'LayerNorm ke baad hidden state.', english: 'Hidden state after LayerNorm.' },
    formula: 'h ∈ ℝᴰ',
    values: 'h = [0.5, -0.3, 0.8, 0.1] (D=4 toy)',
    shapes: 'h: (D,)',
  },
  {
    title: { hinglish: 'W₁ expand', english: 'W₁ expand' },
    description: { hinglish: 'D → 4D projection.', english: 'D → 4D projection.' },
    formula: 'z = h · W₁ + b₁',
    values: 'z = [1.2, -0.3, 0.8, 0.1, ...] (4D)',
    shapes: 'W₁: (D, 4D)',
  },
  {
    title: { hinglish: 'GELU', english: 'GELU' },
    description: { hinglish: 'Non-linearity — ReLU se smooth.', english: 'Non-linearity — smoother than ReLU.' },
    formula: 'GELU(x) = x·Φ(x)',
    values: 'GELU(1.2)=1.03, GELU(-0.3)=-0.12',
    shapes: 'element-wise',
  },
  {
    title: { hinglish: 'W₂ project', english: 'W₂ project' },
    description: { hinglish: '4D → D back.', english: '4D → D back.' },
    formula: 'out = GELU(z) · W₂',
    values: 'out = [0.42, 0.18, 0.55, 0.09]',
    shapes: 'W₂: (4D, D)',
  },
]

const embeddingsDryRun: AnimDryRun[] = [
  {
    title: { hinglish: 'Token IDs', english: 'Token IDs' },
    description: { hinglish: 'Vocabulary se integer IDs.', english: 'Integer IDs from vocabulary.' },
    formula: 'ids = tokenizer(text)',
    values: '"cat" → 891, "sat" → 1204',
    shapes: 'seq_len integers',
  },
  {
    title: { hinglish: 'Lookup E', english: 'Lookup E' },
    description: { hinglish: 'Embedding matrix se row fetch.', english: 'Fetch row from embedding matrix.' },
    formula: 'X = E[ids]',
    values: 'E[891]=[0.21,0.88,0.45]\nE[1204]=[0.76,0.12,0.33]',
    shapes: 'E: (V, D)',
  },
  {
    title: { hinglish: 'Stack X', english: 'Stack X' },
    description: { hinglish: 'Sequence matrix ban jati hai.', english: 'Forms the sequence matrix.' },
    formula: 'X = stack(embeddings)',
    values: 'X = [[0.21,0.88,0.45],[0.76,0.12,0.33]]',
    shapes: 'X: (N, D)',
  },
  {
    title: { hinglish: 'Learned weights', english: 'Learned weights' },
    description: { hinglish: 'Training mein E update hoti hai.', english: 'E updates during training.' },
    formula: 'E ← E − lr·∇E',
    values: 'E[891,0]: 0.210 → 0.208',
    shapes: 'E: (V, D)',
  },
]

const gradientDescentDryRun: AnimDryRun[] = [
  {
    title: { hinglish: 'Forward pass', english: 'Forward pass' },
    description: { hinglish: 'Input pass karke prediction aur loss compute.', english: 'Pass input, compute prediction and loss.' },
    formula: 'loss = CE(pred, target)',
    values: 'pred="banana", target="milk", loss=2.4',
    shapes: 'scalar loss',
  },
  {
    title: { hinglish: 'Gradient ∇L', english: 'Gradient ∇L' },
    description: { hinglish: 'Backprop se har parameter ka gradient.', english: 'Backprop gives gradient per parameter.' },
    formula: '∂L/∂w',
    values: '∇w = -0.03',
    shapes: 'same shape as w',
  },
  {
    title: { hinglish: 'ONE parameter update', english: 'ONE parameter update' },
    description: { hinglish: 'Ek parameter manually dekho change hote hue.', english: 'Watch one parameter change manually.' },
    formula: 'w_new = w - η·∇w',
    values: 'w: 0.42 → 0.45 (η=0.1)',
    shapes: 'scalar',
  },
  {
    title: { hinglish: 'Loss decreases', english: 'Loss decreases' },
    description: { hinglish: 'Update ke baad loss kam.', english: 'Loss drops after update.' },
    formula: 'L_after < L_before',
    values: '2.4 → 2.1',
    shapes: 'scalar',
  },
  {
    title: { hinglish: 'Repeat ×1000s', english: 'Repeat ×1000s' },
    description: { hinglish: 'Timeline pe parameters converge.', english: 'Parameters converge over timeline.' },
    formula: 'for t in 1..T: θ -= η∇L',
    values: 'T=1000+ iterations',
    shapes: 'all parameters',
  },
  {
    title: { hinglish: 'Converged', english: 'Converged' },
    description: { hinglish: 'Weights ab better predictions dete hain.', english: 'Weights now give better predictions.' },
    formula: 'pred ≈ target',
    values: 'pred="milk" ✓',
    shapes: '—',
  },
]

const DRY_RUN_MAP: Record<string, AnimDryRun[]> = {
  'transformer-flow': pipelineWalkthrough,
  annoy: annoyDryRun,
  hnsw: hnswDryRun,
  'kv-cache': kvCacheDryRun,
  'layer-normalization': layerNormDryRun,
  'feed-forward': feedForwardDryRun,
  embeddings: embeddingsDryRun,
  'gradient-descent': gradientDescentDryRun,
  backpropagation: gradientDescentDryRun,
}

function labToDryRun(lab: LabStep): AnimDryRun {
  return {
    title: lab.title,
    description: {
      hinglish: `${lab.title.hinglish} — numbers neeche verify karo.`,
      english: `${lab.title.english} — verify the numbers below.`,
    },
    formula: lab.formula,
    values: `${lab.work}\n→ ${lab.result}`,
    shapes: lab.shapes,
  }
}

;(['q-k-v', 'attention-mechanism', 'wq-wk-wv', 'softmax', 'masked-attention', 'multihead-attention', 'prediction', 'why-vectors'] as const).forEach((id) => {
  const lab = getLabForConcept(id)
  if (lab) DRY_RUN_MAP[id] = lab.map(labToDryRun)
})

export function getDryRunStepCount(concept: Concept): number {
  const computeSteps = COMPUTE_STEP_OVERRIDE[concept.id]
  if (computeSteps) return computeSteps
  const custom = DRY_RUN_MAP[concept.id]
  if (custom) return Math.max(custom.length, concept.steps.length)
  const lab = getLabForConcept(concept.id)
  if (lab) return Math.max(lab.length, concept.steps.length)
  return concept.steps.length
}

export function getDryRunForConcept(concept: Concept, step: number): AnimDryRun {
  const custom = DRY_RUN_MAP[concept.id]
  if (custom?.length) return custom[step % custom.length]

  const lab = getLabForConcept(concept.id) ?? getDefaultLab()
  const labStep = lab[step % lab.length]
  if (labStep && !custom) return labToDryRun(labStep)

  const s = concept.steps[step % Math.max(concept.steps.length, 1)]
  return {
    title: s?.title ?? { hinglish: `Step ${step + 1}`, english: `Step ${step + 1}` },
    description: {
      hinglish: s?.caption?.hinglish ?? concept.tagline.hinglish,
      english: s?.caption?.english ?? concept.tagline.english,
    },
    formula: concept.teaching?.mathematicalDerivation?.english?.split('\n')[0] ?? concept.id,
    values: concept.teaching?.numericalExample?.english?.slice(0, 400) ?? s?.caption.english ?? '',
    shapes: concept.teaching?.matrixDimensions?.english?.split('\n')[0] ?? '—',
  }
}
