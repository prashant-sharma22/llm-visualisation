import type { Bilingual, BilingualList, Concept, ConceptStep, ConceptTeaching } from '../../types/concept'
import { hasMatrixTeaching, hasNumericalLab } from '../../data/content-scope'
import { getLabForConcept } from '../../data/numerical-lab'
import { bi, defaultMistakes } from './teaching-utils'

function hasText(b?: Bilingual) {
  return Boolean(b?.hinglish?.trim() || b?.english?.trim())
}

function enrichSteps(concept: Concept): ConceptStep[] {
  return concept.steps.map((step, i) => {
    if (step.why && hasText(step.why)) return step
    const title = step.title.hinglish
    return {
      ...step,
      why: bi(
        `**Kyun step ${i + 1}?** "${title}" ke bina ${concept.title.hinglish} ka flow adhoora rehta hai — har animation step isliye hai taaki tum dekh sako kya change hua aur KYUN.`,
        `**Why step ${i + 1}?** Without "${step.title.english}", the ${concept.title.english} flow is incomplete — each step shows what changed and WHY.`
      ),
    }
  })
}

function defaultWhyFirst(c: Concept): Bilingual {
  return bi(
    `**Pehle kyun samjho?** ${c.title.hinglish} tabhi matter karta hai jab tum samjho isse PEHLE kya problem thi. ${c.tagline.hinglish} — yeh sirf definition nahi, ek **problem ka solution** hai. Formula se pehle yeh "kyun" clear karo.`,
    `**Why first?** ${c.title.english} only matters when you understand the problem before it. ${c.tagline.english} — not just a definition, but a **solution to a problem**. Clear this "why" before any formula.`
  )
}

function defaultIntuition(c: Concept): Bilingual {
  return bi(
    `${c.analogy.hinglish}\n\n15 saal ke level pe: ${c.intro.hinglish}`,
    `${c.analogy.english}\n\nAt a 15-year-old level: ${c.intro.english}`
  )
}

function defaultBuild(c: Concept): Bilingual {
  return bi(
    `**Zero se build:**\n1. Problem dekho — ${c.tagline.hinglish}\n2. Input kya hai? (tensors, data)\n3. Kya operation hota hai? (step-by-step)\n4. Output kya milta hai?\n5. Training/inference mein kab use hota hai?\n\n${c.explanation.hinglish.split('\n').slice(0, 8).join('\n')}`,
    `**Build from scratch:**\n1. See the problem — ${c.tagline.english}\n2. What is the input?\n3. What operations happen step by step?\n4. What is the output?\n5. When is it used in training/inference?\n\n${c.explanation.english.split('\n').slice(0, 8).join('\n')}`
  )
}

function defaultDerivation(c: Concept): Bilingual {
  return bi(
    `**Derivation / formula flow** (har multiplication explain):\n\n${c.explanation.hinglish}\n\n**Yaad rakho:** Har matrix multiply mein shapes match honi chahiye — inner dimensions same. Transpose (ᵀ) rows↔columns swap karta hai.`,
    `**Derivation / formula flow:**\n\n${c.explanation.english}\n\n**Remember:** Inner dimensions must match in every matrix multiply. Transpose (ᵀ) swaps rows and columns.`
  )
}

function defaultMatrix(c: Concept): Bilingual | undefined {
  if (!hasMatrixTeaching(c.id)) return undefined
  return bi(
    `**Matrix shapes** for ${c.title.hinglish}:\n\nInput → operation → output\n\nHar step pe shape likho — galat shape = galat multiply.\nDetail is topic ki explanation aur Playground mein.`,
    `**Matrix shapes** for ${c.title.english}:\n\nInput → operation → output\n\nWrite shape at every step — wrong shape = wrong multiply.\nSee this topic's explanation and Playground for details.`
  )
}

