import { test, expect } from '@playwright/test';
import { readdirSync, readFileSync } from 'node:fs';

const fresh = '/assets/images/renewal-20261020/';
const routes = readdirSync('.').filter(file => file.endsWith('.html') && readFileSync(file, 'utf8').includes('data-hdc-system="v2"'));

for (const route of routes) {
  test(`Imagery ${route} uses the new collection without broken photographs`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`/${route}`);
    await expect(page.locator('h1')).toBeVisible();
    const images = page.locator('img[src]:not([src=""])');
    await images.evaluateAll(nodes => nodes.forEach(node => { (node as HTMLImageElement).loading = 'eager'; }));
    await expect.poll(() => images.evaluateAll(nodes => nodes.filter(node => {
      const image = node as HTMLImageElement;
      return !image.complete || image.naturalWidth === 0;
    }).map(node => (node as HTMLImageElement).src))).toEqual([]);
    const photography = await images.evaluateAll(nodes => nodes.map(node => ({
      path: new URL((node as HTMLImageElement).currentSrc || (node as HTMLImageElement).src).pathname,
      alt: (node as HTMLImageElement).alt,
    })).filter(image => !image.path.includes('/brand/')));
    expect(photography.length).toBeGreaterThan(0);
    for (const image of photography) {
      expect(image.path).toMatch(/^\/assets\/images\/renewal-20261020\//);
      expect(image.alt).not.toMatch(/\b(bottles?|jars?|cups?|mugs?|tumblers?|drinkware)\b/i);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test('Imagery catalogue detail views all use the new collection', async ({ page }) => {
  await page.goto('/index.html');
  const cards = page.locator('.product-card');
  await expect(cards).toHaveCount(12);
  for (let i = 0; i < 12; i++) {
    await cards.nth(i).click();
    const image = page.locator('#product-image');
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute('src', new RegExp(`^${fresh}`));
    await expect.poll(() => image.evaluate(node => (node as HTMLImageElement).complete && (node as HTMLImageElement).naturalWidth > 0)).toBe(true);
    await page.keyboard.press('Escape');
    await expect(page.locator('#product-dialog')).not.toBeVisible();
  }
});

for (const width of [390, 430]) {
  test(`Imagery ${width}px phone uses the portrait hero without downloading the desktop hero`, async ({ browser }, testInfo) => {
    const context = await browser.newContext({ viewport: { width, height: 932 }, deviceScaleFactor: 3, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const desktopRequests: string[] = [];
    page.on('request', request => { if (new URL(request.url()).pathname === `${fresh}hero.webp`) desktopRequests.push(request.url()); });
    await page.goto(`${testInfo.project.use.baseURL || 'http://127.0.0.1:8876'}/index.html`);
    const image = page.locator('#home .hero-image img');
    await expect.poll(() => image.evaluate(node => (node as HTMLImageElement).currentSrc)).toContain('hero-mobile.webp');
    await expect.poll(() => image.evaluate(node => (node as HTMLImageElement).complete && (node as HTMLImageElement).naturalWidth > 0)).toBe(true);
    expect(desktopRequests).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (width === 430) await page.screenshot({ path: testInfo.outputPath('imagery-home-phone.png') });
    await context.close();
  });
}
