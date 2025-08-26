import { defineConfig, devices } from '@playwright/test';




export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 1,

  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    storageState: './storageState.json',
  },
  projects:[
    {
      name:'setup',
      tetsMatch:/.*setup\.spec.js/,
    },

      { testMatch: /.*customer.*\.spec\.js/,
        dependencies: ['setup'],
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], browserName: 'chromium' },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], browserName: 'webkit' },
    },
  ],
  })