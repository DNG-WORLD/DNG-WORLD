# DNGWORLD — V39 real repository cleanup + independent private Portfolio

## Why V39 was needed
The previous V38 release only removed the generated `_site/` and moved outdated reports to `docs/archive/`; it left legacy backend/code, release QA exports, duplicate HTML, Docker assets and unneeded CMS source.

## Source cleanup
- Deleted 303 tracked files from `main`, comprising approximately 10.37 MB of obsolete infrastructure, historical reports, superseded generated locale pricing/news snapshots, old Python bytecode, and duplicate original media uploads.
- Kept the live WebGL homepage, actual pricing generators, portfolio case-study direct URLs, encrypted private Portfolio data, original image/media galleries, current News & TV updater, production workflows, tools and content.
- Updated `README.md`, build command and validation so they describe the actual static deployment.
- The pre-cleanup state is preserved in backup branch `backup/dngworld-pre-v39-cleanup-20261015` at commit `9083c9c3422ae80c97d29578e836c16e022b23b2`.

## Portfolio
- `/portfolio/`, `/en/portfolio/`, and `/zh/portfolio/` are independent pages, not redirected to the homepage.
- No Portfolio link is added to the public homepage, navbar, footer or public sitemap.
- The pages are `noindex,nofollow` and unlock the pre-existing `content/portfolio-v72.enc.json` with `assets/js/portfolio-v90.js`.
- Original five direct-link customer case-study pages and images are untouched.

## Build order
`build-static.mjs` → `repair-v31-assets.mjs` → `dngworld-v33.mjs` (which imports V37) → `restore-private-portfolio.mjs` → `polish-ui.mjs` → `check-ui.mjs`.

## Verification/rollback
`npm run build` and `npm run check:ui`. To revert: restore backup branch or revert the V39 merge. Portfolio has no public indexation or public navigation, but remember legacy direct links are not access-controlled.
