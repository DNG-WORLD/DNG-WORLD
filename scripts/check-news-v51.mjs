/* V51 News health acceptance tests, built output only. */
import fs from 'node:fs';import path from 'node:path';
import {execFileSync} from 'node:child_process';
const root=path.resolve('_site'),n=JSON.parse(fs.readFileSync(path.join(root,'data/newsroom.json'),'utf8'));
if(n.status!=='ok'||!Array.isArray(n.news)||n.news.length<10)throw Error('News catalogue empty/unverified');
if(!n.updated_at||Number.isNaN(Date.parse(n.updated_at)))throw Error('No valid successful sync timestamp');
for(const lang of ['','en/','zh/']){
 const html=fs.readFileSync(path.join(root,lang+'insights/index.html'),'utf8');
 if(!html.includes('id="tvPortal"')||!html.includes('id="newsGrid"'))throw Error('News HTML missing player/feed '+lang);
}
const feed=fs.readFileSync(path.join(root,'assets/js/dngworld-newsroom-v31.js'),'utf8');
const reader=fs.readFileSync(path.join(root,'assets/js/dngworld-reader-v31.js'),'utf8');
for(const term of ["untranslated:origin(x)!==LANG","publishedInHour","visibleState","cache:'no-store'"])
 if(!feed.includes(term))throw Error('V51 News feed fallback/freshness missing '+term);
if(!reader.includes('untranslated:true')||!reader.includes('untranslatedNote'))throw Error('V51 original-language reader missing');
const updater=fs.readFileSync('scripts/update_news.py','utf8');
if(!updater.includes("key=lambda x:(x['published_at'],x.get('provenance')!='youtube_popular')"))throw Error('Recent-video sort missing');
const workflow=fs.readFileSync('.github/workflows/update-news.yml','utf8');
if(!workflow.includes('4,14,24,34,44,54 * * * *'))throw Error('V51 refresh scheduling missing');
execFileSync(process.execPath,['--check',path.join(root,'assets/js/dngworld-newsroom-v31.js')],{stdio:'pipe'});
execFileSync(process.execPath,['--check',path.join(root,'assets/js/dngworld-reader-v31.js')],{stdio:'pipe'});
console.log('V51 verified',n.news.length,'source headlines and original-language fallback in VI/EN/ZH.');
