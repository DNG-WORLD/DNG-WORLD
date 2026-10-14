# Deployment: GitHub Pages

1. Back up the existing GitHub repository or use a separate branch.
2. Copy all contents of `DNGWORLD_FULL_SOURCE/` to the repository root (not the containing folder).
3. Confirm a GitHub Pages action builds with `npm run build` and publishes `_site/`. Existing `deploy-pages.yml` may need to be placed at `.github/workflows/deploy-pages.yml` if not already.
4. The legacy hotfix workflow is disabled and archived as `.disabled.txt` so it cannot change the approved V24 design.
5. Build with Node 20+: `npm run build`. The public artifact excludes legacy backend/private application directories.
6. Configure the real domain after assignment, then create canonical/hreflang/sitemap with that confirmed domain. Do not assume `dngworld.github.io` exists.
7. Verify `/, /services/, /tools/, /insights/, /about/, /contact/, /en/, /zh/`, and all relevant tool routes.
8. Check 3D on a GPU-enabled browser, mobile menu, pause/reduced-motion, chapter selection, capabilities accordion, copy-brief, and the contact email-draft behaviour.
9. Note that forms do NOT submit to a server. Configure/verify a real endpoint before claiming live intake.
