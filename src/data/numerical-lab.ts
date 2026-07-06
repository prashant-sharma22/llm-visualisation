import type { Bilingual } from '../types/concept'

export interface LabStep {
  title: Bilingual
  formula: string
  work: string
  result: string
  shapes: string
}

const attentionPipeline: LabStep[] = [
  {
    title: { hinglish: 'Input X (embeddings)', english: 'Input X (embeddings)' },
    formula: 'X = token embeddings',
    work: 'Token₀ "The" → [1, 0]\nToken₁ "cat" → [0, 1]\n(d=2 toy example)',
    result: 'X = [[1,0], [0,1]]  shape (2×2)',
    shapes: 'X: (N, D) = (2, 2)',
  },
  {
    title: { hinglish: 'Q = X · Wq', english: 'Q = X · Wq' },
    formula: 'Q = X × Wq',
    work: 'Wq = I (identity for simplicity)\n[1,0]×I = [1,0]\n[0,1]×I = [0,1]',
    result: 'Q = [[1,0], [0,1]]',
    shapes: 'X(2×2) · Wq(2×2) = Q(2×2)',
  },
  {
    title: { hinglish: 'K = X · Wk', english: 'K = X · Wk' },
    formula: 'K = X × Wk',
    work: 'Wk = I\nK = X = [[1,0], [0,1]]',
    result: 'K = [[1,0], [0,1]]',
    shapes: 'K: (2×2)',
  },
  {
    title: { hinglish: 'V = X · Wv', english: 'V = X · Wv' },
    formula: 'V = X × Wv',
    work: 'Wv = I\nV = X',
    result: 'V = [[1,0], [0,1]]',
    shapes: 'V: (2×2)',
  },
  {
    title: { hinglish: 'Scores = Q · Kᵀ', english: 'Scores = Q · Kᵀ' },
    formula: 'S = Q × Kᵀ',
    work: 'Row0: [1,0]·[1,0]=1, [1,0]·[0,1]=0\nRow1: [0,1]·[1,0]=0, [0,1]·[0,1]=1',
    result: 'S = [[1, 0], [0, 1]]',
    shapes: 'Q(2×2) · Kᵀ(2×2) = S(2×2)',
  },
  {
    title: { hinglish: 'Scale ÷ √d', english: 'Scale ÷ √d' },
    formula: "S' = S / √2",
    work: '1/1.414 = 0.707\n0/1.414 = 0',
    result: "S' = [[0.707, 0], [0, 0.707]]",
    shapes: 'd=2, √d=1.414',
  },
  {
    title: { hinglish: 'Softmax (row-wise)', english: 'Softmax (row-wise)' },
    formula: 'A = softmax(S\')',
    work: 'Row0: exp(0.707)=2.03, exp(0)=1\nsum=3.03 → [0.67, 0.33]',
    result: 'A ≈ [[0.67, 0.33], [0.33, 0.67]]',
    shapes: 'Each row sums to 1.0',
  },
  {
    title: { hinglish: 'Output = A · V', english: 'Output = A · V' },
    formula: 'O = A × V',
    work: 'Row0: 0.67×[1,0]+0.33×[0,1]=[0.67,0.33]',
    result: 'O ≈ [[0.67, 0.33], [0.33, 0.67]]',
    shapes: 'A(2×2) · V(2×2) = O(2×2)',
  },
]

const softmaxLab: LabStep[] = [
  {
    title: { hinglish: 'Raw scores', english: 'Raw scores' },
    formula: 'x = [2.0, 1.0, 0.1]',
    work: 'Attention se aaye raw dot products',
    result: 'x = [2.0, 1.0, 0.1]',
    shapes: 'vector (3,)',
  },
  {
    title: { hinglish: 'exp(x)', english: 'exp(x)' },
    formula: 'e_i = exp(x_i)',
    work: 'exp(2)=7.39, exp(1)=2.72, exp(0.1)=1.11',
    result: 'e = [7.39, 2.72, 1.11]',
    shapes: 'element-wise',
  },
  {
    title: { hinglish: 'Normalize', english: 'Normalize' },
    formula: 'p_i = e_i / Σe',
    work: 'sum = 7.39+2.72+1.11 = 11.22',
    result: 'p = [0.659, 0.242, 0.099]',
    shapes: 'Σp = 1.000 ✓',
  },
]

