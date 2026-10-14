# DNGWORLD — MA TRẬN KEEP / REFACTOR / REMOVE / ADD

Theo quy định tại Mục 3, 4, 5 của `DNGWORLD_GEMINI_MASTER_PROMPT_V2.md`:
**"KEEP THE DNA — REBUILD THE SYSTEM"** (30% DNA cũ + 70% kiến trúc mới theo chiều sâu giải pháp).

---

## 1. Thành phần KEEP (Giữ nguyên)
- **Brand DNA**: Tông màu tối cinematic (`#020807`), điểm nhấn tín hiệu mint/emerald (`#4df2bd`), triết lý `Intelligence → Growth`.
- **Dữ liệu thực tế khách hàng**: 5 case studies thực có hình ảnh và tài sản xác thực (Phong Cách Mộc, Phúc Đại Nam, Koi Service, Adeva, Phê Ly).
- **Cấu trúc đa ngôn ngữ**: Hỗ trợ 3 ngôn ngữ VI / EN / ZH với cơ chế routing sạch.
- **Tài sản thương hiệu**: Toàn bộ kho hình ảnh portfolio trong `/assets/images/portfolio/`, logo thương hiệu, favicon và zalo QR.
- **Nguồn dữ liệu thị trường**: Module lấy tin tức kinh tế / AI từ nguồn cấp dữ liệu chuẩn hóa qua `/data/news.json` và `/api/news`.

---

## 2. Thành phần REFACTOR (Tái cấu trúc)
- **Header & Navigation**: Chuyển từ menu sơ sài sang Main Navigation chuẩn kiến trúc Master Spec:
  - `Work` | `Services` | `Tools` (DNG Lab) | `Intelligence` | `About`
  - CTA nổi bật: `Analyze My Business →`
  - Trình chuyển đổi ngôn ngữ chuẩn xác (VI | EN | ZH).
- **Homepage Layout**: Tái cấu trúc theo 11 khối chuẩn:
  1. Hero: "Find What Is Holding Your Business Back." / "Chiến lược rõ ràng. Tăng trưởng có hệ thống."
  2. Business Problem Selector: 8 bài toán kinh doanh cụ thể.
  3. DNG Growth Check: Công cụ chẩn đoán tăng trưởng tương tác.
  4. DNGWORLD Approach: Framework 4 chiều (Strategy × Marketing × Technology × AI → Growth).
  5. DNG Lab Directory: Giới thiệu các công cụ tính toán & chẩn đoán.
  6. Featured Work: Trình bày case study theo cấu trúc Tư vấn (Bối cảnh → Vấn đề → Giải pháp → Deliverables).
  7. Services: Trình bày dịch vụ theo phong cách Editorial Consulting.
  8. DNG Intelligence: Điểm tin và góc nhìn thực chiến.
  9. DNG Ecosystem: Giới thiệu hệ sinh thái DNGWORLD (Lab, AI, Client OS).
  10. Final CTA: "Don't Guess. Diagnose."
  11. Footer: 4 tầng kiến trúc sản phẩm.
- **Services & Pricing**: Thay thế bảng giá đơn thuần bằng mô tả dịch vụ sâu sắc kèm phương pháp luận, phạm vi triển khai và deliverables rõ ràng.

---

## 3. Thành phần REMOVE (Loại bỏ)
- **Chỉ số bịa đặt (Fake KPIs)**: Xóa bỏ triệt để các số liệu `+38.7%`, `4.63x ROI`, `3.2x ROAS` không có chứng từ.
- **Biểu đồ thanh giả lập**: Xóa biểu đồ `Ecom Growth System` hardcode tỉ lệ phần trăm.
- **Hiệu ứng rườm rà**: Giảm thiểu các chuỗi particle nặng hoặc hiệu ứng quét radar không phục vụ thông điệp kinh doanh.

---

## 4. Thành phần ADD (Bổ sung mới)
- **Trang DNG Lab (`/tools`)**: Thư mục công cụ chuyên nghiệp phục vụ phân tích kinh doanh, marketing và AI, với trạng thái minh bạch (`LIVE`, `SELF_REPORTED`, `PLANNED`).
- **Bộ công cụ Marketing Calculators**:
  - ROAS Calculator (`/tools/roas`)
  - Break-even ROAS Calculator (`/tools/break-even-roas`)
  - CAC Calculator (`/tools/cac`)
  - LTV Calculator (`/tools/ltv`)
  - CPL Calculator (`/tools/cpl`)
  - Marketing ROI Calculator (`/tools/roi`)
  - UTM & QR Generator (`/tools/utm-qr`)
  - DNG Growth Check Engine tương tác trực tiếp (`/tools/growth-check`)
- **Trang About (`/about`)**: Giới thiệu triết lý hình thành, phương pháp tư duy 4 chiều và hệ sinh thái DNGWORLD.
- **Trang Services (`/services`)**: Trang chuyên sâu về 7 dịch vụ tư vấn tăng trưởng.
- **Design System tập trung**: File stylesheet `assets/css/dng-system.css` quản lý biến màu sắc, typography, card analytical, form controls và responsive breakpoints.
