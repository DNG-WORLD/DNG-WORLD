# DNGWORLD — AUDIT BASELINE THEO TIÊU CHUẨN MASTER V5.0

**Thời điểm thực hiện:** 2026-10-09  
**Môi trường runtime:** Google AI Studio Node.js 22 Runtime (Linux-x64, Port 3000)  
**Phạm vi:** Toàn bộ website và mã nguồn DNGWORLD (`https://dng-works.ai.studio/` và local)  
**Hiệu lực:** Thay thế toàn bộ các đánh giá cũ trong V2, V3, V4 theo đúng đặc tả V5.0.

---

## 1. BẢNG ĐỐI CHIẾU TRẠNG THÁI HIỆN TẠI (BASELINE INVENTORY)

| URL / Route | Chức năng hiện tại | Hiện trạng & Bằng chứng | Cấp độ lỗi | Quyết định V5 | File / Component |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | Trang chủ | Giao diện tối (`#020807`), font Georgia/Serif nặng nề, có menu `Work`, CTA `Xem dự án`, 2 case studies công khai | **CRITICAL** | **REFACTOR** sang Bright Theme V5, bỏ toàn bộ khối Work/Portfolio, tái cấu trúc 7 khối chuẩn | `index.html` |
| `/insights/` | DNG Intelligence | Nền tối, card xanh đen, Market Radar hiện các số Q3-Q4/2024 không có link tài liệu đính kèm, feed tin lộ URL thô | **HIGH** | **REBUILD** thành Newsroom chuyên nghiệp nền sáng, loại bỏ số liệu vĩ mô chưa kiểm chứng, phân tách tin brief vs phân tích DNG | `insights/index.html`, `insights.html` |
| `/portfolio/` | Danh mục dự án | Công khai 5 dự án thực tế trên website | **CRITICAL** | **HIDE** khỏi điều hướng công khai; chuyển từng dự án thành direct-link riêng (`noindex`), redirect `/portfolio/` về `/` | `portfolio/index.html`, `portfolio/*.html` |
| `/tools/` | Danh mục công cụ | Hiện các công cụ Roadmap (Ads Health, Website Audit, AI Visibility...) cùng nhãn LIVE | **HIGH** | **REFACTOR** chỉ hiển thị các công cụ LIVE đã được test thực tế; ẩn các roadmap tools | `tools/index.html`, `tools.html` |
| `/tools/calculators/` | Bộ máy tính marketing | 4 form trong 1 trang, nền tối | **MEDIUM** | **REFACTOR** sang Bright Theme V5, giữ nguyên logic toán học chính xác, tối ưu UI/UX | `tools/calculators/index.html` |
| `/tools/growth-check/` | Chẩn đoán tăng trưởng | Form khảo sát 8 nhóm, nền tối | **MEDIUM** | **REFACTOR** sang Bright Theme V5, gắn nhãn Self-Reported minh bạch | `tools/growth-check/index.html` |
| `/tools/utm-qr/` | Tạo UTM & mã QR | Tool client-side hoạt động tốt, nền tối | **LOW** | **REFACTOR** sang Bright Theme V5, giữ nguyên tính năng | `tools/utm-qr/index.html` |
| `/services/` | Dịch vụ tư vấn | 7 dịch vụ theo lối Editorial, nền tối | **MEDIUM** | **REFACTOR** sang Bright Theme V5, căn chỉnh typography Be Vietnam Pro | `services/index.html`, `services.html` |
| `/about/` | Về DNGWORLD | Kể câu chuyện sáng lập, nền tối | **MEDIUM** | **REFACTOR** sang Bright Theme V5, chuẩn hóa thông tin | `about/index.html`, `about.html` |
| `/contact/` | Liên hệ tư vấn | Biểu mẫu liên hệ, nền tối | **LOW** | **REFACTOR** sang Bright Theme V5, tối ưu form validation | `contact/index.html`, `contact.html` |

---

## 2. CÁC ĐIỂM BẮT BUỘC SỬA ĐỔI THEO YÊU CẦU ƯU TIÊN V5

1. **Loại bỏ giao diện tối (`#020807`)**: Chuyển đổi toàn diện sang Bright Theme (`--bg: #FFFFFF; --bg-soft: #F4F8FD; --bg-blue: #EAF3FF; --ink: #15253E; --primary: #2357E8; --mint: #33C9A7;`).
2. **Khắc phục font & typography**: Áp dụng duy nhất `Be Vietnam Pro` (400, 500, 600, 700, 800) cho toàn bộ UI tiếng Việt. Loại bỏ Serif (`Georgia`, `Times New Roman`) khỏi tiêu đề UI tiếng Việt.
3. **Ẩn hoàn toàn Portfolio khỏi website công khai**:
   - Xóa `Work` / `Portfolio` / `Dự án` khỏi Header, Mobile Menu, Homepage, Services, About, Footer, Newsroom.
   - Giữ nguyên các đường dẫn dự án con: `/portfolio/phong-cach-moc/`, `/portfolio/phuc-dai-nam/`, `/portfolio/koi-service/`, `/portfolio/phe-ly/`, `/portfolio/adeva/` với nhãn `noindex, nofollow` để chỉ chia sẻ trực tiếp (direct-link only).
   - Redirect `/portfolio/` và `/portfolio` về `/`.
4. **Tái thiết kế DNG Intelligence thành Newsroom chuyên nghiệp**:
   - Nền sáng, cấu trúc báo chí kinh tế: Featured lead story (2/3) + Đáng chú ý (1/3) + Mới cập nhật + Phân tích chuyên sâu DNG.
   - Loại bỏ dashboard Market Radar số liệu Q3-Q4/2024 chưa có link văn bản chứng minh.
   - Tích hợp bài phân tích thật từ `content/posts/` (AI workflow, Marketing system, Brand trust).
   - Xử lý feed tin: chỉ hiển thị tiêu đề, nguồn, ngày, tóm tắt; tuyệt đối không render raw URL chuỗi dài.
5. **Loại bỏ công cụ chưa kiểm chứng (Roadmap tools)**: Chỉ giữ lại 6 công cụ hoạt động thật: ROAS, Break-even ROAS, CAC, LTV, UTM + QR, và Growth Self-Check.
