class OpenAccountPage{
    constructor(page){
        this.page=page;
        this.customerinput=page.locator('//select[@id="userSelect"]')
        this.btnaccount=page.locator('//div[@class="center"]//button[2]')
        this.currencyinput=page.locator('//select[@id="currency"]')
        this.btnprocess=page.locator('//button[@type="submit"]')
    }
    async openaccount(customerName = 'Baskar T', currency = 'Rupee'){
        await this.btnaccount.click()
        await this.customerinput.selectOption({label:customerName})
        console.log(`customer selected,${customerName}`)
        await this.currencyinput.selectOption({label:currency})
        console.log(`currency selected,${currency}`)
        
        this.page.once('dialog',async(dialog)=>{
            console.log('Dialog message is :',dialog.message())
            await dialog.accept()
        })
        await this.btnprocess.click()
        
    }

}
module.exports ={OpenAccountPage};