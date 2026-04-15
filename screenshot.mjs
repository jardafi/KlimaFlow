import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

const dir = './temporary screenshots';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// Find next available index
const existing = fs.readdirSync(dir).filter(f => f.startsWith('screenshot-'));
const indices = existing.map(f => parseInt(f.match(/screenshot-(\d+)/)?.[1] || '0')).filter(n => !isNaN(n));
const next = indices.length > 0 ? Math.max(...indices) + 1 : 1;

const filename = label ? `screenshot-${next}-${label}.png` : `screenshot-${next}.png`;
const outPath = path.join(dir, filename);

// Try puppeteer via node script
const puppeteerScript = `
import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('${url}', { waitUntil: 'networkidle0', timeout: 30000 });
await page.screenshot({ path: '${outPath}', fullPage: false });
await browser.close();
console.log('Screenshot saved to ${outPath}');
`;

const tmpScript = '/tmp/pup_screenshot.mjs';
fs.writeFileSync(tmpScript, puppeteerScript);

try {
  execSync(`node ${tmpScript}`, { stdio: 'inherit' });
} catch (e) {
  // Fallback: try with system Chrome
  try {
    execSync(`/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --headless --screenshot="${outPath}" --window-size=1440,900 "${url}" 2>/dev/null`, { stdio: 'inherit' });
    console.log(`Screenshot saved to ${outPath}`);
  } catch (e2) {
    console.error('Screenshot failed:', e2.message);
    process.exit(1);
  }
}
