#!/usr/bin/env python3
"""Download the first image from a search query and save it in a named folder.

Usage:
    python scripts/download_logos.py --input list.txt
    python scripts/download_logos.py --query OpenAI --query Google
    python scripts/download_logos.py --input list.txt --output downloaded_images
"""

import argparse
import os
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

HEADERS = {
    'User-Agent': (
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
        'AppleWebKit/537.36 (KHTML, like Gecko) '
        'Chrome/124.0.0.0 Safari/537.36'
    ),
    'Accept-Language': 'en-US,en;q=0.9',
}

SEARCH_URL = 'https://www.bing.com/images/search?q={query}'

INVALID_PATH_CHARS = r'<>:"/\\|?*'


def sanitize_name(name: str) -> str:
    name = name.strip()
    name = re.sub(r'\s+', ' ', name)
    return ''.join('_' if c in INVALID_PATH_CHARS else c for c in name)


def fetch_search_html(query: str, timeout: int = 15) -> str | None:
    url = SEARCH_URL.format(query=urllib.parse.quote_plus(query))
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=timeout) as response:
        charset = response.headers.get_content_charset('utf-8')
        return response.read().decode(charset, errors='ignore')


def extract_first_image_url(html: str) -> str | None:
    # Try the JSON field used by Bing image results pages
    match = re.search(r'"murl"\s*:\s*"(https?://[^"\\]+)"', html)
    if match:
        return match.group(1).replace('\\u002f', '/')

    # Fallback to the first <img class="mimg" ... src="...">
    match = re.search(r'<img[^>]+class="[^"]*mimg[^"]*"[^>]+src="(https?://[^"]+)"', html)
    if match:
        return match.group(1)

    # Fallback for data-src attributes
    match = re.search(r'<img[^>]+data-src="(https?://[^"]+)"', html)
    if match:
        return match.group(1)

    return None


def download_image(url: str, dest_path: Path, timeout: int = 30) -> bool:
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as response:
            data = response.read()
            dest_path.write_bytes(data)
            return True
    except Exception as exc:
        print(f'  [error] failed to download {url}: {exc}')
        return False


def file_extension_from_url(url: str) -> str:
    parsed = urllib.parse.urlparse(url)
    root, ext = os.path.splitext(parsed.path)
    if ext and re.fullmatch(r'\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|jfif|tiff?)', ext, re.IGNORECASE):
        return ext
    return '.jpg'


def load_queries_from_file(path: Path) -> list[str]:
    if not path.exists():
        raise FileNotFoundError(f'Input file not found: {path}')
    with path.open('r', encoding='utf-8') as stream:
        lines = [line.strip() for line in stream if line.strip() and not line.startswith('#')]
    return lines


def main() -> None:
    parser = argparse.ArgumentParser(description='Download the first image result for each search term.')
    parser.add_argument('--input', '-i', type=Path, default=Path('list.txt'),
                        help='Text file with one search query per line.')
    parser.add_argument('--output', '-o', type=Path, default=Path('downloaded_images'),
                        help='Output directory for downloaded company folders.')
    parser.add_argument('--query', '-q', action='append', default=[],
                        help='Add a single search query. Can be repeated.')
    parser.add_argument('--limit', '-l', type=int, default=0,
                        help='Limit the number of queries downloaded from the input list. 0 means no limit.')
    parser.add_argument('--delay', '-d', type=float, default=1.0,
                        help='Seconds to wait between search requests.')
    args = parser.parse_args()

    queries: list[str] = []
    if args.query:
        queries.extend(args.query)

    if args.input and args.input.exists():
        queries.extend(load_queries_from_file(args.input))

    queries = [q for q in queries if q.strip()]
    if not queries:
        parser.error('No search queries provided. Use --query or supply an input file.')

    if args.limit > 0:
        queries = queries[: args.limit]

    args.output.mkdir(parents=True, exist_ok=True)

    print(f'Downloading first image for {len(queries)} queries into: {args.output}\n')
    for index, query in enumerate(queries, start=1):
        safe_name = sanitize_name(query)
        folder = args.output / safe_name
        folder.mkdir(parents=True, exist_ok=True)

        print(f'[{index}/{len(queries)}] {query}')
        html = fetch_search_html(query)
        if html is None:
            print('  [error] unable to fetch search result HTML')
            continue

        image_url = extract_first_image_url(html)
        if not image_url:
            print('  [error] no image URL found in search result HTML')
            continue

        ext = file_extension_from_url(image_url)
        dest_file = folder / f'logo{ext}'
        success = download_image(image_url, dest_file)
        if success:
            print(f'  saved: {dest_file}')
        time.sleep(args.delay)


if __name__ == '__main__':
    main()
