import { lazy, type ComponentType } from 'react'
import { getComputeAnimation } from '../compute/registry'
import { FlashAttentionAnim, PagedAttentionAnim, MoEAnim } from './optimization-anims'
import { QuantizationAnim, SparseAttentionAnim, DistillationAnim, SpeculativeDecodingAnim } from './tradeoff-anims'
import {
  RLHFAnim,
  ChainOfThoughtAnim,
  ToolUsageAnim,
  TreeOfThoughtAnim,
  ContextEngineeringAnim,
  AIAgentsAnim,
  MCPAnim,
} from './reasoning-agent-anims'
import {
  WhatIsAIAnim,
  WhatIsVectorAnim,
  WhyVectorsAnim,
  VectorsInAIAnim,
  SimilarityDistanceAnim,
  LLMIntroAnim,
  CourseRoadmapAnim,
} from './intro-anims'
import { GenericConceptAnim } from './foundation-anims'
import {
  ResidualAnim,
  RoPEAnim,
  GQAAnim,
  BertGptAnim,
  CrossEntropyAnim,
  LoRAAnim,
  TokenSamplingAnim,
  RAGAnim,
  DPOAnim,
  PositionalEncodingAnim,
  ALiBiAnim,
  CrossAttentionAnim,
  AdamAnim,
  PrefixCacheAnim,
  TensorParallelAnim,
  BeamSearchAnim,
  ModernLLMAnim,
} from './advanced-anims'

type AnimComponent = ComponentType<{ step: number }>

type Pro3DExport = typeof import('./pro-3d-anims')

function lazy3D(name: keyof Pro3DExport): AnimComponent {
  return lazy(() => import('./pro-3d-anims').then((m) => ({ default: m[name] }))) as AnimComponent
}

const KDTreeAnim3D = lazy3D('KDTreeAnim3D')
const HNSWAnim3D = lazy3D('HNSWAnim3D')
const VectorDBAnim3D = lazy3D('VectorDBAnim3D')
const AnnoyAnim3D = lazy3D('AnnoyAnim3D')

/** Fallback 2D registry for topics without compute viz */
const registry: Record<string, AnimComponent> = {
  'what-is-ai': WhatIsAIAnim,
  'what-is-vector': WhatIsVectorAnim,
  'why-vectors': WhyVectorsAnim,
  'vectors-in-ai': VectorsInAIAnim,
  'similarity-distance': SimilarityDistanceAnim,
  'llm-introduction': LLMIntroAnim,
  'course-roadmap': CourseRoadmapAnim,
  'kd-tree': KDTreeAnim3D,
  annoy: AnnoyAnim3D,
  hnsw: HNSWAnim3D,
  'vector-databases': VectorDBAnim3D,
  'flash-attention': FlashAttentionAnim,
  'paged-attention': PagedAttentionAnim,
  'mixture-of-experts': MoEAnim,
  quantization: QuantizationAnim,
  'sparse-attention': SparseAttentionAnim,
  'slm-distillation': DistillationAnim,
  'speculative-decoding': SpeculativeDecodingAnim,
  'rlhf-reasoning': RLHFAnim,
  'chain-of-thought': ChainOfThoughtAnim,
  'tool-usage': ToolUsageAnim,
  'tree-of-thought': TreeOfThoughtAnim,
  'context-engineering': ContextEngineeringAnim,
  'ai-agents': AIAgentsAnim,
  'model-context-protocol': MCPAnim,
  'residual-connections': ResidualAnim,
  rope: RoPEAnim,
  'gqa-mqa': GQAAnim,
  'bert-vs-gpt': BertGptAnim,
  'cross-entropy-loss': CrossEntropyAnim,
  'lora-finetuning': LoRAAnim,
  'token-sampling': TokenSamplingAnim,
  rag: RAGAnim,
  dpo: DPOAnim,
  'absolute-positional-encoding': PositionalEncodingAnim,
  alibi: ALiBiAnim,
  'cross-attention': CrossAttentionAnim,
  'adam-optimizer': AdamAnim,
  'prefix-cache': PrefixCacheAnim,
  'tensor-parallelism': TensorParallelAnim,
  'beam-search': BeamSearchAnim,
  'logits-perplexity': CrossEntropyAnim,
  'hallucination-safety': RAGAnim,
  'modern-llm-architectures': ModernLLMAnim,
}

export function getAnimationForConcept(id: string): AnimComponent {
  const compute = getComputeAnimation(id)
  if (compute) return compute
  return registry[id] ?? GenericConceptAnim
}
