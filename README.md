# yiyang02.github.io

Source for [yiyang02.github.io](https://yiyang02.github.io), the personal site of Yi Yang: a single-page portfolio
plus a 404 page, exported as static HTML and served by GitHub Pages.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) with `output: "export"` — no server at runtime
- React 19 and TypeScript 5
- Tailwind CSS 4, CSS-first: design tokens live in `@theme` in `src/app/globals.css` (there is no `tailwind.config`)
- `next/font/google` for Geist and Geist Mono (downloaded at build time and self-hosted)
- ESLint 9 with `eslint-config-next`

## Local development

Requires Node.js 22 (the version CI uses).

```bash
npm ci          # install exact dependencies from package-lock.json
npm run dev     # dev server at http://localhost:3000
npm run check   # lint → typecheck → production build into out/
```

`npm run check` must finish with zero errors and zero warnings. To preview the exported site exactly as Pages
serves it:

```bash
python3 -m http.server 4173 -d out   # then open http://localhost:4173
```

## Where things live

| Path                     | Purpose                                                              |
| ------------------------ | -------------------------------------------------------------------- |
| `src/content/site.ts`    | All copy and links, as typed data. Components render only from here. |
| `src/app/`               | Root layout (fonts, metadata), home page, 404 page, global CSS, icons |
| `src/components/`        | Section and UI components (kebab-case files)                         |
| `public/`                | Résumé PDF, headshots, `robots.txt`, `sitemap.xml`, `.nojekyll`      |
| `AGENTS.md`              | Design and content contract for anyone (human or agent) editing      |

To change wording, edit `src/content/site.ts` only, then run `npm run check`. The rules for copy, design tokens,
motion, and accessibility are in [`AGENTS.md`](AGENTS.md).

## Deploy

`.github/workflows/deploy.yml` runs on every push to `master` (and on manual dispatch): `npm ci`, lint, typecheck,
build, then publishes `out/` to GitHub Pages. Pages must be set to **Source: GitHub Actions**.

Each build stamps the commit into the page head as `<meta name="revision" content="…">` (`local` for local builds),
so you can confirm which commit is live:

```bash
curl -s https://yiyang02.github.io/ | grep -o 'name="revision" content="[^"]*"'
```

## Rollback

Every push to `master` redeploys the site, so rolling back is an ordinary Git change:

- **Undo a bad change:** `git revert <sha>`, then `git push origin master`. The workflow redeploys the reverted site.
- **Republish a known-good build right away:** in the **Actions** tab, open the last good "Deploy to GitHub Pages"
  run and choose **Re-run all jobs** (`gh run rerun <run-id>`). It rebuilds and republishes that run's commit.

Either way, check the `revision` meta tag (see [Deploy](#deploy)) to confirm which commit is live.

## Agent skills (optional, local-only)

`scripts/bootstrap-skills.sh` installs pinned, verified design-review skills into `.github/skills/` and a
Playwright virtualenv into `.venv/` for screenshot reviews. Both paths are gitignored and never committed. The
script refuses to run on `master` or `gh-pages`, and expects a clean local checkout of the pinned skills repository
(override its location with `AC_SRC`).

## License

The code is released under the [MIT License](LICENSE). The text, images, and résumé are © Yi Yang, all rights
reserved, and are not covered by the MIT License.
