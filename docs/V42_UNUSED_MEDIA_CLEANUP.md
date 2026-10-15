# V42 — Evidence-based removal of unused media assets

## Why
Source-media duplication and retired hero iterations made the repository feel cluttered. This change is **not** a redesign or removal of current source material: assets in this list were not referenced by exact path or basename in the generated HTML, CSS, JS, MJS or JSON.

## Verification
- Read-only CI audit: `scripts/audit-assets-v42.mjs`; workflow `.github/workflows/audit-assets-v42.yml`.
- Before cleanup: 49 media objects; 12 unreferenced; **13.87 MiB** removed from the deployed repo tree.
- WebGL source, embedded mesh data, actually referenced image fallbacks, News & TV and client portfolio images are untouched.
- The **entire original source tree** remains in backup branch `backup/dngworld-before-v42-media-prune-20261015` (commit `f9a2ef870d3aea4813c3fde505c276ea527bda98`), so designs can be restored without data loss.

## Removed files
- `assets/images/hero/ai-marketing-globe-reference.png`
- `assets/images/hero/ai-marketing-earth-source.png`
- `assets/images/hero/ai-marketing-earth.png`
- `assets/images/hero/digital-global-globe.png`
- `assets/images/hero/earth-approved-style-360.jpg`
- `assets/images/hero/dng_hero_cinematic.jpg`
- `assets/images/hero/ai-marketing-earth.webp`
- `assets/images/hero/digital-global-globe-960.webp`
- `assets/images/hero/ai-marketing-earth-960.webp`
- `assets/images/hero/digital-global-globe-640.webp`
- `assets/images/social/og-home-2026.png`
- `assets/images/hero/ai-marketing-earth-640.webp`

## Caveat
A static basename/path scan is a conservative operational test, not a guarantee that a human won't want an image later. These are backed up in the named branch and Git history. Never delete media referenced by a current template or code.
