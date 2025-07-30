// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
 
  reporter: 'html',

  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    slowMo: 1000,
    trace: 'on-first-retry',
  },
  workers: 1,


  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    
  ],

 
});

