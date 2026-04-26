import json
import re
from pathlib import Path
from urllib.parse import urljoin

import requests

SHOP_ROOT = Path(__file__).resolve().parents[1]
DATA_FP = SHOP_ROOT / 'data' / 'products.json'

BASE = 'https://www.generationrobots.com'

QUERIES = [
    'unitree',
    'go2',
    'b2',
    'go1',
    'h2',
    'g1',
    'z1',
]

PRODUCT_URL_RE = re.compile(r'^/en/(\d+)-[^\"#?]+\.html$')

OG_TITLE_RE = re.compile(r'<meta[^>]+property=["\']og:title["\'][^>]+content=["\']([^"\']+)["\']', re.I)
OG_IMAGE_RE = re.compile(r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']', re.I)

# price: try variants with €
PRICE_RE_EUR = re.compile(r'([0-9][0-9\s\.]*(?:,[0-9]{2})?)\s*€')


def normalize_eur(s: str) -> float:
    s = s.strip()
    # remove spaces
    s = s.replace(' ', '')
    # German style: thousands sep '.' and decimal ','
    if ',' in s:
        s = s.replace('.', '')
        s = s.replace(',', '.')
    else:
        # maybe dot decimals
        s = s.replace(',', '.')
    try:
        return float(s)
    except Exception:
        return 0.0


def extract_images(html: str, og_image: str | None) -> list[str]:
    imgs = []
    if og_image:
        imgs.append(og_image)

    # collect likely jpg/png URLs (keep limited)
    for m in re.finditer(r'https?://[^\"\']+\.(?:jpg|jpeg|png|webp)[^\"\']*', html, re.I):
        imgs.append(m.group(0))
        if len(imgs) >= 12:
            break

    # dedupe preserving order
    seen = set()
    out = []
    for u in imgs:
        if not u or u in seen:
            continue
        seen.add(u)
        out.append(u)
    return out[:8]


def map_solution_slug(title: str) -> str:
    t = title.lower()
    if any(x in t for x in ['h2', 'g1', 'humanoid', 'revo', 'uman', 'umano']):
        return 'umanoidi'
    if any(x in t for x in ['z1', 'arm', 'gripper', 'dex', 'robotic-arm', 'robotic arm']):
        return 'braccia'
    if any(x in t for x in ['go2', 'go1', 'b2', 'quadruped', 'quadruped', 'mobile robot', 'agibot', 'quad']):
        return 'quadrupedi'
    # fallback
    return 'accessori'


def guess_brand(title: str, query: str) -> str:
    t = title.lower()
    if 'unitree' in t:
        return 'Unitree'
    # if it looks like robot vendor or generic -> treat as Accessori
    if any(x in t for x in ['universal robots', 'ur3', 'franka', 'puma']):
        return 'Accessori'
    return 'Accessori' if query != 'unitree' else 'Unitree'


def guess_category(title: str) -> str:
    t = title.lower()
    if 'humanoid' in t or 'h2' in t or 'g1' in t:
        return 'Humanoid robots'
    if 'z1' in t or 'gripper' in t or 'robotic arm' in t or 'arm' in t:
        return 'Robotic arms'
    if 'go2' in t or 'go1' in t or 'b2' in t or 'quadruped' in t:
        return 'Quadruped robots'
    return 'Accessories'


def extract_product_urls_from_search(html: str) -> list[str]:
    urls = []
    for m in re.finditer(r'href="(/en/\d+-[^\"#?]+\.html)"', html, re.I):
        path = m.group(1)
        if PRODUCT_URL_RE.match(path):
            urls.append(path)
    # dedupe
    return list(dict.fromkeys(urls))