function defaultNumerical(c: Concept): Bilingual | undefined {
  if (!hasNumericalLab(c.id)) return undefined
  const lab = getLabForConcept(c.id)
  if (!lab?.length) return undefined
  const lines = lab.map((s, i) => {
    const title = s.title.hinglish
    return `**Step ${i + 1}: ${title}**\n${s.formula}\n${s.work}\n→ ${s.result}\n(${s.shapes})`
  })
  const linesEn = lab.map((s, i) => {
    const title = s.title.english
    return `**Step ${i + 1}: ${title}**\n${s.formula}\n${s.work}\n→ ${s.result}\n(${s.shapes})`
  })
  const sentence = c.id === 'q-k-v' || c.id === 'attention-mechanism' ? '"The cat drinks milk"' : 'toy example'
  return {
    hinglish: `**Hand-calculated example** (${sentence}, d=2):\n\n${lines.join('\n\n')}\n\nPlayground tab mein step-by-step explore karo.`,
    english: `**Hand-calculated example** (${sentence}, d=2):\n\n${linesEn.join('\n\n')}\n\nExplore step-by-step in the Playground tab.`,
  }
}

function defaultCommonQs(c: Concept): BilingualList {
  return {
    hinglish: c.keyPoints.hinglish.slice(0, 4).map((p, i) => `**Q:** ${p}?\n**A:** ${c.keyPoints.english[i] ?? c.explanation.hinglish.split('\n')[0]}`),
    english: c.keyPoints.english.slice(0, 4).map((p) => `**Q:** ${p}?\n**A:** See full explanation above.`),
  }
}

function defaultMemory(c: Concept): Bilingual {
  return bi(
    `**Internal memory / tensors:**\n• **Trainable (GPU, persistent):** weight matrices — training tak update\n• **Temporary (forward):** activations — backprop ke liye store, phir free\n• **Cached (inference):** KV cache jahan relevant\n• **CPU:** optimizer states, checkpoints\n\n${c.id} ke context mein neeche production section dekho.`,
    `**Tensors:**\n• **Trainable:** weight matrices\n• **Temporary:** activations for backprop\n• **Cached:** KV cache where relevant\n• **CPU:** optimizer states, checkpoints`
  )
}

function defaultProduction(c: Concept): Bilingual {
  return bi(
    `**Production (OpenAI / Anthropic / Meta / Google):**\n• Same math, optimized kernels (CUDA, Triton)\n• Mixed precision BF16/FP8 on H100\n• vLLM / TensorRT-LLM serving\n• Tradeoff: memory vs latency vs quality\n\n${c.title.hinglish} industry stacks mein integrated — exact implementation proprietary lekin principles same.`,
    `**Production:** Optimized CUDA/Triton kernels, BF16/FP8, vLLM/TensorRT-LLM. Same principles across OpenAI, Anthropic, Meta, Google.`
  )
}

function defaultInterview(c: Concept): BilingualList {
  return {
    hinglish: [
      `**Basic:** ${c.title.hinglish} kya hai? → ${c.tagline.hinglish}`,
      `**Intermediate:** ${c.keyPoints.hinglish[0] ?? 'Explain the core mechanism'}`,
      `**Advanced:** Production tradeoffs aur failure modes?`,
      `**FAANG:** Design system using ${c.title.hinglish} — latency/memory estimate?`,
    ],
    english: [
      `**Basic:** What is ${c.title.english}? → ${c.tagline.english}`,
      `**Intermediate:** ${c.keyPoints.english[0] ?? 'Explain the core mechanism'}`,
      `**Advanced:** Production tradeoffs and failure modes?`,
      `**FAANG:** Design a system using this — latency/memory estimate?`,
    ],
  }
}

function defaultMistakesFor(c: Concept): BilingualList {
  return defaultMistakes(
    [
      `Sirf formula ratna — "kyun" skip karna (sabse common!)`,
      `Matrix dimensions skip karna — shape mismatch samajhna`,
      `Training aur inference confuse karna`,
      ...(c.keyPoints.hinglish.length ? [`"${c.keyPoints.hinglish[0]}" ignore karna`] : []),
    ],
    [
      'Memorizing formulas without understanding why (most common!)',
      'Skipping matrix dimensions — shape mismatch',
      'Confusing training vs inference',
      ...(c.keyPoints.english.length ? [`Ignoring: "${c.keyPoints.english[0]}"`] : []),
    ]
  )
}