const kvCacheLab: LabStep[] = [
  {
    title: { hinglish: 'Token 1: "The"', english: 'Token 1: "The"' },
    formula: 'Compute K₁, V₁',
    work: 'Forward pass position 1\nStore in cache',
    result: 'cache_K = [K₁], cache_V = [V₁]',
    shapes: 'cache: (1, d)',
  },
  {
    title: { hinglish: 'Token 2: "cat"', english: 'Token 2: "cat"' },
    formula: 'Append K₂, V₂ only',
    work: 'K₁, V₁ NOT recomputed\nOnly new K₂, V₂ computed',
    result: 'cache_K = [K₁, K₂]',
    shapes: 'cache grows: (2, d)',
  },
  {
    title: { hinglish: 'Decode: "sat"', english: 'Decode: "sat"' },
    formula: 'Q_new × cache_Kᵀ',
    work: 'Q_sat fresh compute\nK₁,K₂ from cache',
    result: 'Attention over full cache',
    shapes: 'Q: (1,d), K_cache: (2,d)',
  },
  {
    title: { hinglish: 'Q NOT cached', english: 'Q NOT cached' },
    formula: 'Only latest Q needed',
    work: 'Old Q₁ never reused at decode\nOnly Q_sat matters',
    result: 'Q cache = wasteful ✗',
    shapes: 'Q: (1,d) temporary',
  },
]

const vectorBasicsLab: LabStep[] = [
  {
    title: { hinglish: 'Vector v = [3, 4]', english: 'Vector v = [3, 4]' },
    formula: 'v = [v₁, v₂]',
    work: 'X = 3, Y = 4\nOrdered list — order matters!',
    result: 'v = [3, 4]',
    shapes: '2D vector (2,)',
  },
  {
    title: { hinglish: 'Magnitude |v|', english: 'Magnitude |v|' },
    formula: '|v| = √(v₁² + v₂²)',
    work: '3² = 9, 4² = 16\n9 + 16 = 25',
    result: '|v| = √25 = 5',
    shapes: 'scalar (length)',
  },
  {
    title: { hinglish: 'Dot product A·B', english: 'Dot product A·B' },
    formula: 'A·B = a₁b₁ + a₂b₂',
    work: 'A=[1,0], B=[0.9,0.1]\n1×0.9 + 0×0.1 = 0.9',
    result: 'A·B = 0.9',
    shapes: 'scalar similarity hint',
  },
  {
    title: { hinglish: 'Cosine similarity', english: 'Cosine similarity' },
    formula: 'cos(A,B) = (A·B) / (|A||B|)',
    work: '|A|=1, |B|≈0.905\ncos = 0.9/0.905',
    result: 'cos ≈ 0.99 (very similar)',
    shapes: 'range [-1, 1]',
  },
]

const LAB_MAP: Record<string, LabStep[]> = {
  'what-is-ai': vectorBasicsLab.slice(0, 1),
  'what-is-vector': vectorBasicsLab.slice(0, 2),
  'why-vectors': vectorBasicsLab,
  'vectors-in-ai': vectorBasicsLab,
  'similarity-distance': vectorBasicsLab.slice(1),
  'llm-introduction': attentionPipeline.slice(0, 3),
  'q-k-v': attentionPipeline,
  'attention-mechanism': attentionPipeline,
  'wq-wk-wv': attentionPipeline.slice(0, 4),
  softmax: softmaxLab,
  'kv-cache': kvCacheLab,
  'masked-attention': attentionPipeline,
  'multihead-attention': attentionPipeline,
  prediction: [
    {
      title: { hinglish: 'Last hidden h', english: 'Last hidden h' },
      formula: 'h = H[-1]',
      work: '"The cat" → last position vector\nh = [0.5, 0.8] (toy)',
      result: 'h shape (2,)',
      shapes: 'h: (D,)',
    },
    {
      title: { hinglish: 'Linear → logits', english: 'Linear → logits' },
      formula: 'logits = h · W_out',
      work: 'W_out maps D → vocab\n3 tokens toy vocab',
      result: 'logits = [1.2, 0.3, 2.1]',
      shapes: 'W_out: (D, V)',
    },
    {
      title: { hinglish: 'Softmax → probs', english: 'Softmax → probs' },
      formula: 'p = softmax(logits)',
      work: 'Highest logit=2.1 → "sat"',
      result: 'p ≈ [0.20, 0.10, 0.70]',
      shapes: 'p: (V,), sum=1',
    },
  ],
}

export function getLabForConcept(id: string): LabStep[] | null {
  return LAB_MAP[id] ?? null
}

export function getDefaultLab(): LabStep[] {
  return attentionPipeline
}
