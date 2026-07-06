import type { Bilingual, BilingualList, ConceptTeaching } from '../../types/concept'

export function bi(hinglish: string, english: string): Bilingual {
  return { hinglish, english }
}

export function teaching(block: Partial<ConceptTeaching>): Partial<ConceptTeaching> {
  const recap = block.recap ?? block.summary
  const build = block.buildFromScratch ?? block.dryRun
  return {
    whyFirst: block.whyFirst ?? block.intuition ?? bi('', ''),
    ...block,
    buildFromScratch: build ?? bi('', ''),
    recap: recap ?? bi('', ''),
    mathematicalDerivation: block.mathematicalDerivation ?? bi('', ''),
    commonQuestions: block.commonQuestions ?? { hinglish: [], english: [] },
    internalMemory: block.internalMemory ?? bi('', ''),
    productionEngineering: block.productionEngineering ?? bi('', ''),
  }
}

/** Full 12-section teaching block — use for flagship chapters */
export function fullTeaching(t: {
  whyFirst: Bilingual
  intuition: Bilingual
  problem: Bilingual
  whyInvented: Bilingual
  buildFromScratch: Bilingual
  derivation: Bilingual
  matrixShapes: Bilingual
  numerical: Bilingual
  commonQuestions: BilingualList
  internalMemory: Bilingual
  production: Bilingual
  interview: BilingualList
  mistakes: BilingualList
  recap: Bilingual
  ascii: Bilingual
}): ConceptTeaching {
  return {
    whyFirst: t.whyFirst,
    intuition: t.intuition,
    problemStatement: t.problem,
    whyInvented: t.whyInvented,
    buildFromScratch: t.buildFromScratch,
    mathematicalDerivation: t.derivation,
    matrixDimensions: t.matrixShapes,
    numericalExample: t.numerical,
    commonQuestions: t.commonQuestions,
    internalMemory: t.internalMemory,
    productionEngineering: t.production,
    interviewQuestions: t.interview,
    commonMistakes: t.mistakes,
    recap: t.recap,
    asciiDiagram: t.ascii,
  }
}

export const defaultInterview = (hinglish: string[], english: string[]): BilingualList => ({
  hinglish,
  english,
})

export const defaultMistakes = (hinglish: string[], english: string[]): BilingualList => ({
  hinglish,
  english,
})

export const defaultQuestions = (hinglish: string[], english: string[]): BilingualList => ({
  hinglish,
  english,
})
