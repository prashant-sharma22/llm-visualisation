import type { Concept } from '../../types/concept'
import { bi, teaching, defaultQuestions } from './teaching-utils'

export const transformerConcepts: Concept[] = [
  {
    id: 'masked-attention',
    sectionId: 'transformers',
    title: { hinglish: 'Masked Attention', english: 'Masked Attention' },
    duration: '5m',
    tagline: {
      hinglish: 'Decoder sirf past tokens dekh sakta hai — future cheat nahi kar sakta',
      english: 'The decoder can only look at past tokens — no peeking at the future',
    },
    intro: {
      hinglish:
        'Masked Attention woh mechanism hai jisse language model training ke time pe future words ko "hide" kar deta hai. Matlab jab model word-by-word predict karta hai, toh usko sirf left side ke tokens dikhte hain — right side masked rehta hai.',
      english:
        'Masked Attention is the mechanism that hides future words during language model training. When the model predicts word-by-word, it only sees tokens on the left — the right side stays masked.',
    },
    explanation: {
      hinglish: `Imagine tum ek sentence likh rahe ho: "The cat sat on the ___". Jab tum "mat" likhne wale ho, tumhe pehle ke words pata hain — "The cat sat on the" — lekin aage ka word nahi pata.

Masked Attention exactly yahi karta hai mathematically. Attention matrix mein upper triangle ko −∞ (negative infinity) set kar dete hain, taaki softmax ke baad un positions ka weight 0 ho jaye.

**Formula flow:**
1. Query (Q), Key (K), Value (V) matrices banate hain
2. Scores = Q × Kᵀ / √d
3. Mask apply → future positions = −∞
4. Softmax → sirf valid positions ko probability
5. Output = weights × V

**Kyun zaroori hai?** Autoregressive generation mein model ko causal structure chahiye — har token sirf apne predecessors par depend kare. Bina mask ke model "cheat" karke future dekh lega aur training mein unrealistic accuracy milegi jo inference pe fail ho jayegi.

GPT, LLaMA, sab decoder-only models masked (causal) attention use karte hain. BERT jaise encoder models iske opposite use karte hain — unmasked bidirectional attention.`,
      english: `Imagine writing: "The cat sat on the ___". When you're about to write "mat", you know the earlier words but not what comes next.

Masked Attention does exactly this mathematically. The upper triangle of the attention matrix is set to −∞ so softmax zeroes out those positions.

**Formula flow:**
1. Build Query (Q), Key (K), Value (V) matrices
2. Scores = Q × Kᵀ / √d
3. Apply mask → future positions = −∞
4. Softmax → probabilities only on valid positions
5. Output = weights × V

**Why it matters:** Autoregressive generation needs causal structure — each token depends only on predecessors. Without masking, the model cheats by seeing the future, getting unrealistic training accuracy that fails at inference.

GPT, LLaMA, and other decoder-only models use masked (causal) attention. Encoder models like BERT use the opposite — unmasked bidirectional attention.`,
    },
    keyPoints: {
      hinglish: [
        'Causal mask upper triangle ko block karta hai',
        'Autoregressive models (GPT) is par based hain',
        'Training aur inference dono mein same causal rule',
        'Softmax ke baad masked positions ka weight = 0',
      ],
      english: [
        'Causal mask blocks the upper triangle',
        'Autoregressive models (GPT) are built on this',
        'Same causal rule in training and inference',
        'After softmax, masked positions have weight = 0',
      ],
    },
    analogy: {
      hinglish:
        'Jaise exam mein tum sirf apne tak ke questions dekh sakte ho, aage wale section band rehte hain — masked attention bhi future tokens ko "band section" treat karta hai.',
      english:
        'Like an exam where you only see questions up to your page — masked attention treats future tokens as a locked section.',
    },
    steps: [
      {
        title: { hinglish: 'Input tokens', english: 'Input tokens' },
        caption: {
          hinglish: 'Sentence tokens mein break hoti hai',
          english: 'Sentence is split into tokens',
        },
      },
      {
        title: { hinglish: 'Q, K, V compute', english: 'Compute Q, K, V' },
        caption: {
          hinglish: 'Har token se Query, Key, Value nikalte hain',
          english: 'Query, Key, Value are derived from each token',
        },
      },
      {
        title: { hinglish: 'Attention scores', english: 'Attention scores' },
        caption: {
          hinglish: 'Har pair ka relevance score calculate',
          english: 'Relevance score for every pair is calculated',
        },
      },
      {
        title: { hinglish: 'Mask apply', english: 'Apply mask' },
        caption: {
          hinglish: 'Future positions ko −∞ se block',
          english: 'Future positions blocked with −∞',
        },
      },
      {
        title: { hinglish: 'Weighted output', english: 'Weighted output' },
        caption: {
          hinglish: 'Sirf past tokens se final representation',
          english: 'Final representation from past tokens only',
        },
      },
    ],
  },
  {
    id: 'multihead-attention',
    sectionId: 'transformers',
    title: { hinglish: 'Multi-Head Attention', english: 'Multi-Head Attention' },
    duration: '4m',
    tagline: {
      hinglish: 'Ek attention se zyada — parallel heads alag-alag patterns seekhte hain',
      english: 'More than one attention — parallel heads learn different patterns',
    },
    intro: {
      hinglish:
        'Single attention ek hi type ka relationship dekh sakta hai. Multi-Head Attention multiple "heads" parallel chalata hai — har head alag subspace mein alag patterns capture karta hai: syntax, semantics, long-range dependencies, etc.',
      english:
        'A single attention head can only capture one kind of relationship. Multi-Head Attention runs multiple heads in parallel — each head captures different patterns in a different subspace: syntax, semantics, long-range dependencies, etc.',
    },
    explanation: {
      hinglish: `Transformer paper ne prove kiya ki ek hi attention head limited hai. Isliye hum **h heads** parallel chalate hain.

**Process step-by-step:**
1. Input X ko h alag linear projections se Qᵢ, Kᵢ, Vᵢ banate hain
2. Har head independently: Attention(Qᵢ, Kᵢ, Vᵢ) = softmax(QᵢKᵢᵀ/√dₖ)Vᵢ
3. Sab heads ka output concatenate: Concat(head₁, ..., headₕ)
4. Final linear projection: Wᴼ se mix karke output

**dₖ = d_model / h** — har head chhoti dimension mein kaam karta hai taaki total compute manageable rahe.

**Real example:** Head 1 verb-object relationship pakad sakta hai ("cat → sat"), Head 2 pronoun reference ("it → cat"), Head 3 punctuation patterns. Model training mein automatically ye roles assign ho jate hain — hum manually define nahi karte.

**Compute cost:** h heads = h times attention compute, lekin parallel GPU pe efficiently run hota hai. Typical values: 8, 16, 32, 64 heads depending on model size.`,
      english: `The original Transformer paper showed one head is limited. So we run **h heads** in parallel.

**Step-by-step:**
1. Project input X into h separate Qᵢ, Kᵢ, Vᵢ via linear layers
2. Each head independently: Attention(Qᵢ, Kᵢ, Vᵢ) = softmax(QᵢKᵢᵀ/√dₖ)Vᵢ
3. Concatenate all heads: Concat(head₁, ..., headₕ)
4. Final linear projection Wᴼ mixes them into output

**dₖ = d_model / h** — each head works in a smaller dimension to keep total compute manageable.

**Real example:** Head 1 might capture verb-object ("cat → sat"), Head 2 pronoun reference ("it → cat"), Head 3 punctuation. Roles emerge during training — we don't define them manually.

**Compute:** h heads means h attention passes, but GPUs run them efficiently in parallel. Typical: 8, 16, 32, or 64 heads depending on model size.`,
    },
    keyPoints: {
      hinglish: [
        'Har head alag representation subspace',
        'Concat + linear projection se merge',
        'Syntax, semantics, coreference alag heads mein',
        'd_model = h × d_head typically',
      ],
      english: [
        'Each head uses a different representation subspace',
        'Merged via concat + linear projection',
        'Syntax, semantics, coreference in different heads',
        'Typically d_model = h × d_head',
      ],
    },
    analogy: {
      hinglish:
        'Jaise ek news story ko 8 reporters alag angles se cover karte hain — politics, sports angle, human interest — multi-head attention bhi ek sentence ko multiple "angles" se dekhta hai.',
      english:
        'Like eight reporters covering one story from different angles — multi-head attention views a sentence from multiple perspectives.',
    },
    steps: [
      {
        title: { hinglish: 'Input embedding', english: 'Input embedding' },
        caption: {
          hinglish: 'Tokens ko vectors mein convert',
          english: 'Convert tokens to vectors',
        },
      },
      {
        title: { hinglish: 'h projections', english: 'h projections' },
        caption: {
          hinglish: 'Har head ke liye alag Q, K, V',
          english: 'Separate Q, K, V for each head',
        },
      },
      {
        title: { hinglish: 'Parallel attention', english: 'Parallel attention' },
        caption: {
          hinglish: 'Sab heads simultaneously compute',
          english: 'All heads compute simultaneously',
        },
      },
      {
        title: { hinglish: 'Concatenate', english: 'Concatenate' },
        caption: {
          hinglish: 'Sab head outputs join karo',
          english: 'Join all head outputs',
        },
      },
      {
        title: { hinglish: 'Output projection', english: 'Output projection' },
        caption: {
          hinglish: 'Wᴼ se final mixed representation',
          english: 'Final mixed representation via Wᴼ',
        },
      },
    ],
  },
  {
    id: 'kv-cache',
    sectionId: 'transformers',
    title: { hinglish: 'KV Cache (Key-Value Cache)', english: 'KV Cache (Key-Value Cache)' },
    duration: '6m',
    tagline: {
      hinglish: 'Pehle compute kiye Keys & Values ko store karo — har naye token pe dubara mat banao',
      english: 'Store previously computed Keys & Values — don\'t recompute them for every new token',
    },
    intro: {
      hinglish:
        'KV Cache inference ka sabse important optimization hai. Jab LLM ek-ek karke tokens generate karta hai, har step pe attention chahiye hota hai. Bina cache ke poora sequence dubara process hota — bahut slow. KV Cache pehle ke K aur V tensors save karke reuse karta hai.',
      english:
        'KV Cache is the most important inference optimization. When an LLM generates tokens one by one, each step needs attention. Without cache, the full sequence is reprocessed — very slow. KV Cache saves and reuses previous K and V tensors.',
    },
    explanation: {
      hinglish: `**Problem:** Token 1 generate → attention over [T1]. Token 2 generate → attention over [T1, T2]. Token 100 generate → attention over [T1...T100]. Matlab har naye token pe **poora prefix dubara** compute hota — O(n²) total work generation ke liye.

**Solution — KV Cache:**
- Step 1: "The" process → K₁, V₁ cache mein store
- Step 2: "cat" process → sirf naya K₂, V₂ compute, cache mein append. Attention: Q₂ × [K₁,K₂]ᵀ
- Step n: sirf Kₙ, Vₙ naya compute, baaki cache se

**Memory cost:** Cache size = 2 × layers × heads × seq_len × head_dim × bytes_per_param. 7B model, 4K context ≈ few hundred MB to GB depending on precision.

**PagedAttention (vLLM):** KV cache ko fixed blocks mein divide karta hai jaise OS virtual memory — fragmentation kam, batching better.

**Tradeoff:** Speed ↑↑ lekin GPU memory ↑. Long context = zyada cache = zyada VRAM. Isliye context length limits exist karte hain.

**Prefill vs Decode:**
- **Prefill:** Poora prompt ek saath — parallel, cache build hota hai
- **Decode:** Ek token at a time — cache reuse, bottleneck yahi hai`,
      english: `**Problem:** Generate token 1 → attention over [T1]. Token 2 → [T1, T2]. Token 100 → [T1...T100]. Every new token recomputes the **entire prefix** — O(n²) total work for generation.

**Solution — KV Cache:**
- Step 1: process "The" → store K₁, V₁ in cache
- Step 2: process "cat" → only compute new K₂, V₂, append to cache. Attention: Q₂ × [K₁,K₂]ᵀ
- Step n: only new Kₙ, Vₙ computed, rest from cache

**Memory cost:** Cache size = 2 × layers × heads × seq_len × head_dim × bytes. A 7B model at 4K context can use hundreds of MB to GB depending on precision.

**PagedAttention (vLLM):** Divides KV cache into fixed blocks like OS virtual memory — less fragmentation, better batching.

**Tradeoff:** Much faster but more GPU memory. Longer context = larger cache = more VRAM. That's why context limits exist.

**Prefill vs Decode:**
- **Prefill:** Full prompt at once — parallel, builds cache
- **Decode:** One token at a time — cache reuse, this is the bottleneck`,
    },
    keyPoints: {
      hinglish: [
        'Inference speed ke liye critical optimization',
        'Har layer, har head ka K aur V store hota hai',
        'Prefill = cache build, Decode = cache reuse',
        'Memory vs speed tradeoff — long context = zyada VRAM',
      ],
      english: [
        'Critical optimization for inference speed',
        'K and V stored for every layer and head',
        'Prefill = build cache, Decode = reuse cache',
        'Memory vs speed tradeoff — long context needs more VRAM',
      ],
    },
    analogy: {
      hinglish:
        'Jaise tum essay likhte waqt har line pe poora essay dubara mat likho — sirf nayi line add karo, purani lines notebook mein saved hain. KV Cache wahi notebook hai.',
      english:
        'Like writing an essay — don\'t rewrite the whole thing each line, just add the new line while earlier lines stay saved. KV Cache is that notebook.',
    },
    steps: [
      {
        title: { hinglish: 'Token 1 generate', english: 'Generate token 1' },
        caption: {
          hinglish: 'K₁, V₁ compute aur cache mein save',
          english: 'Compute K₁, V₁ and save to cache',
        },
      },
      {
        title: { hinglish: 'Token 2 generate', english: 'Generate token 2' },
        caption: {
          hinglish: 'Sirf naya K₂, V₂ — purana cache reuse',
          english: 'Only new K₂, V₂ — reuse old cache',
        },
      },
      {
        title: { hinglish: 'Attention with cache', english: 'Attention with cache' },
        caption: {
          hinglish: 'Q_new × [K_cache]ᵀ — fast lookup',
          english: 'Q_new × [K_cache]ᵀ — fast lookup',
        },
      },
      {
        title: { hinglish: 'Layer-wise storage', english: 'Layer-wise storage' },
        caption: {
          hinglish: 'Har transformer layer apna cache rakhta hai',
          english: 'Each transformer layer keeps its own cache',
        },
      },
      {
        title: { hinglish: 'Memory growth', english: 'Memory growth' },
        caption: {
          hinglish: 'Sequence lamba → cache bada → VRAM pressure',
          english: 'Longer sequence → larger cache → VRAM pressure',
        },
      },
    ],
    teaching: teaching({
      whyFirst: bi(
        '**Pehle kyun?** Generation mein har naya token poora prefix dubara compute karna O(N²) waste hai. KV Cache isliye bana — K aur V ek baar compute, baar baar reuse. Q cache nahi kyunki sirf **current token** ko purane keys se match karna hai.',
        '**Why first?** Recomputing full prefix each token is O(N²) waste. KV Cache stores K,V for reuse. Q not cached — only current token queries past keys.'
      ),
      intuition: bi(
        'Jab tum "The cat sat" likh chuke ho aur "on" predict karna hai — tumhe "The cat sat" dubara sochna nahi padta. Tumhe sirf naye word ke liye purane context ki zaroorat hai. KV Cache wahi "purana context saved" hai GPU memory mein.',
        'When you\'ve written "The cat sat" and predict "on" — you don\'t rethink everything. You only need past context for the new word. KV Cache is that saved past context in GPU memory.'
      ),
      problemStatement: bi(
        'Autoregressive generation: har naye token pe poora prefix dubara forward pass → Token 1: 1 step, Token 2: 2 steps, ... Token N: N steps = total O(N²) compute. 2000 tokens generate = millions of redundant calculations.',
        'Each new token recomputes full prefix → O(N²) total compute. 2000 tokens = millions of redundant calculations.'
      ),
      whyInvented: bi(
        'Inference optimization — training mein nahi chahiye (poora sequence parallel). Production LLM serving (ChatGPT, vLLM) mein KV cache mandatory hai warna latency unacceptable.',
        'Inference optimization — not needed in training (full parallel sequence). Mandatory for production LLM serving without unacceptable latency.'
      ),
      buildFromScratch: bi(
        `**Bina cache:** Token t pe compute K₁..K_t, V₁..V_t from scratch — O(t) per step, O(N²) total.

**Cache ke saath:**
1. Prefill prompt → compute all K,V → store in cache tensor
2. Decode step t → compute ONLY K_t, V_t → append to cache
3. Q_t (sirf current) × K_cacheᵀ → attention → × V_cache

**Q kyun fresh?** Q_t sirf "main ab kisko dhundh raha hoon" — purane Q₁..Q_{t-1} kabhi use nahi hote decode mein.`,
        `Without cache O(N²). With cache: append K,V, fresh Q_t only.`
      ),
      mathematicalDerivation: bi(
        `Decode step t:
Q_t = x_t · Wq     shape (1, d)
K_cache = [K_1; ...; K_t]  shape (t, d)  — append only K_t new
S_t = Q_t · K_cacheᵀ / √d_k   shape (1, t)
A_t = softmax(S_t)            shape (1, t)
O_t = A_t · V_cache           shape (1, d)

Memory per layer: 2 × t × d_head × n_heads`,
        `Decode attention math with cache shapes.`
      ),
      commonQuestions: defaultQuestions(
        ['Q cache kyun nahi?', 'Prefill vs decode?', 'KV cache memory formula?', 'Training mein cache?', 'PagedAttention kya karta hai?'],
        ['Why no Q cache?', 'Prefill vs decode?', 'Memory formula?', 'Cache in training?', 'PagedAttention?']
      ),
      internalMemory: bi(
        `**GPU HBM persistent during generation:**
- Model weights (static)
- KV cache (grows each token): 2 × layers × heads × seq × d_head × bytes
- Q_t temporary (1, d) — discarded after step

**NOT stored:** Full attention matrix (N,N) with Flash Attention`,
        `GPU: weights static, KV cache grows, Q_t temporary. No full attention matrix with Flash.`
      ),
      productionEngineering: bi(
        'vLLM PagedAttention: KV cache ko OS-style pages mein. Continuous batching. Prefix caching: same system prompt share. TensorRT-LLM, TGI production stacks.',
        'vLLM PagedAttention, continuous batching, prefix caching in production.'
      ),
      dryRun: bi(
        `Generate "The cat" (already have prompt embedded)

Step 1 — Prefill "The cat":
  Compute K,V for positions 1,2 → store in cache
  Cache_K = [K_The, K_cat], Cache_V = [V_The, V_cat]

Step 2 — Decode token "sat":
  Only compute Q,K,V for NEW position "sat"
  K_new = K_sat, append to cache
  Attention: Q_sat × [K_The, K_cat, K_sat]ᵀ  ← old K from cache!
  No recomputation of K_The, K_cat

Step 3 — Decode "on":
  Only K_on, V_on new
  Q_on × [K_The, K_cat, K_sat, K_on]ᵀ`,
        `Prefill builds cache. Decode appends only new K,V. Q always fresh for current token.`
      ),
      numericalExample: bi(
        '**Why Q NOT cached?** Sirf current token ka Q chahiye attention ke liye — hum naye token se purane sab keys se match karte hain. Q_new × K_cacheᵀ. Purane tokens ka Q dubara kabhi use nahi hota.\n\n**Why K,V cached?** Har naya token har PURANE token se attend karta hai — purane K,V same rehte hain, sirf naya append hota hai.\n\nLayers=32, heads=32, d_head=128, seq=4096, FP16:\nCache = 2 × 32 × 32 × 4096 × 128 × 2 bytes ≈ 2 GB',
        'Q not cached: only current token Q needed. K,V cached: all past tokens reused. ~2GB example for 32L model 4K context.'
      ),
      matrixDimensions: bi(
        'Per layer per head:\nK_cache: (seq_len, d_head) — grows each token\nV_cache: (seq_len, d_head)\nQ_new: (1, d_head) — only latest token\nAttention: (1, seq_len) scores → (1, d_head) output\n\nTotal memory: 2 × L_layers × H_heads × seq_len × d_head × bytes',
        'K,V cache (seq_len, d_head) growing. Q_new (1, d_head) only. Memory formula included.'
      ),
      asciiDiagram: bi(
        `Without cache (slow):
Tok1: [K1,V1]
Tok2: [K1,V1,K2,V2]  ← recompute K1,V1!
Tok3: [K1,V1,K2,V2,K3,V3]  ← recompute ALL!

With KV cache (fast):
Tok1: cache=[K1,V1]
Tok2: cache+=[K2,V2]  ← only new
Tok3: cache+=[K3,V3]  ← only new
Q3 × cache_K → attention`,
        `Without cache vs with cache — recomputation vs append`
      ),
      interviewQuestions: {
        hinglish: [
          'KV cache mein Q kyun cache nahi hota?',
          'Prefill aur decode phase mein kya difference hai?',
          'KV cache memory ka formula kya hai?',
          'PagedAttention KV cache se kaise related hai?',
        ],
        english: [
          'Why is Q not cached in KV cache?',
          'Difference between prefill and decode?',
          'KV cache memory formula?',
          'How does PagedAttention relate to KV cache?',
        ],
      },
      commonMistakes: {
        hinglish: [
          'Q bhi cache karna (waste — sirf latest Q chahiye)',
          'Training mein KV cache mandatory samajhna',
          'Cache size ignore karke unlimited context assume karna',
        ],
        english: [
          'Caching Q (wasteful — only latest Q needed)',
          'Thinking KV cache is mandatory in training',
          'Assuming unlimited context ignoring cache size',
        ],
      },
      summary: bi(
        'KV Cache = inference optimization. Store K,V per layer per head. Each decode step: compute only new K,V, reuse cache. Q never cached. Prefill builds cache parallel, decode appends sequential. Memory grows with sequence length — PagedAttention helps manage it.',
        'KV Cache stores K,V, not Q. Prefill parallel, decode append. Memory ∝ seq_len. PagedAttention manages memory.'
      ),
    }),
  },
]
