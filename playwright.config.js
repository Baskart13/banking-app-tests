import { defineConfig } from "@playwright/test";

export default defineConfig({

    testDir: './tests',
    timeout: 30 * 1000,
    use:{
        headless: true,
        screenshot:"only-on-failure",
        video: 'retain-on-failure',
        trace:"on-first-retry",
        retries: 1,
        storageState: './storageState.json',
    },    
    projects: [
    {
      name: 'setup',
      testMatch: /.*setup\.spec\.js/,
    },
  {
    name: 'chromium',
    testMatch: /.*customer.*\.spec\.js/,
    dependencies: ['setup'],
    use: { browserName: 'chromium' },
  },
  {
    name: 'firefox',
    testMatch: /.*customer.*\.spec\.js/,
    dependencies: ['setup'],
    use: { browserName: 'firefox' },
  },
  {
    name: 'webkit',
    testMatch: /.*customer.*\.spec\.js/,
    dependencies: ['setup'],
    use: { browserName: 'webkit' },
  },

],
})