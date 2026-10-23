import { test, expect } from '@playwright/test';
import { readdirSync, readFileSync } from 'node:fs';

const routes = readdirSync('.').filter(file => file.endsWith('.html') && readFileSync(file, 'utf8').includes('data-hdc-system="v2"'));

for (const width of [320, 390, 430, 768, 900, 1440]) {
  for (const route of routes) {
    test(`${route} fits and stays readable at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/${route}`);
      await page.locator('.site-header').waitFor();
      await page.evaluate(() => document.fonts.ready);
      if (route === 'index.html') await expect(page.locator('.product-card')).toHaveCount(12);

      const result = await page.evaluate(() => {
        const body = getComputedStyle(document.body);
        const visible = (el: Element) => {
          const r = el.getBoundingClientRect();
          const s = getComputedStyle(el);
          return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none';
        };
        const small = [...document.querySelectorAll('button, a.button, a.nav-cta, input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), select, textarea')]
          .filter(visible)
          .filter(el => el.getBoundingClientRect().height < 47.5)
          .map(el => `${el.tagName}.${el.className}: ${el.getBoundingClientRect().height}`);
        return {
          viewport: document.documentElement.clientWidth,
          pageWidth: document.documentElement.scrollWidth,
          fontSize: parseFloat(body.fontSize),
          fontLoaded: document.fonts.check('16px "HDC Sans"'),
          small,
        };
      });
      expect(result.pageWidth, JSON.stringify(result)).toBeLessThanOrEqual(result.viewport + 1);
      expect(result.fontSize).toBeGreaterThanOrEqual(16);
      expect(result.fontLoaded).toBe(true);
      expect(result.small).toEqual([]);
    });
  }
}

for (const width of [390, 1440]) {
  for (const route of ['index.html', 'services.html', 'surface-lab.html', 'request-a-quote.html']) {
    test(`${route} supports 200% text at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(`/${route}`);
      await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
      await page.evaluate(() => document.fonts.ready);
      const layout = await page.evaluate(() => {
        const header = document.querySelector('.site-header')!.getBoundingClientRect();
        const quote = document.querySelector('.header-quote')?.getBoundingClientRect();
        const offenders = [...document.querySelectorAll('body *')].filter(el => {
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.left >= 0 && rect.right > document.documentElement.clientWidth + 1;
        }).slice(0, 12).map(el => ({ class: el.className, tag: el.tagName, text: el.textContent?.slice(0, 35), width: el.getBoundingClientRect().width, left: el.getBoundingClientRect().left, wrap: getComputedStyle(el).overflowWrap }));
        return { width: document.documentElement.scrollWidth, viewport: document.documentElement.clientWidth, headerBottom: header.bottom, quoteBottom: quote?.bottom, offenders };
      });
      expect(layout.width, JSON.stringify(layout)).toBeLessThanOrEqual(layout.viewport + 1);
      if (layout.quoteBottom) expect(layout.quoteBottom).toBeLessThanOrEqual(layout.headerBottom + 1);
    });
  }
}

test('mobile navigation, catalogue search, product dialog and finishing tabs remain usable', async ({ page }) => {
  await page.setViewportSize({ width: 430, height: 932 });
  await page.goto('/');
  await expect(page.locator('.product-card')).toHaveCount(12);
  await page.locator('.menu-toggle').click();
  await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#main-nav')).toBeVisible();
  await page.locator('.menu-toggle').click();
  await page.locator('#product-search').fill('certificate');
  await expect(page.locator('.product-card')).toHaveCount(1);
  await page.locator('.product-card-trigger').click();
  await expect(page.locator('#product-dialog')).toBeVisible();
  await page.locator('#product-dialog .dialog-close').click();
  await expect(page.locator('#product-dialog')).not.toBeVisible();
  await page.locator('#product-search').fill('');
  await expect(page.locator('.product-card')).toHaveCount(12);
  await page.locator('[data-finish="foil"]').click();
  await expect(page.locator('[data-finish="foil"]')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#finish-detail h3')).toHaveText('Foil');
});

test('interior navigation, form sizing, keyboard focus and reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/request-a-quote.html');
  await page.locator('.menu-button').click();
  await expect(page.locator('.menu-button')).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('.site-nav')).toBeVisible();
  await page.locator('.menu-button').click();
  const input = page.locator('main input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"])').first();
  await input.focus();
  expect(await input.evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(16);
  expect(await input.evaluate(el => getComputedStyle(el).outlineStyle)).not.toBe('none');
  expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);
  expect(await page.locator('.button').first().evaluate(el => getComputedStyle(el).transitionDuration)).toBe('0s');
});


// HDC-HOME-CHANGE-01: header CTA removal must not affect the quote route;
// the headline is visually bottom-aligned while hero actions remain separate.
for (const width of [320, 375, 390, 430, 768, 900, 1440]) {
  test(`HDC-HOME-CHANGE-01 homepage geometry at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('header.site-header .header-quote')).toHaveCount(0);
    await expect(page.locator('#home .hero-actions a')).toHaveCount(2);

    const boxes = await page.evaluate(() => {
      const hero = document.querySelector('#home')!.getBoundingClientRect();
      const heading = document.querySelector('#home .hero-copy h1')!.getBoundingClientRect();
      const actions = document.querySelector('#home .hero-actions')!.getBoundingClientRect();
      const menu = document.querySelector('header.site-header .menu-toggle')!.getBoundingClientRect();
      return {
        heroBottom: hero.bottom,
        heroTop: hero.top,
        heroHeight: hero.height,
        headingTop: heading.top,
        headingBottom: heading.bottom,
        actionsBottom: actions.bottom,
        menuRight: menu.right,
        viewport: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      };
    });
    expect(boxes.heroBottom - boxes.headingBottom, JSON.stringify(boxes)).toBeGreaterThanOrEqual(-1);
    expect(boxes.heroBottom - boxes.headingBottom, JSON.stringify(boxes)).toBeLessThan(145);
    expect(boxes.headingTop, JSON.stringify(boxes)).toBeGreaterThan(boxes.heroTop + boxes.heroHeight * 0.32);
    expect(boxes.actionsBottom, JSON.stringify(boxes)).toBeLessThan(boxes.headingTop - 8);
    expect(boxes.scrollWidth, JSON.stringify(boxes)).toBeLessThanOrEqual(boxes.viewport + 1);
    if (width <= 900) expect(boxes.menuRight).toBeLessThanOrEqual(boxes.viewport + 1);
  });
}

test('HDC-HOME-CHANGE-01 quote route and sticky mobile header survive', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('header.site-header .header-quote')).toHaveCount(0);
  await page.locator('.menu-toggle').click();
  await expect(page.locator('#main-nav')).toBeVisible();
  await page.locator('.menu-toggle').click();
  await page.evaluate(() => window.scrollTo(0, 560));
  const top = await page.locator('header.site-header').evaluate(el => el.getBoundingClientRect().top);
  expect(Math.abs(top)).toBeLessThanOrEqual(1);
  const quoteResponse = await page.request.get('/request-a-quote.html');
  expect(quoteResponse.status()).toBe(200);
});
