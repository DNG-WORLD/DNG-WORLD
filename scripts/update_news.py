#!/usr/bin/env python3
"""DNGWORLD NEWS/TV: replace one current snapshot from RSS + official YouTube feeds.
No scraping full articles, no historical database, no invented news or popularity counts.
Optional YOUTUBE_API_KEY allows a popularity-sorted YouTube selection.
"""
from __future__ import annotations
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone, timedelta
from email.utils import parsedate_to_datetime
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, parse_qs, urlencode, urlunparse, quote
from urllib.request import Request, urlopen
from xml.etree import ElementTree as ET
import hashlib, json, os, re

BASE = Path(__file__).resolve().parents[1]
OUTPUT = BASE / 'data' / 'newsroom.json'
NOW = datetime.now(timezone.utc)
NS = {'a':'http://www.w3.org/2005/Atom','m':'http://search.yahoo.com/mrss/',
      'yt':'http://www.youtube.com/xml/schemas/2015','dc':'http://purl.org/dc/elements/1.1/',
      'content':'http://purl.org/rss/1.0/modules/content/'}
# DNGWORLD is a news discovery/summary site. Check each publisher's syndication terms
# before turning on commercial reuse of excerpts/images. Source domain whitelist is intentional.
FEEDS = [
  ('VnExpress', 'vietnam', 'https://vnexpress.net/rss/tin-moi-nhat.rss'),
  ('VnExpress', 'economy', 'https://vnexpress.net/rss/kinh-doanh.rss'),
  ('VnExpress', 'technology', 'https://vnexpress.net/rss/so-hoa.rss'),
  ('Tuổi Trẻ', 'vietnam', 'https://tuoitre.vn/rss/thoi-su.rss'),
  ('Tuổi Trẻ', 'world', 'https://tuoitre.vn/rss/the-gioi.rss'),
  ('Tuổi Trẻ', 'economy', 'https://tuoitre.vn/rss/kinh-doanh.rss'),
  ('VietnamPlus', 'vietnam', 'https://www.vietnamplus.vn/rss/home.rss'),
  ('BBC News', 'world', 'https://feeds.bbci.co.uk/news/world/rss.xml'),
  ('BBC News', 'politics', 'https://feeds.bbci.co.uk/news/politics/rss.xml'),
  ('BBC News', 'economy', 'https://feeds.bbci.co.uk/news/business/rss.xml'),
  ('The Guardian', 'world', 'https://www.theguardian.com/world/rss'),
  ('The Guardian', 'economy', 'https://www.theguardian.com/business/rss'),
  ('The Guardian', 'technology', 'https://www.theguardian.com/technology/rss'),
  ('TechCrunch', 'technology', 'https://techcrunch.com/feed/'),
  ('The Verge', 'technology', 'https://www.theverge.com/rss/index.xml'),
  ('Ars Technica', 'technology', 'https://feeds.arstechnica.com/arstechnica/index'),
  ('Search Engine Land', 'marketing', 'https://searchengineland.com/feed'),
  ('Google Blog', 'ai', 'https://blog.google/rss/'),
]
# Official channel RSS: fallback is recent publisher videos, not an unverified "trending" ranking.
CHANNELS = [
  ('VTV24', 'vietnam', 'UCabsTV34JwALXKGMqHpvUiA'),
  ('BBC News', 'world', 'UC16niRr50-MSBwiO3YDb3RA'),
  ('Bloomberg Quicktake', 'world', 'UChirEOpgFCupRAk5etXqPaA'),
  ('CNBC Television', 'economy', 'UCvJJ_dzjViJCoLf5uKUTwoA'),
  ('Bloomberg Television', 'economy', 'UCIALMKvObZNtJ6AmdCLP7Lg'),
  ('The Verge', 'technology', 'UCddiUEpeqJcYeBxX1IVBKvQ'),
  ('Google Developers', 'ai-trends', 'UC_x5XG1OV2P6uZZ5FSM9Ttw'),
]
CATEGORIES = ['vietnam','world','politics','economy','technology','ai','marketing']
VIDEO_CATEGORIES = ['vietnam','world','economy','technology','ai-trends']
ALLOW_HOSTS = {'youtube.com','www.youtube.com','youtu.be','i.ytimg.com','img.youtube.com'}
MAX_DAYS = 5

class Excerpt(HTMLParser):
    def __init__(self):
        super().__init__();self.bits=[];self.images=[];self.avoid=0
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag in ('script','style'):self.avoid+=1
        if tag=='img' and a.get('src'):self.images.append(a['src'])
    def handle_endtag(self,tag):
        if tag in ('script','style') and self.avoid:self.avoid-=1
    def handle_data(self,data):
        if not self.avoid:self.bits.append(data)

def text_clean(text, n=380):
    doc=Excerpt()
    try:doc.feed(text or '')
    except Exception:pass
    clean=' '.join(unescape(' '.join(doc.bits)).split())
    return clean[:n].rstrip() + ('…' if len(clean)>n else '')

