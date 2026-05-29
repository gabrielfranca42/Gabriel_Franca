# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Dev server at http://localhost:5173
npm run build        # Type-check + Vite build → dist/
npm run preview      # Preview the production build
npm run typecheck    # tsc --noEmit (no test framework)
```

There is no test runner configured.

## Architecture

Single-page portfolio app (React 19 + Vite 6 + TypeScript). One route renders the home page; a catch-all renders the 404 page.

**Data flow:** all portfolio content (experience, projects, personal projects) lives in `src/i18n/locales/{en,pt}/data.json`. These JSON files are the single source of truth for content — no separate data layer or API calls.

**i18n:** language is detected automatically from `navigator.language` (no UI toggle). Namespaces: `common`, `hero`, `experience`, `projects`, `contact`, `data`. When adding content, both `en/` and `pt/` files must be updated in sync.

**Animations:** shared Framer Motion variants (`FADE_UP`, `STAGGER_CONTAINER`) are defined in `src/lib/animations.ts` and reused across sections.

**Path alias:** `@/` maps to `src/`.

**Styling:** Tailwind CSS 4 (configured via `@tailwindcss/vite` plugin, not `tailwind.config.js`). The site uses a forced dark mode class (`dark`) set on the home wrapper.

## Key files

| File | Purpose |
|------|---------|
| `src/i18n/locales/{en,pt}/data.json` | All experience + project content |
| `src/pages/home/sections/` | One file per page section (navbar, hero, experience, projects, contact, footer) |
| `src/lib/animations.ts` | Shared Framer Motion variants |
| `src/App.tsx` | Syncs `<html lang>` and meta tags to current language on every language change |

## Deployment

Hosted on Vercel. Build command: `npm run build`, output: `dist/`. CV PDFs are committed to `public/` and also to `dist/` directly.
