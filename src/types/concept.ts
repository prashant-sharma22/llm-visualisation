export type Lang = 'hinglish' | 'english'

export interface Bilingual {
  hinglish: string
  english: string
}

export interface BilingualList {
  hinglish: string[]
  english: string[]
}

export interface ConceptStep {
  title: Bilingual
  caption: Bilingual
  /** Why this step exists — shown in animation overlay */
  why?: Bilingual
}

/** 12-section university teaching format + why-first */
export interface ConceptTeaching {
  /** Shown FIRST before any formula — the "kyun?" block */
  whyFirst: Bilingual
  intuition: Bilingual
  problemStatement: Bilingual
  whyInvented: Bilingual
  buildFromScratch: Bilingual
  mathematicalDerivation: Bilingual
  matrixDimensions: Bilingual
  numericalExample: Bilingual
  commonQuestions: BilingualList
  internalMemory: Bilingual
  productionEngineering: Bilingual
  interviewQuestions: BilingualList
  commonMistakes: BilingualList
  recap: Bilingual
  asciiDiagram: Bilingual
  /** Legacy aliases — mapped into buildFromScratch / recap if partial */
  dryRun?: Bilingual
  summary?: Bilingual
}

export type VisualizationMode =
  | 'animation'
  | 'analogy'
  | 'matrix'
  | 'tensor'
  | 'gpu'
  | 'code'
  | 'neural'
  | 'math'
  | 'cartoon'
  | 'playground'

export interface Concept {
  id: string
  sectionId: string
  title: Bilingual
  duration: string
  tagline: Bilingual
  intro: Bilingual
  explanation: Bilingual
  keyPoints: BilingualList
  analogy: Bilingual
  steps: ConceptStep[]
  teaching?: Partial<ConceptTeaching>
}

export interface CurriculumSection {
  id: string
  title: Bilingual
  order: number
}
