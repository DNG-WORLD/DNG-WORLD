import fs from 'node:fs';import path from 'node:path';
const root=path.resolve('_site');
for(const lang of ['vi','en','zh']){
 const rel=(lang==='vi'?'':lang+'/')+'index.html';
 const s=fs.readFileSync(path.join(root,rel),'utf8');
 for(const marker of ['v49-problems','v49-service-list','v49-how-grid','v49-close','dngworld-home-v49.css'])if(!s.includes(marker))throw Error('V49 section missing '+rel+' '+marker);
 for(const sku of ['courses','ads','design-editor','remote-marketing','business-strategy'])if(!s.includes('pricing/'+sku+'/'))throw Error('V49 missing offer '+sku+' in '+rel);
 if((s.match(/class="v49-service"/g)||[]).length!==5)throw Error('V49 must have exactly five service routes '+rel);
 if((s.match(/class="v49-problem"/g)||[]).length!==3)throw Error('V49 must have exactly three problem entry points '+rel);
 if(!s.includes('data-dng-common="header"')||!s.includes('data-dng-common="footer"'))throw Error('V49 common chrome missing '+rel);
 if(lang==='vi'){if(!s.includes('id="artCanvas"')||s.includes('THE DNGWORLD DISCIPLINES'))throw Error('V49 original WebGL destroyed or redundant tape remains');}
 else {if(s.includes('id="newsGrid"')||s.includes('dngworld-newsroom-v31.js')||!s.includes('data-dng-hero-v46="hero25"'))throw Error('V49 '+lang+' root still routes to News rather than business Homepage');}
}
console.log('V49 verified three localized Business homepages, original VI WebGL and conversion journey.');
