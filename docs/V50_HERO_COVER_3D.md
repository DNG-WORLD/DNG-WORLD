# V50 — HeroCover3D for subpages

- The original interactive V24 homepage sculpture remains full-size and completely unchanged.
- On subpages, replace free-floating hero sculptures with the SAME V24 sculpture rendered inside a compact 16:10 cover card (max 450px desktop, 420px mobile; radius 20px/16px; subtle champagne border).
- On desktop the card sits to the right of the existing heading/CTA. On mobile the text comes first, then the card fits inside the viewport. All business pages share identical treatment.
- A gentle floating motion and mouse-only perspective tilt give the image depth without loading another WebGL renderer. This is an animated, 2.5D cover, not a second live WebGL scene. Respect reduced-motion preferences.
- News & TV remains video-first; no cover art is introduced into editorials.
- Reuse the one V24-derived source asset extracted by the existing V46 build step. Do not change source HTML, prices, content, private case studies, tool formulas or news data.
- QA: npm run build, structural coverage, viewport measurements at 390/768/1440 CSS px, menu and functional checks; only then merge.
