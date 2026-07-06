import { allConcepts } from '../data/concepts'
import { sections } from '../data/curriculum'
import type { Bilingual, BilingualList, Concept, ConceptTeaching, Lang } from '../types/concept'

export interface SearchMatch {
  field: string
  snippet: string
}

export interface SearchResult {
  conceptId: string
  sectionId: string
  sectionTitle: Bilingual
  title: Bilingual
  tagline: Bilingual
  score: number
  matches: SearchMatch[]
}

const FIELD_WEIGHTS: Record<string, number> = {
  title: 12,
  tagline: 8,
  intro: 5,
  explanation: 4,
  analogy: 3,
  keyPoint: 3,
  step: 2,
  teaching: 3,
}

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*/g, '')
    .replace(/`{1,3}/g, '')
    .replace(/#{1,6}\s/g, '')
    .replace(/\|/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function collectStrings(value: unknown, out: string[]): void {
  if (!value) return
  if (typeof value === 'string') {
    out.push(stripMarkdown(value))
    return
  }
  if (Array.isArray(value)) {
    value.forEach((v) => collectStrings(v, out))
    return
  }
  if (typeof value === 'object') {
    Object.values(value as Record<string, unknown>).forEach((v) => collectStrings(v, out))
  }
}

function bilingualText(b: Bilingual, lang: Lang): string {
  return lang === 'hinglish' ? b.hinglish : b.english
}

function bilingualListText(b: BilingualList, lang: Lang): string {
  return (lang === 'hinglish' ? b.hinglish : b.english).join(' ')
}

interface IndexedField {
  field: string
  text: string
  weight: number
}

function indexConcept(concept: Concept, lang: Lang): IndexedField[] {
  const fields: IndexedField[] = [
    { field: 'title', text: bilingualText(concept.title, lang), weight: FIELD_WEIGHTS.title },
    { field: 'tagline', text: bilingualText(concept.tagline, lang), weight: FIELD_WEIGHTS.tagline },
    { field: 'intro', text: bilingualText(concept.intro, lang), weight: FIELD_WEIGHTS.intro },
    { field: 'explanation', text: bilingualText(concept.explanation, lang), weight: FIELD_WEIGHTS.explanation },
    { field: 'analogy', text: bilingualText(concept.analogy, lang), weight: FIELD_WEIGHTS.analogy },
    {
      field: 'keyPoint',
      text: bilingualListText(concept.keyPoints, lang),
      weight: FIELD_WEIGHTS.keyPoint,
    },
  ]

  concept.steps.forEach((step, i) => {
    fields.push({
      field: `step:${i + 1}`,
      text: `${bilingualText(step.title, lang)} ${bilingualText(step.caption, lang)}${step.why ? ` ${bilingualText(step.why, lang)}` : ''}`,
      weight: FIELD_WEIGHTS.step,
    })
  })

  const teaching = concept.teaching
  if (teaching) {
    const teachingTexts: string[] = []
    collectStrings(teaching as ConceptTeaching, teachingTexts)
    fields.push({
      field: 'teaching',
      text: teachingTexts.join(' '),
      weight: FIELD_WEIGHTS.teaching,
    })
  }

  return fields
}

function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .map((t) => t.trim())
    .filter((t) => t.length >= 2)
}

function snippetAround(text: string, term: string, radius = 60): string {
  const lower = text.toLowerCase()
  const idx = lower.indexOf(term.toLowerCase())
  if (idx === -1) return text.slice(0, radius * 2)
  const start = Math.max(0, idx - radius)
  const end = Math.min(text.length, idx + term.length + radius)
  const prefix = start > 0 ? '…' : ''
  const suffix = end < text.length ? '…' : ''
  return `${prefix}${text.slice(start, end)}${suffix}`
}

function scoreField(text: string, terms: string[], weight: number): { score: number; term?: string } {
  const lower = text.toLowerCase()
  let score = 0
  let bestTerm: string | undefined

  for (const term of terms) {
    if (!term) continue
    if (lower === term) {
      score += weight * 4
      bestTerm = term
      continue
    }
    if (lower.startsWith(term)) {
      score += weight * 2.5
      bestTerm = term
      continue
    }
    const count = lower.split(term).length - 1
    if (count > 0) {
      score += weight * (1 + Math.min(count, 3) * 0.5)
      bestTerm = term
    }
  }

  return { score, term: bestTerm }
}

const sectionById = new Map(sections.map((s) => [s.id, s]))

export function searchConcepts(query: string, lang: Lang, limit = 20): SearchResult[] {
  const terms = tokenize(query)
  if (terms.length === 0) return []

  const results: SearchResult[] = []

  for (const concept of allConcepts) {
    const fields = indexConcept(concept, lang)
    let totalScore = 0
    const matches: SearchMatch[] = []

    for (const field of fields) {
      const { score, term } = scoreField(field.text, terms, field.weight)
      if (score > 0 && term) {
        totalScore += score
        if (matches.length < 3) {
          matches.push({
            field: field.field,
            snippet: snippetAround(field.text, term),
          })
        }
      }
    }

    // Also search alternate language with lower weight
    if (lang === 'hinglish') {
      const enFields = indexConcept(concept, 'english')
      for (const field of enFields) {
        const { score } = scoreField(field.text, terms, field.weight * 0.35)
        totalScore += score
      }
    } else {
      const hiFields = indexConcept(concept, 'hinglish')
      for (const field of hiFields) {
        const { score } = scoreField(field.text, terms, field.weight * 0.35)
        totalScore += score
      }
    }

    if (totalScore > 0) {
      const section = sectionById.get(concept.sectionId)
      results.push({
        conceptId: concept.id,
        sectionId: concept.sectionId,
        sectionTitle: section?.title ?? { hinglish: concept.sectionId, english: concept.sectionId },
        title: concept.title,
        tagline: concept.tagline,
        score: totalScore,
        matches,
      })
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit)
}
