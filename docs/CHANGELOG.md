# DNGWORLD — NHẬT KÝ THAY ĐỔI (CHANGELOG)

Tất cả các thay đổi đều được ghi lại theo quy chuẩn SemVer và tuân thủ `DNGWORLD_GEMINI_MASTER_V5.md`.

---

## [v5.0.0] - 2026-10-09 (Master Rebuild V5)

### 1. Hệ thống thiết kế sáng & Nhận diện thương hiệu (Bright Theme V5)
- Chuyển đổi toàn diện từ giao diện tối sang hệ thống màu sáng theo chuẩn V5 (`--bg: #FFFFFF; --bg-soft: #F4F8FD; --bg-blue: #EAF3FF; --ink: #15253E; --primary: #2357E8; --mint: #33C9A7;`).
- Chuẩn hóa typography duy nhất bằng `Be Vietnam Pro` (400-800). Loại bỏ Serif (`Georgia`, `Times New Roman`) khỏi tiêu đề UI tiếng Việt.
- Thanh điều hướng chuẩn V5 gồm 5 mục: `Giải pháp`, `Công cụ`, `Tin tức & Phân tích`, `Về DNGWORLD`, `Liên hệ tư vấn`.

### 2. Ẩn hoàn toàn Portfolio khỏi Website công khai (Direct-link Only)
- Xóa bỏ mọi liên kết `Work`, `Portfolio`, `Dự án` khỏi Header, Footer, Quickbar, Homepage, Services, About và Newsroom.
- Chuyển hướng tự động `/portfolio` và `/portfolio/` về trang chủ `/`.
- Tạo 5 trang hồ sơ dự án độc lập có gắn thẻ `noindex, nofollow` để phục vụ gửi trực tiếp:
  - `/portfolio/phong-cach-moc/`
  - `/portfolio/phuc-dai-nam/`
  - `/portfolio/koi-service/`
  - `/portfolio/phe-ly/`
  - `/portfolio/adeva/`
- Loại bỏ toàn bộ URL portfolio khỏi `sitemap.xml`.

### 3. Tái thiết kế DNG Intelligence thành Newsroom chuyên nghiệp
- Bố cục báo chí kinh tế hiện đại: Lead story (2/3) + Đáng chú ý (1/3) + Mới cập nhật (2/3).
- Gỡ bỏ dashboard Market Radar số liệu Q3-Q4/2024 chưa có link kiểm chứng.
- Tích hợp các bài phân tích chuyên sâu thật của DNG kèm Reader Modal hoàn chỉnh.
- Làm sạch luồng tin RSS: Hiển thị nguồn, ngày, tóm tắt và nút xem bài gốc; không lộ chuỗi URL thô.

### 4. Tinh giản DNG Lab: Chỉ giữ công cụ hoạt động thật
- Chỉ công khai 6 công cụ hoạt động thật (`LIVE`): ROAS Calculator, Break-even ROAS, CAC Calculator, LTV Estimator, UTM & QR Generator, DNG Growth Self-Check.
- Ẩn toàn bộ các công cụ roadmap chưa kiểm chứng khỏi danh mục công khai.

---

## [v20.0.0] - 2026-10-09

### Khởi động & Kiểm toán (Phase 0)
- **Kiểm toán nguồn dữ liệu**: Truy quét toàn bộ source code và phát hiện các số liệu bịa đặt/hardcoded (`+38.7%`, `4.63x ROI`, `3.2x ROAS`, `+120%`, biểu đồ thanh giả `Ecom Growth System`).
- **Thiết lập tài liệu quản trị**:
  - Tạo `docs/AUDIT_BASELINE.md`: Báo cáo hiện trạng kỹ thuật và dữ liệu.
  - Tạo `docs/DATA_SOURCE_REGISTER.md`: Sổ phân loại nguồn dữ liệu theo 6 cấp độ (`VERIFIED`, `CALCULATED`, `SELF_REPORTED`, `ESTIMATE`, `EXAMPLE`, `UNAVAILABLE`).
  - Tạo `docs/KEEP_REFACTOR_REMOVE.md`: Ma trận xử lý theo nguyên tắc "Keep DNA — Rebuild System".
  - Tạo `docs/IMPLEMENTATION_PLAN.md`: Kế hoạch 5 giai đoạn chi tiết.
  - Tạo `docs/REQUIREMENTS_TRACEABILITY.md`: Ma trận đối chiếu 58 mục yêu cầu trong Master Spec V2.0.

### Nâng cấp Nền tảng & Giao diện (Phase 1)
- **Hệ thống Thiết kế Tập trung (`assets/css/dng-system.css`)**:
  - Xây dựng tokens màu: Dark Foundation (`#020807`, `#081411`, `#0d1f1a`), Signal Mint/Emerald (`#4df2bd`, `#0fd99c`), Gold/Sand (`#f5c77b`).
  - Typography hai tầng: Display Serif (Georgia/Times New Roman) và UI Sans (Inter/system-ui).
  - Analytical components: Thẻ chẩn đoán, huy hiệu trạng thái công cụ (`LIVE`, `SELF_REPORTED`, `PLANNED`), bảng so sánh và các form controls chuẩn mực.
