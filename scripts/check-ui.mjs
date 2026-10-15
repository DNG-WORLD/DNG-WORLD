/** DNGWORLD V38: production-output smoke tests without touching content. */
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('_site');const css='/assets/css/dngworld-ui-polish-v38.css';
const required=['index.html','favicon.svg',css.slice(1),'insights/index.html','pricing/index.html','en/index.html','zh/index.html','data/newsroom.json',...['courses','ads','design-editor','remote-marketing','business-strategy'].flatMap(slug=>['','en/','zh/'].map(lang=>lang+'pricing/'+slug+'/index.html'))];
const missing=required.filter(p=>!fs.existsSync(path.join(root,p)));if(missing.length)throw Error('V38 missing outputs: '+missing.join(', '));
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');if(!home.includes('id="artCanvas"'))throw Error('V38 WebGL canvas missing');
let all=0;function scan(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory()){scan(file);continue;}if(!entry.isFile()||!entry.name.endsWith('.html'))continue;const html=fs.readFileSync(file,'utf8');if(!/<\/head\s*>/i.test(html))continue;const n=(html.match(/data-dng-ui="v38"/g)||[]).length;if(n!==1||!html.includes(css))throw Error('V38 stylesheet missing or duplicated: '+file);all++;}}
scan(root);if(all<20)throw Error('V38 HTML coverage too small: '+all);console.log('V38 QA OK:',required.length,'required routes/assets,',all,'HTML pages, home WebGL marker preserved');
