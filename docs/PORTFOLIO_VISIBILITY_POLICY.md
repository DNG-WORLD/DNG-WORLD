# DNGWORLD — CHÍNH SÁCH QUẢN LÝ DỰ ÁN (PORTFOLIO VISIBILITY POLICY V5.0)

**Nguyên tắc cốt lõi:** `DIRECT-LINK ONLY · KHÔNG CÔNG KHAI TRÊN WEBSITE`  
**Hiệu lực:** Thay thế toàn bộ các đề xuất cũ về việc công khai case study trên trang chủ hoặc thanh điều hướng.

---

## 1. ẨN HOÀN TOÀN KHỎI WEBSITE CÔNG KHAI
- Xóa bỏ toàn bộ từ khóa và liên kết: `Work`, `Portfolio`, `Dự án`, `Featured Work`, `Case Studies` khỏi:
  - Header / Thanh điều hướng chính
  - Menu di động (Mobile Drawer)
  - Trang chủ (Homepage)
  - Trang Dịch vụ (Services)
  - Trang Giới thiệu (About)
  - Chân trang (Footer)
  - Thanh lối tắt nhanh (Quickbar)
  - Tin tức / Newsroom (DNG Intelligence)
  - Sơ đồ trang web công khai (`sitemap.xml`)

---

## 2. BẢO TOÀN CÁC ĐƯỜNG DẪN DỰ ÁN CON ĐỘC LẬP
Các trang dự án thực tế vẫn được duy trì nguyên vẹn để chuyên gia cố vấn gửi trực tiếp cho đối tác/khách hàng khi có nhu cầu:
1. `/portfolio/phong-cach-moc/` (và `/portfolio/phong-cach-moc.html`)
2. `/portfolio/phuc-dai-nam/` (và `/portfolio/phuc-dai-nam.html`)
3. `/portfolio/koi-service/` (và `/portfolio/koi-service.html`)
4. `/portfolio/phe-ly/` (và `/portfolio/phe-ly.html`)
5. `/portfolio/adeva/` (và `/portfolio/adeva.html`)

Mỗi trang con đều được gắn thẻ kỹ thuật:
```html
<meta name="robots" content="noindex, nofollow">
```
để ngăn các công cụ tìm kiếm tự động thu thập và lập chỉ mục.

---

## 3. ĐIỀU HƯỚNG TRANG DANH MỤC (`/portfolio/`)
- Mọi lượt truy cập vào `/portfolio` hoặc `/portfolio/` đều được tự động chuyển hướng (HTTP 302 Redirect) về trang chủ `/`.
- Không cung cấp bất kỳ danh sách dự án tổng hợp nào cho người truy cập vãng lai.
