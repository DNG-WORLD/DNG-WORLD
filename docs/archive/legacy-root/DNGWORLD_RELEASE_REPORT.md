# DNGWORLD — V24 SOURCE INTEGRATION / RELEASE REVIEW

**Built on 2026-10-14. Not yet deployed.**

## Audited inputs
- Legacy source ZIP: 1,393 entries, about 63.7 MiB uncompressed, including duplicate `_site` build and historical application files.
- Approved V24 ZIP: embedded homepage WebGL scene, mini satellite meshes, layered photons, camera/tilt and interactive choreography.

## Deliverables
- Full GitHub source (code, images, old tools, multilingual pages, application source and documentation).
- `_site` production static artifact generated with `npm run build`.
- Source `index.html` uses V24 visuals and interaction algorithms; branding + content are updated.
- New DNGWORLD social-sharing graphics.
- Brand-consistent shared legacy stylesheet and six-capability introduction on `/services/`.

## Source QA evidence
- WebGL mesh payload: **identical SHA-256**, `76a0b5778a3fb004e129ed8aa61996a0680eac0279e3e81d15f33e43785ebf55`.
- WebGL/ambient/camera/tilt DOM IDs: **10/10 present**.
- Homepage executable inline JS syntax: **PASS**.
- JSON parsing in preserved source: **PASS**.
- Checked internal HTML links for 8 primary pages: **PASS**.
- `npm run build`: **PASS**.
- Deployment artifact excludes Laravel app files and `admin.js` root, while preserving required `content/` and `data/` JSON for legacy frontend.
- Static source files: **757**, total approx **64.9 MiB** including generated public artifact.
- Public `_site` files: **223**, total approx **30.7 MiB**.

## Not verified in restricted environment
- Chromium localhost/file navigation denied by `ERR_BLOCKED_BY_ADMINISTRATOR`. GPU screenshot, WebGL performance, camera permission, actual mobile touch, full visual regression are therefore **not certified**.
- No live-domain DNS, SSL, production content intake or CRM workflow has been validated.

## Risk register / outstanding
1. A new production domain has not been supplied. No fictitious canonical URL or sitemap was introduced. Configure after domain confirmation.
2. Legacy multilingual content includes older editorial material. Brand names have been rewritten; a complete human language QA is still recommended for all historic pages.
3. Some old external assets, image captions and legacy application components are maintained for repository completeness. Avoid publishing backend directories.
4. No verified client-result dataset was supplied. Evidence cards link to existing public tools, research and service scope, not fictional client KPIs.
5. Contact: homepage copies a brief; contact page opens an email draft. Email/CRM server submission must be configured and tested separately.

## Content flow
Business problems → value/diagnosis → six capabilities → phased process → accessible evidence → contact.

## Identity
Brand: **DNGWORLD**. Descriptor: **Business Growth Intelligence**.
