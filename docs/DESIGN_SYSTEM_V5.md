# DNGWORLD — HỆ THỐNG THIẾT KẾ SÁNG V5.0 (DESIGN SYSTEM V5.0)

**Art Direction:** `BRIGHT GROWTH EDITORIAL × MODERN STRATEGIC CONSULTANCY × USEFUL TECHNOLOGY`  
**Cảm xúc:** Sáng sủa, tự tin, rõ nét, chuyên môn, thân thiện và trung thực.

---

## 1. TỶ LỆ PHÂN BỔ MÀU SẮC (70 / 20 / 7 / 3)
- **70% Nền sáng:** Nền trắng `#FFFFFF`, `#F4F8FD`, mảng xanh nhạt `#EAF3FF`.
- **20% Nội dung & Chữ đậm:** Mực sẫm `#15253E`, thân chữ `#293A51`, chữ phụ `#52667F`.
- **7% Màu hành động chính:** Xanh dương `#2357E8`, hover `#1946C5`, nền mềm `#E9EFFF`.
- **3% Màu nhấn bổ trợ:** Mint `#33C9A7` (chữ `#087767`), Vàng ấm `#F6B65F`, Đỏ cam `#F77968`.

---

## 2. TOKENS CSS CHUẨN (`assets/css/dng-system.css`)

```css
:root {
  --bg: #FFFFFF;
  --bg-soft: #F4F8FD;
  --bg-blue: #EAF3FF;
  --surface: #FFFFFF;
  --surface-hover: #F8FBFE;
  --ink: #15253E;
  --text: #293A51;
  --muted: #52667F;
  --dim: #7B8F9F;
  --border: #DCE6F1;
  --border-subtle: #E8F0F8;

  --primary: #2357E8;
  --primary-hover: #1946C5;
  --primary-soft: #E9EFFF;

  --mint: #33C9A7;
  --mint-ink: #087767;
  --mint-soft: #E5F9F2;
  --warm-accent: #F6B65F;
  --warm-soft: #FFF7EC;
  --coral-accent: #F77968;
  --coral-soft: #FEEFEF;
  --danger: #B42318;
  --success: #087767;

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-full: 9999px;
  --container: 1240px;
  --reading-width: 740px;
}
```

---

## 3. TYPOGRAPHY & CHUẨN UNICODE TIẾNG VIỆT
- **Font duy nhất cho UI + Tiêu đề + Body:** `Be Vietnam Pro` (400, 500, 600, 700, 800).
- **Tuyệt đối không dùng:** Font Serif (`Georgia`, `Times New Roman`) cho tiêu đề giao diện tiếng Việt.
- **Thử nghiệm ký tự tiếng Việt có dấu:** Đảm bảo hiển thị hoàn hảo ở các chuỗi:
  - `Tăng trưởng bền vững`
  - `Chiến lược & Chuyển đổi`
  - `Đà Nẵng`
  - `Thương mại điện tử`
  - `Quảng cáo đa nền tảng`
  - `Đừng đoán. Hãy kiểm chứng.`
