# DNGWORLD — KẾ HOẠCH TRIỂN KHAI V8.0 (EXECUTION PLAN)

**Mục tiêu:** Thực hiện theo từng Phase và nghiệm thu theo bảng Gate của `DNGWORLD_MASTER_PROMPT_V8_EXECUTION.md`.

---

## 1. GIAI ĐOẠN TRIỂN KHAI

### Phase 1: Full-Screen Cinematic Hero & Visual System
- [ ] Thiết kế Hero chiếm trọn viewport (`min-height: calc(100svh - 74px)`, không dưới 700px trên desktop 900px).
- [ ] Áp dụng hình ảnh chủ đạo `/assets/images/hero/dng_hero_cinematic.jpg` với bố cục full-bleed editorial và text overlay tương phản cao.
- [ ] Xây dựng kinetic trajectories (đồ họa chuyển động hướng tăng trưởng) bằng CSS & SVG mượt mà.
- [ ] Thêm nút scroll indicator tương tác.
- [ ] Kiểm tra responsive trên các độ phân giải 1920×1080, 1440×900, và 390×844.

### Phase 2: Kiến Trúc Dữ Liệu & News Ingestion Engine
- [ ] Cập nhật `server.mjs`: Xử lý endpoint `/api/news` tổng hợp cả luồng tin ngoài (từ `data/news.json`) và bài viết phân tích nội bộ (`content/insights-v20.json` & `content/posts/`).
- [ ] Chuẩn hóa schema: Tiêu đề, tóm tắt, ảnh minh họa, nguồn báo thực tế, ngày xuất bản thực, link gốc bài báo.
- [ ] Loại bỏ hoàn toàn khả năng trả về mảng rỗng `items: []`.

### Phase 3: Tái Thiết Kế DNG Intelligence Newsroom Thế Hệ Mới
- [ ] Bố cục Newsroom hiện đại:
  - Lead story (2/3) với ảnh 16:10 `/assets/images/insights/dng_news_lead.jpg`
  - Đáng chú ý (1/3)
  - Mới cập nhật (newswire list có thumbnail và mốc thời gian)
  - Chuyên mục theo ngành: AI & Công nghệ, Marketing & Quảng cáo, Kinh doanh & Thị trường, TMĐT
  - Bài phân tích DNG chuyên sâu (kèm Reader Modal đọc trọn vẹn luận điểm, 3 takeaways, bối cảnh)
- [ ] Bộ lọc danh mục thực tế và tìm kiếm tức thì.

### Phase 4: Đồng Bộ Hệ Sinh Thái & Bảo Toàn Chức Năng
- [ ] Trang chủ: Đồng bộ khối tin tức mới nhất từ cùng nguồn dữ liệu với Newsroom.
- [ ] Bảo toàn 6 công cụ tính toán DNG Lab (ROAS, Break-even, CAC, LTV, UTM/QR, Growth Self-Check).
- [ ] Bảo toàn 5 trang dự án con direct-only (`noindex, nofollow`).
- [ ] Kiểm tra các trang Services, About, Contact, Pricing.

### Phase 5: Visual QA, Automated Testing & Documentation
- [ ] Chạy bộ kiểm thử tự động 16 test cases kiểm tra HTTP status, hero height, news content, direct links.
- [ ] Tạo các tài liệu V8: `docs/V8_DESIGN_SYSTEM.md`, `docs/V8_NEWS_ENGINE.md`, `docs/V8_QA.md`, `docs/V8_CHANGELOG.md`.
- [ ] Biên dịch `compile_applet` xác nhận build thành công.
