import type { Concept } from '../../types/concept'
import { bi, teaching } from './teaching-utils'

export const foundationConcepts: Concept[] = [
  {
    id: 'vector-databases',
    sectionId: 'foundations',
    title: { hinglish: 'Vector Databases', english: 'Vector Databases' },
    duration: '7m',
    tagline: { hinglish: 'Embeddings store karo, similarity se search karo — RAG ka foundation', english: 'Store embeddings, search by similarity — foundation of RAG' },
    intro: {
      hinglish: 'Vector Database embeddings (high-dimensional vectors) store karti hai aur similarity search karti hai — "mujhe is sentence jaisa content do". Pinecone, Weaviate, Milvus, Chroma examples hain.',
      english: 'A Vector Database stores embeddings (high-dimensional vectors) and performs similarity search — "give me content like this sentence". Pinecone, Weaviate, Milvus, Chroma are examples.',
    },
    explanation: {
      hinglish: `**Components:**
- **Embeddings:** Text/image → dense vectors (768D, 1536D)
- **Similarity:** Cosine similarity ya Euclidean distance
- **ANN Index:** HNSW, IVF — fast approximate search
- **Metadata:** Original text, source, filters

**ANN vs Exact:** Exact = har vector check. ANN = index se ~nearest. Production mein ANN.

**Why needed:** SQL "WHERE text LIKE" semantic nahi samajhta. "happy" aur "joyful" similar vectors hain.`,
      english: `**Components:** Embeddings, cosine/Euclidean similarity, ANN index (HNSW, IVF), metadata.

**ANN vs Exact:** Exact checks every vector. ANN finds ~nearest via index.

**Why needed:** SQL can't do semantic search. "happy" and "joyful" have similar vectors.`,
    },
    keyPoints: {
      hinglish: ['Semantic search', 'Cosine / Euclidean', 'ANN for scale', 'RAG backbone'],
      english: ['Semantic search', 'Cosine / Euclidean', 'ANN for scale', 'RAG backbone'],
    },
    analogy: {
      hinglish: 'Library jahan books color se nahi — meaning se sorted hain. Similar meaning wali books paas paas.',
      english: 'A library where books are sorted by meaning, not color. Similar meanings sit nearby.',
    },
    steps: [
      { title: bi('Embed documents', 'Embed documents'), caption: bi('Text → vectors', 'Text → vectors') },
      { title: bi('Index build', 'Index build'), caption: bi('HNSW / IVF', 'HNSW / IVF') },
      { title: bi('Query embed', 'Query embed'), caption: bi('User query → vector', 'User query → vector') },
      { title: bi('ANN search', 'ANN search'), caption: bi('Top-k similar', 'Top-k similar') },
      { title: bi('Return + RAG', 'Return + RAG'), caption: bi('Context to LLM', 'Context to LLM') },
    ],
    teaching: teaching({
      intuition: bi('Google search keywords match karta hai. Vector DB **meaning** match karti hai — "car repair" query "automobile maintenance" doc bhi la sakti hai.', 'Google matches keywords. Vector DB matches **meaning**.'),
      problemStatement: bi('Millions of documents, semantic "find similar" — brute force O(n) per query impossible at scale.', 'Millions of docs, semantic similarity — brute force impossible.'),
      whyInvented: bi('LLM + RAG boom ne vector DBs mainstream kiye. Embeddings already the; index + storage + API chahiye tha.', 'LLM + RAG boom made vector DBs mainstream.'),
      dryRun: bi(`Docs: ["cat sits", "dog runs", "car speeds"]
Embeddings: E1, E2, E3
Query: "feline rests" → Eq
Cosine(Eq, E1)=0.92, E2=0.3, E3=0.1 → return "cat sits"`, `Embed, compare cosine, return top match.`),
      numericalExample: bi('Cosine(A,B) = (A·B)/(|A||B|). A=[1,0], B=[0.9,0.1] → cos≈0.99 (similar). A=[1,0], C=[0,1] → cos=0 (orthogonal).', 'Cosine formula with 2D example.'),
      matrixDimensions: bi('n documents × d dimensions matrix. Query: (1, d). Similarity: (1,d)·(d,n) = scores (1,n).', 'Docs matrix (n,d), query (1,d).'),
      asciiDiagram: bi(`Query "happy birthday"
    ↓ embed
  [0.2, 0.8, ...]
    ↓ ANN search
  Doc₁ "joyful celebration" ✓ 0.94
  Doc₂ "sad news" ✗ 0.12`, `Query embed → ANN → top similar docs`),
      interviewQuestions: { hinglish: ['Cosine vs Euclidean kab use karoge?', 'ANN vs exact tradeoff?', 'Vector DB vs traditional DB?'], english: ['Cosine vs Euclidean?', 'ANN vs exact?', 'Vector DB vs traditional DB?'] },
      commonMistakes: { hinglish: ['Embeddings normalize na karna cosine ke saath', 'Chhote dataset pe bhi HNSW overkill'], english: ['Not normalizing for cosine', 'HNSW overkill on tiny data'] },
      summary: bi('Vector DB = embeddings + similarity + ANN index. RAG, recommendation, search ka core infrastructure.', 'Vector DB = embeddings + similarity + ANN. Core of RAG.'),
    }),
  },
  {
    id: 'tokenization',
    sectionId: 'foundations',
    title: { hinglish: 'Tokenization', english: 'Tokenization' },
    duration: '6m',
    tagline: { hinglish: 'Sentence → chhote pieces (tokens) → numbers (IDs)', english: 'Sentence → small pieces (tokens) → numbers (IDs)' },
    intro: {
      hinglish: 'Model text directly nahi padhta — pehle tokenization: sentence ko tokens mein todo, phir har token ko vocabulary se ID assign karo.',
      english: 'Models don\'t read text directly — tokenization splits sentences into tokens, then assigns each token an ID from the vocabulary.',
    },
    explanation: {
      hinglish: `**Flow:** "I love AI" → ["I", " love", " AI"] → [40, 1842, 9557]

**Subword (BPE):** Rare words ko pieces mein: "unhappiness" → ["un", "happiness"] — vocabulary size control.

**Why IDs:** Neural networks numbers process karte hain, strings nahi.

**Vocabulary:** Fixed size dict — GPT-4 ~100K tokens.`,
      english: `**Flow:** "I love AI" → tokens → [40, 1842, 9557]

**Subword (BPE):** Split rare words: "unhappiness" → ["un", "happiness"]

**Why IDs:** Neural nets process numbers.

**Vocabulary:** ~100K tokens for GPT-4.`,
    },
    keyPoints: { hinglish: ['BPE / SentencePiece common', 'IDs = vocabulary index', 'Subword handles unknown words'], english: ['BPE / SentencePiece common', 'IDs = vocabulary index', 'Subword handles OOV'] },
    analogy: { hinglish: 'Dictionary mein har word ka page number — token ID wahi page number hai.', english: 'Dictionary page numbers — token IDs are page numbers.' },
    steps: [
      { title: bi('Raw text', 'Raw text'), caption: bi('User sentence', 'User sentence') },
      { title: bi('Tokenizer', 'Tokenizer'), caption: bi('BPE split', 'BPE split') },
      { title: bi('Token strings', 'Token strings'), caption: bi('Subword pieces', 'Subword pieces') },
      { title: bi('Lookup IDs', 'Lookup IDs'), caption: bi('Vocabulary map', 'Vocabulary map') },
      { title: bi('ID sequence', 'ID sequence'), caption: bi('Input to model', 'Input to model') },
    ],
    teaching: teaching({
      intuition: bi('Computer ko "hello" string samajh nahi — integer chahiye. Tokenization text ko model-friendly numbers mein convert karta hai.', 'Computers need integers, not strings. Tokenization converts text to numbers.'),
      problemStatement: bi('Infinite possible words — fixed vocabulary chahiye. Subword tokenization balance: rare words handle + vocab size limit.', 'Infinite words — need fixed vocab. Subword balances OOV + size.'),
      whyInvented: bi('BPE originally compression ke liye — NLP mein adapt: GPT, LLaMA sab BPE use karte hain.', 'BPE from compression — adapted for GPT, LLaMA.'),
      dryRun: bi(`"unhappiness" BPE:
Vocab has: "un", "happiness", "unhappiness"?
Try longest match → ["un", "happiness"]
IDs: [345, 8921]`, `BPE longest-match subword split example.`),
      numericalExample: bi('"ChatGPT is cool" → 5 tokens → [9456, 41346, 318, 3609, 13] (example IDs). Context window = max token count (4096, 128K).', '5 tokens with example IDs.'),
      matrixDimensions: bi('Input shape after tokenization: (batch, seq_len) — integers, NOT floats yet. Embedding layer converts to (batch, seq_len, d_model).', 'Shape (batch, seq_len) integers → embedding → (batch, seq_len, d_model).'),
      asciiDiagram: bi(`"I love AI"
    ↓ Tokenizer
["I", " love", " AI"]
    ↓ Vocab lookup
[  40,   1842,  9557]
    ↓ Embedding layer (next step)`, `Text → tokens → IDs`),
      interviewQuestions: { hinglish: ['BPE kaise kaam karta hai?', 'Token vs character?', 'Kyoon subword better hai word-level se?'], english: ['How does BPE work?', 'Token vs character?', 'Why subword over word-level?'] },
      commonMistakes: { hinglish: ['Token = word samajhna (often false)', 'Different tokenizers same IDs (false — vocab differs)'], english: ['Token equals word', 'Same IDs across tokenizers'] },
      summary: bi('Tokenization = text → tokens → IDs. BPE subword standard. IDs feed embedding layer.', 'Tokenization = text → tokens → IDs. BPE standard.'),
    }),
  },
  {
    id: 'embeddings',
    sectionId: 'foundations',
    title: { hinglish: 'Embeddings', english: 'Embeddings' },
    duration: '8m',
    tagline: { hinglish: 'Token ID → dense vector — meaning numbers mein', english: 'Token ID → dense vector — meaning in numbers' },
    intro: {
      hinglish: 'Embedding layer har token ID ko ek vector (list of numbers) mein convert karta hai. Similar meaning = similar vectors. Positional encoding position add karti hai.',
      english: 'The embedding layer converts each token ID to a vector. Similar meaning = similar vectors. Positional encoding adds position information.',
    },
    explanation: {
      hinglish: `**Embedding Matrix E:** shape (vocab_size, d_model) — e.g. (50000, 768)
**Lookup:** token_id=40 → E[40] = 768-dim vector
**Sequence:** N tokens → matrix (N, d_model)
**Positional Encoding:** position info add — "cat" position 2 vs position 5 different
**Final X:** token_embedding + positional = input to transformer`,
      english: `**E:** (vocab_size, d_model). Lookup: id → row vector. N tokens → (N, d_model). Add positional encoding → input X.`,
    },
    keyPoints: { hinglish: ['Vocab × d_model matrix', 'Lookup = row select', 'Positional encoding zaroori', 'd_model = 768, 4096 typical'], english: ['Vocab × d_model matrix', 'Lookup = row select', 'Positional encoding required', 'd_model typical 768-4096'] },
    analogy: { hinglish: 'Har word ka GPS coordinate — paas ke words paas ke coordinates. Embedding space mein meaning map hoti hai.', english: 'GPS coordinates for words — nearby words, nearby coordinates.' },
    steps: [
      { title: bi('Token IDs', 'Token IDs'), caption: bi('[40, 1842, 9557]', '[40, 1842, 9557]') },
      { title: bi('E lookup', 'E lookup'), caption: bi('Row from matrix', 'Row from matrix') },
      { title: bi('N × D matrix', 'N × D matrix'), caption: bi('Sequence vectors', 'Sequence vectors') },
      { title: bi('+ Position', '+ Position'), caption: bi('Positional encoding', 'Positional encoding') },
      { title: bi('Input X', 'Input X'), caption: bi('To attention', 'To attention') },
    ],
    teaching: teaching({
      intuition: bi('ID 40 sirf index hai — koi meaning nahi. Embedding row mein 768 numbers hain jo training mein "meaning" seekhte hain.', 'ID 40 is just index. Embedding row learns meaning through training.'),
      problemStatement: bi('Model ko order aur meaning dono chahiye. IDs order nahi batate. Embeddings + position solve karte hain.', 'Model needs order and meaning. IDs alone don\'t give order.'),
      whyInvented: bi('Word2Vec (2013) ne popular kiya — "king - man + woman = queen". Transformers ne isko layer 0 bana diya.', 'Word2Vec popularized it. Transformers made it layer 0.'),
      dryRun: bi(`IDs: [40, 1842]
E[40] = [0.1, -0.3, 0.5, ...]  (768 nums)
E[1842] = [0.2, 0.1, -0.4, ...]
PE[0] + E[40] → x₀
PE[1] + E[1842] → x₁
X = stack → (2, 768)`, `Lookup rows, add position, stack to X.`),
      numericalExample: bi('vocab=50K, d_model=768 → embedding params = 50000×768 = 38.4M parameters (just embedding layer!).', 'Embedding param count example.'),
      matrixDimensions: bi(`E: (V, D). IDs (N,) → lookup → (N, D). PE: (N, D). X = (N, D). Batch: (B, N, D).`, `E (V,D), output (N,D) or (B,N,D).`),
      asciiDiagram: bi(`Embedding Matrix E (vocab × d):
Row 40:  [0.1, -0.3, 0.5, ...]  ← "I"
Row 1842: [0.2, 0.1, -0.4, ...] ← " love"

     + Positional Encoding
     = Input Matrix X (N × d_model)`, `Embedding lookup + position = X`),
      interviewQuestions: { hinglish: ['Embedding dimension ka matlab?', 'Positional encoding kyun?', 'Embedding vs one-hot?'], english: ['Meaning of embedding dim?', 'Why positional encoding?', 'Embedding vs one-hot?'] },
      commonMistakes: { hinglish: ['Embedding aur output vector confuse', 'Position bhool jana'], english: ['Confusing embedding with output', 'Forgetting position'] },
      summary: bi('Embeddings = ID to dense vector via matrix lookup. + Positional encoding = X. Foundation of transformer input.', 'Embeddings = ID to vector. + PE = X.'),
    }),
  },
]
