#!/usr/bin/env node
/**
 * Post-build prerender script.
 * Launches a local server, visits each route with Puppeteer,
 * and saves the fully-rendered HTML so AI crawlers see real content.
 *
 * Usage: node scripts/prerender.mjs
 * Run after: npx vite build
 */

import { launch } from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const PORT = 4173;

const ROUTES = ['/', '/services', '/specialists', '/about', '/ai-assistant'];

// Simple static file server that falls back to index.html (SPA behavior)
function startServer() {
    const indexHtml = readFileSync(join(DIST, 'index.html'), 'utf-8');

    const server = createServer((req, res) => {
        const url = req.url.split('?')[0];
        const filePath = join(DIST, url);

        if (existsSync(filePath) && !filePath.endsWith('/')) {
            try {
                const ext = filePath.split('.').pop();
                const mimeTypes = {
                    html: 'text/html', js: 'application/javascript',
                    css: 'text/css', svg: 'image/svg+xml',
                    json: 'application/json', txt: 'text/plain', xml: 'application/xml',
                };
                res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
                res.end(readFileSync(filePath));
                return;
            } catch { /* fall through to SPA fallback */ }
        }

        // SPA fallback
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(indexHtml);
    });

    return new Promise((resolve) => {
        server.listen(PORT, () => {
            console.log(`  Static server running on http://localhost:${PORT}`);
            resolve(server);
        });
    });
}

async function prerender() {
    console.log('\n🔍 Prerendering pages for SEO/GEO...\n');

    const server = await startServer();
    const browser = await launch({ headless: true });

    for (const route of ROUTES) {
        const page = await browser.newPage();
        const url = `http://localhost:${PORT}${route}`;

        console.log(`  Rendering: ${route}`);
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });

        // Wait a bit for React to fully render
        await page.waitForFunction(() => document.querySelector('#root')?.innerHTML?.length > 100, { timeout: 10000 });

        const html = await page.content();
        await page.close();

        // Write the prerendered HTML
        const outDir = join(DIST, route === '/' ? '' : route);
        if (route !== '/') {
            mkdirSync(outDir, { recursive: true });
        }
        const outFile = route === '/' ? join(DIST, 'index.html') : join(outDir, 'index.html');
        writeFileSync(outFile, html, 'utf-8');
        console.log(`  ✓ Saved: ${outFile.replace(DIST, 'dist')}`);
    }

    await browser.close();
    server.close();

    console.log(`\n✅ Prerendered ${ROUTES.length} pages successfully!\n`);
}

prerender().catch((err) => {
    console.error('Prerender failed:', err);
    process.exit(1);
});
