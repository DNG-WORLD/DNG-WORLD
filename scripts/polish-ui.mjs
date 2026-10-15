/** DNGWORLD V38: generated-HTML-only, idempotent CSS injection. */
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('_site'),href='/assets/css/dngworld-ui-polish-v38.css';
if(!fs.existsSync(path.join(root,href.slice(1))))throw Error('V38 stylesheet missing in build output');
let changed=0,skipped=0;
function visit(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const full=path.join(dir,item.name);if(item.isDirectory()){visit(full);continue;}if(!item.isFile()||!item.name.endsWith('.html'))continue;const original=fs.readFileSync(full,'utf8');if(!/<\/head\s*>/i.test(original)||original.includes('data-dng-ui="v38"')){skipped++;continue;}const link='<link rel="stylesheet" href="'+href+'" data-dng-ui="v38">';const next=original.replace(/<\/head\s*>/i,link+'</head>');if(next.replace(link,'')!==original)throw Error('V38 non-additive HTML mutation: '+full);fs.writeFileSync(full,next);changed++;}}
visit(root);if(!changed)throw Error('V38: no pages injected');
console.log('V38: linked stylesheet on',changed,'HTML pages; skipped',skipped);
