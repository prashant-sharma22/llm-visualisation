import type { Concept } from '../../types/concept'
import { bi, teaching } from './teaching-utils'

export const vectorSearchConcepts: Concept[] = [
  {
    id: 'kd-tree',
    sectionId: 'vector-search',
    title: { hinglish: 'KD Tree', english: 'KD Tree' },
    duration: '8m',
    tagline: {
      hinglish: '2D/3D points ko tree mein organize karo — fast nearest neighbor search',
      english: 'Organize 2D/3D points in a tree — fast nearest neighbor search',
    },
    intro: {
      hinglish:
        'KD Tree (K-Dimensional Tree) ek binary tree hai jo multi-dimensional points ko organize karta hai. Har level pe ek axis (X ya Y) se space ko half mein split karta hai — alternate splitting.',
      english:
        'A KD Tree (K-Dimensional Tree) is a binary tree that organizes multi-dimensional points. At each level it splits space along one axis (X or Y) — alternating splits.',
    },
    explanation: {
      hinglish: `**Building process:**
1. Sab points list mein lo
2. Current depth se axis choose karo: depth % k → depth 0 = X, depth 1 = Y, depth 2 = X...
3. Us axis pe median point choose karo → root banao
4. Left subtree = points < median, Right = points > median
5. Recursively repeat

**Search:**
1. Root se start — target point se compare
2. Splitting axis pe decide: left ya right jao
3. Best distance track karo
4. **Backtracking:** Agar doosri side pe bhi closer point ho sakta hai (circle crosses splitting plane) → wahan bhi jao

**Complexity:**
- Build: O(n log n) average
- Search: O(log n) average, O(n) worst case
- High dimensions mein degrade hota hai (curse of dimensionality)`,
      english: `**Building:**
1. Take all points
2. Choose axis from depth: depth % k → depth 0 = X, depth 1 = Y...
3. Pick median on that axis → root
4. Left = points < median, Right = points > median
5. Recurse

**Search:** Compare at root, go left/right, track best distance, **backtrack** if the other side might be closer.

**Complexity:** Build O(n log n), Search O(log n) average, O(n) worst. Degrades in high dimensions.`,
    },
    keyPoints: {
      hinglish: ['Alternate X/Y splitting', 'Median se balanced tree', 'Backtracking zaroori hai', 'Low dimensions mein best'],
      english: ['Alternate X/Y splitting', 'Median for balanced tree', 'Backtracking is essential', 'Best in low dimensions'],
    },
    analogy: {
      hinglish: 'City map mein pehle North-South divide, phir East-West — har baar area chhota. KD Tree bhi space ko aise kaat-ta hai.',
      english: 'On a city map, divide North-South then East-West — area shrinks each time. KD Tree cuts space the same way.',
    },
    steps: [
      { title: bi('Points input', 'Points input'), caption: bi('2D points list', '2D points list') },
      { title: bi('X split', 'X split'), caption: bi('Median on X axis', 'Median on X axis') },
      { title: bi('Y split', 'Y split'), caption: bi('Subtrees pe Y split', 'Y split on subtrees') },
      { title: bi('Search', 'Search'), caption: bi('Greedy + backtrack', 'Greedy + backtrack') },
      { title: bi('Nearest found', 'Nearest found'), caption: bi('Minimum distance point', 'Minimum distance point') },
    ],
    teaching: teaching({
      intuition: bi(
        'Imagine tumhare paas 1000 log ka location data hai (latitude, longitude). Har baar "sabse nazdeeki dukaan kahan?" puchna = 1000 points se distance calculate = slow. KD Tree space ko organize karke turant irrelevant areas skip kar deta hai.',
        'Imagine 1000 people\'s locations. Asking "nearest shop?" every time = compute distance to all 1000 = slow. KD Tree organizes space to skip irrelevant areas instantly.'
      ),
      problemStatement: bi(
        'Brute force nearest neighbor: har query pe N points check → O(N) per query. 1 million points × 1000 queries = disaster. Humein data structure chahiye jo search space ko eliminate kare.',
        'Brute force: check N points per query → O(N). 1M points × 1000 queries = disaster. We need a structure that eliminates search space.'
      ),
      whyInvented: bi(
        '1970s mein Jon Bentley ne multidimensional search ke liye banaya. Computational geometry, ML (k-NN), game engines — sab jagah use hota hai jab dimensions kam hon (2D, 3D).',
        'Jon Bentley created it in the 1970s for multidimensional search. Used in computational geometry, ML (k-NN), game engines when dimensions are low (2D, 3D).'
      ),
      dryRun: bi(
        `Points: A(2,3), B(5,4), C(9,6), D(4,7), E(8,1), F(7,2)

Step 1 — Root (depth 0, X axis): median X = 7 → F(7,2) root
  Left (X<7): A(2,3), B(5,4), D(4,7)
  Right (X>7): C(9,6), E(8,1)

Step 2 — Left child (depth 1, Y): median Y = 4 → B(5,4)
  Left: A(2,3), Right: D(4,7)

Search target P(6,5):
→ Root F: X=7, 6<7 → go LEFT to B
→ B: Y=4, 5>4 → go RIGHT to D
→ D(4,7): distance = √((6-4)²+(5-7)²) = √8 ≈ 2.83
→ Backtrack: check if other branch needed`,
        `Points: A(2,3), B(5,4), C(9,6), D(4,7), E(8,1), F(7,2)

Step 1 — Root (depth 0, X): median X = 7 → F(7,2)
  Left: A, B, D | Right: C, E

Step 2 — Left (depth 1, Y): median Y = 4 → B(5,4)

Search P(6,5): F→left B→right D, distance ≈ 2.83, backtrack if needed`
      ),
      numericalExample: bi(
        'Target (6,5), candidate D(4,7): d = √((6-4)² + (5-7)²) = √(4+4) = √8 ≈ 2.83. Agar best so far 2.83 hai aur splitting plane X=7 pe ho, toh right side tabhi check karo jab |6-7| < 2.83 — yahan 1 < 2.83 so backtrack karo.',
        'Target (6,5), D(4,7): d = √8 ≈ 2.83. Backtrack to other side when distance to splitting plane < best distance so far.'
      ),
      matrixDimensions: bi(
        'KD Tree matrices use nahi karta — points (n, k) where n = number of points, k = dimensions (2 for 2D). Tree nodes store: point coordinates + left/right pointers. No matrix multiplication.',
        'KD Tree doesn\'t use matrices — points (n, k) where n = count, k = dimensions. Nodes store coordinates + pointers.'
      ),
      asciiDiagram: bi(
        `Points on 2D plane:
    Y
    |  D(4,7)
    |    B(5,4)     C(9,6)
    | A(2,3)   F(7,2)----X split
    |         E(8,1)
    +------------------ X

Tree:
        F(7,2) [split X]
       /        \\
   B(5,4)      E(8,1)
   /    \\         \\
A(2,3) D(4,7)   C(9,6)`,
        `Points on 2D plane → Tree with X/Y alternating splits`
      ),
      interviewQuestions: {
        hinglish: [
          'KD Tree aur BST mein kya difference hai?',
          'Backtracking kab zaroori hota hai search mein?',
          'Curse of dimensionality KD Tree ko kaise affect karta hai?',
          'Build complexity kya hai aur kyun?',
        ],
        english: [
          'Difference between KD Tree and BST?',
          'When is backtracking necessary in search?',
          'How does curse of dimensionality affect KD Tree?',
          'What is build complexity and why?',
        ],
      },
      commonMistakes: {
        hinglish: [
          'Sirf ek side search karke backtracking skip karna',
          'Galat axis pe split karna (depth % k bhool jana)',
          'High dimensions (100D) mein KD Tree use karna — fail hoga',
        ],
        english: [
          'Searching only one side and skipping backtracking',
          'Splitting on wrong axis (forgetting depth % k)',
          'Using KD Tree in high dimensions (100D) — it fails',
        ],
      },
      summary: bi(
        'KD Tree = space-partitioning binary tree, alternate axis splits, O(log n) average search with backtracking. Best for low-dimensional exact nearest neighbor. High dimensions → use ANN (Annoy, HNSW).',
        'KD Tree = space-partitioning binary tree, alternate splits, O(log n) search with backtracking. Best for low-D exact NN. High-D → use ANN.'
      ),
    }),
  },
  {
    id: 'annoy',
    sectionId: 'vector-search',
    title: { hinglish: 'Annoy (Approximate NN)', english: 'Annoy (Approximate NN)' },
    duration: '6m',
    tagline: {
      hinglish: 'Random projection trees — fast approximate search, Spotify ne banaya',
      english: 'Random projection trees — fast approximate search, built by Spotify',
    },
    intro: {
      hinglish:
        'Annoy (Approximate Nearest Neighbors Oh Yeah) random hyperplanes se trees banata hai. Multiple trees = zyada recall. Exact nahi, lekin bahut fast — Spotify music recommendations ke liye use karta tha.',
      english:
        'Annoy builds trees using random hyperplanes. Multiple trees = better recall. Not exact, but very fast — Spotify used it for music recommendations.',
    },
    explanation: {
      hinglish: `**Random Projection Tree:**
1. Random 2 points choose karo
2. Unke beech hyperplane se space split
3. Recursively subtrees banao
4. Leaf nodes mein points store

**Multiple Trees:** Ek tree galat direction ja sakta hai. 10-100 trees banao → har tree se candidate lo → union → best pick.

**vs KD Tree:** KD Tree exact + median splits. Annoy approximate + random splits. Annoy high-D mein better.

**Recall:** Trees badhao → recall ↑, build time ↑, memory ↑`,
      english: `**Random Projection Tree:** Pick 2 random points, split by hyperplane between them, recurse, store points in leaves.

**Multiple Trees:** One tree can go wrong. Build 10-100 trees → candidates from each → union → pick best.

**vs KD Tree:** KD exact + median. Annoy approximate + random. Annoy better in high-D.

**Recall:** More trees → higher recall, more build time and memory.`,
    },
    keyPoints: {
      hinglish: ['Random splits, not median', 'Multiple trees improve recall', 'Approximate — speed over exact', 'Disk-friendly (mmap)'],
      english: ['Random splits, not median', 'Multiple trees improve recall', 'Approximate — speed over exact', 'Disk-friendly (mmap)'],
    },
    analogy: {
      hinglish: '10 alag log se rasta pucho — sab alag route batayenge, best combine karo. Multiple Annoy trees wahi hain.',
      english: 'Ask 10 different people for directions — combine routes. Multiple Annoy trees work the same way.',
    },
    steps: [
      { title: bi('Random hyperplane', 'Random hyperplane'), caption: bi('2 random points se split', 'Split from 2 random points') },
      { title: bi('Build tree', 'Build tree'), caption: bi('Recursive partition', 'Recursive partition') },
      { title: bi('Repeat × N', 'Repeat × N'), caption: bi('Multiple trees', 'Multiple trees') },
      { title: bi('Query all', 'Query all'), caption: bi('Candidates from each tree', 'Candidates from each tree') },
      { title: bi('Best approximate', 'Best approximate'), caption: bi('Union + rerank', 'Union + rerank') },
    ],
    teaching: teaching({
      intuition: bi(
        'KD Tree ek hi "sahi" tree banata hai. Annoy kehta hai: perfect tree mushkil hai high dimensions mein — 50 random trees banao, approximate answer lo. Thodi accuracy trade karke speed milti hai.',
        'KD Tree builds one "correct" tree. Annoy says: perfect tree is hard in high-D — build 50 random trees, get approximate answer. Trade some accuracy for speed.'
      ),
      problemStatement: bi(
        'Exact search high dimensions mein slow. Production systems (Spotify, recommendations) ko "99% accurate, 100x fast" chahiye — Annoy yahi deta hai.',
        'Exact search is slow in high dimensions. Production needs "99% accurate, 100x faster" — Annoy delivers that.'
      ),
      whyInvented: bi(
        'Spotify ne music similarity ke liye banaya — millions of songs, 40+ dimension vectors, real-time recommendations chahiye the.',
        'Spotify built it for music similarity — millions of songs, 40+ dim vectors, real-time recommendations needed.'
      ),
      dryRun: bi(
        `Tree 1: random points P1,P2 → hyperplane → left/right recurse
Tree 2: different random points → different tree structure
Query vector q:
  Tree 1 → leaf candidates {a, b, c}
  Tree 2 → leaf candidates {b, d, e}
  Tree 3 → leaf candidates {a, e, f}
Union = {a,b,c,d,e,f} → exact distance sirf in 6 pe → best = b`,
        `Build N trees with random splits. Query each → union candidates → rerank with exact distance on small set.`
      ),
      numericalExample: bi(
        '100M vectors, 1 tree → recall ~70%. 50 trees → recall ~95%. Query time: 50 × O(log n) tree descent + O(k) exact on k≈100 candidates.',
        '100M vectors: 1 tree ~70% recall, 50 trees ~95%. Query: 50 tree descents + exact on ~100 candidates.'
      ),
      matrixDimensions: bi(
        'Vectors: (n, d) — n points, d dimensions. No matrix ops in tree — dot product for hyperplane side: sign(q · normal).',
        'Vectors (n, d). Hyperplane side via dot product sign(q · normal).'
      ),
      asciiDiagram: bi(
        `Tree 1:          Tree 2:
    [root]            [root]
    /    \\            /    \\
  L      R          L      R
 /\\     /\\        /\\     /\\
...    ...        ...    ...

Query q → descend each tree → collect leaf points → merge → best`,
        `Multiple random trees → query each → merge candidates`
      ),
      interviewQuestions: {
        hinglish: ['Annoy vs KD Tree kab use karoge?', 'Recall badhane ke liye kya karna padta hai?', 'Annoy exact kyun nahi hai?'],
        english: ['When Annoy vs KD Tree?', 'How to improve recall?', 'Why isn\'t Annoy exact?'],
      },
      commonMistakes: {
        hinglish: ['Sirf 1 tree use karna — low recall', 'Annoy ko exact search samajhna', 'High recall chahiye toh trees unlimited badha dena — memory explode'],
        english: ['Using only 1 tree — low recall', 'Treating Annoy as exact search', 'Unlimited trees for recall — memory explodes'],
      },
      summary: bi(
        'Annoy = random projection forests, approximate NN, multiple trees boost recall. Spotify-era classic. High-D production search ke liye KD Tree se better, HNSW se often slower lekin simpler.',
        'Annoy = random projection forests, approximate NN, multiple trees boost recall. Better than KD Tree in high-D for production.'
      ),
    }),
  },
  {
    id: 'hnsw',
    sectionId: 'vector-search',
    title: { hinglish: 'HNSW', english: 'HNSW' },
    duration: '10m',
    tagline: {
      hinglish: 'Hierarchical graph — highway se local roads tak, sabse fast ANN ab',
      english: 'Hierarchical graph — highways to local roads, fastest ANN today',
    },
    intro: {
      hinglish:
        'HNSW (Hierarchical Navigable Small World) graph-based ANN hai. Multiple layers — upar sparse (fast long jumps), neeche dense (precise). Greedy search se nearest neighbor milta hai.',
      english:
        'HNSW (Hierarchical Navigable Small World) is graph-based ANN. Multiple layers — top sparse (fast long jumps), bottom dense (precise). Greedy search finds nearest neighbors.',
    },
    explanation: {
      hinglish: `**Layers:** Layer 0 = all nodes, dense. Upper layers = subset (promotion probability 1/M). Top layer = few nodes, entry point.

**Insert:** Random level assign → connect k nearest in each layer (parameter M).

**Search:**
1. Top layer se entry point
2. Greedy: current node ke neighbors mein sabse closest
3. Jab improve na ho → layer down
4. Layer 0 pe precise search

**Parameters:** M (connections), efConstruction (build quality), efSearch (query quality)

**Complexity:** O(log n) approximate, state-of-the-art recall/speed`,
      english: `**Layers:** Layer 0 = all nodes dense. Upper layers = subset (promotion prob 1/M). Top = entry point.

**Insert:** Random level → connect k nearest per layer (M).

**Search:** Top layer greedy → descend when no improvement → layer 0 precise search.

**Params:** M, efConstruction, efSearch.

**Complexity:** O(log n) approximate, state-of-the-art.`,
    },
    keyPoints: {
      hinglish: ['Hierarchical layers', 'Greedy search + descent', 'M = max connections', 'Pinecone, Milvus, Weaviate use HNSW'],
      english: ['Hierarchical layers', 'Greedy search + descent', 'M = max connections', 'Pinecone, Milvus, Weaviate use HNSW'],
    },
    analogy: {
      hinglish: 'Highway (top layer) se city ke paas aao, phir local roads (layer 0) se exact address. HNSW wahi multi-level navigation hai.',
      english: 'Highway (top layer) to near the city, then local roads (layer 0) to exact address. HNSW is that multi-level navigation.',
    },
    steps: [
      { title: bi('Layer assignment', 'Layer assignment'), caption: bi('Random level per node', 'Random level per node') },
      { title: bi('Connect neighbors', 'Connect neighbors'), caption: bi('M nearest links', 'M nearest links') },
      { title: bi('Entry point', 'Entry point'), caption: bi('Top layer start', 'Top layer start') },
      { title: bi('Greedy search', 'Greedy search'), caption: bi('Jump to closer neighbor', 'Jump to closer neighbor') },
      { title: bi('Layer descent', 'Layer descent'), caption: bi('Down to precise layer', 'Down to precise layer') },
    ],
    teaching: teaching({
      intuition: bi(
        'Facebook friends jaisa — "6 degrees of separation". HNSW graph banata hai jahan har node kuch neighbors se connected hai, aur upper layers "shortcuts" hain long jumps ke liye.',
        'Like Facebook friends — "6 degrees of separation". HNSW builds a graph where nodes connect to neighbors, upper layers are shortcuts for long jumps.'
      ),
      problemStatement: bi(
        'Billions of embeddings (ChatGPT RAG, image search). Brute force impossible. Trees fail in 768D. Graph navigation chahiye jo human social network jaisa navigate kare.',
        'Billions of embeddings. Brute force impossible. Trees fail at 768D. Need graph navigation like social networks.'
      ),
      whyInvented: bi(
        'Malkov & Yashunin 2016 paper. Small World Networks theory + skip list idea combine kiya. Ab industry default for vector DBs.',
        'Malkov & Yashunin 2016. Combined Small World Networks + skip list. Now industry default for vector DBs.'
      ),
      dryRun: bi(
        `Insert node v:
1. Random level l = 2 (example)
2. Layer 2: find M nearest, connect
3. Layer 1: find M nearest, connect  
4. Layer 0: find M nearest, connect

Search query q:
Layer 2: start entry → greedy to nearest → stuck → drop
Layer 1: continue from best → greedy → drop
Layer 0: final greedy → return top-k`,
        `Insert at random level across layers. Search: greedy at top, descend layers, precise at bottom.`
      ),
      numericalExample: bi(
        'n=1M vectors, d=768, M=16, efSearch=100. Query visits ~100-500 nodes instead of 1M. Recall@10 often >95%.',
        'n=1M, d=768, M=16, efSearch=100. Visits ~100-500 nodes not 1M. Recall@10 often >95%.'
      ),
      matrixDimensions: bi(
        'Vectors (n, d). Distance: cosine or L2 between d-dim vectors. Graph stores neighbor indices per node per layer — no weight matrices.',
        'Vectors (n, d). Graph stores neighbor indices per layer.'
      ),
      asciiDiagram: bi(
        `Layer 2 (sparse):    A -------- B
                        |
Layer 1:           A - C - B - D
                  / |   |   | \\
Layer 0 (dense): A-C-E-B-F-D-G-H-...

Search q: Start top → greedy A→B → down → greedy → down → exact`,
        `Sparse top layers, dense bottom — greedy descent`
      ),
      interviewQuestions: {
        hinglish: ['HNSW mein promotion probability kya karti hai?', 'efSearch badhane se kya hota hai?', 'HNSW vs IVF difference?'],
        english: ['What does promotion probability do?', 'What happens when efSearch increases?', 'HNSW vs IVF difference?'],
      },
      commonMistakes: {
        hinglish: ['efSearch bahut kam — poor recall', 'M bahut zyada — slow build, marginal gain', 'HNSW ko exact search samajhna'],
        english: ['efSearch too low — poor recall', 'M too high — slow build', 'Treating HNSW as exact search'],
      },
      summary: bi(
        'HNSW = hierarchical navigable small world graph, greedy multi-layer search, best ANN for most vector DBs. Parameters M, efConstruction, efSearch tune karo recall vs speed ke liye.',
        'HNSW = hierarchical graph ANN, greedy multi-layer search, best for most vector DBs. Tune M, efConstruction, efSearch.'
      ),
    }),
  },
]
