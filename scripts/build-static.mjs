import fs from 'node:fs';
import path from 'node:path';
const out='_site';
const allowedDirs=new Set(['assets','public','en','zh','about','contact','services','tools','insights','insight','portfolio','pricing','pricing-marketing','pricing-video','lang','data','content','downloads']);
const allowedFiles=new Set(['index.html','404.html','favicon.svg','apple-touch-icon.png','robots.txt','site.webmanifest','about.html','contact.html','insights.html','insight.html','portfolio.html','pricing.html','pricing-video.html','pricing-marketing.html']);
fs.rmSync(out,{recursive:true,force:true}); fs.mkdirSync(out);
for (const name of fs.readdirSync('.')) {
  if (allowedDirs.has(name) && fs.statSync(name).isDirectory()) fs.cpSync(name,path.join(out,name),{recursive:true});
  if (allowedFiles.has(name) && fs.statSync(name).isFile()) fs.copyFileSync(name,path.join(out,name));
}
// Do not leak backend, admin, .env, editorial drafts, or historical build data to public hosting.
// Nested protected paths in /public are part of the legacy repository: remove any PHP or config artifacts from public output.
function scrub(dir){ for(const n of fs.readdirSync(dir)){ const p=path.join(dir,n);if(fs.statSync(p).isDirectory()){if(n==='.git'||n==='admin'||n==='node_modules'||n==='vendor'||n==='tests'){fs.rmSync(p,{recursive:true,force:true})}else scrub(p)}else if(/\.(php|env|sql|sqlite|md|lock|gs|py|sh|yml|yaml)$/i.test(n)||n==='.env'){fs.rmSync(p,{force:true})}}}
scrub(out);
fs.writeFileSync(path.join(out,'.nojekyll'),'');
console.log('DNGWORLD public artifact generated:',fs.readdirSync(out).length,'top-level entries');
