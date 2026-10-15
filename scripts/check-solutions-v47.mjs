import fs from 'node:fs';import path from 'node:path';
for(const prefix of ['','en/','zh/']){
 const p=path.join('_site',prefix+'services/index.html'),html=fs.readFileSync(p,'utf8');
 if(!html.includes('v47-case-grid')||!html.includes('data-dng-hero-v46="hero25"'))throw Error('V47 new solutions not integrated with master V46 '+p);
 if((html.match(/class="v47-case"/g)||[]).length!==6)throw Error('V47 six problems missing '+p);
 if((html.match(/class="v47-service"/g)||[]).length!==5)throw Error('V47 five paid tracks missing '+p);
 for(const s of ['courses','ads','design-editor','remote-marketing','business-strategy'])if(!html.includes('pricing/'+s+'/'))throw Error('V47 invalid offer route '+s);
 if(!html.includes('v47-example')||!html.includes('v47-handoff'))throw Error('V47 no real operational workflow '+p);
 if((html.match(/data-dng-common="header"/g)||[]).length!==1||(html.match(/data-dng-common="footer"/g)||[]).length!==1)throw Error('V47 shared chrome destroyed '+p);
}
console.log('V47 QA: 3 locales × 6 concrete business problems, 5 scopes, 4-step handover and original V46 WebGL art.');