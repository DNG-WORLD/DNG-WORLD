import fs from 'node:fs';
import path from 'node:path';
// V50: generated-only shared 16:10 cover frame around the original V24 art.
const root=path.resolve('_site'),asset='/assets/images/dngworld-master-sculpture-v46.webp';
const orig='<figure class="dng-master-art-v46" aria-hidden="true"><img src="'+asset+'" width="880" height="880" alt="" decoding="async"><span class="dng-master-ground-v46"></span></figure>';
const cover='<div class="dng-cover-3d-v50" aria-hidden="true" data-dng-cover-version="v50"><span class="dng-cover-glow-v50"></span><div class="dng-cover-sculpt-v50">'+orig+'</div><span class="dng-cover-sheen-v50"></span></div>';
const errors=[],coverage={};let count=0;
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
 const file=path.join(dir,entry.name);
 if(entry.isDirectory()){walk(file);continue}
 if(!entry.isFile()||!entry.name.endsWith('.html'))continue;
 let html=fs.readFileSync(file,'utf8');
 const route=path.relative(root,file).replaceAll(path.sep,'/');
 const hero=/<section\b[^>]*data-dng-hero-v46="([^"]+)"[^>]*>/i.exec(html);
 if(!hero)continue;
 if(!html.includes(orig)){errors.push('Cannot find canonical V24 art: '+route);continue}
 if(html.includes('data-dng-cover-version="v50"')){errors.push('Duplicate cover: '+route);continue}
 html=html.replace(orig,cover).replace(hero[0],hero[0].slice(0,-1)+' data-dng-cover="v50">');
 html=html.replace(/<\/head\s*>/i,'<link rel="stylesheet" href="/assets/css/dngworld-hero-cover-v50.css" data-cover-style="v50"></head>');
 html=html.replace(/<\/body\s*>/i,'<script src="/assets/js/dngworld-hero-cover-v50.js" defer></script></body>');
 if((html.match(/data-dng-cover-version="v50"/g)||[]).length!==1){errors.push('Nonunique cover: '+route);continue}
 fs.writeFileSync(file,html);count++;coverage[hero[1]]=(coverage[hero[1]]||0)+1;
}}
walk(root);
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
if(!home.includes('id="artCanvas"')||home.includes('data-dng-cover-version="v50"'))errors.push('Original interactive Homepage must remain unchanged');
for(const rel of ['insights/index.html','en/insights/index.html','zh/insights/index.html']){
 if(fs.readFileSync(path.join(root,rel),'utf8').includes('data-dng-cover-version="v50"'))errors.push('News must stay video-first: '+rel);
}
if(count<8||!coverage.hero25||!coverage.pricing||errors.length)throw Error('V50 failed '+JSON.stringify({count,coverage,errors}));
console.log('V50: '+count+' common subpage covers; groups: '+JSON.stringify(coverage)+'; Home/News preserved.');