function defaultRecap(c: Concept): Bilingual {
  return bi(
    `**Flowchart:** Input → [${c.title.hinglish}] → Output\n**Mindmap:** Problem → Intuition → Math → Shapes → Production\n**Cheat sheet:** ${c.keyPoints.hinglish.join(' | ')}\n**Revision:** ${c.tagline.hinglish}`,
    `**Flow:** Input → [${c.title.english}] → Output\n**Cheat sheet:** ${c.keyPoints.english.join(' | ')}\n**Revision:** ${c.tagline.english}`
  )
}

function defaultAscii(c: Concept): Bilingual {
  const steps = c.steps.map((s) => s.title.hinglish).join('\n   ↓\n')
  return bi(`Input\n   ↓\n${steps}\n   ↓\nOutput`, `Input\n   ↓\n${c.steps.map((s) => s.title.english).join('\n   ↓\n')}\n   ↓\nOutput`)
}

function mergeTeaching(concept: Concept): Partial<ConceptTeaching> {
  const t = concept.teaching ?? {}
  return {
    whyFirst: hasText(t.whyFirst) ? t.whyFirst : defaultWhyFirst(concept),
    intuition: hasText(t.intuition) ? t.intuition : defaultIntuition(concept),
    problemStatement: hasText(t.problemStatement)
      ? t.problemStatement
      : bi(
          `**Problem:** ${concept.tagline.hinglish} Iske bina systems slow, inaccurate, ya scale nahi karte.`,
          `**Problem:** ${concept.tagline.english} Without this, systems are slow, inaccurate, or don't scale.`
        ),
    whyInvented: hasText(t.whyInvented)
      ? t.whyInvented
      : bi(
          'Research + industry need ne ye technique develop ki — pehle brute force / naive approach fail ho raha tha. Timeline aur paper detail full explanation mein.',
          'Developed when naive approaches failed — see full explanation for papers and timeline.'
        ),
    buildFromScratch: hasText(t.buildFromScratch) ? t.buildFromScratch : defaultBuild(concept),
    mathematicalDerivation: hasText(t.mathematicalDerivation) ? t.mathematicalDerivation : defaultDerivation(concept),
    matrixDimensions: hasText(t.matrixDimensions) ? t.matrixDimensions : defaultMatrix(concept),
    numericalExample: hasText(t.numericalExample)
      ? t.numericalExample
      : defaultNumerical(concept),
    commonQuestions:
      t.commonQuestions && t.commonQuestions.hinglish.length > 0
        ? t.commonQuestions
        : defaultCommonQs(concept),
    internalMemory: hasText(t.internalMemory) ? t.internalMemory : defaultMemory(concept),
    productionEngineering: hasText(t.productionEngineering) ? t.productionEngineering : defaultProduction(concept),
    interviewQuestions:
      t.interviewQuestions && t.interviewQuestions.hinglish.length > 0 ? t.interviewQuestions : defaultInterview(concept),
    commonMistakes:
      t.commonMistakes && t.commonMistakes.hinglish.length > 0 ? t.commonMistakes : defaultMistakesFor(concept),
    recap: hasText(t.recap) ? t.recap : hasText(t.summary) ? t.summary : defaultRecap(concept),
    asciiDiagram: hasText(t.asciiDiagram) ? t.asciiDiagram : defaultAscii(concept),
    dryRun: t.dryRun,
    summary: t.summary,
  }
}

/** Ensures every concept has full 12-section university teaching + step-level why */
export function enrichConceptTeaching(concept: Concept): Concept {
  return {
    ...concept,
    steps: enrichSteps(concept),
    teaching: mergeTeaching(concept),
  }
}
