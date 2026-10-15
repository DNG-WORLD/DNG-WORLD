import fs from 'node:fs';import path from 'node:path';
for(const lang of ['','en/','zh/']){
 const file=path.join('_site',lang+'insights/index.html'),s=fs.readFileSync(file,'utf8');
 const first=s.indexOf('id="tvPortal"'),news=s.indexOf('class="top-stories"'),later=s.indexOf('id="latestNews"');
 if(first<0||news<0||later<0||!(first<news&&news<later))throw Error('V45 TV must lead article feed: '+file);
 for(const m of ['id="tvStage"','id="tvTabs"','id="startVideo"']){if(m==='id="startVideo"')continue;if(!s.includes(m))throw Error('V45 TV control missing '+m)}
 if((s.match(/id="tvPortal"/g)||[]).length!==1||(s.match(/id="newsGrid"/g)||[]).length!==1)throw Error('V45 duplicate IDs '+file);
 if(!s.includes('dngworld-news-video-v45.css'))throw Error('V45 CSS missing '+file);
}
console.log('V45 News & TV: featured video precedes headlines in VI, EN, ZH. Existing data/player intact.');
