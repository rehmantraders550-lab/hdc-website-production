import { test, expect } from '@playwright/test';

test('campaign selector changes its recommendation, catalogue family and brief context', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const section = page.locator('[data-campaign-match]');
  await expect(section).toBeVisible();
  await section.getByRole('button', { name: /Brand a place/ }).click();
  await expect(section.locator('[data-campaign-result-title]')).toHaveText('Large-format print for a place');
  await section.getByRole('link', { name: /Explore related products/ }).click();
  await expect(page.locator('#family-filters .filter-chip[aria-pressed="true"]')).toHaveText('Large Format & Brand Environments');
  await section.getByRole('button', { name: /Build this brief/ }).click();
  await expect(page.locator('#brief-dialog')).toBeVisible();
  await expect(page.locator('#brief-product')).toHaveValue('Large format and brand environments');
  await expect(page.locator('#brief-form textarea[name="details"]')).toHaveValue('Campaign goal: Brand a place');
});

test('campaign selector fits narrow viewport and exposes touch choices', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto('/');
  const section = page.locator('[data-campaign-match]');
  const layout = await section.evaluate(el => ({
    scrollWidth: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth,
    buttonHeights: [...el.querySelectorAll('[data-sms-entry]')].map(button => button.getBoundingClientRect().height)
  }));
  expect(layout.scrollWidth).toBeLessThanOrEqual(layout.viewport + 1);
  expect(layout.buttonHeights.every(height => height >= 48)).toBe(true);
  await section.getByRole('button', { name: /Shape a customer experience/ }).click();
  await expect(section.locator('[data-campaign-result-title]')).toHaveText('Packaging and printed details');
});
