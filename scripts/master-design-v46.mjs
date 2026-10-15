import fs from 'node:fs';
import path from 'node:path';
// A single visual master: the approved V24 homepage WebGL sculpture.
// Generated output ONLY; the checked-in HTML and mesh stay unchanged.
const root=path.resolve('_site');
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
const match=/<img\b[^>]*class="sculpt-fallback"[^>]*src="data:image\/webp;base64,([^"]+)"/i.exec(home);
if(!match)throw Error('V46: V24 approved sculpture not found; no arbitrary replacement will be generated');
const source=Buffer.from(match[1],'base64');
if(source.length<15000||source.toString('ascii',0,4)!=='RIFF'||source.toString('ascii',8,12)!=='WEBP')throw Error('V46 invalid original sculpt WEBP');
const asset='assets/images/dngworld-master-sculpture-v46.webp';
fs.mkdirSync(path.dirname(path.join(root,asset)),{recursive:true});
fs.writeFileSync(path.join(root,asset),source);
const art='<figure class="dng-master-art-v46" aria-hidden="true"><img src="/'+asset+'" width="880" height="880" alt="" decoding="async"><span class="dng-master-ground-v46"></span></figure>';
const style='<link rel="stylesheet" href="/assets/css/dngworld-master-v46.css" data-dng-master="v46">';
const families=[['hero25',/<section\b[^>]*class="[^"]*\bhero25\b[^"]*"[^>]*>/i],
 ['pricing',/<section\b[^>]*class="[^"]*\bp37-hero\b[^"]*"[^>]*>/i],
 ['v33',/<section\b[^>]*class="[^"]*\bv33-hero\b[^"]*"[^>]*>/i],
 ['portfolio',/<section\b[^>]*class="[^"]*\bpf-hero\b[^"]*"[^>]*>/i]];
let changed=0,views=0,homes=0,news=0;const by={};
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
 const file=path.join(dir,entry.name);if(entry.isDirectory()){walk(file);continue;}
 if(!entry.name.endsWith('.html'))continue;
 let html=fs.readFileSync(file,'utf8');
 const rel=path.relative(root,file).replaceAll(path.sep,'/');
 if(!/<body\b/i.test(html)||!/<main\b/i.test(html)||/<meta\b[^>]*http-equiv\s*=\s*["']?refresh/i.test(html))continue;
 if(html.includes('data-dng-master="v46"'))throw Error('V46 duplicate build pass: '+rel);
 const homeRoute=rel==='index.html';
 const newsroom=/(^|\/)(insights|insight)\//.test(rel);
 html=html.replace(/<body\b([^>]*)>/i,(m,a)=>{
   if(a.includes('dng-design-v46'))return m;
   const cls=/\bclass=(["'])(.*?)\1/i.exec(a);
   return cls?'<body'+a.replace(cls[0],'class='+cls[1]+cls[2]+' dng-design-v46'+cls[1])+'>':'<body'+a+' class="dng-design-v46">';
 });
 if(!homeRoute&&!newsroom){const family=families.find(x=>x[1].test(html));
   if(family){const open=family[1].exec(html);const end=html.indexOf('</section>',open.index);
     if(end<0)throw Error('V46 hero close missing: '+rel);
     html=html.slice(0,end)+art+html.slice(end);
     html=html.replace(open[0],open[0].slice(0,-1)+' data-dng-hero-v46="'+family[0]+'">');
     views++;by[family[0]]=(by[family[0]]||0)+1;
   }
 }
 if(homeRoute)homes++;if(newsroom)news++;
 html=html.replace(/<\/head\s*>/i,style+'</head>');
 fs.writeFileSync(file,html);changed++;
}}
walk(root);
const motionFile=path.join(root,'assets/js/dngworld-v31-motion.js');
let motion=fs.readFileSync(motionFile,'utf8');
const old="if(area&& !document.body.classList.contains('dng-home-v31')){";
if(!motion.includes(old))throw Error('V46 old automatic extra 3D injection signature changed');
motion=motion.replace(old,"if(area&& !document.body.classList.contains('dng-home-v31') && !document.body.classList.contains('dng-design-v46')){");
fs.writeFileSync(motionFile,motion);
if(changed<60||views<8||!homes||!news)throw Error('V46 low coverage '+JSON.stringify({changed,views,homes,news,by}));
console.log('V46 unified canonical V24 art:',source.length,'bytes,',changed,'pages,',views,'hero variants:',by);
