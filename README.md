# thiagodiogo.com

Personal portfolio website for **Thiago Diogo** — Software Engineer specializing in scalable backend systems, distributed architectures, and high-performance solutions.

**Live:** [www.thiagodiogo.com](https://www.thiagodiogo.com)

---

## Overview

Single-page application built to present professional experience, selected work, and personal projects. Supports automatic language detection (English and Portuguese) based on browser settings, with no manual selector — content adapts seamlessly.

### Sections

- **Hero** — Introduction and tech stack highlights
- **Experience** — Professional timeline with role details and duration
- **Selected Work** — Key projects from professional experience
- **Personal Projects** — Side projects and open-source contributions
- **Contact** — CTA with multiple contact channels (Email, WhatsApp, LinkedIn, GitHub)

---

## Tech Stack

| Layer         | Technology                                      |
|---------------|--------------------------------------------------|
| Framework     | React 19                                         |
| Language      | TypeScript 5.9                                   |
| Build Tool    | Vite 6                                           |
| Styling       | Tailwind CSS 4                                   |
| Animations    | Framer Motion                                    |
| Routing       | Wouter                                           |
| i18n          | i18next + Browser Language Detector              |
| Icons         | Lucide React, React Icons                        |
| UI Primitives | Radix UI (Toast, Tooltip)                        |
| Hosting       | Vercel                                           |

---

## Project Structure

```
src/
├── components/ui/       # Reusable UI components (card, toast, tooltip)
├── data/                # Static data (experience, projects)
├── hooks/               # Custom hooks (mobile detection, toast)
├── i18n/
│   ├── index.ts         # i18next configuration
│   └── locales/
│       ├── en/          # English translations (6 namespaces)
│       └── pt/          # Portuguese translations (6 namespaces)
├── lib/                 # Utilities and animation variants
├── pages/
│   ├── home/
│   │   ├── index.tsx    # Home page layout
│   │   └── sections/    # navbar, hero, experience, projects, contact, footer
│   └── not-found.tsx    # 404 page
├── styles/
│   └── index.css        # Global styles and Tailwind imports
├── App.tsx              # Root component with dynamic meta tags
├── main.tsx             # Entry point
└── router.tsx           # Route definitions
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/eipastel/portfolio-frontend.git
cd portfolio-frontend
npm install
```

### Development

```bash
npm run dev
```

Runs on `http://localhost:5173` with hot reload.

### Build

```bash
npm run build
```

Outputs to `dist/`.

### Type Check

```bash
npm run typecheck
```

---

## Internationalization

Translation files are organized by namespace under `src/i18n/locales/{en,pt}/`:

- `common.json` — Navigation, contact modal, footer, meta tags
- `hero.json` — Hero section content
- `experience.json` — Job timeline labels and date formatting
- `projects.json` — Section titles
- `contact.json` — CTA section
- `data.json` — Experience entries, project descriptions

Language is detected automatically from the browser's `navigator.language`. Fallback is English.

---

## Deployment

Deployed on **Vercel** with the following configuration:

- Build command: `npm run build`
- Output directory: `dist`
- Framework preset: Vite
- Domain redirect: `thiagodiogo.com` -> `www.thiagodiogo.com`

---

## License

This project is the personal portfolio of Thiago Diogo. Source code is available for reference purposes.
