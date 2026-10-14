# DNGWORLD — V9 AUDIT & CAPABILITY BASELINE

**Thời điểm thực hiện:** 2026-10-09  
**Môi trường:** Google AI Studio Node.js 22 Runtime (Port 3000)  
**Tiêu chuẩn đối chiếu:** `DNGWORLD_V9_3D_NEWSROOM_IMPLEMENTATION_SPEC.md`

---

## 1. HIỆN TRẠNG MÃ NGUỒN VÀ TRIỂN KHAI

### 1.1 Khảo sát kiến trúc hiện tại
- **Môi trường máy chủ:** Node.js 22 ES Modules (`server.mjs`) sử dụng Express 5.2.1, chạy trên Port 3000 (`HOST=0.0.0.0`).
- **Cơ chế định tuyến:**
  - Route `/`: phục vụ `index.html`.
  - Route `/insights` & `/insights/`: phục vụ `insights/index.html` (đồng bộ với `insights.html`).
  - Route `/services`, `/tools`, `/about`, `/contact`: phục vụ các thư mục tĩnh tương ứng.
  - Route `/portfolio`: Chuyển hướng HTTP 302 về `/` (tuân thủ nguyên tắc ẩn portfolio khỏi điều hướng công khai).
  - Route `/portfolio/[slug]/`: Bảo toàn truy cập trực tiếp bằng direct link (`noindex, nofollow`).
  - Endpoint `/api/news`: Cung cấp luồng dữ liệu JSON tổng hợp tin tức và bài phân tích chuyên sâu.

### 1.2 Đánh giá hệ thống 3D cũ (Historical Assets)
- Trong các phiên bản cũ (`assets/js/globe-three.js`, `assets/js/globe-v5-core.js`), hệ thống sử dụng Three.js để vẽ quả địa cầu số (Digital Earth) tải texture qua CDN bên ngoài (`https://threejs.org/examples/textures/planets/...`).
- **Nhược điểm lớn của hệ thống cũ:**
  1. Phụ thuộc CDN mạng ngoài: Trong sandbox hoặc môi trường mạng kiểm soát chặt, texture không tải được gây lỗi WebGL.
  2. Concept quả địa cầu xoay tròn là generic, không phản ánh năng lực cốt lõi "Tư vấn kiến trúc tăng trưởng thương mại" (Growth Architecture) của DNGWORLD.
  3. Thiếu tích hợp bố cục editorial: Canvas cũ thường chiếm toàn màn hình hoặc bị đè bởi chữ, gây khó đọc trên mobile và desktop.

### 1.3 Đánh giá hệ thống tin tức cũ (Historical News Feed)
- File `scripts/update_news.py` cũ lấy RSS tin thời sự chung từ BBC và VnExpress tổng hợp (`tin-moi-nhat.rss`), dẫn đến lọt nhiều tin giải trí, thời tiết, xã hội không thuộc lĩnh vực kinh doanh, AI hay marketing.
- File `content/insights-v20.json` lưu 6 bài phân tích chiến lược chất lượng cao nhưng chưa có giao diện đọc liền mạch (seamless reader) trên website.

---

## 2. MA TRẬN NĂNG LỰC CŨ VS. MỤC TIÊU V9 (CAPABILITY MATRIX)

| Tiêu chí | Bản cũ (Historical) | Bản hiện tại (V8) | Mục tiêu V9 (Growth Architecture) |
|---|---|---|---|
| **Chủ thể 3D** | Quả địa cầu quay generic | Hero ảnh tĩnh 2D kết hợp vector SVG | Cấu trúc hình học 3D độc bản Growth Architecture (Satin metal, frosted glass, cobalt/mint/coral) |
| **Tương tác 3D** | Chỉ xoay tròn tự do | Tĩnh (Chỉ có SVG CSS animation) | Tương tác chuột/touch có trọng lượng + Storyboard chuyển động theo scroll (Arrival → Diagnose → Connect → Execute) |
| **Fallback & Hiệu năng** | Ảnh globe tĩnh mờ | Poster ảnh chất lượng cao | Progressive Enhancement: Poster hiển thị ngay lập tức, WebGL lazy-boot, pause render ngoài viewport, hỗ trợ `prefers-reduced-motion` |
| **Phân loại tin tức** | RSS thời sự lẫn lộn (BBC, tin chung) | Phân tách 4 nhóm cơ bản | 3 sản phẩm rõ rệt: DNG Newswire (nguồn báo chọn lọc), DNG Briefing (bài ngắn có kiểm chứng), DNG Perspective/Playbook (phân tích chuyên sâu) |
| **Trải nghiệm đọc** | Link trỏ ra ngoài toàn bộ | Modal popup đơn giản | Reader chuyên dụng có định dạng bài báo chuẩn, chia section, takeaways, và luồng đọc liên tục "Đọc tiếp bài kế" |
| **Tính xác thực** | Không lọc độ phù hợp | Lọc cơ bản theo từ khóa | Bộ lọc loại bỏ tin showbiz/thể thao, cam kết zero fabrication (không bịa số liệu, không bịa nguồn) |

---

## 3. CÁC NÚT THẮT CẦN GIẢI QUYẾT TRONG GATE 1 & GATE 2

1. **Thư viện 3D độc lập (Vendor Isolation):** Phải lưu trữ module Three.js cục bộ (`assets/js/vendor/three.module.js`) thay vì phụ thuộc CDN, đảm bảo hoạt động 100% không cần kết nối mạng bên ngoài.
2. **Khóa bố cục 40/60 trên Desktop:** Phân chia rõ ràng vùng text bên trái (40–45%) và không gian 3D tương tác bên phải (55–60%), đảm bảo H1 sắc nét và không che lấp chủ thể 3D.
3. **Chất liệu ánh sáng Studio:** Sử dụng vật liệu PBR (MeshPhysicalMaterial / MeshStandardMaterial) với độ nhám satin, độ bóng kim loại và màu sắc thương hiệu `#285BE8` (Cobalt), `#12BCA4` (Mint), `#F18B53` (Coral).
