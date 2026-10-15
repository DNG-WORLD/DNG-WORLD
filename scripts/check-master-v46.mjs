import fs from 'node:fs';import path from 'node:path';
const root=path.resolve('_site'),asset='assets/images/dngworld-master-sculpture-v46.webp';
const b=fs.readFileSync(path.join(root,asset));
if(b.length<15000||b.toString('ascii',0,4)!=='RIFF'||b.toString('ascii',8,12)!=='WEBP')throw Error('Master WEBP invalid');
let pages=0,heros=0;const groups=new Set();
function visit(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory()){visit(f);continue}if(!e.name.endsWith('.html'))continue;const h=fs.readFileSync(f,'utf8');if(!h.includes('data-dng-master="v46"'))continue;pages++;if(!h.includes('dng-design-v46'))throw Error('Missing V46 root class '+f);if(h.includes('class="dng-master-art-v46"')){heros++;if((h.match(/class="dng-master-art-v46"/g)||[]).length!==1)throw Error('Multiple objects '+f);if(!h.includes('/'+asset))throw Error('Wrong canonical art '+f);const m=/data-dng-hero-v46="([^"]+)"/.exec(h);if(m)groups.add(m[1]);}}}
visit(root);
const h=fs.readFileSync(path.join(root,'index.html'),'utf8');if(!h.includes('id="artCanvas"'))throw Error('Homepage WebGL lost');
const motion=fs.readFileSync(path.join(root,'assets/js/dngworld-v31-motion.js'),'utf8');if(!motion.includes("!document.body.classList.contains('dng-design-v46')"))throw Error('Old orphan orbs still enabled');
for(const c of ['hero25','pricing','portfolio'])if(!groups.has(c))throw Error('V46 hero family missing '+c);
if(pages<50||heros<8)throw Error('V46 insufficient coverage '+pages+' '+heros);
console.log('V46 QA verified',pages,'documents,',heros,'canonical hero views; groups:',[...groups].join(', '));
