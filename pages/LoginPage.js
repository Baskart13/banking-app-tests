const {expect} = require ('@playwright/test')
class LoginPage{

    constructor(page){

        this.page=page;
        this.managerlogin=page.locator("//button[text()='Bank Manager Login']")
        this.managerloginverification=page.locator("//button[contains(text() ,'Add Customer')]")
    }

    async goto (){
        await this.page.goto("https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login")
    }

    async login(){
        await this.managerlogin.click()
    }
    async verifylogin(){
        await expect (this.managerloginverification).toBeVisible()
        console.log('Manager logged in Successfully')
    }

}
module.exports = { LoginPage }