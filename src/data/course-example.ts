/** Canonical sentence used across the entire course */
export const COURSE_SENTENCE = 'The cat drinks milk'

export const TOKENS = ['The', 'cat', 'drinks', 'milk'] as const
export const TOKEN_IDS = [10, 21, 8, 17] as const
export const D_MODEL = 2
export const N_TOKENS = 4

/** Vocabulary embedding table (subset of rows) */
export const EMBEDDING_TABLE: Record<number, [number, number]> = {
  10: [0.9, 0.1], // The
  21: [0.2, 0.8], // cat
  8: [0.5, 0.5], // drinks
  17: [0.1, 0.9], // milk
}

/** Stacked embedding matrix X (N × D) */
export const X: number[][] = TOKEN_IDS.map((id) => [...EMBEDDING_TABLE[id]])

/** Pre-existing trainable weight matrices (D × D) */
export const WQ: number[][] = [
  [0.3, 0.5],
  [0.2, -0.4],
]
export const WK: number[][] = [
  [0.6, 0.1],
  [0.3, 0.7],
]
export const WV: number[][] = [
  [0.4, 0.2],
  [0.1, 0.8],
]

export const Q: number[][] = [
  [0.29, 0.41],
  [0.22, -0.22],
  [0.25, 0.05],
  [0.21, -0.31],
]
export const K: number[][] = [
  [0.57, 0.16],
  [0.36, 0.58],
  [0.45, 0.4],
  [0.33, 0.64],
]
export const V: number[][] = [
  [0.37, 0.26],
  [0.16, 0.68],
  [0.25, 0.5],
  [0.13, 0.74],
]

/** Raw attention scores S = Q·Kᵀ (before scale) — row 0 example highlighted in lessons */
export const SCORES_RAW: number[][] = [
  [0.36, 0.24, 0.31, 0.36],
  [0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0],
]

/** After ÷√d where d=2, √d≈1.414 */
export const SCORES_SCALED: number[][] = [
  [0.25, 0.17, 0.22, 0.25],
  [0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0],
]

/** Softmax row 0 (toy) */
export const SOFTMAX_ROW = { raw: [7, 2, 5], exp: [1096.6, 7.4, 148.4], probs: [0.87, 0.01, 0.12] }

export function matMul(A: number[][], B: number[][]): number[][] {
  const rows = A.length
  const cols = B[0].length
  const inner = B.length
  const out = Array.from({ length: rows }, () => Array(cols).fill(0))
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      for (let k = 0; k < inner; k++) out[i][j] += A[i][k] * B[k][j]
    }
  }
  return out
}

export function dot(a: number[], b: number[]): number {
  return a.reduce((s, v, i) => s + v * b[i], 0)
}

export function fmt(n: number, digits = 2): string {
  return n.toFixed(digits)
}
