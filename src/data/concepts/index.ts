import { introConcepts } from './intro-prerequisites'
import { vectorSearchConcepts } from './vector-search'
import { foundationConcepts } from './foundations'
import { transformerFundamentalConcepts } from './transformer-fundamentals'
import { advancedConcepts } from './advanced-topics'
import { extendedConcepts } from './extended-topics'
import { transformerConcepts } from './transformers'
import { coreOptimizationConcepts } from './core-optimizations'
import { tradeoffConcepts } from './tradeoffs'
import { reasoningConcepts } from './reasoning'
import { agentConcepts } from './agents'
import { enrichConceptTeaching } from './teaching-enricher'
import type { Concept } from '../../types/concept'

const INTRO_ORDER = [
  'what-is-ai',
  'what-is-vector',
  'why-vectors',
  'vectors-in-ai',
  'similarity-distance',
  'llm-introduction',
  'course-roadmap',
] as const

function orderIntroConcepts(concepts: Concept[]): Concept[] {
  const byId = new Map(concepts.map((c) => [c.id, c]))
  return INTRO_ORDER.map((id) => byId.get(id)).filter((c): c is Concept => Boolean(c))
}

const rawConcepts: Concept[] = [
  ...orderIntroConcepts(introConcepts),
  ...vectorSearchConcepts,
  ...foundationConcepts,
  ...transformerFundamentalConcepts,
  ...advancedConcepts,
  ...extendedConcepts,
  ...transformerConcepts,
  ...coreOptimizationConcepts,
  ...tradeoffConcepts,
  ...reasoningConcepts,
  ...agentConcepts,
]

/** Every chapter gets full 12-section university teaching + per-step "kyun?" */
export const allConcepts: Concept[] = rawConcepts.map(enrichConceptTeaching)

export function getConceptById(id: string): Concept | undefined {
  return allConcepts.find((c) => c.id === id)
}

export function getConceptsBySection(sectionId: string): Concept[] {
  return allConcepts.filter((c) => c.sectionId === sectionId)
}
