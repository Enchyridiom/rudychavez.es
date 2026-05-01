# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
```

There are no tests in this project.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- **GSAP 3** for animations (including `ScrambleTextPlugin`)
- React Compiler enabled (`reactCompiler: true` in `next.config.ts`)

## Architecture

### Routes

- `/` — Homepage (`src/app/page.tsx`): snap-scroll layout with 3 full-height sections
- `/projects` — Projects listing (`src/app/projects/page.tsx`)
- `/about` — About page
- `/contact` — Contact page
- `/projects/[slug]` — Individual project pages (filmin, rainbox, zumo-de-fetos)

### Homepage scroll system

The homepage uses a vertical snap-scroll container (`sectionsRef`) with three `100dvh` sections: `#header`, `#projects`, `#footer`. Navigation between sections is handled by `scrollToSection()`, with bounce animations (GSAP) on the header/footer when the user tries to scroll past the edges. The `NavigationMenu` receives `onScrollToTop`/`onScrollToBottom` callbacks and a `tone` prop that changes colors when the footer section is active.

### NavigationMenu component

`src/app/components/NavigationMenu.tsx` — A floating bottom navigation bar with four variants:
- `up-down` — Arrow up + Menu pill + Arrow down (used on homepage)
- `back-forward` — Arrow left + Menu pill + Arrow right
- `full` — All four arrows + Menu pill
- `mobile` — Alias for `up-down`

Opening the menu triggers a GSAP morph animation: the pill button expands into a full-screen overlay. The overlay uses absolute positioning controlled entirely by GSAP (`overlayBoxRef`), not CSS transitions. The `isMorphing` state gates both the pill visibility and arrow buttons during animation.

### ProjectsLoop component

`src/app/components/ProjectsLoop.tsx` — Renders the projects list repeated 7× to simulate an infinite loop. A `requestAnimationFrame` scroll listener reads `data-project-card` elements, computing a `t` proximity value (0–1) for the card nearest the container center. This drives:
- `scale` via `card.style.transform`
- Title pill opacity/position via `[data-title-pill]`
- Float animation amplitude via `--floatAmp` CSS custom property on `[data-float-wrapper]`

### Design tokens

Defined in `src/app/globals.css` as CSS variables (also mapped to Tailwind theme via `@theme inline`):

| Variable | Value | Usage |
|---|---|---|
| `--primary-blue` | `#5576e8` | Headings, accents |
| `--primary-floral` | `#f7f3e8` | Background |
| `--primary-raspberry` | `#d42b57` | Footer, nav buttons |
| `--primary-gunmetal` | `2f333e` | Body text |
| `--primary-lima` | `#76e384` | Text selection color |

Colors are used directly as Tailwind arbitrary values (e.g. `bg-[#d42b57]`) throughout components.

### Typography

Custom font **Mint Grotesk** loaded from `/public/fonts/` (woff2/woff). Applied globally via `globals.css` and inline via `font-['Mint_Grotesk',sans-serif]` in Tailwind classes. `font-feature-settings: "ss03"` is applied globally and on most text elements individually.

### Assets

Project images are served from `/public/assets/` with content-hash filenames (e.g. `a712d7e0...cb.png`). They are referenced as string constants at the top of each project page file.

### Mobile vs desktop layout

Pages use `hidden md:block` / `md:hidden` to render entirely separate desktop and mobile layouts within the same component. The CSS snap-scroll is disabled on desktop (`≥1024px`) in `globals.css`.

### GSAP conventions

- `gsap-ignore` class marks elements that should be excluded from parent GSAP transforms
- `data-*` attributes (`data-project-card`, `data-title-pill`, `data-float-wrapper`, `data-centered`) are used as DOM query selectors for scroll-driven animations — do not remove them
- Always call `gsap.killTweensOf(el)` before starting new tweens on the same element

---

## Astro migration (in progress)

A parallel Astro project lives in `/astro/` (separate `package.json`). It is the future production build that will be deployed to a Plesk VPS. The Next.js project at the repo root remains live on Netlify until the Astro version reaches feature parity and is validated.

### Working branch and status

- Branch: `astro-migration` (off `main`)
- Remote: pushed to `origin/astro-migration` after every milestone — never leave uncommitted work in this branch
- Dev server: `cd astro && npm run dev` → http://localhost:4321 (different port than Next dev server on 3000, both can run in parallel)

### Astro stack

