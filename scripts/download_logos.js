#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const INVALID_PATH_CHARS = /[<>:"/\\|?*]/g;
const BING_IMAGE_SEARCH = 'https://www.bing.com/images/search?q=';
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9',
};

function sanitizeName(name) {
  return name
    .trim()
    .replace(/\s+/g, ' ')
    .replace(INVALID_PATH_CHARS, '_');
}

function parseArgs(argv) {
  const args = { input: 'list.txt', output: 'downloaded_images', query: [], limit: 0, delay: 1.0 };
  const tokens = argv.slice(2);
  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];
    if (token === '--input' || token === '-i') {
      args.input = tokens[++i] || args.input;
    } else if (token === '--output' || token === '-o') {
      args.output = tokens[++i] || args.output;
    } else if (token === '--query' || token === '-q') {
      const value = tokens[++i];
      if (value) args.query.push(value);
    } else if (token === '--limit' || token === '-l') {
      args.limit = Number(tokens[++i]) || 0;
    } else if (token === '--delay' || token === '-d') {
      args.delay = Number(tokens[++i]) || 1.0;
    } else if (token === '--help' || token === '-h') {
      printUsageAndExit();
    }
  }
  return args;
}

function printUsageAndExit() {
  const text = `Usage: node scripts/download_logos.js [options]

Options:
  --input, -i   Path to query file (default: list.txt)
  --output, -o  Output directory (default: downloaded_images)
  --query, -q   Search query; repeatable
  --limit, -l   Maximum number of queries to process
  --delay, -d   Seconds to wait between requests (default: 1.0)
  --help, -h    Show this message
`;
  process.stdout.write(text);
  process.exit(0);
}

async function fetchHtml(query) {
  const url = BING_IMAGE_SEARCH + encodeURIComponent(query);
  const response = await fetch(url, { headers: HEADERS });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }
  return response.text();
}

function extractFirstImageUrl(html) {
  const murl = html.match(/"murl"\s*:\s*"(https?:\/\/[^"\\]+)"/i);
  if (murl) {
    return murl[1].replace(/\\u002f/g, '/');
  }

  const img = html.match(/<img[^>]+class="[^"]*mimg[^"]*"[^>]+src="(https?:\/\/[^"\\]+)"/i);
  if (img) {
    return img[1];
  }

  const dataSrc = html.match(/<img[^>]+data-src="(https?:\/\/[^"\\]+)"/i);
  if (dataSrc) {
    return dataSrc[1];
  }

  return null;
}

function fileExtensionFromUrl(imageUrl) {
  try {
    const parsed = new URL(imageUrl);
    const ext = path.extname(parsed.pathname).toLowerCase();
    if (/\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|jfif|tiff?)$/.test(ext)) {
      return ext;
    }
  } catch (err) {
    // ignore invalid URL
  }
  return '.jpg';
}

function loadQueriesFromFile(filePath) {
  const absolutePath = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Input file not found: ${absolutePath}`);
  }
  return fs.readFileSync(absolutePath, 'utf-8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'));
}

async function downloadImage(imageUrl, destination) {
  const response = await fetch(imageUrl, { headers: HEADERS });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(destination, Buffer.from(buffer));
}

async function sleep(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

async function run() {
  const options = parseArgs(process.argv);
  const queries = [];

  if (options.query.length > 0) {
    queries.push(...options.query);
  }
  if (options.input) {
    queries.push(...loadQueriesFromFile(options.input));
  }

  const uniqueQueries = [...new Set(queries.map((q) => q.trim()).filter(Boolean))];
  if (uniqueQueries.length === 0) {
    printUsageAndExit();
  }

  const selectedQueries = options.limit > 0 ? uniqueQueries.slice(0, options.limit) : uniqueQueries;
  const outDir = path.resolve(process.cwd(), options.output);
  fs.mkdirSync(outDir, { recursive: true });

  console.log(`Downloading first image for ${selectedQueries.length} queries into: ${outDir}\n`);

  for (let i = 0; i < selectedQueries.length; i += 1) {
    const query = selectedQueries[i];
    const safeName = sanitizeName(query);
    const folder = path.join(outDir, safeName);
    fs.mkdirSync(folder, { recursive: true });
    console.log(`[${i + 1}/${selectedQueries.length}] ${query}`);

    try {
      const html = await fetchHtml(query);
      const imageUrl = extractFirstImageUrl(html);
      if (!imageUrl) {
        console.error('  [error] no image URL found');
        continue;
      }
      const ext = fileExtensionFromUrl(imageUrl);
      const destination = path.join(folder, `logo${ext}`);
      await downloadImage(imageUrl, destination);
      console.log(`  saved: ${destination}`);
    } catch (error) {
      console.error(`  [error] ${error.message}`);
    }

    if (i < selectedQueries.length - 1) {
      await sleep(options.delay);
    }
  }
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
