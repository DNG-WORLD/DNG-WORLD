# DNGWORLD — Business Growth Intelligence

**Integrated source package: V24 approved visual baseline + legacy DNGWORKS repository.**

- `index.html`: homepage using V24 WebGL/sculpture, orbit lights, particles, satellites and motion interactions. Original graphical engine retained.
- `assets/`, `public/`, `services/`, `tools/`, `insights/`, `about/`, `contact/`, `en/`, `zh/`: assets and public content from previous repository, rebranded and given V24-inspired shared tokens.
- `app/`, `resources/`, `database/`, `routes/`, `config/`: preserved legacy application source for audit; NOT deployed to static GitHub Pages.
- `docs/DNGWORLD_AUDIT.md`, `docs/DNGWORLD_CONTENT_MAP.md`, `docs/DNGWORLD_DEPLOY.md`: inspection, editorial and deployment documentation.
- `scripts/build-static.mjs`: creates public `_site/` artifact.

**Deploy**: `npm run build`, then publish `_site/` using GitHub Pages workflow. The existing domain is NOT assumed to be the new brand's official domain. Configure a real domain before adding SEO canonical URLs.

**Contact**: The home page copies a project brief. The contact page opens a mail draft; no automated sending or CRM endpoint is claimed.

## V38 · Design system & source maintenance

The original V24 WebGL scene, text, all five service pricing groups and news automation are preserved. The post-build UI layer and smoke tests are applied by `npm run build` / `npm run check:ui`. `_site/` is now generated, not committed. See [V38 audit](docs/V38_UI_CLEANUP.md).
