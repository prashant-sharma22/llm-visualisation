import type { Concept } from '../../types/concept'

export const agentConcepts: Concept[] = [
  {
    id: 'context-engineering',
    sectionId: 'agents',
    title: { hinglish: 'Context Engineering', english: 'Context Engineering' },
    duration: '11m',
    tagline: {
      hinglish: 'Prompt likhna nahi — poora context window strategically design karna',
      english: 'Not just writing prompts — strategically designing the entire context window',
    },
    intro: {
      hinglish:
        'Context Engineering prompt engineering ka evolution hai. Poora context window — system prompt, examples, retrieved docs, tool results, memory — strategically arrange karna taaki model best perform kare.',
      english:
        'Context Engineering is the evolution of prompt engineering. Strategically arranging the entire context window — system prompt, examples, retrieved docs, tool results, memory — so the model performs best.',
    },
    explanation: {
      hinglish: `**Context window components:**
1. **System instructions** — role, constraints, format
2. **Few-shot examples** — task demonstrations
3. **RAG retrieved chunks** — relevant documents
4. **Conversation history** — trimmed/summarized
5. **Tool definitions** — available functions
6. **Working memory** — scratchpad, intermediate results

**Techniques:**
- **Chunking strategies:** Semantic vs fixed size
- **Reranking:** Retrieved docs ko relevance se sort
- **Context compression:** Long history summarize karo
- **Lost in the middle:** Important info start/end pe rakho (models middle ignore karte hain)
- **Dynamic context:** Query ke hisaab se components select

**vs Prompt Engineering:** Prompt = ek message. Context Engineering = pura input pipeline design.`,
      english: `**Context window components:**
1. **System instructions** — role, constraints, format
2. **Few-shot examples**
3. **RAG retrieved chunks**
4. **Conversation history** — trimmed/summarized
5. **Tool definitions**
6. **Working memory** — scratchpad, intermediate results

**Techniques:**
- **Chunking:** Semantic vs fixed size
- **Reranking:** Sort retrieved docs by relevance
- **Compression:** Summarize long history
- **Lost in the middle:** Put important info at start/end
- **Dynamic context:** Select components per query

**vs Prompt Engineering:** Prompt = one message. Context Engineering = entire input pipeline.`,
    },
    keyPoints: {
      hinglish: ['Poora context window design', 'RAG + memory + tools integrate', 'Lost-in-middle problem aware raho', 'Production AI ka core skill'],
      english: ['Design the full context window', 'Integrate RAG + memory + tools', 'Watch lost-in-middle problem', 'Core production AI skill'],
    },
    analogy: {
      hinglish: 'Exam mein sirf answer nahi — kaunse notes allowed, kitne pages, kya order — pura setup matter karta hai. Context Engineering wahi setup hai.',
      english: 'In an exam, not just the answer — which notes, how many pages, what order — the whole setup matters. Context Engineering is that setup.',
    },
    steps: [
      { title: { hinglish: 'System prompt', english: 'System prompt' }, caption: { hinglish: 'Role aur rules define', english: 'Define role and rules' } },
      { title: { hinglish: 'Retrieve context', english: 'Retrieve context' }, caption: { hinglish: 'RAG se relevant docs', english: 'Relevant docs via RAG' } },
      { title: { hinglish: 'Assemble window', english: 'Assemble window' }, caption: { hinglish: 'Strategic ordering', english: 'Strategic ordering' } },
      { title: { hinglish: 'Trim / compress', english: 'Trim / compress' }, caption: { hinglish: 'Token budget manage', english: 'Manage token budget' } },
      { title: { hinglish: 'Model inference', english: 'Model inference' }, caption: { hinglish: 'Optimized context se response', english: 'Response from optimized context' } },
    ],
  },
  {
    id: 'ai-agents',
    sectionId: 'agents',
    title: { hinglish: 'AI Agents', english: 'AI Agents' },
    duration: '10m',
    tagline: {
      hinglish: 'LLM + planning + tools + memory = autonomous task completion',
      english: 'LLM + planning + tools + memory = autonomous task completion',
    },
    intro: {
      hinglish:
        'AI Agent ek LLM hai jo autonomously goals pursue karta hai — plan banata hai, tools use karta hai, observe karta hai, adapt karta hai. Sirf respond nahi, **act** karta hai.',
      english:
        'An AI Agent is an LLM that autonomously pursues goals — plans, uses tools, observes, adapts. It doesn\'t just respond, it **acts**.',
    },
    explanation: {
      hinglish: `**Agent loop (core):**
\`\`\`
Goal → Plan → Act → Observe → Reflect → (repeat until done)
\`\`\`

**Components:**
1. **Brain (LLM):** Reasoning, decisions
2. **Tools:** Search, code, APIs, browser
3. **Memory:** Short-term (context) + long-term (vector DB)
4. **Planner:** Task decomposition

**Architectures:**
- **ReAct:** Reason + Act interleaved
- **Plan-and-Execute:** Pehle full plan, phir execute
- **Multi-agent:** Specialized agents collaborate (researcher, coder, reviewer)

**Examples:** AutoGPT, LangChain agents, Claude computer use, Devin (coding agent).

**Challenges:** Reliability, infinite loops, cost, safety guardrails.`,
      english: `**Agent loop:**
\`\`\`
Goal → Plan → Act → Observe → Reflect → (repeat until done)
\`\`\`

**Components:**
1. **Brain (LLM):** Reasoning, decisions
2. **Tools:** Search, code, APIs, browser
3. **Memory:** Short-term + long-term (vector DB)
4. **Planner:** Task decomposition

**Architectures:** ReAct, Plan-and-Execute, Multi-agent

**Examples:** AutoGPT, LangChain agents, Claude computer use, Devin.

**Challenges:** Reliability, infinite loops, cost, safety.`,
    },
    keyPoints: {
      hinglish: ['Autonomous goal pursuit', 'Plan-Act-Observe loop', 'Tools + memory essential', 'Multi-agent = team of specialists'],
      english: ['Autonomous goal pursuit', 'Plan-Act-Observe loop', 'Tools + memory essential', 'Multi-agent = team of specialists'],
    },
    analogy: {
      hinglish: 'Personal assistant jo sirf jawab nahi deta — meeting book kare, email bheje, research kare. AI Agent wahi digital assistant hai.',
      english: 'A personal assistant who doesn\'t just answer — books meetings, sends email, does research. An AI Agent is that digital assistant.',
    },
    steps: [
      { title: { hinglish: 'Goal receive', english: 'Goal receive' }, caption: { hinglish: 'User task agent ko milta hai', english: 'User task given to agent' } },
      { title: { hinglish: 'Plan steps', english: 'Plan steps' }, caption: { hinglish: 'Task ko subtasks mein todo', english: 'Break task into subtasks' } },
      { title: { hinglish: 'Execute action', english: 'Execute action' }, caption: { hinglish: 'Tool call ya code run', english: 'Tool call or run code' } },
      { title: { hinglish: 'Observe result', english: 'Observe result' }, caption: { hinglish: 'Output evaluate karo', english: 'Evaluate output' } },
      { title: { hinglish: 'Iterate / done', english: 'Iterate / done' }, caption: { hinglish: 'Repeat ya final answer', english: 'Repeat or final answer' } },
    ],
  },
  {
    id: 'model-context-protocol',
    sectionId: 'agents',
    title: { hinglish: 'Model Context Protocol (MCP)', english: 'Model Context Protocol (MCP)' },
    duration: '11m',
    tagline: {
      hinglish: 'USB-C for AI — ek standard protocol se koi bhi tool/data source connect',
      english: 'USB-C for AI — one standard protocol to connect any tool or data source',
    },
    intro: {
      hinglish:
        'Anthropic ne MCP launch kiya — open standard jisse LLM applications external data sources aur tools se securely connect ho sakti hain. Har integration ke liye custom code nahi — ek protocol.',
      english:
        'Anthropic launched MCP — an open standard so LLM applications can securely connect to external data and tools. One protocol instead of custom code per integration.',
    },
    explanation: {
      hinglish: `**Problem before MCP:**
- Har tool ke liye alag integration (Slack, GitHub, DB...)
- N tools × M LLM apps = N×M custom connectors
- Maintenance nightmare

**MCP Solution:**
- **MCP Server:** Data/tool expose karta hai (filesystem, DB, API)
- **MCP Client:** LLM app (Claude Desktop, Cursor) connect karta hai
- **Standard protocol:** JSON-RPC based, resources + tools + prompts

**Primitives:**
1. **Resources:** Read-only data (files, docs)
2. **Tools:** Callable functions (search, create issue)
3. **Prompts:** Reusable prompt templates

**Ecosystem:** GitHub MCP, Slack MCP, Postgres MCP, filesystem, browser — community servers.

**Cursor mein:** MCP servers directly IDE mein integrate — Jira, Confluence, custom tools.`,
      english: `**Problem before MCP:**
- Separate integration per tool (Slack, GitHub, DB...)
- N tools × M LLM apps = N×M connectors
- Maintenance nightmare

**MCP Solution:**
- **MCP Server:** Exposes data/tools
- **MCP Client:** LLM app connects (Claude Desktop, Cursor)
- **Standard protocol:** JSON-RPC, resources + tools + prompts

**Primitives:**
1. **Resources:** Read-only data
2. **Tools:** Callable functions
3. **Prompts:** Reusable templates

**Ecosystem:** GitHub, Slack, Postgres, filesystem MCP servers.

**In Cursor:** MCP servers integrate directly in the IDE.`,
    },
    keyPoints: {
      hinglish: ['Open standard by Anthropic', 'Server-Client architecture', 'Resources, Tools, Prompts', 'Cursor, Claude Desktop support'],
      english: ['Open standard by Anthropic', 'Server-Client architecture', 'Resources, Tools, Prompts', 'Cursor, Claude Desktop support'],
    },
    analogy: {
      hinglish: 'USB-C se koi bhi charger, koi bhi device — alag cable nahi chahiye. MCP se koi bhi LLM app, koi bhi data source — standard plug.',
      english: 'USB-C works with any charger and device — no special cable. MCP lets any LLM app plug into any data source with one standard.',
    },
    steps: [
      { title: { hinglish: 'MCP Server', english: 'MCP Server' }, caption: { hinglish: 'Tool/data expose karo', english: 'Expose tool/data' } },
      { title: { hinglish: 'MCP Client', english: 'MCP Client' }, caption: { hinglish: 'LLM app connect kare', english: 'LLM app connects' } },
      { title: { hinglish: 'Discover', english: 'Discover' }, caption: { hinglish: 'Available tools list', english: 'List available tools' } },
      { title: { hinglish: 'Call tool', english: 'Call tool' }, caption: { hinglish: 'Standard JSON-RPC request', english: 'Standard JSON-RPC request' } },
      { title: { hinglish: 'Result in context', english: 'Result in context' }, caption: { hinglish: 'Response model ko mile', english: 'Response reaches model' } },
    ],
  },
]
