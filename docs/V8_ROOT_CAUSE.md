# DNGWORLD — V8.0 ROOT CAUSE ANALYSIS & DIAGNOSIS

**Thời điểm kiểm tra:** 2026-10-09  
**Người thực hiện:** Full-Stack & Creative Engineering Engine  
**Căn cứ:** Ảnh chụp thực tế của chủ dự án và audit trực tiếp trên mã nguồn `https://dng-works.ai.studio/`.

---

## 1. NGUYÊN NHÂN CỤ THỂ CỦA 2 LỖI CHÍNH TRONG ẢNH CHỤP

### Lỗi 1: Hero trang chủ không full-screen, chỉ gồm chữ trên nền sáng ("tờ A4 giữa màn hình")
- **Nguyên nhân mã nguồn:** Trong `index.html`, section Hero được viết với:
  ```html
  <section class="section" style="padding-top: clamp(48px, 6vw, 84px); padding-bottom: clamp(48px, 6vw, 84px); background: linear-gradient(...);">
    <div class="container">
      <div style="max-width: 860px;">
        <h1>Hiểu đúng vấn đề...</h1>
  ```
  - Chiều cao section chỉ phụ thuộc vào lượng chữ bên trong (~380px trên màn hình desktop 900px), vi phạm tiêu chuẩn `min-height: calc(100svh - var(--header-height))` (tối thiểu 680-720px ở viewport 900px).
  - Hoàn toàn thiếu lớp ảnh/media chủ đạo (`dominant visual subject`), không có cấu trúc full-bleed layout.
  - Văn bản bị bó hẹp trong container 860px giữa màn hình rộng 1440–1920px, tạo cảm giác một trang văn bản A4 trơ trọi.

### Lỗi 2: DNG Intelligence newsroom bị trống ("Không tìm thấy bản tin phù hợp")
- **Nguyên nhân mã nguồn & dữ liệu:**
  1. Trong `server.mjs`, endpoint `/api/news` gửi request đến Google News RSS qua Internet. Khi mạng preview/sandbox bị nghẽn hoặc chặn, server tự động rơi vào fallback `data/news.json`.
  2. Tuy nhiên, file `data/news.json` có cấu trúc gồm các mảng riêng biệt: `{ latest_vn: [...], ai_news: [...], tech_news: [...], markets: [...] }`, hoàn toàn **không có thuộc tính `items`**.
  3. Trong file frontend `insights/index.html`, mã nguồn JavaScript gọi:
     ```javascript
     const res = await fetch('/api/news?lang=vi');
     const data = await res.json();
     allNewsItems = (data.items || [])...
     ```
     Vì `data.items` trả về `undefined`, mảng tin tức trở thành rỗng `[]`, dẫn đến render khối trống: *"Không tìm thấy bản tin phù hợp với bộ lọc hiện tại"*.
  4. Hệ thống chưa tích hợp 6 bài phân tích chuyên sâu dài kỳ sẵn có trong `content/insights-v20.json` và 3 bài trong `content/posts/`.

---

## 2. PHƯƠNG ÁN KHẮC PHỤC TRIỆT ĐỂ TRONG V8.0

1. **Khắc phục Hero (Ưu tiên 1):**
   - Thiết kế lại khối Hero full viewport (`min-height: calc(100svh - 74px)`, tối thiểu 700px trên desktop).
   - Đưa hình ảnh chủ đạo cao cấp `/assets/images/hero/dng_hero_cinematic.jpg` vào vị trí trung tâm bằng kỹ thuật art-directed full-bleed layout kết hợp lớp gradient tinh tế, đảm bảo độ tương phản hoàn hảo cho văn bản.
   - Thêm branded kinetic motion (đồ họa chuyển động hướng tăng trưởng) có thể quan sát trực tiếp trên trình duyệt.
   - Thêm scroll cue chỉ dẫn cuộn trang tương tác mượt mà.

2. **Khắc phục Newsroom (Ưu tiên 2):**
   - Tái cấu trúc endpoint `/api/news` trong `server.mjs`: Tự động tổng hợp và chuẩn hóa toàn bộ các tin từ `data/news.json` (`latest_vn`, `ai_news`, `tech_news`, `markets`) thành danh mục chuẩn, có hình ảnh, nguồn báo và ngày thực.
   - Xây dựng kho bài viết phân tích gốc của DNG: Đưa đầy đủ 6 bài phân tích dài từ `content/insights-v20.json` và 3 bài từ `content/posts/` vào giao diện newsroom có Reader Modal hoàn chỉnh.
   - Bố cục báo chí kinh tế: Lead Story 16:10 + Tin đáng chú ý + Mới cập nhật + Bộ lọc chủ đề + Search tức thì.

3. **Bảo toàn chức năng & Quy tắc Portfolio (Ưu tiên 3):**
   - Giữ nguyên toàn bộ 6 công cụ tính toán DNG Lab (ROAS, Break-even, CAC, LTV, UTM/QR, Growth Self-Check).
   - Duy trì chuyển hướng 302 cho `/portfolio` về `/`.
   - Bảo toàn 5 trang dự án con direct-link độc lập (`noindex, nofollow`).
