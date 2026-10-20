import { defineConfig } from '@playwright/test';

const externalURL = process.env.HDC_TEST_URL;
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: process.env.CI ? 4 : 2,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: externalURL || 'http://127.0.0.1:8876',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    reducedMotion: 'reduce',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'webkit', use: { browserName: 'webkit' }, grep: /390px|430px|mobile navigation|interior navigation|Jarallax|Imagery/ },
  ],
  webServer: externalURL ? undefined : {
    command: 'python3 -m http.server 8876 --bind 127.0.0.1',
    url: 'http://127.0.0.1:8876',
    reuseExistingServer: !process.env.CI,
  },
});
