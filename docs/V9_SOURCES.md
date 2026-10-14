# DNGWORLD — V9 DATA SOURCES & EDITORIAL POLICY

**Căn cứ đặc tả:** `DNGWORLD_V9_3D_NEWSROOM_IMPLEMENTATION_SPEC.md` (§5, §6)  
**Mục tiêu:** Xác định danh mục nguồn tin được phê duyệt, tiêu chuẩn phân loại và nguyên tắc bản quyền báo chí.

---

## 1. PHÂN LOẠI 3 DÒNG SẢN PHẨM NỘI DUNG DNG INTELLIGENCE

1. **DNG Newswire (Bản tin chọn lọc thị trường):**
   - Nội dung: Tin tức thời sự kinh tế, công nghệ, thương mại điện tử và tiếp thị từ các đơn vị báo chí chính thống.
   - Thể hiện: Tiêu đề nguyên gốc đã xác thực, tóm tắt ngắn (excerpt <= 180 ký tự), tên nguồn báo rõ ràng, thời gian xuất bản thực tế, link trỏ về bài báo gốc của publisher.
   - Bản quyền: Không sao chép toàn văn, không tự nhận quyền sở hữu bài viết của bên thứ ba.

2. **DNG Briefings (Bản tin phân tích nhanh nội bộ):**
   - Nội dung: Tóm tắt sự kiện trọng điểm do ban biên tập DNGWORLD tổng hợp và bình luận.
   - Cấu trúc: Diễn biến sự kiện + Ý nghĩa đối với doanh nghiệp + 3 điểm hành động cốt lõi + Trích dẫn nguồn dữ liệu.
   - Trải nghiệm: Đọc trực tiếp trên website DNGWORLD.

3. **DNG Perspectives / Playbooks (Ấn phẩm chiến lược chuyên sâu):**
   - Nội dung: Các khung vận hành tăng trưởng, audit phễu, tối ưu CRM, chiến lược giá và đo lường tiếp thị do Dũng Nguyễn và ban chuyên môn DNGWORLD chấp bút.
   - Định dạng: Toàn văn (Full-length read), có bảng biểu, checklist 7 ngày, luận điểm đa góc nhìn.
   - Trải nghiệm: Đọc trực tiếp trên website với chế độ Reader tập trung, chuyển bài liền mạch ("Đọc bài tiếp theo").

---

## 2. DANH SÁCH NGUỒN TIN PHÊ DUYỆT (WHITELISTED SOURCES)

Chỉ chấp nhận các nguồn tin có uy tín và thẩm quyền cao trong các nhóm ngành mục tiêu:
- **Kinh doanh & Thị trường:** VnExpress Kinh Doanh, VietNamNet Kinh Doanh, CafeF, Forbes Vietnam, Financial Times / BBC Business.
- **AI & Công nghệ ứng dụng:** OpenAI Research, Google DeepMind Blog, Microsoft AI, VnExpress Số Hóa, TechCrunch, MIT Technology Review.
- **Marketing, Quảng cáo & TMĐT:** Marketing Dive, Search Engine Land, Adweek, Shopee/TikTok Shop Updates, Brands Vietnam.

### Tiêu chí loại bỏ nghiêm ngặt (Exclusion Filter)
- ❌ Tuyệt đối loại bỏ: Tin giải trí, showbiz, bóng đá, thể thao, tin giật gân, chính trị ngoài lề, tin y tế không có căn cứ.
- ❌ Loại bỏ các tiêu đề clickbait, thông tin sai lệch hoặc không có dữ liệu đối chứng.

---

## 3. TIÊU CHUẨN XÁC MINH DỮ LIỆU & BẢN QUYỀN HÌNH ẢNH

- **Thời gian thực:** Giữ nguyên mốc thời gian xuất bản gốc (`originalPublishedAtISO`), tuyệt đối không dùng thời điểm crawler chạy (`fetchedAtISO`) để giả mạo thời gian xuất bản.
- **Hình ảnh:** Ưu tiên ảnh chính thức được cấp phép hoặc đồ họa editorial chuẩn thương hiệu DNG. Khi nguồn ngoài không có ảnh hoặc cấm hotlink, hệ thống tự động sử dụng editorial graphic chuyên mục tương ứng kèm nhãn minh họa rõ ràng.
- **Quy tắc không bịa đặt (Zero Fabrication):** Không tự tạo tin giả, không bịa đặt số liệu thống kê hoặc chỉ số % tăng trưởng không có nguồn kiểm chứng.
