<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Design and content contract

This site is a recruiter-facing portfolio. A visitor must get who / what / evidence / status / next action within
ten seconds. Every change must keep the rules below; `npm run check` must stay at zero errors and zero warnings.

### Source of truth

- All copy, links, and labels live in `src/content/site.ts` as typed data. Components render only from it and never
  hardcode visible text. Change copy there, verbatim, and only with the owner's approval.
- Layout and section order (single page): header → hero → About → Experience → Selected work → Skills → Education →
  Contact/footer. Nav: About · Experience · Work · Skills · Résumé ↗, followed by the theme toggle. The hero has no
  paragraph; About is the bio.

### Design tokens

Defined in `@theme` in `src/app/globals.css`; the dark values override the same variables under
`:root[data-theme="dark"]`. Tailwind's default palette is cleared, so these are the only colors:

| Token                 | Light     | Dark      | Use                                         |
| --------------------- | --------- | --------- | ------------------------------------------- |
| `--color-bg`          | `#FFFFFF` | `#0E0F11` | page background                             |
| `--color-ink`         | `#0D0D0F` | `#ECECEE` | headings, titles, bullets, links            |
| `--color-ink-2`       | `#4A4F57` | `#B4B9C1` | lede, context sentences, prose              |
| `--color-muted`       | `#5E636B` | `#8B9199` | labels, dates, meta, team names             |
| `--color-rule`        | `#E7E8EA` | `#2A2D32` | 1px rules, badge and headshot borders       |
| `--color-accent`      | `#2347E6` | `#8DA2FF` | the one accent: kicker, tags, focus, caret  |
| `--color-accent-wash` | `#E3E8FD` | `#1D2650` | text selection, status-dot ring             |
| `--color-underline`   | `#C9CCD2` | `#4D525A` | link underlines (ink on hover)              |

- Fonts: Geist 400/500/600 and Geist Mono 400/500 via `next/font/google`, mapped to `--font-sans` / `--font-mono`.
- Type: H1 `clamp(2.5rem, 5.2vw, 3.75rem)` / 1.04 / -0.035em / 600, max 15ch · lede 1.1875rem / 1.6 / ink-2,
  max 62ch · body 1–1.0625rem / 1.6, max 68ch · item titles 1.125–1.25rem · section labels mono 0.75rem
  uppercase +0.08em muted · dates, meta, and tags mono 0.8125rem.
- Layout: container 1040px, padding 40px (≥768px) / 20px. Sections are a `[200px label | 1fr]` grid with a 1px top
  rule and 56px / 40px vertical padding. Date and label columns inside sections are 132px.
- Radius 4px (headshot) and full pills (badges) only. Header has a bottom rule and is not sticky.

### Theme

- Light and dark themes share one token set. A blocking inline script in `<head>` (`src/lib/theme.ts`) sets
  `<html data-theme>` before first paint: the visitor's saved choice (`localStorage` key `theme`), else the OS
  `prefers-color-scheme`. Until the visitor picks a theme, the page follows live OS changes; a click counts as a
  choice for that page view even when storage is blocked.
- The header toggle (`src/components/theme-toggle.tsx`) is a native `<button>` named "Switch to Dark mode" or
  "Switch to Light mode"; CSS picks the label from `data-theme`, so server and client markup match. It is hidden
  when JavaScript does not run (no `data-theme`), re-applies `data-theme` after React Strict Mode's dev remount
  clears it, and switching themes adds no animation beyond the existing ≤150 ms color transitions.
- The dark tokens apply on screen only: printing always uses the light palette.

### Banned

