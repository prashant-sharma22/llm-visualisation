import type { Concept } from '../../types/concept'
import { bi, fullTeaching, teaching } from './teaching-utils'

export const introConcepts: Concept[] = [
  {
    id: 'what-is-ai',
    sectionId: 'intro',
    title: { hinglish: 'AI Kya Hai? — Shuruat Yahan Se', english: 'What Is AI? — Start Here' },
    duration: '7m',
    tagline: {
      hinglish: 'Artificial Intelligence, Machine Learning, Deep Learning, LLM — hierarchy samjho pehle',
      english: 'Understand the hierarchy: Artificial Intelligence, Machine Learning, Deep Learning, LLM',
    },
    intro: {
      hinglish:
        'ChatGPT use karte ho, lekin **AI actually kya hai**? Yeh chapter bilkul zero se shuru karta hai — AI → ML → Deep Learning → LLM ka pyramid. Iske bina baaki sab jargon lagega.',
      english:
        'You use ChatGPT, but **what is AI really**? This chapter starts from absolute zero — the pyramid from AI → ML → Deep Learning → LLM. Without this, everything else feels like jargon.',
    },
    explanation: {
      hinglish: `**Hierarchy (Russian doll):**

\`\`\`
🌍 Artificial Intelligence (AI)
   └── sab cheezein jo machine ko "smart" banati hain
       📦 Machine Learning (ML)
           └── data se patterns seekhna (rules manually likhne ki jagah)
               🧠 Deep Learning (DL)
                   └── neural networks — layers of math
                       💬 LLM (Large Language Model)
                           └── text pe trained giant neural net
\`\`\`

**AI (broad):** Chess engine, GPS route, face unlock, ChatGPT — sab AI ke under.

**ML (subset):** Spam filter jo emails se seekha, recommendation system.

**DL (subset of ML):** Image recognition, speech-to-text — **neural networks**.

**LLM (subset of DL):** GPT, Claude, Llama — **language** pe trained, next word predict.

**Key difference:**
| Approach | Kaise kaam karta hai |
|----------|---------------------|
| Rules-based | if-else: "agar 'hello' toh reply 'hi'" |
| ML | examples se pattern seekho |
| DL/LLM | millions of examples + billions of parameters |

**Is course ka focus:** DL → specifically **Transformer LLM** + uske around ka ecosystem (vectors, RAG, agents).`,
      english: `**Hierarchy:**

AI (broadest) → ML (learn from data) → DL (neural networks) → LLM (language models).

**Rules-based:** hand-written if-else.
**ML:** learn patterns from examples.
**DL/LLM:** neural nets with millions/billions of parameters trained on massive text.

**This course focuses on:** Transformers, LLMs, vectors, RAG, agents.`,
    },
    keyPoints: {
      hinglish: [
        'AI ⊃ ML ⊃ DL ⊃ LLM — nested subsets',
        'Rules-based AI purana; ML/DL aaj ka standard',
        'LLM = DL model trained on text',
        'Yeh course LLM engine deep dive karta hai',
      ],
      english: [
        'AI ⊃ ML ⊃ DL ⊃ LLM — nested subsets',
        'Rules-based is legacy; ML/DL is standard today',
        'LLM = DL model trained on text',
        'This course deep-dives the LLM engine',
      ],
    },
    analogy: {
      hinglish:
        'Transport hierarchy — **Vehicles** (AI) → **Cars** (ML) → **Electric Cars** (DL) → **Tesla Autopilot** (LLM). Sab vehicles hain, lekin Tesla Autopilot ek specific type hai.',
      english:
        'Transport hierarchy — **Vehicles** (AI) → **Cars** (ML) → **Electric Cars** (DL) → **Tesla Autopilot** (LLM). All are vehicles, but Autopilot is a specific type.',
    },
    steps: [
      { title: bi('Real world AI', 'Real world AI'), caption: bi('Maps, face ID, chatbots', 'Maps, face ID, chatbots') },
      { title: bi('ML: learn from data', 'ML: learn from data'), caption: bi('Patterns, not rules', 'Patterns, not rules') },
      { title: bi('DL: neural nets', 'DL: neural nets'), caption: bi('Layers of math', 'Layers of math') },
      { title: bi('LLM: language', 'LLM: language'), caption: bi('Next token predict', 'Next token predict') },
      { title: bi('This course', 'This course'), caption: bi('LLM engine deep dive', 'LLM engine deep dive') },
    ],
    teaching: fullTeaching({
      whyFirst: bi(
        '**Sabse pehle yeh kyun?** Log seedha "attention" ya "KV cache" padhna chahte hain — lekin bina AI/ML/DL context ke woh alien lagta hai. Pehle map dekho, phir road.',
        '**Why this first?** People jump to "attention" or "KV cache" — without AI/ML/DL context it feels alien. See the map first, then the road.'
      ),
      intuition: bi(
        'Socho tumhe cooking seekhni hai. Pehle samjho **kitchen kya hai** (AI), phir **recipes** (ML), phir **molecular gastronomy** (DL), phir **sous-vide machine** (LLM). Har level pehle wale ke andar hai.',
        'Learning to cook: first what is a **kitchen** (AI), then **recipes** (ML), then **molecular gastronomy** (DL), then a **sous-vide machine** (LLM). Each level nests inside the previous.'
      ),
      problem: bi(
        '**Problem:** "AI" media mein sab kuch hai — chatbot bhi AI, calculator bhi AI bol diya jata hai. Beginners confuse ho jaate hain. Clear hierarchy chahiye taaki **LLM exactly kahan fit hota hai** samajh aaye.',
        '**Problem:** "AI" is used for everything in media. Beginners get confused. We need a clear hierarchy so you know **exactly where LLMs fit**.'
      ),
      whyInvented: bi(
        'AI term 1956 se hai (Dartmouth workshop). ML 1980s–90s rise. DL 2012 ImageNet breakthrough. LLM 2018+ GPT era. Har generation pehli ki limitations solve karti rahi — rules → data → scale.',
        'AI since 1956. ML rose in the 1980s–90s. DL breakthrough 2012. LLM era 2018+. Each generation solved the previous limitations — rules → data → scale.'
      ),
      buildFromScratch: bi(
        `**Task:** Email spam detect karna

1. **Rules-based:** if "FREE MONEY" in subject → spam (hackers bypass kar lenge)
2. **ML:** 10,000 labeled emails → learn word patterns → 95% accuracy
3. **DL:** character-level CNN → typos bhi pakadta hai
4. **LLM:** "Is this email spam?" prompt → reasoning + context

Same problem, better tools over time.`,
        `**Task:** Spam detection — rules fail, ML learns patterns, DL handles typos, LLM reasons in context.`
      ),
      derivation: bi(
        'No heavy math here — conceptual inclusion:\n\nAI = { systems showing intelligent behavior }\nML = { AI systems that learn from data }\nDL = { ML with neural networks (≥2 layers) }\nLLM = { DL model with transformer arch, trained on text, autoregressive }',
        'Conceptual: AI ⊃ ML ⊃ DL ⊃ LLM. LLM adds transformer architecture + text training + autoregressive decoding.'
      ),
      matrixShapes: bi(
        'Abhi matrices nahi — agle chapters mein. Bas yaad rakho: DL/LLM ke andar sab **tensors** (multi-dimensional arrays) hain — wahi vectors hain high dimensions mein.',
        'No matrices yet — coming in next chapters. Remember: inside DL/LLMs everything is **tensors** — vectors in high dimensions.'
      ),
      numerical: bi(
        'Toy scale comparison:\n• Rules: 50 if-else lines\n• ML (logistic regression): ~1,000 parameters\n• DL (small CNN): ~1M parameters\n• LLM (Llama 3 70B): **70,000,000,000** parameters\n\nScale jump = capability jump',
        'Parameter scale: rules (50 lines) → ML (1K) → DL (1M) → LLM (70B). Scale drives capability.'
      ),
      commonQuestions: {
        hinglish: [
          '**AI aur ML same?** → Nahi. ML AI ka ek tarika hai. AI broader hai.',
          '**ChatGPT AI hai ya LLM?** → Dono. LLM ek type hai, AI umbrella term.',
          '**Coding aani chahiye?** → Basics helpful, lekin yeh course concepts pe focus — math/visual.',
        ],
        english: [
          '**AI vs ML?** → ML is one approach to AI. AI is broader.',
          '**ChatGPT AI or LLM?** → Both. LLM is the type, AI is the umbrella.',
          '**Need coding?** → Helpful but this course focuses on concepts — math/visual.',
        ],
      },
      internalMemory: bi(
        'Rules-based: almost no memory. ML model: MBs. DL model: GBs (weights). LLM inference: 40–200+ GB VRAM for large models. Scale defines hardware needs.',
        'Rules: negligible. ML: MBs. DL/LLM weights: GBs to hundreds of GBs VRAM at inference.'
      ),
      production: bi(
        'Industry: rules bots (legacy support), ML (fraud detection), DL (vision), LLM (ChatGPT, Copilot). Production LLM stack = model + vector DB + APIs + guardrails — poora course yahi cover karega.',
        'Industry uses all layers. Production LLM = model + vector DB + APIs + guardrails — this full course.'
      ),
      interview: {
        hinglish: [
          '**Basic:** AI, ML, DL, LLM mein difference?',
          '**Intermediate:** Rules-based vs ML example do?',
          '**Advanced:** Kyun LLM rules-based chatbot replace kar raha hai?',
        ],
        english: [
          '**Basic:** Difference between AI, ML, DL, LLM?',
          '**Intermediate:** Give a rules-based vs ML example?',
          '**Advanced:** Why are LLMs replacing rule-based chatbots?',
        ],
      },
      mistakes: {
        hinglish: [
          'AI = sirf ChatGPT samajhna',
          'ML aur DL ko same maan lena',
          'Sochna LLM "conscious" hai — pattern matching + scale hai',
        ],
        english: [
          'Thinking AI = only ChatGPT',
          'Treating ML and DL as identical',
          'Thinking LLMs are "conscious" — it is pattern matching at scale',
        ],
      },
      recap: bi(
        '**Pyramid:** AI → ML → DL → LLM | **Next:** Vector kya hai — computer ki number language',
        '**Pyramid:** AI → ML → DL → LLM | **Next:** What is a vector — the computer\'s number language'
      ),
      ascii: bi(
        `        ┌─────────────┐
        │     LLM     │  ← This course focus
        │  (GPT, etc) │
        ├─────────────┤
        │ Deep Learning│
        ├─────────────┤
        │     ML      │
        ├─────────────┤
        │     AI      │
        └─────────────┘`,
        `Nested hierarchy — LLM at the top of the stack we study`
      ),
    }),
  },
  {
    id: 'what-is-vector',
    sectionId: 'intro',
    title: { hinglish: 'Vector Kya Hai?', english: 'What Is a Vector?' },
    duration: '6m',
    tagline: {
      hinglish: 'Numbers ki ordered list — direction + magnitude — computer ki bhasha',
      english: 'An ordered list of numbers — direction + magnitude — the language of computers',
    },
    intro: {
      hinglish:
        'Vector matlab ek **ordered list of numbers**. Example: [3, 4] ya [0.2, -0.8, 1.5]. Computer sirf numbers samajhta hai — text, image, sound sab kuch eventually vector ban jata hai.',
      english:
        'A vector is an **ordered list of numbers**. Example: [3, 4] or [0.2, -0.8, 1.5]. Computers only understand numbers — text, images, and sound all eventually become vectors.',
    },
    explanation: {
      hinglish: `**Vector = ordered numbers**

2D example: **v = [3, 4]**
- Pehla number (3) = X direction
- Doosra number (4) = Y direction
- Graph pe point ya arrow dono tarah soch sakte ho

**Magnitude (length):**
|v| = √(3² + 4²) = √25 = **5**

**Direction:** Northeast ja raha arrow — X aur Y dono positive

**Higher dimensions:**
- 3D: [x, y, z] — RGB color [255, 128, 0]
- 768D: LLM embedding — 768 numbers ek word ke liye
- Dimension = kitne numbers list mein hain

**Important:** Order matter karta hai!
[3, 4] ≠ [4, 3] — same numbers, alag meaning`,
      english: `**Vector = ordered numbers**

2D example: **v = [3, 4]**
- First number (3) = X direction
- Second (4) = Y direction
- Think of it as a point or arrow on a graph

**Magnitude:** |v| = √(3² + 4²) = **5**

**Higher dimensions:**
- 3D: [x, y, z] — RGB [255, 128, 0]
- 768D: LLM embedding — 768 numbers per word
- Dimension = how many numbers in the list

**Order matters:** [3, 4] ≠ [4, 3]`,
    },
    keyPoints: {
      hinglish: [
        'Vector = ordered list of numbers',
        '2D mein point/arrow, high-D mein representation',
        'Magnitude = length, direction = meaning',
        'Order change = alag vector',
      ],
      english: [
        'Vector = ordered list of numbers',
        '2D point/arrow, high-D representation',
        'Magnitude = length, direction = meaning',
        'Changing order = different vector',
      ],
    },
    analogy: {
      hinglish:
        'GPS coordinates [28.6, 77.2] bhi ek vector hai — latitude + longitude ki ordered pair. Tumhara ghar ek point hai number space mein.',
      english:
        'GPS coordinates [28.6, 77.2] are a vector — an ordered pair of latitude and longitude. Your home is a point in number space.',
    },
    steps: [
      { title: bi('Start: real world', 'Start: real world'), caption: bi('Text, image, location', 'Text, image, location') },
      { title: bi('Convert → numbers', 'Convert → numbers'), caption: bi('Ordered list banao', 'Make ordered list') },
      { title: bi('2D vector [3,4]', '2D vector [3,4]'), caption: bi('Point on graph', 'Point on graph') },
      { title: bi('Magnitude |v|=5', 'Magnitude |v|=5'), caption: bi('Pythagoras', 'Pythagoras') },
      { title: bi('High-D ready', 'High-D ready'), caption: bi('768D embeddings aage', '768D embeddings next') },
    ],
    teaching: fullTeaching({
      whyFirst: bi(
        '**Pehle AI samjho (pichla chapter), ab vector.** Tum KD Tree, embeddings, attention sab padhoge — sab ke neeche **vector** hai. Computer ki number language — iske bina baaki sab adhoora lagega.',
        '**After AI hierarchy, now vectors.** KD Tree, embeddings, attention — everything rests on **vectors**. The computer\'s number language — without this the rest feels incomplete.'
      ),
      intuition: bi(
        'Socho tumhe friend ko apna ghar batana hai — "thoda right, phir upar" vague hai. **[28.6, 77.2]** precise hai. Vector wahi hai — **precise numerical address** kisi cheez ka. AI mein har word, sentence, image ka apna address hota hai number space mein.',
        'Telling a friend where you live — "a bit right, then up" is vague. **[28.6, 77.2]** is precise. A vector is that **precise numerical address**. In AI, every word, sentence, and image has its own address in number space.'
      ),
      problem: bi(
        '**Problem:** Computer ko "happy" aur "sad" text mein dikhta hai — binary 0/1. Directly compare nahi kar sakta. Humein ek **common language** chahiye jisme sab cheezein numbers ki form mein ho — vectors.',
        '**Problem:** A computer sees "happy" and "sad" as text/binary — it cannot compare them directly. We need a **common language** where everything is numbers — vectors.'
      ),
      whyInvented: bi(
        'Vectors centuries purane hain (physics, math). AI ne unhe **representation** ke liye adopt kiya — 1950s se perceptrons, 2010s mein word2vec, 2020s mein LLM embeddings. Same idea: **meaning ko numbers mein encode karo**.',
        'Vectors are centuries old (physics, math). AI adopted them for **representation** — perceptrons in the 1950s, word2vec in the 2010s, LLM embeddings in the 2020s. Same idea: **encode meaning as numbers**.'
      ),
      buildFromScratch: bi(
        `**Step 1:** Real object — word "cat"
**Step 2:** Manually toy vector (2D): "cat" → [0.9, 0.1]  (animal=high, vehicle=low)
**Step 3:** Graph pe plot — (0.9, 0.1) point
**Step 4:** "dog" → [0.85, 0.15] — paas paas points = similar meaning
**Step 5:** "car" → [0.1, 0.9] — door point = alag meaning`,
        `**Step 1:** Real object — word "cat"
**Step 2:** Toy vector (2D): "cat" → [0.9, 0.1]
**Step 3:** Plot on graph
**Step 4:** "dog" → [0.85, 0.15] — nearby = similar
**Step 5:** "car" → [0.1, 0.9] — far = different meaning`
      ),
      derivation: bi(
        '**Magnitude:** |v| = √(v₁² + v₂² + ... + vₙ²)\n\n2D: |v| = √(3² + 4²) = 5\n\n**Unit vector:** v̂ = v / |v| — direction same, length = 1',
        '**Magnitude:** |v| = √(v₁² + v₂² + ... + vₙ²)\n\n2D: |v| = √(3² + 4²) = 5\n\n**Unit vector:** v̂ = v / |v|'
      ),
      matrixShapes: bi(
        'Single vector: shape **(d,)** ya **(1, d)** row vector\n\nn vectors stacked: matrix **(n, d)** — n items, har ek d-dimensional\n\nExample: 3 words, 2D embeddings → matrix (3, 2)',
        'Single vector: shape **(d,)** or **(1, d)**\n\nn vectors stacked: matrix **(n, d)**\n\n3 words, 2D embeddings → (3, 2)'
      ),
      numerical: bi(
        'v = [3, 4]\n|v| = √(9 + 16) = √25 = **5**\n\nu = [1, 0]  → |u| = 1\nw = [0, 1]  → |w| = 1\n\n[3,4] aur [4,3] alag vectors — order matters!',
        'v = [3, 4], |v| = 5\n\n[3,4] ≠ [4,3] — order matters!'
      ),
      commonQuestions: {
        hinglish: [
          '**Vector aur array same?** → Haan practically! NumPy array, Python list — sab vector hi hai ordered numbers ki.',
          '**2D vs 768D?** → 2D samajhne ke liye, 768D production embeddings — idea same, dimensions zyada.',
          '**Negative numbers?** → Bilkul valid. Direction flip hoti hai.',
        ],
        english: [
          '**Vector vs array?** → Practically the same in code.',
          '**2D vs 768D?** → 2D for learning, 768D for production — same idea.',
          '**Negative numbers?** → Fully valid — direction flips.',
        ],
      },
      internalMemory: bi(
        'CPU/GPU RAM mein vector = contiguous float array (float32/float16). 1M vectors × 768D × 4 bytes ≈ 3 GB. Isliye baad mein quantization aur ANN index padhenge.',
        'In RAM a vector is a contiguous float array. 1M × 768D × 4 bytes ≈ 3 GB. Hence quantization and ANN indexes later.'
      ),
      production: bi(
        'Production mein vectors float32/bfloat16 tensors hain — PyTorch, NumPy, CUDA. Pinecone/Weaviate millions of vectors store karte hain. Har LLM call embeddings produce karta hai.',
        'Production vectors are float32/bfloat16 tensors. Vector DBs store millions. Every LLM call produces embeddings.'
      ),
      interview: {
        hinglish: [
          '**Basic:** Vector kya hai?',
          '**Intermediate:** Magnitude aur direction ka formula?',
          '**Advanced:** High-dimensional vectors ka curse of dimensionality?',
        ],
        english: [
          '**Basic:** What is a vector?',
          '**Intermediate:** Magnitude and direction formulas?',
          '**Advanced:** Curse of dimensionality?',
        ],
      },
      mistakes: {
        hinglish: [
          'Vector ko sirf "arrow" samajhna — high-D mein arrow nahi, point in space',
          '[3,4] aur [4,3] same maan lena',
          'Dimension aur magnitude confuse karna',
        ],
        english: [
          'Thinking vectors are only arrows — in high-D they are points',
          'Treating [3,4] and [4,3] as the same',
          'Confusing dimension with magnitude',
        ],
      },
      recap: bi(
        '**Cheat sheet:** Vector = ordered numbers | 2D = graph pe point | |v| = √(Σvᵢ²) | AI = sab kuch vector | Aage: kyun vectors use karte hain',
        '**Cheat sheet:** Vector = ordered numbers | magnitude formula | AI = everything becomes vectors'
      ),
      ascii: bi(
        `Y
|     • "dog" [0.85, 0.15]
|   • "cat" [0.9, 0.1]
|
|                    • "car" [0.1, 0.9]
+------------------------ X
   animal axis    vehicle axis`,
        `2D meaning space — similar words cluster together`
      ),
    }),
  },
  {
    id: 'why-vectors',
    sectionId: 'intro',
    title: { hinglish: 'Vectors Kyun Use Hote Hain?', english: 'Why Do We Use Vectors?' },
    duration: '7m',
    tagline: {
      hinglish: 'Computer numbers samajhta hai — vectors bridge hain real world aur math ke beech',
      english: 'Computers understand numbers — vectors bridge the real world and math',
    },
    intro: {
      hinglish:
        'Phone pe photo, WhatsApp message, Google search — sab andar **numbers** hain. Vector isliye use hota hai kyunki computer ko compare, store, aur calculate karne ke liye **numerical form** chahiye.',
      english:
        'Photos, messages, searches — everything inside is **numbers**. We use vectors because computers need **numerical form** to compare, store, and compute.',
    },
    explanation: {
      hinglish: `**3 core reasons:**

**1. Computers sirf numbers process karte hain**
- Text "hello" → ASCII/binary → eventually floats
- Vector = clean, standard format

**2. Similarity measure kar sakte hain**
- Do vectors ka distance/s angle → kitne similar
- "cat" aur "dog" paas, "cat" aur "car" door

**3. Matrix math = fast GPU computation**
- Millions of vectors × weights = parallel on GPU
- Neural networks = vector operations ka chain

**Real examples:**
| Cheez | Vector form |
|-------|-------------|
| Word | 768-dim embedding |
| Image | 224×224×3 → flattened or CNN features |
| User | recommendation vector |
| Audio | spectrogram → vector |`,
      english: `**3 core reasons:**

**1. Computers only process numbers**
**2. Measure similarity** via distance/angle between vectors
**3. Matrix math** runs fast on GPUs — neural nets are chains of vector ops

**Examples:** words → embeddings, images → feature vectors, users → recommendation vectors`,
    },
    keyPoints: {
      hinglish: [
        'Computer = number machine',
        'Vectors se similarity measurable',
        'GPU parallel math on vectors',
        'Universal representation format',
      ],
      english: [
        'Computer = number machine',
        'Vectors enable measurable similarity',
        'GPU parallel math on vectors',
        'Universal representation format',
      ],
    },
    analogy: {
      hinglish:
        'Currency exchange — dollar, rupee, euro alag lagte hain lekin sab **number** mein convert ho kar compare hote hain. Vector wahi "exchange rate" hai meaning ka.',
      english:
        'Currency exchange — dollars, rupees, euros all convert to **numbers** for comparison. A vector is that "exchange rate" for meaning.',
    },
    steps: [
      { title: bi('Real data', 'Real data'), caption: bi('Text, image, audio', 'Text, image, audio') },
      { title: bi('Encode → vector', 'Encode → vector'), caption: bi('Numbers ki list', 'List of numbers') },
      { title: bi('Compare similarity', 'Compare similarity'), caption: bi('Distance / cosine', 'Distance / cosine') },
      { title: bi('GPU compute', 'GPU compute'), caption: bi('Matrix multiply', 'Matrix multiply') },
      { title: bi('AI output', 'AI output'), caption: bi('Prediction, search', 'Prediction, search') },
    ],
    teaching: teaching({
      intuition: bi(
        'Tum Instagram pe similar reels dekhte ho — algorithm tumhare "interest vector" aur har reel ke vector ko compare karta hai. Bina vectors ke ye impossible hai scale pe.',
        'Instagram shows similar reels by comparing your "interest vector" to each reel\'s vector. Without vectors this cannot scale.'
      ),
      problemStatement: bi(
        '**Problem:** 1 billion documents mein "mujhe diabetes ke baare mein articles chahiye" — keyword search miss karega ("blood sugar" wale articles nahi milenge). Humein **meaning-based** search chahiye → vectors.',
        '**Problem:** Keyword search misses synonyms. We need **meaning-based** search → vectors.'
      ),
      whyInvented: bi(
        'Word2Vec (2013) ne prove kiya: words ko vectors mein daalo toh **king - man + woman ≈ queen**. Math meaning capture kar sakta hai — industry shift ho gaya.',
        'Word2Vec (2013): **king - man + woman ≈ queen**. Math can capture meaning — industry shifted to vectors.'
      ),
      dryRun: bi(
        `Query: "feline pet"
Doc A: "domestic cat" → v_A = [0.9, 0.2]
Doc B: "sports car" → v_B = [0.1, 0.9]
Query → v_Q = [0.88, 0.18]

cos(v_Q, v_A) = 0.97 ✓ match
cos(v_Q, v_B) = 0.15 ✗ no match`,
        `Semantic search: compare query vector to document vectors via cosine similarity.`
      ),
      numericalExample: bi(
        'A=[1,0], B=[0.9,0.1] → cosine ≈ 0.99 (similar)\nA=[1,0], C=[0,1] → cosine = 0 (unrelated)\n\nDot product: A·B = 1×0.9 + 0×0.1 = 0.9',
        'Cosine and dot product with 2D toy vectors.'
      ),
      matrixDimensions: bi(
        'n documents = matrix (n, d). Query = (1, d). Scores = query × docsᵀ → (1, n). Top-k highest scores return.',
        'Docs (n,d) × query (1,d) → scores (1,n).'
      ),
      interviewQuestions: {
        hinglish: [
          'Vectors kyun — plain text kyon nahi?',
          'Cosine vs Euclidean distance kab?',
          'Word2Vec ka intuition?',
        ],
        english: [
          'Why vectors instead of plain text?',
          'When cosine vs Euclidean?',
          'Word2Vec intuition?',
        ],
      },
      commonMistakes: {
        hinglish: [
          'Har cheez ko manually vector banana — models embeddings learn karte hain',
          'Similarity ke liye sirf Euclidean — text mein cosine zyada common',
        ],
        english: [
          'Hand-crafting every vector — models learn embeddings',
          'Using only Euclidean — cosine is more common for text',
        ],
      },
      summary: bi(
        'Vectors = computer ki universal language. Similarity + GPU speed + neural nets = AI ka foundation. Ab samjho AI mein specifically kaise use hota hai.',
        'Vectors = universal language for computers. Similarity + GPU + neural nets = AI foundation.'
      ),
    }),
  },
  {
    id: 'vectors-in-ai',
    sectionId: 'intro',
    title: { hinglish: 'Vectors AI Mein Kaise Use Hote Hain?', english: 'How Vectors Are Used in AI' },
    duration: '8m',
    tagline: {
      hinglish: 'Embeddings, similarity search, attention — poora AI vector math pe chalta hai',
      english: 'Embeddings, similarity search, attention — all of AI runs on vector math',
    },
    intro: {
      hinglish:
        'AI = data ko vectors mein convert karo → math karo → useful output. Embeddings, vector databases, transformers — teen pillars jo is course mein detail mein padhenge.',
      english:
        'AI = convert data to vectors → do math → useful output. Embeddings, vector databases, transformers — three pillars we cover in depth in this course.',
    },
    explanation: {
      hinglish: `**AI pipeline (simplified):**

\`\`\`
Raw Data → Encoder → Vectors → Model Math → Output
  text       BPE      embeddings   attention     answer
  image      CNN      features     layers        label
\`\`\`

**1. Embeddings (representation)**
- Har token/word → dense vector (768D, 4096D)
- Similar meaning = paas vectors
- LLM ke andar har layer vectors transform karti hai

**2. Vector Search (retrieval)**
- RAG: documents embed karo, query se similar dhundho
- KD Tree, HNSW — fast search (next sections)

**3. Transformer Math (generation)**
- Q, K, V vectors — attention = vector similarity
- FFN = vector → bigger vector → vector
- Output = probability vector over vocabulary

**Key insight:** LLM internally **sirf vectors** move karta hai — tum text dekhte ho, model tensors dekhta hai.`,
      english: `**AI pipeline:** Raw Data → Encoder → Vectors → Model Math → Output

**Embeddings** — tokens to dense vectors
**Vector Search** — RAG retrieval via similarity
**Transformer math** — Q/K/V attention, FFN, output logits

**Key insight:** You see text; the model sees tensors (vectors).`,
    },
    keyPoints: {
      hinglish: [
        'Embeddings = meaning as vectors',
        'Vector DB = semantic search at scale',
        'Attention = vector similarity weights',
        'Poora LLM = vector transformations',
      ],
      english: [
        'Embeddings = meaning as vectors',
        'Vector DB = semantic search at scale',
        'Attention = vector similarity weights',
        'Entire LLM = vector transformations',
      ],
    },
    analogy: {
      hinglish:
        'Kitchen mein recipe — ingredients (raw data) ko chop karke (tokenize) standardized bowls (vectors) mein rakho, phir mix karo (model layers). Final dish = AI output.',
      english:
        'Recipe analogy — chop ingredients (tokenize), put in standardized bowls (vectors), mix (model layers). Final dish = AI output.',
    },
    steps: [
      { title: bi('Input text/image', 'Input text/image'), caption: bi('Raw data', 'Raw data') },
      { title: bi('Tokenize + embed', 'Tokenize + embed'), caption: bi('→ vector sequence', '→ vector sequence') },
      { title: bi('Model layers', 'Model layers'), caption: bi('Attention + FFN', 'Attention + FFN') },
      { title: bi('Vector search (RAG)', 'Vector search (RAG)'), caption: bi('Retrieve context', 'Retrieve context') },
      { title: bi('Output tokens', 'Output tokens'), caption: bi('Text response', 'Text response') },
    ],
    teaching: teaching({
      intuition: bi(
        'ChatGPT jab answer deta hai — pehle tumhara prompt **vector sequence** banta hai, har layer vectors ko transform karti hai, last mein **probability vector** se next word choose hota hai. Text sirf UI hai.',
        'When ChatGPT answers, your prompt becomes a **vector sequence**, each layer transforms vectors, and a **probability vector** picks the next word. Text is just the UI.'
      ),
      problemStatement: bi(
        '**Problem:** Ek model mein poora internet fit nahi hota. Humein (a) **compress** karna hai knowledge into weights (b) **retrieve** relevant docs via vectors (c) **generate** coherently — teeno vector-based.',
        '**Problem:** Fit all knowledge in one model — impossible. Need (a) compressed weights (b) vector retrieval (c) coherent generation — all vector-based.'
      ),
      whyInvented: bi(
        '2017 Transformer paper ne attention ko vector dot-product banaya. 2020+ LLM scale ne embeddings + vector DB + generation ko ek ecosystem bana diya — RAG, agents, sab is pe.',
        '2017 Transformer made attention vector dot-products. 2020+ LLMs created the embeddings + vector DB + generation ecosystem.'
      ),
      dryRun: bi(
        `User: "What is KV cache?"
1. Tokenize → [What, is, KV, cache, ?]
2. Embed → 5 vectors (each 4096D)
3. (Optional RAG) Search vector DB → retrieve doc vectors
4. Transformer layers → transform sequence
5. Last vector → logits → softmax → "KV" token predicted`,
        `End-to-end: tokenize → embed → (RAG) → transform → predict next token.`
      ),
      numericalExample: bi(
        'Toy 2D embeddings:\n"king"=[0.8,0.2], "queen"=[0.75,0.25], "car"=[0.1,0.9]\n\ncos(king,queen)=0.99, cos(king,car)=0.14\n\nVector math = semantic relationship!',
        '2D toy embeddings show semantic clustering via cosine.'
      ),
      matrixDimensions: bi(
        'Input: (batch, seq_len, d_model). Attention: Q,K,V each (batch, heads, seq, d_head). Output logits: (batch, seq, vocab_size).',
        'Standard transformer tensor shapes — batch × sequence × dimension.'
      ),
      interviewQuestions: {
        hinglish: [
          'Embeddings kya hain vs one-hot?',
          'RAG mein vector DB ka role?',
          'Attention vector similarity kaise hai?',
        ],
        english: [
          'Embeddings vs one-hot?',
          'Vector DB role in RAG?',
          'How is attention vector similarity?',
        ],
      },
      commonMistakes: {
        hinglish: [
          'Embeddings aur weights confuse karna',
          'RAG = sirf vector search (LLM step bhi hai)',
          'Sochna LLM text process karta hai — vectors process karta hai',
        ],
        english: [
          'Confusing embeddings with weights',
          'RAG is not only vector search',
          'Thinking LLM processes text — it processes vectors',
        ],
      },
      summary: bi(
        'AI = vectors in, math, vectors out. Embeddings + search + transformers = poora course. Ab similarity metrics dekho — phir LLM big picture.',
        'AI = vectors in, math, vectors out. Next: similarity metrics, then LLM big picture.'
      ),
    }),
  },
  {
    id: 'llm-introduction',
    sectionId: 'intro',
    title: { hinglish: 'LLM Introduction — Big Picture', english: 'LLM Introduction — The Big Picture' },
    duration: '10m',
    tagline: {
      hinglish: 'Large Language Model kya hai, kaise kaam karta hai, aur poori duniya kyun badal raha hai',
      english: 'What an LLM is, how it works, and why it is changing everything',
    },
    intro: {
      hinglish:
        'LLM = **Large Language Model** — billions of parameters wala neural network jo next word predict karta hai. ChatGPT, Claude, Gemini, Llama — sab LLM hain. Transformer architecture pe based.',
      english:
        'An LLM = **Large Language Model** — a neural network with billions of parameters that predicts the next word. ChatGPT, Claude, Gemini, Llama are all LLMs built on the Transformer architecture.',
    },
    explanation: {
      hinglish: `**LLM ek sentence mein:**
Trained on massive text → learns patterns → given prompt, **one token at a time** next word predict karta hai → full answer ban jata hai.

**Key components (course mein detail):**
1. **Tokenization** — text → token IDs
2. **Embeddings** — IDs → vectors
3. **Transformer layers** — attention + FFN (dozens to 100+ layers)
4. **Output head** — logits → softmax → next token
5. **Decoding** — temperature, top-p sampling

**Scale matters:**
| Model | Params | Context | Training data |
|-------|--------|---------|---------------|
| GPT-2 | 1.5B | 1K | Web text |
| Llama 3 | 70B+ | 128K | Trillions tokens |
| GPT-4 class | ~1T+? | 128K+ | Proprietary |

**Training vs Inference:**
- **Training:** weights update (months, millions $)
- **Inference:** fixed weights, predict (milliseconds per token)

**Why revolutionary:**
- Ek model — translation, coding, reasoning, chat sab
- Fine-tuning / RAG se customize
- Agents + tools se autonomous tasks`,
      english: `**LLM in one line:** Trained on massive text → predicts next token → full answers emerge.

**Components:** tokenization, embeddings, transformer layers, output head, decoding.

**Training** updates weights over months; **inference** uses fixed weights in milliseconds per token.

**Why revolutionary:** one model for translation, coding, chat; customizable via RAG/fine-tuning; extensible via agents.`,
    },
    keyPoints: {
      hinglish: [
        'LLM = next token prediction at scale',
        'Transformer = core architecture',
        'Training expensive, inference fast (with cache)',
        'RAG + agents = production stack',
      ],
      english: [
        'LLM = next token prediction at scale',
        'Transformer = core architecture',
        'Training expensive, inference fast',
        'RAG + agents = production stack',
      ],
    },
    analogy: {
      hinglish:
        'LLM = bahut zyada novels padh kar **autocomplete on steroids**. Har word ke baad "agla word kya likely hai?" — bas scale itna bada hai ki reasoning jaisa lagta hai.',
      english:
        'An LLM = **autocomplete on steroids** after reading millions of books. After each word it asks "what word is likely next?" — at huge scale it looks like reasoning.',
    },
    steps: [
      { title: bi('Prompt input', 'Prompt input'), caption: bi('"Explain KV cache"', '"Explain KV cache"') },
      { title: bi('Tokenize', 'Tokenize'), caption: bi('Text → token IDs', 'Text → token IDs') },
      { title: bi('Embed + layers', 'Embed + layers'), caption: bi('Transformer stack', 'Transformer stack') },
      { title: bi('Predict next', 'Predict next'), caption: bi('Softmax over vocab', 'Softmax over vocab') },
      { title: bi('Autoregressive', 'Autoregressive'), caption: bi('Repeat until done', 'Repeat until done') },
    ],
    teaching: fullTeaching({
      whyFirst: bi(
        '**Kyun padhna hai?** Baaki poora course LLM ke **andar** ka engine hai. Pehle car chalana seekhoge ya engine ka piston? Hum pehle engine — taaki jab ChatGPT answer de, tum samjho **kyun** aur **kaise**.',
        '**Why learn this?** The rest of the course is the **engine inside** the LLM. We study the engine first so when ChatGPT answers you know **why** and **how**.'
      ),
      intuition: bi(
        'Bachpan mein autocomplete — "Happy birth..." → phone suggests "day". LLM wahi karta hai har token pe, lekin **trillions** of examples se trained aur **billions** of knobs (parameters) tune kiye hue.',
        'Phone autocomplete — "Happy birth..." → "day". An LLM does that every token, trained on **trillions** of examples with **billions** of tuned parameters.'
      ),
      problem: bi(
        '**Problem:** Rules-based chatbots (if-else) fail on open-ended language. Hard-coded grammar nahi chalta. Chahiye ek system jo **statistics + scale** se language model kare — LLM.',
        '**Problem:** Rule-based chatbots fail on open-ended language. Need **statistics + scale** — the LLM.'
      ),
      whyInvented: bi(
        '2017 "Attention Is All You Need" → Transformer. 2018 BERT/GPT. 2020 GPT-3 showed emergent abilities. 2022 ChatGPT → mainstream. 2024+ multimodal, agents, 1M context.',
        '2017 Transformer paper → 2018 BERT/GPT → 2020 GPT-3 → 2022 ChatGPT mainstream → 2024+ agents and long context.'
      ),
      buildFromScratch: bi(
        `**Toy generation "The cat ___":**
1. Tokens: [The, cat, ___]
2. Embed → 3 vectors
3. One transformer layer (simplified)
4. Last position logits: P(sat)=0.4, P(ran)=0.2, P(meowed)=0.15...
5. Pick "sat" → append
6. Repeat: "The cat sat ___" → predict "on"...
7. Stop at EOS token`,
        `Toy autoregressive loop: embed → predict → append → repeat.`
      ),
      derivation: bi(
        '**Objective:** Maximize P(token_t | token_1, ..., token_{t-1})\n\n**Loss:** Cross-entropy over vocabulary\n\n**At inference:** argmax or sample from softmax(logits / temperature)',
        '**Objective:** next-token cross-entropy. **Inference:** argmax or tempered sampling.'
      ),
      matrixShapes: bi(
        'Vocab V ≈ 50K–256K. d_model ≈ 4096–8192. Layers L ≈ 32–128.\n\nPer forward pass: main cost = L × (attention + FFN) on (seq_len, d_model) tensors.',
        'Vocab 50K+, d_model 4K–8K, 32–128 layers. Cost scales with seq_len and d_model.'
      ),
      numerical: bi(
        'Vocab=5 toy: logits=[1.2, 0.3, 2.1, 0.5, 0.8]\nsoftmax → probs=[0.20, 0.10, 0.70, 0.12, 0.15]\nargmax → token 2 (highest 2.1)\n\ntemperature=0.5 → sharper distribution',
        'Toy softmax over 5-token vocab with temperature.'
      ),
      commonQuestions: {
        hinglish: [
          '**LLM ko understanding hai ya pattern matching?** → Debate chal rahi hai — practically dono blend; scale pe emergent reasoning dikhta hai.',
          '**Parameters kya hain?** → Learned numbers (weights) jo training mein tune hote hain — next section mein detail.',
          '**ChatGPT = LLM?** → LLM + RLHF + tooling + infra. Core = transformer LLM.',
        ],
        english: [
          '**Understanding vs pattern matching?** → Debated; emergent reasoning at scale.',
          '**What are parameters?** → Learned weights — covered later.',
          '**ChatGPT = LLM?** → LLM + RLHF + tooling. Core = transformer.',
        ],
      },
      internalMemory: bi(
        '**Inference memory:** weights (GBs) + KV cache (grows with context) + activations. 70B model ≈ 140GB FP16 weights alone. Quantization (INT4/8) se kam hota hai.',
        '**Inference:** weights + KV cache + activations. 70B ≈ 140GB FP16. Quantization reduces this.'
      ),
      production: bi(
        'OpenAI/Anthropic: custom kernels, speculative decoding, prefix caching, load balancing. Serving = vLLM, TGI, TensorRT-LLM. Cost = $ per million tokens.',
        'Production: custom kernels, speculative decoding, vLLM serving, $/million tokens.'
      ),
      interview: {
        hinglish: [
          '**Basic:** LLM kya karta hai?',
          '**Intermediate:** Training vs inference difference?',
          '**Advanced:** KV cache kyun chahiye? (preview — baad mein detail)',
          '**System design:** 1000 QPS LLM serving kaise?',
        ],
        english: [
          '**Basic:** What does an LLM do?',
          '**Intermediate:** Training vs inference?',
          '**Advanced:** Why KV cache? (preview)',
          '**System design:** Serve 1000 QPS how?',
        ],
      },
      mistakes: {
        hinglish: [
          'Sochna LLM "search engine" hai — generate karta hai, retrieve nahi (RAG alag)',
          'Har output "true" maan lena — hallucination hoti hai',
          'Context window unlimited samajhna',
        ],
        english: [
          'Thinking LLM is a search engine — it generates',
          'Assuming every output is true — hallucinations exist',
          'Assuming unlimited context',
        ],
      },
      recap: bi(
        '**Mindmap:** Text in → tokens → vectors → transformer → next token → repeat → text out\n**Next:** Vectors search (KD Tree...) → phir transformer andar se',
        '**Flow:** tokens → vectors → transformer → next token → repeat'
      ),
      ascii: bi(
        `     [User Prompt]
           ↓
    Tokenize → Embed
           ↓
    ┌──────────────────┐
    │ Transformer × L  │
    │  Attention + FFN │
    └──────────────────┘
           ↓
    Softmax → next token
           ↓ (loop)
     [Full Response]`,
        `LLM autoregressive loop diagram`
      ),
    }),
  },
  {
    id: 'similarity-distance',
    sectionId: 'intro',
    title: { hinglish: 'Similarity & Distance — Vector Compare Karna', english: 'Similarity & Distance — Comparing Vectors' },
    duration: '8m',
    tagline: {
      hinglish: 'Cosine similarity, Euclidean distance — vector search se pehle yeh samajhna zaroori hai',
      english: 'Cosine similarity, Euclidean distance — essential before vector search algorithms',
    },
    intro: {
      hinglish:
        'Do vectors kaise compare karein — **kitne similar** hain? Yeh chapter bridge hai intro aur KD Tree/HNSW ke beech. RAG, embeddings, attention — sab similarity pe based hai.',
      english:
        'How do we compare two vectors — **how similar** are they? This chapter bridges intro and KD Tree/HNSW. RAG, embeddings, and attention all rely on similarity.',
    },
    explanation: {
      hinglish: `**Do vectors diye — kaise compare?**

**1. Euclidean Distance (L2)**
d(A, B) = √((a₁-b₁)² + (a₂-b₂)² + ...)
- Geometric: do points kitni **door** hain
- Chhota distance = zyada similar
- 2D: Pythagoras theorem

**2. Dot Product (A · B)**
A · B = a₁b₁ + a₂b₂ + ...
- Magnitude + direction dono affect karte hain
- Bada dot product = vectors aligned

**3. Cosine Similarity (text/AI mein #1)**
cos(A, B) = (A · B) / (|A| × |B|)
- Sirf **direction** matter karti hai, length nahi
- Range: -1 (opposite) to +1 (same direction)
- Embeddings ke liye best — document length bias nahi

**Kab kya use karein:**
| Use case | Metric |
|----------|--------|
| Text embeddings / RAG | Cosine |
| Image pixel distance | Euclidean |
| Attention scores | Scaled dot product |
| KD Tree / HNSW | Usually L2 (Euclidean) |

**Next section:** KD Tree in metrics ko **fast** compute karta hai millions of points pe.`,
      english: `**Comparing two vectors:**

**Euclidean (L2):** geometric distance — smaller = more similar.
**Dot product:** magnitude and direction both matter.
**Cosine similarity:** direction only, range [-1, 1] — #1 for text embeddings.

**Next:** KD Tree makes these comparisons fast at scale.`,
    },
    keyPoints: {
      hinglish: [
        'Euclidean = kitni door (L2 distance)',
        'Cosine = kitna same direction (embeddings)',
        'Dot product = attention ka base',
        'Vector search = fast similarity at scale',
      ],
      english: [
        'Euclidean = how far apart (L2)',
        'Cosine = how aligned (embeddings)',
        'Dot product = base of attention',
        'Vector search = fast similarity at scale',
      ],
    },
    analogy: {
      hinglish:
        'Do log city mein — **Euclidean** = seedha rasta kitna lamba. **Cosine** = same direction mein dekh rahe ho ya opposite? ("cat" aur "dog" same direction, "cat" aur "car" alag).',
      english:
        'Two people in a city — **Euclidean** = straight-line distance. **Cosine** = same direction or opposite? ("cat" and "dog" align; "cat" and "car" do not).',
    },
    steps: [
      { title: bi('Two vectors A, B', 'Two vectors A, B'), caption: bi('Plot on graph', 'Plot on graph') },
      { title: bi('Euclidean d', 'Euclidean d'), caption: bi('Pythagoras distance', 'Pythagoras distance') },
      { title: bi('Dot product', 'Dot product'), caption: bi('Multiply + sum', 'Multiply + sum') },
      { title: bi('Cosine sim', 'Cosine sim'), caption: bi('Normalize direction', 'Normalize direction') },
      { title: bi('Nearest neighbor', 'Nearest neighbor'), caption: bi('→ KD Tree next', '→ KD Tree next') },
    ],
    teaching: fullTeaching({
      whyFirst: bi(
        '**KD Tree kyun padhoge agar compare karna hi nahi aata?** Similarity = vector search ka soul. Pehle haath se 2D mein cosine nikalo, phir algorithm samjho jo million vectors mein dhundhta hai.',
        '**Why study KD Tree if you cannot compare vectors?** Similarity is the soul of vector search. Compute cosine by hand in 2D first, then learn the algorithm that searches millions.'
      ),
      intuition: bi(
        'Netflix tumhe similar movies dikhata hai — har movie ek vector, tumhari history ek vector. **Cosine similarity** se match. Slow way: har movie se compare. Fast way: KD Tree / HNSW — agla section.',
        'Netflix recommends similar movies — each movie is a vector. Match via **cosine similarity**. Slow: compare all. Fast: KD Tree / HNSW — next section.'
      ),
      problem: bi(
        '**Problem:** 1 million document embeddings, query aayi — brute force = 1M cosine calculations per query. Slow! Pehle metric samjho (cosine), phir fast index (HNSW).',
        '**Problem:** 1M embeddings, one query — brute force = 1M cosines. Slow! Understand the metric first, then fast indexes.'
      ),
      whyInvented: bi(
        'Euclidean geometry 2000+ years old. Cosine similarity ML/NLP mein standard kyunki text embeddings ki **magnitude** arbitrary hoti hai — direction = meaning.',
        'Euclidean is ancient. Cosine became ML/NLP standard because embedding **magnitude** is arbitrary — direction = meaning.'
      ),
      buildFromScratch: bi(
        `A = [1, 0] ("cat" toy)
B = [0.9, 0.1] ("dog" toy)
C = [0, 1] ("car" toy)

Step 1 — Euclidean:
d(A,B) = √((1-0.9)² + (0-0.1)²) = √(0.01+0.01) = √0.02 ≈ 0.14
d(A,C) = √(1+1) = 1.41

Step 2 — Dot: A·B = 0.9, A·C = 0

Step 3 — Cosine: cos(A,B) = 0.9/(1×0.905) ≈ 0.99 ✓
cos(A,C) = 0 ✗`,
        `Hand calculation: A=[1,0], B=[0.9,0.1], C=[0,1]. cos(A,B)≈0.99, cos(A,C)=0.`
      ),
      derivation: bi(
        '**Euclidean:** d = ||A - B||₂ = √(Σ(aᵢ - bᵢ)²)\n\n**Dot:** A·B = Σ aᵢbᵢ\n\n**Cosine:** cos θ = (A·B) / (||A|| ||B||)\n\nAttention (baad mein): softmax(Q·Kᵀ / √d)',
        'Euclidean, dot, cosine formulas. Attention later: softmax(Q·Kᵀ / √d).'
      ),
      matrixShapes: bi(
        'Query q: (1, d). Database: (n, d). All-pairs scores: (n,) via broadcasting.\n\nBrute force: O(n × d) per query. HNSW: O(log n) approximate.',
        'Query (1,d) vs DB (n,d) → scores (n,). Brute O(n×d), HNSW O(log n) approx.'
      ),
      numerical: bi(
        'A=[3,4], B=[6,8]\n|A|=5, |B|=10\nA·B = 18+32 = 50\ncos(A,B) = 50/(5×10) = **1.0** (same direction!)\n\nA=[1,0], B=[0,1]\ncos = 0 (perpendicular)',
        'Same direction → cosine 1.0. Perpendicular → cosine 0.'
      ),
      commonQuestions: {
        hinglish: [
          '**Cosine vs Euclidean kab?** → Text/embeddings = cosine. Spatial GPS = Euclidean.',
          '**Cosine negative?** → Opposite meaning/direction possible.',
          '**Attention = cosine?** → Related — scaled dot product, softmax se probabilities.',
        ],
        english: [
          '**Cosine vs Euclidean?** → Text/embeddings = cosine. GPS = Euclidean.',
          '**Negative cosine?** → Opposite direction possible.',
          '**Attention = cosine?** → Related — scaled dot product + softmax.',
        ],
      },
      internalMemory: bi(
        'GPU pe cosine often fused kernel — normalize once, dot products batched. Vector DBs (FAISS, Pinecone) SIMD optimize karte hain distance compute.',
        'GPUs batch cosine via fused kernels. Vector DBs (FAISS) SIMD-optimize distance.'
      ),
      production: bi(
        'Pinecone/Weaviate default: cosine. FAISS supports L2 and inner product. OpenAI embeddings normalized — cosine ≈ dot product. Metric choice affects recall quality.',
        'Pinecone default cosine. FAISS L2/IP. OpenAI embeddings normalized. Metric affects recall.'
      ),
      interview: {
        hinglish: [
          '**Basic:** Cosine similarity formula?',
          '**Intermediate:** Kyun text mein Euclidean kam use hota hai?',
          '**Advanced:** Approximate NN vs exact — tradeoff?',
        ],
        english: [
          '**Basic:** Cosine similarity formula?',
          '**Intermediate:** Why less Euclidean for text?',
          '**Advanced:** Approximate NN vs exact tradeoff?',
        ],
      },
      mistakes: {
        hinglish: [
          'Har jagah Euclidean use karna — text mein cosine standard',
          'Cosine aur dot product same samajhna (magnitude matter karti hai dot mein)',
          'Similarity score ko probability samajhna',
        ],
        english: [
          'Using Euclidean everywhere — cosine is text standard',
          'Confusing cosine with dot product',
          'Treating similarity score as probability',
        ],
      },
      recap: bi(
        '**Metrics:** L2 = distance | Cosine = direction | Dot = attention base | **Next:** KD Tree — fast nearest neighbor',
        '**Metrics:** L2, cosine, dot product | **Next:** KD Tree for fast nearest neighbor'
      ),
      ascii: bi(
        `   B •──── θ small → cos ≈ 1 (similar)
    /
   /
  • A────────── • C
              θ = 90° → cos = 0`,
        `Angle between vectors → cosine similarity`
      ),
    }),
  },
  {
    id: 'course-roadmap',
    sectionId: 'intro',
    title: { hinglish: 'Course Roadmap — Kahan Se Kahan?', english: 'Course Roadmap — Where We Go' },
    duration: '5m',
    tagline: {
      hinglish: 'Vector se MCP tak — poora learning path ek nazar mein',
      english: 'From vectors to MCP — the full learning path at a glance',
    },
    intro: {
      hinglish:
        'Ab tum ready ho deep dive ke liye. Yeh roadmap dikhata hai **12 sections** ka flow — kyun is order mein hai aur har section previous pe kaise build hota hai.',
      english:
        'You are now ready for the deep dive. This roadmap shows the **12 sections** in order — why this sequence and how each builds on the last.',
    },
    explanation: {
      hinglish: `**Learning path (12 sections):**

**① Intro (abhi)** — AI pyramid, Vectors, Why vectors, AI use, Similarity, LLM intro ✓

**② Vector Search** — KD Tree, Annoy, HNSW
→ Kyun? RAG mein millions vectors mein fast search

**③ Vector DB & Foundations** — Pinecone, tokenization, embeddings
→ Text ko vectors mein kaise convert karte hain

**④ Transformer Fundamentals** — Q/K/V, attention, softmax, FFN
→ LLM ka engine step-by-step, zero se

**⑤ Architecture Deep Dive** — RoPE, GQA, residual, modern LLMs

**⑥ Transformers Deep Dive** — Masked attention, multi-head, **KV cache**

**⑦ Training** — Backprop, Adam, LoRA fine-tuning

**⑧ Core Optimizations** — Flash attention, MoE, paged attention

**⑨ Inference** — Prefill/decode, RAG pipeline, sampling

**⑩ Tradeoffs** — Quantization, distillation, speculative decoding

**⑪ Alignment** — RLHF, DPO, safety

**⑫ Agents & MCP** — Tools, agents, production apps

**Kaise padho:**
1. Har chapter mein **"Kyun?"** pehle padho
2. **Animation** tab — step-by-step, slow speed
3. **Playground** — numbers haath se calculate
4. **Quiz** — khud ko test karo`,
      english: `**12-section path:** Intro → Vector Search → Foundations → Transformer Fundamentals → Architecture → Deep Dive → Training → Optimizations → Inference → Tradeoffs → Alignment → Agents/MCP.

**How to study:** Read "Why first" → Animation tab → Playground → Quiz.`,
    },
    keyPoints: {
      hinglish: [
        'Bottom-up: vectors → search → transformer → production',
        'Har chapter 12 sections + 10 viz modes',
        'Why-first — formula se pehle intuition',
        'Hinglish default, English toggle',
      ],
      english: [
        'Bottom-up: vectors → search → transformer → production',
        '12 sections + 10 viz modes per chapter',
        'Why-first pedagogy',
        'Hinglish default, English toggle',
      ],
    },
    analogy: {
      hinglish:
        'Building construction — pehle foundation (vectors), phir plumbing (search), phir structure (transformer), phir interior (inference), phir smart home (agents). Bina foundation ke building nahi.',
      english:
        'Building a house — foundation (vectors), plumbing (search), structure (transformer), interior (inference), smart home (agents). No foundation, no building.',
    },
    steps: [
      { title: bi('① AI ✓', '① AI ✓'), caption: bi('ML → DL → LLM', 'ML → DL → LLM') },
      { title: bi('② Vectors ✓', '② Vectors ✓'), caption: bi('Numbers = meaning', 'Numbers = meaning') },
      { title: bi('③ Similarity ✓', '③ Similarity ✓'), caption: bi('Cosine, L2', 'Cosine, L2') },
      { title: bi('④ Vector Search', '④ Vector Search'), caption: bi('KD Tree, HNSW', 'KD Tree, HNSW') },
      { title: bi('⑤–⑬ Deep dive', '⑤–⑬ Deep dive'), caption: bi('Transformer → Agents', 'Transformer → Agents') },
    ],
    teaching: teaching({
      intuition: bi(
        'Course **restricted nahi** lagega kyunki har topic se pehle "kyun chahiye" clear hai. KD Tree random nahi — RAG ke liye. Attention random nahi — LLM ka dil.',
        'The course won\'t feel **abrupt** because every topic starts with "why we need it." KD Tree is for RAG. Attention is the heart of the LLM.'
      ),
      problemStatement: bi(
        '**Problem:** YouTube/ blogs mein topics random order mein — KV cache bina attention ke samajh aana mushkil. Yeh course **dependency order** follow karta hai.',
        '**Problem:** Random topic order elsewhere makes KV cache hard without attention. This course follows **dependency order**.'
      ),
      whyInvented: bi(
        'Is academy ka goal: **ek jagah** pe university-level depth + visual animations + Hinglish teaching — India/global learners ke liye jo zero se shuru karte hain.',
        'Goal: **one place** for university depth + visuals + accessible teaching for learners starting from zero.'
      ),
      dryRun: bi(
        `Example path to understand "RAG":
1. Vector (intro) ✓
2. Similarity search (KD Tree, HNSW)
3. Embeddings + Vector DB
4. LLM generates answer
5. RAG = (3) + (4) combined

Skip step 1-3 → RAG feels like magic.
Follow order → RAG feels obvious.`,
        `Dependency chain: vectors → search → embeddings → LLM → RAG.`
      ),
      summary: bi(
        'Agla chapter: **KD Tree** — pehla vector search algorithm. Animation chalao, slow speed, har step ka "Kyun?" padho. Shuru karo! 🚀',
        'Next chapter: **KD Tree**. Run the animation, read each "Why?" — let\'s go!'
      ),
    }),
  },
]