- **Thanh điều hướng & Chân trang Đạt chuẩn**:
  - Header: Logo `DNGWORLD`, liên kết `Work`, `Services`, `Tools`, `Intelligence`, `About`, nút CTA `Analyze My Business →`, chuyển đổi ngôn ngữ `VI` | `EN` | `ZH`.
  - Footer: Cấu trúc 4 lớp sản phẩm (BRAND, BUSINESS, PRODUCT, KNOWLEDGE), thông tin liên hệ xác thực (Email, Zalo, Hotline).
- **Tái cấu trúc Trang chủ (`index.html`, `/en/index.html`, `/zh/index.html`)**:
  - Triển khai đầy đủ 11 khối theo Master Spec:
    01. Hero ("Find What Is Holding Your Business Back.")
    02. Business Problem Selector (8 bài toán kinh doanh cụ thể)
    03. DNG Growth Check (Chẩn đoán tăng trưởng tương tác)
    04. DNGWORLD Approach (Framework Strategy × Marketing × Technology × AI)
    05. DNG Lab Showcase
    06. Featured Work (5 case studies thực tế, loại bỏ số liệu ảo)
    07. Services (7 dịch vụ cốt lõi theo phong cách Editorial)
    08. DNG Intelligence (Điểm tin và bài viết phân tích)
    09. DNG Ecosystem (DNG Lab, DNG AI, Client OS)
    10. Final CTA ("Don't Guess. Diagnose.")
    11. Unified 4-layer Footer.
- **Bổ sung các trang cốt lõi mới**:
  - `/tools/index.html` (DNG Lab Directory): Thư mục đầy đủ các công cụ tính toán và chẩn đoán với nhãn trạng thái minh bạch.
  - `/services/index.html`: Chi tiết 7 gói dịch vụ và phương pháp luận triển khai.
  - `/about/index.html`: Triết lý, mô hình tư duy 4 chiều và hệ sinh thái.
- **Làm sạch trang Portfolio & Pricing**:
  - Loại bỏ triệt để các KPI không có nguồn chứng từ.
  - Tập trung vào bối cảnh doanh nghiệp, vấn đề thực tế, giải pháp kỹ thuật và các hạng mục bàn giao (deliverables).

### Triển khai Bộ Công cụ DNG Lab Hoạt động Thật (Phase 2)
- **DNG Growth Check Engine (`/tools/growth-check`)**:
  - Khảo sát chẩn đoán 8 khía cạnh tăng trưởng với thuật toán tính điểm minh bạch (`SELF_REPORTED`).
  - Trả về 3 vấn đề lớn nhất, 3 cơ hội tăng trưởng, cấp độ ưu tiên và các khuyến nghị hành động tức thì.
- **Bộ máy tính Marketing Calculators (`/tools/calculators`)**:
  - ROAS Calculator (`attributed ad revenue / ad spend`).
  - Break-even ROAS Calculator (`1 / contribution margin`).
  - CAC Calculator (`total marketing & sales expenses / new customers`).
  - LTV Calculator (`AOV × Purchase Frequency × Customer Lifespan`).
  - CPL Calculator (`total lead generation cost / qualified leads`).
  - Marketing ROI Calculator (`(incremental gross profit - marketing cost) / marketing cost`).
  - Xử lý chặt chẽ các trường hợp biên: chia cho 0, số âm, rỗng, số cực lớn.
- **UTM Builder & QR Code Generator (`/tools/utm-qr`)**:
  - Tạo liên kết UTM và mã QR trực quan ngay trên trình duyệt mà không cần gửi dữ liệu ra bên ngoài.

### Nâng cấp DNG Intelligence & Kiểm Thử QA Gate
- **DNG Intelligence Hub (`/insights`)**:
  - Triển khai 4 phân hệ chuẩn: Market Radar (Dữ liệu vĩ mô GSO, SBV, Metric), Playbooks (8 khung chiến lược), Tear-downs (Mổ xẻ ca thực chiến), Curated Signals (Luồng tin ngành).
  - Tìm kiếm tức thì, phân loại theo chủ đề, lưu bài viết vào localStorage (`Bookmark`), ước tính thời gian đọc.
- **Xác thực Cổng Chất Lượng (QA Gate - 100% Pass)**:
  - 100% các route chính và phụ trả về HTTP 200 (`/`, `/portfolio`, `/pricing`, `/services`, `/about`, `/tools`, `/tools/growth-check`, `/tools/calculators`, `/tools/utm-qr`, `/insights`, `/contact`, `/api/news`).
  - Kiểm thử toán học các bộ máy tính với dữ liệu biên (xử lý chia cho 0, số âm, rỗng).
  - Loại bỏ hoàn toàn số liệu giả mạo (Zero Fabrication theo Luật A2).
  - Biên dịch thành công với `compile_applet` (`npm run build`).

