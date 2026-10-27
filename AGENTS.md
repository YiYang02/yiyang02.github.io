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
  Contact/footer. Nav: About · Experience · Work · Skills · Résumé ↗. The hero has no paragraph; About is the bio.

### Design tokens

Defined in `@theme` in `src/app/globals.css`. Tailwind's default palette is cleared, so these are the only colors:

| Token                 | Value     | Use                                         |
| --------------------- | --------- | ------------------------------------------- |
| `--color-bg`          | `#FFFFFF` | page background (light only)                |
| `--color-ink`         | `#0D0D0F` | headings, titles, bullets, links            |
| `--color-ink-2`       | `#4A4F57` | lede, context sentences, prose              |
| `--color-muted`       | `#5E636B` | labels, dates, meta, team names             |
| `--color-rule`        | `#E7E8EA` | 1px rules, badge and headshot borders       |
| `--color-accent`      | `#2347E6` | the one accent: kicker, tags, focus, caret  |
| `--color-accent-wash` | `#E3E8FD` | text selection, status-dot ring             |
| `--color-underline`   | `#C9CCD2` | link underlines (ink on hover)              |

- Fonts: Geist 400/500/600 and Geist Mono 400/500 via `next/font/google`, mapped to `--font-sans` / `--font-mono`.
- Type: H1 `clamp(2.5rem, 5.2vw, 3.75rem)` / 1.04 / -0.035em / 600, max 15ch · lede 1.1875rem / 1.6 / ink-2,
  max 62ch · body 1–1.0625rem / 1.6, max 68ch · item titles 1.125–1.25rem · section labels mono 0.75rem
  uppercase +0.08em muted · dates, meta, and tags mono 0.8125rem.
- Layout: container 1040px, padding 40px (≥768px) / 20px. Sections are a `[200px label | 1fr]` grid with a 1px top
  rule and 56px / 40px vertical padding. Date and label columns inside sections are 132px.
- Radius 4px (headshot) and full pills (badges) only. Header has a bottom rule and is not sticky.

### Banned

Gradients, glass/blur, glow or drop shadows (the status dot's flat 4px ring is the only box-shadow), grain, boxed
card grids, scroll-reveal, smooth-scroll libraries, preloaders, custom cursors, icon libraries (use the ↗ and →
glyphs), emoji (the spinner glyphs `· ✢ ✳ ✶ ✻ ✽` are the only exception), dark mode, and any new color outside the
token table.

### Motion

- Only three motions exist: link/hover color transitions (≤150 ms), the hero caret, and the click spark.
- Caret: `aria-hidden`, blinks three times (~3.3 s) and then stays solid. No animation under reduced motion.
- Click spark (`src/components/click-spark.tsx`): fires only on a completed primary `click` from a real pointer.
  It skips drags (>6px from the pointerdown), active text selections, form fields, `[contenteditable]`, and
  anything inside `[data-no-spark]`. It never calls `preventDefault` or `stopPropagation`, renders into a fixed
  `pointer-events: none`, `aria-hidden` overlay, lives 900 ms, keeps at most five sparks, and cleans up all
  listeners and timers on unmount.
- `prefers-reduced-motion: reduce` disables the spark (live: turning it on clears active sparks), hides the
  "click anywhere" hint, and stops the caret.

### Accessibility

- Landmarks: header, nav, main, footer. Exactly one H1 per page; each section's label is its H2, referenced by
  `aria-labelledby`. Entry titles are H3s.
- "Skip to content" is the first focusable element and becomes visible on focus. `:focus-visible` shows a 2px
  accent outline with a 3px offset; never remove it.
- External links (including the résumé PDF) use `target="_blank" rel="noopener noreferrer"`, a decorative ↗ in an
  `aria-hidden` span, and a visually hidden " (opens in a new tab)". Use `ExternalLink` for every one.
- Decorative glyphs (↗, →, list dashes, status dot, caret, spark) are `aria-hidden`. The headshot alt is "Yi Yang".
- Targets are at least 24×24px (nav links have `min-h-6`). No horizontal scrolling at 320px wide or at 400% zoom;
  long tokens wrap (`overflow-wrap: anywhere` on tags). Experience dates stack above entries below 640px.
- Text contrast stays at WCAG AA or better; muted text is the lightest text color allowed.

### Content rules

- No invented metrics, titles, dates, or claims. Every number must come from the owner.
- Never name clients, products, communities, third-party businesses, or the startup's business domain — not in
  copy, code, comments, docs, metadata, alt text, or commit messages. Startup work is described only by its
  engineering (architecture, reliability, testing, tooling), never by what the business does or how it gets data.
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
