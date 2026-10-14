# DNGWORLD — MA TRẬN TRUY XUẤT YÊU CẦU (REQUIREMENTS TRACEABILITY)

Tài liệu này đối chiếu đầy đủ 58 mục Product Spec của `DNGWORLD_GEMINI_MASTER_PROMPT_V2.md`.  
Trạng thái phân loại: `IMPLEMENTED`, `PARTIAL`, `PLANNED`, `BLOCKED`.

---

| STT | Tên hạng mục | Phân loại | Module / Đường dẫn | Trạng thái | Nguồn dữ liệu & Ghi chú |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Mục tiêu cuối cùng (Business Growth Intelligence Platform) | Định vị cốt lõi | Toàn trang | `IMPLEMENTED` | Khẳng định định vị 4 lớp qua header, hero, meta |
| 2 | Audit website hiện tại | Quy trình | `docs/AUDIT_BASELINE.md` | `IMPLEMENTED` | Đã hoàn thành trong Phase 0 |
| 3 | Nguyên tắc với thiết kế cũ (Keep DNA - Rebuild) | Thiết kế | Toàn trang | `IMPLEMENTED` | Giữ 30% DNA (dark cinematic), đổi mới 70% hệ thống |
| 4 | Những thứ cần giữ | Brand DNA | Assets & Content | `IMPLEMENTED` | Giữ ảnh thật, case studies thật, liên hệ thật |
| 5 | Những thứ cần bỏ / giảm mạnh | Làm sạch | Toàn trang | `IMPLEMENTED` | Đã xóa số liệu bịa đặt, scanlines rườm rà, fake metrics |
| 6 | Hướng thiết kế mới (Cinematic x Editorial x Tech) | Thiết kế | `assets/css/dng-system.css` | `IMPLEMENTED` | Xây dựng design tokens phân tách rõ 3 tầng |
| 7 | Brand feel | Nhận diện | Toàn trang | `IMPLEMENTED` | Định hình phong cách tư vấn chiến lược cao cấp |
| 8 | Design principles (Clarity > Wow, Real Data) | Nguyên tắc | UI Components | `IMPLEMENTED` | Tuân thủ tuyệt đối trong mọi trang và thành phần |
| 9 | Color system (Deep black, Charcoal, Signal Mint) | Tokens | `assets/css/dng-system.css` | `IMPLEMENTED` | Bảng màu tập trung có ngữ cảnh |
| 10 | Typography (Display serif + UI sans) | Tokens | `assets/css/dng-system.css` | `IMPLEMENTED` | Georgia / Serif cho headline, Inter / sans cho UI |
| 11 | Motion system (Controlled motion) | Tương tác | Scripts & CSS | `IMPLEMENTED` | Giảm animation thừa, chỉ giữ chuyển động có mục đích |
| 12 | Kiến trúc 4 lớp (Brand, Business, Product, Knowledge) | Cấu trúc | Sơ đồ trang & Footer | `IMPLEMENTED` | Phản ánh đầy đủ trên Main Nav và Footer |
| 13 | Main Navigation | Điều hướng | `Header component` | `IMPLEMENTED` | Work, Services, Tools, Intelligence, About + CTA |
| 14 | Homepage structure (11 khối) | Trang chủ | `index.html` | `IMPLEMENTED` | Đủ 11 khối theo đúng thứ tự Master Spec |
| 15 | Hero section | Trang chủ | `index.html` | `IMPLEMENTED` | "Find What Is Holding Your Business Back." |
| 16 | Business Problem Selector (8 bài toán) | Trang chủ | `index.html` | `IMPLEMENTED` | 8 bài toán tương tác dẫn đến công cụ/dịch vụ |
| 17 | DNG Growth Check | Funnel / Tool | `/tools/growth-check` | `IMPLEMENTED` (Phase 2) | Chẩn đoán 8 nhóm, tính điểm tự khai minh bạch |
| 18 | DNGWORLD Approach (Framework 4 chiều) | Trang chủ | `index.html` | `IMPLEMENTED` | Strategy × Marketing × Technology × AI → Growth |
| 19 | Services design (Editorial consulting) | Dịch vụ | `/services` | `IMPLEMENTED` | 7 dịch vụ tăng trưởng cốt lõi |
| 20 | Service page structure | Dịch vụ | `/services` | `IMPLEMENTED` | Problem → Why → What we analyze → What we do |
| 21 | DNG Lab | Danh mục Tool | `/tools` | `IMPLEMENTED` | Thư mục công cụ chuyên nghiệp phân theo nhóm |
| 22 | Tools design language (Analytical interface) | Giao diện Tool | `/tools/*` | `IMPLEMENTED` | Giao diện phân tích, tối giản, chính xác |
| 23 | Website Audit | DNG Lab | `/tools/website-audit` | `PLANNED` | Gắn nhãn Lộ trình; không fake kết quả |
| 24 | Landing Page Audit | DNG Lab | `/tools/landing-page-audit` | `PLANNED` | Gắn nhãn Lộ trình; không fake kết quả |
| 25 | SEO Check | DNG Lab | `/tools/seo-check` | `PLANNED` | Gắn nhãn Lộ trình; không fake kết quả |
| 26 | AI Visibility Check | DNG Lab | `/tools/ai-visibility` | `PLANNED` | Gắn nhãn Lộ trình; không fake ranking |
| 27 | Ads Health Check | DNG Lab | `/tools/ads-health` | `PLANNED` | Hỗ trợ CSV/Excel khi tích hợp module parser |
| 28 | Content Analyzer | DNG Lab | `/tools/content-analyzer` | `PLANNED` | Gắn nhãn Lộ trình |
| 29 | Competitor Intelligence | DNG Lab | `/tools/competitor` | `PLANNED` | Gắn nhãn Lộ trình; không fake bảng điểm |
| 30 | Marketing Calculators (6 công cụ) | DNG Lab | `/tools/calculators` | `IMPLEMENTED` (Phase 2) | ROAS, Break-even, CAC, LTV, CPL, ROI |
| 31 | UTM + QR Generator | DNG Lab | `/tools/utm-qr` | `IMPLEMENTED` (Phase 2) | Tạo link UTM và mã QR trực tiếp client-side |
| 32 | DNG Intelligence | Tri thức | `/insights` | `IMPLEMENTED` | Không gọi Blog; chia danh mục và phân tích sâu |
| 33 | Intelligence design | Tri thức | `/insights` | `IMPLEMENTED` | Trình bày bài viết theo phong cách editorial |
| 34 | Work / Case Studies | Dự án thật | `/portfolio` | `IMPLEMENTED` | Cấu trúc Context → Problem → Approach → Deliverables; KHÔNG số giả |
| 35 | DNG AI Layer | AI Contextual | Toàn trang / Header | `PARTIAL` | Giữ widget hỗ trợ hiện hữu, chuẩn bị tầng context |
| 36 | Client OS | Sản phẩm | `/client` | `PLANNED` | Hiển thị lộ trình "Coming Soon", không fake data |
| 37 | About Page | Giới thiệu | `/about` | `IMPLEMENTED` | Why We Exist, How We Think, Principles, Ecosystem |
| 38 | Contact Page | Liên hệ | `/contact` | `IMPLEMENTED` | Form chuẩn hóa và thông tin liên hệ thật |
| 39 | Final CTA | Trang chủ | `index.html` | `IMPLEMENTED` | "Don't Guess. Diagnose." |
| 40 | Website Flow | Phễu chuyển đổi | Toàn trang | `IMPLEMENTED` | Content → Tools → Analysis → Recommendation → Service |
| 41 | DNG Flywheel | Vận hành | Mô hình | `IMPLEMENTED` | Phản ánh qua liên kết giữa các tầng trang |
| 42 | Centralized Design System | CSS System | `assets/css/dng-system.css` | `IMPLEMENTED` | Hệ thống token dùng chung toàn bộ trang |
| 43 | Reusable Components | Thành phần | HTML/JS | `IMPLEMENTED` | Header, Footer, ProblemSelector, Cards, Badges |
| 44 | Responsive (375px đến 1440px) | Kiểm thử | Toàn trang | `IMPLEMENTED` | Đảm bảo không vỡ layout, không tràn ngang |
| 45 | Technical Requirements (SEO, Semantic) | Kỹ thuật | Toàn trang | `IMPLEMENTED` | Semantic HTML, canonical, OpenGraph, sitemap |
| 46 | SEO Architecture | Kỹ thuật | Metadata | `IMPLEMENTED` | Title, description độc lập cho từng trang |
| 47 | Data Rules (Zero fabrication) | Luật cốt lõi | Toàn trang | `IMPLEMENTED` | Tuân thủ 100%: Ẩn toàn bộ chỉ số không có nguồn |
| 48 | Tool Status (Live, Self-reported, Planned) | Minh bạch | `/tools` | `IMPLEMENTED` | Mỗi tool có nhãn kỹ thuật và phương thức dữ liệu |
| 49 | Development Roadmap | Kế hoạch | `docs/IMPLEMENTATION_PLAN.md` | `IMPLEMENTED` | Phân kỳ 5 giai đoạn rõ ràng |
| 50 | GitHub Repository Alignment | Quản trị mã | Repository root | `IMPLEMENTED` | Giữ cấu trúc nhất quán, sẵn sàng commit |
| 51 | Documentation (/docs) | Tài liệu | `/docs/*` | `IMPLEMENTED` | Đầy đủ 6 tài liệu theo yêu cầu |
| 52 | Security (.env.example, no keys) | Bảo mật | `.env.example` | `IMPLEMENTED` | Không commit secrets, input validation |
| 53 | Analytics Architecture | Đo lường | Toàn trang | `IMPLEMENTED` | Sự kiện funnel sẵn sàng |
| 54 | Content Management | Nội dung | `/content/*` | `IMPLEMENTED` | Phân tách JSON nguồn và view |
| 55 | QA Checklist | Kiểm thử | `docs/QUALITY-CHECKLIST.md` | `IMPLEMENTED` | Rà soát liên kết, trạng thái, form |
| 56 | Definition of Done | Chuẩn hoàn thành | Tiêu chí nghiệm thu | `IMPLEMENTED` | Không nghiệm thu hình thức, phải có bằng chứng |
| 57 | Nguyên tắc quan trọng nhất (Utility) | Triết lý | Toàn trang | `IMPLEMENTED` | Mọi tính năng phục vụ việc hiểu và ra quyết định |
| 58 | Kết quả mong muốn (Hợp nhất 5 thành phần) | Tổng thể | Toàn trang | `IMPLEMENTED` | Hợp nhất thành một nền tảng đồng nhất |
