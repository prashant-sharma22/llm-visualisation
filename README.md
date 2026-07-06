# LLM Visualiser

Interactive visual learning platform for LLM concepts — from vectors & AI intro to transformers, RAG, and agents.

**Live:** https://llm-visualisation.prashant-kumar-993.workers.dev

## Features

- 60+ topics across 13 structured sections
- Hinglish default + English toggle
- 10 visualization modes per topic (animation, math, playground, etc.)
- Full-text search (`⌘K` / `Ctrl+K`)
- University-style 12-section teaching format

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
npm run preview
```

Output: `dist/`

## Deploy to Cloudflare Pages (free)

### GitHub auto-deploy (Cloudflare Workers + static assets)

Cloudflare project uses **Workers** with `npx wrangler deploy`. Repo is configured via `wrangler.toml`:

| Setting | Value |
|---------|--------|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |

SPA routing is handled by `not_found_handling = "single-page-application"` in `wrangler.toml` (no `_redirects` file needed).

Live URL: **https://llm-visualisation.prashant-kumar-993.workers.dev**

## Tech stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Framer Motion

## License

MIT
