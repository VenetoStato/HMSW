import json
import re
from pathlib import Path

FP = Path(__file__).resolve().parents[1] / 'data' / 'products.json'

BAD_SUBSTRINGS = [
    'w_0',
    'h_0',
    'w_1',
    'h_1',
    'w_49',
    'h_19',
]


def should_keep(url: str) -> bool:
    if not url or not isinstance(url, str):
        return False
    if not url.startswith('http') and not url.startswith('/uploads/'):
        return False
    # Wix tiny/placeholder variants
    for s in BAD_SUBSTRINGS:
        if s in url:
            return False
    return True


def main():
    if not FP.exists():
        raise SystemExit(f'File not found: {FP}')

    products = json.loads(FP.read_text(encoding='utf-8'))
    changed = 0

    for p in products:
        imgs = p.get('images') or []
        seen = set()
        out = []
        for u in imgs:
            if not should_keep(u):
                continue
            if u in seen:
                continue
            seen.add(u)
            out.append(u)
        if out != imgs:
            p['images'] = out
            changed += 1

    FP.write_text(json.dumps(products, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f'cleanup done; products changed: {changed}')


if __name__ == '__main__':
    main()
