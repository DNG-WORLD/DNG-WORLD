/** Restore confidential VI/EN/ZH portfolio after V33 legacy render, keep source in Git. */
import fs from 'node:fs';
import path from 'node:path';
const target=path.resolve('_site');
for(const lang of ['vi','en','zh']) {
 const relative=(lang==='vi'?'':lang+'/')+'portfolio/index.html';
 const raw=fs.readFileSync(relative,'utf8');
 if(!raw.includes('data-portfolio-gate')||!raw.includes('noindex,nofollow')||!raw.includes('portfolio-v90.js'))throw Error('V39 privacy guard failed: '+relative);
 const p=path.join(target,relative);fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,raw);
}
const map=path.join(target,'sitemap.xml');
if(fs.existsSync(map)){let xml=fs.readFileSync(map,'utf8');for(const lang of ['','en/','zh/'])xml=xml.replaceAll('<url><loc>https://dng-world.github.io/'+lang+'portfolio/</loc></url>','');fs.writeFileSync(map,xml);}
for(const file of ['content/portfolio-v72.enc.json','assets/js/portfolio-v90.js','assets/css/private-portfolio-v39.css'])if(!fs.existsSync(path.join(target,file)))throw Error('V39 asset missing: '+file);
console.log('V39: private Portfolio pages active; no public menu exposure');
