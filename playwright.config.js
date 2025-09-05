import { defineConfig, devices } from '@playwright/test';




export default defineConfig({
  testDir: './tests',
  workers: 1,
  timeout: 30 * 1000,
  retries: 0,

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
      testMatch:/.*setup\.spec.js/,
      use: { ...devices['Desktop Chrome'] }
    },

    {
      name: 'chromium',
      testMatch: /.*customer.*\.spec\.js$/, 
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
    },
    {
      name: 'webkit',
      testMatch: /.*customer.*\.spec\.js$/, 
      use: { ...devices['Desktop Safari'] },
      dependencies: ['setup'],
    }
  ],
  })