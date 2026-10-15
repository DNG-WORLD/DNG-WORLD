/* V47 / outcome-oriented Solutions page, generated HTML only.
 * Five service groups; six concrete buyer symptoms; one worked-example.
 * No fake case results or changed source HTML, pricing, or 3D geometry.
 */
import fs from 'node:fs';import path from 'node:path';
const root=path.resolve('_site');
const P={
vi:{
 eyebrow:'DNGWORLD / GIẢI PHÁP THỰC THI',
 h1:'Marketing đang tốn tiền.<br><em>Vấn đề thật nằm ở đâu?</em>',
 intro:'Có lượt xem nhưng ít người hỏi? Có tin nhắn nhưng không chốt được đơn? Không rõ quảng cáo sai, nội dung yếu hay quy trình bán hàng bị đứt? Chúng tôi bắt đầu bằng dữ liệu và tình huống của bạn, không bắt đầu bằng việc bán thêm gói dịch vụ.',
 cta:'Tìm vấn đề cần xử lý',pricing:'Xem 5 nhóm dịch vụ',note:'Chẩn đoán trước khi báo phạm vi · Không đưa cam kết doanh số thiếu dữ liệu',
 section:'01 / VẤN ĐỀ DOANH NGHIỆP ĐANG GẶP',sectionTitle:'Chọn đúng nút thắt, không mua nhầm dịch vụ.',sectionLead:'Những tình huống dưới đây là dấu hiệu để điều tra, không phải kết luận sẵn về doanh nghiệp của bạn.',
 symptom:'Biểu hiện',verify:'Cách kiểm tra',deliver:'Kết quả bàn giao',scope:'Xem phạm vi',
 cases:[
 ['Có nhiều tin nhắn, nhưng không ra đơn','Inbox tăng nhưng sale khó gọi lại, khách hỏi giá rồi im lặng, khó phân biệt khách thật và khách tò mò.','Kiểm tra thời gian phản hồi, mẫu hội thoại, nguồn lead, trùng lặp, vùng địa lý và lý do không chốt.','Bảng phân loại lead, funnel từ tin nhắn đến cơ hội bán, UTM/source map và kế hoạch cải thiện điểm rơi.','ads'],
 ['Chi phí quảng cáo tăng nhưng chưa rõ nguyên nhân','Báo cáo Ads cho thấy chi tiêu tăng; dữ liệu đơn hàng, khách chất lượng hoặc chuyển đổi chưa tương xứng.','Đối chiếu pixel/GA4, cấu trúc chiến dịch, phân bổ ngân sách, creative fatigue và chất lượng tracking.','Bảng đối soát event, baseline CPL/CPA hợp lệ, ma trận thử nghiệm và dashboard báo cáo tuần.','ads'],
 ['Nội dung và hình ảnh không tạo niềm tin','Video mỗi kiểu, thiết kế thiếu nhận diện, khách chưa hiểu sản phẩm khác đối thủ ở điểm nào.','Audit các điểm chạm từ quảng cáo, fanpage, website đến sales deck; xác định thông điệp theo nhóm khách.','Creative direction, key visual, danh mục asset, storyboard/shot list và checklist nghiệm thu media.','design-editor'],
 ['Công việc marketing không có người chịu trách nhiệm','Agency, freelancer và sales làm riêng; người điều hành phải tự nhắc việc, không có một bảng KPI chung.','Lập sơ đồ quy trình, phân quyền, đầu mối phê duyệt, lịch sản xuất và chất lượng báo cáo hiện có.','RACI, lịch triển khai tuần/tháng, dashboard đầu việc, lịch review và biên bản quyết định.','remote-marketing'],
 ['Muốn mở thị trường nhưng không biết ưu tiên gì','Nhiều kênh và ý tưởng nhưng ngân sách có hạn; chưa rõ nhóm khách, khu vực và giá trị khác biệt.','Phân tích phân khúc, lợi nhuận đơn vị, kênh bán, đối thủ và dữ liệu khách hàng hiện có.','Báo cáo chẩn đoán thương mại, giả thuyết cần thử, thứ tự ưu tiên và roadmap 90 ngày đề xuất.','business-strategy'],
 ['Đội ngũ muốn tự vận hành nhưng thiếu phương pháp','Nhân viên biết đăng bài/chạy Ads cơ bản, nhưng phụ thuộc bên ngoài ở tracking, tối ưu và báo cáo.','Đánh giá kỹ năng trên tài khoản và bài tập thực tế theo từng vai trò.','Giáo trình theo mục tiêu, workshop thực hành, bộ mẫu báo cáo, checklist và phần nghiệm thu năng lực.','courses']
 ],
 caseTag:'02 / VÍ DỤ MINH HỌA QUY TRÌNH',caseTitle:'Một doanh nghiệp bán máy công nghiệp nhận lead từ nhiều kênh.',caseLead:'Đây là **tình huống minh họa phương pháp**, không phải một case study hay kết quả đã đạt của khách hàng DNGWORLD.',
 steps:[['Thu dữ liệu đúng','Đối chiếu nguồn Facebook/Google/website, mã UTM, vùng địa lý và trạng thái liên hệ trong CRM hoặc sheet.'],['Tách lead có giá trị','Phân loại khách hỏi giá, cần catalogue, cần tư vấn máy, đã báo giá, không phù hợp và lý do thất bại.'],['Tìm điểm thất thoát','So sánh chất lượng lead theo kênh với tốc độ phản hồi, quy trình sale và nội dung quảng cáo.'],['Thiết kế lần thử tiếp theo','Đề xuất thay đổi thông điệp, landing, bộ câu hỏi sàng lọc, ngân sách test và mẫu báo cáo định kỳ.']],
 handoffTitle:'Các file khách hàng có thể nhận',handoff:['Lead status & nguồn khách','Sơ đồ phễu chuyển đổi','Quy tắc UTM và tracking','Kế hoạch thử nghiệm','Dashboard đối soát Ads–Sales','SOP bàn giao lead'],
 catalogTag:'03 / DỊCH VỤ VÀ ĐẦU RA',catalogTitle:'Bạn thực sự đang mua và nhận được gì?',catalogLead:'Năm nhóm dịch vụ có ranh giới rõ. Đầu ra thực tế, số lượng và thời gian sẽ được chốt trong Scope of Work (SOW), không suy đoán khi chưa có brief.',
 catalog:[
 ['courses','Đào tạo Marketing','Kiểm tra năng lực đầu vào, dạy trên tình huống, thực hành trực tiếp.','Kế hoạch học, bài tập, checklist, file hướng dẫn và bài kiểm tra bàn giao.'],
 ['ads','Quản trị quảng cáo đa nền tảng','Audit tracking, thiết kế chiến dịch, phối hợp sale và đánh giá chất lượng lead.','Media plan, campaign structure, tracking sheet, báo cáo và log tối ưu.'],
 ['design-editor','Design & Video Editor','Chốt brief, thông điệp, nhận diện, chất liệu truyền thông và phạm vi sản xuất.','Key visual, file thiết kế/video theo brief, source bàn giao theo thỏa thuận và checklist QC.'],
 ['remote-marketing','Quản trị Marketing từ xa','Nhận vai trò điều phối marketing trong phạm vi thống nhất; theo dõi nhóm triển khai.','Kế hoạch, owner matrix, lịch review, dashboard và báo cáo hành động.'],
 ['business-strategy','Tư vấn & định hướng doanh nghiệp','Phân tích bài toán doanh thu, định vị, kênh, nguồn lực và thứ tự thử nghiệm.','Diagnostic, decision memo, ưu tiên, roadmap và kế hoạch thử nghiệm có tiêu chí.']
 ],
 priceLink:'Xem phạm vi và bảng giá',fine:'Ngân sách Ads, phí nền tảng, đi lại, talent và các hạng mục ngoài SOW được xác nhận riêng. Không sử dụng số liệu thành công không có chứng cứ.',
 processTag:'04 / CÁCH HỢP TÁC',processTitle:'Mỗi bước đều có thứ để kiểm tra.',process:[['01','Brief & kiểm chứng','Hiểu mục tiêu, tình trạng dữ liệu, trách nhiệm và điều kiện khả thi.'],['02','Chốt Scope of Work','Thống nhất đầu ra, timeline, số lần sửa, phụ thuộc, nghiệm thu và chi phí.'],['03','Triển khai & đo lường','Làm theo kế hoạch, cập nhật vấn đề và kiểm tra tín hiệu với bộ dữ liệu đã xác nhận.'],['04','Bàn giao & ưu tiên tiếp','Chuyển giao file, quyền, hướng dẫn và các quyết định cần thực hiện tiếp.']],
 bottomTitle:'Bạn không cần mua tất cả. Hãy nói rõ vấn đề lớn nhất.',bottomLead:'Gửi sản phẩm/dịch vụ, khu vực bán, kênh đang chạy và mục tiêu. DNGWORLD sẽ trao đổi để xác định phần cần kiểm tra trước khi báo giá.',bottomCta:'Trao đổi bài toán'
},
en:{
 eyebrow:'DNGWORLD / PRACTICAL SOLUTIONS',h1:'Marketing costs money.<br><em>Where is it leaking value?</em>',intro:'Views without enquiries? Messages without sales? Unclear if advertising, creative or sales operations are the bottleneck? We start with evidence and your business context, not an upsell.',
 cta:'Identify the bottleneck',pricing:'Explore five service lines',note:'Diagnose before scoping · No unsupported revenue guarantees',
 section:'01 / RECOGNIZABLE BUSINESS PROBLEMS',sectionTitle:'Fix the right constraint. Buy only what is needed.',sectionLead:'These are diagnostic starting points, not a pre-made conclusion about your business.',symptom:'What you see',verify:'How we verify',deliver:'What you receive',scope:'View scope',
 cases:[
 ['Lots of messages, few closed deals','Enquiries rise while sales cannot follow up or distinguish fit from curiosity.','Check response speed, lead conversations, channel/source, duplicate leads and lost-sale reasons.','Lead qualification matrix, message-to-opportunity funnel, source tracking map and improvement priorities.','ads'],
 ['Ad costs increase without an explanation','Spend increases but reliable qualified-lead or order measurements are missing.','Reconcile pixels/GA4, campaign structure, budgets, creative fatigue and event quality.','Event QA register, valid CPL/CPA baseline, testing matrix and weekly performance dashboard.','ads'],
 ['Creative assets are inconsistent','Videos and designs feel disconnected; buyers struggle to understand differentiation.','Audit the ad-to-site-to-sales journey, message hierarchy and buyer segments.','Creative direction, key visuals, asset list, video shot list and quality-acceptance checklist.','design-editor'],
 ['Marketing lacks one accountable owner','Sales, freelancers and vendors work separately without a common view of results.','Map responsibilities, approvals, production cadence and reporting quality.','RACI, weekly plan, ownership board, review cadence and decision logs.','remote-marketing'],
 ['Market expansion priorities are unclear','Limited budget faces too many channels, regions and product opportunities.','Analyze segments, unit economics, current customer evidence and channels.','Commercial diagnostic, hypotheses, priority matrix and proposed 90-day roadmap.','business-strategy'],
 ['The internal team wants real independence','The team posts content and runs basic ads but depends on vendors for tracking and evaluation.','Assess actual account skills and work samples by role.','Role-based curriculum, practical workshops, checklists, templates and capability assessment.','courses']
 ],
 caseTag:'02 / WORKED EXAMPLE — NOT A CASE STUDY',caseTitle:'An industrial machinery business collects enquiries from several channels.',caseLead:'Illustrative working method only; no fabricated customer results or claimed DNGWORLD case outcomes.',
 steps:[['Collect usable source data','Join Meta/Google/website enquiries with UTM, region and pipeline status.'],['Qualify the demand','Separate pricing requests, specs, quotations, irrelevant contacts and loss reasons.'],['Trace the leak','Relate channel quality to sales response speed and campaign message.'],['Design the next test','Propose message, landing page, lead form, budget test and reporting changes.']],
 handoffTitle:'Example of practical artifacts',handoff:['Lead-source status table','Conversion funnel map','UTM/tracking specification','Campaign test plan','Ads-to-Sales review dashboard','Sales handoff SOP'],
 catalogTag:'03 / SERVICES AND ARTIFACTS',catalogTitle:'Know what you are buying — and receiving.',catalogLead:'Five clear service lines. The final quantities, scope and duration are confirmed in a written Statement of Work.',
 catalog:[
 ['courses','Marketing training','Role-based training with real account exercises.','Curriculum, assignments, templates and competency checks.'],
 ['ads','Multi-platform advertising','Audit tracking, structure campaigns and assess qualified demand.','Media plan, campaign structure, tracking sheet, reports and optimization log.'],
 ['design-editor','Design & video production','Align brief, messaging and production specifications.','Agreed creative assets, source files as scoped and review checklist.'],
 ['remote-marketing','Remote marketing management','Coordinate marketing deliverables and reporting within agreed responsibilities.','Work plan, RACI, recurring reviews and action reporting.'],
 ['business-strategy','Business strategy consulting','Assess commercial constraints and sequence experiments.','Diagnostic report, decision memo, roadmap and validation priorities.']
 ],priceLink:'Review scope & price',fine:'Media spend, third-party tools, talent, travel and out-of-scope items are separate. No invented success metrics.',
 processTag:'04 / ENGAGEMENT',processTitle:'A verifiable step at every stage.',process:[['01','Brief & evidence','Clarify goals, data and practical constraints.'],['02','Agree the SOW','Specify artifacts, revisions, dependencies, timeline and costs.'],['03','Execute & review','Implement, track and check against agreed sources.'],['04','Handover & next steps','Transfer deliverables, ownership and decisions.']],
 bottomTitle:'You may not need every service. Start with the hardest problem.',bottomLead:'Share your product, markets, channels and growth goal so we can scope a useful conversation.',bottomCta:'Discuss my challenge'
},
zh:{
 eyebrow:'DNGWORLD / 实用商业解决方案',h1:'营销在花钱。<br><em>价值流失在哪一步？</em>',intro:'有浏览却没询盘？有消息却难成交？问题来自广告、创意还是销售流程？我们先检查业务与数据，再确定服务范围。',
 cta:'识别业务瓶颈',pricing:'查看五类服务',note:'先诊断再确认范围 · 不做缺乏依据的收益承诺',
 section:'01 / 常见商业问题',sectionTitle:'解决真正的问题，不购买多余服务。',sectionLead:'以下是可调查的业务信号，而非对您公司的预设结论。',symptom:'问题表现',verify:'如何检查',deliver:'具体交付',scope:'查看范围',
 cases:[
 ['询盘多，但成交少','咨询量上升，销售跟进不足，无法识别有效客户。','检查响应时间、会话质量、来源、重复线索与丢单原因。','线索分类表、转化漏斗、UTM来源表与改善计划。','ads'],
 ['广告成本增加但原因不清','预算上升，合格线索或成交数据却不可靠。','核对像素/GA4、活动结构、创意疲劳和事件数据。','事件校验表、成本基线、测试矩阵和周报看板。','ads'],
 ['素材缺乏统一性','广告、视频、网站与销售资料缺乏一致的信息与视觉。','检查品牌定位、购买理由和整个客户旅程。','创意方向、主视觉、素材清单、视频分镜与验收清单。','design-editor'],
 ['营销工作没有统一负责人','销售、外包与内部人员各自执行，缺少责任归属。','梳理岗位、审批、生产安排和数据报告。','RACI、每周计划、任务管理、评审节奏与决策记录。','remote-marketing'],
 ['拓展市场的优先级不明','区域、产品与渠道选择多，但资源有限。','分析分群、单元经济模型、客户证据及现有渠道。','商业诊断、假设矩阵、优先级和90天计划建议。','business-strategy'],
 ['内部团队希望独立运营','团队会操作基础工具，但缺少数据追踪与优化方法。','按岗位检查账户实际操作能力。','学习方案、实践培训、模板、清单和能力评估。','courses']
 ],
 caseTag:'02 / 工作示例（非真实案例）',caseTitle:'一家工业设备企业从多个渠道收到询盘。',caseLead:'以下仅说明诊断方法，不代表已完成的客户项目或实际经营成果。',
 steps:[['整合来源数据','汇总Meta/Google/网站询盘、UTM、区域及销售状态。'],['区分有效客户','识别询价、参数咨询、已报价、不符合条件及丢单原因。'],['找到问题环节','结合渠道质量、销售响应速度和广告内容进行对照。'],['设计下一轮测试','提出内容、落地页、表单、预算和数据报告的改进建议。']],
 handoffTitle:'可能交付的实际文件',handoff:['线索来源状态表','转化漏斗图','UTM与追踪规范','广告测试方案','广告—销售看板','销售交接SOP'],
 catalogTag:'03 / 服务及交付',catalogTitle:'明确您购买和收到的内容。',catalogLead:'五类服务均有清晰范围，最终数量与时间以双方确认的工作说明书为准。',
 catalog:[
 ['courses','营销培训','按岗位使用实际项目进行训练。','课程、练习、模板与能力测试。'],
 ['ads','多平台广告管理','校验追踪、设计活动并评估线索质量。','媒体计划、活动结构、追踪表、报告和优化日志。'],
 ['design-editor','设计与视频制作','明确简报、核心信息及制作要求。','约定的设计/视频文件及验收清单。'],
 ['remote-marketing','远程营销管理','协调团队与供应商，按约定负责执行和报告。','工作计划、RACI、会议节奏和行动报告。'],
 ['business-strategy','商业策略咨询','检查商业约束，提出测试的顺序。','诊断报告、决策建议、路线图和验证方案。']
 ],priceLink:'查看服务与报价',fine:'广告预算、第三方软件、人才及范围外项目单独确认。不编造客户数据。',
 processTag:'04 / 合作方式',processTitle:'每个阶段都有可检查的交付。',process:[['01','简报与证据','澄清目标、数据和业务限制。'],['02','确认工作范围','约定文件、修改次数、依赖、时间与费用。'],['03','执行与复盘','开展工作并根据数据核对。'],['04','交付与下一步','交接资料、权限与后续决策。']],
 bottomTitle:'无需购买所有服务，先讨论最关键的问题。',bottomLead:'介绍产品、市场、营销渠道和现阶段目标，以便确定合理的合作范围。',bottomCta:'讨论业务问题'
}
};
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
for(const lang of ['vi','en','zh']){
 const t=P[lang],prefix=lang==='vi'?'':'/'+lang;
 const link=(p)=>prefix+'/'+p+'/';
 const current=path.join(root,(lang==='vi'?'':lang+'/')+'services/index.html');
 const old=fs.readFileSync(current,'utf8');
 const pos=/<main\b[^>]*>/.exec(old),end=old.indexOf('</main>',pos?.index);
 if(!pos||end<0||!old.includes('data-dng-common="header"'))throw Error('V47 invalid existing shell '+current);
 const card=t.cases.map(([title,sym,diag,out,service],i)=>'<article class="v47-case"><div class="v47-case-num">'+String(i+1).padStart(2,'0')+' / 06</div><h3>'+esc(title)+'</h3><dl><div><dt>'+esc(t.symptom)+'</dt><dd>'+esc(sym)+'</dd></div><div><dt>'+esc(t.verify)+'</dt><dd>'+esc(diag)+'</dd></div><div class="v47-result"><dt>'+esc(t.deliver)+'</dt><dd>'+esc(out)+'</dd></div></dl><a href="'+link('pricing/'+service)+'">'+esc(t.scope)+' ↗</a></article>').join('');
 const plan=t.catalog.map(([id,title,how,what],i)=>'<article class="v47-service"><span>'+String(i+1).padStart(2,'0')+'</span><div><h3>'+esc(title)+'</h3><p>'+esc(how)+'</p></div><div><p>'+esc(what)+'</p><a href="'+link('pricing/'+id)+'">'+esc(t.priceLink)+' ↗</a></div></article>').join('');
 const steps=t.steps.map(([title,desc],i)=>'<article><span>'+String(i+1).padStart(2,'0')+'</span><h3>'+esc(title)+'</h3><p>'+esc(desc)+'</p></article>').join('');
 const process=t.process.map(([num,title,desc])=>'<div><span>'+num+'</span><strong>'+esc(title)+'</strong><p>'+esc(desc)+'</p></div>').join('');
 const html='<main id="main" class="v47-main"><section class="hero25 v47-hero"><div class="shell"><div class="eyebrow">'+esc(t.eyebrow)+'</div><h1>'+t.h1+'</h1><p class="lead">'+esc(t.intro)+'</p><div class="v47-actions"><a class="v47-primary" href="#real-problems">'+esc(t.cta)+' ↗</a><a class="v47-secondary" href="'+link('pricing')+'">'+esc(t.pricing)+' ↗</a></div><p class="v47-note">'+esc(t.note)+'</p></div></section>'+
 '<section id="real-problems" class="v47-section v47-problems"><div class="v47-container"><div class="v47-heading"><div><span class="v47-kicker">'+esc(t.section)+'</span><h2>'+esc(t.sectionTitle)+'</h2></div><p>'+esc(t.sectionLead)+'</p></div><div class="v47-case-grid">'+card+'</div></div></section>'+
 '<section class="v47-section v47-example"><div class="v47-container"><div class="v47-heading"><div><span class="v47-kicker">'+esc(t.caseTag)+'</span><h2>'+esc(t.caseTitle)+'</h2></div><p>'+esc(t.caseLead)+'</p></div><div class="v47-example-layout"><div class="v47-process-steps">'+steps+'</div><aside class="v47-handoff"><h3>'+esc(t.handoffTitle)+'</h3><ul>'+t.handoff.map(z=>'<li>'+esc(z)+'</li>').join('')+'</ul></aside></div></div></section>'+
 '<section class="v47-section v47-catalog"><div class="v47-container"><div class="v47-heading"><div><span class="v47-kicker">'+esc(t.catalogTag)+'</span><h2>'+esc(t.catalogTitle)+'</h2></div><p>'+esc(t.catalogLead)+'</p></div><div class="v47-service-list">'+plan+'</div><p class="v47-note">'+esc(t.fine)+'</p></div></section>'+
 '<section class="v47-section v47-process"><div class="v47-container"><span class="v47-kicker">'+esc(t.processTag)+'</span><h2>'+esc(t.processTitle)+'</h2><div class="v47-process-grid">'+process+'</div></div></section>'+
 '<section class="v47-close"><div class="v47-container"><div><h2>'+esc(t.bottomTitle)+'</h2><p>'+esc(t.bottomLead)+'</p></div><a href="'+link('contact')+'" class="v47-primary">'+esc(t.bottomCta)+' ↗</a></div></section></main>';
 let updated=old.slice(0,pos.index)+html+old.slice(end+7);
 updated=updated.replace(/<\/head\s*>/i,'<link rel="stylesheet" href="/assets/css/dngworld-solutions-v47.css" data-dng-solutions="v47"></head>');
 fs.writeFileSync(current,updated);console.log('V47 concrete Solutions content:',path.relative(root,current));
}
