#!/usr/bin/env python3
"""DNGWORLD hourly editorial feed. Standard library only. External links and metadata, not copied articles."""
from __future__ import annotations
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from html import unescape
from pathlib import Path
from urllib.parse import quote_plus, urlparse, parse_qs
from urllib.request import Request, urlopen
from xml.etree import ElementTree as ET
import json, re, time, os

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'data' / 'news-live.json'
URLS = [
    ('TechCrunch', 'ai', 'https://techcrunch.com/feed/'),
    ('The Verge', 'technology', 'https://www.theverge.com/rss/index.xml'),
    ('Search Engine Land', 'marketing', 'https://searchengineland.com/feed'),
    ('Search Engine Journal', 'marketing', 'https://www.searchenginejournal.com/feed/'),
    ('Ars Technica', 'technology', 'https://feeds.arstechnica.com/arstechnica/index'),
    ('Google Blog', 'technology', 'https://blog.google/rss/'),
    ('Marketing · Google News VN', 'marketing', 'https://news.google.com/rss/search?q='+quote_plus('digital marketing Việt Nam when:7d')+'&hl=vi&gl=VN&ceid=VN:vi'),
    ('AI · Google News VN', 'ai', 'https://news.google.com/rss/search?q='+quote_plus('trí tuệ nhân tạo doanh nghiệp when:7d')+'&hl=vi&gl=VN&ceid=VN:vi'),
    ('Business · Google News VN', 'business', 'https://news.google.com/rss/search?q='+quote_plus('doanh nghiệp kinh doanh tăng trưởng when:7d')+'&hl=vi&gl=VN&ceid=VN:vi'),
    ('Advertising · Google News', 'marketing', 'https://news.google.com/rss/search?q='+quote_plus('digital advertising Meta Google Ads when:7d')+'&hl=en-US&gl=US&ceid=US:en'),
    ('Google Developers Video', 'video', 'https://www.youtube.com/feeds/videos.xml?channel_id=UC_x5XG1OV2P6uZZ5FSM9Ttw'),
]
NS = {'atom':'http://www.w3.org/2005/Atom','media':'http://search.yahoo.com/mrss/','yt':'http://www.youtube.com/xml/schemas/2015', 'content':'http://purl.org/rss/1.0/modules/content/','dc':'http://purl.org/dc/elements/1.1/'}
TAG=re.compile(r'<[^>]+>')
IMG=re.compile(r'<img\b[^>]*\bsrc=["\']([^"\']+)', re.I)

def strip(s, maxlen=400):
    s=unescape(TAG.sub(' ',s or ''))
    s=' '.join(s.split())
    return s[:maxlen]

def valid_url(s):
    if not isinstance(s,str):return ''
    s=s.strip()
    u=urlparse(s)
    return s if u.scheme in ('https','http') and u.netloc and not u.username else ''

def attr(e, path, key='url'):
    node=e.find(path,NS)
    return node.attrib.get(key,'') if node is not None else ''

def val(e,path):
    v=e.find(path,NS)
    return (v.text or '').strip() if v is not None else ''

def published(v):
    if not v:return None
    try:
        d=datetime.fromisoformat(v.replace('Z','+00:00'))
        return (d.replace(tzinfo=timezone.utc) if d.tzinfo is None else d).astimezone(timezone.utc)
    except Exception: pass
    try:return parsedate_to_datetime(v).astimezone(timezone.utc)
    except Exception:return None

def image_of(e, description):
    for key in ('media:thumbnail','media:content'):
        url=attr(e,key)
        if url and (key=='media:thumbnail' or (e.find(key,NS).attrib.get('type','').startswith('image'))):
            return valid_url(url)
    for enclosure in e.findall('enclosure'):
        if enclosure.attrib.get('type','').startswith('image'):return valid_url(enclosure.attrib.get('url',''))
    match=IMG.search(description or '')
    return valid_url(unescape(match.group(1))) if match else ''