def scrape_product(url: str, query: str) -> dict | None:
    r = requests.get(url, timeout=25, headers={'User-Agent': 'Mozilla/5.0'})
    if r.status_code != 200:
        return None
    html = r.text

    og_title_m = OG_TITLE_RE.search(html)
    title = og_title_m.group(1).strip() if og_title_m else ''
    if not title:
        # fallback: try <h1>
        h1 = re.search(r'<h1[^>]*>([^<]+)</h1>', html, re.I)
        title = h1.group(1).strip() if h1 else ''

    # parse price from title or page
    price = 0.0
    # try in og:title first
    for pr in PRICE_RE_EUR.findall(title):
        price = normalize_eur(pr)
        if price > 0:
            break
    if price <= 0:
        # then from html
        m = PRICE_RE_EUR.search(html)
        if m:
            price = normalize_eur(m.group(1))

    og_image_m = OG_IMAGE_RE.search(html)
    og_image = og_image_m.group(1).strip() if og_image_m else None

    images = extract_images(html, og_image)

    # numeric id from url
    m_id = re.search(r'/en/(\d+)-', url)
    pid = m_id.group(1) if m_id else url

    # build slug
    slug_base = pid
    # short name from title before '|'
    name = title.split('|')[0].strip() if title else pid
    slug = f"gen-{slug_base}-{re.sub(r'[^a-z0-9]+','-', name.lower()).strip('-')}" if name else f"gen-{slug_base}"

    sol = map_solution_slug(title)
    brand = guess_brand(title, query)
    cat = guess_category(title)

    return {
        'id': slug,
        'slug': slug,
        'name': name,
        'brand': brand,
        'category': cat,
        'solutionSlug': sol,
        'priceEur': float(price) if price is not None else 0.0,
        'currency': 'EUR',
        'shortDescription': '',
        'description': '',
        'features': [],
        'images': images,
        'createdAt': None,
    }


def merge(existing: list[dict], new_items: list[dict]) -> tuple[list[dict], int]:
    # dedupe by slug
    by_slug = {p['slug']: p for p in existing}
    added_or_updated = 0
    for it in new_items:
        slug = it['slug']
        if slug in by_slug:
            ex = by_slug[slug]
            # merge images
            ex_imgs = ex.get('images') or []
            nxt_imgs = it.get('images') or []
            merged_imgs = []
            seen = set()
            for u in ex_imgs + nxt_imgs:
                if not u or u in seen:
                    continue
                # quick removal: don’t add empty / wix tiniest badges
                if any(x in u for x in ['w_1', 'h_1', 'w_49', 'h_19', 'w_0', 'h_0']):
                    continue
                if '0d5672_3184651fded945bd9c89824274503e00~mv2.png' in u:
                    continue
                seen.add(u)
                merged_imgs.append(u)
            ex['images'] = merged_imgs[:10]
            # update price if ex price is 0
            if (ex.get('priceEur') in [0, 0.0, None]) and it.get('priceEur') and it['priceEur'] > 0:
                ex['priceEur'] = float(it['priceEur'])
            # update name/category/solution if ex is empty
            for k in ['name', 'brand', 'category', 'solutionSlug']:
                if not ex.get(k):
                    ex[k] = it.get(k)
            by_slug[slug] = ex
            added_or_updated += 1
        else:
            # clean images quickly
            it_imgs = it.get('images') or []
            seen = set()
            cleaned=[]
            for u in it_imgs:
                if not u or u in seen:
                    continue
                if any(x in u for x in ['w_1', 'h_1', 'w_49', 'h_19', 'w_0', 'h_0']):
                    continue
                if '0d5672_3184651fded945bd9c89824274503e00~mv2.png' in u:
                    continue
                seen.add(u)
                cleaned.append(u)
            it['images']=cleaned[:10]
            it['createdAt'] = None
            by_slug[slug] = it
            added_or_updated += 1

    return list(by_slug.values()), added_or_updated


def main():
    if not DATA_FP.exists():
        raise SystemExit(f"Missing {DATA_FP}")
    existing = json.loads(DATA_FP.read_text(encoding='utf-8'))
    if not isinstance(existing, list):
        raise SystemExit('products.json must be list')

    new_items = []
    for query in QUERIES:
        for page in range(1, 4):
            search_url = f"{BASE}/en/search?controller=search&search_query={query}&page={page}"
            print('search', query, 'page', page)
            resp = requests.get(search_url, timeout=25, headers={'User-Agent': 'Mozilla/5.0'})
            if resp.status_code != 200:
                break
            product_paths = extract_product_urls_from_search(resp.text)
            if not product_paths:
                break
            # limit per query/page
            for path in product_paths[:12]:
                purl = urljoin(BASE, path)
                try:
                    it = scrape_product(purl, query)
                    if it and it.get('images'):
                        new_items.append(it)
                except Exception as e:
                    # ignore failures
                    pass

    # merge
    merged, n = merge(existing, new_items)
    # stable order
    merged.sort(key=lambda x: x.get('createdAt') or '')
    DATA_FP.write_text(json.dumps(merged, ensure_ascii=False, indent=2), encoding='utf-8')
    print('done. merged items:', n, 'total products:', len(merged), 'new scraped:', len(new_items))


if __name__ == '__main__':
    main()
