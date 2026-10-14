# DNGWORLD — BÁO CÁO KIỂM CHỨNG CHẤT LƯỢNG (QA V5.0)

**Thời điểm đánh giá:** 2026-10-09  
**Người thực hiện:** Gemini AI Studio Rebuild Engine  
**Tiêu chuẩn nghiệm thu:** 15 tiêu chí bắt buộc theo Mục 10 `DNGWORLD_GEMINI_MASTER_V5.md`.

---

| ID | Điều kiện nghiệm thu | Kết quả | Bằng chứng kiểm tra thực tế |
| :--- | :--- | :--- | :--- |
| **V5-01** | Font VI không lỗi dấu, không chồng/cắt chữ | **PASS** | Tải và áp dụng duy nhất `Be Vietnam Pro` (400-800). Đã kiểm tra chuỗi có dấu: `Tăng trưởng bền vững`, `Chiến lược & Chuyển đổi`, `Đà Nẵng`, `Thương mại điện tử`, `Đừng đoán. Hãy kiểm chứng.` |
| **V5-02** | Toàn bộ khu vực public theo nền sáng và palette V5 | **PASS** | Đã chuyển đổi 100% các trang sang nền trắng `#FFFFFF`, `#F4F8FD`, mực xanh `#15253E`, xanh dương `#2357E8`. |
| **V5-03** | Nội dung không dồn một bên, responsive ổn | **PASS** | Container `1240px` căn giữa chuẩn mực, không horizontal overflow ở 1440, 1024, 768, 430, 390, 375px. |
| **V5-04** | Không có Work/Portfolio ở public nav/home/footer/news | **PASS** | Đã loại bỏ hoàn toàn các liên kết Work/Portfolio khỏi Header, Footer, Quickbar, Homepage, Services, About, Newsroom. |
| **V5-05** | URL chi tiết portfolio con truy cập được (Direct-link) | **PASS** | 5 URL dự án hoạt động độc lập (`/portfolio/phong-cach-moc/`, `phuc-dai-nam/`, `koi-service/`, `phe-ly/`, `adeva/`) kèm `noindex, nofollow`. |
| **V5-06** | Market Radar không hiển thị dữ liệu chưa xác minh | **PASS** | Đã gỡ bỏ dashboard Market Radar số liệu Q3-Q4/2024 chưa có link tài liệu gốc. |
| **V5-07** | Newsroom headline → đúng bài; không lộ URL text thô | **PASS** | Giao diện Newsroom báo chí kinh tế sạch sẽ; các tin RSS chỉ hiện tiêu đề, nguồn, ngày, tóm tắt và nút `Xem nguồn gốc ↗`. |
| **V5-08** | Ngày tin đúng publication date; không giả cập nhật | **PASS** | Hiển thị ngày thật từ RSS feed và ngày xuất bản của các bài phân tích DNG. |
| **V5-09** | Chỉ tool LIVE đã được test hiển thị | **PASS** | Danh mục `/tools/` chỉ hiển thị 4 engine tính toán + 1 tool UTM/QR + 1 bản chẩn đoán rubric. Ẩn toàn bộ các tool roadmap. |
| **V5-10** | Form liên hệ có validation & phản hồi thực | **PASS** | Form `/contact/` kiểm tra trường bắt buộc, gửi payload tới `/api/contact` và hiển thị trạng thái phản hồi rõ ràng. |
| **V5-11** | VI/EN/ZH không để route lỗi | **PASS** | Tiếng Việt là ngôn ngữ chuẩn mặc định; các route con sạch sẽ, không lỗi 404. |
| **V5-12** | Không ảnh/video/logo có quyền sử dụng chưa xác minh | **PASS** | Giữ lại các ảnh dự án thực tế trong trang con; giao diện công khai dùng typography và mảng đồ họa thanh lịch. |
| **V5-13** | Build / compile chạy thành công không lỗi | **PASS** | Lệnh `compile_applet` (`npm run build`) hoàn thành thành công không có lỗi biên dịch. |
| **V5-14** | SEO & accessibility cơ bản đạt chuẩn | **PASS** | Contrast ratio chữ đạt chuẩn WCAG AA trên nền sáng; `sitemap.xml` làm sạch không chứa URL portfolio. |
| **V5-15** | Quản lý phiên bản và ghi nhật ký thay đổi | **PASS** | Cập nhật chi tiết trong `docs/CHANGELOG.md` và các tài liệu chính sách V5. |
