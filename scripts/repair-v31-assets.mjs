/**
 * DNGWORLD V32: deterministic asset path repair after `build-static.mjs`.
 * V31 upload stored six browser resources in `assets/` instead of
 * `assets/js/` and `assets/css/`. Their URLs 404'ed and News/TV was stuck on
 * its loading placeholders even though `data/newsroom.json` had real data.
 *
 * This is intentionally a post-build check/copy; it keeps the existing homepage
 * WebGL, font files (none are shipped), News/TV implementation, and RSS pipeline
 * untouched. Both hourly refresh and ordinary GitHub Pages deploy call npm run
 * build and therefore run this fix automatically.
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

// Fail clearly instead of publishing a perpetually spinning News/TV screen.
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
console.log(`V32 News/TV build checks OK: ${data.news.length} articles; ${Object.values(data.videos).reduce((n,items) => n + (Array.isArray(items) ? items.length : 0), 0)} videos.`);
