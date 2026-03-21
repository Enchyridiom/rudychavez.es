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
