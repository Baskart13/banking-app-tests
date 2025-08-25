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
            name:'e2e',
            use: {
                storageState: './storageState.json'
            },
            dependencies:['setup']
        },
    ],
    reporter: [['junit', { outputFile: 'test-results/results.xml' }]],
})