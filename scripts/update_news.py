#!/usr/bin/env python3
"""DNGWORLD V36 News/TV: RSS news + official YouTube Data API video discovery.
Official API key is required for NEW video updates; no fragile YouTube channel RSS.
Never erase a proven-good video selection because of an upstream failure.
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
import hashlib, json, os, re, subprocess
from urllib.error import HTTPError, URLError

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
# Verified official channel IDs. API uploads playlist discovery uses channels.list, not RSS.
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
                      'url':link,'image':image,'published_at':published.isoformat(),'kind':'source_brief','source_lang':'vi' if publisher in ('VnExpress','Tuổi Trẻ','VietnamPlus') else 'en'})
    return publisher+' / '+category,items

VIDEO_ID = re.compile(r'^[A-Za-z0-9_-]{11}$')
# Last known-good snapshot in THIS repository. Bootstrap only if latest snapshots are empty.
# Do not re-fetch it every hour or mislabel its content as "latest".
BOOTSTRAP_COMMIT = '597297d3ef2f'
VIDEO_RETENTION_DAYS = 14


def youtube_get(resource, params, key):
    """Read-only YouTube Data API v3. API key never logged/persisted."""
    req_params = {**params, 'key': key}
    url = 'https://www.googleapis.com/youtube/v3/' + resource + '?' + urlencode(req_params)
    request = Request(url, headers={'Accept':'application/json', 'User-Agent':'DNGWORLDNewsroom/3.6'})
    try:
        with urlopen(request, timeout=18) as response:
            obj = json.loads(response.read(3_000_000))
    except HTTPError as exc:
        try:
            raw = json.loads(exc.read(3500))
            reason = ((raw.get('error') or {}).get('errors') or [{}])[0].get('reason', 'unknown')
        except Exception:
            reason = 'unknown'
        raise RuntimeError(f'YouTube API HTTP {exc.code} ({reason})') from None
    except (URLError, TimeoutError) as exc:
        raise RuntimeError('YouTube API network/timeout error') from None
    if not isinstance(obj, dict):
        raise ValueError('Invalid YouTube API response')
    if 'error' in obj:
        raise RuntimeError('YouTube API reported an error')
    return obj


def classify_popular(meta, region):
    title = (meta.get('title') or '').casefold()
    desc = (meta.get('description') or '')[:600].casefold()
    text = title + ' ' + desc
    if re.search(r'\b(ai|artificial intelligence|chatgpt|gemini|openai|trí tuệ nhân tạo|machine learning)\b', text):
        return 'ai-trends'
    if re.search(r'\b(technology|tech|robot|chip|smartphone|công nghệ|software)\b', text):
        return 'technology'
    if re.search(r'\b(finance|economy|business|stocks|market|kinh tế|tài chính|chứng khoán)\b', text):
        return 'economy'
    return 'vietnam' if region == 'VN' else 'world'


def validate_youtube_video(raw, cat, provenance):
    vid=raw.get('id')
    snippet=raw.get('snippet') or {}
    status=raw.get('status') or {}
    details=raw.get('contentDetails') or {}
    if not isinstance(vid, str) or not VIDEO_ID.fullmatch(vid):return None
    # Only publicly playable/embed-enabled videos are eligible. Other playback
    # restrictions may still apply at player runtime (Content ID, region, etc.).
    if status.get('privacyStatus') != 'public' or status.get('embeddable') is not True:return None
    if status.get('uploadStatus', 'processed') not in ('processed',):return None
    if snippet.get('liveBroadcastContent')=='upcoming':return None
    blocked=(details.get('regionRestriction') or {}).get('blocked') or []
    if 'VN' in blocked:return None
    dt=parse_date(snippet.get('publishedAt'))
    if not dt or dt>NOW+timedelta(hours=2) or dt<NOW-timedelta(days=VIDEO_RETENTION_DAYS):return None
    title=text_clean(snippet.get('title'),170)
    if not title or title.lower() in ('private video','deleted video'):return None
    thumb=(snippet.get('thumbnails') or {}).get('high',{}).get('url') or 'https://i.ytimg.com/vi/'+vid+'/hqdefault.jpg'
    if not safe_url(thumb):thumb='https://i.ytimg.com/vi/'+vid+'/hqdefault.jpg'
    views=int((raw.get('statistics') or {}).get('viewCount') or 0)
    channel=snippet.get('channelTitle') or 'YouTube'
    source_lang='vi' if cat=='vietnam' and (provenance=='channel' or bool(re.search('[À-ỹà-ỹ]',title))) else 'en'
    return {'id':vid, 'title':title, 'channel':channel, 'category':cat,
            'published_at':dt.isoformat(),'thumbnail':thumb,'popularity':views,
            'provenance':'youtube_popular' if provenance=='popular' else 'official_channel_api',
            'source_lang':source_lang}


def fetch_youtube_catalog(key):
    """Bounded-cost API: one channels.list, 7 playlistItems, batches of videos.list,
    and 2 optional mostPopular calls. No expensive search.list. Graceful partials."""
    if not key:
        return [], [], ['YOUTUBE_API_KEY not configured; live video updates disabled'],False
    results=[];ok=[];failed=[];api_responded=False
    lookup={ch[2]: (ch[0],ch[1]) for ch in CHANNELS}
    pending={};candidate_category={}
    try:
        channels=youtube_get('channels',{'part':'contentDetails','id':','.join(lookup)},key)
        api_responded=True
        for item in channels.get('items',[]):
            ch_id=item.get('id'); playlist=((item.get('contentDetails') or {}).get('relatedPlaylists') or {}).get('uploads')
            if ch_id in lookup and playlist:pending[ch_id]=playlist
        if not pending:failed.append('YouTube channels.list returned no uploads playlists')
    except Exception as exc:
        failed.append('YouTube channels.list: '+str(exc)[:120])
    for ch_id,playlist in pending.items():
        name,cat=lookup[ch_id]
        try:
            data=youtube_get('playlistItems',{'part':'contentDetails','playlistId':playlist,'maxResults':20},key)
            api_responded=True
            for item in data.get('items',[]):
                vid=(item.get('contentDetails') or {}).get('videoId')
                if isinstance(vid,str) and VIDEO_ID.fullmatch(vid):candidate_category.setdefault(vid,cat)
            ok.append('YouTube API / '+name)
        except Exception as exc:failed.append('YouTube playlist / '+name+': '+str(exc)[:110])
    for start in range(0,len(candidate_category),50):
        batch=list(candidate_category)[start:start+50]
        try:
            data=youtube_get('videos',{'part':'snippet,status,contentDetails,statistics','id':','.join(batch)},key)
            api_responded=True
            for item in data.get('items',[]):
                vid=item.get('id');cat=candidate_category.get(vid)
                if cat:
                    verified=validate_youtube_video(item,cat,'channel')
                    if verified:results.append(verified)
        except Exception as exc:failed.append('YouTube videos.list: '+str(exc)[:110])
    # YouTube's actual 'mostPopular' chart is an optional enrichment, not a
    # substitute for curated official publishers or a fabricated trend score.
    popular_found=False
    for region in ('VN','US'):
        try:
            data=youtube_get('videos',{'part':'snippet,status,contentDetails,statistics',
                 'chart':'mostPopular','regionCode':region,'videoCategoryId':'25','maxResults':35},key)
            api_responded=True
            n=0
            for item in data.get('items',[]):
                cat=classify_popular(item.get('snippet') or {},region)
                verified=validate_youtube_video(item,cat,'popular')
                if verified:results.append(verified);n+=1
            if n:popular_found=True
            ok.append('YouTube mostPopular / '+region)
        except Exception as exc:failed.append('YouTube mostPopular / '+region+': '+str(exc)[:110])
    return results,ok,failed,popular_found


def previous_catalog():
    try:
        if OUTPUT.exists():return json.loads(OUTPUT.read_text(encoding='utf-8'))
    except (ValueError,OSError) as exc:print('Previous snapshot malformed:',type(exc).__name__)
    return {}


def bootstrap_catalog():
    # Last-resort local repository history, no hardcoded invented videos.
    try:
        result=subprocess.run(['git','show',BOOTSTRAP_COMMIT+':data/newsroom.json'],
                   cwd=BASE,check=True,capture_output=True,text=True,timeout=14)
        return json.loads(result.stdout)
    except (subprocess.SubprocessError,ValueError,OSError) as exc:
        print('Video bootstrap unavailable:',type(exc).__name__)
        return {}


def valid_old_videos(snapshot,cat):
    rows=((snapshot or {}).get('videos') or {}).get(cat) or []
    if not isinstance(rows,list):return []
    seen=set();chosen=[]
    for row in rows:
        if not isinstance(row,dict) or not VIDEO_ID.fullmatch(str(row.get('id',''))):continue
        if not isinstance(row.get('title'),str) or not row['title'].strip():continue
        dt=parse_date(row.get('published_at'))
        if not dt or dt>NOW+timedelta(hours=2) or dt<NOW-timedelta(days=VIDEO_RETENTION_DAYS):continue
        if row['id'] in seen:continue
        seen.add(row['id']);chosen.append(row)
    return chosen


def combine_video_groups(fresh,previous,bootstrap):
    categories={cat:[] for cat in VIDEO_CATEGORIES}
    uniq={}
    for row in fresh:
        if row['id'] not in uniq or (row['provenance']=='youtube_popular' and uniq[row['id']]['provenance']!='youtube_popular'):
            uniq[row['id']]=row
    for row in uniq.values():
        if row.get('category') in categories:categories[row['category']].append(row)
    for cat in VIDEO_CATEGORIES:
        # Newest verified publication first; official source wins time ties.
        # MostPopular chart position is not a freshness signal.
        categories[cat].sort(key=lambda x:(x['published_at'],x.get('provenance')!='youtube_popular'),reverse=True)
        old=valid_old_videos(previous,cat)
        if not old:old=valid_old_videos(bootstrap,cat)
        seen={x['id'] for x in categories[cat]}
        categories[cat]=(categories[cat]+[x for x in old if x['id'] not in seen])[:8]
    return categories


# V31 language contract: news and video use origin language with optional
# faithful metadata translations. Never fabricate original article content.
def enrich_languages(articles,grouped):
    entries=articles+[v for group in grouped.values() for v in group]
    for x in entries:
        lang=x.get('source_lang','en')
        # Preserve useful translations for restored videos from prior syncs.
        prior=x.get('translations') or {}
        x['translations']={**prior,lang:{'title':x.get('title',''),'summary':x.get('summary','')}}
    key=os.getenv('OPENAI_API_KEY','').strip()
    if not key:return 'not_configured'
    model=os.getenv('DNG_TRANSLATE_MODEL','gpt-4o-mini').strip()
    def translate_batch(items,target):
        request_items=[{'id':x['id'],'title':x['title'],'summary':x.get('summary','')} for x in items]
        system=('Translate news/video metadata faithfully into '+{'vi':'Vietnamese','en':'English','zh':'Simplified Chinese'}[target]
           +'. Retain all facts, names, dates and uncertainty. Never invent facts. '
            'Reply with ONLY JSON: {"items":[{"id":"...","title":"...","summary":"..."}]}')
        req_body={'model':model,'messages':[{'role':'system','content':system},
                 {'role':'user','content':json.dumps(request_items,ensure_ascii=False)}],
                  'temperature':0,'response_format':{'type':'json_object'},'max_tokens':5200}
        req=Request('https://api.openai.com/v1/chat/completions',
                data=json.dumps(req_body,ensure_ascii=False).encode('utf-8'),
                headers={'Authorization':'Bearer '+key,'Content-Type':'application/json'},method='POST')
        with urlopen(req,timeout=55) as response:obj=json.loads(response.read(650_000))
        parsed=json.loads(obj['choices'][0]['message']['content'])
        by_id={x['id']:x for x in items};done=0
        for item in parsed.get('items',[]):
            src=by_id.get(item.get('id'))
            if not src:continue
            title=str(item.get('title') or '').strip();summary=str(item.get('summary') or '').strip()
            if title and len(title)<350 and len(summary)<850:
                src['translations'][target]={'title':title,'summary':summary};done+=1
        return done
    failures=[]
    for target in ('vi','en','zh'):
        missing=[x for x in entries if target not in x['translations']]
        for i in range(0,len(missing),15):
            try:translate_batch(missing[i:i+15],target)
            except Exception as exc:failures.append(target+': '+type(exc).__name__)
    if failures:print('Translations partial:',len(failures),'errors')
    return 'partial' if failures else 'ok'

def main():
    # Read LAST successful file before any update, never mutate it until the
    # new snapshot has been verified and written atomically.
    previous=previous_catalog()
    info_ok=[];failed=[];articles=[]
    with ThreadPoolExecutor(max_workers=8) as pool:
        future_map={pool.submit(parse_news,feed):feed[0]+' / '+feed[1] for feed in FEEDS}
        for future in as_completed(future_map):
            try:
                name,rows=future.result()
                if rows:info_ok.append(name);articles.extend(rows)
                else:failed.append(future_map[future]+' (empty or no recent records)')
            except Exception as exc:failed.append(future_map[future]+' ('+str(exc)[:110]+')')
    key=os.getenv('YOUTUBE_API_KEY','').strip()
    fresh,video_ok,video_failed,has_popular=fetch_youtube_catalog(key)
    if not fresh:
        print('WARNING: No fresh YouTube videos; preserving previously known videos.')
    has_previous=any(valid_old_videos(previous,cat) for cat in VIDEO_CATEGORIES)
    bootstrap=bootstrap_catalog() if not has_previous or any(not valid_old_videos(previous,cat) for cat in VIDEO_CATEGORIES) else {}
    grouped=combine_video_groups(fresh,previous,bootstrap)
    fresh_categories={v['category'] for v in fresh}
    fallback_categories=[cat for cat in VIDEO_CATEGORIES if cat not in fresh_categories and grouped[cat]]
    if not any(grouped.values()):
        # Do not publish a "successful" blank TV snapshot. The news may have
        # refreshed but the website must retain last working video selection.
        raise RuntimeError('No usable YouTube videos: API unavailable and recovery exhausted. Refusing to publish empty TV.')
    article_seen={}
    for item in articles:
        key_title=re.sub(r'[^\w]+','',item['title'].casefold())[:110]
        if key_title not in article_seen or (item['image'] and not article_seen[key_title]['image']):article_seen[key_title]=item
    article_list=sorted(article_seen.values(),key=lambda v:v['published_at'],reverse=True)
    by_category={cat:0 for cat in CATEGORIES};selected=[]
    for it in article_list:
        if by_category.get(it['category'],0)>=22:continue
        if len(selected)>=110:break
        selected.append(it);by_category[it['category']]+=1
    if not info_ok:
        # Preserve previous snapshot and its real updated_at. Never mark old
        # headlines as refreshed when every RSS source failed.
        raise RuntimeError('All news RSS feeds failed: keeping last verified snapshot intact.')
    if not selected:
        raise RuntimeError('All collected RSS feeds produced no usable fresh headlines.')
    selected.sort(key=lambda v:v.get('published_at',''),reverse=True)
    translation_status=enrich_languages(selected,grouped)
    video_health='fresh' if not fallback_categories else ('partial' if fresh else 'stale')
    if not key:video_health='waiting_for_api_key'
    video_success_time=NOW.isoformat() if fresh else (previous.get('video_last_success_at') or
                    previous.get('updated_at') if has_previous else bootstrap.get('updated_at'))
    if fallback_categories and fresh:
        video_warning='Some YouTube channels were unavailable; retained previously collected videos in '+', '.join(fallback_categories)+'.'
    elif not key:
        video_warning='YouTube Data API key has not been configured. Displaying previously collected videos; new videos are NOT refreshing.'
    elif not fresh:
        video_warning='YouTube Data API unavailable or returned no playable videos; previously collected videos retained.'
    else:video_warning=''
    payload={'version':36,'translation_status':translation_status,'updated_at':NOW.isoformat(),
        'attempted_at':NOW.isoformat(),'status':'ok' if selected else 'partial',
        'video_status':video_health,'video_warning':video_warning,
        'video_last_success_at':video_success_time,
        'video_mode':'popular_and_channel' if has_popular else 'official_channels_latest',
        'video_api_note':'YouTube Data API v3 / verified embeddable public videos' if key else 'YOUTUBE_API_KEY missing',
        'source_count':len(info_ok)+len(video_ok),'sources_ok':sorted(info_ok+video_ok),
        'sources_failed':failed+video_failed,'news':selected,'videos':grouped}
    OUTPUT.parent.mkdir(parents=True,exist_ok=True)
    temporary=OUTPUT.with_suffix('.json.tmp')
    temporary.write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    temporary.replace(OUTPUT)
    print('DNGWORLD V36: news',len(selected),'videos',sum(map(len,grouped.values())),
          'fresh',len(fresh),'video_status',video_health,'API calls ~ <= 15/hour')

if __name__=='__main__': main()
