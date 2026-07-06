import type { Concept } from '../../types/concept'

export const tradeoffConcepts: Concept[] = [
  {
    id: 'quantization',
    sectionId: 'tradeoffs',
    title: { hinglish: 'Quantization', english: 'Quantization' },
    duration: '3m',
    tagline: {
      hinglish: 'FP32 weights ko INT8/INT4 mein compress karo — chhoti memory, fast inference',
      english: 'Compress FP32 weights to INT8/INT4 — smaller memory, faster inference',
    },
    intro: {
      hinglish:
        'LLM weights normally 16-bit (FP16/BF16) ya 32-bit (FP32) mein store hote hain. Quantization inhe lower precision integers mein convert karta hai — model size aur latency dono kam.',
      english:
        'LLM weights are normally stored in 16-bit (FP16/BF16) or 32-bit (FP32). Quantization converts them to lower-precision integers — reducing both model size and latency.',
    },
    explanation: {
      hinglish: `**Types:**
- **PTQ (Post-Training Quantization):** Trained model ko quantize — fast, thoda accuracy loss
- **QAT (Quantization-Aware Training):** Training ke dauran quantize simulate — better accuracy
- **GPTQ, AWQ, GGUF:** Popular algorithms/frameworks

**Precision levels:**
| Format | Bits | Size vs FP16 |
| FP16  | 16   | 1x (baseline) |
| INT8  | 8    | 2x smaller    |
| INT4  | 4    | 4x smaller    |

**How it works:** Float range ko discrete buckets mein map karo. Har weight ek integer + scale factor.

**Tradeoffs:**
- ✅ 2-4x memory reduction, faster on supported hardware
- ❌ Slight quality degradation (especially INT4)
- ❌ Outliers sensitive — ek bada weight sabko affect kar sakta

**Real use:** Llama.cpp (GGUF), Ollama local models, mobile deployment, edge inference.`,
      english: `**Types:**
- **PTQ:** Quantize after training — fast, some accuracy loss
- **QAT:** Simulate quantization during training — better accuracy
- **GPTQ, AWQ, GGUF:** Popular algorithms/frameworks

**Precision levels:**
| Format | Bits | Size vs FP16 |
| FP16  | 16   | 1x (baseline) |
| INT8  | 8    | 2x smaller    |
| INT4  | 4    | 4x smaller    |

**How:** Map float range to discrete buckets. Each weight = integer + scale factor.

**Tradeoffs:**
- ✅ 2-4x memory reduction, faster on supported hardware
- ❌ Slight quality degradation (especially INT4)
- ❌ Outlier-sensitive — one large weight can affect the bucket

**Real use:** Llama.cpp (GGUF), Ollama, mobile, edge inference.`,
    },
    keyPoints: {
      hinglish: ['FP16 → INT8/INT4 compression', 'PTQ fast, QAT accurate', 'GGUF local inference ke liye popular', 'Quality vs size tradeoff'],
      english: ['FP16 → INT8/INT4 compression', 'PTQ fast, QAT accurate', 'GGUF popular for local inference', 'Quality vs size tradeoff'],
    },
    analogy: {
      hinglish: 'HD photo ko JPEG compress karna — file chhoti, thodi detail loss, lekin mostly same dikhta hai.',
      english: 'Compressing an HD photo to JPEG — smaller file, slight detail loss, but mostly looks the same.',
    },
    steps: [
      { title: { hinglish: 'Float weights', english: 'Float weights' }, caption: { hinglish: 'Original FP16/FP32 model', english: 'Original FP16/FP32 model' } },
      { title: { hinglish: 'Calibrate range', english: 'Calibrate range' }, caption: { hinglish: 'Min/max ya percentile find karo', english: 'Find min/max or percentiles' } },
      { title: { hinglish: 'Map to integers', english: 'Map to integers' }, caption: { hinglish: 'Weights → INT buckets', english: 'Weights → INT buckets' } },
      { title: { hinglish: 'Scale factors', english: 'Scale factors' }, caption: { hinglish: 'Dequantize ke liye scale store', english: 'Store scale for dequantization' } },
      { title: { hinglish: 'Fast inference', english: 'Fast inference' }, caption: { hinglish: 'Integer math = faster GPU ops', english: 'Integer math = faster GPU ops' } },
    ],
  },
  {
    id: 'sparse-attention',
    sectionId: 'tradeoffs',
    title: { hinglish: 'Sparse Attention', english: 'Sparse Attention' },
    duration: '5m',
    tagline: {
      hinglish: 'Har token ko har token se connect mat karo — sirf important connections',
      english: 'Don\'t connect every token to every token — only important connections',
    },
    intro: {
      hinglish:
        'Full attention O(n²) hai. Sparse attention patterns use karta hai jahan sirf kuch token pairs attend karte hain — local windows, strided, random, ya learned patterns.',
      english:
        'Full attention is O(n²). Sparse attention uses patterns where only some token pairs attend — local windows, strided, random, or learned patterns.',
    },
    explanation: {
      hinglish: `**Patterns:**
- **Sliding window:** Sirf nearby k tokens (Mistral 7B: window=4096)
- **Strided:** Har k-th token (Longformer)
- **Global tokens:** Kuch special tokens sabse connect (Longformer CLS)
- **Learned sparse:** Model khud pattern seekhe (Routing Transformer)

**Long context ke liye critical:** 100K+ tokens pe dense attention impossible.

**Examples:**
- Mistral: Sliding Window Attention (SWA)
- Longformer, BigBird: Research architectures
- NSA (Native Sparse Attention): DeepSeek's approach

**Tradeoff:** Speed ↑, memory ↓, lekin kuch long-range dependencies miss ho sakti hain. Hybrid approaches common — local + few global.`,
      english: `**Patterns:**
- **Sliding window:** Only nearby k tokens (Mistral 7B: window=4096)
- **Strided:** Every k-th token (Longformer)
- **Global tokens:** Special tokens connect to all (Longformer CLS)
- **Learned sparse:** Model learns pattern (Routing Transformer)

**Critical for long context:** Dense attention is impossible at 100K+ tokens.

**Examples:**
- Mistral: Sliding Window Attention (SWA)
- Longformer, BigBird: Research architectures
- NSA: DeepSeek's Native Sparse Attention

**Tradeoff:** Faster, less memory, but some long-range deps may be missed. Hybrids are common — local + few global.`,
    },
    keyPoints: {
      hinglish: ['O(n²) → O(n√n) ya O(n log n)', 'Sliding window production mein common', 'Long context ke liye zaroori', 'Global + local hybrid best practice'],
      english: ['O(n²) → O(n√n) or O(n log n)', 'Sliding window common in production', 'Necessary for long context', 'Global + local hybrid is best practice'],
    },
    analogy: {
      hinglish: 'WhatsApp group mein tum sabse baat nahi karte — nearby friends + kuch important log. Sparse attention bhi selective connections hai.',
      english: 'In a group chat you don\'t talk to everyone — nearby friends plus a few important people. Sparse attention is selective connection.',
    },
    steps: [
      { title: { hinglish: 'Full matrix', english: 'Full matrix' }, caption: { hinglish: 'Dense n×n — expensive', english: 'Dense n×n — expensive' } },
      { title: { hinglish: 'Pattern choose', english: 'Choose pattern' }, caption: { hinglish: 'Window / strided / global', english: 'Window / strided / global' } },
      { title: { hinglish: 'Mask sparse', english: 'Sparse mask' }, caption: { hinglish: 'Sirf allowed pairs compute', english: 'Compute only allowed pairs' } },
      { title: { hinglish: 'Reduced compute', english: 'Reduced compute' }, caption: { hinglish: 'Bahut kam operations', english: 'Far fewer operations' } },
      { title: { hinglish: 'Long context', english: 'Long context' }, caption: { hinglish: '100K+ tokens feasible', english: '100K+ tokens feasible' } },
    ],
  },
  {
    id: 'slm-distillation',
    sectionId: 'tradeoffs',
    title: { hinglish: 'SLM & Distillation', english: 'SLM & Distillation' },
    duration: '5m',
    tagline: {
      hinglish: 'Bade teacher model se chhota student model seekhao — mobile/edge ke liye',
      english: 'Teach a small student from a large teacher — for mobile and edge',
    },
    intro: {
      hinglish:
        'Knowledge Distillation mein bada "teacher" model chhote "student" ko train karta hai. SLM (Small Language Models) — Phi, Gemma 2B, Llama 3.2 1B — distillation se bante hain.',
      english:
        'In Knowledge Distillation, a large teacher trains a smaller student. SLMs — Phi, Gemma 2B, Llama 3.2 1B — are often built via distillation.',
    },
    explanation: {
      hinglish: `**Distillation process:**
1. Teacher model predictions (soft labels) generate karo
2. Student ko teacher ke outputs match karne train karo
3. Hard labels (ground truth) + soft labels dono use — "dark knowledge" transfer

**Dark knowledge:** Teacher ke probability distribution mein subtle info — sirf top class nahi, runner-ups bhi matter.

**SLM use cases:**
- On-device (phone, laptop without GPU)
- Low latency applications
- Privacy — data local rahe
- Cost — cloud API calls kam

**Techniques:**
- Response distillation
- Chain-of-thought distillation (reasoning transfer)
- Layer-wise distillation

**Tradeoff:** Size ↓↓↓, speed ↑↑, capability ↓ (but surprisingly good for size)`,
      english: `**Process:**
1. Generate teacher predictions (soft labels)
2. Train student to match teacher outputs
3. Use hard labels + soft labels — transfer "dark knowledge"

**Dark knowledge:** Teacher probabilities carry subtle info — not just top class, runners-up matter too.

**SLM use cases:**
- On-device (phone, laptop without GPU)
- Low latency
- Privacy — data stays local
- Cost — fewer cloud API calls

**Techniques:**
- Response distillation
- Chain-of-thought distillation
- Layer-wise distillation

**Tradeoff:** Much smaller, much faster, less capable (but surprisingly good for size).`,
    },
    keyPoints: {
      hinglish: ['Teacher → Student knowledge transfer', 'Soft labels mein zyada info', 'Phi, Gemma SLM examples', 'On-device AI ka foundation'],
      english: ['Teacher → Student knowledge transfer', 'More info in soft labels', 'Phi, Gemma are SLM examples', 'Foundation of on-device AI'],
    },
    analogy: {
      hinglish: 'Senior engineer junior ko mentor karta hai — poora experience nahi, lekin key patterns sikha deta hai. Distillation wahi hai models ke beech.',
      english: 'A senior mentors a junior — not full experience, but key patterns. Distillation is the same between models.',
    },
    steps: [
      { title: { hinglish: 'Teacher inference', english: 'Teacher inference' }, caption: { hinglish: 'Bade model se soft predictions', english: 'Soft predictions from large model' } },
      { title: { hinglish: 'Soft labels', english: 'Soft labels' }, caption: { hinglish: 'Probability distribution capture', english: 'Capture probability distribution' } },
      { title: { hinglish: 'Student training', english: 'Student training' }, caption: { hinglish: 'Chhota model teacher ko mimic', english: 'Small model mimics teacher' } },
      { title: { hinglish: 'Dark knowledge', english: 'Dark knowledge' }, caption: { hinglish: 'Subtle patterns transfer', english: 'Subtle patterns transfer' } },
      { title: { hinglish: 'Deploy SLM', english: 'Deploy SLM' }, caption: { hinglish: 'Fast, small, on-device ready', english: 'Fast, small, on-device ready' } },
    ],
  },
  {
    id: 'speculative-decoding',
    sectionId: 'tradeoffs',
    title: { hinglish: 'Speculative Decoding', english: 'Speculative Decoding' },
    duration: '4m',
    tagline: {
      hinglish: 'Chhota draft model guess kare, bada model verify kare — 2-3x faster generation',
      english: 'Small draft model guesses, large model verifies — 2-3x faster generation',
    },
    intro: {
      hinglish:
        'Autoregressive generation slow hai kyunki har token sequentially aata hai. Speculative decoding ek chhota fast "draft" model kuch tokens predict karta hai, phir bada "target" model ek saath verify karta hai.',
      english:
        'Autoregressive generation is slow because each token comes sequentially. Speculative decoding has a small fast draft model predict several tokens, then the large target model verifies them in parallel.',
    },
    explanation: {
      hinglish: `**Flow:**
1. Draft model (e.g. 1B): next γ tokens predict karo — fast
2. Target model (e.g. 70B): sab γ tokens parallel verify — single forward pass
3. Jitne tokens match → accept. Pehla mismatch → reject, wahan se continue
4. Repeat

**Kyun fast?** Target model ka expensive forward pass se multiple tokens milte hain jab draft sahi ho.

**Acceptance rate:** Draft model target jaisa hona chahiye — same tokenizer, similar distribution. Typically 60-80% tokens accept.

**Variants:**
- Medusa: Multiple decoding heads
- Lookahead decoding
- EAGLE: Draft with feature-level prediction

**vLLM, TensorRT-LLM:** Production mein integrated.`,
      english: `**Flow:**
1. Draft model (e.g. 1B): predict next γ tokens — fast
2. Target model (e.g. 70B): verify all γ in parallel — one forward pass
3. Accept matching tokens; on first mismatch, reject and continue
4. Repeat

**Why faster?** One expensive target forward pass yields multiple tokens when draft is right.

**Acceptance rate:** Draft should match target — same tokenizer, similar distribution. Often 60-80% accepted.

**Variants:** Medusa, Lookahead, EAGLE

**Production:** vLLM, TensorRT-LLM integrate this.`,
    },
    keyPoints: {
      hinglish: ['Draft + Verify pattern', '2-3x speedup typical', 'Lossless — same output distribution', 'Draft model quality matters'],
      english: ['Draft + Verify pattern', '2-3x typical speedup', 'Lossless — same output distribution', 'Draft model quality matters'],
    },
    analogy: {
      hinglish: 'Intern pehle draft likhe, manager ek baar mein review kare — agar sahi hai toh fast, galat pe correct karo.',
      english: 'Intern writes draft, manager reviews once — if correct, fast; if wrong, correct and continue.',
    },
    steps: [
      { title: { hinglish: 'Draft predicts γ', english: 'Draft predicts γ' }, caption: { hinglish: 'Small model fast tokens generate', english: 'Small model generates tokens fast' } },
      { title: { hinglish: 'Target verifies', english: 'Target verifies' }, caption: { hinglish: 'Big model parallel check', english: 'Big model parallel check' } },
      { title: { hinglish: 'Accept/reject', english: 'Accept/reject' }, caption: { hinglish: 'Match → accept, else stop', english: 'Match → accept, else stop' } },
      { title: { hinglish: 'Continue', english: 'Continue' }, caption: { hinglish: 'Reject point se dubara', english: 'Resume from reject point' } },
      { title: { hinglish: 'Speedup', english: 'Speedup' }, caption: { hinglish: 'Multiple tokens per target pass', english: 'Multiple tokens per target pass' } },
    ],
  },
]
