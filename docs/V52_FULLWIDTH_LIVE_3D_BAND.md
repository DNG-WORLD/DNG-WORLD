# V52 — Real homepage 3D on a full-width, 1/3-screen subpage hero

Owner-rejected V50 cover cards are removed from the build pipeline. This is not a card, image-only WebP, or new generic globe.

- Extract the **exact V24 WebGL mesh and original vertex/fragment shaders plus model draw path** at build time into a dedicated lightweight-renderer document `/assets/dngworld-v52-live-scene.html`. Original homepage source is untouched.
- Reuse the same metal sculpture and animated 3D mini-satellites; an ambient line/particle field shares the original ivory, mineral green, champagne palette.
- Insert one full-bleed WebGL band `width:100%`, `height:clamp(210px,33.333svh,370px)` at the **top** of each business hero (mobile clamp 190px / 31svh / 290px). Existing page headline/description/CTA remain below and are not obscured.
- **No 3D cards, rounded photo frames, or independent CSS orbs**. Stop injecting additional engine instances. All business hero families and VI/EN/ZH pricing routes share one scene. User can pointer/touch drag the live sculpture.
- Homepage keeps its full-size interactive V24 WebGL; News & TV remains video-first, no distracting 3D band.
- Canvas background runs at ~30 fps and pauses when document/scene is invisible; reduced-motion settings pause automatic GL rotation/field motion. Still fallback image if GPU is unsupported.
- The generated scene contains the original V24 embedded mesh (~2.4MB Base64). Browser caches the single shared scene URL. Avoid adding more than one iframe per page.
- Structural QA confirms 30+ business routes, same WebGL/mesh/shaders, screen-relative 1/3 height, homepage/news exemptions; Chromium tests cover 390/768/1440 CSS px, actual `is-3d` scene initialization, drag, headline non-overlap and zero overflow.
- Rollback: revert V52 commit, restore V50 package build steps from Git history.
