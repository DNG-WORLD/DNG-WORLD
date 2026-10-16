# V51 — News does not change hourly: root causes, fix and limits

## Evidence, not assumptions
On 16 Oct 2026, actual GitHub scheduled refreshes arrived at 01:14 and 05:55 UTC, despite four cron slots per hour. Thus GitHub **did not execute** the collection hourly. The two actual snapshots contain genuinely different article headlines — sources were providing updates. A healthy workflow run or a new `updated_at` alone does not prove every featured item changed.

At 05:55 UTC, the source snapshot contained 110 valid articles (89 English, 21 Vietnamese). The frontend V31 silently discarded titles whose language did not match the page when `OPENAI_API_KEY` was absent (`translation_status:not_configured`). That left VI with 21 articles and ZH with zero. This was also in the reader page, which would claim displayed untranslated foreign stories had expired.

Video groups were sorted by `isMostPopular` **before publication date**, so older videos could be the selected first video for days (verified from actual Git snapshots).

## V51 actual changes
1. Do not silently suppress valid source metadata for a missing translation. Show the **original-language title and summary**, explicitly marked EN/VI when not localized. Do not invent translations; keep source URL and source attribution intact. Detail reader supports the same fallback.
2. Show accurate last sync timestamp, mark an old snapshot stale after 110 minutes, and count articles truly published in the past 60 minutes. The last number can be zero; never call it an hourly new article guarantee.
3. Video publisher publication timestamp wins over popular chart membership for sorting. The existing video is only replaced upon polling when the viewer is not actively watching an iframe.
4. Schedule six best-effort recovery opportunities/hour (:04, :14, :24, :34, :44, :54), with existing 50-minute freshness gate limiting collection frequency, and preserve verified previous snapshot on failed sources.
5. Preserve original source text, API keys/secrets, auth, News video-first DOM, locale routes and V50 subpage cover.

## Important hosting limitation
GitHub Actions `schedule` is a **best-effort** event and may be delayed or silently skipped; 6 cron opportunities per hour improve resilience but do not guarantee one execution per hour. For strict hourly delivery, DNGWORLD needs an independent external scheduler that securely triggers `workflow_dispatch` (or a serverless backend/cron). Do not store a GitHub PAT in browser JavaScript or this public repository. The user must authorize/provision the scheduler/provider for guaranteed cadences.

No claim that publisher feeds must release new content every hour. The page will truthfully show 0 news published recently when so.
