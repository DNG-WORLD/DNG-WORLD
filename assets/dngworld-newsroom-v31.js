(()=>{'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const LANG=document.documentElement.lang==='en'?'en':document.documentElement.lang==='zh'?'zh':'vi';
const LOCALE={vi:'vi-VN',en:'en-US',zh:'zh-CN'}[LANG];
const TRANS={
vi:{all:'Tất cả',vietnam:'Việt Nam',world:'Thế giới',politics:'Chính trị',economy:'Kinh tế',technology:'Công nghệ',ai:'AI',marketing:'Marketing',news:'Tin tức',updated:'Mới cập nhật',none:'Chưa có tin phù hợp trong kỳ đồng bộ này.',wait:'Đang chờ lần đồng bộ tin tức.',videos:'video',newsCount:'tin',theater:'Chế độ rạp ↗',smaller:'Thu nhỏ ↙',emptyVideo:'Chưa có video phù hợp.',noVideo:'Chưa có video ở chuyên mục này',next:'Hệ thống kiểm tra lại mỗi giờ',source:'Tin từ nguồn',sync:'Đã đồng bộ',first:'Chờ đồng bộ lần đầu',outage:'Nguồn gián đoạn — dữ liệu cũ',unavailable:'Chưa kết nối được dữ liệu',time:'Lần đồng bộ',official:'Video gần đây từ các kênh chính thức; chưa phải xếp hạng xu hướng',popular:'Video phổ biến và kênh chính thức'},
en:{all:'All',vietnam:'Vietnam',world:'World',politics:'Politics',economy:'Economy',technology:'Technology',ai:'AI',marketing:'Marketing',news:'News',updated:'Latest headlines',none:'No matching stories in this update.',wait:'Awaiting the first news sync.',videos:'videos',newsCount:'stories',theater:'Theater mode ↗',smaller:'Minimize ↙',emptyVideo:'No matching videos.',noVideo:'No videos in this category',next:'The system checks hourly',source:'From',sync:'Sources synced',first:'Awaiting first sync',outage:'Sources temporarily unavailable',unavailable:'News feed unavailable',time:'Last sync',official:'Recent official-channel videos; not a verified trending ranking',popular:'Popular videos and official channels'},
zh:{all:'全部',vietnam:'越南',world:'国际',politics:'政治',economy:'经济',technology:'科技',ai:'人工智能',marketing:'营销',news:'新闻',updated:'最新报道',none:'本次更新没有符合条件的新闻。',wait:'等待首次新闻同步。',videos:'个视频',newsCount:'条新闻',theater:'影院模式 ↗',smaller:'缩小 ↙',emptyVideo:'暂无符合条件的视频。',noVideo:'该栏目暂无视频',next:'系统每小时检查',source:'新闻来源',sync:'来源已同步',first:'等待首次同步',outage:'部分来源暂时不可用',unavailable:'新闻数据不可用',time:'同步时间',official:'官方频道近期视频，并非已核实的热门榜单',popular:'热门视频与官方频道'}
};const T=TRANS[LANG];const CATS={all:T.all,vietnam:T.vietnam,world:T.world,politics:T.politics,economy:T.economy,technology:T.technology,ai:T.ai,marketing:T.marketing};
const origin=x=>x?.source_lang||(String(x?.source||x?.channel||'').match(/VnExpress|Tuổi Trẻ|VietnamPlus|VTV24/i)?'vi':'en');
const localized=x=>x?.translations?.[LANG]||(origin(x)===LANG?{title:x.title,summary:x.summary}:null);
const displayed=x=>{let part=localized(x);return part?{...x,title:part.title||'',summary:part.summary||'',untranslated:false}:{...x,untranslated:origin(x)!==LANG};};
const VCATS=[['vietnam',T.vietnam],['world',T.world],['economy',T.economy],['technology',T.technology],['ai-trends',LANG==='en'?'AI & Trends':LANG==='zh'?'人工智能与趋势':'AI & Xu hướng']];
let news=[],videos={},activeCat='all',search='',limit=16,selectedVideo=null,activeVideoCat='vietnam',payload={};
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safe=x=>{try{let u=new URL(x,location.origin==='null'?'https://dng-world.github.io':location.origin);return ['https:','http:'].includes(u.protocol)?u.href:''}catch(_){return ''}};
const fmt=x=>{if(!x)return '';let d=new Date(x);return Number.isFinite(d.getTime())?new Intl.DateTimeFormat(LOCALE,{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit',timeZone:'Asia/Ho_Chi_Minh'}).format(d):''};
const articleUrl=x=>(LANG==='vi'?'/':`/${LANG}/`)+'insights/read/?id='+encodeURIComponent(x.id);
const duration=x=>x?(String(x).length>130?String(x).slice(0,128)+'…':String(x)):'';
const thumb=(x,cls='')=>{let u=safe(x.image||'');return `<div class="news-media ${u?'':'image-fallback'} ${cls}">${u?`<img loading="lazy" src="${esc(u)}" alt="" onerror="this.parentNode?.classList.add('image-fallback');this.remove()">`:''}</div>`};
function itemLabel(x){return `<span class="cap-label">${esc(CATS[x.category]||T.news)}${x.untranslated?' · '+esc(origin(x).toUpperCase()):''}</span>`}
function source(x){return `<div class="source-line">${esc(x.source)} <span class="bullet">·</span> ${esc(fmt(x.published_at))}</div>`}
function lead(x){return `<a class="lead-story" href="${articleUrl(x)}">${thumb(x,'news-picture')}<div class="lead-copy">${itemLabel(x)}<h2>${esc(x.title)}</h2><p>${esc(duration(x.summary)||(LANG==='en'?'Read this DNGWORLD news brief.':LANG==='zh'?'阅读 DNGWORLD 新闻摘要。':'Đọc tóm tắt DNGWORLD và nguồn tham khảo.'))}</p><div style="margin-top:14px;font-size:11px;color:#f2e4ce">${esc(x.source)} · ${esc(fmt(x.published_at))} &nbsp; ↗</div></div></a>`}
function side(x){return `<a class="side-feature" href="${articleUrl(x)}">${thumb(x)}<div>${itemLabel(x)}<h3>${esc(x.title)}</h3>${source(x)}</div></a>`}
function small(x){return `<a class="rail-item" href="${articleUrl(x)}"><span>${esc(CATS[x.category]||T.news)} · ${esc(fmt(x.published_at))}</span><strong>${esc(x.title)}</strong></a>`}
function card(x){return `<article class="story-card"><a href="${articleUrl(x)}">${thumb(x)}${itemLabel(x)}<h3>${esc(x.title)}</h3><p>${esc(duration(x.summary))}</p>${source(x)}</a></article>`}
function draw(){
 let filtered=news.filter(x=>(activeCat==='all'||x.category===activeCat)&&(x.title+' '+x.summary+' '+x.source).toLocaleLowerCase(LOCALE).includes(search));
 $('#newsGrid').innerHTML=filtered.length?filtered.slice(0,limit).map(card).join(''):`<div class="empty-state">${esc(T.none)}</div>`;
 $('#showMore').hidden=filtered.length<=limit;
 $('#gridCount').textContent=`${filtered.length} ${T.newsCount}`;
}
function drawTop(){let picked=news.slice(0,10);let container=$('#leadArea');if(!picked.length){container.innerHTML=`<div class="empty-state">${esc(T.wait)}</div>`;return;}
 let [one,...rest]=picked;let s=rest.slice(0,2);let rail=rest.slice(2,8);
 container.innerHTML=lead(one)+`<div class="secondary-stories">${s.map(side).join('')}</div>`+`<aside class="latest-rail"><h3 class="rail-title">${esc(T.updated)} <span style="color:var(--amber)">↗</span></h3>${rail.map(small).join('')}</aside>`;
}
function videoThumb(v,i){return `<button class="tv-thumb ${selectedVideo?.id===v.id?'active':''}" type="button" data-index="${i}" aria-label="Chọn xem ${esc((displayed(v)?.title||v.title))}"><div class="news-media image-fallback"><img loading="lazy" alt="" src="${esc(safe(v.thumbnail))}" onerror="this.remove()"></div><strong>${esc((displayed(v)?.title||v.title))}</strong><small>${esc(v.channel||'YouTube')} · ${esc(fmt(v.published_at))}</small></button>`}
function renderVideo(){
 const list=videos[activeVideoCat]||[];
 const holder=$('#tvThumbs');
 if(!list.length){selectedVideo=null;holder.innerHTML=`<div class="tv-empty">${esc(T.emptyVideo)}</div>`;$('#tvStage').innerHTML='';$('#videoHeadline').textContent=T.noVideo;$('#videoOrigin').textContent=T.next;$('#tvPlayCount').textContent=`0 ${T.videos}`;return;}
 if(!selectedVideo||!list.some(v=>v.id===selectedVideo.id))selectedVideo=list[0];
 holder.innerHTML=list.slice(0,6).map(videoThumb).join('');
 $('#tvPlayCount').textContent=`${list.length} ${T.videos}`;
 const video=selectedVideo;$('#videoHeadline').textContent=video.title;$('#videoOrigin').textContent=`${video.channel||'YouTube'} · ${fmt(video.published_at)}`;
 const cover=safe(video.thumbnail)||`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
 $('#tvStage').innerHTML=`<div class="tv-cover"><img src="${esc(cover)}" alt="" onerror="this.remove()"></div><button type="button" class="tv-play" id="startVideo" aria-label="${LANG==='en'?'Play video':LANG==='zh'?'播放视频':'Phát video'} ${esc(video.title)}">▶</button>`;
 $('#startVideo').addEventListener('click',startVideo);
}
function startVideo(){if(!selectedVideo||!/^[\w-]{11}$/.test(selectedVideo.id))return;const f=document.createElement('iframe');f.className='tv-frame';f.title=selectedVideo.title;f.src='https://www.youtube-nocookie.com/embed/'+selectedVideo.id+'?autoplay=1&rel=0';f.referrerPolicy='strict-origin-when-cross-origin';f.allow='autoplay; encrypted-media; picture-in-picture; accelerometer; gyroscope; fullscreen';f.allowFullscreen=true;$('#tvStage').replaceChildren(f);}
function initVideo(){
 $('#tvTabs').innerHTML=VCATS.map(([key,name])=>`<button type="button" data-cat="${key}" class="${key===activeVideoCat?'active':''}">${name}</button>`).join('');
 $('#tvTabs').addEventListener('click',e=>{const btn=e.target.closest('button[data-cat]');if(!btn)return;activeVideoCat=btn.dataset.cat;selectedVideo=null;$$('#tvTabs button').forEach(x=>x.classList.toggle('active',x===btn));renderVideo()});
 $('#tvThumbs').addEventListener('click',e=>{let btn=e.target.closest('[data-index]');if(!btn)return;selectedVideo=videos[activeVideoCat]?.[Number(btn.dataset.index)]||null;renderVideo();startVideo()});
 $('#theaterBtn').addEventListener('click',()=>{let on=$('#tvPortal').classList.toggle('theater');$('#theaterBtn').textContent=on?T.smaller:T.theater});
 renderVideo();
}
function initNav(){const m=$('#menuToggle'),nav=$('#siteNav');m.addEventListener('click',()=>{const opened=nav.classList.toggle('open');m.setAttribute('aria-expanded',String(opened))});$$('#siteNav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');m.setAttribute('aria-expanded','false')}));$$('#categoryBar button[data-cat]').forEach(button=>button.addEventListener('click',()=>{let c=button.dataset.cat;if(c==='video'){document.querySelector('#tvPortal').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});return}activeCat=c;limit=16;$$('#categoryBar button').forEach(b=>b.classList.toggle('active',b===button));draw();if(c!=='all')$('#latestNews').scrollIntoView({behavior:'smooth',block:'start'})}));$('#newsQuery').addEventListener('input',e=>{search=e.target.value.trim().toLocaleLowerCase(LOCALE);limit=16;draw()});$('#showMore').addEventListener('click',()=>{limit+=16;draw()});}
function populate(data){payload=data;const playing=!!$('#tvStage iframe');if(!playing)selectedVideo=null;news=Array.isArray(data.news)?data.news.map(displayed).filter(x=>x?.id&&x?.title&&safe(x.url)).sort((a,b)=>String(b.published_at).localeCompare(String(a.published_at))):[];videos=Object.fromEntries(Object.entries(data.videos||{}).map(([cat,arr])=>[cat,Array.isArray(arr)?arr.map(displayed).filter(v=>v?.title):[]]));drawTop();draw();if(!playing)renderVideo();
 const date=fmt(data.updated_at);const state=data.status==='seed'?T.first:data.status==='stale'?T.outage:data.updated_at?T.sync:T.first;
 const publishedInHour=news.filter(x=>{const d=Date.parse(x.published_at||'');return Number.isFinite(d)&&d>=Date.now()-60*60*1000&&d<=Date.now()+120000}).length;
 const updatedStamp=Date.parse(data.updated_at||'');const syncAge=Number.isFinite(updatedStamp)?Math.max(0,(Date.now()-updatedStamp)/60000):Infinity;
 const visibleState=syncAge>110?T.outage:state;
 $('#syncState').textContent=visibleState;$('#syncTime').textContent=date?`${T.time}: ${date}`:T.first;
 $('#headlineCount').textContent=`${news.length} ${T.newsCount} · ${Object.values(videos).reduce((s,a)=>s+(Array.isArray(a)?a.length:0),0)} ${T.videos} · ${LANG==='en'?'Published last 60 min':LANG==='zh'?'近60分钟发布':'Đăng trong 60 phút'}: ${publishedInHour}`;
 $('#videoDisclosure').textContent=data.video_mode==='popular_and_channel'?T.popular:T.official;
 if(data.translation_status==='not_configured'&&LANG!=='en')$('#syncState').title=LANG==='zh'?'未配置翻译；显示已获取的原语言标题。':'Chưa cấu hình dịch tự động; tin được hiển thị theo ngôn ngữ gốc (EN/VI).';
}
async function load(){try{let r=await fetch('/data/newsroom.json?t='+Date.now(),{cache:'no-store'});if(!r.ok)throw Error(r.status);populate(await r.json())}catch(e){console.warn('news feed unavailable',e);populate({news:[],videos:{},status:'unavailable',source_count:0});$('#syncState').textContent=T.unavailable;}}
initNav();initVideo();load();
})();
