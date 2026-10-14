/**
 * DNGWORLD DNG Lab — Interactive Client-Side Tools Engine (V5.0 Bright Theme)
 * Implements: Growth Self-Check Diagnostic, Marketing Calculators, UTM & QR Generator
 * Complies with ZERO FABRICATION & Mathematical Rigor
 */

(() => {
  'use strict';

  // --- 1. DNG GROWTH SELF-CHECK ENGINE ---
  const initGrowthCheck = () => {
    const form = document.getElementById('growthCheckForm');
    const resultContainer = document.getElementById('growthCheckResult');
    if (!form || !resultContainer) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);

      // 8 Core Pillars (Scale 1 to 5 per pillar)
      const pillars = [
        { id: 'business', name: 'Định vị & Giá trị (Business & Offer)', weight: 1.2 },
        { id: 'website', name: 'Trang đích & CRO (Website & CRO)', weight: 1.0 },
        { id: 'marketing', name: 'Chiến lược tiếp thị (Marketing Ops)', weight: 1.1 },
        { id: 'advertising', name: 'Quảng cáo đa kênh (Paid Media)', weight: 1.0 },
        { id: 'content', name: 'Nội dung định vị (Content & Authority)', weight: 0.9 },
        { id: 'conversion', name: 'Quản trị cơ hội (Conversion & CRM)', weight: 1.2 },
        { id: 'retention', name: 'Chăm sóc sau mua (Retention & LTV)', weight: 1.0 },
        { id: 'ai', name: 'Sẵn sàng AI (AI & Automation)', weight: 0.8 },
      ];

      let totalWeightedScore = 0;
      let totalMaxWeight = 0;
      const scores = [];

      pillars.forEach((p) => {
        const val = parseInt(formData.get(p.id) || '1', 10);
        const normVal = Math.max(1, Math.min(5, isNaN(val) ? 1 : val));
        const pillarScorePercent = (normVal / 5) * 100;
        totalWeightedScore += pillarScorePercent * p.weight;
        totalMaxWeight += 100 * p.weight;
        scores.push({ ...p, score: Math.round(pillarScorePercent), raw: normVal });
      });

      const finalScore = Math.round((totalWeightedScore / totalMaxWeight) * 100);

      // Sort to identify biggest problems and opportunities
      const sortedByScore = [...scores].sort((a, b) => a.score - b.score);
      const biggestProblems = sortedByScore.slice(0, 3);
      const biggestOpportunities = [...sortedByScore].reverse().slice(0, 3);

      // Priority calculation
      let priority = 'Trung bình';
      let priorityColor = '#925805';
      let priorityBg = 'var(--warm-soft)';
      if (finalScore < 45) {
        priority = 'Rất cao (Khẩn cấp)';
        priorityColor = 'var(--danger)';
        priorityBg = 'var(--coral-soft)';
      } else if (finalScore < 70) {
        priority = 'Cần ưu tiên xử lý';
        priorityColor = 'var(--primary)';
        priorityBg = 'var(--primary-soft)';
      } else {
        priority = 'Duy trì & Mở rộng';
        priorityColor = 'var(--mint-ink)';
        priorityBg = 'var(--mint-soft)';
      }

      // Problem-specific recommendations
      const recommendations = {
        business: 'Làm rõ định vị giá trị khác biệt và tinh gọn danh mục dịch vụ/sản phẩm cốt lõi trước khi tăng chi tiêu quảng cáo.',
        website: 'Tối ưu lại thông điệp trên Hero section và hành trình điều hướng để giảm ma sát nhận thức của khách hàng.',
        marketing: 'Thiết lập nhịp vận hành nội dung có kế hoạch đo lường thay vì triển khai các chiến dịch phân tán.',
        advertising: 'Rà soát cấu trúc chiến dịch quảng cáo và chi phí chuyển đổi thực tế; tránh dàn trải ngân sách.',
        content: 'Xây dựng trụ cột nội dung dựa trên bằng chứng chuyên môn và bài toán thực tế của khách hàng mục tiêu.',
        conversion: 'Thiết lập hệ thống tracking chuyển đổi và quy trình phân loại lead vào CRM trước khi mở rộng phễu.',
        retention: 'Chuẩn hóa quy trình chăm sóc khách hàng sau mua và kịch bản upsell/referral.',
        ai: 'Tự động hóa các tác vụ nghiên cứu thị trường, tóm tắt dữ liệu và soạn thảo sơ bộ bằng AI workflows.'
      };

      const dontDoYetMap = {
        business: 'Không nên chi tiêu ngân sách lớn cho quảng cáo nhận diện khi offer chưa rõ ràng.',
        conversion: 'Không nên vội vã đổ ngân sách vào tìm kiếm khách hàng mới khi tỷ lệ rớt lead còn cao.',
        ai: 'Không nên triển khai các giải pháp AI phức tạp tốn kém trước khi dữ liệu và quy trình nội bộ được chuẩn hóa.',
      };

      // Render Result (Bright V5 Design)
      resultContainer.innerHTML = `
        <div class="dng-card featured" style="margin-top: 36px; border: 1px solid var(--border);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
            <div>
              <span class="status-badge self-reported" style="margin-bottom: 8px;">Dữ liệu: Tự đánh giá (Self-Reported)</span>
              <h3 style="font-size: 24px; margin-top: 6px;">Báo Cáo Chẩn Đoán Sức Khỏe Tăng Trưởng</h3>
              <p style="color: var(--muted); font-size: 13px;">Tính toán minh bạch từ 8 nhóm năng lực do bạn tự đánh giá.</p>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 40px; font-weight: 800; color: var(--primary); font-family: var(--font-mono); line-height: 1;">
                ${finalScore}<span style="font-size: 20px; color: var(--muted);">/100</span>
              </div>
              <div style="margin-top: 6px;">
                <span class="status-badge" style="background: ${priorityBg}; color: ${priorityColor}; border-color: transparent;">
                  Mức ưu tiên: ${priority}
                </span>
              </div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 30px; padding: 18px; background: var(--bg-soft); border-radius: var(--radius-sm); border: 1px solid var(--border);">
            ${scores.map(s => `
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                  <span style="color: var(--muted);">${s.name.split('(')[0]}</span>
                  <span style="font-weight: 700; color: var(--ink);">${s.score}%</span>
                </div>
                <div style="height: 6px; background: #E2EAF4; border-radius: 3px; overflow: hidden;">
                  <div style="width: ${s.score}%; height: 100%; background: ${s.score < 45 ? 'var(--danger)' : s.score < 70 ? 'var(--warm-accent)' : 'var(--mint)'}; border-radius: 3px;"></div>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="grid-2" style="margin-bottom: 28px;">
            <div style="padding: 18px; background: var(--coral-soft); border: 1px solid rgba(247, 121, 104, 0.3); border-radius: var(--radius-sm);">
              <h4 style="color: var(--danger); font-size: 14px; font-weight: 700; text-transform: uppercase; margin-bottom: 10px;">3 Điểm Nghẽn Lớn Nhất</h4>
              <ul style="padding-left: 18px; font-size: 13px; color: var(--ink); line-height: 1.65;">
                ${biggestProblems.map(p => `<li><strong>${p.name.split('(')[0]}</strong> (${p.score}%): ${recommendations[p.id]}</li>`).join('')}
              </ul>
            </div>

            <div style="padding: 18px; background: var(--mint-soft); border: 1px solid rgba(51, 201, 167, 0.3); border-radius: var(--radius-sm);">
              <h4 style="color: var(--mint-ink); font-size: 14px; font-weight: 700; text-transform: uppercase; margin-bottom: 10px;">3 Cơ Hội Bứt Phá Nhanh Nhất</h4>
              <ul style="padding-left: 18px; font-size: 13px; color: var(--ink); line-height: 1.65;">
                ${biggestOpportunities.map(p => `<li><strong>${p.name.split('(')[0]}</strong> (${p.score}%): Tận dụng nền tảng hiện có để nhân rộng quy mô.</li>`).join('')}
              </ul>
            </div>
          </div>

          <div style="padding: 16px 20px; background: var(--warm-soft); border: 1px solid rgba(246, 182, 95, 0.35); border-radius: var(--radius-sm); margin-bottom: 24px;">
            <strong style="color: #925805; font-size: 13px; text-transform: uppercase;">Những việc chưa nên làm ngay (Don't Do Yet):</strong>
            <p style="font-size: 13px; color: var(--text); margin-top: 6px;">
              ${dontDoYetMap[biggestProblems[0].id] || 'Tập trung giải quyết 3 điểm nghẽn chính trước khi mở rộng thêm các kênh quảng cáo mới.'}
            </p>
          </div>

          <div style="display: flex; gap: 14px; flex-wrap: wrap;">
            <a href="/contact/?diagnostic=${finalScore}" class="btn btn-sm">Trao đổi cùng DNGWORLD về kết quả này →</a>
            <button type="button" class="btn btn-outline btn-sm" onclick="window.print()">In / Lưu kết quả</button>
          </div>
        </div>
      `;

      resultContainer.scrollIntoView({ behavior: 'smooth' });
    });
  };

  // --- 2. MARKETING CALCULATORS ---
  const initCalculators = () => {
    // 2.1 ROAS Calculator
    const roasForm = document.getElementById('calcRoasForm');
    if (roasForm) {
      roasForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const spend = parseFloat(document.getElementById('roasSpend').value);
        const revenue = parseFloat(document.getElementById('roasRevenue').value);
        const resEl = document.getElementById('roasResult');

        if (isNaN(spend) || isNaN(revenue) || spend <= 0 || revenue < 0) {
          resEl.innerHTML = '<div style="color:var(--danger); margin-top:12px; font-size:13px;">Vui lòng nhập chi phí quảng cáo lớn hơn 0 và doanh thu hợp lệ.</div>';
          return;
        }

        const roas = revenue / spend;
        const roasPercent = (roas * 100).toFixed(0);

        resEl.innerHTML = `
          <div style="margin-top:18px; padding:18px; background:var(--bg-soft); border-left:4px solid var(--primary); border-radius:var(--radius-sm); border:1px solid var(--border);">
            <div style="font-size:12px; color:var(--muted); text-transform:uppercase; font-weight:600;">Kết quả ROAS thực tế:</div>
            <div style="font-size:32px; font-weight:800; color:var(--primary); font-family:var(--font-mono); margin:4px 0;">
              ${roas.toFixed(2)}x <span style="font-size:16px; color:var(--muted);">(${roasPercent}%)</span>
            </div>
            <p style="font-size:13px; color:var(--text); line-height:1.5;">
              Với mỗi 1 VNĐ chi tiêu cho quảng cáo, bạn tạo ra <strong>${roas.toFixed(2)} VNĐ</strong> doanh thu.
            </p>
          </div>
        `;
      });
    }

    // 2.2 Break-even ROAS Calculator
    const beForm = document.getElementById('calcBreakEvenForm');
    if (beForm) {
      beForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const marginPercent = parseFloat(document.getElementById('beMargin').value);
        const resEl = document.getElementById('beResult');

        if (isNaN(marginPercent) || marginPercent <= 0 || marginPercent > 100) {
          resEl.innerHTML = '<div style="color:var(--danger); margin-top:12px; font-size:13px;">Vui lòng nhập tỷ suất biên lợi nhuận gộp trong khoảng từ 1% đến 100%.</div>';
          return;
        }

        const marginRatio = marginPercent / 100;
        const beRoas = 1 / marginRatio;

        resEl.innerHTML = `
          <div style="margin-top:18px; padding:18px; background:var(--bg-soft); border-left:4px solid var(--warm-accent); border-radius:var(--radius-sm); border:1px solid var(--border);">
            <div style="font-size:12px; color:var(--muted); text-transform:uppercase; font-weight:600;">Ngưỡng hòa vốn tối thiểu (Break-even ROAS):</div>
            <div style="font-size:32px; font-weight:800; color:#925805; font-family:var(--font-mono); margin:4px 0;">
              ${beRoas.toFixed(2)}x
            </div>
            <p style="font-size:13px; color:var(--text); line-height:1.5;">
              Chiến dịch bắt buộc phải đạt ROAS tối thiểu <strong>${beRoas.toFixed(2)}x</strong> để không bị lỗ trên biến phí sản phẩm (với biên lợi nhuận gộp ${marginPercent}%).
            </p>
          </div>
        `;
      });
    }

    // 2.3 CAC Calculator
    const cacForm = document.getElementById('calcCacForm');
    if (cacForm) {
      cacForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const cost = parseFloat(document.getElementById('cacCost').value);
        const customers = parseInt(document.getElementById('cacCustomers').value, 10);
        const resEl = document.getElementById('cacResult');

        if (isNaN(cost) || isNaN(customers) || cost < 0 || customers <= 0) {
          resEl.innerHTML = '<div style="color:var(--danger); margin-top:12px; font-size:13px;">Vui lòng nhập số khách hàng mới lớn hơn 0 và chi phí hợp lệ.</div>';
          return;
        }

        const cac = cost / customers;

        resEl.innerHTML = `
          <div style="margin-top:18px; padding:18px; background:var(--bg-soft); border-left:4px solid var(--mint); border-radius:var(--radius-sm); border:1px solid var(--border);">
            <div style="font-size:12px; color:var(--muted); text-transform:uppercase; font-weight:600;">Chi phí thu hút 1 khách hàng mới (CAC):</div>
            <div style="font-size:30px; font-weight:800; color:var(--mint-ink); font-family:var(--font-mono); margin:4px 0;">
              ${Math.round(cac).toLocaleString('vi-VN')} VNĐ
            </div>
            <p style="font-size:13px; color:var(--text); line-height:1.5;">
              Doanh nghiệp bỏ ra trung bình <strong>${Math.round(cac).toLocaleString('vi-VN')} VNĐ</strong> chi phí tiếp thị & bán hàng để có được 1 khách hàng mới trong kỳ.
            </p>
          </div>
        `;
      });
    }

    // 2.4 LTV Calculator
    const ltvForm = document.getElementById('calcLtvForm');
    if (ltvForm) {
      ltvForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const aov = parseFloat(document.getElementById('ltvAov').value);
        const frequency = parseFloat(document.getElementById('ltvFrequency').value);
        const lifespan = parseFloat(document.getElementById('ltvLifespan').value);
        const resEl = document.getElementById('ltvResult');

        if (isNaN(aov) || isNaN(frequency) || isNaN(lifespan) || aov <= 0 || frequency <= 0 || lifespan <= 0) {
          resEl.innerHTML = '<div style="color:var(--danger); margin-top:12px; font-size:13px;">Vui lòng nhập các giá trị dương hợp lệ.</div>';
          return;
        }

        const ltv = aov * frequency * lifespan;

        resEl.innerHTML = `
          <div style="margin-top:18px; padding:18px; background:var(--bg-soft); border-left:4px solid var(--primary); border-radius:var(--radius-sm); border:1px solid var(--border);">
            <div style="font-size:12px; color:var(--muted); text-transform:uppercase; font-weight:600;">Giá trị vòng đời khách hàng (LTV):</div>
            <div style="font-size:30px; font-weight:800; color:var(--primary); font-family:var(--font-mono); margin:4px 0;">
              ${Math.round(ltv).toLocaleString('vi-VN')} VNĐ
            </div>
            <p style="font-size:13px; color:var(--text); line-height:1.5;">
              Công thức: Đơn trung bình (${Math.round(aov).toLocaleString('vi-VN')} VNĐ) × ${frequency} lần/năm × ${lifespan} năm gắn bó.
            </p>
          </div>
        `;
      });
    }
  };

  // --- 3. UTM BUILDER & QR GENERATOR ---
  const initUtmQr = () => {
    const form = document.getElementById('utmForm');
    const resultBox = document.getElementById('utmResult');
    if (!form || !resultBox) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const base = document.getElementById('utmBase').value.trim();
      const source = document.getElementById('utmSource').value.trim();
      const medium = document.getElementById('utmMedium').value.trim();
      const campaign = document.getElementById('utmCampaign').value.trim();
      const content = document.getElementById('utmContent')?.value.trim();

      if (!base) return;

      try {
        const url = new URL(base.startsWith('http') ? base : `https://${base}`);
        if (source) url.searchParams.set('utm_source', source);
        if (medium) url.searchParams.set('utm_medium', medium);
        if (campaign) url.searchParams.set('utm_campaign', campaign);
        if (content) url.searchParams.set('utm_content', content);

        const fullUrl = url.toString();

        resultBox.innerHTML = `
          <div style="margin-top: 24px; padding: 24px; background: var(--bg-soft); border: 1px solid var(--border); border-radius: var(--radius-sm);">
            <label class="form-label" style="font-weight: 700;">Liên kết chiến dịch hoàn chỉnh (Tracking URL):</label>
            <div style="display:flex; gap:10px; margin-bottom:18px;">
              <input type="text" class="form-input" id="finalUtmUrl" value="${fullUrl}" readonly style="font-family:var(--font-mono); font-size:12px; background:#FFFFFF;">
              <button type="button" class="btn btn-sm" id="copyUtmBtn" style="white-space:nowrap;">Sao chép</button>
            </div>

            <div style="display:flex; align-items:center; gap:20px; flex-wrap:wrap; margin-top:16px; padding-top:16px; border-top:1px solid var(--border);">
              <div style="background:#FFFFFF; padding:10px; border-radius:8px; border:1px solid var(--border); display:inline-block;">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${encodeURIComponent(fullUrl)}" alt="QR Code" style="width:130px; height:130px;" loading="lazy">
              </div>
              <div>
                <strong style="color:var(--ink); display:block; margin-bottom:4px; font-size:14px;">Mã QR Tương Ứng</strong>
                <p style="font-size:13px; color:var(--muted); max-width:320px; line-height:1.5;">
                  Quét bằng điện thoại để kiểm tra trực tiếp liên kết kèm tham số đo lường.
                </p>
                <a href="https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(fullUrl)}" download="dng-utm-qr.png" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="margin-top:8px;">Tải Ảnh QR ↗</a>
              </div>
            </div>
          </div>
        `;

        document.getElementById('copyUtmBtn')?.addEventListener('click', () => {
          const input = document.getElementById('finalUtmUrl');
          input.select();
          navigator.clipboard.writeText(fullUrl).then(() => {
            const btn = document.getElementById('copyUtmBtn');
            btn.textContent = 'Đã chép!';
            setTimeout(() => { btn.textContent = 'Sao chép'; }, 2000);
          });
        });
      } catch (err) {
        resultBox.innerHTML = '<div style="color:var(--danger); margin-top:12px; font-size:13px;">URL cơ sở không hợp lệ. Vui lòng nhập định dạng chuẩn (ví dụ: https://dngworld.com/landing).</div>';
      }
    });
  };

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    initGrowthCheck();
    initCalculators();
    initUtmQr();
  });
})();
