import type { Concept } from '../../types/concept'

export const coreOptimizationConcepts: Concept[] = [
  {
    id: 'flash-attention',
    sectionId: 'core-optimizations',
    title: { hinglish: 'Flash Attention', english: 'Flash Attention' },
    duration: '3m',
    tagline: {
      hinglish: 'Attention ko GPU memory mein store kiye bina fast compute karo',
      english: 'Compute attention fast without storing the full matrix in GPU memory',
    },
    intro: {
      hinglish:
        'Standard attention O(n²) memory leta hai kyunki poora n×n attention matrix HBM mein materialize hota hai. Flash Attention tiling + recomputation use karke memory bandwidth ko optimize karta hai — same result, bahut kam memory.',
      english:
        'Standard attention uses O(n²) memory because the full n×n matrix is materialized in HBM. Flash Attention uses tiling and recomputation to optimize memory bandwidth — same result, far less memory.',
    },
    explanation: {
      hinglish: `**Problem:** Attention matrix size = seq_len². 8K context = 64M entries per head per layer. GPU HBM slow hai compared to on-chip SRAM.

**Flash Attention idea (IO-aware):**
1. Q, K, V ko chhote **tiles** mein split karo
2. Har tile on-chip SRAM mein load → compute partial attention
3. Online softmax algorithm se running max/sum maintain karo
4. Full matrix kabhi HBM mein write nahi hota

**Result:**
- Memory: O(n²) → O(n)
- Speed: 2-4x faster training/inference
- Exact same output as standard attention (numerically equivalent)

**FlashAttention-2:** Better parallelism, work partitioning improved.

**FlashAttention-3:** Hopper GPUs (H100) ke liye, FP8 support, async operations.

**Kab use hota hai:** Har modern LLM training aur inference stack mein — PyTorch 2.0+, vLLM, HuggingFace transformers sab integrate karte hain.`,
      english: `**Problem:** Attention matrix size = seq_len². 8K context = 64M entries per head per layer. GPU HBM is slow compared to on-chip SRAM.

**Flash Attention (IO-aware):**
1. Split Q, K, V into small **tiles**
2. Load each tile into on-chip SRAM → compute partial attention
3. Online softmax maintains running max/sum
4. Full matrix is never written to HBM

**Result:**
- Memory: O(n²) → O(n)
- Speed: 2-4x faster training/inference
- Exact same output as standard attention

**FlashAttention-2:** Better parallelism and work partitioning.

**FlashAttention-3:** For Hopper GPUs (H100), FP8, async ops.

**Where it's used:** Every modern LLM stack — PyTorch 2.0+, vLLM, HuggingFace transformers.`,
    },
    keyPoints: {
      hinglish: [
        'Tiling + online softmax = no full matrix in HBM',
        'Memory O(n) instead of O(n²)',
        'Numerically exact — approximation nahi',
        'Industry standard ab har jagah',
      ],
      english: [
        'Tiling + online softmax = no full matrix in HBM',
        'Memory O(n) instead of O(n²)',
        'Numerically exact — not an approximation',
        'Industry standard everywhere now',
      ],
    },
    analogy: {
      hinglish:
        'Jaise tum poori library ek saath yaad nahi karte — ek shelf padho, note karo, next shelf. Flash Attention bhi data ko chunks mein process karta hai instead of poora load.',
      english:
        'Like not memorizing an entire library at once — read one shelf, note it, next shelf. Flash Attention processes data in chunks instead of loading everything.',
    },
    steps: [
      { title: { hinglish: 'Q,K,V tiles', english: 'Q,K,V tiles' }, caption: { hinglish: 'Matrices ko blocks mein divide', english: 'Divide matrices into blocks' } },
      { title: { hinglish: 'SRAM load', english: 'SRAM load' }, caption: { hinglish: 'Fast on-chip memory mein tile', english: 'Tile into fast on-chip memory' } },
      { title: { hinglish: 'Partial softmax', english: 'Partial softmax' }, caption: { hinglish: 'Running statistics maintain', english: 'Maintain running statistics' } },
      { title: { hinglish: 'Accumulate output', english: 'Accumulate output' }, caption: { hinglish: 'Tile results merge karo', english: 'Merge tile results' } },
      { title: { hinglish: 'Skip HBM write', english: 'Skip HBM write' }, caption: { hinglish: 'Full n×n matrix kabhi save nahi', english: 'Full n×n matrix never saved' } },
    ],
  },
  {
    id: 'paged-attention',
    sectionId: 'core-optimizations',
    title: { hinglish: 'Paged Attention', english: 'Paged Attention' },
    duration: '4m',
    tagline: {
      hinglish: 'KV Cache ko OS-style pages mein manage karo — memory waste kam, batching better',
      english: 'Manage KV Cache in OS-style pages — less waste, better batching',
    },
    intro: {
      hinglish:
        'vLLM ne PagedAttention introduce kiya. Problem: har request ka KV cache alag size ka hota hai, contiguous memory allocate karna wasteful hai. Solution: cache ko fixed-size blocks (pages) mein tod do, jaise operating system virtual memory karta hai.',
      english:
        'vLLM introduced PagedAttention. Problem: each request has a different KV cache size, and contiguous allocation is wasteful. Solution: split cache into fixed-size blocks (pages), like OS virtual memory.',
    },
    explanation: {
      hinglish: `**Naive serving problem:**
- Request A: 100 tokens → 100 slots allocate
- Request B: 500 tokens → 500 slots allocate  
- Request A complete → 400 slots wasted (pre-allocated for max length)
- Memory fragmentation → GPU utilization low

**PagedAttention solution:**
1. KV cache = list of fixed **blocks** (e.g. 16 tokens each)
2. **Block table** maps logical sequence position → physical block
3. Blocks non-contiguous ho sakte hain — jaise virtual memory pages
4. Request complete → blocks free list mein wapas
5. **Continuous batching:** naye requests slots mein fit ho jate hain

**Benefits:**
- ~0% memory waste (vs 60-80% naive)
- 2-4x more concurrent requests same GPU pe
- Prefix caching: same prompt ke blocks share ho sakte hain

**Deep dive:** Block size tune karna tradeoff hai — chhota = zyada overhead, bada = internal fragmentation.`,
      english: `**Naive serving problem:**
- Request A: 100 tokens → allocate 100 slots
- Request B: 500 tokens → allocate 500 slots
- Request A done → 400 slots wasted (pre-allocated max)
- Fragmentation → low GPU utilization

**PagedAttention:**
1. KV cache = list of fixed **blocks** (e.g. 16 tokens each)
2. **Block table** maps logical position → physical block
3. Blocks can be non-contiguous — like virtual memory pages
4. Request done → blocks return to free list
5. **Continuous batching:** new requests fill freed slots

**Benefits:**
- ~0% memory waste (vs 60-80% naive)
- 2-4x more concurrent requests on same GPU
- Prefix caching: shared blocks for same prompt

**Deep dive:** Block size is a tradeoff — smaller = more overhead, larger = internal fragmentation.`,
    },
    keyPoints: {
      hinglish: [
        'vLLM ka core innovation',
        'OS virtual memory jaisa block management',
        'Continuous batching enable karta hai',
        'Prefix caching se shared prompts fast',
      ],
      english: [
        'Core innovation behind vLLM',
        'Block management like OS virtual memory',
        'Enables continuous batching',
        'Prefix caching speeds shared prompts',
      ],
    },
    analogy: {
      hinglish:
        'Hotel mein har guest ko poora floor nahi milta — rooms (blocks) allocate hote hain, checkout pe free ho jate hain. PagedAttention KV cache ke liye wahi system hai.',
      english:
        'In a hotel, guests don\'t get whole floors — rooms (blocks) are allocated and freed at checkout. PagedAttention is that system for KV cache.',
    },
    steps: [
      { title: { hinglish: 'Fixed blocks', english: 'Fixed blocks' }, caption: { hinglish: 'Cache ko equal pages mein split', english: 'Split cache into equal pages' } },
      { title: { hinglish: 'Block table', english: 'Block table' }, caption: { hinglish: 'Logical → physical mapping', english: 'Logical → physical mapping' } },
      { title: { hinglish: 'Non-contiguous', english: 'Non-contiguous' }, caption: { hinglish: 'Blocks memory mein scattered ho sakte', english: 'Blocks can be scattered in memory' } },
      { title: { hinglish: 'Free list', english: 'Free list' }, caption: { hinglish: 'Done requests ke blocks recycle', english: 'Recycle blocks from done requests' } },
      { title: { hinglish: 'Batching', english: 'Batching' }, caption: { hinglish: 'Naye requests turant slots lete hain', english: 'New requests immediately take slots' } },
    ],
  },
  {
    id: 'mixture-of-experts',
    sectionId: 'core-optimizations',
    title: { hinglish: 'Mixture of Experts (MoE)', english: 'Mixture of Experts (MoE)' },
    duration: '4m',
    tagline: {
      hinglish: 'Ek bada model ki jagah — kai chhote experts, har token sirf kuch activate',
      english: 'Instead of one huge model — many smaller experts, each token activates only a few',
    },
    intro: {
      hinglish:
        'MoE architecture mein FFN layer ko multiple "experts" se replace karte hain. Router har token ko 1-2 experts assign karta hai. Total parameters bahut zyada, lekin active parameters kam — compute efficient bada model.',
      english:
        'In MoE, the FFN layer is replaced with multiple "experts". A router assigns 1-2 experts per token. Total parameters are huge, but active parameters are fewer — a large model with efficient compute.',
    },
    explanation: {
      hinglish: `**Standard Transformer FFN:** Har token same weights use karta hai — dense.

**MoE FFN:**
- N experts (e.g. 8, 64, 128) — har ek chhota FFN
- **Router/Gate:** token embedding → softmax over experts → top-k select (usually k=1 or 2)
- Sirf selected experts run hote hain
- Output = weighted sum of expert outputs

**Examples:**
- Mixtral 8x7B: 8 experts, 2 active → ~13B active params, ~47B total
- GPT-4 rumored MoE architecture
- DeepSeek-V2, Grok — MoE based

**Benefits:** Scale parameters without proportional compute increase.

**Challenges:**
- Load balancing — kuch experts zyada use, kuch idle
- Communication overhead multi-GPU pe
- Training instability — router collapse

**Auxiliary loss:** Experts ko evenly use karne ke liye extra training loss.`,
      english: `**Standard FFN:** Every token uses the same weights — dense.

**MoE FFN:**
- N experts (e.g. 8, 64, 128) — each a small FFN
- **Router/Gate:** token embedding → softmax over experts → top-k (usually k=1 or 2)
- Only selected experts run
- Output = weighted sum of expert outputs

**Examples:**
- Mixtral 8x7B: 8 experts, 2 active → ~13B active, ~47B total
- GPT-4 rumored MoE
- DeepSeek-V2, Grok — MoE based

**Benefits:** Scale parameters without proportional compute.

**Challenges:**
- Load balancing — some experts overused, others idle
- Multi-GPU communication overhead
- Training instability — router collapse

**Auxiliary loss:** Extra loss to encourage even expert usage.`,
    },
    keyPoints: {
      hinglish: [
        'Sparse activation — sirf top-k experts',
        'Total params >> active params per token',
        'Router token ko expert assign karta hai',
        'Load balancing training mein important',
      ],
      english: [
        'Sparse activation — only top-k experts',
        'Total params >> active params per token',
        'Router assigns experts to tokens',
        'Load balancing matters in training',
      ],
    },
    analogy: {
      hinglish:
        'Hospital mein har patient ko sab doctors nahi milte — reception (router) specialist assign karta hai. MoE mein har token apna expert choose karta hai.',
      english:
        'In a hospital, not every patient sees all doctors — reception (router) assigns a specialist. In MoE, each token picks its expert.',
    },
    steps: [
      { title: { hinglish: 'Token input', english: 'Token input' }, caption: { hinglish: 'Token FFN layer pe aata hai', english: 'Token arrives at FFN layer' } },
      { title: { hinglish: 'Router scores', english: 'Router scores' }, caption: { hinglish: 'Har expert ka relevance score', english: 'Relevance score per expert' } },
      { title: { hinglish: 'Top-k select', english: 'Top-k select' }, caption: { hinglish: 'Sirf best 1-2 experts activate', english: 'Activate only best 1-2 experts' } },
      { title: { hinglish: 'Expert compute', english: 'Expert compute' }, caption: { hinglish: 'Selected experts process token', english: 'Selected experts process token' } },
      { title: { hinglish: 'Weighted merge', english: 'Weighted merge' }, caption: { hinglish: 'Router weights se combine output', english: 'Combine output with router weights' } },
    ],
  },
]
