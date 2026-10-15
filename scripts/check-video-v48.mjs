import fs from 'node:fs';import path from 'node:path';
const root=path.resolve('_site');
for(const prefix of ['','en/','zh/']){
 const file=path.join(root,prefix+'insights/index.html'),s=fs.readFileSync(file,'utf8');
 const tv=s.indexOf('id="tvPortal"'),nav=s.indexOf('class="newsnav"'),lead=s.indexOf('id="leadArea"'),list=s.indexOf('id="latestNews"');
 if(tv<0||nav<0||lead<0||list<0||!(tv<nav&&nav<lead&&lead<list))throw Error('V48 wrong Video→News order: '+file);
 for(const id of ['tvPortal','tvStage','tvTabs','tvThumbs','videoHeadline','videoOrigin','newsGrid'])if((s.match(new RegExp('id="'+id+'"','g'))||[]).length!==1)throw Error('V48 duplicated/missing '+id);
 if(!s.includes('dngworld-news-first-v48.css'))throw Error('V48 CSS missing '+file);
 if(!s.includes('data-dng-common="header"'))throw Error('V48 shared header lost '+file);
}
console.log('V48 video-first News verified in VI/EN/ZH without changing source media/player.');