def fetch(source):
    name,cat,url=source
    req=Request(url,headers={'User-Agent':'DNGWORLD-NewsReader/1.0 (+https://dngworld.github.io/insights/)', 'Accept':'application/rss+xml,application/atom+xml,application/xml,text/xml,*/*'})
    with urlopen(req,timeout=13) as r:
        payload=r.read(3_000_000)
    doc=ET.fromstring(payload)
    nodes=doc.findall('./channel/item') if doc.tag.lower().endswith('rss') else doc.findall('./atom:entry',NS)
    if not nodes and doc.tag.endswith('feed'): nodes=doc.findall('{http://www.w3.org/2005/Atom}entry')
    out=[]
    for node in nodes[:30]:
        is_atom=node.tag.endswith('entry')
        title=val(node,'atom:title' if is_atom else 'title')
        link=attr(node,'atom:link','href') if is_atom else val(node,'link')
        date=val(node,'atom:published') or val(node,'atom:updated') if is_atom else val(node,'pubDate') or val(node,'dc:date')
        desc=val(node,'atom:summary' if is_atom else 'description') or val(node,'atom:content' if is_atom else 'content:encoded')
        thumbnail=image_of(node,desc)
        video_id=val(node,'yt:videoId')
        if not video_id and 'youtube.com/watch' in link:
            video_id=parse_qs(urlparse(link).query).get('v',[''])[0]
        if video_id and re.fullmatch(r'[A-Za-z0-9_-]{11}',video_id):
            link=f'https://www.youtube.com/watch?v={video_id}'
            thumbnail=thumbnail or f'https://i.ytimg.com/vi/{video_id}/hqdefault.jpg'
        else:video_id=''
        if not title or not valid_url(link): continue
        dt=published(date)
        # Don't mislabel undated/stale content as today.
        if dt is None: continue
        if dt>datetime.now(timezone.utc)+timedelta(hours=8):continue
        if dt<datetime.now(timezone.utc)-timedelta(days=30):continue
        out.append({'title':strip(title,185),'summary':strip(desc,310),'source':name,'category': 'video' if video_id else cat,'url':link,'image':thumbnail,'video_id':video_id,'published_at':dt.isoformat()})
    return name,out

def main():
    prev={}
    if OUT.exists():
        try:prev=json.loads(OUT.read_text(encoding='utf8'))
        except Exception:pass
    items=list(prev.get('items',[]))
    done=[];errors=[];fetched=[]
    with ThreadPoolExecutor(max_workers=7) as executor:
        futures={executor.submit(fetch,source):source[0] for source in URLS}
        for future in as_completed(futures):
            try:
                name,chunk=future.result()
                if chunk:done.append(name);fetched.extend(chunk)
                else:errors.append(name+' (no dated items)')
            except Exception as exc:errors.append(futures[future]+' ('+str(exc)[:120]+')')
    # Merge existing stories, preserve original per-source URLs, and remove older entries.
    keyed={}
    for item in [*items,*fetched]:
        if not valid_url(item.get('url','')):continue
        dt=published(item.get('published_at',''))
        if not dt or dt<datetime.now(timezone.utc)-timedelta(days=30):continue
        key=re.sub(r'\W+','',item.get('title','').casefold())[:95]
        if not key:continue
        if key not in keyed or (item.get('image') and not keyed[key].get('image')):keyed[key]=item
    merged=sorted(keyed.values(),key=lambda x:x.get('published_at',''),reverse=True)[:180]
    payload={'updated_at':datetime.now(timezone.utc).isoformat() if done else prev.get('updated_at'),
             'attempted_at':datetime.now(timezone.utc).isoformat(),'status':'ok' if done else 'no_new_data',
             'source_count':len(done),'sources_ok':sorted(done),'sources_failed':errors,'items':merged}
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    print(f'Sources ok={len(done)}, failed={len(errors)}, items={len(merged)}')
    if not done and not merged:
        raise RuntimeError('All sources failed and no retained articles available.')

if __name__=='__main__':main()
