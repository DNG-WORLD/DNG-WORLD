(()=>{'use strict';
const LANG=document.documentElement.lang==='en'?'en':document.documentElement.lang==='zh'?'zh':'vi';const LOCALE={vi:'vi-VN',en:'en-US',zh:'zh-CN'}[LANG];
const prefix=LANG==='vi'?'/':`/${LANG}/`;
const dict={vi:{news:'Tin tức',details:'Thông tin tổng hợp',from:'Nguồn xuất bản',date:'Thời gian nguồn đăng',verify:'Kiểm chứng tại trang báo gốc',related:'Cùng chuyên mục',expired:'Bản tin đã được thay mới',expiredText:'DNGWORLD chỉ giữ danh sách hiện tại. Bản tin này đã hết thời hạn hiển thị.',latest:'Xem tin mới nhất',abstract:'Tóm tắt nguồn',note:'DNGWORLD trình bày trích yếu từ metadata công khai; không đăng lại toàn văn bài báo.',notice:'Nội dung và hình ảnh thuộc quyền của nhà xuất bản nguồn.'},en:{news:'News',details:'Source brief',from:'Published by',date:'Published at',verify:'Verify at original publisher',related:'Related stories',expired:'This story has been replaced',expiredText:'DNGWORLD only retains the current news list. This item is no longer available.',latest:'Latest news',abstract:'Source summary',note:'DNGWORLD displays the source-provided summary and does not reproduce the full article.',notice:'Content and images remain owned by their respective publishers.'},zh:{news:'新闻',details:'来源摘要',from:'信息来源',date:'发布时间',verify:'查阅原始报道',related:'相关报道',expired:'此新闻已更新',expiredText:'DNGWORLD 仅保留当前新闻列表，原条目已不再显示。',latest:'查看最新新闻',abstract:'新闻摘要',note:'DNGWORLD 仅展示公开摘要，不转载完整新闻。',notice:'内容与图片版权归原发布者所有。'}}[LANG];
const $=s=>document.querySelector(s),esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const url=v=>{try{let u=new URL(v);return ['https:','http:'].includes(u.protocol)?u.href:''}catch{return ''}};
const fmt=x=>{if(!x)return '';let d=new Date(x);return Number.isFinite(d.getTime())?new Intl.DateTimeFormat(LOCALE,{day:'2-digit',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'Asia/Ho_Chi_Minh'}).format(d):''};
const allCats={vi:{vietnam:'Việt Nam',world:'Thế giới',politics:'Chính trị',economy:'Kinh tế',technology:'Công nghệ',ai:'AI',marketing:'Marketing'},en:{vietnam:'Vietnam',world:'World',politics:'Politics',economy:'Economy',technology:'Technology',ai:'AI',marketing:'Marketing'},zh:{vietnam:'越南',world:'世界',politics:'政治',economy:'经济',technology:'科技',ai:'AI',marketing:'营销'}};const cats=allCats[LANG];
const display=x=>{const origin=x?.source_lang||(String(x?.source||'').match(/VnExpress|Tuổi Trẻ|VietnamPlus/i)?'vi':'en');const part=x?.translations?.[LANG]||(origin===LANG?{title:x.title,summary:x.summary}:null);return part?{...x,title:part.title||x.title,summary:part.summary||x.summary}:{...x,untranslated:true};};
const id=new URLSearchParams(location.search).get('id');
$('#menuToggle').addEventListener('click',()=>{let menu=$('#siteNav');const v=menu.classList.toggle('open');$('#menuToggle').setAttribute('aria-expanded',String(v))});
function detail(article,news){document.title=article.title+' | DNGWORLD NEWS';const side=news.filter(x=>x.id!==article.id && (x.category===article.category)).slice(0,5);
 const long=article.summary||'';
 const untranslatedNote=article.untranslated?(LANG==='en'?'Shown in original language; no verified translation available.':LANG==='zh'?'原文展示；暂无已核实的翻译。':'Đang hiển thị nguyên ngữ; chưa có bản dịch được xác minh.'):'';
 const safeImage=url(article.image);const safeSource=url(article.url);
 $('#articleBody').innerHTML=`<div class="article-label"><span>${esc(cats[article.category]||dict.news)}</span><span>·</span><span>DNGWORLD NEWS</span></div>
 <h1 class="article-title">${esc(article.title)}</h1>
 <div class="article-meta"><strong>${esc(article.source)}</strong><time>${esc(fmt(article.published_at))}</time><span>${esc(dict.details)}</span></div>
 ${safeImage?`<figure style="margin:0"><img class="article-image" alt="" src="${esc(safeImage)}" onerror="this.style.display='none'"><figcaption class="article-image-caption">${esc(dict.from)}: ${esc(article.source)}. ${esc(dict.notice)}</figcaption></figure>`:''}
 ${untranslatedNote?`<p class="article-notice">${esc(untranslatedNote)}</p>`:''}
 <p class="article-intro">${esc(article.summary||dict.note)}</p>
 <div class="article-body"><p>${esc(dict.note)}</p>
 <p>${esc(dict.notice)}</p></div>
 <div class="article-context"><h2>${esc(dict.abstract)}</h2><div class="article-source"><strong>${esc(dict.from)}: ${esc(article.source)}</strong><p>${esc(dict.date)}: ${esc(fmt(article.published_at))}</p>${safeSource?`<p><a href="${esc(safeSource)}" rel="noopener noreferrer" target="_blank" style="text-decoration:underline;color:#e5bf88">${esc(dict.verify)} ↗</a></p>`:''}</div><p class="article-notice">${esc(dict.notice)}</p></div>`;
 $('#sideRelated').innerHTML=`<h3>${esc(dict.related)}</h3>${side.length?side.map(x=>`<a href="${prefix}insights/read/?id=${encodeURIComponent(x.id)}" class="related-link"><small>${esc(x.source)} · ${esc(fmt(x.published_at))}</small>${esc(x.title)}</a>`).join(''):'<p class="article-notice">${esc(dict.expiredText)}</p>'}`;
}
async function init(){try{let r=await fetch('/data/newsroom.json?now='+Date.now(),{cache:'no-store'});if(!r.ok)throw Error(r.status);let d=await r.json(),news=(d.news||[]).map(display).filter(Boolean),item=news.find(x=>x.id===id);if(!item)throw Error('expired');detail(item,news)}catch(e){$('#articleBody').innerHTML=`<h1 class="article-title">${esc(dict.expired)}</h1><p class="article-intro">${esc(dict.expiredText)}</p><a href="${prefix}insights/" class="back-nav">← ${esc(dict.latest)}</a>`;$('#sideRelated').innerHTML='';}}
init();})();
