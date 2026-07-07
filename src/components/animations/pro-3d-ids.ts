/** Topics that use WebGL (React Three Fiber) — spatial algorithms only */
export const PRO_3D_CONCEPT_IDS = new Set([
  'kd-tree',
  'annoy',
  'hnsw',
  'vector-databases',
])

export function isPro3DConcept(id: string) {
  return PRO_3D_CONCEPT_IDS.has(id)
}
