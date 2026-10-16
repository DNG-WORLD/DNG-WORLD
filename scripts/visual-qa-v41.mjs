/** Browser-level release gate for the mobile issues reported in owner screenshots. */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { chromium } from 'playwright';
const root=path.resolve('_site'),out=path.resolve('visual-qa-v41');
fs.mkdirSync(out,{recursive:true});
const types={html:'text/html; charset=utf-8',css:'text/css; charset=utf-8',js:'text/javascript; charset=utf-8',json:'application/json',svg:'image/svg+xml',webp:'image/webp',png:'image/png',jpg:'image/jpeg',woff2:'font/woff2'};
const server=http.createServer((req,res)=>{let p;try{p=decodeURIComponent(req.url.split('?')[0])}catch{res.writeHead(400).end();return;}let f=path.resolve(root,'.'+p);if(!f.startsWith(root+path.sep)&&f!==root){res.writeHead(403).end();return;}if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html');else if(!fs.existsSync(f)&&!path.extname(f))f=path.join(f,'index.html');if(!fs.existsSync(f)){res.writeHead(404).end('Not found');return;}res.writeHead(200,{'Content-Type':types[path.extname(f).slice(1)]||'application/octet-stream','Cache-Control':'no-store'});fs.createReadStream(f).pipe(res)});
await new Promise(resolve=>server.listen(4179,'127.0.0.1',resolve));
let browser=null;const results=[],errors=[];
const routes=['/','/pricing/','/pricing/courses/','/pricing/ads/','/pricing/design-editor/','/pricing/remote-marketing/','/pricing/business-strategy/','/tools/','/insights/','/en/insights/','/zh/insights/','/about/','/services/','/en/services/','/zh/services/','/contact/','/portfolio/','/en/','/zh/','/404.html'];
try{
 browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 for(const width of [390,768,1440]){
  const context=await browser.newContext({viewport:{width,height:844},deviceScaleFactor:1,reducedMotion:'reduce'});
  for(const route of routes){
   const page=await context.newPage();page.setDefaultTimeout(11000);
   const response=await page.goto('http://127.0.0.1:4179'+route,{waitUntil:'domcontentloaded',timeout:20000});
   await page.waitForTimeout(180);
   const metrics=await page.evaluate(()=>{
    const visible=e=>e&&getComputedStyle(e).display!=='none'&&getComputedStyle(e).visibility!=='hidden'&&e.getBoundingClientRect().height>0;
    const header=document.querySelector('[data-dng-common="header"]'),footer=document.querySelector('[data-dng-common="footer"]');
    const rect=header?.getBoundingClientRect(),toggle=header?.querySelector('.dng-global-toggle'),art=document.querySelector('.hero .hero-art');
    const box=e=>{const r=e?.getBoundingClientRect();return r?{x:Math.round(r.x),right:Math.round(r.right),width:Math.round(r.width),height:Math.round(r.height),top:Math.round(r.top)}:null};
    return {title:document.title,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,headers:[...document.querySelectorAll('header')].filter(visible).length,footers:[...document.querySelectorAll('footer')].filter(visible).length,visibleOriginal:[...document.querySelectorAll('[data-dng-original-shell]')].filter(visible).length,header:box(header),toggle:box(toggle),art:box(art),masterArt:box(document.querySelector('.dng-master-art-v46')),band:box(document.querySelector('[data-dw52-stage="true"]')),heroTitle:box(document.querySelector('[data-dng-hero-v46] h1')),font:getComputedStyle(document.body).fontFamily,cssLoaded:[...document.styleSheets].some(x=>x.href?.includes('dngworld-shell-v41.css'))};
   });
   results.push({route,width,...metrics});
   const id=route==='/'?'home':route.replace(/[^a-zA-Z0-9]+/g,'-').replace(/^-|-$/g,'');
   if((width===390||width===1440)&&['home','services','about','contact','pricing','tools','insights','portfolio','404-html'].includes(id))await page.screenshot({path:path.join(out,id+'-'+width+'.png'),animations:'disabled',timeout:13000});
   if(id==='insights'&&(width===390||width===1440))await page.screenshot({path:path.join(out,'news-video-first-'+width+'-full.png'),fullPage:true,animations:'disabled',timeout:18000});
   if(id==='services'&&(width===390||width===1440))await page.screenshot({path:path.join(out,'solutions-'+width+'-full.png'),animations:'disabled',fullPage:true,timeout:17000});
   if(response?.status()!==200)errors.push(route+' @'+width+': HTTP '+response?.status());
   if(metrics.headers!==1||metrics.footers!==1||metrics.visibleOriginal!==0)errors.push(route+' @'+width+': duplicate visible site shells '+JSON.stringify([metrics.headers,metrics.footers,metrics.visibleOriginal]));
   if(metrics.scrollWidth>width+7)errors.push(route+' @'+width+': horizontal overflow '+metrics.scrollWidth);
   if(!metrics.cssLoaded||!metrics.font.includes('Be Vietnam Pro'))errors.push(route+' @'+width+': missing shared CSS/font');
   if(width===390){
    if(metrics.header?.width>width+2||metrics.toggle?.right>width||!metrics.toggle||metrics.toggle.height<40)errors.push(route+': menu clipped/outside mobile');
    await page.locator('.dng-global-toggle').click();
    const isOpen=await page.locator('.dng-global-panel').isVisible();
    if(!isOpen)errors.push(route+': mobile menu fails to open');
   }
    if(route==='/services/'&&width===390){const count=await page.locator('.v47-case').count();const tiers=await page.locator('.v47-service').count();if(count!==6||tiers!==5)errors.push('V47 missing authentic scopes: '+count+'/'+tiers);}
   if((route==='/insights/'||route==='/en/insights/'||route==='/zh/insights/')&&width===390){
      await page.waitForFunction(()=>document.querySelector('#headlineCount')?.textContent?.includes('60'),{timeout:11000}).catch(()=>{});
      const feedTotal=await page.locator('#headlineCount').textContent();
      const snapshot=JSON.parse(fs.readFileSync(path.join(root,'data/newsroom.json'),'utf8'));
      const shownTotal=Number(feedTotal?.match(/^\d+/)?.[0]||0);
      if(shownTotal!==snapshot.news.length)errors.push('V51 source-language article suppression '+route+': '+shownTotal+'/'+snapshot.news.length);
      if(!feedTotal?.includes('60'))errors.push('V51 recent article counter missing '+route);
      const links=await page.locator('#leadArea .lead-story').count();
      if(links!==1)errors.push('V51 featured article missing '+route);
   }
   if(route==='/insights/'&&width===390){
      const y=await page.locator('#tvPortal').boundingBox();
      const n=await page.locator('#categoryBar').boundingBox();
      if(!y||!n||y.y>=n.y)errors.push('V48 video section did not lead news categories');
      const button=page.locator('#startVideo');
      await button.waitFor({state:'visible',timeout:8000});
      await button.click({timeout:8000});
      const frame=await page.locator('#tvStage iframe').getAttribute('src');
      if(!frame?.includes('youtube.com/embed/'))errors.push('V48 video player did not open a YouTube embed');
   }
   if(route.startsWith('/pricing/')||['/pricing/','/tools/','/about/','/services/','/en/services/','/zh/services/','/contact/','/portfolio/'].includes(route)){
     const band=metrics.band,expected=Math.min(370,Math.max(210,844/3));
     const actualExpected=width<=760?Math.min(290,Math.max(190,844*.31)):expected;
     if(!band)errors.push('V52 live WebGL band missing '+route+' @'+width);
     else {
       if(band.x< -2||band.right>width+2||Math.abs(band.width-width)>4)errors.push('V52 band not full-bleed '+route+' '+JSON.stringify(band));
       if(Math.abs(band.height-actualExpected)>3)errors.push('V52 band height is not one-third screen '+route+' @'+width+': '+band.height+' expected '+actualExpected);
       if(metrics.heroTitle && band.top+band.height>metrics.heroTitle.top+3)errors.push('V52 WebGL overlaps hero copy '+route+' @'+width);
     }
     const frame=page.frameLocator('iframe.dw52-iframe');
     if((route==='/services/'||route==='/pricing/'||route==='/tools/')&&(width===390||width===1440)){
       try {
         await frame.locator('#art.is-3d canvas#artCanvas').waitFor({state:'attached',timeout:16000});
         const ready=await frame.locator('#art.is-3d').evaluate(el=>{const c=el.querySelector('canvas');return !!c&&c.width>100&&c.height>100});
         if(!ready)errors.push('V52 original V24 GL canvas not actively rendered '+route+' @'+width);
       }catch(e){errors.push('V52 WebGL failed to initialize '+route+' @'+width+': '+String(e).slice(0,160))}
     }
   }
   if(route==='/'&&width===390&&metrics.art&&(metrics.art.width>width+7||metrics.art.height>420||metrics.art.x<0))errors.push('Homepage mobile 3D geometry is offscreen: '+JSON.stringify(metrics.art));
   await page.close();
  }
  await context.close();
 }
}finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve))}
fs.writeFileSync(path.join(out,'metrics.json'),JSON.stringify({results,errors},null,2));
console.log('Browser QA:',results.length,'viewports, screenshots captured. Errors:',errors.length);
for(const e of errors)console.error('ISSUE:',e);
if(errors.length)process.exitCode=1;
