# Live-site internal link check: crawls every sitemap URL, checks each internal link returns 200,
# and reports orphan pages and articles with fewer than 3 inbound links.
# Usage: NODE_USE_ENV_PROXY=1 python3 scripts/check-internal-links.py [pages.json]
import sys,re,urllib.request,concurrent.futures as cf,collections,json
B="https://www.dogfoodscout.com"
def get(u):
    try:
        r=urllib.request.urlopen(urllib.request.Request(u,headers={"User-Agent":"dfs-linkcheck"}),timeout=30); return r.status,r.read().decode('utf-8','ignore')
    except urllib.error.HTTPError as e: return e.code,''
    except Exception as e: return 0,str(e)
_,sm=get(B+"/sitemap.xml"); pages=sorted(set(re.findall(r'<loc>([^<]+)</loc>',sm)))
print('sitemap pages',len(pages))
links=collections.defaultdict(set); inbound=collections.Counter(); nofollow=[]
def fetch(p):
    s,h=get(p); return p,s,h
with cf.ThreadPoolExecutor(12) as ex:
    res=list(ex.map(fetch,pages))
bad_pages=[(p,s) for p,s,h in res if s!=200]
for p,s,h in res:
    for href in set(re.findall(r'href="(/[^"#?]*)',h)):
        if href.startswith('/_next') or href.startswith('/api'): continue
        links[href].add(p); 
        if B+href.rstrip('/')!=p.rstrip('/'): inbound[(B+href).rstrip('/')]+=1
targets=sorted(links)
with cf.ThreadPoolExecutor(12) as ex:
    st=dict(zip(targets,ex.map(lambda t:get(B+t)[0],targets)))
broken={t:sorted(links[t])[:3] for t,s in st.items() if s!=200}
orphans=[p for p in pages if inbound[p.rstrip('/')]==0 and p.rstrip('/')!=B]
weak=[(p,inbound[p.rstrip('/')]) for p in pages if '/articles/' in p and inbound[p.rstrip('/')]<3]
print('pages non-200',bad_pages); print('unique internal links',len(targets)); print('broken',json.dumps(broken,indent=1))
print('orphans (no inbound links)',len(orphans),orphans[:20]); print('articles with <3 inbound', weak)
json.dump({'pages':pages},open(sys.argv[1] if len(sys.argv)>1 else 'pages.json','w'))
