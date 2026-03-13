#!/usr/bin/env node
/**
 * Generates og-image.png (1200x630) from the SVG template.
 * Usage: node scripts/generate-og-image.mjs
 */

import { launch } from 'puppeteer';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgPath = join(__dirname, '..', 'public', 'og-image.svg');
const outPath = join(__dirname, '..', 'public', 'og-image.png');

async function generate() {
    const svg = readFileSync(svgPath, 'utf-8');
    const browser = await launch({ headless: true });
    const page = await browser.newPage();

    await page.setViewport({ width: 1200, height: 630 });
    await page.setContent(`
        <html><body style="margin:0;padding:0">
            ${svg}
        </body></html>
    `);

    await page.screenshot({ path: outPath, type: 'png', clip: { x: 0, y: 0, width: 1200, height: 630 } });
    await browser.close();

    console.log(`✅ OG image generated: ${outPath}`);
}

generate().catch(console.error);
