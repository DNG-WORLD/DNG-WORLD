# DNG LAB — DANH MỤC TRẠNG THÁI CÔNG CỤ & KIỂM THỬ (TOOLS STATUS & TESTS V5.0)

**Nguyên tắc:** Chỉ hiển thị công cụ hoạt động thật (`LIVE`), xử lý client-side chính xác và đã qua kiểm thử biên toán học. Ẩn toàn bộ các công cụ nằm trong lộ trình (`Roadmap`) khỏi danh mục công khai.

---

## 1. BẢNG PHÂN LOẠI CÔNG CỤ CÔNG KHAI

| Tên công cụ | Đường dẫn | Phân loại | Logic toán học / Xử lý | Trạng thái hiển thị |
| :--- | :--- | :--- | :--- | :--- |
| **ROAS Calculator** | `/tools/calculators/#roas` | Tài chính quảng cáo | `Doanh thu / Chi phí ads` | **LIVE (Công khai)** |
| **Break-even ROAS** | `/tools/calculators/#break-even` | Điểm hòa vốn | `1 / Biên lợi nhuận gộp` | **LIVE (Công khai)** |
| **CAC Calculator** | `/tools/calculators/#cac` | Đơn vị kinh tế | `Tổng chi phí / Số khách mới` | **LIVE (Công khai)** |
| **LTV Estimator** | `/tools/calculators/#ltv` | Vòng đời khách hàng | `AOV × Tần suất × Thời gian` | **LIVE (Công khai)** |
| **UTM Builder & QR** | `/tools/utm-qr/` | Đo lường chiến dịch | URLSearchParams + QR Server API | **LIVE (Công khai)** |
| **DNG Growth Self-Check**| `/tools/growth-check/` | Khảo sát chẩn đoán | Điểm trọng số 8 nhóm rubric | **LIVE (Công khai)** |
| *Website Audit* | N/A | Crawl hạ tầng | Chờ backend crawler bảo mật | **ẨN (Roadmap)** |
| *SEO Check* | N/A | Kiểm toán SEO | Chờ engine audit API | **ẨN (Roadmap)** |
| *Ads Health CSV* | N/A | Phân tích file ads | Chờ module parse file an toàn | **ẨN (Roadmap)** |
| *AI Visibility Check* | N/A | Xếp hạng AI | Chờ search ranking API | **ẨN (Roadmap)** |
| *Client OS* | N/A | Nền tảng khách hàng | Chờ hệ thống tài khoản & DB | **ẨN (Roadmap)** |

---

## 2. KẾT QUẢ KIỂM THỬ TOÁN HỌC & TRƯỜNG HỢP BIÊN (EDGE CASES)

- **Chia cho 0 (Division by Zero):**
  - Chi phí ads = 0: Trả về thông báo lỗi yêu cầu chi phí > 0, không sinh `Infinity` hay `NaN`.
  - Biên gộp = 0: Báo lỗi biên gộp phải nằm trong khoảng 1% - 100%.
  - Số khách hàng = 0: Báo lỗi số khách hàng mới phải lớn hơn 0.
- **Số âm (Negative Numbers):** Các trường nhập chặn số âm với thuộc tính `min="0"` / `min="1"`.
- **Đầu vào rỗng / Ký tự lạ:** Form validation HTML5 ngăn chặn submit khi thiếu trường bắt buộc.
