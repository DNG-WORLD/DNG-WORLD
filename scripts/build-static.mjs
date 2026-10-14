import fs from 'node:fs';
import path from 'node:path';
const out='_site';
const allowedDirs=new Set(['assets','public','en','zh','about','contact','services','tools','insights','insight','portfolio','pricing','pricing-marketing','pricing-video','posts','success','lang','data','content','downloads']);
const allowedFiles=new Set(['index.html','404.html','favicon.svg','apple-touch-icon.png','robots.txt','site.webmanifest','about.html','contact.html','services.html','tools.html','success.html','insights.html','insight.html','portfolio.html','pricing.html','pricing-video.html','pricing-marketing.html']);
fs.rmSync(out,{recursive:true,force:true}); fs.mkdirSync(out);
for (const name of fs.readdirSync('.')) {
  if (allowedDirs.has(name) && fs.statSync(name).isDirectory()) fs.cpSync(name,path.join(out,name),{recursive:true});
  if (allowedFiles.has(name) && fs.statSync(name).isFile()) fs.copyFileSync(name,path.join(out,name));
}
// Remove backend/admin artifacts from the public GitHub Pages build.
function scrub(dir){ for(const n of fs.readdirSync(dir)){ const p=path.join(dir,n);if(fs.statSync(p).isDirectory()){if(n==='.git'||n==='admin'||n==='node_modules'||n==='vendor'||n==='tests'){fs.rmSync(p,{recursive:true,force:true})}else scrub(p)}else if(/\.(php|env|sql|sqlite|md|lock|gs|py|sh|yml|yaml)$/i.test(n)||n==='.env'){fs.rmSync(p,{force:true})}}}
scrub(out);
// Static GitHub Pages has no plugin server: use the native tel: action on every HTML page.
// Only modifies the _site build output, not the source of unrelated pages.
const callWidget=`<a class="dng-call-v27" href="tel:0377348008" aria-label="Gọi DNGWORLD theo số 0377 348 008" title="Gọi ngay: 0377 348 008"><span class="dng-call-v27__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.11 4.18 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.13.95.37 1.89.7 2.78a2 2 0 0 1-.45 2.11L8.09 9.87a16 16 0 0 0 6 6l1.27-1.26a2 2 0 0 1 2.11-.45c.89.33 1.83.57 2.78.7A2 2 0 0 1 22 16.92z"/></svg></span><span class="dng-call-v27__text">GỌI NGAY<small>0377 348 008</small></span></a>`;
let count=0;
function addCall(dir){for(const name of fs.readdirSync(dir)){const p=path.join(dir,name);if(fs.statSync(p).isDirectory()){addCall(p);continue}if(!name.endsWith('.html'))continue;
  let html=fs.readFileSync(p,'utf8');if(!html.includes('</head>')||!html.includes('</body>'))continue;
  if(!html.includes('dngworld-call-v27.css'))html=html.replace('</head>','<link rel="stylesheet" href="/assets/css/dngworld-call-v27.css"></head>');
  if(!html.includes('class="dng-call-v27"'))html=html.replace('</body>',callWidget+'</body>');
  fs.writeFileSync(p,html);count++;
}}
addCall(out);
fs.writeFileSync(path.join(out,'.nojekyll'),'');
console.log('DNGWORLD public artifact generated; call links injected into',count,'HTML files.');
