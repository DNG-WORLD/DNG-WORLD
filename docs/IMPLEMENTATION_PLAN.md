# DNGWORLD — KẾ HOẠCH TRIỂN KHAI THEO GIAI ĐOẠN (IMPLEMENTATION PLAN)

Tuân thủ nghiêm ngặt Luật A7 (Không build tất cả rồi vỡ, chia thành các Phase rõ ràng có kiểm thử sau mỗi phase).

---

## GIAI ĐOẠN 0: AUDIT & CHUẨN BỊ NỀN TẢNG (HIỆN TẠI - HOÀN TẤT)
- [x] Rà soát cấu trúc thư mục, môi trường runtime Node.js, Express server trên cổng 3000.
- [x] Thực hiện Truth Audit toàn diện: phát hiện và lên danh sách các chỉ số hardcoded cần loại bỏ.
- [x] Lập các tài liệu bắt buộc: `AUDIT_BASELINE.md`, `DATA_SOURCE_REGISTER.md`, `KEEP_REFACTOR_REMOVE.md`, `REQUIREMENTS_TRACEABILITY.md`, `IMPLEMENTATION_PLAN.md`.
- [x] Xác minh lệnh test cơ sở (`npm run build`, `compile_applet`).

---

## GIAI ĐOẠN 1: CORE WEBSITE & GLOBAL DESIGN SYSTEM (PHASE 1)
**Mục tiêu**: Hoàn thiện website cốt lõi với cấu trúc chuẩn của DNGWORLD — Business Growth Intelligence Platform.
- [ ] Xây dựng Centralized Design System (`assets/css/dng-system.css`) với bảng màu dark cinematic, editorial typography, analytical components, badge trạng thái, cards.
- [ ] Chuẩn hóa Main Navigation & Footer (đủ 4 tầng: BRAND, BUSINESS, PRODUCT, KNOWLEDGE).
- [ ] Tái cấu trúc Homepage (`index.html`, `/en/index.html`, `/zh/index.html`) theo 11 khối chuẩn:
  1. Hero: "Find What Is Holding Your Business Back."
  2. Business Problem Selector (8 bài toán).
  3. DNG Growth Check interactive entry.
  4. DNGWORLD Approach (4 chiều Strategy × Marketing × Technology × AI).
  5. DNG Lab Directory.
  6. Featured Work (case studies thực chất, không có số ảo).
  7. Services (7 dịch vụ theo lối Editorial).
  8. DNG Intelligence (bản tin & phân tích).
  9. DNG Ecosystem (Lab, AI, Client OS).
  10. Final CTA ("Don't Guess. Diagnose.").
  11. Unified Footer.
- [ ] Xây dựng trang DNG Lab Directory (`/tools/index.html` và route `/tools`).
- [ ] Xây dựng trang Services (`/services/index.html` và route `/services`).
- [ ] Xây dựng trang About (`/about/index.html` và route `/about`).
- [ ] Tinh chỉnh trang Portfolio, Pricing, Insights, Contact để đồng bộ nhận diện mới.
- [ ] Chạy kiểm thử build và xác thực điều hướng.

---

## GIAI ĐOẠN 2: WORKING TOOLS (PHASE 2)
**Mục tiêu**: Triển khai các công cụ client-side hoạt động thật với công thức toán học chính xác.
- [ ] Triển khai DNG Growth Check Engine với bộ câu hỏi chẩn đoán và tính điểm minh bạch theo 8 nhóm.
- [ ] Triển khai ROAS Calculator & Break-even ROAS Calculator với công thức toán học thực tế và xác thực dữ liệu đầu vào.
- [ ] Triển khai CAC & LTV Calculator với giải thích giả định.
- [ ] Triển khai CPL & Marketing ROI Calculator.
- [ ] Triển khai UTM Builder & QR Generator.
- [ ] Viết unit tests kiểm thử các trường hợp biên của calculator (chia cho 0, số âm, rỗng, số cực lớn).

---

## GIAI ĐOẠN 3 - 5: ROADMAP MỞ RỘNG (GHI NHẬN RÕ RÀNG TRONG TÀI LIỆU, KHÔNG FAKE LIVE)
- **Phase 3**: Website Audit Engine, SEO Check, Content Analyzer (chờ backend crawl/parser an toàn).
- **Phase 4**: Contextual DNG AI Layer (khi có model backend server-side và context report thật).
- **Phase 5**: Client OS Portal (khi có tài khoản người dùng và cơ sở dữ liệu thật).
