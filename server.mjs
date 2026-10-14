import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// News & Articles Engine (V8.0)
app.get(['/api/news', '/.netlify/functions/news'], async (req, res) => {
  const lang = ['vi', 'en', 'zh'].includes(req.query?.lang) ? req.query.lang : 'vi';
  const newsFilePath = path.join(__dirname, 'data', 'news.json');
  const insightsFilePath = path.join(__dirname, 'content', 'insights-v20.json');
  const postsDir = path.join(__dirname, 'content', 'posts');

  const clean = (str = '') => {
    return str
      .replace(/<!\[CDATA\[|\]\]>/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/https?:\/\/[^\s]+/g, '')
      .trim();
  };

  let allItems = [];
  let dngArticles = [];

  // 1. Load DNG original in-depth articles from content/insights-v20.json
  if (fs.existsSync(insightsFilePath)) {
    try {
      const raw = JSON.parse(fs.readFileSync(insightsFilePath, 'utf-8'));
      if (Array.isArray(raw)) {
        dngArticles = raw.map(a => ({
          id: a.slug,
          slug: a.slug,
          type: 'dng_analysis',
          title: a.title_vi || a.title || 'Phân tích chuyên môn',
          excerpt: a.summary_vi || a.takeaways_vi?.[0] || '',
          body: a.body_vi || '',
          takeaways: a.takeaways_vi || [],
          category: 'Phân tích DNG',
          categorySlug: 'analysis',
          author: 'Ban biên tập DNGWORLD',
          date: a.published_at || 'Tháng 8, 2026',
          heroImage: a.cover || '/assets/images/insights/dng_news_lead.jpg'
        }));
      }
    } catch (_) {}
  }

  // 2. Load DNG foundational posts from content/posts/
  if (fs.existsSync(postsDir)) {
    try {
      const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.json'));
      files.forEach(f => {
        try {
          const post = JSON.parse(fs.readFileSync(path.join(postsDir, f), 'utf-8'));
          const pvi = post.vi || {};
          dngArticles.push({
            id: post.slug,
            slug: post.slug,
            type: 'dng_analysis',
            title: pvi.title || post.title || '',
            excerpt: pvi.excerpt || '',
            body: pvi.body || '',
            takeaways: [],
            category: pvi.category || 'Chiến lược',
            categorySlug: 'analysis',
            author: 'Ban biên tập DNGWORLD',
            date: post.date ? new Date(post.date).toLocaleDateString('vi-VN') : 'Tháng 7, 2026',
            heroImage: post.cover || '/assets/images/insights/dng_news_lead.jpg'
          });
        } catch (_) {}
      });
    } catch (_) {}
  }

  // 3. Load verified curated external news from data/news.json
  if (fs.existsSync(newsFilePath)) {
    try {
      const rawNews = JSON.parse(fs.readFileSync(newsFilePath, 'utf-8'));
      
      const processCategory = (arr, catSlug, catLabel) => {
        if (!Array.isArray(arr)) return;
        arr.forEach((item, idx) => {
          if (!item.title) return;
          allItems.push({
            id: `${catSlug}-${idx}`,
            type: 'external_news',
            title: clean(item.title),
            summary: clean(item.summary || item.title),
            source: item.source || 'Tin tức kinh tế',
            url: item.url || item.link || '',
            link: item.url || item.link || '',
            image: item.image || '/assets/images/insights/dng_news_lead.jpg',
            category: catLabel,
            categorySlug: catSlug,
            pubDate: item.time || 'Mới cập nhật'
          });
        });
      };

      processCategory(rawNews.latest_vn, 'business', 'Kinh doanh & Thị trường');
      processCategory(rawNews.ai_news, 'ai', 'AI & Công nghệ');
      processCategory(rawNews.tech_news, 'tech', 'Công nghệ ứng dụng');
      processCategory(rawNews.markets, 'business', 'Thị trường & TMĐT');
      processCategory(rawNews.popular_vn, 'marketing', 'Marketing & Quảng cáo');
    } catch (_) {}
  }

  // 4. Try fetching fresh Google News RSS if possible
  const feeds = {
    vi: 'https://news.google.com/rss/search?q=(AI%20OR%20marketing%20OR%20digital%20advertising%20OR%20consumer%20behavior)%20when:7d&hl=vi&gl=VN&ceid=VN:vi',
    en: 'https://news.google.com/rss/search?q=(AI%20OR%20marketing%20OR%20digital%20advertising%20OR%20consumer%20behavior)%20when:7d&hl=en-US&gl=US&ceid=US:en',
    zh: 'https://news.google.com/rss/search?q=(AI%20OR%20marketing%20OR%20digital%20advertising)%20when:7d&hl=zh-CN&gl=CN&ceid=CN:zh-Hans'
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const response = await fetch(feeds[lang], {
      headers: { 'User-Agent': 'Mozilla/5.0 DNGWORLD-Intelligence/8.0' },
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (response.ok) {
      const xml = await response.text();
      const blocks = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map(match => match[1]);
      const freshItems = blocks.slice(0, 10).map((block, idx) => {
        const titleMatch = block.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
        const linkMatch = block.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
        const descMatch = block.match(/<description[^>]*>([\s\S]*?)<\/description>/i);
        const pubDateMatch = block.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i);
        const sourceMatch = block.match(/<source[^>]*>([\s\S]*?)<\/source>/i);

        return {
          id: `fresh-rss-${idx}`,
          type: 'external_news',
          title: clean(titleMatch?.[1]),
          summary: clean(descMatch?.[1] || titleMatch?.[1]),
          source: clean(sourceMatch?.[1]) || 'Google News',
          url: clean(linkMatch?.[1]),
          link: clean(linkMatch?.[1]),
          image: '/assets/images/insights/dng_news_lead.jpg',
          category: 'Mới cập nhật',
          categorySlug: 'latest',
          pubDate: clean(pubDateMatch?.[1]) || 'Mới cập nhật'
        };
      }).filter(i => i.title && i.link);

      if (freshItems.length > 0) {
        allItems = [...freshItems, ...allItems];
      }
    }
  } catch (_) {}

  // Deduplicate by URL or Title
  const seen = new Set();
  const uniqueItems = [];
  allItems.forEach(item => {
    const key = (item.url || item.title).toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      uniqueItems.push(item);
    }
  });

  res.json({
    updated_at: new Date().toISOString(),
    total_news: uniqueItems.length,
    total_articles: dngArticles.length,
    items: uniqueItems,
    dng_articles: dngArticles,
    featured_lead: dngArticles[0] || uniqueItems[0] || null
  });
});

