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
    name: 'e2e',
    testMatch: /.*customer.*\.spec\.js/,
    dependencies:['setup'],
  },
],
})