Gradients, glass/blur, glow or drop shadows (the status dot's flat 4px ring is the only box-shadow), grain, boxed
card grids, scroll-reveal, smooth-scroll libraries, preloaders, custom cursors, icon libraries (use the ↗ and →
glyphs), emoji (the spinner glyphs `· ✢ ✳ ✶ ✻ ✽` and the theme glyph `◐` are the only exceptions), and any new
color outside the token table.

### Motion

- Only three motions exist: link/hover color transitions (≤150 ms), the hero caret, and the click spark.
  Experience disclosures open and close instantly.
- Caret: `aria-hidden`, blinks three times (~3.3 s) and then stays solid. No animation under reduced motion.
- Click spark (`src/components/click-spark.tsx`): fires only on a completed primary `click` from a real pointer.
  It skips drags (>6px from the pointerdown), active text selections, form fields, `[contenteditable]`, and
  anything inside `[data-no-spark]`. It never calls `preventDefault` or `stopPropagation`, renders into a fixed
  `pointer-events: none`, `aria-hidden` overlay, lives 900 ms, keeps at most five sparks, and cleans up all
  listeners and timers on unmount.
- `prefers-reduced-motion: reduce` stops the caret and shows the spark as a single still `✻` with its label, fading
  in place (no pop, drift, or glyph cycling). The spark and its "click anywhere" hint stay visible: Windows reports
  reduced motion whenever "Animation effects" is off, which includes many remote-desktop sessions.

### Accessibility

- Landmarks: header, nav, main, footer. Exactly one H1 per page; each section's label is its H2, referenced by
  `aria-labelledby`. Entry titles are H3s.
- "Skip to content" is the first focusable element and becomes visible on focus. `:focus-visible` shows a 2px
  accent outline with a 3px offset; never remove it.
- External links (including the résumé PDF) use `target="_blank" rel="noopener noreferrer"`, a decorative ↗ in an
  `aria-hidden` span, and a visually hidden " (opens in a new tab)". Use `ExternalLink` for every one.
- Decorative glyphs (↗, →, list dashes, status dot, caret, spark, theme `◐`, disclosure `+`/`−`) are `aria-hidden`.
  The headshot alt is "Yi Yang".
- Experience bullets sit in a native `<details>` disclosure (closed by default on screen; printed pages show every
  role's details and hide the summaries and the theme toggle). The `<summary>` reads "Show details" or "Hide
  details" plus a visually hidden "for {role}, {org}, {team}", so each one is distinguishable out of context.
- Targets are at least 24×24px (nav links have `min-h-6`). No horizontal scrolling at 320px wide or at 400% zoom;
  long tokens wrap (`overflow-wrap: anywhere` on tags). Experience dates stack above entries below 640px.
- Text contrast stays at WCAG AA or better; muted text is the lightest text color allowed.

### Content rules

- No invented metrics, titles, dates, or claims. Every number must come from the owner.
- Never name clients, products, communities, third-party businesses, or the startup's business domain — not in
  copy, code, comments, docs, metadata, alt text, or commit messages. Startup work is described only by its
  engineering (architecture, reliability, testing, tooling), never by what the business does or how it gets data.
  The owner's personal interests in About are the one exception (for example, Citi Bike).
- "Built" means Yi built it alone; "Co-built" means it was built with others. Never upgrade Co-built to Built.
- The Microsoft entry's bullets come from the owner's verified work record (PRs, work items, and release data).
  Change or add claims and numbers only with the owner's approval. Do not add placeholders.
- No public email address. LinkedIn is the contact channel. The résumé is the PDF at `/Yi_Yang_Resume.pdf`; keep
  this stable filename and replace the file in place when the résumé changes.

### Next.js and build rules

- Static export only (`output: "export"`, `trailingSlash: true`, `images.unoptimized`). Do not enable Cache
  Components or Partial Prefetching (they break export), and do not use server-only features.
- `metadataBase` is set once in the root layout. Only the home page sets a canonical URL; the 404 page must keep
  Next's automatic `noindex` and must not inherit a canonical.
- The headshot is a plain `<picture>` with AVIF/WebP/JPEG sources and explicit dimensions, not `next/image`.
- Type layout props explicitly instead of the generated `LayoutProps`/`PageProps` helpers: CI runs
  `tsc --noEmit` before `next build`, when those generated types do not exist yet.
- Do not add dependencies without a written justification in the pull request.