- **Astro 6** (template `minimal`, TypeScript strict)
- **Tailwind v4** via `@tailwindcss/vite` plugin (NOT postcss — different from the Next side)
- **GSAP 3** installed as dependency but used sparingly — see "Animation strategy" below
- No Astro integrations beyond Tailwind. No Astro `<ClientRouter />` view-transitions integration.

### Animation strategy (decided rule)

Default = native CSS / vanilla JS. GSAP = exception when CSS becomes unreasonably complex.

For each migration of an animated component, the loop is:
1. Try CSS / native first
2. If it works → next migration
3. If not → review the code together, then either fix it or fall back to GSAP

Outcomes so far:
- `UnderConstructionBanner`: kept GSAP + ScrambleTextPlugin (scramble effect not feasible with CSS)
- `NavigationMenu` morph: tried View Transitions API first, but it cross-fades rasterized snapshots instead of morphing — felt like a state change, not a true transformation. Replaced with **CSS transitions on a single live element** (same approach as the original GSAP code, animating `width`, `height`, `left`, `top`, `border-radius` continuously). Zero GSAP, real morph.
- Pending: `Header`, `ProjectsLoop`, homepage. ProjectsLoop is the canonical case for `animation-timeline: view()` (CSS scroll-driven).

### Migration progress

| Page / component | Status | Notes |
|---|---|---|
| `/` (homepage) | ❌ pending | Depends on Header, ProjectsLoop, NavigationMenu integration with snap-scroll |
| `/about` | ✅ migrated | |
| `/contact` | ✅ migrated | TODO: hover color of email link should be lima (`#76e384`) on this page only — currently invisible-blue against blue bg |
| `/projects` | ✅ migrated | |
| `/projects/[slug]` | ✅ migrated | Single dynamic route with `getStaticPaths` replaces 3 Next folders |
| `Footer` (Desktop + Mobile) | ✅ migrated | Direct port, no animation |
| `UnderConstructionBanner` | ✅ migrated | GSAP `<script>` block in Astro component |
| `NavigationMenu` | ✅ migrated | CSS transitions, only `up-down` variant for now (the only one used by internal pages); `back-forward` and `full` pending |
| `Header` | ❌ pending | |
| `ProjectsLoop` | ❌ pending | |

### Astro file layout

```
astro/
├── astro.config.mjs           # Tailwind v4 via Vite plugin
├── package.json
├── public/fonts/              # Mint Grotesk woff/woff2 (copied from /public/fonts/)
└── src/
    ├── styles/global.css      # Design tokens + @theme inline + @layer base for <a>
    ├── layouts/Layout.astro   # Includes UnderConstructionBanner globally
    ├── components/
    │   ├── ImagePlaceholder.astro
    │   ├── UnderConstructionBanner.astro
    │   ├── FooterDesktop.astro
    │   ├── FooterMobile.astro
    │   └── NavigationMenu.astro
    └── pages/
        ├── index.astro        # Astro preview page (NOT homepage yet)
        ├── about.astro
        ├── contact.astro
        └── projects/
            ├── index.astro
            └── [slug].astro
```

### Astro conventions

- **Selectors via `data-*` attributes** (`data-nav-pill`, `data-uc-banner`, etc.). Do NOT use class selectors for JS hooks — they collide with Tailwind utilities and Vite scoping
- **Astro `<script>` blocks are bundled by Vite**, ESM imports work normally (e.g. `import { gsap } from 'gsap'`)
- **CSS layers matter**: any global rules on common selectors (like `<a>`) MUST go inside `@layer base` so Tailwind utilities can override them. Unlayered rules win over `@layer utilities` by spec
- **Tailwind v4 important modifier**: use trailing `!` (e.g. `text-[#f7f3e8]!`) — different from v3's leading `!`
- **No React, no `useState`/`useRef`/`useEffect`** in Astro components. Interactivity is plain DOM via `<script>`. If a component truly needs React patterns it can be imported as an island with `client:load`, but so far we haven't needed that

### Workflow rules to follow in future sessions

1. **Commit and push after every meaningful migration step**. Untracked work is the only thing that gets lost — push to GitHub regularly so the branch backup is always current
2. **Do NOT touch `main`**. Netlify deploys from `main`; the Astro work stays on `astro-migration` until validated on Plesk and merged via PR
3. **The Next.js project at the repo root is the source of truth** for what the migration must replicate. Read the original `src/app/...` file before migrating its Astro counterpart
4. **Visual parity is the goal**, not "clean rewrite". Heights, spacings, breakpoints, even the exact 100dvh placeholder sections should mirror the original until the equivalent is migrated
5. **For animations**: see "Animation strategy" above. Try CSS first, fall back to GSAP only after honest review
