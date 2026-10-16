/**
 * DNGWORLD V52: reuse exact V24 WebGL mesh, shaders, model and animation
 * within a full-bleed one-third-screen-height band on each subpage.
 * All edits are to generated _site only.
 */
import fs from 'node:fs';import path from 'node:path';
const root=path.resolve('_site'),home=fs.readFileSync(path.join(root,'index.html'),'utf8');
const mesh=/<script id="mesh-data" type="application\/octet-stream">([\s\S]*?)<\/script>/i.exec(home);
const from=home.lastIndexOf('  function perspective(');
const endMarker='  requestAnimationFrame(draw);';
const rendererScriptEnd=home.indexOf('</script>',from);
const to=home.lastIndexOf(endMarker,rendererScriptEnd);
if(!mesh||mesh[1].length<1500000||from<0||to<0||!home.includes('id="artCanvas"'))
 throw Error('V52 original V24 WebGL mesh/renderer missing; do not create a fake replacement.');
const render=home.slice(from,to+endMarker.length);
for(const term of ['const VERTEX=','const FRAGMENT=','function getMesh()','function draw(now)'])
 if(!render.includes(term))throw Error('V52 original WebGL shader path missing: '+term);
const fallback='/assets/images/dngworld-master-sculpture-v46.webp';
if(!fs.existsSync(path.join(root,fallback.slice(1))))throw Error('V52 V24 fallback unavailable');
const start='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><meta name="viewport" content="width=device-width,initial-scale=1"><title>DNGWORLD original WebGL 3D</title><link rel="stylesheet" href="/assets/css/dngworld-scene-v52.css"></head><body><canvas id="dw52Field" aria-hidden="true"></canvas><div id="art"><img src="'+fallback+'" class="sculpt-fallback" alt=""><canvas id="artCanvas"></canvas></div><script id="mesh-data" type="application/octet-stream">';
const middle='</script><script>(()=>{"use strict";const art=document.getElementById("art"),canvas=document.getElementById("artCanvas"),isReduced=matchMedia("(prefers-reduced-motion: reduce)").matches;const state={selection:0,rot:[.20,-.40,-.14],target:[.20,-.40,-.14],dragging:false,pointer:null,last:performance.now(),visible:true};window.DNGFusion={x:0,y:0,paused:isReduced};window.__DNGV52_STATE=state;\n';
const end='\n})();</script><script src="/assets/js/dngworld-scene-v52.js"></script></body></html>';
fs.writeFileSync(path.join(root,'assets/dngworld-v52-live-scene.html'),
 start+mesh[1]+middle+render+end);
const original='<figure class="dng-master-art-v46" aria-hidden="true"><img src="'+fallback+'" width="880" height="880" alt="" decoding="async"><span class="dng-master-ground-v46"></span></figure>';
const band='<div class="dw52-stage" data-dw52-stage="true"><iframe class="dw52-iframe" title="DNGWORLD — original interactive WebGL 3D" src="/assets/dngworld-v52-live-scene.html" loading="eager" scrolling="no"></iframe><span class="dw52-stage-label" aria-hidden="true">DNGWORLD / LIVING DEPTH</span></div>';
let n=0;const classes={},errors=[];
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){
 const f=path.join(dir,e.name);if(e.isDirectory()){walk(f);continue}
 if(!e.name.endsWith('.html')||f.endsWith('dngworld-v52-live-scene.html'))continue;
 let h=fs.readFileSync(f,'utf8');
 const m=/<section\b[^>]*data-dng-hero-v46="([^"]+)"[^>]*>/i.exec(h);if(!m)continue;
 const route=path.relative(root,f).replaceAll(path.sep,'/');
 if(!h.includes(original)){errors.push('Original V24 model missing '+route);continue}
 if(h.includes('data-dw52-stage="true"')){errors.push('Repeated V52 '+route);continue}
 h=h.replace(original,'').replace(m[0],m[0]+band);
 h=h.replace(/<\/head\s*>/i,'<link rel="stylesheet" href="/assets/css/dngworld-hero-band-v52.css" data-dw52-css="true"></head>');
 fs.writeFileSync(f,h);n++;classes[m[1]]=(classes[m[1]]||0)+1;
}}
walk(root);
for(const r of ['index.html','en/index.html','zh/index.html','insights/index.html','en/insights/index.html','zh/insights/index.html'])
 if(fs.readFileSync(path.join(root,r),'utf8').includes('data-dw52-stage="true"'))errors.push('Homepage/News modified '+r);
if(n<10||!classes.hero25||!classes.pricing||errors.length)throw Error('V52 contract '+JSON.stringify({n,classes,errors}));
console.log('V52 live V24 GL band on',n,'subpages, families',JSON.stringify(classes),'GL code bytes',render.length);
