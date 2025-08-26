import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

const baseProjects = [
  {
    name: 'setup',
    testMatch: /.*setup\.spec\.js/,
  },
  {
    testMatch: /.*customer.*\.spec\.js/,
    dependencies: ['setup'],
  },
];

// Add per-browser project config
const browserProjects = isCI
  ? [
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'], browserName: 'chromium' },
      },
      {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'], browserName: 'firefox' },
      },
      {
        name: 'webkit',
        use: { ...devices['Desktop Safari'], browserName: 'webkit' },
      },
    ]
  : [
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'], browserName: 'chromium' },
      },
    ];

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

  // Combine your test logic projects with browser-specific ones
  projects: browserProjects.map((browser) => ({
    ...browser,
    testDir: './tests',
    projects: baseProjects,
  })),
});
