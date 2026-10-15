# DNGWORLD — Design reset V46 / Core Art Direction

## Why the owner rejected V44 and V45
Both pilots added unrelated orbit graphics and still inherited a mixed V24–V43 visual system. This is a *system architecture problem*, not a request for more card shadows or another CSS override. PR #7 and #8 are closed and were never merged.

## Canonical 3D master
The exact approved **V24 Homepage metallic sculptural object** (silver / champagne / muted olive intertwined surfaces) is now the single visual reference. The build extracts the matching fallback WEBP asset from the V24 interactive WebGL component — no approximation, invented sphere, or unrelated CSS ring.

Home keeps original interactive WebGL. Other page heroes reuse the *same V24 sculpture image*, with a restrained 16-second vertical float. Subpages do not falsely pretend to be interactive WebGL. The V31 script that auto-inserts random CSS orbs is disabled in generated output only. News/TV masthead is an editorial exception: video footage must lead instead of an ornamental visual.

## Shared design contract
- Body: Be Vietnam Pro. Titles/UI: DM Sans. Expressive italic only: DM Serif Display.
- Palette: forest #0B1D15; panel #142E22; ivory #F3F0E8; sage #BBCCBE; champagne #DCC197.
- Maximum width 1192px; card radius 14px; one restrained keyline; no arbitrary gradient on every card, no gratuitous floating shapes.
- Desktop hero: copy left, canonical sculpture right. Mobile hero: copy then centered sculpture, no overflowing action row.

## Buyer psychology / site information architecture
**Home:** promise → buyer situation → service proof / capability → delivery process → credible evidence → ONE qualified lead action → footer. Repeated CTAs, redundant claims and visual competition near the bottom will be removed in a later independently reviewed phase.

**Solutions:** specific recognizable symptom → plausible cause/diagnostic questions → deliverables/SOW → real handover formats → limitations + validation → matching offer. Do not fabricate ROAS, case-study results, testimonials or guarantees. Make each package tangible.

**Pricing:** preserve the five product lines and real source pricing; explain included/excluded services and next steps. No fake price or forced countdown.

**News & TV:** VIDEO FIRST in DOM; source and timestamp visible; then latest articles, categories, search, and archive. Avoid additional 3D artwork competing with video.

**Tools:** use practical data, clearly explain assumptions, output, how to interpret and act on a result.

**Global footer:** navigation, one contact route, legal/privacy disclosures; never four competing sales pitches.

## Delivery sequence
1. V46: unify visual 3D master, main site hero geometry and typography; preserve core source.
2. Rebuild Solutions from decision-making / handover evidence, not generic service descriptions.
3. Video-first News as its own verified editorial hierarchy.
4. Redesign bottom of Homepage and duplicate endings.
5. Consolidate legacy CSS after proving references; run visual QA, performance, accessibility and functional regression.

## Tests and rollback
Build: npm run build. Requires original V24 WEBP signature, multiple hero families, V24 artCanvas, and disabled extra V31 orbs; browser QA at 390 / 768 / 1440 verifies no overflow, one header/footer, menu and WebGL. PR review before main merge. Revert the branch/commit to restore exact original source; all source HTML is untouched.
