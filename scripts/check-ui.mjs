/** DNGWORLD V38: production-output smoke tests without touching content. */
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('_site');const css='/assets/css/dngworld-ui-polish-v38.css';
const required=['index.html','favicon.svg',css.slice(1),'insights/index.html','pricing/index.html','en/index.html','zh/index.html','data/newsroom.json',...['courses','ads','design-editor','remote-marketing','business-strategy'].flatMap(slug=>['','en/','zh/'].map(lang=>lang+'pricing/'+slug+'/index.html'))];
const missing=required.filter(p=>!fs.existsSync(path.join(root,p)));if(missing.length)throw Error('V38 missing outputs: '+missing.join(', '));
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');if(!home.includes('id="artCanvas"'))throw Error('V38 WebGL canvas missing');
let all=0;function scan(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory()){scan(file);continue;}if(!entry.isFile()||!entry.name.endsWith('.html')||file.endsWith('assets/dngworld-v52-live-scene.html'))continue;const html=fs.readFileSync(file,'utf8');if(!/<\/head\s*>/i.test(html))continue;const n=(html.match(/data-dng-ui="v38"/g)||[]).length;if(n!==1||!html.includes(css))throw Error('V38 stylesheet missing or duplicated: '+file);all++;}}
scan(root);if(all<20)throw Error('V38 HTML coverage too small: '+all);for(const lang of ['','en/','zh/']) {const p=path.join(root,lang+'portfolio/index.html'),h=fs.readFileSync(p,'utf8');if(!h.includes('data-portfolio-gate')||!h.includes('noindex,nofollow')||h.includes('http-equiv="refresh"'))throw Error('V39 private Portfolio invalid: '+p);}
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');if(/<loc>https:\/\/dng-world\.github\.io\/(?:en\/|zh\/)?portfolio\/<\/loc>/.test(sitemap))throw Error('V39 private Portfolio indexed');
console.log('V38 + V39 QA OK:',required.length,'required routes/assets,',all,'HTML pages, home WebGL marker preserved');

const v40css='assets/css/dngworld-unified-v40.css';
if(!fs.existsSync(path.join(root,v40css)))throw Error('V40 design system missing');
let shellCount=0,siteCount=0;
function verifyShells(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,item.name);if(item.isDirectory()){verifyShells(file);continue}if(!item.name.endsWith('.html'))continue;const html=fs.readFileSync(file,'utf8');if(!/<main\b/i.test(html)||!/<header\b/i.test(html)||!/<footer\b/i.test(html)||/<meta\b[^>]*http-equiv=["']?refresh/i.test(html))continue;siteCount++;if(!html.includes('data-dng-shell="header"')||!html.includes('data-dng-shell="footer"')||!html.includes('dngworld-unified-v40.css')||!html.includes('dng-unified-v40'))throw Error('V40 shell inconsistent: '+file);shellCount++;}}
verifyShells(root);if(siteCount<20||shellCount!==siteCount)throw Error('V40 insufficient shell coverage '+shellCount+'/'+siteCount);
const client=fs.readFileSync(path.join(root,'assets/js/dngworld-newsroom-v31.js'),'utf8');if(!client.includes('refreshNewsOnVisible')||!client.includes('stale'))throw Error('V40 client refresh missing');
console.log('V40 design audit:',shellCount,'unified pages; all original content routes retained');
