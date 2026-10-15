# DNGWORLD V40 — Visual consistency + hourly News/TV reliability

## Visual scope
V40 adds one post-build design stylesheet shared by all published HTML page families (V24 / V25 / V31 / V33 / V37 / V39). It tags **generated HTML** site headers/footers for consistent palette, typography, spacing, controls and responsive treatments. It does not edit original HTML, copy, translations, WebGL shaders, pricing tiers, calculator logic, News/TV records, or private portfolio contents.

The original site head/footer children and semantic links remain intact. Private case studies remain direct-link only / noindex. Existing WebGL camera and canvas CSS are not overwritten.

## News reliability
The workflow now has recovery opportunities twice hourly (a due-check prevents unnecessary API requests). GitHub scheduled jobs are best-effort, not guaranteed exact-to-the-minute. The newsroom displays the actual data timestamp and marks snapshots older than 90 minutes as stale. When the user leaves News/TV open, it checks for new published snapshots approximately every four minutes while visible. Push deploy and News deploy share the same concurrency group, and both fetch latest main before publishing, to avoid overwriting newly collected data.

To verify: inspect the News workflow run history and actual `data/newsroom.json.updated_at`; do not treat a green workflow alone as proof that sources or API keys succeeded. `YOUTUBE_API_KEY` is required to obtain fresh videos; article RSS collection does not require that key.

## QA
`npm run build` checks all generated HTML pages, private Portfolio, V24 home canvas, 5×3 service pages, client refresh, design layer. CI validates before merge.

## Rollback
Revert the V40 merge commit. Production source HTML remains unchanged.
