/* V49: rebuild lower homepage into an intentional B2B conversion journey,
 * and correct /en/ and /zh/ previously serving a News page instead of Home.
 * ONLY generated HTML; VI V24 WebGL source/shaders preserved.
 */
import fs from 'node:fs';import path from 'node:path';
const root=path.resolve('_site');
const locales={
 vi:{
  head:'BUSINESS GROWTH INTELLIGENCE',h1:'GROWTH NEEDS <em>clarity.</em>',hero:'Chiến lược, marketing, nội dung và dữ liệu phải dẫn đến những quyết định kinh doanh rõ ràng — không chỉ thêm hoạt động.',
  heroCta:'Khám phá giải pháp',heroSecond:'Trao đổi nhu cầu',
  problemTag:'01 / ĐIỂM NGHẼN PHỔ BIẾN',problemTitle:'Đừng tăng ngân sách trước khi biết vấn đề nằm ở đâu.',problemLead:'DNGWORLD bắt đầu từ điều khách hàng đang gặp. Không mặc định mọi vấn đề cần thuê một agency trọn gói.',
  problems:[
   ['Có lead nhưng khó chốt','Tin nhắn tăng nhưng sale khó xác định khách phù hợp, không biết đang mất khách ở bước nào.','Xem cách kiểm tra funnel','services/#real-problems'],
   ['Quảng cáo chạy nhưng không rõ hiệu quả','Chi phí tăng; Ads, website và dữ liệu bán hàng chưa được đối soát.','Xem giải pháp quảng cáo','pricing/ads/'],
   ['Marketing có nhiều người làm nhưng thiếu người điều phối','Thiếu trách nhiệm rõ ràng, lịch bàn giao và báo cáo hành động.','Xem quản trị Marketing','pricing/remote-marketing/']
  ],
  serviceTag:'02 / PHẠM VI HỢP TÁC',serviceTitle:'Năm nhóm dịch vụ. Chọn đúng công việc cần làm.',serviceLead:'Học để tự vận hành, thuê một hạng mục cụ thể hoặc có người điều phối dài hạn — không phải doanh nghiệp nào cũng cần mua tất cả.',
  services:[
   ['Đào tạo Marketing','Xây năng lực nội bộ bằng bài tập, checklist và thực hành tài khoản.','courses'],
   ['Chạy quảng cáo đa nền tảng','Thiết kế, triển khai và đo chất lượng chiến dịch theo dữ liệu có thể kiểm tra.','ads'],
   ['Design & Video Editor','Bộ thiết kế, video và vật liệu truyền thông theo brief và tiêu chí nghiệm thu.','design-editor'],
   ['Quản trị Marketing từ xa','Điều phối kênh, freelancer, báo cáo và kế hoạch triển khai thống nhất.','remote-marketing'],
   ['Tư vấn & định hướng doanh nghiệp','Tìm nguyên nhân, đặt thứ tự ưu tiên và xây lộ trình thử nghiệm.','business-strategy']
  ],detail:'Xem phạm vi & giá',
  howTag:'03 / HÌNH THỨC LÀM VIỆC',howTitle:'Khách hàng biết mình sẽ nhận được gì.',howLead:'Từ brief đầu vào đến file bàn giao, mỗi giai đoạn có câu hỏi và đầu ra rõ ràng.',
  how:[
   ['Chẩn đoán','Kiểm tra bối cảnh, dữ liệu, mục tiêu và điều kiện triển khai.','Báo cáo hiện trạng & ưu tiên'],
   ['Chốt phạm vi','Thống nhất hạng mục, timeline, trách nhiệm, phụ thuộc và chi phí.','Scope of Work và tiêu chí nghiệm thu'],
   ['Triển khai & bàn giao','Thực hiện, báo cáo kết quả theo chỉ số phù hợp và chuyển giao tài sản.','File, dashboard và hướng dẫn vận hành']
  ],
  closeTag:'DNGWORLD / BẮT ĐẦU TỪ MỘT VẤN ĐỀ',closeTitle:'Bạn không cần thêm một bản chào dịch vụ chung chung.',closeLead:'Cho biết sản phẩm, khách hàng, kênh đang triển khai và vướng mắc lớn nhất. Chúng ta sẽ xác định phần đáng làm trước.',closeAction:'Trao đổi bài toán của bạn',
  disclaimer:'Không tự đưa cam kết doanh số hoặc kết quả chưa có dữ liệu kiểm chứng.'
 },
 en:{
  head:'BUSINESS GROWTH INTELLIGENCE',h1:'GROWTH NEEDS <em>clarity.</em>',hero:'Strategy, marketing, creative and data should lead to better decisions — not simply more activity.',heroCta:'Explore solutions',heroSecond:'Discuss a project',
  problemTag:'01 / RECOGNIZABLE CONSTRAINTS',problemTitle:'Know what is broken before increasing the budget.',problemLead:'Start with the business problem. Not every company needs a full-service agency.',
  problems:[
   ['Leads arrive but rarely convert','Messages rise, yet sales cannot distinguish buyers or identify lost opportunities.','Investigate the funnel','services/#real-problems'],
   ['Ad spend rises but outcomes are unclear','Ads, website analytics and sales pipeline are not reconciled.','Advertising scope','pricing/ads/'],
   ['Too many executors, no accountable owner','Vendors and teams lack a single delivery plan and action reporting.','Remote management','pricing/remote-marketing/']
  ],
  serviceTag:'02 / ENGAGEMENT OPTIONS',serviceTitle:'Five service lines. Only the work you need.',serviceLead:'Build internal skills, contract a specific specialty, or engage a strategic operator — with a clear scope.',
  services:[
   ['Marketing training','Practical workshops, checklists and hands-on account exercises.','courses'],
   ['Multi-platform advertising','Plan, deliver and evaluate campaigns using verifiable measurement.','ads'],
   ['Design & video editing','Scoped production of design, video and creative assets with acceptance criteria.','design-editor'],
   ['Remote marketing management','Coordinate channels, contractors, reporting and weekly execution.','remote-marketing'],
   ['Business strategy consulting','Diagnose, prioritize and define evidence-based experiments.','business-strategy']
  ],detail:'Review scope & pricing',
  howTag:'03 / HOW WE ENGAGE',howTitle:'Know what will be delivered.',howLead:'From the initial brief to ownership handover, each phase has visible artifacts.',
  how:[
   ['Diagnose','Review the context, data, goals and constraints.','Diagnostic & priorities'],
   ['Scope','Agree deliverables, schedule, dependencies and acceptance.','Statement of Work'],
   ['Deliver','Execute, report against agreed measures and transfer assets.','Files, dashboards & playbooks']
  ],
  closeTag:'DNGWORLD / A CLEAR NEXT STEP',closeTitle:'You do not need another generic agency pitch.',closeLead:'Tell us what you sell, who buys it, the channels involved and the most expensive problem.',closeAction:'Discuss my business challenge',disclaimer:'No revenue promises without an evidence baseline.'
 },
 zh:{
  head:'BUSINESS GROWTH INTELLIGENCE',h1:'增长需要 <em>清晰决策。</em>',hero:'战略、营销、创意和数据应帮助企业做出更好的决策，而不是增加无效工作。',heroCta:'查看解决方案',heroSecond:'讨论项目',
  problemTag:'01 / 典型业务瓶颈',problemTitle:'增加预算之前，先确定真正的问题。',problemLead:'先了解商业挑战，而非默认购买整套代理服务。',
  problems:[
   ['线索很多却难成交','询盘增加，但销售难以区分有效客户及流失原因。','查看转化诊断','services/#real-problems'],
   ['广告花费增加但效果不明','广告、网站和销售数据无法准确对照。','广告服务范围','pricing/ads/'],
   ['多人执行但缺乏负责人','供应商与团队没有统一的计划和结果报告。','远程营销管理','pricing/remote-marketing/']
  ],
  serviceTag:'02 / 合作形式',serviceTitle:'五类服务，只做真正需要的工作。',serviceLead:'培训内部团队、外包具体工作或聘请远程统筹负责人，范围始终明确。',
  services:[
   ['营销培训','通过实际账户、工作坊和检查清单培养团队能力。','courses'],
   ['多平台广告','依据可验证的数据规划、执行并评估广告。','ads'],
   ['设计与视频','按简报和验收标准制作创意素材。','design-editor'],
   ['远程营销管理','协调渠道、供应商、报告与执行计划。','remote-marketing'],
   ['商业策略咨询','诊断问题、确定优先级并提出可验证的测试。','business-strategy']
  ],detail:'查看范围和报价',
  howTag:'03 / 合作流程',howTitle:'每个阶段都有明确的交付。',howLead:'从前期简报到实际交接，每一步都能检查。',
  how:[
   ['诊断','审核数据、目标与资源限制。','诊断与优先级'],
   ['确认范围','明确交付、时间、依赖与验收。','工作说明书'],
   ['执行与交付','开展工作、衡量信号并移交资产。','文件、看板与操作指南']
  ],
  closeTag:'DNGWORLD / 下一步',closeTitle:'不需要另一份泛泛的推销方案。',closeLead:'告诉我们您的产品、目标客户、营销渠道与最主要的业务问题。',closeAction:'讨论业务问题',disclaimer:'没有可靠的基准数据，不承诺业绩结果。'
 }
};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
function sections(lang){const t=locales[lang],pre=lang==='vi'?'/':'/'+lang+'/';const route=p=>pre+p;
 const problems=t.problems.map(([h,d,a,u],i)=>'<article class="v49-problem"><span>0'+(i+1)+'</span><h3>'+esc(h)+'</h3><p>'+esc(d)+'</p><a href="'+route(u)+'">'+esc(a)+' ↗</a></article>').join('');
 const services=t.services.map(([h,d,id],i)=>'<article class="v49-service"><span class="v49-num">0'+(i+1)+'</span><div><h3>'+esc(h)+'</h3><p>'+esc(d)+'</p></div><a href="'+route('pricing/'+id+'/')+'">'+esc(t.detail)+' ↗</a></article>').join('');
 const how=t.how.map(([h,d,out],i)=>'<div class="v49-how-step"><span>0'+(i+1)+'</span><h3>'+esc(h)+'</h3><p>'+esc(d)+'</p><small>'+esc(out)+'</small></div>').join('');
 return '<section class="v49-problems" id="growth-problems"><div class="v49-container"><div class="v49-heading"><div><p class="v49-kicker">'+esc(t.problemTag)+'</p><h2>'+esc(t.problemTitle)+'</h2></div><p>'+esc(t.problemLead)+'</p></div><div class="v49-problem-grid">'+problems+'</div></div></section>'+
 '<section class="v49-services" id="growth-services"><div class="v49-container"><div class="v49-heading"><div><p class="v49-kicker">'+esc(t.serviceTag)+'</p><h2>'+esc(t.serviceTitle)+'</h2></div><p>'+esc(t.serviceLead)+'</p></div><div class="v49-service-list">'+services+'</div></div></section>'+
 '<section class="v49-method" id="growth-method"><div class="v49-container"><div class="v49-heading"><div><p class="v49-kicker">'+esc(t.howTag)+'</p><h2>'+esc(t.howTitle)+'</h2></div><p>'+esc(t.howLead)+'</p></div><div class="v49-how-grid">'+how+'</div></div></section>'+
 '<section class="v49-close"><div class="v49-container v49-close-layout"><div><p class="v49-kicker">'+esc(t.closeTag)+'</p><h2>'+esc(t.closeTitle)+'</h2><p>'+esc(t.closeLead)+'</p><small>'+esc(t.disclaimer)+'</small></div><a class="v49-cta" href="'+route('contact/')+'">'+esc(t.closeAction)+' ↗</a></div></section>';
}
const homeFile=path.join(root,'index.html');let vi=fs.readFileSync(homeFile,'utf8');
const tape=vi.indexOf('<div class="tape">'),end=vi.indexOf('</main>',tape);
if(tape<0||end<0||!vi.slice(tape,end).includes('THE DNGWORLD DISCIPLINES')||!vi.includes('id="artCanvas"'))throw Error('V49 V24 home-only final tape/3D invariant changed');
vi=vi.slice(0,tape)+sections('vi')+vi.slice(end);
vi=vi.replace(/<\/head\s*>/i,'<link rel="stylesheet" href="/assets/css/dngworld-home-v49.css" data-dng-home="v49"></head>');
fs.writeFileSync(homeFile,vi);
for(const lang of ['en','zh']){
 const file=path.join(root,lang,'index.html');let page=fs.readFileSync(file,'utf8');
 const open=/<main\b[^>]*>/i.exec(page),close=page.indexOf('</main>',open?.index);
 if(!open||close<0||!page.includes('news-wrap')||!page.includes('data-dng-common="header"'))throw Error('V49: outdated '+lang+' home/News collision changed');
 const t=locales[lang];
 const hero='<main class="v49-local-home"><section class="hero25 v49-local-hero"><div class="shell"><div class="eyebrow">'+esc(t.head)+'</div><h1>'+t.h1+'</h1><p class="lead">'+esc(t.hero)+'</p><div class="v49-local-actions"><a class="v49-cta" href="/'+lang+'/services/">'+esc(t.heroCta)+' ↗</a><a class="v49-secondary" href="/'+lang+'/contact/">'+esc(t.heroSecond)+' ↗</a></div></div></section>'+sections(lang)+'</main>';
 page=page.slice(0,open.index)+hero+page.slice(close+7);
 // English and Chinese homepage must NOT still claim to be the News page.
 page=page.replace(/<title>[^<]*<\/title>/i,'<title>DNGWORLD — Business Growth Intelligence</title>');
 page=page.replace(/<meta[^>]*name="description"[^>]*>/i,'<meta name="description" content="'+esc(t.hero)+'">');
 page=page.replace(new RegExp('https://dng-world\\.github\\.io/'+lang+'/insights/','g'),'https://dng-world.github.io/'+lang+'/');
 page=page.replace(/<link[^>]*href="\/assets\/css\/dngworld-newsroom-v26\.css"[^>]*>/gi,'');
 page=page.replace(/<script[^>]*src="\/assets\/js\/dngworld-newsroom-v31\.js"[^>]*><\/script>/gi,'');
 page=page.replace(/<\/head\s*>/i,'<link rel="stylesheet" href="/assets/css/dngworld-home-v49.css" data-dng-home="v49"></head>');
 fs.writeFileSync(file,page);
 console.log('V49 corrected localized Homepage route:',lang+'/');
}
console.log('V49 VI V24 hero WebGL preserved; replaced decorative tape with buyer problems, real service paths, handover model, one lead CTA.');
