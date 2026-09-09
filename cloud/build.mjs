#!/usr/bin/env node
// Static site generator for the HeatCloud product site.
// Usage: node build.mjs [--out dist] [--check]
//   --check  verify every internal link resolves to a generated page or asset
//
// No dependencies. Output is a plain directory tree suitable for any static
// web server; the devbox serves it with nginx.

import { mkdir, writeFile, readdir, copyFile, rm, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { page } from './src/layout.mjs';
import { site } from './src/site.mjs';
import { home } from './src/pages/home.mjs';
import { servicesIndex, servicePages } from './src/pages/service.mjs';
import { pricing, heat, datacenters, about, support, contact, notFound } from './src/pages/marketing.mjs';
import { legalPages } from './src/pages/legal.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const outDir = resolve(here, args.includes('--out') ? args[args.indexOf('--out') + 1] : 'dist');
const doCheck = args.includes('--check');

const pages = [
  home(),
  servicesIndex(),
  ...servicePages(),
  pricing(),
  heat(),
  datacenters(),
  about(),
  support(),
  contact(),
  ...legalPages(),
  notFound(),
];

// ---------------------------------------------------------------- filesystem
const fileFor = (p) => {
  if (p === '/') return 'index.html';
  if (p.endsWith('.html')) return p.replace(/^\//, '');
  return p.replace(/^\//, '').replace(/\/$/, '') + '/index.html';
};

async function copyDir(from, to) {
  await mkdir(to, { recursive: true });
  for (const entry of await readdir(from, { withFileTypes: true })) {
    const src = join(from, entry.name);
    const dst = join(to, entry.name);
    if (entry.isDirectory()) await copyDir(src, dst);
    else await copyFile(src, dst);
  }
}

// -------------------------------------------------------------------- render
await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

const written = [];
for (const p of pages) {
  const html = page(p);
  const rel = fileFor(p.path);
  const abs = join(outDir, rel);
  await mkdir(dirname(abs), { recursive: true });
  await writeFile(abs, html, 'utf8');
  written.push({ path: p.path, rel, bytes: Buffer.byteLength(html) });
}

// -------------------------------------------------------------------- assets
const assetsOut = join(outDir, 'assets');
await mkdir(assetsOut, { recursive: true });
const repoAssets = resolve(here, '..', 'assets');
if (existsSync(repoAssets)) await copyDir(repoAssets, assetsOut);
await copyFile(join(here, 'src', 'styles.css'), join(assetsOut, 'styles.css'));

// ------------------------------------------------------- sitemap and robots
const urls = pages.filter((p) => !p.path.endsWith('.html')).map((p) =>
  `  <url><loc>${site.origin}${p.path}</loc><lastmod>${site.updated}</lastmod></url>`).join('\n');
await writeFile(join(outDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

// The preview must not be indexed: it describes a company that does not exist yet.
await writeFile(join(outDir, 'robots.txt'), 'User-agent: *\nDisallow: /\n');

// --------------------------------------------------------------- link check
let problems = 0;
if (doCheck) {
  const known = new Set(pages.map((p) => p.path));
  for (const p of pages) known.add(fileFor(p.path).replace(/index\.html$/, ''));

  const assetFiles = new Set();
  const walk = async (dir, prefix) => {
    for (const e of await readdir(dir, { withFileTypes: true })) {
      if (e.isDirectory()) await walk(join(dir, e.name), prefix + e.name + '/');
      else assetFiles.add(prefix + e.name);
    }
  };
  await walk(assetsOut, '/assets/');

  for (const p of pages) {
    const html = page(p);
    const hrefs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
    for (const h of hrefs) {
      if (/^(https?:|mailto:|#|data:)/.test(h)) continue;
      const clean = h.split('#')[0].split('?')[0];
      if (!clean) continue;
      if (known.has(clean) || assetFiles.has(clean)) continue;
      console.error(`  BROKEN  ${p.path}  ->  ${h}`);
      problems++;
    }
    // Every page must carry the elements we rely on.
    for (const [what, re] of [
      ['title', /<title>[^<]{10,}<\/title>/],
      ['description', /<meta name="description" content="[^"]{40,}"/],
      ['nav', /class="nav-in"/],
      ['footer', /class="foot-bottom"/],
    ]) {
      if (!re.test(html)) { console.error(`  MISSING ${what.padEnd(11)} ${p.path}`); problems++; }
    }
  }
}

// -------------------------------------------------------------------- report
const total = written.reduce((a, w) => a + w.bytes, 0);
console.log(`built ${written.length} pages -> ${outDir}`);
console.log(`       ${(total / 1024).toFixed(0)} KB of HTML, ${(await readdir(assetsOut)).length} assets`);
if (doCheck) {
  console.log(problems ? `check: ${problems} problem(s)` : 'check: all internal links and page elements OK');
  if (problems) process.exit(1);
}
