import fs from 'node:fs';
import path from 'node:path';
const out = '_site';
const allowedDirs = new Set(['assets','public','en','zh','about','contact','services','tools','insights','insight','portfolio','pricing','pricing-marketing','pricing-video','posts','success','lang','data','content','downloads']);
const allowedFiles = new Set(['index.html','404.html','favicon.svg','apple-touch-icon.png','robots.txt','site.webmanifest','about.html','contact.html','services.html','tools.html','success.html','insights.html','insight.html','portfolio.html','pricing.html','pricing-video.html','pricing-marketing.html']);
fs.rmSync(out, {recursive:true, force:true});
fs.mkdirSync(out);
for (const name of fs.readdirSync('.')) {
  if (allowedDirs.has(name) && fs.statSync(name).isDirectory()) fs.cpSync(name, path.join(out,name), {recursive:true});
  if (allowedFiles.has(name) && fs.statSync(name).isFile()) fs.copyFileSync(name,path.join(out,name));
}
function scrub(dir){
  for (const name of fs.readdirSync(dir)){
    const p=path.join(dir,name);
    if(fs.statSync(p).isDirectory()){
      if(['.git','admin','node_modules','vendor','tests'].includes(name)) fs.rmSync(p,{recursive:true,force:true});
      else scrub(p);
    }else if(/\.(php|env|sql|sqlite|md|lock|gs|py|sh|yml|yaml)$/i.test(name)||name==='.env'){
      fs.rmSync(p,{force:true});
    }
  }
}
scrub(out);

