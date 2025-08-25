const{test,expect}= require('@playwright/test');
const path = require('path');
const storageStatePath = path.resolve(__dirname, '../../storageState.json');
const {CustomerPage}=require ('../../pages/CustomerPage');
const {LoginPage} =require ('../../pages/LoginPage');
const customerdata= require('../../data/customer.json');

test.use({ storageState: storageStatePath });

test.describe('Banking-App Customer flow',()=>{
    test ('Login → Deposit → Withdraw → Logout->Re-Login',async({page})=>{
        const loginPage = new LoginPage(page);
        const customerPage = new CustomerPage(page);

        const customername=customerdata.name;
        const depositamount ='200';
        const withdrawlamount= '100';
        const expectedcurrency= customerdata.currency;

        //customer-Login
        await loginPage.goto();
        await customerPage.customerlogin(customername);
        await customerPage.accountnumberverification();
        //Deposit
        await customerPage.deposit_functionality(depositamount,expectedcurrency);
        await customerPage.deposit_verification(depositamount);
        //Withdrawl and validate
        await customerPage.withdrawl_functionality(withdrawlamount);
        //logout and relogin
        await customerPage.logout_functionality();
        await customerPage.re_login_functionality(customername);

    })
})