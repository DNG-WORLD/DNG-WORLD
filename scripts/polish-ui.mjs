/** V40: add shared design layer to GENERATED HTML only.
 * Do not rewrite source HTML, visible text, nav links, footer copy, canvas or JS hooks.
 */
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('_site');
const sheets=['/assets/css/dngworld-ui-polish-v38.css','/assets/css/dngworld-unified-v40.css'];
for(const sheet of sheets)if(!fs.existsSync(path.join(root,sheet.slice(1))))throw Error('Missing CSS: '+sheet);
let touched=0,redirects=0,shells=0;
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const full=path.join(dir,entry.name);if(entry.isDirectory()){walk(full);continue}if(!entry.isFile()||!entry.name.endsWith('.html'))continue;
 let s=fs.readFileSync(full,'utf8');
 if(!/<\/head\s*>/i.test(s)||!/<body\b/i.test(s))continue;
 const redirect=/<meta\b[^>]*http-equiv=["']?refresh/i.test(s);
 for(const sheet of sheets){if(!s.includes('href="'+sheet+'"'))s=s.replace(/<\/head\s*>/i,'<link rel="stylesheet" href="'+sheet+'" data-dng-ui="'+(sheet.includes('v38')?'v38':'v40')+'"></head>');}
 const mainAtOriginal=s.search(/<main\b/i);
 const siteHeader=/<header\b[^>]*>/i.exec(s),siteFoot=/<footer\b[^>]*>/i.exec(s);
 if(!redirect&&mainAtOriginal>=0&&siteHeader&&siteHeader.index<mainAtOriginal&&siteFoot&&siteFoot.index>mainAtOriginal){
   const initial=s; s=s.replace(/<body\b([^>]*)>/i,(m,a)=>'<body'+(a.includes('dng-unified-v40')?a:a.replace(/\bclass=(["'])(.*?)\1/i,(_m,q,cl)=>'class='+q+cl+' dng-unified-v40'+q)+(a.match(/\bclass=/i)?'':' class="dng-unified-v40"'))+'>');
   // Some pages include article headings and tool panels; mark ONLY site shells.
   const mainAt=s.search(/<main\b/i);
   const headerMatch=/<header\b[^>]*>/i.exec(s);
   if(headerMatch && headerMatch.index<mainAt){
     s=s.replace(/<header\b([^>]*)>/i,(m,a)=>'<header'+(a.includes('data-dng-shell=')?a:a+' data-dng-shell="header"')+'>');
   }
   const foot=/\<footer\b[^>]*\>/gi;let m,last=null;
   while((m=foot.exec(s))!==null){if(m.index>mainAt)last=m}
   if(last){const raw=last[0];s=s.slice(0,last.index)+raw.replace(/>$/, ' data-dng-shell="footer">')+s.slice(last.index+raw.length);}
   if(!s.includes('data-dng-shell="header"')||!s.includes('data-dng-shell="footer"'))throw Error('V40 site shell missing: '+path.relative(root,full));
   shells++;
 }else redirects++;
 fs.writeFileSync(full,s);touched++;
}}
walk(root);
if(touched<40||shells<20)throw Error('V40 insufficient HTML coverage: '+touched+'/'+shells);
console.log('V40 shared design:',touched,'documents;',shells,'pages with unified nav/footer;',redirects,'redirect/template pages');
