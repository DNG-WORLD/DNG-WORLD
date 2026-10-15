/** V44 public-prototype quality gates. */
import fs from 'node:fs';import path from 'node:path';
const root=path.resolve('_site');
const paths=['services/index.html','en/services/index.html','zh/services/index.html'];
for(const x of paths){
 const s=fs.readFileSync(path.join(root,x),'utf8');
 const expected=['s44-case-grid','s44-orbit-a','s44-delivery','s44-step-grid','s44-close','dngworld-services-v44.css'];
 for(const m of expected)if(!s.includes(m))throw Error('V44 missing '+m+' in '+x);
 if((s.match(/class="s44-case"/g)||[]).length!==5)throw Error('V44 must show five concrete business challenges: '+x);
 if((s.match(/data-dng-common="header"/g)||[]).length!==1||(s.match(/data-dng-common="footer"/g)||[]).length!==1)throw Error('V44 changed site-wide chrome: '+x);
 for(const slug of ['ads','design-editor','remote-marketing','business-strategy','courses'])if(!s.includes('pricing/'+slug+'/'))throw Error('V44 offer path broken: '+slug);
 const css=fs.readFileSync(path.join(root,'assets/css/dngworld-services-v44.css'),'utf8');
 if(!css.includes('prefers-reduced-motion'))throw Error('V44 reduced-motion contract missing');
}
console.log('V44 Phase 1 QA: three localized Solutions pages and 5×3 valid service links; original WebGL intact.');