def safe_url(raw):
    try:
        s=unescape(str(raw or '').strip());p=urlparse(s)
        if p.scheme not in ('https','http') or not p.hostname or p.username or p.password:return ''
        if p.hostname in ('localhost','127.0.0.1','0.0.0.0'):return ''
        return s
    except Exception:return ''

def parse_date(raw):
    if not raw:return None
    try:
        v=datetime.fromisoformat(raw.replace('Z','+00:00'))
        return (v if v.tzinfo else v.replace(tzinfo=timezone.utc)).astimezone(timezone.utc)
    except Exception:pass
    try:return parsedate_to_datetime(raw).astimezone(timezone.utc)
    except Exception:return None

def fetch_bytes(url):
    req=Request(url,headers={'User-Agent':'Mozilla/5.0 (compatible; DNGWORLDNewsroom/1.0; +https://dng-world.github.io/insights/)',
                             'Accept':'application/rss+xml, application/atom+xml, text/xml, application/xml, application/json, */*'})
    with urlopen(req,timeout=14) as r:return r.read(2_500_000)

def get(node,path):
    found=node.find(path,NS)
    return (found.text or '').strip() if found is not None and found.text else ''

def image_for(node,raw_desc):
    for path in ('m:thumbnail','m:content'):
        obj=node.find(path,NS)
        if obj is not None:
            t=obj.attrib.get('type','')
            if path.endswith('thumbnail') or not t or t.startswith('image/'):
                u=safe_url(obj.attrib.get('url',''))
                if u:return u
    for item in node.findall('enclosure'):
        if item.attrib.get('type','').startswith('image/'):
            u=safe_url(item.attrib.get('url')); 
            if u:return u
    parsed=Excerpt()
    try:parsed.feed(raw_desc or '')
    except Exception:pass
    for u in parsed.images:
        x=safe_url(u)
        if x:return x
    return ''

def entry_link(node,is_atom):
    if not is_atom:return get(node,'link')
    for item in node.findall('a:link',NS):
        if item.attrib.get('rel','alternate')=='alternate':return item.attrib.get('href','')
    return ''

def parse_news(source):
    publisher,category,url=source
    xml=ET.fromstring(fetch_bytes(url))
    entries=xml.findall('./channel/item') or xml.findall('./a:entry',NS)
    if not entries:entries=xml.findall('./{http://www.w3.org/2005/Atom}entry')
    items=[]
    for node in entries[:25]:
        atom=node.tag.endswith('entry')
        title=text_clean(get(node,'a:title' if atom else 'title'),180)
        link=safe_url(entry_link(node,atom))
        date=get(node,'a:published') or get(node,'a:updated') if atom else get(node,'pubDate') or get(node,'dc:date')
        published=parse_date(date)
        if not title or not link or not published or published>NOW+timedelta(hours=2) or published<NOW-timedelta(days=MAX_DAYS):continue
        raw=(get(node,'a:summary') or get(node,'a:content')) if atom else (get(node,'description') or get(node,'content:encoded'))
        excerpt=text_clean(raw,330)
        image=image_for(node,raw)
        if category in ('vietnam','world','technology'):
            headline=(title+' '+excerpt).casefold()
            if re.search(r'\b(ai|artificial intelligence|openai|chatgpt|gemini|trí tuệ nhân tạo)\b',headline):category_actual='ai'
            elif category in ('vietnam','world') and re.search(r'\b(chính trị|quốc hội|thủ tướng|chính phủ|ngoại giao|president|parliament|election|government)\b',headline):category_actual='politics'
            else:category_actual=category
        else:category_actual=category
        item_id=hashlib.sha256(link.encode()).hexdigest()[:18]
        items.append({'id':item_id,'title':title,'summary':excerpt,'source':publisher,'category':category_actual,
                      'url':link,'image':image,'published_at':published.isoformat(),'kind':'source_brief'})
    return publisher+' / '+category,items

def parse_channel(source):
    channel,category,channel_id=source
    if not re.fullmatch(r'UC[A-Za-z0-9_-]{22}',channel_id):raise ValueError('invalid channel ID')
    url='https://www.youtube.com/feeds/videos.xml?channel_id='+channel_id
    xml=ET.fromstring(fetch_bytes(url));out=[]
    for entry in xml.findall('a:entry',NS)[:24]:
        video_id=get(entry,'yt:videoId')
        published=parse_date(get(entry,'a:published'))
        title=text_clean(get(entry,'a:title'),170)
        if not re.fullmatch(r'[A-Za-z0-9_-]{11}',video_id or '') or not published or published<NOW-timedelta(days=10) or published>NOW+timedelta(hours=2):continue
        out.append({'id':video_id,'title':title,'channel':channel,'category':category,'published_at':published.isoformat(),
                    'thumbnail':'https://i.ytimg.com/vi/'+video_id+'/hqdefault.jpg', 'popularity':None,'provenance':'official_channel'})
    return 'YouTube / '+channel,out

