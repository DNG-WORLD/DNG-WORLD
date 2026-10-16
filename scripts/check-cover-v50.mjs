/* Production-output contract for the one-component subpage 3D covers. */
import fs from 'node:fs';import path from 'node:path';
const root=path.resolve('_site');
const required=[
 'services/index.html','tools/index.html','about/index.html','contact/index.html',
 'pricing/index.html','pricing/courses/index.html','pricing/ads/index.html',
 'pricing/design-editor/index.html','pricing/remote-marketing/index.html',
 'pricing/business-strategy/index.html','en/services/index.html','zh/services/index.html',
 'portfolio/index.html'
];
const asset='/assets/images/dngworld-master-sculpture-v46.webp';
let pages=0;
function scan(dir){for(const f of fs.readdirSync(dir,{withFileTypes:true})){
 const file=path.join(dir,f.name);
 if(f.isDirectory()){scan(file);continue}if(!file.endsWith('.html'))continue;
 const s=fs.readFileSync(file,'utf8');if(!s.includes('data-dng-cover="v50"'))continue;
 pages++;
 for(const x of ['data-dng-cover="v50"','data-dng-cover-version="v50"','class="dng-master-art-v46"'])
   if((s.match(new RegExp(x,'g'))||[]).length!==1)throw Error('Cover not unique: '+file+' '+x);
 if(!s.includes('dngworld-hero-cover-v50.css')||!s.includes('dngworld-hero-cover-v50.js')||!s.includes(asset))
   throw Error('V50 missing stylesheet/script/art '+file);
}}
scan(root);
if(pages<8)throw Error('V50 insufficient shared covers '+pages);
for(const route of required){
 const full=path.join(root,route);
 if(!fs.existsSync(full))throw Error('Missing route '+route);
 if(!fs.readFileSync(full,'utf8').includes('data-dng-cover="v50"'))throw Error('V50 missing cover '+route);
}
for(const route of ['index.html','en/index.html','zh/index.html','insights/index.html','en/insights/index.html','zh/insights/index.html']){
 const s=fs.readFileSync(path.join(root,route),'utf8');
 if(s.includes('data-dng-cover-version="v50"'))throw Error('Homepage/News must not have subpage cover: '+route);
}
if(!fs.readFileSync(path.join(root,'index.html'),'utf8').includes('id="artCanvas"'))throw Error('Original V24 WebGL homepage lost');
const css=fs.readFileSync(path.join(root,'assets/css/dngworld-hero-cover-v50.css'),'utf8');
for(const token of ['aspect-ratio:16 / 10','prefers-reduced-motion','max-width:760px'])
 if(!css.includes(token))throw Error('Shared V50 design token missing '+token);
console.log('V50 QA passed: '+pages+' consistent 3D cover heroes; VI/EN/ZH; pricing & functional routes preserved.');
