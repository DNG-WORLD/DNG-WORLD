# DNGWORLD REDESIGN PROGRAM — V44 (2026-10)

## A. Audit & business objectives
Screenshots and repository confirmed incoherent WebGL/orbital/decorative shapes, layered V24–V43 CSS, weak solution-value articulation, bottom-heavy Homepage, and News video appearing after stories. A polished header/footer alone does not fix these problems.

The objective is **qualified conversations**, not a static beauty page. Every service must answer: whom it serves, which problem it addresses, what is investigated, what is done, what is delivered, what is excluded and how to evaluate the work. Do not invent case results, ratings, claims or guarantees.

## B. Design system (decisions before execution)
- **Type:** Be Vietnam Pro for Vietnamese/Chinese body with locale fallbacks; DM Sans for headings and UI; DM Serif Display for one expressive word/line, never long copy.
- **Colors:** deep forest #0B2018, dark green #102A20, mineral green #18352A, ivory #F3F0E7, muted sage #C1CFC2, restrained champagne #E5BF88. Gold is reserved for actions, key labels and clear focal points.
- **Layout:** 1180px editorial grid, max two hero columns, 64px desktop gutters / 18px mobile gutters, one clear primary CTA per conversion section, 16–20px card radii, 1px borders only when necessary.
- **3D identity:** one DNG orbital universe; reflective green/champagne mineral core, three elliptic orbits (shared ratios), constant orbit angles and slow 22–30s animation. *No unrelated robots, planets, random spheres, emoji or fake stock objects.* Keep V24 WebGL flagship object as legacy until matched treatment passes browser QA; avoid deleting mesh code. Reduce motion when requested. Each later page uses a single shared art component or a quiet form of the same motif, never independent 3D implementations.
- **Page cadence:** Hero with decisive value proposition → tangible problem/benefit → explained offer/deliverables → evidence/risk → one CTA → same shared footer. Minimize repeated closing CTA.
- **Mobile:** responsive first; no horizontal scrolling, readable at 360px; visual art must fit rather than push action below multiple screens.

## C. Conversion journey
1. Visitor recognizes symptoms and the cost of inaction.
2. Visitor understands likely causes; no premature guaranteed diagnoses.
3. Visitor sees implementation scope and tangible deliverables.
4. Visitor reaches a service-level price/scope page that sets boundaries.
5. Visitor submits brief or starts an intentional contact.

## D. Phased rollout (no full website replacement in one release)
- **Phase 1, V44 — Solutions pilot**: end-to-end problem-led landing page in VI/EN/ZH, with the pilot orbital visual system, specific deliverables and pricing routes. Original source HTML unchanged; generated HTML rewritten in build. No homepage or pricing logic change. Screenshot/UX QA before merge.
- **Phase 2, V45 — News & TV**: show featured playable video before the article feed with a calmer editorial masthead, then categories/individual headlines; validate all languages, live data health, lazy loading and attribution. Implemented as independent PR #8, not merged pending visual approval.
- **Phase 3 — Global hero system**: bring Home and other page heroes into the same art direction, sizes, lighting, camera/framing and motion; audit real V24 WebGL source, fallback and performance. Consolidate/retire redundant overrides where safe. No simultaneous source replacement.
- **Phase 4 — Homepage lower modules & site endings**: map all current sections, remove duplicate narratives, improve rhythm and one primary CTA, retain functional sections and legitimate content; user journey test.
- **Phase 5 — QA, accessibility & performance**: measure mobile/browser screenshots, 3D FPS/LCP/CLS, color contrast, keyboard navigation and conversion events; update only proven unnecessary assets.

## E. Acceptance criteria — Phase 1
- All 3 locales available at /services, /en/services, /zh/services.
- Five concrete problem/solution/deliverable cards, valid links to the existing five pricing routes, links to Growth Check & Contact.
- No fabricated outcome metrics, testimonials, client names or case study claims.
- Shared site header/footer remain exactly once visible; privacy routes unchanged.
- HTML content in source / WebGL mesh / newsroom JSON unmodified.
- Build succeeds and Chromium confirms no overflows at mobile/tablet/desktop, visible CTA, aligned orbital art and font legibility.
- Do not merge to main until visual review.

## F. Other known repository debt
V38/V40/V41 inject cumulative CSS overrides. Consolidate *after* a validated baseline, not with blind asset deletion. An HTML-only smoke test is not enough to certify design quality.

## G. Technical root cause discovered in Phase 1 QA
The pre-existing `assets/dngworld-v31-motion.js` indiscriminately injects a second decorative 3D orb into an arbitrary first-page hero. This caused two competing orbital scenes on the VI/EN/ZH Solutions prototype. The V44 generated-build adapter now guards against the duplicate only on pages with `.s44-object`; globally, this legacy motion policy must be replaced when the shared 3D system is rolled out. Do not add a third CSS-only orb to solve this issue.
