import { test, expect, type Page } from '@playwright/test';
import { readdirSync, readFileSync } from 'node:fs';

const routes = readdirSync('.').filter(file => file.endsWith('.html') && readFileSync(file, 'utf8').includes('data-hdc-system="v2"')).map(file => `/${file}`);
const lifecycleRoutes = ['/index.html', '/surface-lab.html', '/finishing-embellishment.html', '/about.html', '/glass-surface-decoration.html', '/production.html'];

for (const width of [1024, 1440]) {
  test(`Jarallax production hero keeps the heading words intact at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/production.html');
    await page.evaluate(() => document.fonts.ready);
    const lineCount = await page.locator('h1').evaluate(heading => {
      const range = document.createRange();
      range.setStart(heading.firstChild!, 0);
      range.setEnd(heading.firstChild!, 'Production'.length);
      return range.getClientRects().length;
    });
    expect(lineCount).toBe(1);
  });
}

async function assertStatic(page: Page) {
  const frame = page.locator('[data-hdc-parallax]');
  await expect(frame).toHaveCount(1);
  await expect(frame.locator(':scope > img, :scope > picture > img')).toHaveCount(1);
  await expect(frame.locator('img')).toBeVisible();
  await expect(frame.locator('.hdc-parallax-layer')).toHaveCount(0);
  await expect(frame).not.toHaveAttribute('data-hdc-parallax-active');
  expect(await frame.locator('img').evaluate(img => getComputedStyle(img).transform)).toBe('none');
  await expect(page.locator('h1')).toBeVisible();
}

for (const route of routes) {
  test(`Jarallax ${route} gives the desktop hero depth without moving its copy or changing layout`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(route);
    const frame = page.locator('[data-hdc-parallax]');
    await assertStatic(page);
    if (route === '/index.html') await expect(page.locator('.product-card')).toHaveCount(12);
    await page.evaluate(() => document.fonts.ready);

    const measure = () => page.evaluate(() => {
      const frame = document.querySelector('[data-hdc-parallax]')!;
      const image = frame.querySelector('img')!.getBoundingClientRect();
      const heading = document.querySelector('h1')!.getBoundingClientRect();
      const box = frame.getBoundingClientRect();
      return {
        imageTop: image.top,
        imageBottom: image.bottom,
        imageLeft: image.left,
        imageRight: image.right,
        headingTop: heading.top + scrollY,
        frameTop: box.top + scrollY,
        frameHeight: box.height,
        imageFit: getComputedStyle(frame.querySelector('img')!).objectFit,
        visibleTop: Math.max(0, box.top),
        visibleBottom: Math.min(innerHeight, box.bottom),
        frameLeft: box.left,
        frameRight: box.right,
        documentHeight: document.documentElement.scrollHeight,
        width: document.documentElement.scrollWidth,
        viewport: document.documentElement.clientWidth,
      };
    });
    const baseline = await measure();
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await expect(frame).toHaveAttribute('data-hdc-parallax-active', '');
    await expect(frame.locator('img')).toHaveCount(1);
    await expect(frame.locator('.hdc-parallax-layer img')).toBeVisible();
    const before = await measure();
    expect(before.frameHeight).toBeCloseTo(baseline.frameHeight, 0);
    expect(before.frameTop).toBeCloseTo(baseline.frameTop, 0);
    expect(before.headingTop).toBeCloseTo(baseline.headingTop, 0);
    expect(before.documentHeight).toBe(baseline.documentHeight);
    expect(before.imageFit).toBe(baseline.imageFit);
    const caption = page.locator('.page-hero__media figcaption');
    if (await caption.count()) {
      const captionBox = await caption.boundingBox();
      const frameBox = await frame.boundingBox();
      expect(captionBox!.y).toBeGreaterThanOrEqual(frameBox!.y + frameBox!.height - 1);
    }
    await page.evaluate(() => scrollTo({ top: 280, behavior: 'instant' }));
    await expect.poll(async () => (await measure()).imageTop).toBeLessThan(before.imageTop - 20);
    const after = await measure();
    const relativeDrift = after.imageTop - before.imageTop + 280;
    expect(relativeDrift).toBeGreaterThan(10);
    expect(relativeDrift).toBeLessThan(70);
    expect(after.headingTop).toBeCloseTo(before.headingTop, 0);
    expect(after.frameTop).toBeCloseTo(before.frameTop, 0);
    expect(after.frameHeight).toBeCloseTo(before.frameHeight, 0);
    expect(after.documentHeight).toBe(before.documentHeight);
    expect(after.width).toBeLessThanOrEqual(after.viewport + 1);
    expect(after.imageTop).toBeLessThanOrEqual(after.visibleTop + 1);
    expect(after.imageBottom).toBeGreaterThanOrEqual(after.visibleBottom - 1);
    expect(after.imageLeft).toBeLessThanOrEqual(after.frameLeft + 1);
    expect(after.imageRight).toBeGreaterThanOrEqual(after.frameRight - 1);
  });
}

for (const route of routes) {
  test(`Jarallax ${route} enables on phone and tablet layouts, while preserving the compact fallback`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    const coreRequests: string[] = [];
    page.on('request', request => { if (request.url().includes('/vendor/jarallax/')) coreRequests.push(request.url()); });
    await page.setViewportSize({ width: 320, height: 932 });
    await page.goto(route);
    await assertStatic(page);
    for (const width of [390, 430, 900]) {
      await page.setViewportSize({ width, height: 932 });
      const frame = page.locator('[data-hdc-parallax]');
      await expect(frame).toHaveAttribute('data-hdc-parallax-active', '');
      await expect(frame.locator('.hdc-parallax-layer img')).toBeVisible();
      const layout = await page.evaluate(() => ({ page: document.documentElement.scrollWidth, viewport: document.documentElement.clientWidth }));
      expect(layout.page).toBeLessThanOrEqual(layout.viewport + 1);
    }
    expect(coreRequests.length).toBeGreaterThan(0);
  });
}

test('Jarallax keeps the mobile hero art direction while active and across breakpoint changes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/index.html');
  const frame = page.locator('[data-hdc-parallax]');
  const image = frame.locator('img');
  await expect(frame).toHaveAttribute('data-hdc-parallax-active', '');
  await expect.poll(() => image.evaluate(img => new URL(img.currentSrc).pathname)).toContain('hero-mobile.webp');

  const before = await image.boundingBox();
  await page.evaluate(() => scrollTo({ top: 300, behavior: 'instant' }));
  await expect.poll(async () => (await image.boundingBox())!.y).toBeLessThan(before!.y - 20);

  await page.setViewportSize({ width: 1024, height: 844 });
  await expect(frame).toHaveAttribute('data-hdc-parallax-active', '');
  await expect.poll(() => image.evaluate(img => new URL(img.currentSrc).pathname)).toContain('hero.webp');

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(frame).toHaveAttribute('data-hdc-parallax-active', '');
  await expect.poll(() => image.evaluate(img => new URL(img.currentSrc).pathname)).toContain('hero-mobile.webp');
});

test('homepage section depth reaches every visual section without moving copy or layout', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/index.html');
  await expect(page.locator('html')).toHaveClass(/hdc-section-depth-enabled/);

  const sectionTargets = [
    ['#services [data-hdc-depth]', 4],
    ['[data-campaign-match] [data-hdc-depth]', 4],
    ['#products [data-hdc-depth="catalogue"]', 12],
    ['#surfaces [data-hdc-depth]', 7],
    ['#finishing [data-hdc-depth]', 1],
    ['#process [data-hdc-depth]', 5],
    ['#about [data-hdc-depth]', 2],
    ['.closing-cta [data-hdc-depth]', 1],
  ];
  for (const [selector, count] of sectionTargets) {
    await expect(page.locator(selector)).toHaveCount(count as number);
  }

  const image = page.locator('#services .service-visual img').first();
  const heading = page.locator('#services h2');
  await image.scrollIntoViewIfNeeded();
  await expect(image).toHaveAttribute('data-hdc-depth-active', '');
  const beforeOffset = await image.evaluate(el => Number.parseFloat(el.style.getPropertyValue('--hdc-depth-y')) || 0);
  const beforeHeading = await heading.boundingBox();
  const beforeScroll = await page.evaluate(() => scrollY);

  await page.evaluate(() => scrollBy({ top: 140, behavior: 'instant' }));
  await expect.poll(async () => {
    const value = await image.evaluate(el => Number.parseFloat(el.style.getPropertyValue('--hdc-depth-y')) || 0);
    return Math.abs(value - beforeOffset);
  }).toBeGreaterThan(3);

  const afterHeading = await heading.boundingBox();
  const afterScroll = await page.evaluate(() => scrollY);
  expect(afterHeading!.y + afterScroll).toBeCloseTo(beforeHeading!.y + beforeScroll, 0);
  const layout = await page.evaluate(() => ({ page: document.documentElement.scrollWidth, viewport: document.documentElement.clientWidth }));
  expect(layout.page).toBeLessThanOrEqual(layout.viewport + 1);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('html')).not.toHaveClass(/hdc-section-depth-enabled/);
  await expect(image).not.toHaveAttribute('data-hdc-depth-active');
  expect(await image.evaluate(el => el.style.getPropertyValue('--hdc-depth-y'))).toBe('');
});

for (const route of lifecycleRoutes) {
  test(`Jarallax ${route} respects reduced motion at startup and restores the original image when preferences or width change`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(route);
    await assertStatic(page);
    expect(await page.locator('script[src*="/vendor/jarallax/"]').count()).toBe(0);
    const original = await page.locator('[data-hdc-parallax] img').getAttribute('src');
    await page.evaluate(() => document.fonts.ready);
    const initialBox = await page.locator('[data-hdc-parallax]').boundingBox();
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await expect(page.locator('[data-hdc-parallax]')).toHaveAttribute('data-hdc-parallax-active', '');
    const activeBox = await page.locator('[data-hdc-parallax]').boundingBox();
    expect(activeBox!.height).toBeCloseTo(initialBox!.height, 0);
    expect(activeBox!.y).toBeCloseTo(initialBox!.y, 0);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await assertStatic(page);
    await expect(page.locator('[data-hdc-parallax] img')).toHaveAttribute('src', original!);
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await expect(page.locator('[data-hdc-parallax]')).toHaveAttribute('data-hdc-parallax-active', '');
    await page.setViewportSize({ width: 320, height: 932 });
    await assertStatic(page);
    await page.setViewportSize({ width: 1440, height: 1000 });
    await expect(page.locator('[data-hdc-parallax]')).toHaveAttribute('data-hdc-parallax-active', '');
    await page.emulateMedia({ reducedMotion: 'reduce' });
  });
}

test('Jarallax supports touch devices and keeps data-saving connections static', async ({ browser, baseURL }) => {
  const touch = await browser.newContext({ baseURL, viewport: { width: 402, height: 874 }, hasTouch: true, isMobile: true, reducedMotion: 'no-preference' });
  const touchPage = await touch.newPage();
  await touchPage.goto('/index.html');
  await expect(touchPage.locator('[data-hdc-parallax]')).toHaveAttribute('data-hdc-parallax-active', '');
  await expect(touchPage.locator('[data-hdc-parallax] .hdc-parallax-layer img')).toBeVisible();
  await touch.close();

  const saveData = await browser.newContext({ baseURL, viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
  await saveData.addInitScript(() => Object.defineProperty(navigator, 'connection', { value: { saveData: true }, configurable: true }));
  const savingPage = await saveData.newPage();
  for (const route of routes) {
    await savingPage.goto(route);
    await assertStatic(savingPage);
    expect(await savingPage.locator('script[src*="/vendor/jarallax/"]').count()).toBe(0);
  }
  await saveData.close();
});

test('Jarallax core failure preserves the static hero and working product controls', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.route('**/assets/vendor/jarallax/**', route => route.abort());
  for (const route of routes) {
    await page.goto(route);
    await assertStatic(page);
  }
  await page.goto('/index.html');
  await expect(page.locator('.product-card')).toHaveCount(12);
  await page.locator('#product-search').fill('certificate');
  await expect(page.locator('.product-card')).toHaveCount(1);
  await page.locator('.product-card-trigger').click();
  await expect(page.locator('#product-dialog')).toBeVisible();
});

test('Jarallax enhancement is optional when JavaScript is disabled', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false, viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator('[data-hdc-parallax] img')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.hdc-parallax-layer')).toHaveCount(0);
  }
  await context.close();
});
