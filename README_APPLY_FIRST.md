# DNGWORLD — APPLY FIRST

This package replaces the previous DNGWORKS-brand homepage and content with DNGWORLD, based on the V24 Living Depth design system.

Read `README.md`, `docs/DNGWORLD_AUDIT.md`, `docs/DNGWORLD_CONTENT_MAP.md`, and `docs/DNGWORLD_DEPLOY.md`.

## Apply
- Extract ZIP into a clean checkout on a new branch.
- Keep existing GitHub repository URL unless you have configured a new domain. Do not assume an unregistered domain exists.
- Run `npm run build`; deploy only the generated `_site/` directory.
- Keep legacy source (`app/`, `resources/`, etc.) for audits, NOT public static artifact.
- Delete old `.github/workflows/apply-site-hotfix.yml` from the repository if it remains after replacement.
- Manually verify WebGL/GPU, 3D drag, hotspots, menu, mobile, and contact email fallback before going live.

The static-only contact solution does not submit to CRM; it opens email.
