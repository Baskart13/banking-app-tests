// tests/setup/setup.spec.js

const { test } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { AddCustomerPage } = require('../../pages/AddCustomerPage');
const { OpenAccountPage } = require('../../pages/OpenAccountPage');
const path = require('path');
const fs = require('fs');

test('Setup - create customer and open account', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const addCustomerPage = new AddCustomerPage(page);
  const openAccountPage = new OpenAccountPage(page);

  // Login as manager/admin
  await loginPage.goto();
  await loginPage.login();

  // Add customer
  await addCustomerPage.addcustomer('Baskar', 'T', '621212');
  await addCustomerPage.verificationcustomeraddition();

  // Open account
  await openAccountPage.openaccount('Baskar T', 'Rupee');

  // Save storage state for reuse
  const storagePath = path.resolve(__dirname, '../../storageState.json');
  await page.context().storageState({ path: storagePath });
  console.log('Storage state saved at:', storagePath);

  // Save customer data for reuse
  const dataDir = path.resolve(__dirname, '../../data');
  fs.writeFileSync(path.join(dataDir, 'customer.json'), JSON.stringify({
    firstName: 'Baskar',
    lastName: 'T',
    postCode: '621212',
    currency: 'Rupee',
    name: 'Baskar T'
  }, null, 2));
});
