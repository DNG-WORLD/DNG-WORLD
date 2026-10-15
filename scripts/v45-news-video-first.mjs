/** V45 preview: News & TV video-first layout, generated Pages only.
 * Original HTML source, articles, YouTube data and playback JS stay intact.
 */
import fs from 'node:fs';import path from 'node:path';
const root=path.resolve('_site');
for(const lang of ['','en/','zh/']){
 const file=path.join(root,lang+'insights/index.html');
 let html=fs.readFileSync(file,'utf8');
 const at=html.indexOf('<section class="tv-portal"');
 const close=at>=0?html.indexOf('</section>',at):-1;
 const stories=html.indexOf('<div class="top-stories"');
 const latest=html.indexOf('<section id="latestNews"');
 if(at<0||close<0||stories<0||latest<0||at<latest)throw Error('V45 News section anchors changed: '+file);
 const video=html.slice(at,close+'</section>'.length);
 if(!video.includes('id="tvPortal"')||!video.includes('id="tvStage"')||!video.includes('id="tvTabs"'))throw Error('V45 video controls not preserved: '+file);
 html=html.slice(0,at)+html.slice(close+'</section>'.length);
 const point=html.indexOf('<div class="top-stories"');
 html=html.slice(0,point)+'<!-- V45 FIRST STORY IS A VERIFIED VIDEO -->\n'+video+'\n'+html.slice(point);
 // Keep the video player's existing disclosure target, but replace technical
 // thumbnail counts with editorial copy relevant to the visitor's language.
 const copy=lang==='en/'?{heading:'Featured <em>video.</em>',intro:'Watch selected reporting and analysis from clearly attributed channels.'}
          :lang==='zh/'?{heading:'精选 <em>视频.</em>',intro:'来自可识别来源的新闻视频与解读，选择主题并播放。'}
          :{heading:'Video <em>nổi bật.</em>',intro:'Video thời sự và phân tích từ các kênh có nguồn rõ ràng. Chọn chủ đề và xem ngay.'};
 html=html.replace(/<h2 id="tvHeading">[\\s\\S]*?<\\/h2>/i,'<h2 id="tvHeading">'+copy.heading+'</h2>');
 const caption=/<div class="tv-caption">[\\s\\S]*?(?=<div id="videoDisclosure")/;
 if(!caption.test(html))throw Error('V45 video caption/disclosure structure changed');
 html=html.replace(caption,'<div class="tv-caption">'+copy.intro+' ');
 html=html.replace(/<main class="news-wrap"/,'<main class="news-wrap n45-video-first"');
 const css='<link rel="stylesheet" href="/assets/css/dngworld-news-video-v45.css" data-video-first="v45">';
 if(!html.includes('data-video-first="v45"'))html=html.replace(/<\/head\s*>/i,css+'</head>');
 if(html.indexOf('id="tvPortal"')>html.indexOf('class="top-stories"'))throw Error('V45 video not before article feed: '+file);
 if((html.match(/id="tvPortal"/g)||[]).length!==1||(html.match(/id="newsGrid"/g)||[]).length!==1)throw Error('V45 duplicated TV/news IDs: '+file);
 fs.writeFileSync(file,html);
 console.log('V45 video-first:',path.relative(root,file));
}
