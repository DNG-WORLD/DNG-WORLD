# DNGWORLD — AUDIT / V24 Migration

## Source provenance
- Original ZIP: dngworks.github.io(1).zip — 1,393 entries; ~63.7 MiB uncompressed; includes both working source and prebuilt `_site/` duplicate.
- V24 ZIP: DNGWORKS_V24_Living_Depth_Source(1).zip — 3 entries, homepage approximately 2.5 MiB uncompressed (embedded WebGL meshes/images).

## Non-negotiable homepage elements — preserved
1. V24 full-screen asymmetrical editorial hero and fixed positions of header, CTA, headline and art stage.
2. Existing WebGL sculpture engine, geometry data, shader materials and mini 3D satellites.
3. V24 flight-path photons, quantum fields, moving background, glow, mouse/touch interaction, camera-motion and tilt controls.
4. V24 atmospheric emerald/champagne color hierarchy and material direction.
5. Original section look for Manifesto, Expertise, Process and Contact; added one Evidence chapter with matching grid treatments.

## What changed
- Branding in textual source/content: DNGWORKS → DNGWORLD; homepage SEO/title re-authored.
- Hero copy: `GROWTH NEEDS clarity.`; short, layout-compatible Business Growth Intelligence description.
- Page narrative: business pain → growth clarity → six disciplines → measurable process → verifiable public assets → conversation.
- Expertise: Strategy, Marketing, Media, Data, AI, Automation — six separate rows, no false client outcomes.
- Contact: no pretend submission; homepage copies brief and `/contact/` launches an email draft.
- Legacy site palette: shared `assets/css/dngworld-v24-bridge.css`, non-destructive styling for old pages.
- Automatic legacy hotfix workflow disabled to avoid overwriting V24 changes.
- Static build excludes Laravel/backend code from public GitHub Pages artifact.

## Risks / remaining verifications
- New canonical domain unspecified. No unverified `dngworld.github.io` or `dngworld.vn` URLs invented; configure domain and regenerate sitemap after deployment.
- The old repository spans several design generations, especially EN/ZH routes and historical pages. The public-facing brand was replaced, but full editorial localisation of all archived pages requires a subsequent content review.
- Embedded WebGL may be unavailable in restricted headless environments; V24 includes a visual fallback. Confirm on real Chrome/Edge GPU, Android and iOS.
- No confirmed backend/CRM endpoint; contact must not assert successful delivery.
- Under `public/` and historic Laravel/source files, old technical naming and asset filenames are retained for compatibility; these are not public-facing brand copy.
- Original repository includes prebuilt `_site/` snapshot, which is regenerated on `npm run build` rather than shipped stale.
