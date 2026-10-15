#!/usr/bin/env python3
"""News/TV freshness gate and post-update health assertion; stdlib only."""
import argparse
import json
import os
from datetime import datetime, timezone
from pathlib import Path
from sys import exit

p=argparse.ArgumentParser()
g=p.add_mutually_exclusive_group(required=True)
g.add_argument('--gate',action='store_true')
g.add_argument('--validate',action='store_true')
args=p.parse_args()
file=Path('data/newsroom.json')
try:
    data=json.loads(file.read_text(encoding='utf-8'))
except (OSError, ValueError):
    data={}
stamp=data.get('updated_at')
try:
    then=datetime.fromisoformat(str(stamp).replace('Z','+00:00'))
    if then.tzinfo is None: then=then.replace(tzinfo=timezone.utc)
    age=max(0,(datetime.now(timezone.utc)-then).total_seconds()/60)
except (TypeError,ValueError):
    age=float('inf')
if args.gate:
    manual=os.getenv('GH_EVENT')!='schedule'
    due=manual or age>=50
    print('refresh='+('true' if due else 'false'))
    print('News freshness:',round(age,1),'minutes; event:',os.getenv('GH_EVENT'),'; refresh:',due,file=__import__('sys').stderr)
else:
    news=data.get('news') or []
    videos=data.get('videos') or {}
    expected=('vietnam','world','economy','technology','ai-trends')
    counts={k:len(videos.get(k,[])) for k in expected}
    failures=[]
    if age>15:failures.append(f'updated_at is {age:.1f} minutes old')
    if len(news)<10:failures.append(f'Only {len(news)} news records')
    if any(not counts[k] for k in expected):failures.append(f'Empty video categories: {counts}')
    if data.get('status')!='ok':failures.append('News status is not ok')
    if failures:
        print('NEWSROOM VALIDATION FAILED: '+' | '.join(failures),file=__import__('sys').stderr)
        exit(1)
    print(f'Newsroom verified: {len(news)} articles; videos {counts}; age {age:.1f} minutes')
