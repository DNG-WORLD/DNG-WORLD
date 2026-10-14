(()=>{'use strict';
const $=s=>document.querySelector(s),esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const url=v=>{try{let u=new URL(v);return ['https:','http:'].includes(u.protocol)?u.href:''}catch{return ''}};
const fmt=x=>{if(!x)return '';let d=new Date(x);return Number.isFinite(d.getTime())?new Intl.DateTimeFormat('vi-VN',{day:'2-digit',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'Asia/Ho_Chi_Minh'}).format(d):''};
const cats={vietnam:'Việt Nam',world:'Thế giới',politics:'Chính trị',economy:'Kinh tế',technology:'Công nghệ',ai:'AI',marketing:'Marketing'};
const id=new URLSearchParams(location.search).get('id');
$('#menuToggle').addEventListener('click',()=>{let menu=$('#siteNav');const v=menu.classList.toggle('open');$('#menuToggle').setAttribute('aria-expanded',String(v))});
function detail(article,news){document.title=article.title+' | DNGWORLD NEWS';const side=news.filter(x=>x.id!==article.id && (x.category===article.category)).slice(0,5);
 const long=article.summary||'';
 const safeImage=url(article.image);const safeSource=url(article.url);
 $('#articleBody').innerHTML=`<div class="article-label"><span>${esc(cats[article.category]||'Tin tức')}</span><span>·</span><span>DNGWORLD NEWS</span></div>
 <h1 class="article-title">${esc(article.title)}</h1>
 <div class="article-meta"><strong>${esc(article.source)}</strong><time>${esc(fmt(article.published_at))}</time><span>Thông tin tổng hợp</span></div>
 ${safeImage?`<figure style="margin:0"><img class="article-image" alt="" src="${esc(safeImage)}" onerror="this.style.display='none'"><figcaption class="article-image-caption">Hình đại diện từ metadata nguồn: ${esc(article.source)}. Quyền hình ảnh thuộc chủ sở hữu.</figcaption></figure>`:''}
 <p class="article-intro">${esc(article.summary||'Nội dung mới từ nguồn đã đăng ký. DNGWORLD chưa có trích yếu đủ dài để trình bày.')}</p>
 <div class="article-body"><p>Đây là bản tin ngắn được tổng hợp tự động từ nguồn <strong>${esc(article.source)}</strong>. DNGWORLD trình bày phần thông tin nguồn cho phép phân phối, không sao chép toàn văn bài báo.</p>
 <p>Bản tin có tiêu đề và trích yếu được đối chiếu với metadata công khai từ nguồn xuất bản. Khi nguồn chưa cung cấp thêm nội dung có thể tái sử dụng, DNGWORLD không tự viết thêm chi tiết chưa được kiểm chứng.</p></div>
 <div class="article-context"><h2>Thông tin & nguồn</h2><div class="article-source"><strong>Nguồn xuất bản: ${esc(article.source)}</strong><p>Thời gian nguồn đăng: ${esc(fmt(article.published_at))}</p>${safeSource?`<p><a href="${esc(safeSource)}" rel="noopener noreferrer" target="_blank" style="text-decoration:underline;color:#455d4d">Kiểm chứng tại trang báo gốc ↗</a></p>`:''}</div><p class="article-notice">Bản tin có thể được thay thế khi DNGWORLD đồng bộ danh sách tin mới mỗi giờ. Nội dung và hình ảnh có quyền sở hữu riêng của nhà xuất bản nguồn.</p></div>`;
 $('#sideRelated').innerHTML=`<h3>Cùng chuyên mục</h3>${side.length?side.map(x=>`<a href="/insights/read/?id=${encodeURIComponent(x.id)}" class="related-link"><small>${esc(x.source)} · ${esc(fmt(x.published_at))}</small>${esc(x.title)}</a>`).join(''):'<p class="article-notice">Chưa có bài liên quan trong danh sách hiện tại.</p>'}`;
}
async function init(){try{let r=await fetch('/data/newsroom.json?now='+Date.now(),{cache:'no-store'});if(!r.ok)throw Error(r.status);let d=await r.json(),news=d.news||[],item=news.find(x=>x.id===id);if(!item)throw Error('expired');detail(item,news)}catch(e){$('#articleBody').innerHTML='<h1 class="article-title">Bản tin đã được thay mới</h1><p class="article-intro">DNGWORLD chỉ giữ danh sách tin hiện tại. Bài bạn vừa chọn có thể đã được cập nhật hoặc thay thế trong kỳ đồng bộ mới.</p><a href="/insights/" class="back-nav">← Xem những tin mới nhất</a>';$('#sideRelated').innerHTML='';}}
init();})();
