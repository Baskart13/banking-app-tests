import { defineConfig } from "@playwright/test";

export default defineConfig({

    testDir: './tests',
    timeout: 30 * 1000,
    use:{
        headless: true,
        screenshot:"only-on-failure",
        trace:"on-first-retry",
    },
    projects:[
        {
            name:'setup',
            testMatch:/.*setup\.spec.js/,
        },
        {
            name:'customer-tests',
            testMatch: /.*customer.*\.spec\.js/,
            dependencies:['setup']
        },
    ],
})