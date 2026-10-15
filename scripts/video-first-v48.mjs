/** DNGWORLD V48: actual News & TV video-first editorial hierarchy.
 * Reorders the SAME existing content, IDs, playback controls and feeds.
 * Generated Pages only; preserves video/news source and its timestamps.
 */
import fs from 'node:fs';import path from 'node:path';
const root=path.resolve('_site');
const locale={vi:{heading:'Video <em>nổi bật.</em>',caption:'Xem thời sự và phân tích bằng hình ảnh. Chọn chủ đề, xem trực tiếp và kiểm tra nguồn phát hành.'},en:{heading:'Featured <em>video.</em>',caption:'Video reporting and analysis with clear source attribution. Choose a topic and play directly.'},zh:{heading:'精选 <em>视频.</em>',caption:'优先呈现视频新闻与分析。选择主题，查看发布来源并播放。'}};
for(const lang of ['vi','en','zh']){
 const relative=(lang==='vi'?'':lang+'/')+'insights/index.html';
 const file=path.join(root,relative);
 let html=fs.readFileSync(file,'utf8');
 const start=html.indexOf('<section class="tv-portal"'),finish=start<0?-1:html.indexOf('</section>',start);
 if(start<0||finish<0)throw Error('V48 TV section changed: '+relative);
 let video=html.slice(start,finish+'</section>'.length);
 for(const id of ['tvPortal','tvStage','tvTabs','tvThumbs','videoHeadline','videoOrigin'])if(!video.includes('id="'+id+'"'))throw Error('V48 existing video control missing '+id);
 const titleAt=video.indexOf('<h2 id="tvHeading">'),titleEnd=video.indexOf('</h2>',titleAt);
 if(titleAt<0||titleEnd<0)throw Error('V48 title missing');
 video=video.slice(0,titleAt)+'<h2 id="tvHeading">'+locale[lang].heading+'</h2>'+video.slice(titleEnd+5);
 const captionAt=video.indexOf('<div class="tv-caption">');
 const disclosure=video.indexOf('<div id="videoDisclosure"',captionAt);
 if(captionAt<0||disclosure<captionAt)throw Error('V48 disclosure missing');
 video=video.slice(0,captionAt)+'<div class="tv-caption">'+locale[lang].caption+' '+video.slice(disclosure);
 // Remove the original lower-page portal. The same YouTube player is moved
 // directly after the masthead, ahead of article filters/headlines.
 html=html.slice(0,start)+html.slice(finish+'</section>'.length);
 const navbar=html.indexOf('<div class="newsnav"');
 const stories=html.indexOf('<div class="top-stories"');
 if(navbar<0||stories<navbar)throw Error('V48 News nav/article anchors changed');
 html=html.slice(0,navbar)+'<!-- DNGWORLD V48: featured video is first -->\n'+video+'\n'+html.slice(navbar);
 html=html.replace('<main class="news-wrap"','<main class="news-wrap n48-video-first"');
 const style='<link rel="stylesheet" href="/assets/css/dngworld-news-first-v48.css" data-dng-news="v48">';
 html=html.replace(/<\/head\s*>/i,style+'</head>');
 if((html.match(/id="tvPortal"/g)||[]).length!==1)throw Error('V48 duplicated TV portal');
 if(html.indexOf('id="tvPortal"')>html.indexOf('class="newsnav"'))throw Error('V48 video must precede news filters');
 fs.writeFileSync(file,html);
 console.log('V48 video-first publication:',relative);
}
