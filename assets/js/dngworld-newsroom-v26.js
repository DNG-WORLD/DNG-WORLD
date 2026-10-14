(()=>{'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const CATS={all:'Tất cả',vietnam:'Việt Nam',world:'Thế giới',politics:'Chính trị',economy:'Kinh tế',technology:'Công nghệ',ai:'AI',marketing:'Marketing'};
const VCATS=[['vietnam','Việt Nam'],['world','Thế giới'],['economy','Kinh tế'],['technology','Công nghệ'],['ai-trends','AI & Xu hướng']];
let news=[],videos={},activeCat='all',search='',limit=16,selectedVideo=null,activeVideoCat='vietnam',payload={};
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safe=x=>{try{let u=new URL(x,location.origin);return ['https:','http:'].includes(u.protocol)?u.href:''}catch(_){return ''}};
const fmt=x=>{if(!x)return '';let d=new Date(x);return Number.isFinite(d.getTime())?new Intl.DateTimeFormat('vi-VN',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit',timeZone:'Asia/Ho_Chi_Minh'}).format(d):''};
const articleUrl=x=>'/insights/read/?id='+encodeURIComponent(x.id);
const duration=x=>x?(String(x).length>130?String(x).slice(0,128)+'…':String(x)):'';
const thumb=(x,cls='')=>{let u=safe(x.image||'');return `<div class="news-media ${u?'':'image-fallback'} ${cls}">${u?`<img loading="lazy" src="${esc(u)}" alt="" onerror="this.remove();this.parentNode.classList.add('image-fallback')">`:''}</div>`};
function itemLabel(x){return `<span class="cap-label">${esc(CATS[x.category]||'Tin tức')}</span>`}
function source(x){return `<div class="source-line">${esc(x.source)} <span class="bullet">·</span> ${esc(fmt(x.published_at))}</div>`}
function lead(x){return `<a class="lead-story" href="${articleUrl(x)}">${thumb(x,'news-picture')}<div class="lead-copy">${itemLabel(x)}<h2>${esc(x.title)}</h2><p>${esc(duration(x.summary)||'Đọc bản tin DNGWORLD để nắm thông tin chính và nguồn tham khảo.')}</p><div style="margin-top:14px;font-size:11px;color:#f2e4ce">${esc(x.source)} · ${esc(fmt(x.published_at))} &nbsp; ↗</div></div></a>`}
function side(x){return `<a class="side-feature" href="${articleUrl(x)}">${thumb(x)}<div>${itemLabel(x)}<h3>${esc(x.title)}</h3>${source(x)}</div></a>`}
function small(x){return `<a class="rail-item" href="${articleUrl(x)}"><span>${esc(CATS[x.category]||'Tin tức')} · ${esc(fmt(x.published_at))}</span><strong>${esc(x.title)}</strong></a>`}
function card(x){return `<article class="story-card"><a href="${articleUrl(x)}">${thumb(x)}${itemLabel(x)}<h3>${esc(x.title)}</h3><p>${esc(duration(x.summary))}</p>${source(x)}</a></article>`}
function draw(){
 let filtered=news.filter(x=>(activeCat==='all'||x.category===activeCat)&&(x.title+' '+x.summary+' '+x.source).toLocaleLowerCase('vi').includes(search));
 $('#newsGrid').innerHTML=filtered.length?filtered.slice(0,limit).map(card).join(''):'<div class="empty-state">Chưa có tin phù hợp trong kỳ đồng bộ này. Hãy thử chuyên mục khác hoặc chờ lần cập nhật tiếp theo.</div>';
 $('#showMore').hidden=filtered.length<=limit;
 $('#gridCount').textContent=`${filtered.length} tin`;
}
function drawTop(){let picked=news.slice(0,10);let container=$('#leadArea');if(!picked.length){container.innerHTML='<div class="empty-state">Tin tức đang chờ lần đồng bộ đầu tiên. Khi workflow chạy thành công, các bài nổi bật sẽ xuất hiện ở đây.</div>';return;}
 let [one,...rest]=picked;let s=rest.slice(0,2);let rail=rest.slice(2,8);
 container.innerHTML=lead(one)+`<div class="secondary-stories">${s.map(side).join('')}</div>`+`<aside class="latest-rail"><h3 class="rail-title">Mới cập nhật <span style="color:var(--amber)">↗</span></h3>${rail.map(small).join('')}</aside>`;
}
function videoThumb(v,i){return `<button class="tv-thumb ${selectedVideo?.id===v.id?'active':''}" type="button" data-index="${i}" aria-label="Chọn xem ${esc(v.title)}"><div class="news-media image-fallback"><img loading="lazy" alt="" src="${esc(safe(v.thumbnail))}" onerror="this.remove()"></div><strong>${esc(v.title)}</strong><small>${esc(v.channel||'YouTube')} · ${esc(fmt(v.published_at))}</small></button>`}
function renderVideo(){
 const list=videos[activeVideoCat]||[];
 const holder=$('#tvThumbs');
 if(!list.length){selectedVideo=null;holder.innerHTML='<div class="tv-empty">Chuyên mục này chưa có video mới hợp lệ trong kỳ đồng bộ. Những video từ kênh chính thức sẽ tự xuất hiện khi nguồn có bản tin phù hợp.</div>';$('#tvStage').innerHTML='';$('#videoHeadline').textContent='Chưa có video ở chuyên mục này';$('#videoOrigin').textContent='Hệ thống sẽ tự kiểm tra lại mỗi giờ';$('#tvPlayCount').textContent='0 video';return;}
 if(!selectedVideo||!list.some(v=>v.id===selectedVideo.id))selectedVideo=list[0];
 holder.innerHTML=list.slice(0,6).map(videoThumb).join('');
 $('#tvPlayCount').textContent=`${list.length} video`;
 const video=selectedVideo;$('#videoHeadline').textContent=video.title;$('#videoOrigin').textContent=`${video.channel||'YouTube'} · ${fmt(video.published_at)}`;
 const cover=safe(video.thumbnail)||`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
 $('#tvStage').innerHTML=`<div class="tv-cover"><img src="${esc(cover)}" alt="" onerror="this.remove()"></div><button type="button" class="tv-play" id="startVideo" aria-label="Phát video ${esc(video.title)}">▶</button>`;
 $('#startVideo').addEventListener('click',startVideo);
}
function startVideo(){if(!selectedVideo||!/^[\w-]{11}$/.test(selectedVideo.id))return;const f=document.createElement('iframe');f.className='tv-frame';f.title=selectedVideo.title;f.src='https://www.youtube-nocookie.com/embed/'+selectedVideo.id+'?autoplay=1&rel=0';f.referrerPolicy='strict-origin-when-cross-origin';f.allow='autoplay; encrypted-media; picture-in-picture; accelerometer; gyroscope; fullscreen';f.allowFullscreen=true;$('#tvStage').replaceChildren(f);}
function initVideo(){
 $('#tvTabs').innerHTML=VCATS.map(([key,name])=>`<button type="button" data-cat="${key}" class="${key===activeVideoCat?'active':''}">${name}</button>`).join('');
 $('#tvTabs').addEventListener('click',e=>{const btn=e.target.closest('button[data-cat]');if(!btn)return;activeVideoCat=btn.dataset.cat;selectedVideo=null;$$('#tvTabs button').forEach(x=>x.classList.toggle('active',x===btn));renderVideo()});
 $('#tvThumbs').addEventListener('click',e=>{let btn=e.target.closest('[data-index]');if(!btn)return;selectedVideo=videos[activeVideoCat]?.[Number(btn.dataset.index)]||null;renderVideo();startVideo()});
 $('#theaterBtn').addEventListener('click',()=>{let on=$('#tvPortal').classList.toggle('theater');$('#theaterBtn').textContent=on?'Thu nhỏ ↙':'Chế độ rạp ↗'});
 renderVideo();
}
function initNav(){const m=$('#menuToggle'),nav=$('#siteNav');m.addEventListener('click',()=>{const opened=nav.classList.toggle('open');m.setAttribute('aria-expanded',String(opened))});$$('#siteNav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');m.setAttribute('aria-expanded','false')}));$$('#categoryBar button[data-cat]').forEach(button=>button.addEventListener('click',()=>{let c=button.dataset.cat;if(c==='video'){document.querySelector('#tvPortal').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});return}activeCat=c;limit=16;$$('#categoryBar button').forEach(b=>b.classList.toggle('active',b===button));draw();if(c!=='all')$('#latestNews').scrollIntoView({behavior:'smooth',block:'start'})}));$('#newsQuery').addEventListener('input',e=>{search=e.target.value.trim().toLocaleLowerCase('vi');limit=16;draw()});$('#showMore').addEventListener('click',()=>{limit+=16;draw()});}
function populate(data){payload=data;news=Array.isArray(data.news)?data.news.filter(x=>x.id&&x.title&&safe(x.url)).sort((a,b)=>String(b.published_at).localeCompare(String(a.published_at))):[];videos=data.videos||{};drawTop();draw();renderVideo();
 const date=fmt(data.updated_at);const state=data.status==='seed'?'Dữ liệu tham khảo 09/10 · Chờ đồng bộ lần đầu':data.status==='stale'?'Nguồn gián đoạn — đang hiển thị bản đồng bộ gần nhất':data.updated_at?'Đã đồng bộ nguồn':'Đang chờ đồng bộ lần đầu';
 $('#syncState').textContent=state;$('#syncTime').textContent=date?`Lần đồng bộ: ${date} (VN)`:'Chưa có lần đồng bộ thành công';
 $('#headlineCount').textContent=`${news.length} tin · ${Object.values(videos).reduce((s,a)=>s+(Array.isArray(a)?a.length:0),0)} video`;
 $('#videoDisclosure').textContent=data.video_mode==='popular_and_channel'?'Video có kết hợp bảng phổ biến của YouTube và kênh chính thức.':'Video gần đây từ các kênh YouTube chính thức (chưa xác minh xếp hạng xu hướng).';
}
async function load(){try{let r=await fetch('/data/newsroom.json?t='+Date.now(),{cache:'no-store'});if(!r.ok)throw Error(r.status);populate(await r.json())}catch(e){console.warn('news feed unavailable',e);populate({news:[],videos:{},status:'unavailable',source_count:0});$('#syncState').textContent='Tạm thời chưa kết nối được dữ liệu';}}
initNav();initVideo();load();
})();
