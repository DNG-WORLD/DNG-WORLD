# V49 Homepage — from scattered bottom modules to a business buying journey

## Audit finding
The original V24 homepage ends in a purely decorative "THE DNGWORLD DISCIPLINES" tape before the footer. This does not explain who the service is for, what can be purchased or what work is delivered. Additionally, the old EN and ZH root homepages actually served *News* HTML and canonical metadata. Those were not legitimate localized homepages.

## Implementation — generated Pages ONLY
1. **VI root /:** preserve original 2.5 MB V24 interactive WebGL scene, hero interactions and headline; remove decorative discipline tape; insert real buying-path modules.
2. **EN / and ZH /:** correct the broken information architecture. Replace News root content with localized business home hero, reuse the exact V46 canonical art, correct meta description/title/canonical, remove page-specific News script; actual News remains available on /en/insights and /zh/insights.
3. Intent sequence: the business problem → five clearly scoped categories → diagnostic/scope/delivery process → single qualified contact action → shared footer.
4. Light editorial section contrasts with dark services and clean off-white how-we-work section; restrained type, keylines and credible deliverable descriptions.
5. Never fabricate outcomes, customer names, testimonials, ROAS or success rates; prices live only on approved Pricing pages. Portfolio stays private/direct-link and is intentionally not surfaced from public home.
6. Tested mobile/tablet/desktop and VI WebGL, localized navigational routes, images and contact paths.

## Rollback
Revert V49 commit; source /index.html and EN/ZH source remain untouched.
