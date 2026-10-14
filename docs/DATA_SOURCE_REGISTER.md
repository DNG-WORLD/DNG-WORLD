# DNGWORLD — SỔ ĐĂNG KÝ NGUỒN DỮ LIỆU (DATA SOURCE REGISTER)

**Quy chuẩn áp dụng**: Tuân thủ Luật A2 (Zero Fabrication) của `DNGWORLD_GEMINI_MASTER_PROMPT_V2.md`.  
Mọi dữ liệu hiển thị trên website phải được gắn nhãn phân loại minh bạch.

---

## 1. Bảng phân loại nguồn dữ liệu

| Nhãn phân loại | Định nghĩa | Quy tắc hiển thị |
| :--- | :--- | :--- |
| `VERIFIED` | Dữ liệu thực tế có chứng từ, hồ sơ dự án, API trực tiếp hoặc tệp nguồn đã thẩm định. | Được hiển thị trực tiếp trên giao diện LIVE kèm phạm vi. |
| `CALCULATED` | Dữ liệu được tính từ công thức toán học minh bạch với đầu vào do người dùng cung cấp. | Phải hiển thị rõ công thức, đơn vị, giả định, đầu vào. |
| `SELF_REPORTED`| Dữ liệu người dùng tự kê khai hoặc đánh giá qua bảng hỏi chẩn đoán (Diagnostic). | Bắt buộc ghi chú rõ giới hạn khảo sát, không coi là số liệu kiểm toán. |
| `ESTIMATE` | Ước tính có mô hình và khoảng bất định. | Chỉ hiển thị khi có đầy đủ cơ sở giả định và biên độ sai số. |
| `EXAMPLE / DEMO`| Dữ liệu mẫu dùng để minh họa giao diện hoặc luồng tương tác. | Phải gắn nhãn `DEMO / MINH HỌA` rõ ràng; tuyệt đối không gắn vào tên khách hàng thật. |
| `UNAVAILABLE` | Dữ liệu chưa có nguồn hoặc chưa kết nối hệ thống. | Ẩn số liệu hoặc hiển thị thông báo trạng thái trung thực (Coming Soon / Chưa có dữ liệu). |

---

## 2. Rà soát dữ liệu cụ thể trong hệ thống

### 2.1 Thông tin cá nhân & Thương hiệu
- **Tên**: Dũng Nguyễn (`VERIFIED` - từ hồ sơ tác giả `nguyendhungdung@gmail.com`).
- **Chức danh / Định vị**: Commercial Growth Architect (`VERIFIED` - từ `content/site.json`).
- **Liên hệ**: Email: `nguyendhungdung@gmail.com`, Hotline: `0377348008`, Zalo QR/link: `https://zalo.me/0377348008` (`VERIFIED` - từ `content/site-config.json`).

### 2.2 Case Studies / Khách hàng
- **Danh sách khách hàng thật**:
  - Phong Cách Mộc (`content/portfolio/phong-cach-moc.json`): Ngành Thiết kế & Xây dựng (`VERIFIED`).
  - Phúc Đại Nam (`content/portfolio/phuc-dai-nam.json`): Ngành Xây dựng & Nội thất (`VERIFIED`).
  - Koi Service (`content/portfolio/koi-service.json`): Dịch vụ cá Koi (`VERIFIED`).
  - Adeva Việt Nam (`content/portfolio/adeva.json`): Mỹ phẩm thiên nhiên (`VERIFIED`).
  - Phê Ly Coffee (`content/portfolio/phe-ly.json`): F&B - Coffee shop (`VERIFIED`).
- **Chỉ số tăng trưởng cũ (ROAS 3.2x, +120%,...)**:
  - Trạng thái: `UNVERIFIED` (chưa có chứng từ kiểm toán đính kèm).
  - Hành động: **LOẠI BỎ KHỎI LIVE** theo Luật A2. Thay thế bằng danh mục hạng mục công việc đã triển khai thực tế (Deliverables & Scope).

### 2.3 Công cụ DNG Lab & Calculators
- **ROAS Calculator**: `CALCULATED` (Công thức: `Doanh thu quảng cáo / Chi phí quảng cáo`).
- **Break-even ROAS**: `CALCULATED` (Công thức: `1 / Tỷ suất lợi nhuận biên gộp`).
- **CAC Calculator**: `CALCULATED` (Công thức: `Tổng chi phí tiếp thị & bán hàng / Số khách hàng mới`).
- **LTV Calculator**: `CALCULATED` (Công thức: `Giá trị đơn hàng trung bình × Tần suất mua × Thời gian gắn bó`).
- **DNG Growth Check**: `SELF_REPORTED` (Chẩn đoán dựa trên câu trả lời của doanh nghiệp theo 8 nhóm năng lực cốt lõi).
- **Website Audit Scanner**: `UNAVAILABLE / PLANNED` (Chưa tích hợp crawler server-side an toàn, giữ ở trạng thái lộ trình trung thực).
