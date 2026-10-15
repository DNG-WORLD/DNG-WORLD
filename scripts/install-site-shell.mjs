/** V41 – exactly one visible header/footer for every full, generated page.
 * Source HTML, original navigation hooks and all content remain byte-for-byte
 * intact; older shells are visually hidden only in _site. */
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('_site');
const css='/assets/css/dngworld-shell-v41.css',menu='/assets/js/dngworld-shell-v41.js';
const languages={
 vi:{home:'Trang chủ',services:'Giải pháp',pricing:'Báo giá',tools:'Công cụ',insights:'News & TV',about:'Giới thiệu',contact:'Liên hệ',talk:'Trao đổi dự án',explore:'Khám phá',description:'Tư duy chiến lược. Triển khai có hệ thống. Đo lường rõ ràng.',address:'Đà Nẵng, Việt Nam',news:'Tin tức & phân tích',lang:'Ngôn ngữ'},
 en:{home:'Home',services:'Solutions',pricing:'Pricing',tools:'Tools',insights:'News & TV',about:'About',contact:'Contact',talk:'Discuss a project',explore:'Explore',description:'Strategic thinking. Systematic execution. Measurable outcomes.',address:'Da Nang, Vietnam',news:'News & insights',lang:'Language'},
 zh:{home:'首页',services:'解决方案',pricing:'报价',tools:'工具',insights:'新闻 & TV',about:'关于',contact:'联系',talk:'讨论项目',explore:'探索',description:'战略思维、系统执行与清晰衡量。',address:'越南岘港',news:'新闻与洞察',lang:'语言'}
};
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const routes=['','services','pricing','tools','insights','about'];
let full=0,skipped=0,redirects=0;const errors=[];
function render(relative){
 const lang=relative.startsWith('en/')?'en':relative.startsWith('zh/')?'zh':'vi';
 const base=lang==='vi'?'/':'/'+lang+'/';const tr=languages[lang];
 const route=slug=>base+(slug?slug+'/':'');
 const pathNoLang=lang==='vi'?relative:relative.slice(3);
 const area=pathNoLang.split('/')[0]==='index.html'?'':pathNoLang.split('/')[0];
 const label=s=>escape(tr[s]);
 const mark='<span class="dng-brand-glyph" aria-hidden="true"></span>';
 const brand='<span class="dng-brand-name">'+mark+'<span>DNGWORLD<sup>®</sup></span></span>';
 const links=routes.map(slug=>{const key=slug||'home';return '<a href="'+route(slug)+'"'+(slug===area?' aria-current="page"':area===''&&slug===''?' aria-current="page"':'')+'>'+label(key)+'</a>'}).join('');
 const locale='<div class="dng-global-locales" aria-label="'+label('lang')+'">'+[['VI','/'],['EN','/en/'],['中文','/zh/']].map(([name,p])=>'<a href="'+p+(area?area+'/':'')+'"'+((lang==='vi'&&name==='VI')||(lang==='en'&&name==='EN')||(lang==='zh'&&name==='中文')?' aria-current="page"':'')+'>'+name+'</a>').join('')+'</div>';
 const header='<header class="dng-global-header" data-dng-common="header"><div class="dng-global-bar"><a class="dng-global-brand" aria-label="DNGWORLD" href="/">'+brand+'</a><nav class="dng-global-desktop" aria-label="Primary navigation">'+links+'</nav><a class="dng-global-contact" href="'+route('contact')+'">'+label('talk')+' <span aria-hidden="true">↗</span></a><button class="dng-global-toggle" type="button" aria-controls="dng-global-mobile" aria-expanded="false" aria-label="Open menu"><span></span><span></span><span></span></button></div><div class="dng-global-panel" id="dng-global-mobile" hidden><nav aria-label="Mobile navigation">'+links+'</nav><a class="dng-global-panel-cta" href="'+route('contact')+'">'+label('talk')+' ↗</a>'+locale+'</div></header>';
 const footer='<footer class="dng-global-footer" data-dng-common="footer"><div class="dng-global-footer-inner"><div class="dng-global-footer-grid"><div class="dng-global-footer-brand"><a href="/" aria-label="DNGWORLD">'+brand+'</a><p>BUSINESS GROWTH INTELLIGENCE</p><span>'+label('description')+'</span></div><div class="dng-global-footer-col"><strong>DNGWORLD</strong><a href="'+route('about')+'">'+label('about')+'</a><a href="'+route('services')+'">'+label('services')+'</a><a href="'+route('pricing')+'">'+label('pricing')+'</a></div><div class="dng-global-footer-col"><strong>'+label('explore')+'</strong><a href="'+route('tools')+'">'+label('tools')+'</a><a href="'+route('insights')+'">'+label('news')+'</a><a href="'+route('contact')+'">'+label('contact')+'</a></div><div class="dng-global-footer-col"><strong>'+label('contact')+'</strong><a href="tel:0377348008">0377 348 008</a><a href="mailto:nguyendhungdung@gmail.com">Email</a><a href="https://zalo.me/0377348008" rel="noopener noreferrer" target="_blank">Zalo ↗</a></div></div><div class="dng-global-footer-bottom"><span>© 2026 DNGWORLD · '+label('address')+'</span><span>Strategy × Marketing × Media × Data × AI</span></div></div></footer>';
 return {header,footer};
}
function walk(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const f=path.join(dir,item.name);if(item.isDirectory()){walk(f);continue}if(!item.isFile()||!item.name.endsWith('.html'))continue;
 let html=fs.readFileSync(f,'utf8');const relative=path.relative(root,f).replace(/\\/g,'/');
 if(!/<body\b/i.test(html)||!/<\/body\s*>/i.test(html)||!/<main\b/i.test(html)||/<meta\b[^>]*http-equiv\s*=\s*["']?refresh/i.test(html)){skipped++;continue}
 if(html.includes('data-dng-common="header"')){errors.push('Duplicate call: '+relative);continue}
 const oldHeader=/<header\b[^>]*>/i.exec(html);const mainAt=html.search(/<main\b/i);
 if(oldHeader&&oldHeader.index<mainAt&&html.indexOf('</header>',oldHeader.index)!==-1){
   html=html.replace(/<header\b([^>]*)>/i,(_m,a)=>'<header'+a+' data-dng-original-shell="header">');
   html=html.replace(/<\/header>/i,m=>m+'\n<!-- SINGLE SHARED V41 NAVIGATION -->\n'+render(relative).header);
 }else{
   html=html.replace(/<body\b[^>]*>/i,m=>m+'\n'+render(relative).header);
 }
 const lastFooter=html.lastIndexOf('<footer');
 if(lastFooter>html.search(/<\/main\s*>/i)&&lastFooter>=0){
   const tail=html.slice(lastFooter);
   const marked=tail.replace(/^<footer\b([^>]*)>/i,(_m,a)=>'<footer'+a+' data-dng-original-shell="footer">');
   const indexEnd=marked.indexOf('</footer>');
   if(indexEnd>=0)html=html.slice(0,lastFooter)+marked.slice(0,indexEnd+9)+render(relative).footer+marked.slice(indexEnd+9);
   else html=html.replace(/<\/body\s*>/i,render(relative).footer+'</body>');
 }else html=html.replace(/<\/body\s*>/i,render(relative).footer+'</body>');
 if(!html.includes('href="'+css+'"'))html=html.replace(/<\/head\s*>/i,'<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap"><link rel="stylesheet" href="'+css+'"></head>');
 if(!html.includes('src="'+menu+'"'))html=html.replace(/<\/body\s*>/i,'<script src="'+menu+'" defer></script></body>');
 if((html.match(/data-dng-common="header"/g)||[]).length!==1||(html.match(/data-dng-common="footer"/g)||[]).length!==1)errors.push('Invalid shell count: '+relative);
 fs.writeFileSync(f,html);full++;
 }}
walk(root);
if(errors.length||full<40)throw Error('V41 structural shell QA failed: '+full+' pages / '+errors.slice(0,8).join('; '));
console.log('V41 unified original-shell-safe layout:',full,'pages. Unchanged redirect/templates:',skipped);
