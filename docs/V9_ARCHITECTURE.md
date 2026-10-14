# DNGWORLD — V9 TECHNICAL ARCHITECTURE (3D & NEWS ENGINE)

**Căn cứ đặc tả:** `DNGWORLD_V9_3D_NEWSROOM_IMPLEMENTATION_SPEC.md` (§3, §6, §7)  
**Mục tiêu:** Kiến trúc chi tiết của Hệ thống 3D Growth Architecture và News Ingestion/Reader Pipeline.

---

## 1. KIẾN TRÚC 3D GROWTH ARCHITECTURE SCENE

```
+------------------------------------------------------------------------+
| 3D Growth Architecture Engine (Vanilla Three.js Local Module)          |
+------------------------------------------------------------------------+
   |
   +--> 1. Viewport & Canvas Management
   |      - Container: #hero3dStage (Width: 100%, Height: 100%)
   |      - Desktop layout: 40% Text Box (Left) | 60% 3D Interactive (Right)
   |      - Mobile layout: Stacked responsive crop, touch-aware
   |      - Pixel Ratio Clamping: Math.min(window.devicePixelRatio, 1.75)
   |
   +--> 2. Brand Visual Elements & Materials
   |      - Core Subject: Growth Architecture Modules (Tetrahedral & Polyhedral Prisms)
   |      - Satin Metal: MeshStandardMaterial (metalness: 0.65, roughness: 0.28, color: #285BE8)
   |      - Mint Node Facets: MeshPhysicalMaterial (transmission: 0.6, roughness: 0.2, color: #12BCA4)
   |      - Coral Strategic Accent: MeshStandardMaterial (color: #F18B53, emissive: #702604, roughness: 0.35)
   |      - Studio Lighting: Key Light (Soft White), Rim Light (#285BE8), Ambient (#FFFFFF)
   |
   +--> 3. Interactive Motion & Scroll Storyboard
   |      - Idle Motion: Smooth floating oscillations with momentum physics
   |      - Mouse/Touch Gyro: Subtle parallax orientation (-15deg to +15deg)
   |      - Scroll Stages:
   |          Stage 00 (Arrival): Floating interconnected modules (Top of page)
   |          Stage 01 (Diagnose): Module separation & focal shift (Scroll to Problems)
   |          Stage 02 (Connect): System alignment & connection lines (Scroll to Services)
   |          Stage 03 (Execute): Unified directional architecture leading to Content
   |
   +--> 4. Progressive Enhancement & Safety Boundary
          - Poster Fallback: High-quality editorial graphic rendered immediately
          - WebGL Fallback: If WebGL context is lost or unsupported, poster remains active
          - Viewport Observer: Pause requestAnimationFrame when canvas is off-screen
          - Accessibility: Respects `prefers-reduced-motion` by locking into static studio frame
```

---

## 2. KIẾN TRÚC NEWSROOM & SEAMLESS READER

```
+------------------------------------------------------------------------+
| DNG Intelligence News Pipeline                                         |
+------------------------------------------------------------------------+
   |
   +--> [Content Store: Local JSON Repositories]
   |      - data/news.json (41 verified categorized stories)
   |      - content/insights-v20.json (6 deep-dive strategic frameworks)
   |      - content/posts/ (3 foundational analytical publications)
   |
   +--> [API Delivery Layer: server.mjs /api/news]
   |      - Normalized JSON schema with clean ISO dates and categories
   |      - Strict separation of DNG Owned articles vs. External Curated Newswire
   |      - Safe fallback caching in memory (zero empty array risk)
   |
   +--> [Frontend Newsroom: insights/index.html]
          - Lead Story (16:10 format with high-res editorial photography)
          - Sidebar: 3 Selected Perspectives
          - DNG Analytical Publications Grid (All 9 pieces available)
          - Curated Newswire Feed (Real timestamps, sources, bookmarks)
          - Instant Client-side Search & Taxonomy Filter (No latency)
          - Seamless Reader Engine with "Next Article" continuation flow
```

---

## 3. NGƯỠNG HIỆU NĂNG & ACCESSIBILITY (BUDGETS & TARGETS)

- **Total 3D JS bundle:** Three.js local module (~660 KB uncompressed, ~160 KB gzip/brotli), không thư viện bên thứ ba dư thừa.
- **Render loop optimization:** Tự động ngắt `requestAnimationFrame` khi canvas cuộn khỏi màn hình (IntersectionObserver).
- **Typography:** Be Vietnam Pro nạp qua CDN Google Fonts với preload và font-display: swap.
- **Tương phản:** Tuân thủ WCAG AA trên toàn bộ hệ màu sáng (Nền `#FFFFFF` / `#F2F7FF`, chữ `#112743` / `#314660`).