// Redirect public /portfolio and /portfolio/ to / while preserving direct project sub-routes
app.get(['/portfolio', '/portfolio/'], (req, res) => {
  res.redirect(302, '/');
});

// Contact form API endpoint fallback
app.post(['/api/contact', '/contact'], (req, res) => {
  res.json({
    ok: true,
    message: 'Cảm ơn bạn! Yêu cầu tư vấn đã được ghi nhận.'
  });
});

// Static files handler with clean URL and trailing slash normalization
app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return next();
  }

  let reqPath = decodeURIComponent(req.path);

  // Directly check if it's an existing static file (assets, json, images, svg, etc.)
  const directFile = path.join(__dirname, reqPath);
  if (fs.existsSync(directFile) && fs.statSync(directFile).isFile()) {
    return res.sendFile(directFile);
  }

  // Clean URL resolution
  const normalized = reqPath.replace(/\/$/, '');

  const candidates = [
    path.join(__dirname, reqPath, 'index.html'),
    path.join(__dirname, `${normalized}.html`),
    path.join(__dirname, `${normalized}/index.html`),
    path.join(__dirname, normalized)
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return res.sendFile(candidate);
    }
  }

  next();
});

// 404 handler
app.use((req, res) => {
  if (req.path.startsWith('/en/')) {
    const en404 = path.join(__dirname, 'en', '404.html');
    if (fs.existsSync(en404)) return res.status(404).sendFile(en404);
  }
  if (req.path.startsWith('/zh/')) {
    const zh404 = path.join(__dirname, 'zh', '404.html');
    if (fs.existsSync(zh404)) return res.status(404).sendFile(zh404);
  }
  const root404 = path.join(__dirname, '404.html');
  if (fs.existsSync(root404)) {
    return res.status(404).sendFile(root404);
  }
  res.status(404).send('Page not found');
});

app.listen(PORT, HOST, () => {
  console.log(`DNGWORLD server running on http://${HOST}:${PORT}`);
});
