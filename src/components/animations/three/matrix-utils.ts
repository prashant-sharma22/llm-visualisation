/** Deterministic pseudo-values for matrix cells (visual only) */
export function cellValue(row: number, col: number, seed = 0): number {
  const v = Math.sin((row + 1) * 12.9898 + (col + 1) * 78.233 + seed) * 43758.5453
  return (v - Math.floor(v)) * 2 - 1
}

export function valueColor(v: number, highlight = false): string {
  if (highlight) return '#fbbf24'
  if (v > 0.35) return '#22d3ee'
  if (v < -0.35) return '#f472b6'
  return '#6366f1'
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}
