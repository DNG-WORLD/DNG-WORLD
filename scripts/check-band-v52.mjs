/** V52: one true WebGL band per business hero; zero decorative cards. */
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('_site');
const file=path.join(root,'assets/dngworld-v52-live-scene.html');
if(!fs.existsSync(file))throw Error('Standalone original V24 WebGL scene missing');
const scene=fs.readFileSync(file,'utf8');
for(const token of ['id="mesh-data"','id="artCanvas"','function getMesh()','const VERTEX=','const FRAGMENT=','function draw(now)','dngworld-scene-v52.js'])
 if(!scene.includes(token))throw Error('Not actual V24 WebGL, missing '+token);
if(scene.length<1500000)throw Error('V24 original 3D mesh was truncated');
const css=fs.readFileSync(path.join(root,'assets/css/dngworld-hero-band-v52.css'),'utf8');
if(!css.includes('33.333svh')||!css.includes('width:100%!important')||!css.includes('data-dw52-stage'))
 throw Error('Full width 1/3 viewport contract violated');
const routes=['services/index.html','about/index.html','contact/index.html','tools/index.html','portfolio/index.html','pricing/index.html','pricing/courses/index.html','pricing/ads/index.html','pricing/design-editor/index.html','pricing/remote-marketing/index.html','pricing/business-strategy/index.html','en/services/index.html','zh/services/index.html'];
let total=0;const groups=new Set();
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){
 const file=path.join(dir,e.name);if(e.isDirectory()){walk(file);continue}
 if(!e.name.endsWith('.html')||e.name.includes('dngworld-v52-live-scene'))continue;
 const h=fs.readFileSync(file,'utf8');
 if(!h.includes('data-dw52-stage="true"'))continue;total++;
 if((h.match(/data-dw52-stage="true"/g)||[]).length!==1)throw Error('Duplicate 3D bands '+file);
 if(h.includes('data-dng-cover-version="v50"')||h.includes('dng-cover-3d-v50'))throw Error('V50 cover still rendered: '+file);
 if(!h.includes('/assets/dngworld-v52-live-scene.html')||!h.includes('dngworld-hero-band-v52.css'))throw Error('Band engine missing '+file);
 const m=/data-dng-hero-v46="([^"]+)"/.exec(h);if(m)groups.add(m[1]);
}}
walk(root);
for(const r of routes){
 const f=path.join(root,r);if(!fs.existsSync(f))throw Error('Missing business route '+r);
 if(!fs.readFileSync(f,'utf8').includes('data-dw52-stage="true"'))throw Error('No live WebGL hero: '+r);
}
for(const r of ['index.html','en/index.html','zh/index.html','insights/index.html','en/insights/index.html','zh/insights/index.html']){
 const h=fs.readFileSync(path.join(root,r),'utf8');
 if(h.includes('data-dw52-stage="true"'))throw Error('V24 home or video-first News should not get a subpage band '+r);
}
if(total<25||!groups.has('hero25')||!groups.has('pricing')||!groups.has('portfolio'))throw Error('Low V52 coverage '+total+' groups '+[...groups]);
if(!fs.readFileSync(path.join(root,'index.html'),'utf8').includes('id="artCanvas"'))throw Error('Homepage original WebGL deleted');
console.log('V52 real WebGL band:',total,'business pages across', [...groups].join(', '),'; homepage/News preserved.');
