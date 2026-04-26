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

# Wix media ID(s) that appear to correspond to the unwanted "Meko/MekoSrl"-style badge.
# (We detected that all w_49,h_19 variants share the same base ID.)
BAD_WIX_MEDIA_BASES = {
    '0d5672_3184651fded945bd9c89824274503e00~mv2.png',
}


def should_keep(url: str) -> bool:
    if not url or not isinstance(url, str):
        return False
    if not url.startswith('http') and not url.startswith('/uploads/'):
        return False
    for s in BAD_SUBSTRINGS:
        if s in url:
            return False
    # Explicit Wix media-ID blacklist
    for bad in BAD_WIX_MEDIA_BASES:
        if bad in url:
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
