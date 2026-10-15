# V45 News & TV editorial layout

- The first substantive story is a video selection. Header, date/status bar, top featured video, news cards, and latest article list follow a clear editorial hierarchy.
- Reorder the generated HTML DOM in VI/EN/ZH; keep article IDs, data rendering, YouTube playback code, source URLs and JSON unmodified.
- The video section is not autoplayed. The user chooses to play it; this preserves accessibility and bandwidth.
- Remove the old decorative motion orb from editorial masthead presentation so videos remain the focus.
- Responsive 16:9 video, reduced surrounding whitespace, and a clear boundary between video and text.
- Test full build, video positioning, mobile no overflow and actual video click behavior. Do not count the video as guaranteed playable when the publisher blocks embedding.

Independent PR for phase two of the wider UX initiative; can ship without the Phase 1 Solutions redesign if validation passes.