// V28: Self-contained compact phone action. No external stylesheet or SVG.
// Remains safe even when users drag-and-drop uploads into a wrong GitHub folder.
const css = `<style id="dng-call-v28-style">
#dng-call-v28{box-sizing:border-box!important;position:fixed!important;z-index:10000!important;top:auto!important;left:auto!important;right:18px!important;bottom:calc(18px + env(safe-area-inset-bottom,0px))!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:9px!important;min-width:142px!important;width:auto!important;height:48px!important;max-height:48px!important;margin:0!important;padding:0 17px!important;overflow:hidden!important;border:1px solid rgba(250,222,173,.88)!important;border-radius:99px!important;background:#e5bf88!important;color:#173126!important;text-decoration:none!important;box-shadow:0 7px 24px rgba(0,0,0,.28)!important;font:700 12px/1 'DM Sans',Arial,sans-serif!important;letter-spacing:.035em!important;white-space:nowrap!important;transform:none!important;opacity:1!important;visibility:visible!important;touch-action:manipulation!important;-webkit-tap-highlight-color:transparent!important}
#dng-call-v28:hover{background:#f2d3a3!important;box-shadow:0 8px 25px rgba(0,0,0,.34)!important}
#dng-call-v28:focus-visible{outline:3px solid #ffe1ac!important;outline-offset:3px!important}
#dng-call-v28 .dng-call-v28-icon{box-sizing:border-box!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;position:static!important;width:22px!important;min-width:22px!important;max-width:22px!important;height:22px!important;min-height:22px!important;max-height:22px!important;font:400 22px/1 Arial,sans-serif!important;color:#173126!important;background:transparent url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23173126%22%20stroke-width%3D%222.2%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M22%2016.9v3a2%202%200%200%201-2.18%202%2019.8%2019.8%200%200%201-8.63-3.07%2019.5%2019.5%200%200%201-6-6A19.8%2019.8%200%200%201%202.11%204.18%202%202%200%200%201%204.1%202h3a2%202%200%200%201%202%201.72c.13.95.37%201.89.7%202.78a2%202%200%200%201-.45%202.11L8.09%209.87a16%2016%200%200%200%206%206l1.27-1.26a2%202%200%200%201%202.11-.45c.89.33%201.83.57%202.78.7A2%202%200%200%201%2022%2016.9z%22%2F%3E%3C%2Fsvg%3E") center / 22px 22px no-repeat!important;transform:none!important;overflow:hidden!important;font-size:0!important}
#dng-call-v28 .dng-call-v28-label{font:700 12px/1 'DM Sans',Arial,sans-serif!important;letter-spacing:.04em!important;color:#173126!important;display:block!important;transform:none!important}
@media(max-width:760px){#dng-call-v28{right:15px!important;bottom:calc(16px + env(safe-area-inset-bottom,0px))!important;width:54px!important;min-width:54px!important;max-width:54px!important;height:54px!important;min-height:54px!important;max-height:54px!important;padding:0!important;gap:0!important;border-radius:50%!important}#dng-call-v28 .dng-call-v28-icon{width:25px!important;min-width:25px!important;max-width:25px!important;height:25px!important;min-height:25px!important;max-height:25px!important;background-size:25px 25px!important;font-size:0!important}#dng-call-v28 .dng-call-v28-label{display:none!important}}
@media print{#dng-call-v28{display:none!important}}
</style>`;
const widget='<a id="dng-call-v28" href="tel:0377348008" aria-label="Gọi ngay DNGWORLD: 0377 348 008" title="Gọi ngay: 0377 348 008"><span class="dng-call-v28-icon" aria-hidden="true">☎</span><span class="dng-call-v28-label">GỌI NGAY</span></a>';
let count=0;
function inject(dir){
  for (const name of fs.readdirSync(dir)){
    const p=path.join(dir,name);
    if(fs.statSync(p).isDirectory()){inject(p);continue;}
    if(!name.endsWith('.html'))continue;
    let html=fs.readFileSync(p,'utf8');
    if(!html.includes('</head>')||!html.includes('</body>'))continue;
    // Remove V27 widget and broken CSS link (source snapshots may contain either).
    html=html.replace(/<link\b[^>]*dngworld-call-v27\.css[^>]*>/gi,'');
    html=html.replace(/<a\b[^>]*class=["']dng-call-v27["'][^>]*>[\s\S]*?<\/a>/gi,'');
    html=html.replace(/<style\b[^>]*id=["']dng-call-v28-style["'][^>]*>[\s\S]*?<\/style>/gi,'');
    html=html.replace(/<a\b[^>]*id=["']dng-call-v28["'][^>]*>[\s\S]*?<\/a>/gi,'');
    html=html.replace('</head>',css+'</head>');
    html=html.replace('</body>',widget+'</body>');
    fs.writeFileSync(p,html);
    count++;
  }
}

// V30: Canonical URL, indexability, robots and sitemap QA.
// Actual published GitHub Pages host is dng-world.github.io, not dngworld.github.io.
const liveSite = 'https://dng-world.github.io';
const xmlEscape = x => String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const validPages=[];
function seoNormalize(dir){
  for(const n of fs.readdirSync(dir)){
    const file=path.join(dir,n);
    if(fs.statSync(file).isDirectory()){seoNormalize(file);continue;}
    if(!n.endsWith('.html'))continue;
    let html=fs.readFileSync(file,'utf8');
    // Also fix hardcoded old-domain metadata in old localized/static pages.
    html=html.replace(/https:\/\/dngworld\.github\.io/gi,liveSite);
    const rel=path.relative(out,file).replace(/\\/g,'/');
    const route=rel==='index.html'?'/':rel.endsWith('/index.html')?'/'+rel.slice(0,-'index.html'.length):'/'+rel;
    const redirect=/<meta\b[^>]*http-equiv\s*=\s*["']?refresh/i.test(html);
    const ephemeral=route.startsWith('/insights/read/') || route.startsWith('/success/');
    const hasNoindex=/<meta\b(?=[^>]*name\s*=\s*["']robots["'])(?=[^>]*content\s*=\s*["'][^"']*noindex)/i.test(html);
    if((redirect||ephemeral) && !hasNoindex){html=html.replace('</head>','<meta name="robots" content="noindex,follow"></head>');}
    const hasCanonical=/<link\b[^>]*rel\s*=\s*["']canonical["']/i.test(html);
    if(!hasCanonical && !redirect && !ephemeral && !hasNoindex){
      html=html.replace('</head>',`<link rel="canonical" href="${liveSite+route}"></head>`);
    }
    fs.writeFileSync(file,html);
    if(!redirect && !ephemeral && !hasNoindex && !route.endsWith('.html') && !route.startsWith('/public/') && !route.startsWith('/assets/') && !route.startsWith('/content/') && !route.startsWith('/data/')){
      validPages.push(route);
    }
  }
}
inject(out);
seoNormalize(out);
// Pages is deployed from _site; root sitemap from source was previously omitted entirely.
const sitemapRoutes=[...new Set(validPages)].sort((a,b)=>a==='/'?-1:b==='/'?1:a.localeCompare(b));
const siteMap=['<?xml version="1.0" encoding="UTF-8"?>','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',...sitemapRoutes.map(x=>'  <url><loc>'+xmlEscape(liveSite+x)+'</loc></url>'),'</urlset>',''].join('\n');
fs.writeFileSync(path.join(out,'sitemap.xml'),siteMap);
fs.writeFileSync(path.join(out,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: '+liveSite+'/sitemap.xml\n');
console.log('V30 canonical + sitemap:',sitemapRoutes.length,'routes.');

fs.writeFileSync(path.join(out,'.nojekyll'),'');
console.log('DNGWORLD build: compact inline phone widget on '+count+' pages.');
