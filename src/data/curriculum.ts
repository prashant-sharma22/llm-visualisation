import type { CurriculumSection } from '../types/concept'

export const sections: CurriculumSection[] = [
  {
    id: 'intro',
    order: 1,
    title: { hinglish: 'Shuruat — Vectors, AI & LLM Intro', english: 'Getting Started — Vectors, AI & LLM Intro' },
  },
  {
    id: 'vector-search',
    order: 2,
    title: { hinglish: 'Vector Search Algorithms', english: 'Vector Search Algorithms' },
  },
  {
    id: 'foundations',
    order: 3,
    title: { hinglish: 'Vector DB & Foundations', english: 'Vector DB & Foundations' },
  },
  {
    id: 'transformer-fundamentals',
    order: 4,
    title: { hinglish: 'Transformer Fundamentals (Zero se)', english: 'Transformer Fundamentals (From Zero)' },
  },
  {
    id: 'architecture',
    order: 5,
    title: { hinglish: 'Architecture Deep Dive', english: 'Architecture Deep Dive' },
  },
  {
    id: 'transformers',
    order: 6,
    title: { hinglish: 'Transformers Deep Dive', english: 'Transformers Deep Dive' },
  },
  {
    id: 'training',
    order: 7,
    title: { hinglish: 'Training & Fine-Tuning', english: 'Training & Fine-Tuning' },
  },
  {
    id: 'core-optimizations',
    order: 8,
    title: { hinglish: 'Core Optimizations', english: 'Core Optimizations' },
  },
  {
    id: 'inference',
    order: 9,
    title: { hinglish: 'Inference Pipeline', english: 'Inference Pipeline' },
  },
  {
    id: 'tradeoffs',
    order: 10,
    title: { hinglish: 'Tradeoffs in LLMs', english: 'Tradeoffs in LLMs' },
  },
  {
    id: 'alignment',
    order: 11,
    title: { hinglish: 'Alignment & Safety', english: 'Alignment & Safety' },
  },
  {
    id: 'reasoning',
    order: 12,
    title: { hinglish: 'Reasoning in LLMs', english: 'Reasoning in LLMs' },
  },
  {
    id: 'agents',
    order: 13,
    title: { hinglish: 'MCP, Agents & Practical Apps', english: 'MCP, Agents & Practical Applications' },
  },
]
