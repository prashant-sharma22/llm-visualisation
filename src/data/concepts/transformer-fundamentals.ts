import type { Concept } from '../../types/concept'
import { bi, teaching, fullTeaching, defaultQuestions, defaultMistakes } from './teaching-utils'

const transformerFlowAscii = bi(
`Sentence: "cat sat"
      ↓ Tokenization
   [cat, sat] → IDs [45, 891]
      ↓ Embedding Matrix E
   (2, 768) vectors
      ↓ + Positional Encoding
   Input X (2, 768)
      ↓ Q=XWq, K=XWk, V=XWv
   Attention → Context
      ↓ Residual + LayerNorm
      ↓ Feed Forward Network
      ↓ Residual + LayerNorm
      ↓ (repeat L layers)
      ↓ Linear → Softmax
   P(next token) over vocab`,
`Full transformer pipeline from sentence to probabilities`
)

export const transformerFundamentalConcepts: Concept[] = [
  {
    id: 'transformer-flow',
    sectionId: 'transformer-fundamentals',
    title: { hinglish: 'Transformer — Poora Flow', english: 'Transformer — Complete Flow' },
    duration: '12m',
    tagline: { hinglish: 'Sentence se next token prediction tak — ek ek step', english: 'From sentence to next token prediction — step by step' },
    intro: {
      hinglish: 'Yeh woh complete pipeline hai jo tumne seekha — ab ek jagah poora flow. Har box ek concept hai jo hum detail mein cover karenge.',
      english: 'This is the complete pipeline you learned — full flow in one place. Each box is a concept we cover in detail.',
    },
    explanation: {
      hinglish: `Har transformer layer mein:
1. Multi-Head Attention (Q,K,V)
2. Residual connection + LayerNorm
3. Feed Forward Network (2 linear layers)
4. Residual + LayerNorm

Output layer: final hidden state → Linear(vocab) → Softmax → probabilities`,
      english: `Each transformer layer: Attention → Residual+LN → FFN → Residual+LN. Output: hidden → Linear → Softmax.`,
    },
    keyPoints: { hinglish: ['Encoder/Decoder variants exist', 'GPT = decoder only', 'Output = next token prob'], english: ['Encoder/Decoder variants', 'GPT = decoder only', 'Output = next token prob'] },
    analogy: { hinglish: 'Factory assembly line — har station (layer) input process karke aage bhejta hai.', english: 'Factory assembly line — each station (layer) processes and passes forward.' },
    steps: [
      { title: bi('Tokenize', 'Tokenize'), caption: bi('"The cat" → [42, 891]', '"The cat" → [42, 891]') },
      { title: bi('Embed', 'Embed'), caption: bi('IDs → X matrix (N×D)', 'IDs → X matrix (N×D)') },
      { title: bi('Q, K, V', 'Q, K, V'), caption: bi('Wq, Wk, Wv projections', 'Wq, Wk, Wv projections') },
      { title: bi('Attention', 'Attention'), caption: bi('softmax(Q·Kᵀ/√d)', 'softmax(Q·Kᵀ/√d)') },
      { title: bi('LayerNorm', 'LayerNorm'), caption: bi('A·V + residual + LN', 'A·V + residual + LN') },
      { title: bi('Feed-Forward', 'Feed-Forward'), caption: bi('D → 4D → D MLP', 'D → 4D → D MLP') },
      { title: bi('Training', 'Training'), caption: bi('W ← W − lr·∇W', 'W ← W − lr·∇W') },
      { title: bi('KV cache', 'KV cache'), caption: bi('Reuse K,V at decode', 'Reuse K,V at decode') },
      { title: bi('Logits', 'Logits'), caption: bi('h · W_out → scores', 'h · W_out → scores') },
      { title: bi('Next token', 'Next token'), caption: bi('softmax → "sat"', 'softmax → "sat"') },
    ],
    teaching: teaching({
      intuition: bi('Transformer ek machine hai: text input → understanding layers → "agla word kya hoga?" output.', 'Transformer: text in → understanding layers → "what\'s next word?" out.'),
      problemStatement: bi('RNN slow tha (sequential). Transformer parallel process karta hai — attention se sab tokens ek saath relate.', 'RNN was sequential/slow. Transformer parallelizes via attention.'),
      whyInvented: bi('"Attention Is All You Need" 2017 — Google. Translation se start, ab GPT/LLaMA sab transformers hain.', '2017 Google paper. Now all LLMs are transformers.'),
      dryRun: bi(`"The cat" → predict next
Tokenize → [464, 3797]
Embed + PE → X (2,768)
Layer 1 attention+FFN → H1
...
Layer 12 → H12
H12[last] → Linear → scores (50257,)
Softmax → P("sat")=0.3, P("ran")=0.15...`, `Dry run for "The cat" next token.`),
      numericalExample: bi('GPT-2 small: 12 layers, 768 d_model, 12 heads, vocab 50257. ~117M parameters total.', 'GPT-2 small specs.'),
      matrixDimensions: bi('X:(N,D), after L layers H:(N,D), output linear:(D,V) → logits:(N,V). Last position H[N-1] used for next token.', 'Shapes through pipeline.'),
      asciiDiagram: transformerFlowAscii,
      interviewQuestions: { hinglish: ['Transformer vs RNN?', 'Encoder vs Decoder?', 'GPT architecture?'], english: ['Transformer vs RNN?', 'Encoder vs Decoder?', 'GPT architecture?'] },
      commonMistakes: { hinglish: ['Sirf attention = poora transformer (FFN bhi hai)', 'Encoder-decoder confuse with decoder-only'], english: ['Attention alone isn\'t full transformer', 'Encoder-decoder vs decoder-only'] },
      summary: bi('Full flow: Tokenize → Embed → L×(Attention+FFN) → Linear → Softmax. GPT decoder-only autoregressive.', 'Full pipeline. GPT = decoder-only autoregressive.'),
    }),
  },
  {
    id: 'q-k-v',
    sectionId: 'transformer-fundamentals',
    title: { hinglish: 'Q, K, V — Query, Key, Value', english: 'Q, K, V — Query, Key, Value' },
    duration: '8m',
    tagline: { hinglish: 'Q dhoondhta hai, K match karta hai, V information deta hai', english: 'Q searches, K matches, V carries information' },
    intro: {
      hinglish: 'Embedding directly attention mein use nahi hota — Q, K, V banate hain via Wq, Wk, Wv. Q puchta hai "kisko dhundhu?", K batata hai "main yahan hoon", V deta hai actual content.',
      english: 'Embeddings aren\'t used directly — we create Q, K, V via Wq, Wk, Wv. Q asks "who to look for?", K says "I\'m here", V gives actual content.',
    },
    explanation: {
      hinglish: `Q = X·Wq (search vector)
K = X·Wk (match vector)  
V = X·Wv (content vector)

Attention scores = Q·Kᵀ (sirf Q aur K)
Output = softmax(scores)·V (V se weighted sum)

Embedding same hota sab tokens ke liye role ke bina — W matrices alag roles seekhti hain.`,
      english: `Q=X·Wq, K=X·Wk, V=X·Wv. Scores=Q·Kᵀ. Output=softmax(scores)·V. W matrices learn separate roles.`,
    },
    keyPoints: { hinglish: ['Attention = Q aur K se', 'Output = V se', 'Embedding ≠ Q/K/V'], english: ['Attention from Q and K', 'Output from V', 'Embedding ≠ Q/K/V'] },
    analogy: { hinglish: 'Library: Q = tumhara question, K = book titles, V = book content. Title match karo, content padho.', english: 'Library: Q=question, K=titles, V=content. Match titles, read content.' },
    steps: [
      { title: bi('Input X', 'Input X'), caption: bi('N × d_model embeddings', 'N × d_model embeddings'), why: bi('Embedding mein role nahi — pehle X chahiye projection ke liye', 'Embeddings lack role info — need X before projection') },
      { title: bi('Q, K, V', 'Q, K, V'), caption: bi('Teen alag projections via Wq,Wk,Wv', 'Three projections via Wq,Wk,Wv'), why: bi('Teen alag kaam: search, match, deliver — ek vector se nahi ho sakta', 'Three jobs: search, match, deliver — one vector cannot do all') },
      { title: bi('QKᵀ', 'QKᵀ'), caption: bi('Similarity scores — sirf Q aur K', 'Similarity scores — Q and K only'), why: bi('Match score chahiye attention decide karne ke liye — V abhi nahi', 'Need match scores to decide attention — V comes later') },
      { title: bi('Softmax', 'Softmax'), caption: bi('Scores → probabilities sum=1', 'Scores → probabilities sum=1'), why: bi('Weighted average ke liye valid positive weights chahiye', 'Weighted average needs valid positive weights') },
      { title: bi('× V', '× V'), caption: bi('Information weighted sum → context', 'Information weighted sum → context'), why: bi('Scores batate KITNA attention — V batata KYA information lena hai', 'Scores say HOW MUCH — V says WHAT information to take') },
    ],
    teaching: fullTeaching({
      whyFirst: bi(
        '**Sabse pehle kyun?** Agar hum seedha embedding use karein attention mein, toh har token same type ka vector hoga — model nahi seekh paayega "kaun search kar raha, kaun searchable hai, kaun data carry karta hai". Wq, Wk, Wv teen **alag learnable lenses** hain. Training inhe automatically alag roles assign karti hai — jaise library mein alag catalog (K), question slip (Q), aur book content (V).',
        '**Why first?** Raw embeddings can\'t separate search/match/carry roles. Wq, Wk, Wv are three learnable lenses that training assigns different roles — like catalog (K), question (Q), and content (V) in a library.'
      ),
      intuition: bi(
        'Socho tum library mein ho. **Q (Query)** = tumhara question paper — "mujhe cat ke baare mein chahiye". **K (Key)** = har book ka title/spine label — match karta hai question se. **V (Value)** = book ka actual content jo padhna hai. Attention score = Q·K (title match). Output = matched books ka content (V) weighted sum. Embedding = raw book ID — usse search nahi hota properly.',
        'In a library: **Q** = your question, **K** = book titles to match, **V** = actual content to read. Score = Q·K match. Output = weighted V content.'
      ),
      problem: bi('Ek hi embedding vector se teen operations efficiently nahi ho sakte. Database retrieval mein bhi query, key, value alag hote hain.', 'One embedding can\'t efficiently do three operations. Databases also separate query, key, value.'),
      whyInvented: bi('"Attention Is All You Need" (Vaswani et al., 2017) — scaled dot-product attention ka core. Database / retrieval se prerna.', '"Attention Is All You Need" 2017 — core of scaled dot-product attention.'),
      buildFromScratch: bi(
        `Step 0: Tumhare paas input matrix X hai — har row ek token ka embedding (positional info ke saath).

Step 1: **Wq matrix multiply** — X · Wq = Q. Har token ab "search mode" mein hai.
Step 2: **X · Wk = K** — har token "searchable label" ban gaya.
Step 3: **X · Wv = V** — har token "content carrier" ban gaya.

Step 4: Q · Kᵀ → har token pair ka relevance score (N×N matrix).
Step 5: Softmax → scores ko weights (har row sum=1).
Step 6: weights · V → final context vector — har token ne relevant V collect kiya.

**Important:** V scores mein NAHI aata. Sirf output banate waqt.`,
        `Build X → Q=XWq, K=XWk, V=XWv → QKᵀ → softmax → ×V. V only in output, not scores.`
      ),
      derivation: bi(
        `**Q bananna:** Q = X · Wq
X shape (N, D), Wq shape (D, D) → Q shape (N, D)

**Scores:** S = Q · Kᵀ
Q (N,D) · Kᵀ (D,N) = S (N,N)
S[i,j] = dot(q_i, k_j) = kitna token i, token j se relate karta hai

**Scale:** S' = S / √d_k  (variance control — bade d pe dots bade hote hain)

**Softmax row-wise:** A[i,j] = exp(S'[i,j]) / Σ_k exp(S'[i,k])

**Output:** O = A · V
(N,N) · (N,D) = (N,D)`,
        `Q=XWq. S=QKᵀ/√d_k. A=softmax(S). O=AV. Full derivation with shapes.`
      ),
      matrixShapes: bi(
        `Input X:        (N, D)     e.g. (12, 768) — 12 tokens
Wq, Wk, Wv:     (D, D)     e.g. (768, 768) each
Q, K, V:        (N, D)     e.g. (12, 768)
Q · Kᵀ:         (N, N)     e.g. (12, 12) — attention matrix
After softmax:  (N, N)
Output O:       (N, D)     e.g. (12, 768)

**Parameters:** 3 × D² = 3 × 768² ≈ 1.77M per layer (sirf QKV)`,
        `Shapes: X(N,D), W(D,D), Q,K,V(N,D), scores(N,N), out(N,D). ~1.77M QKV params/layer at D=768.`
      ),
      numerical: bi(
        `**Tiny example:** 2 tokens, D=2 (haath se!)

X = [[1,0], [0,1]]  ("token0", "token1")
Wq = I (identity for simplicity) → Q = X
Wk = I → K = X
Wv = I → V = X

Q·Kᵀ = [[1,0],[0,1]] → scores
/√2 → softmax row0 ≈ [0.65, 0.35]
O[0] = 0.65·V[0] + 0.35·V[1] = [0.65, 0.35]

Token 0 ne apna 65% + token1 ka 35% mix kiya.`,
        `2-token D=2 hand calculation with identity W matrices.`
      ),
      commonQuestions: defaultQuestions(
        [
          '**Q cache kyun nahi hota inference mein?** Sirf latest token ka Q chahiye — purane Q kabhi dubara use nahi. K,V purane tokens ke reuse hote hain.',
          '**WV hata do toh?** Output mein koi information nahi milegi — sirf scores meaningless honge.',
          '**Wq 768×768 hi kyun?** d_model=768 → square projection same dimension preserve. Industry convention + GPU efficiency (powers of 2).',
          '**Training se pehle Wq ke numbers?** Random small values (~N(0, 0.02)). Training se meaningful patterns.',
        ],
        [
          '**Why no Q cache?** Only latest Q needed at inference.',
          '**Remove V?** No information in output.',
          '**Why 768×768 Wq?** Preserve d_model dimension. GPU-friendly power of 2.',
          '**Wq before training?** Random small init.',
        ]
      ),
      internalMemory: bi(
        `**Trainable (GPU persistent):** Wq, Wk, Wv weights
**Temporary (forward only):** Q, K, V activations, attention matrix (N,N)
**Inference cached:** K, V per layer (NOT Q)
**Disappears after step:** attention weights matrix (unless debugging)`,
        `Trainable: W matrices. Temporary: Q,K,V, attention. Cached at inference: K,V only.`
      ),
      production: bi(
        'OpenAI/Meta/Llama: same QKV math. GQA reduces K,V heads. Flash Attention computes QKᵀ without materializing full (N,N) matrix. FP8/BF16 for W matrices on H100.',
        'Industry uses same QKV. GQA, Flash Attention, FP8/BF16 in production.'
      ),
      interview: defaultQuestions(
        ['Q, K, V intuitive meaning?', 'Why V not in QKᵀ?', 'Why scaled by √d_k?', 'QKV param count formula?', 'Multi-head mein QKV kaise split?'],
        ['Q,K,V meaning?', 'Why no V in scores?', 'Why √d_k scaling?', 'QKV param count?', 'Multi-head QKV split?']
      ),
      mistakes: defaultMistakes(
        ['V ko scores mein use karna', 'Q=K=V same matrix', 'Embedding directly attention mein', 'Q bhi KV cache mein'],
        ['V in scores', 'Q=K=V', 'Embedding directly in attention', 'Caching Q']
      ),
      recap: bi(
        `**Flowchart:** X → [Wq,Wk,Wv] → Q,K,V → QKᵀ/√d → softmax → ×V → O
**Cheat:** Q=search, K=match, V=content. Scores=QK only. Output=softmax·V.
**Revision:** Wq,Wk,Wv trainable (D,D). Shapes: X(N,D), out(N,D).`,
        `Flow: X→QKV→QKᵀ→softmax→V. Q searches, K matches, V delivers.`
      ),
      ascii: bi(
        `     Wq      Wk      Wv
X ─────→ Q       K       V
         \\      |      /
          \\  Q·Kᵀ   /
           ↓  /√d  ↓
         softmax (weights)
              ↓
           weights · V
              ↓
           Context O`,
        `QKV attention ASCII flow`
      ),
    }),
  },
  {
    id: 'wq-wk-wv',
    sectionId: 'transformer-fundamentals',
    title: { hinglish: 'Wq, Wk, Wv — Weight Matrices', english: 'Wq, Wk, Wv — Weight Matrices' },
    duration: '7m',
    tagline: { hinglish: 'Trainable matrices jo X ko Q, K, V mein project karti hain', english: 'Trainable matrices that project X into Q, K, V' },
    intro: {
      hinglish: 'Wq, Wk, Wv teen weight matrices hain — har ek (d_model × d_model). Inke andar har number ek parameter hai jo training mein update hota hai.',
      english: 'Wq, Wk, Wv are weight matrices — each (d_model × d_model). Every number is a parameter updated in training.',
    },
    explanation: {
      hinglish: `Q = X · Wq   (matrix multiply)
Size: (N, d) × (d, d) = (N, d)

Parameters per matrix: d × d = 768² = 589,824
Teeno: ~1.77M params per layer (QKV only)

Multi-head: Wq split into head-wise smaller projections.`,
      english: `Q = X · Wq. (N,d)×(d,d)=(N,d). Params: d² each. Multi-head splits projections.`,
    },
    keyPoints: { hinglish: ['Learnable weights', 'd×d per matrix', 'Matrix multiply', 'Multi-head = split projections'], english: ['Learnable', 'd×d each', 'Matmul', 'Multi-head splits'] },
    analogy: { hinglish: 'Teen alag colored glasses — same scene, alag filter, alag view. W matrices wahi filters.', english: 'Three colored glasses — same scene, different filters.' },
    steps: [
      { title: bi('X matrix', 'X matrix'), caption: bi('(N, d_model)', '(N, d_model)') },
      { title: bi('× Wq', '× Wq'), caption: bi('Projection', 'Projection') },
      { title: bi('= Q', '= Q'), caption: bi('Query matrix', 'Query matrix') },
      { title: bi('Same for K,V', 'Same for K,V'), caption: bi('Parallel projections', 'Parallel projections') },
      { title: bi('Backprop update', 'Backprop update'), caption: bi('Gradients flow', 'Gradients flow') },
    ],
    teaching: teaching({
      intuition: bi('W matrix ek "lens" hai — input ko useful subspace mein project karta hai. Training se lens adjust hoti hai.', 'W is a lens projecting input to useful subspace. Training adjusts it.'),
      problemStatement: bi('Fixed projection se model limited. Learned W = model khud decide kare kaise search/match karna hai.', 'Fixed projection limits model. Learned W = model decides how to search.'),
      whyInvented: bi('Standard linear layer in neural nets — attention ne teen alag purposes ke liye teen layers use ki.', 'Standard linear layers — attention uses three for three purposes.'),
      dryRun: bi(`d=2 toy:
X = [[1, 2], [3, 4]]  (2 tokens)
Wq = [[0.5, 0.1], [0.2, 0.8]]
Q[0] = [1×0.5+2×0.2, 1×0.1+2×0.8] = [0.9, 1.7]`, `2D matrix multiply dry run.`),
      numericalExample: bi('d=768: Wq has 589,824 params. 12 layers × 3 matrices × 589K ≈ 21M params just for QKV projections in 12-layer model.', 'Param count example.'),
      matrixDimensions: bi('Wq,Wk,Wv: (D,D). X:(N,D). Q,K,V:(N,D). Multi-head: Wq_i:(D, D/h).', 'All weight matrix shapes.'),
      asciiDiagram: bi(`     Wq (D×D)
X ─────────→ Q
(N×D)        (N×D)

Har cell Wq[i,j] = ek parameter`, `X times Wq equals Q`),
      interviewQuestions: { hinglish: ['Wq size kaise derive?', 'Multi-head mein W kaise split?', 'Parameters count formula?'], english: ['Derive Wq size?', 'W split in multi-head?', 'Param count formula?'] },
      commonMistakes: { hinglish: ['Wq dimension galat', 'Wq shared across layers (nahi — har layer alag)'], english: ['Wrong Wq dimension', 'Wq shared across layers'] },
      summary: bi('Wq,Wk,Wv = (D,D) trainable. Q=XWq etc. ~3D² params per layer for QKV.', 'W matrices (D,D) trainable projections.'),
    }),
  },
  {
    id: 'parameters',
    sectionId: 'transformer-fundamentals',
    title: { hinglish: 'Parameters — Learnable Numbers', english: 'Parameters — Learnable Numbers' },
    duration: '5m',
    tagline: { hinglish: 'Model ki memory — training se update hone wale numbers', english: 'The model\'s memory — numbers updated by training' },
    intro: {
      hinglish: 'Parameters wo learnable numbers hain — Wq ki har entry, embedding matrix, FFN weights, LayerNorm gamma/beta. Training inhe adjust karti hai backprop se.',
      english: 'Parameters are learnable numbers — every entry in Wq, embedding matrix, FFN weights, LayerNorm gamma/beta. Training adjusts them via backprop.',
    },
    explanation: {
      hinglish: `**Kahan parameters hain:**
- Embedding matrix: V × D
- Per layer: Wq, Wk, Wv, Wo, FFN (2 matrices), LayerNorm γ, β
- Output linear: D × V

**Training:** Loss → gradient → update each parameter slightly
**7B model = 7 billion parameters**`,
      english: `Parameters in: Embedding, per-layer QKV+FFN+LN, output linear. Training updates via gradients. 7B = 7 billion params.`,
    },
    keyPoints: { hinglish: ['Har weight = parameter', 'Backprop updates', 'Billion scale in LLMs'], english: ['Every weight = param', 'Backprop updates', 'Billions in LLMs'] },
    analogy: { hinglish: 'Brain ke synapses — experience se strengthen/weaken. Parameters wahi hain digital brain mein.', english: 'Brain synapses strengthening with experience. Parameters are the digital equivalent.' },
    steps: [
      { title: bi('Random init', 'Random init'), caption: bi('Small random weights', 'Small random weights') },
      { title: bi('Forward pass', 'Forward pass'), caption: bi('Prediction', 'Prediction') },
      { title: bi('Loss', 'Loss'), caption: bi('Error measure', 'Error measure') },
      { title: bi('Backprop', 'Backprop'), caption: bi('Gradients', 'Gradients') },
      { title: bi('Update params', 'Update params'), caption: bi('θ = θ - lr×grad', 'θ = θ - lr×grad') },
    ],
    teaching: teaching({
      intuition: bi('Model birth pe random hota hai. Parameters training se "knowledge" store karte hain — grammar, facts, reasoning patterns.', 'Model starts random. Parameters store knowledge from training.'),
      problemStatement: bi('Rules manually likhna impossible (language). Learned parameters patterns capture karte hain data se.', 'Manual rules impossible. Learned params capture patterns from data.'),
      whyInvented: bi('Neural networks ka foundation — universal function approximators.', 'Foundation of neural networks.'),
      dryRun: bi(`1 param w=0.5, input x=2, target y=4
pred = w×x = 1.0, loss = (4-1)²=9
grad = -6, w_new = 0.5 - 0.01×(-6) = 0.56
Next pred closer to 4`, `Single param gradient step.`),
      numericalExample: bi('GPT-3 175B params. Stored FP16 ≈ 350GB. Training cost millions of dollars.', 'GPT-3 scale.'),
      matrixDimensions: bi('Total params ≈ sum of all matrix elements. Count: embedding + L×(4D² + 8D² FFN) + DV roughly.', 'Param counting formula rough.'),
      asciiDiagram: bi(`Parameter θ (scalar or matrix cell)
     ↓ forward
   prediction
     ↓ loss
   gradient ∂L/∂θ
     ↓ update
   θ_new = θ - η·gradient`, `Training update loop`),
      interviewQuestions: { hinglish: ['Parameter vs hyperparameter?', '7B model memory?', 'Backprop kya hai?'], english: ['Param vs hyperparam?', '7B model memory?', 'What is backprop?'] },
      commonMistakes: { hinglish: ['Activations = parameters (nahi)', 'More params always better'], english: ['Activations aren\'t params', 'More params always better'] },
      summary: bi('Parameters = all learnable weights. Training via backprop. LLMs = billions of parameters.', 'Parameters = learnable weights, billions in LLMs.'),
    }),
  },
  {
    id: 'attention-mechanism',
    sectionId: 'transformer-fundamentals',
    title: { hinglish: 'Attention Mechanism', english: 'Attention Mechanism' },
    duration: '9m',
    tagline: { hinglish: 'QKᵀ → scale → softmax → ×V — context vector', english: 'QKᵀ → scale → softmax → ×V — context vector' },
    intro: {
      hinglish: 'Attention ka formula: scores = QKᵀ/√d, weights = softmax(scores), output = weights × V. Har token dusre tokens se kitna "dhyaan" de woh weights batate hain.',
      english: 'Attention: scores = QKᵀ/√d, weights = softmax(scores), output = weights × V. Weights tell how much each token attends to others.',
    },
    explanation: {
      hinglish: `1. scores = Q · Kᵀ     → (N, N) matrix
2. scores = scores / √d_k  → scaling (variance control)
3. weights = softmax(scores) → rows sum to 1
4. output = weights · V    → (N, d) context vectors`,
      english: `scores=QKᵀ/√d_k → softmax → multiply V → context vectors.`,
    },
    keyPoints: { hinglish: ['Scaled dot-product', 'N×N attention matrix', 'Weighted sum of V'], english: ['Scaled dot-product', 'N×N matrix', 'Weighted V sum'] },
    analogy: { hinglish: 'Class mein sab students ko dhyaan — zyada important topic pe zyada focus. Weights = focus distribution.', english: 'Class attention on topics — weights = focus distribution.' },
    steps: [
      { title: bi('QKᵀ', 'QKᵀ'), caption: bi('Raw scores', 'Raw scores') },
      { title: bi('÷ √d', '÷ √d'), caption: bi('Scale', 'Scale') },
      { title: bi('Softmax', 'Softmax'), caption: bi('Weights', 'Weights') },
      { title: bi('× V', '× V'), caption: bi('Weighted sum', 'Weighted sum') },
      { title: bi('Context', 'Context'), caption: bi('Per-token output', 'Per-token output') },
    ],
    teaching: teaching({
      intuition: bi('"The cat sat on the mat" — "sat" predict karte waqt "cat" pe zyada attention. Attention yeh dynamically decide karta hai.', '"sat" prediction attends more to "cat". Attention decides dynamically.'),
      problemStatement: bi('Fixed window / RNN hidden state limited context. Attention = any token any token se connect.', 'RNN limited context. Attention = any-to-any connection.'),
      whyInvented: bi('Bahdanau attention 2014 translation. Transformer 2017 ne isko core bana diya.', '2014 Bahdanau → 2017 Transformer core.'),
      dryRun: bi(`2 tokens, d=2:
QKᵀ = [[2, 1], [0.5, 3]] / √2
softmax row0 = [0.67, 0.33]
out[0] = 0.67·V[0] + 0.33·V[1]`, `2-token attention dry run.`),
      numericalExample: bi('N=1000 tokens → attention matrix 1000×1000 = 1M scores per head. Why Flash Attention matters.', 'N=1000 → 1M scores per head.'),
      matrixDimensions: bi('Q,K,V:(N,d). QKᵀ:(N,N). softmax:(N,N). out:(N,d).', 'Attention shapes.'),
      asciiDiagram: bi(`     Kᵀ
Q  [scores]  → /√d → softmax → [weights]
                              ↓
                              V
                           [output]`, `Attention formula flow`),
      interviewQuestions: { hinglish: ['√d scaling kyun?', 'Attention complexity?', 'Self-attention meaning?'], english: ['Why √d scaling?', 'Attention complexity?', 'Self-attention?'] },
      commonMistakes: { hinglish: ['Softmax skip', 'Scale factor bhoolna'], english: ['Skipping softmax', 'Forgetting scale'] },
      summary: bi('Attention = QKᵀ/√d → softmax → ×V. O(N²) but parallelizable. Core of transformer.', 'Scaled dot-product attention. O(N²) parallelizable.'),
    }),
  },
  {
    id: 'softmax',
    sectionId: 'transformer-fundamentals',
    title: { hinglish: 'Softmax', english: 'Softmax' },
    duration: '5m',
    tagline: { hinglish: 'Raw scores → probabilities (sum = 1)', english: 'Raw scores → probabilities (sum = 1)' },
    intro: {
      hinglish: 'Attention scores raw hain — negative, positive, kuch bhi. Softmax unhe 0-1 probabilities mein convert karta hai jinka sum exactly 1 hota hai.',
      english: 'Attention scores are raw — any value. Softmax converts them to 0-1 probabilities summing to exactly 1.',
    },
    explanation: {
      hinglish: `softmax(x_i) = exp(x_i) / Σ exp(x_j)

Example: [2, 1, 0.1] → [0.66, 0.24, 0.10] (sum=1)

**Kyun:** Weights honi chahiye jo weighted average ban sakein. Negative weights sense nahi.`,
      english: `softmax(x_i) = exp(x_i) / Σ exp(x_j). Converts scores to valid probability weights.`,
    },
    keyPoints: { hinglish: ['exp() use', 'Sum = 1', 'Largest score → highest prob'], english: ['Uses exp()', 'Sum = 1', 'Max score → max prob'] },
    analogy: { hinglish: '5 friends mein 100₹ baantna — sabko positive share, total 100. Softmax wahi distribution hai.', english: 'Split ₹100 among friends — all positive, total 100. Softmax is that distribution.' },
    steps: [
      { title: bi('Raw scores', 'Raw scores'), caption: bi('[2, 1, 0.1]', '[2, 1, 0.1]') },
      { title: bi('exp()', 'exp()'), caption: bi('[7.39, 2.72, 1.11]', '[7.39, 2.72, 1.11]') },
      { title: bi('Normalize', 'Normalize'), caption: bi('Divide by sum', 'Divide by sum') },
      { title: bi('Probabilities', 'Probabilities'), caption: bi('Sum = 1', 'Sum = 1') },
      { title: bi('× V', '× V'), caption: bi('Weighted average', 'Weighted average') },
    ],
    teaching: teaching({
      intuition: bi('Scores compare karte hain relative importance. Softmax winner ko zyada weight deta hai lekin sabko thoda-thoda.', 'Scores compare relative importance. Softmax boosts winner but gives everyone some weight.'),
      problemStatement: bi('Raw dot products kisi bhi range mein — weighted average ke liye valid weights chahiye (positive, sum=1).', 'Raw dots any range — need valid weights for weighted average.'),
      whyInvented: bi('Classification output layer standard. Attention ne adopt kiya score normalization ke liye.', 'Classification standard → attention adopted.'),
      dryRun: bi(`x = [2, 1, 0.1]
exp = [7.39, 2.72, 1.11]
sum = 11.22
softmax = [0.659, 0.242, 0.099] ✓ sum=1`, `Numerical softmax step by step.`),
      numericalExample: bi('[1000, 1, 1] → softmax ≈ [1, 0, 0] — winner takes all. Temperature scaling can soften.', 'Extreme scores → winner takes all.'),
      matrixDimensions: bi('Input scores (N,N) or (N,V). Softmax along last dimension. Output same shape, rows sum to 1.', 'Softmax along last dim.'),
      asciiDiagram: bi(`scores [2.0, 1.0, 0.1]
   ↓ exp
[7.39, 2.72, 1.11]
   ↓ / sum(11.22)
[0.66, 0.24, 0.10]  ← attention weights`, `Softmax pipeline`),
      interviewQuestions: { hinglish: ['Softmax vs sigmoid?', 'Numerical overflow softmax mein?', 'Temperature kya karti hai?'], english: ['Softmax vs sigmoid?', 'Overflow in softmax?', 'What is temperature?'] },
      commonMistakes: { hinglish: ['Softmax without exp (galat)', 'Row vs column softmax confuse'], english: ['Softmax without exp', 'Row vs column confusion'] },
      summary: bi('Softmax = exp + normalize. Scores → probabilities sum 1. Used in attention and output layer.', 'Softmax converts scores to probabilities summing to 1.'),
    }),
  },
  {
    id: 'layer-normalization',
    sectionId: 'transformer-fundamentals',
    title: { hinglish: 'Layer Normalization', english: 'Layer Normalization' },
    duration: '5m',
    tagline: { hinglish: 'Training stable rakhne ke liye — mean 0, variance 1', english: 'Keeps training stable — mean 0, variance 1' },
    intro: {
      hinglish: 'LayerNorm har token ke feature vector ko normalize karta hai — mean subtract, divide by std dev, phir learned scale (γ) aur shift (β) apply.',
      english: 'LayerNorm normalizes each token\'s feature vector — subtract mean, divide by std dev, then apply learned scale (γ) and shift (β).',
    },
    explanation: {
      hinglish: `LN(x) = γ · (x - μ) / σ + β
μ, σ = mean, std across features (per token)
γ, β = learnable parameters

Transformer: Pre-LN or Post-LN (after residual)`,
      english: `LN(x) = γ(x-μ)/σ + β. Per-token normalization. γ, β learnable.`,
    },
    keyPoints: { hinglish: ['Stable training', 'γ, β learnable', 'Per token normalize'], english: ['Stable training', 'γ, β learnable', 'Per token'] },
    analogy: { hinglish: 'Exam scores normalize karna — different subjects comparable. LayerNorm features comparable rakhta hai.', english: 'Normalizing exam scores across subjects. LayerNorm normalizes features.' },
    steps: [
      { title: bi('Input vector', 'Input vector'), caption: bi('Per token', 'Per token') },
      { title: bi('μ, σ', 'μ, σ'), caption: bi('Mean, std', 'Mean, std') },
      { title: bi('Normalize', 'Normalize'), caption: bi('(x-μ)/σ', '(x-μ)/σ') },
      { title: bi('γ, β', 'γ, β'), caption: bi('Scale shift', 'Scale shift') },
      { title: bi('Output', 'Output'), caption: bi('Stable features', 'Stable features') },
    ],
    teaching: teaching({
      intuition: bi('Deep networks mein values explode ya vanish ho sakti hain. LayerNorm har layer ke output ko controlled range mein rakhta hai.', 'Deep nets values explode/vanish. LayerNorm keeps outputs controlled.'),
      problemStatement: bi('Training deep transformers without normalization = unstable gradients, slow convergence.', 'Without norm, deep transformers train poorly.'),
      whyInvented: bi('BatchNorm CNNs ke liye tha. LayerNorm sequences ke liye better (variable length).', 'BatchNorm for CNNs. LayerNorm for sequences.'),
      dryRun: bi(`x = [2, 4, 6]
μ = 4, σ = 1.63
normalized = [-1.22, 0, 1.22]
γ=1, β=0 → output same (default scale)`, `LayerNorm numeric example.`),
      numericalExample: bi('γ, β same size as d_model (768 each) = 1536 extra params per LayerNorm. 2 per layer × 12 layers.', 'LN param count.'),
      matrixDimensions: bi('Input (N,D). Normalize across D dim per row. Output (N,D). γ,β: (D,).', 'LayerNorm shapes.'),
      asciiDiagram: bi(`x (features)
 ↓ mean, std per token
(x - μ) / σ
 ↓
γ · ... + β
 ↓
normalized output`, `LayerNorm flow`),
      interviewQuestions: { hinglish: ['LayerNorm vs BatchNorm?', 'Pre-LN vs Post-LN?', 'γ, β kyun chahiye?'], english: ['LN vs BN?', 'Pre-LN vs Post-LN?', 'Why γ, β?'] },
      commonMistakes: { hinglish: ['BatchNorm use karna sequences pe', 'LN direction galat'], english: ['BatchNorm on sequences', 'Wrong norm dimension'] },
      summary: bi('LayerNorm = per-token feature normalization + γ,β. Training stability ke liye essential.', 'LayerNorm stabilizes training per token.'),
    }),
  },
  {
    id: 'feed-forward',
    sectionId: 'transformer-fundamentals',
    title: { hinglish: 'Feed Forward Network (FFN)', english: 'Feed Forward Network (FFN)' },
    duration: '5m',
    tagline: { hinglish: 'Har token independently process — 2 linear layers + activation', english: 'Each token processed independently — 2 linear layers + activation' },
    intro: {
      hinglish: 'Attention tokens ke beech relation sikhata hai. FFN har token ko independently transform karta hai — usually 4× wider hidden layer (768 → 3072 → 768).',
      english: 'Attention learns relations between tokens. FFN transforms each token independently — usually 4× wider hidden (768 → 3072 → 768).',
    },
    explanation: {
      hinglish: `FFN(x) = W2 · ReLU(W1 · x + b1) + b2
W1: (D, 4D), W2: (4D, D)
Applied to EACH token separately (same weights)

~2/3 of transformer params FFN mein hain!`,
      english: `FFN(x) = W2·ReLU(W1·x+b1)+b2. W1:(D,4D), W2:(4D,D). Per token. ~2/3 params in FFN.`,
    },
    keyPoints: { hinglish: ['Per-token same weights', '4× expansion typical', 'Most parameters here'], english: ['Per-token shared weights', '4× expansion', 'Most params here'] },
    analogy: { hinglish: 'Attention = group discussion. FFN = har bande ka personal homework same template pe.', english: 'Attention = group discussion. FFN = personal homework per person.' },
    steps: [
      { title: bi('Input x', 'Input x'), caption: bi('Per token D-dim', 'Per token D-dim') },
      { title: bi('W1 expand', 'W1 expand'), caption: bi('D → 4D', 'D → 4D') },
      { title: bi('ReLU', 'ReLU'), caption: bi('Non-linearity', 'Non-linearity') },
      { title: bi('W2 shrink', 'W2 shrink'), caption: bi('4D → D', '4D → D') },
      { title: bi('Output', 'Output'), caption: bi('Back to D', 'Back to D') },
    ],
    teaching: teaching({
      intuition: bi('Attention mix karta hai tokens ko. FFN "sochta" hai har mixed representation pe individually — facts store, transform.', 'Attention mixes. FFN "thinks" on each mixed representation.'),
      problemStatement: bi('Attention linear mixing hai. FFN non-linearity add karta hai — without it, deep net = one linear layer.', 'Attention is linear mixing. FFN adds non-linearity.'),
      whyInvented: bi('Standard MLP in every transformer block — paper original design.', 'Original transformer design.'),
      dryRun: bi(`x shape (768,)
W1: (768, 3072) → h (3072,)
ReLU(h) → max(0, h)
W2: (3072, 768) → out (768,)`, `FFN per-token shapes.`),
      numericalExample: bi('W1: 768×3072=2.36M, W2: 3072×768=2.36M → ~4.7M per layer FFN. 12 layers ≈ 56M FFN params.', 'FFN param count.'),
      matrixDimensions: bi('x:(D,). W1:(D,4D). h:(4D,). W2:(4D,D). out:(D,). Batch: (N,D) same weights all rows.', 'FFN dimensions.'),
      asciiDiagram: bi(`x (D)
 ↓ W1
h (4D) — expand
 ↓ ReLU
 ↓ W2
out (D) — back`, `FFN expand-contract`),
      interviewQuestions: { hinglish: ['FFN vs attention role?', 'Kyun 4× expansion?', 'MoE FFN se replace?'], english: ['FFN vs attention role?', 'Why 4× expansion?', 'MoE replaces FFN?'] },
      commonMistakes: { hinglish: ['FFN cross-token (nahi — per token)', 'Attention enough without FFN'], english: ['FFN cross-token', 'Attention enough alone'] },
      summary: bi('FFN = 2 linear + ReLU, per token, 4× hidden. Most params. Non-linearity after attention.', 'FFN = MLP per token, most parameters.'),
    }),
  },
  {
    id: 'prediction',
    sectionId: 'transformer-fundamentals',
    title: { hinglish: 'Prediction — Next Token', english: 'Prediction — Next Token' },
    duration: '5m',
    tagline: { hinglish: 'Last hidden vector → vocab scores → softmax → next token', english: 'Last hidden vector → vocab scores → softmax → next token' },
    intro: {
      hinglish: 'Final layer ka last position hidden vector use hota hai next token predict karne ke liye. Linear layer vocab size tak project → softmax → probabilities.',
      english: 'The last position hidden vector from the final layer predicts the next token. Linear to vocab size → softmax → probabilities.',
    },
    explanation: {
      hinglish: `h_last = H[N-1]  (last token position)
logits = h_last · W_out   (D × V)
probs = softmax(logits)
next_token = argmax(probs) or sample

Autoregressive: append token, repeat.`,
      english: `h_last → W_out → logits → softmax → sample/argmax. Autoregressive loop.`,
    },
    keyPoints: { hinglish: ['Last position for next token', 'Linear to vocab', 'Greedy or sample'], english: ['Last position', 'Linear to vocab', 'Greedy or sample'] },
    analogy: { hinglish: 'Sentence complete karo game — har turn pe sabse likely word choose karo.', english: 'Complete the sentence game — pick most likely word each turn.' },
    steps: [
      { title: bi('Final H', 'Final H'), caption: bi('Last position', 'Last position') },
      { title: bi('Linear', 'Linear'), caption: bi('D → vocab', 'D → vocab') },
      { title: bi('Logits', 'Logits'), caption: bi('Raw scores', 'Raw scores') },
      { title: bi('Softmax', 'Softmax'), caption: bi('Probabilities', 'Probabilities') },
      { title: bi('Next token', 'Next token'), caption: bi('Sample/argmax', 'Sample/argmax') },
    ],
    teaching: teaching({
      intuition: bi('Model ne poora context process kiya — last vector mein "agla word kya hona chahiye" compressed hai.', 'Model processed context — last vector compresses "what word next".'),
      problemStatement: bi('Vocab 50K+ — need projection from D-dim understanding to 50K choices.', 'Project D-dim to 50K vocab choices.'),
      whyInvented: bi('Language modeling = next token prediction. GPT training objective.', 'LM = next token prediction.'),
      dryRun: bi(`"The cat" → h_last
W_out → logits["sat"]=3.2, ["ran"]=1.1, ...
softmax → P("sat")=0.45 highest
append "sat" → "The cat sat" → repeat`, `Next token dry run.`),
      numericalExample: bi('W_out: (768, 50257) = 38.6M params. Often tied with embedding (weight sharing).', 'Output layer params.'),
      matrixDimensions: bi('h_last:(D,). W_out:(D,V). logits:(V,). probs:(V,).', 'Prediction shapes.'),
      asciiDiagram: bi(`H[last] (D)
    ↓ Linear W_out
logits (V)
    ↓ softmax
probs (V) → "sat" 0.45
    ↓ append
autoregressive loop`, `Prediction pipeline`),
      interviewQuestions: { hinglish: ['Last token position kyun?', 'Greedy vs sampling?', 'Tied embeddings?'], english: ['Why last position?', 'Greedy vs sampling?', 'Tied embeddings?'] },
      commonMistakes: { hinglish: ['Middle token se predict', 'Logits = probabilities'], english: ['Predict from middle token', 'Logits are probabilities'] },
      summary: bi('Prediction = last hidden → linear → softmax → next token. Autoregressive generation loop.', 'Last hidden → softmax → next token loop.'),
    }),
  },
]
