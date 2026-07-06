import type { Concept } from '../../types/concept'

export const reasoningConcepts: Concept[] = [
  {
    id: 'rlhf-reasoning',
    sectionId: 'reasoning',
    title: { hinglish: 'Reasoning Models with Human Feedback', english: 'Reasoning Models with Human Feedback' },
    duration: '9m',
    tagline: {
      hinglish: 'RLHF + reasoning training se models sochne lagte hain — o1, DeepSeek-R1 jaisa',
      english: 'RLHF + reasoning training teaches models to think — like o1, DeepSeek-R1',
    },
    intro: {
      hinglish:
        'Reasoning models (OpenAI o1, DeepSeek-R1) extended chain-of-thought use karte hain training mein. RLHF (Reinforcement Learning from Human Feedback) se unko better reasoning paths seekhne ko milta hai — humans ya AI judge se reward.',
      english:
        'Reasoning models (OpenAI o1, DeepSeek-R1) use extended chain-of-thought in training. RLHF teaches better reasoning paths — rewarded by humans or AI judges.',
    },
    explanation: {
      hinglish: `**RLHF Pipeline (3 stages):**
1. **SFT (Supervised Fine-Tuning):** Human demonstrations se base behavior
2. **Reward Model:** Humans compare responses → preference model train
3. **PPO/GRPO:** Policy optimize karo reward maximize karne ke liye

**Reasoning-specific additions:**
- **Chain-of-Thought data:** Step-by-step solutions include karo
- **Process supervision:** Final answer nahi, har reasoning step pe feedback
- **RL on reasoning traces:** Model ko "think longer" reward

**o1 / R1 approach:**
- Hidden reasoning tokens (internal monologue)
- More compute at inference = better answers
- Test-time scaling — zyada socho = zyada accurate

**GRPO (Group Relative Policy Optimization):** DeepSeek-R1 — multiple samples, relative ranking, no separate reward model needed sometimes.`,
      english: `**RLHF Pipeline (3 stages):**
1. **SFT:** Base behavior from human demonstrations
2. **Reward Model:** Humans compare responses → train preference model
3. **PPO/GRPO:** Optimize policy to maximize reward

**Reasoning-specific:**
- **CoT data:** Include step-by-step solutions
- **Process supervision:** Feedback on each step, not just final answer
- **RL on reasoning traces:** Reward "thinking longer"

**o1 / R1:**
- Hidden reasoning tokens (internal monologue)
- More inference compute = better answers
- Test-time scaling — think more = more accurate

**GRPO:** DeepSeek-R1 — multiple samples, relative ranking.`,
    },
    keyPoints: {
      hinglish: ['SFT → Reward Model → RL pipeline', 'Process supervision > outcome only', 'Test-time compute scaling', 'o1, R1 = reasoning + RLHF'],
      english: ['SFT → Reward Model → RL pipeline', 'Process supervision > outcome only', 'Test-time compute scaling', 'o1, R1 = reasoning + RLHF'],
    },
    analogy: {
      hinglish: 'Student ko sirf final marks nahi — har step pe teacher feedback. Reasoning RLHF bhi process pe focus karta hai.',
      english: 'Student gets feedback on each step, not just final marks. Reasoning RLHF focuses on the process too.',
    },
    steps: [
      { title: { hinglish: 'SFT baseline', english: 'SFT baseline' }, caption: { hinglish: 'Human demos se train', english: 'Train from human demos' } },
      { title: { hinglish: 'Reward model', english: 'Reward model' }, caption: { hinglish: 'Preferences se score model', english: 'Score model from preferences' } },
      { title: { hinglish: 'RL optimization', english: 'RL optimization' }, caption: { hinglish: 'PPO/GRPO se policy improve', english: 'Improve policy via PPO/GRPO' } },
      { title: { hinglish: 'Reasoning traces', english: 'Reasoning traces' }, caption: { hinglish: 'Long CoT include karo', english: 'Include long CoT' } },
      { title: { hinglish: 'Test-time scale', english: 'Test-time scale' }, caption: { hinglish: 'Zyada tokens = better reasoning', english: 'More tokens = better reasoning' } },
    ],
  },
  {
    id: 'chain-of-thought',
    sectionId: 'reasoning',
    title: { hinglish: 'Chain of Thought (CoT)', english: 'Chain of Thought (CoT)' },
    duration: '4m',
    tagline: {
      hinglish: '"Let\'s think step by step" — model ko reasoning steps dikhane do',
      english: '"Let\'s think step by step" — let the model show its reasoning',
    },
    intro: {
      hinglish:
        'Chain of Thought prompting model ko intermediate reasoning steps generate karne bolta hai final answer se pehle. Simple prompt addition se math, logic problems pe dramatic improvement.',
      english:
        'Chain of Thought prompting asks the model to generate intermediate reasoning before the final answer. A simple prompt addition dramatically improves math and logic.',
    },
    explanation: {
      hinglish: `**Without CoT:**
Q: Roger has 5 tennis balls. He buys 2 cans of 3 balls each. How many?
A: 11. (Often wrong — model directly guesses)

**With CoT:**
Q: ... Let's think step by step.
A: Roger starts with 5. He buys 2×3=6 more. 5+6=11. Answer: 11. ✓

**Types:**
- **Zero-shot CoT:** "Let's think step by step" add karo
- **Few-shot CoT:** Examples with reasoning include karo
- **Auto-CoT:** Model khud examples generate kare

**Kyun kaam karta hai?** Decomposition — complex problem chhote steps mein. Each step easier than whole.

**Limitations:** Verbose, slow, hallucinated reasoning possible — steps galat ho sakte hain lekin confident dikhe.`,
      english: `**Without CoT:** Model often guesses the final number directly (often wrong).

**With CoT:** Step-by-step: starts with 5, buys 2×3=6, 5+6=11. Answer: 11. ✓

**Types:**
- **Zero-shot CoT:** Add "Let's think step by step"
- **Few-shot CoT:** Include examples with reasoning
- **Auto-CoT:** Model generates its own examples

**Why it works:** Decomposition — break complex into smaller steps.

**Limitations:** Verbose, slow, hallucinated reasoning — wrong steps can look confident.`,
    },
    keyPoints: {
      hinglish: ['"Think step by step" magic phrase', 'Math/logic mein biggest gain', 'Zero-shot aur few-shot dono work', 'Reasoning models isko builtin karte hain'],
      english: ['"Think step by step" magic phrase', 'Biggest gain on math/logic', 'Zero-shot and few-shot both work', 'Reasoning models build this in'],
    },
    analogy: {
      hinglish: 'Exam mein rough work allowed ho — final answer se pehle steps likho. CoT wahi rough work hai model ke liye.',
      english: 'Rough work allowed in exams — write steps before the final answer. CoT is rough work for the model.',
    },
    steps: [
      { title: { hinglish: 'Problem input', english: 'Problem input' }, caption: { hinglish: 'Complex question aata hai', english: 'Complex question arrives' } },
      { title: { hinglish: 'CoT trigger', english: 'CoT trigger' }, caption: { hinglish: '"Step by step" prompt', english: '"Step by step" prompt' } },
      { title: { hinglish: 'Step 1...n', english: 'Step 1...n' }, caption: { hinglish: 'Intermediate reasoning generate', english: 'Generate intermediate reasoning' } },
      { title: { hinglish: 'Synthesize', english: 'Synthesize' }, caption: { hinglish: 'Steps se conclusion', english: 'Conclusion from steps' } },
      { title: { hinglish: 'Final answer', english: 'Final answer' }, caption: { hinglish: 'Accurate answer (usually)', english: 'Accurate answer (usually)' } },
    ],
  },
  {
    id: 'tool-usage',
    sectionId: 'reasoning',
    title: { hinglish: 'Tool Usage in LLMs', english: 'Tool Usage in LLMs' },
    duration: '2m',
    tagline: {
      hinglish: 'Model sirf text nahi — calculator, search, code run kar sakta hai',
      english: 'The model isn\'t just text — it can use calculator, search, run code',
    },
    intro: {
      hinglish:
        'Tool-augmented LLMs external functions call karte hain — web search, Python execution, database query. Model decide karta hai kab tool chahiye, call karta hai, result wapas context mein use karta hai.',
      english:
        'Tool-augmented LLMs call external functions — web search, Python execution, database queries. The model decides when a tool is needed, calls it, and uses the result in context.',
    },
    explanation: {
      hinglish: `**Loop:**
1. User query → LLM
2. LLM: "I need to calculate" → tool_call(calc, "125*47")
3. Runtime executes → result: 5875
4. Result LLM ko wapas → final answer

**Function calling format (OpenAI style):**
\`\`\`json
{"name": "search", "arguments": {"query": "..."}}
\`\`\`

**Popular tools:** Web search, code interpreter, APIs, RAG retrieval, image generation.

**ReAct pattern:** Reasoning + Acting interleaved — "Thought: I should search. Action: search(...). Observation: ..."

**Benefits:** Factual accuracy ↑, math ↑, real-time data access.`,
      english: `**Loop:**
1. User query → LLM
2. LLM: needs calculation → tool_call(calc, "125*47")
3. Runtime executes → 5875
4. Result back to LLM → final answer

**Function calling:** JSON schema for tool name and arguments.

**Popular tools:** Web search, code interpreter, APIs, RAG, image generation.

**ReAct:** Reasoning + Acting interleaved.

**Benefits:** Better factual accuracy, math, real-time data.`,
    },
    keyPoints: {
      hinglish: ['LLM orchestrator, tools workers', 'Function calling standardized', 'ReAct = think + act loop', 'ChatGPT plugins / GPT-4 tools'],
      english: ['LLM orchestrator, tools as workers', 'Standardized function calling', 'ReAct = think + act loop', 'ChatGPT plugins / GPT-4 tools'],
    },
    analogy: {
      hinglish: 'Doctor sab kuch khud nahi karta — lab test bhejta hai, report aane pe diagnose. LLM bhi tools se "lab tests" karta hai.',
      english: 'A doctor doesn\'t do everything — sends lab tests, diagnoses when results arrive. LLMs do "lab tests" via tools.',
    },
    steps: [
      { title: { hinglish: 'User query', english: 'User query' }, caption: { hinglish: 'Question model ko aata hai', english: 'Question reaches model' } },
      { title: { hinglish: 'Tool decision', english: 'Tool decision' }, caption: { hinglish: 'Model decide karta hai tool chahiye', english: 'Model decides tool needed' } },
      { title: { hinglish: 'Execute tool', english: 'Execute tool' }, caption: { hinglish: 'External function run', english: 'Run external function' } },
      { title: { hinglish: 'Observation', english: 'Observation' }, caption: { hinglish: 'Result context mein inject', english: 'Inject result into context' } },
      { title: { hinglish: 'Final response', english: 'Final response' }, caption: { hinglish: 'Tool output ke saath answer', english: 'Answer with tool output' } },
    ],
  },
  {
    id: 'tree-of-thought',
    sectionId: 'reasoning',
    title: { hinglish: 'Tree of Thought (ToT)', english: 'Tree of Thought (ToT)' },
    duration: '3m',
    tagline: {
      hinglish: 'Ek chain nahi — multiple reasoning paths explore karo, best choose karo',
      english: 'Not one chain — explore multiple reasoning paths, pick the best',
    },
    intro: {
      hinglish:
        'Chain of Thought ek linear path hai. Tree of Thought multiple branches explore karta hai — har node pe different next steps, evaluate karke best path select.',
      english:
        'Chain of Thought is one linear path. Tree of Thought explores multiple branches — different next steps at each node, evaluate and select the best path.',
    },
    explanation: {
      hinglish: `**CoT vs ToT:**
- CoT: A → B → C → answer (single path)
- ToT: A → {B1, B2, B3} → evaluate → best continue → ...

**Algorithm:**
1. **Generate:** Current state se k possible next thoughts
2. **Evaluate:** Har thought ko score karo (LLM self-eval ya heuristic)
3. **Search:** BFS/DFS/beam search se tree explore
4. **Backtrack:** Dead ends pe wapas jao

**Use cases:** Game of 24, creative writing, planning tasks jahan multiple valid paths hain.

**Cost:** Zyada LLM calls — expensive but better on hard problems.

**Related:** Graph of Thoughts (GoT) — even more general DAG structure.`,
      english: `**CoT vs ToT:**
- CoT: A → B → C → answer (single path)
- ToT: A → {B1, B2, B3} → evaluate → continue best → ...

**Algorithm:**
1. **Generate:** k possible next thoughts from current state
2. **Evaluate:** Score each thought
3. **Search:** BFS/DFS/beam search the tree
4. **Backtrack:** Return from dead ends

**Use cases:** Game of 24, creative writing, planning with multiple valid paths.

**Cost:** More LLM calls — expensive but better on hard problems.

**Related:** Graph of Thoughts (GoT) — more general DAG.`,
    },
    keyPoints: {
      hinglish: ['Multiple branches explore', 'Evaluate + search strategy', 'CoT se zyada powerful, zyada expensive', 'Planning problems ke liye ideal'],
      english: ['Explore multiple branches', 'Evaluate + search strategy', 'More powerful than CoT, more expensive', 'Ideal for planning problems'],
    },
    analogy: {
      hinglish: 'Chess mein sirf ek move nahi — kai moves imagine karo, best choose karo. ToT wahi multi-move planning hai thinking mein.',
      english: 'In chess you imagine several moves, then pick the best. ToT is that multi-move planning for thinking.',
    },
    steps: [
      { title: { hinglish: 'Root thought', english: 'Root thought' }, caption: { hinglish: 'Problem se start', english: 'Start from problem' } },
      { title: { hinglish: 'Branch generate', english: 'Branch generate' }, caption: { hinglish: 'K possible next steps', english: 'K possible next steps' } },
      { title: { hinglish: 'Evaluate nodes', english: 'Evaluate nodes' }, caption: { hinglish: 'Har branch ko score', english: 'Score each branch' } },
      { title: { hinglish: 'Search / prune', english: 'Search / prune' }, caption: { hinglish: 'Weak paths discard', english: 'Discard weak paths' } },
      { title: { hinglish: 'Best path answer', english: 'Best path answer' }, caption: { hinglish: 'Winning branch se solution', english: 'Solution from winning branch' } },
    ],
  },
]