def youtube_api():
    key=os.getenv('YOUTUBE_API_KEY','').strip()
    if not key:return [],'YOUTUBE_API_KEY not configured (official-channel mode)'
    out=[]
    for region in ('VN','US'):
        params=urlencode({'part':'snippet,statistics,contentDetails,status','chart':'mostPopular','regionCode':region,
                          'maxResults':50,'key':key,'videoCategoryId':'25'})
        url='https://www.googleapis.com/youtube/v3/videos?'+params
        try:data=json.loads(fetch_bytes(url))
        except Exception as exc:return out,'YouTube API '+str(exc)[:90]
        for item in data.get('items',[]):
            vid=item.get('id','');meta=item.get('snippet',{});status=item.get('status',{})
            if not re.fullmatch(r'[A-Za-z0-9_-]{11}',vid) or status.get('embeddable') is False:continue
            dt=parse_date(meta.get('publishedAt'))
            if not dt or dt<NOW-timedelta(days=10):continue
            text=(meta.get('title','')+' '+meta.get('description','')).lower()
            cat='vietnam' if region=='VN' else 'world'
            if re.search(r'\b(ai|artificial intelligence|chatgpt|gemini|machine learning|openai)\b',text):cat='ai-trends'
            elif re.search(r'\b(technology|technologies|chip|smartphone|software|robot|công nghệ)\b',text):cat='technology'
            elif re.search(r'\b(finance|economy|stocks|market|kinh tế|tài chính|lãi suất)\b',text):cat='economy'
            thumb=meta.get('thumbnails',{}).get('high',{}).get('url') or 'https://i.ytimg.com/vi/'+vid+'/hqdefault.jpg'
            out.append({'id':vid,'title':text_clean(meta.get('title'),170),'channel':meta.get('channelTitle','YouTube'),
                        'category':cat,'published_at':dt.isoformat(),'thumbnail':thumb,'popularity':int(item.get('statistics',{}).get('viewCount',0)),
                        'provenance':'youtube_popular_'+region})
    return out,''

def main():
    info_ok=[];failed=[];articles=[];videos=[]
    tasks=[(parse_news,feed) for feed in FEEDS]+[(parse_channel,ch) for ch in CHANNELS]
    with ThreadPoolExecutor(max_workers=9) as pool:
        future_map={pool.submit(fn,entry):entry[0]+' / '+entry[1] for fn,entry in tasks}
        for future in as_completed(future_map):
            try:
                name,rows=future.result()
                if rows:
                    info_ok.append(name)
                    if name.startswith('YouTube /'):videos.extend(rows)
                    else:articles.extend(rows)
                else:failed.append(future_map[future]+' (empty or no recent records)')
            except Exception as exc:failed.append(future_map[future]+' ('+str(exc)[:110]+')')
    api_videos,api_status=youtube_api()
    videos.extend(api_videos)
    article_seen={}
    for item in articles:
        # stable URL and title de-dup, keep version with best excerpt/image
        key=re.sub(r'[^\w]+','',item['title'].casefold())[:110]
        if key not in article_seen or (item['image'] and not article_seen[key]['image']):article_seen[key]=item
    article_list=sorted(article_seen.values(),key=lambda v:v['published_at'],reverse=True)
    # No historical article store; only latest snapshot and balanced categories.
    by_category={cat:0 for cat in CATEGORIES}
    selected=[]
    for it in article_list:
        if by_category.get(it['category'],0)>=22:continue
        if len(selected)>=110:break
        selected.append(it);by_category[it['category']]+=1
    selected.sort(key=lambda v:v['published_at'],reverse=True)
    vids_by_id={}
    for item in videos:
        prev=vids_by_id.get(item['id'])
        if prev is None or (item['popularity'] is not None and prev['popularity'] is None):vids_by_id[item['id']]=item
    grouped={cat:[] for cat in VIDEO_CATEGORIES}
    for item in sorted(vids_by_id.values(),key=lambda v:(v['popularity'] is not None,v['popularity'] or 0,v['published_at']),reverse=True):
        cat=item['category']
        if cat in grouped and len(grouped[cat])<8:grouped[cat].append(item)
    payload={'version':26,'updated_at':NOW.isoformat() if selected or any(grouped.values()) else None,
             'attempted_at':NOW.isoformat(),'status':'ok' if selected else 'partial' if videos else 'unavailable',
             'video_mode':'popular_and_channel' if api_videos else 'official_channels_latest',
             'video_api_note':api_status,'source_count':len(info_ok),'sources_ok':sorted(info_ok),
             'sources_failed':failed,'news':selected,'videos':grouped}
    if not selected and not any(grouped.values()):
        # Don't delete previously valid current snapshot on temporary full outage. Not a historical archive.
        if OUTPUT.exists():
            prev=json.loads(OUTPUT.read_text(encoding='utf-8'))
            prev['attempted_at']=NOW.isoformat();prev['status']='stale';prev['sources_failed']=failed
            payload=prev
        else:raise RuntimeError('No accessible news/video sources on first run.')
    OUTPUT.parent.mkdir(parents=True,exist_ok=True)
    OUTPUT.write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('news=',len(payload.get('news',[])),'videos=',sum(len(v) for v in payload.get('videos',{}).values()),'source_ok=',len(info_ok),'fail=',len(failed),'mode=',payload.get('video_mode'))

if __name__=='__main__':main()
