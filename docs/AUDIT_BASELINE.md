# DNGWORLD — AUDIT BASELINE (PHASE 0)

**Thời điểm thực hiện**: 2026-10-09  
**Môi trường**: Google AI Studio Node.js Runtime (Linux-x64, Node 22)  
**Repository**: DNGWORLD/DNGWORLD.github.io  
**Trạng thái truy cập**: `ACCESSED`  

---

## 1. Tổng quan cấu trúc và Stack hiện tại
- **Bản chất dự án**: Repository gốc `DNGWORLD.github.io` được triển khai dưới dạng static multi-page website trên GitHub Pages, kết hợp các tệp dữ liệu JSON nguồn (`/content/`), tài sản truyền thông (`/assets/`), và một khung thử nghiệm Laravel chưa triển khai backend (`/app/`, `/routes/`, `/resources/`).
- **Runtime khả dụng trong AI Studio**: Node.js 22 với Express HTTP server (`server.mjs`) phục vụ static files, clean URLs, và API fallback endpoints.
- **Package Manager**: `npm` (đã chuẩn hóa từ Phase migration).
- **Scripts hiện có**:
  - `npm run dev`: Khởi động Node.js development server trên `0.0.0.0:3000`.
  - `npm run build`: Thực thi script xuất bản tĩnh `scripts/build-static.mjs`.
  - `npm run validate`: Chạy `python3 scripts/validate_v19.py`.

---

## 2. Audit Routes và Pages
1. `/` (`index.html`): Trang chủ tiếng Việt.
2. `/portfolio/` (`portfolio/index.html`, `portfolio.html`): Danh mục dự án (5 dự án khách hàng thật: Phong Cách Mộc, Phúc Đại Nam, Koi Service, Adeva, Phê Ly).
3. `/pricing/` (`pricing/index.html`, `pricing.html`): Báo giá và gói dịch vụ tư vấn.
4. `/pricing-marketing/`: Gói dịch vụ Marketing Growth System.
5. `/pricing-video/`: Gói dịch vụ Video & Content Production.
6. `/insights/` (`insights/index.html`, `insights.html`): Trang tin tức thị trường và bài viết phân tích.
7. `/contact/` (`contact/index.html`, `contact.html`): Trang liên hệ và biểu mẫu tư vấn.
8. `/en/*`: Nhánh ngôn ngữ tiếng Anh đầy đủ tương ứng.
9. `/zh/*`: Nhánh ngôn ngữ tiếng Trung đầy đủ tương ứng.
10. `404.html`: Trang xử lý lỗi điều hướng.

---

## 3. Truth Audit (Kiểm toán số liệu và tuyên bố)
Qua rà soát toàn bộ source code HTML và JSON, phát hiện:
- **KPI/Percentages không có nguồn**:
  - `+38.7% Doanh thu tăng trưởng`, `4.63x ROI chiến dịch`, `+24.6% Tỷ lệ chuyển đổi`, `+42.1% Chất lượng lead` trên trang chủ (`index.html`, `en/index.html`, `zh/index.html`).
  - `+120% Tăng trưởng`, `3.2x ROAS`, `+85% Hiệu quả` trên card dự án Phong Cách Mộc (`portfolio/index.html`).
  - `+110% Tăng trưởng`, `2.8x ROAS`, `+68% Hiệu quả` trên Phúc Đại Nam.
  - `+96%`, `2.6x ROAS`, `+75%` trên Koi Service.
  - `+150%`, `3.4x ROAS`, `+92%` trên Adeva.
  - `+130%`, `2.9x ROAS`, `+70%` trên Phê Ly.
  - Biểu đồ thanh vô căn cứ `Ecom Growth System` (thanh 18% đến 88%).
- **Trạng thái cấu hình nội bộ**:
  - Tệp `content/site-config.json` có cờ `"show_unverified_kpis": false`, cho thấy tác giả đã nhận thức và yêu cầu không hiển thị các KPI chưa xác thực.
- **Hành động bắt buộc (Tuân thủ Luật A2 - Zero Fabrication)**:
  - Loại bỏ toàn bộ các con số phần trăm/ROAS bịa đặt/hardcoded khỏi giao diện LIVE.
  - Giữ lại toàn bộ dữ liệu dự án thực chất: Tên thương hiệu, ngành nghề, bối cảnh kinh doanh, bài toán cần giải, giải pháp triển khai, hạng mục bàn giao (deliverables), hình ảnh dự án thực tế.

---

## 4. Kiểm toán Assets và Brand DNA
- **Chân dung & thương hiệu**: Dũng Nguyễn — Commercial Growth Architect / DNGWORLD.
- **Màu sắc nhận diện**: Dark cinematic foundation (`#020807`, `#071813`, `#0a211a`), Signal Emerald/Mint (`#4df2bd`, `#0fd99c`, `#8ff5d2`), Gold/Sand highlight (`#f5c77b`).
- **Typography**: Inter/system-ui cho UI/body, Georgia/editorial serif cho headlines, monospace/caps cho signals.
- **Media**: Hình ảnh dự án thực tế trong `/assets/images/portfolio/` (Adeva, Koi Service, Phê Ly, Phong Cách Mộc, Phúc Đại Nam) hoạt động tốt và đầy đủ.

---

## 5. Kết luận Baseline và Kế hoạch
Baseline đã được ghi nhận đầy đủ, không có sự mập mờ về stack hay dữ liệu. Sẽ chuyển ngay sang lập hồ sơ dữ liệu và triển khai Phase 1 theo đúng quy định.
