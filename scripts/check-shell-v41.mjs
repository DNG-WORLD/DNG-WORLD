/** V41: verify exact shared chrome and protect source/page functionality. */
import fs from 'node:fs';import path from 'node:path';
const root=path.resolve('_site');
const required=['index.html','insights/index.html','tools/index.html','pricing/index.html','about/index.html','services/index.html','contact/index.html','portfolio/index.html','en/index.html','zh/index.html','en/pricing/index.html','zh/pricing/index.html'];
let full=0;
function scan(d){for(const x of fs.readdirSync(d,{withFileTypes:true})){const file=path.join(d,x.name);if(x.isDirectory()){scan(file);continue}if(!x.name.endsWith('.html'))continue;const h=fs.readFileSync(file,'utf8');if(!h.includes('data-dng-common="header"'))continue;full++;for(const marker of ['data-dng-common="header"','data-dng-common="footer"'])if(h.split(marker).length!==2)throw Error('V41 repeated/missing '+marker+' in '+file);if(!h.includes('dngworld-shell-v41.css')||!h.includes('dngworld-shell-v41.js'))throw Error('V41 assets missing '+file);if(!h.includes('dng-global-toggle'))throw Error('V41 mobile menu missing '+file)}}
scan(root);
for(const p of required){const f=path.join(root,p);if(!fs.existsSync(f))throw Error('V41 missing required route: '+p);if(!fs.readFileSync(f,'utf8').includes('data-dng-common="header"'))throw Error('V41 not applied to route: '+p)}
if(full<50)throw Error('V41 low coverage: '+full);
const h=fs.readFileSync(path.join(root,'index.html'),'utf8');if(!h.includes('id="artCanvas"')||!h.includes('class="hero-art'))throw Error('V41 WebGL markers missing');
const css=fs.readFileSync(path.join(root,'assets/css/dngworld-shell-v41.css'),'utf8');for(const k of ['.dng-global-header','.dng-global-footer','.hero .hero-art','.p37-hub-hero .p37-scene'])if(!css.includes(k))throw Error('V41 visual rule missing: '+k);
console.log('V41 QA: '+full+' unified pages, 12 critical routes, original WebGL and News/TV still present');
