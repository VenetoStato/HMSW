import fs from 'node:fs';
import path from 'node:path';

const outputDir = path.join(process.cwd(), '.vercel', 'output');
const configPath = path.join(outputDir, 'config.json');
const manifestPath = path.join(outputDir, 'routes-manifest.json');

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function writeJson(p, obj) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2));
}

if (!fs.existsSync(configPath)) {
  console.warn(`[routes-manifest] Missing ${configPath}, skipping.`);
  process.exit(0);
}

const config = readJson(configPath);

// Vercel expects routes-manifest.json to exist for some SvelteKit integrations.
// We mirror the routing config we already generate in .vercel/output/config.json.
const manifest = {
  version: 1,
  routes: config?.routes ?? [],
  // Keep room for future fields; Vercel should tolerate extra keys.
  generatedAt: new Date().toISOString()
};

writeJson(manifestPath, manifest);
console.log(`[routes-manifest] Wrote ${manifestPath}`);
