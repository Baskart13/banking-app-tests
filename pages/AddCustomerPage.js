const {expect} = require ('@playwright/test')
class AddCustomerPage{
    constructor (page){
        this.page=page;
        this.firstnameinput=page.locator('//input[@placeholder="First Name"]');
        this.lastnameinput=page.locator('//input[@placeholder="Last Name"]');
        this.postcodeinput=page.locator('//input[@placeholder="Post Code"]');
        this.btnaddcustomer=page.locator("//button[@type='submit']")
        this.btnaddcustomermain=page.locator('//button[@ng-class="btnClass1"]')
        this.btncustomers=page.locator('//div[@class="center"]//button[3]')
        this.addedcustomer=page.locator('(//tr[@class="ng-scope"])[last()]')
        this.searchfield=page.locator('//input[@ng-model="searchCustomer"]')
        this.searchresult=page.locator('//tr[@class="ng-scope"]/td[1]')
    }
    async addcustomer(firstname,lastname,postcode){
        await this.btnaddcustomermain.click();
        await this.firstnameinput.fill(firstname);
        await this.lastnameinput.fill(lastname);
        await this.postcodeinput.fill(postcode);     
        this.page.once('dialog',async(dialog)=>{
            console.log('popup message:',dialog.message())
            await dialog.accept()
        })
        await this.btnaddcustomer.click()
    } 
    async verificationcustomeraddition(){
        await this.btncustomers.click()
        await this.addedcustomer.scrollIntoViewIfNeeded();
        await expect(this.addedcustomer).toBeVisible();
        console.log("Customer Verified Successfully")
    }

    async searchcustomer(username){
        await this.searchfield.fill(username)
        await expect (this.searchresult).toHaveText(username)
    }

    
        
}
module.exports ={AddCustomerPage}