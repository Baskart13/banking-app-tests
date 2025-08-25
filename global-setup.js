const { LoginPage } = require('./pages/LoginPage');
const { AddCustomerPage } = require('./pages/AddCustomerPage');
const { OpenAccountPage } = require('./pages/OpenAccountPage');
const path = require('path');
const { chromium, expect } = require('@playwright/test');

module.exports = async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

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
  const storagePath = path.resolve(__dirname, 'storageState.json');
  await page.context().storageState({ path: storagePath });
  console.log('Storage state saved at:', storagePath);
 //Save data for later tests
  const dataDir = path.resolve(__dirname, 'data');
  fs.writeFileSync(path.join(dataDir, 'customer.json'), JSON.stringify({
    firstName: 'Baskar',
    lastName: 'T',
    postCode: '621212',
    currency: 'Rupee',
    name: 'Baskar T'
  }, null, 2));
  await browser.close();  
};
