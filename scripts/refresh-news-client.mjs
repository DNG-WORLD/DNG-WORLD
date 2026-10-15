/** Generated-only client refresh: never modify the original News & TV renderer. */
import fs from 'node:fs';
import path from 'node:path';
const file=path.resolve('_site/assets/js/dngworld-newsroom-v31.js');
if(!fs.existsSync(file))throw Error('V40 News & TV renderer absent');
let s=fs.readFileSync(file,'utf8');
const anchor='initNav();initVideo();load();';
if(!s.includes(anchor))throw Error('V40 newsroom bootstrap changed; refuse unsafe injection');
s=s.replace(anchor,`initNav();initVideo();load();
let lastNewsRefresh=Date.now();
const refreshNewsOnVisible=()=>{if(document.visibilityState!=='hidden' && Date.now()-lastNewsRefresh>=4*60*1000){lastNewsRefresh=Date.now();load();}};
setInterval(refreshNewsOnVisible,60*1000);
document.addEventListener('visibilitychange',refreshNewsOnVisible);`);
const marker="const date=fmt(data.updated_at);const state=";
if(!s.includes(marker))throw Error('V40 missing News timestamp marker');
s=s.replace(marker,"const age=Date.parse(data.updated_at||'');if(Number.isFinite(age)&&Date.now()-age>90*60*1000)data.status='stale';\n const date=fmt(data.updated_at);const state=");
fs.writeFileSync(file,s);console.log('V40 News & TV: active-page polling + stale indicator');
