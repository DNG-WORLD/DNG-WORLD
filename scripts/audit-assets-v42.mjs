/* Read-only repo hygiene audit; never removes or alters source files. */
import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {execFileSync} from 'node:child_process';
const tracked=execFileSync('git',['ls-files','-z']).toString().split('\0').filter(Boolean);
const assets=tracked.filter(f=>/^assets\/(?:images\/|[^/]+\.)(?!.*\.css)/.test(f)&&/\.(?:png|webp|jpg|jpeg|svg)$/i.test(f)).map(f=>({file:f,bytes:fs.statSync(f).size,sha:crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex')}));
const texts=[];function visit(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory()){visit(f);continue}if(!e.isFile()||!/(?:\.html|\.css|\.js|\.json|\.mjs|\.webmanifest)$/i.test(f)||e.name.endsWith('portfolio-v72.enc.json'))continue;texts.push(fs.readFileSync(f,'utf8'))}}
visit('_site');for(const f of tracked.filter(f=>/^(scripts\/|docs\/)/.test(f)&&/\.(?:mjs|js|py|md)$/i.test(f)))texts.push(fs.readFileSync(f,'utf8'));
const joined=texts.join('\n');
const orphan=assets.filter(x=>!joined.includes(path.basename(x.file))&& !joined.includes('/'+x.file)).sort((a,b)=>b.bytes-a.bytes);
const groups=new Map();for(const x of assets){const arr=groups.get(x.sha)||[];arr.push(x);groups.set(x.sha,arr)}
const duplicate=[...groups.values()].filter(v=>v.length>1).map(g=>({bytes:g[0].bytes,files:g.map(x=>x.file)}));
const report={repoFiles:tracked.length,assets:assets.length,unreferencedCount:orphan.length,unreferencedBytes:orphan.reduce((n,x)=>n+x.bytes,0),orphan,duplicates:duplicate,note:'Only basename string search in built HTML/CSS/JS/JSON/MJS. Orphans are candidates, NOT proof of disuse when paths are computed dynamically; never auto-delete.'};
fs.mkdirSync('audit-output',{recursive:true});fs.writeFileSync('audit-output/asset-inventory.json',JSON.stringify(report,null,2));
console.log('Tracked:',tracked.length,'Asset candidates:',assets.length,'Unreferenced:',orphan.length,'Approx MiB:',(report.unreferencedBytes/1048576).toFixed(2));
console.log('TOP ORPHANS');for(const x of orphan.slice(0,25))console.log((x.bytes/1048576).toFixed(2)+' MB '+x.file);
console.log('EXACT DUPLICATES');for(const g of duplicate)console.log((g.bytes/1048576).toFixed(2)+' MB '+g.files.join(' = '));
