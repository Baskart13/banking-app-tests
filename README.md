# Banking App - Playwright Test Suite
Automated end-to-end tests for the Banking App using [Playwright].(https://playwright.dev/).
---
## 📁 Project Structure
BANKING-APP-TESTS/
├── .github/workflows/ playwright.yml
├── data/ # customer.json
├── pages/ # Page Object Model files
├── tests/
│ ├── customer/ # E2E customer flow tests
│ └── setup/ # Setup test for adding customer & create account
├── storageState.json # Saved session state
├── playwright.config.js # Playwright config
└── README.md # Project guide

# Prerequisites
- Node.js v16+
- Playwright
# Install Dependencies
```bash
npm install
npx playwright install

# Running tests
#Step1- setup file
npx playwright test tests/setup/setup.spec.js

#Step2 - E2E_customerworkflow
npx playwright test tests/customer/e2e_customer_flow.spec.js
 
#Configs
The storageState.json is created during setup and reused in E2E tests to persist login/session.

#Continious Integration
CI is configured via GitHub Actions in .github/workflows/playwright.yml.

