const { test } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { AddCustomerPage } = require('../../pages/AddCustomerPage');
const { OpenAccountPage } = require('../../pages/OpenAccountPage');
const path = require('path');

test('Manager setup - create customer and open account', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const addCustomerPage = new AddCustomerPage(page);
  const openAccountPage = new OpenAccountPage(page);

  //Login
  await loginPage.goto();
  await loginPage.login();
  //Add customer
  await addCustomerPage.addcustomer('Baskar', 'T', '621212');
  await addCustomerPage.verificationcustomeraddition();
  //Open account
  await openAccountPage.openaccount('Baskar T', 'Rupee');
  const fs = require('fs');
  const storageDir = path.resolve(__dirname, '../../');
  const storagePath =  path.join(storageDir, 'storageState.json');
  await page.context().storageState({ path: storagePath });
  console.log('Storage state saved at:', storagePath);
 //Save data for later tests
  const dataDir = path.join(__dirname, '../../data');
  fs.writeFileSync(path.join(dataDir, 'customer.json'), JSON.stringify({
    firstName: 'Baskar',
    lastName: 'T',
    postCode: '621212',
    currency: 'Rupee',
    name: 'Baskar T'
  }, null, 2));
});
