#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.SITE_URL || 'https://www.abusadore-et-vittima.com';
const PUBLIC_DIR = path.join(__dirname, '../public');

const htmlFiles = fs.readdirSync(PUBLIC_DIR).filter(f => f.endsWith('.html'));

const urls = htmlFiles.map(file => {
  const pathname = file === 'index.html' ? '/' : `/${file}`;
  const lastmod = new Date().toISOString().split('T')[0];
  return `  <url>
    <loc>${SITE_URL}${pathname}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
  </url>`;
}).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
console.log('✓ sitemap.xml generated');
