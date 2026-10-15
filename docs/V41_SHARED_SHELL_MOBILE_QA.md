# DNGWORLD V41 — shared header/footer + actual mobile geometry correction

**Intent:** repair the inconsistent UI shown in the four supplied Android screenshots. Older V24/V25/V31/V33/V37/V39 designs each rendered a different header/footer. CSS overrides in V40 were not enough.

## Technical change
- In the **generated Pages artifact only**, replace the *visible* navigation and footer with one shared VI/EN/ZH template; retain old header and footer in the DOM but hidden with `data-dng-original-shell` so existing event bindings never fail.
- No source page content, JS business logic, pricing, scripts, 3D models, shaders, copy, links or newsroom data were removed.
- One 74px dark-emerald header with approved DNG mark and text, uniform menu and a single mobile hamburger menu.
- One complete four-column desktop/two-column mobile footer with consistent contact/navigation and typography.
- Be Vietnam Pro body, DM Sans titles, DM Serif Display highlights. Emerald/champagne design tokens.
- Phone-size WebGL hero: reduce excessive top whitespace, center the canvas in a 290–375px art panel, correct touch-safe width; shrink pricing orbit scene, remove overflowing mobile header actions.

## Quality checks
`npm run build` runs the V38/V39/V40 checks and V41 shared shell checks. Verify manually at 360, 390, 412, 768, 1024 and 1440 CSS px; screenshot Home, Tools, Pricing, News & TV, and Portfolio. Test working phone menu, locale changes, WebGL rotation, News categories, pricing calculator, case-study private access.

## Rollback
Revert the V41 commit or remove `scripts/install-site-shell.mjs` and `scripts/check-shell-v41.mjs` from npm build, then rebuild. Existing source HTML and hooks are intact.
