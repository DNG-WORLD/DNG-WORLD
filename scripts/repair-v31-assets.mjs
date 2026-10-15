/**
 * DNGWORLD V34: News/TV video visibility and playback compatibility.
 *
 * Keeps V32's original fail-fast asset path repair intact. This post-build
 * correction only touches the generated `_site` News/TV renderer. It does not
 * alter homepage WebGL, source HTML, hotline, news collection or pricing.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('_site');
const mappings = [
  ['assets/dngworld-newsroom-v31.js',  'assets/js/dngworld-newsroom-v31.js'],
  ['assets/dngworld-reader-v31.js',    'assets/js/dngworld-reader-v31.js'],
  ['assets/dngworld-v31-motion.js',    'assets/js/dngworld-v31-motion.js'],
  ['assets/dngworld-newsroom-v31.css', 'assets/css/dngworld-newsroom-v31.css'],
  ['assets/dngworld-v31-brand.css',    'assets/css/dngworld-v31-brand.css'],
  ['assets/dngworld-v31-motion.css',   'assets/css/dngworld-v31-motion.css'],
];

for (const [from, to] of mappings) {
  const source = path.join(root, from);
  const dest = path.join(root, to);
  if (!fs.existsSync(source)) {
    throw new Error(`Missing V31 original asset: ${from}. Check files in GitHub before deploying.`);
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(source, dest);
  if (fs.statSync(dest).size === 0) throw new Error(`Empty V31 asset: ${to}`);
  console.log(`V32 asset resolved: /${to}`);
}

// Fix the actual bug: without OPENAI_API_KEY, foreign-language YouTube
// videos had translations only for EN, so VI/ZH filtered out four categories.
// Display the original title instead of silently removing the video.
const rendererPath = path.join(root, 'assets/js/dngworld-newsroom-v31.js');
let renderer = fs.readFileSync(rendererPath, 'utf8');
const oldVideoFilter = 'videos=Object.fromEntries(Object.entries(data.videos||{}).map(([cat,arr])=>[cat,Array.isArray(arr)?arr.map(displayed).filter(v=>v?.title):[]]));';
const fixedVideoFilter = 'videos=Object.fromEntries(Object.entries(data.videos||{}).map(([cat,arr])=>[cat,Array.isArray(arr)?arr.map(v=>displayed(v)||{...v,title:v.title||"",summary:v.summary||""}).filter(v=>v?.title&&/^[\\w-]{11}$/.test(v.id)):[]]));';
if (!renderer.includes(oldVideoFilter)) {
  throw new Error('V34 video fix: expected V31 video filter has changed; refusing unsafe patch.');
}
renderer = renderer.replace(oldVideoFilter, fixedVideoFilter);

// Use the standard YouTube iframe player. A publisher can still disallow
// embedding for some videos; we provide an explicit source fallback below.
const oldEmbed = "f.src='https://www.youtube-nocookie.com/embed/'+selectedVideo.id+'?autoplay=1&rel=0';";
const newEmbed = "f.src='https://www.youtube.com/embed/'+selectedVideo.id+'?autoplay=1&playsinline=1&rel=0';";
if (!renderer.includes(oldEmbed)) {
  throw new Error('V34 video fix: expected V31 embed URL has changed; refusing unsafe patch.');
}
renderer = renderer.replace(oldEmbed, newEmbed);

// If the publisher disables embedding, the viewer still has a clear option
// to watch the legitimate source. Ordinary playback remains in DNGWORLD TV.
const oldMeta = "$('#videoOrigin').textContent=`${video.channel||'YouTube'} · ${fmt(video.published_at)}`;";
const newMeta = oldMeta + "const watchLink=document.createElement('a');watchLink.href='https://www.youtube.com/watch?v='+encodeURIComponent(video.id);watchLink.target='_blank';watchLink.rel='noopener noreferrer';watchLink.textContent=' · '+(LANG==='vi'?'Nếu không phát, xem nguồn ↗':LANG==='zh'?'无法播放？查看原视频 ↗':'If blocked, watch source ↗');watchLink.style.cssText='color:#e5bf88;text-decoration:underline;text-underline-offset:3px';$('#videoOrigin').appendChild(watchLink);";
if (!renderer.includes(oldMeta)) {
  throw new Error('V34 video fix: expected V31 video metadata block has changed; refusing unsafe patch.');
}
renderer = renderer.replace(oldMeta, newMeta);
fs.writeFileSync(rendererPath, renderer);
console.log('V34 News/TV video fix applied: language fallback, standard YouTube embed, source fallback.');

// Existing V32 QA checks: fail build instead of silently deploying an empty TV.
const required = [
  'insights/index.html', 'insights/read/index.html', 'data/newsroom.json',
  'assets/css/dngworld-newsroom-v26.css',
  ...mappings.map(([,dest]) => dest),
];
for (const filename of required) {
  if (!fs.existsSync(path.join(root, filename))) {
    throw new Error(`News/TV deployment missing required resource: /${filename}`);
  }
}
const html = fs.readFileSync(path.join(root, 'insights/index.html'), 'utf8');
if (!html.includes('/assets/js/dngworld-newsroom-v31.js')) {
  throw new Error('News/TV index is not pointing to the V31 renderer script.');
}
const data = JSON.parse(fs.readFileSync(path.join(root, 'data/newsroom.json'), 'utf8'));
if (!Array.isArray(data.news) || !data.videos || typeof data.videos !== 'object') {
  throw new Error('News snapshot schema invalid: expected news[] and videos{}');
}
const categoryCounts=Object.fromEntries(Object.entries(data.videos).map(([cat,items])=>[cat,Array.isArray(items)?items.length:0]));
console.log(`V34 build checks OK: ${data.news.length} articles; ${Object.values(categoryCounts).reduce((a,b)=>a+b,0)} videos; categories: ${JSON.stringify(categoryCounts)}.`);
