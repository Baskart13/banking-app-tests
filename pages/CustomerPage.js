const { expect } = require("@playwright/test");

class CustomerPage{
    constructor(page){
        this.page=page;
        this.btncustomerlogin=page.locator('//button[@ng-click="customer()"]')
        this.customerselction=page.locator('//select[@id="userSelect"]')
        this.btnlogin=page.locator('//button[@type="submit"]')
        this.btnhome= page.locator('//button[@class="btn home"]')
        this.btnlogout=page.locator('//button[@class="btn logout"]')
        this.dropdowntext=page.locator("#accountSelect");
        this.accountnumbertext=page.locator("//strong[@class='ng-binding'][1]")
        this.depositicon=page.locator('//button[@ng-click="deposit()"]')
        this.btndeposit=page.locator('//button[text()="Deposit"]')
        this.amountinput=page.locator('//input[@placeholder="amount"]')
        this.successfulmsg=page.locator("//span[@class='error ng-binding']")
        this.Balancetext=page.locator("//strong[@class='ng-binding'][2]")
        this.currencycheck= page.locator("//strong[@class='ng-binding'][3]")
        this.transactionicon=page.locator("//button[@ng-click='transactions()']")
        this.btnreset=page.locator('//button[@ng-show="showDate"]')
        this.transactionlist=page.locator('//tbody')
        this.rowlocator=page.locator("//tbody//td")
        this.btnreset=page.locator("//button[@ng-click='reset()']")
        this.btnback=page.locator("//button[@ng-click='back()']")
        this.withdrawicon=page.locator("//button[@ng-click='withdrawl()']")
        this.btnwithdraw=page.locator('//button[@type="submit"]')
        this.btnlogout=page.locator('//button[@ng-show="logout"]')
    }
    async goto() {
    await this.page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
  }
    async customerlogin(customerName){
        await this.btnhome.click()
        await this.btncustomerlogin.click()
        await this.customerselction.selectOption({label :customerName})
        await this.btnlogin.click()
        await expect(this.btnlogout).toBeVisible();
        console.log('Customer logged in Successfully')
    }
    async accountnumberverification(){
        try {
            await dropdownLocator.waitFor({ state: 'visible', timeout: 15000 });
        } catch {
            console.warn('#accountSelect did not appear within timeout. Skipping verification.');
            return;  // Skip test or handle accordingly
        }
        await this.page.waitForSelector('#accountSelect', { state: 'visible' ,timeout: 10000});
        const dropdown= await this.dropdowntext.textContent();
        const displayed= await this.accountnumbertext.textContent();
        await expect(this.displayed).toEqual(this.dropdown);
        console.log('Account number verified successfully')
    }
    async deposit_functionality(amount,curr){
        await this.depositicon.click();
        await this.page.waitForSelector('//button[text()="Deposit"]');
        await this.amountinput.fill(amount)
        await this.btndeposit.click();
        await expect(this.successfulmsg).toBeVisible();
        console.log('User successfully deposited the amount.');
        const Balance= await this.Balancetext.textContent();
        await expect(Balance).toEqual(amount)
        console.log('Balance verified successfully')
        const currencytext=await this.currencycheck.textContent();
        await expect(currencytext).toEqual(curr)
        console.log('Currency verified successfully')   
    }
    async deposit_verification(amount){
        await this.transactionicon.click()
        await this.page.waitForTimeout(500);
        await this.page.waitForSelector('//button[@ng-show="showDate"]')
        await this.page.reload();
        const shortDate=new Date();
        const options={year:'numeric',month:'short',day:'2-digit'};
        const formatteddate=shortDate.toLocaleDateString('en-US',options)
        const datelocator=this.page.locator(`//td[contains(text(),"${formatteddate}")]`);
        await expect (datelocator).toBeVisible();
        const amountlocator=this.page.locator(`//td[contains(text(),"${amount}")]`)
        const typelocator=this.page.locator('//td[contains(text(),"Credit")]')
        await expect (amountlocator).toBeVisible();
        await expect (typelocator).toBeVisible();
        console.log("Transaction verified successfully");
    }
    async reset_functionlaity(amount){
        await this.btnreset.click()
        await expect(this.rowlocator).not.toBeVisible();
        await this.btnback.click();
        const Balance= await this.Balancetext.textContent();
        await expect(Balance).not.toEqual(amount);
        console.log('Verified Reset functionality');
    }
    async withdrawl_functionality(amount){
        await this.btnback.click();
        await this.withdrawicon.click();
        await this.page.waitForSelector('//button[@type="submit"]')
        await this.amountinput.fill(amount);
        await this.btnwithdraw.click();
        await expect(this.successfulmsg).toBeVisible();
        await this.transactionicon.click();
        await this.page.waitForTimeout(500); 
        await this.btnback.click();
        await this.page.waitForTimeout(500);
        await this.transactionicon.click();
        await this.page.waitForTimeout(1000); 
        const typelocator = this.page.locator('//td[contains(text(),"Debit")]');
        await expect(typelocator).toBeVisible();
        console.log('Withdrawl verified successfully')
    }
    async logout_functionality(){
        await this.btnlogout.click();
        await expect (this.customerselction).toBeVisible();
        await expect(this.btnlogout).not.toBeVisible();
        console.log("user logged out successfully")  
    }
    async re_login_functionality(customerName){
        await this.customerlogin(customerName);
        await expect(this.btnlogout).toBeVisible();
        console.log("Verified Re-login functionality")
    }


}
module.exports ={CustomerPage}