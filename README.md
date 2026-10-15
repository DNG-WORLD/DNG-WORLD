# DNGWORLD — Business Growth Intelligence

Source for the DNGWORLD GitHub Pages website. This repository contains the current static site, 3D homepage, five-service pricing catalog, News & TV, marketing tools, and invitation-only Portfolio.

## Development
- `npm run build` — regenerate `_site/`, apply legacy News & TV compatibility, current pricing pages, the three private Portfolio pages and the shared V38 UI layer.
- `npm run check:ui` — validate the generated artifact (run build first).
- `npm run dev` — local Express preview server.
- `npm run qa` — build and smoke check.

## Source map
- `index.html`: the approved embedded V24 WebGL homepage. Preserve the original 3D engine.
- `portfolio/index.html`, `en/portfolio/index.html`, `zh/portfolio/index.html`: standalone private-access Portfolio entrances, **not listed on the public homepage/menu**. The five case studies remain direct-link/noindex, exactly as before.
- `pricing/` + `scripts/dngworld-v37-pricing.mjs`: the five-service price catalog generated at build time, in three languages.
- `content/`: editorial content and encrypted private portfolio payload.
- `data/` + `scripts/update_news.py`: hourly News & TV data snapshots and update tool.
- `assets/` + `public/`: compatible site assets, including direct-link pages and their images.
- `scripts/`: deployment transforms, news fixes and CI validators.
- `.github/workflows/`: current Pages deploy, hourly newsroom, CI QA checks.
- `docs/`: current operational and privacy documentation.

The Pages artifact `_site/` is generated and ignored. There is no active Laravel/PHP or Netlify backend in this deployment. Obsolete source was removed from `main` in V39; see `docs/V39_REPO_CLEANUP.md` and the permanent backup branch `backup/dngworld-pre-v39-cleanup-20261015`.

**Privacy note:** `noindex` and an unlisted URL are not authentication. The Portfolio index decrypts only the separately encrypted payload after code entry; individual legacy direct-link case pages remain accessible to anyone who knows their URL. Do not place secrets in this public repository.
