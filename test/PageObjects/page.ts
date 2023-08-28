import chai from "chai"

export default class Page {
    constructor(){

    }

    /**All reusable web functions */

    async navigateTo (path: string){
        await browser.url(path)
        await browser.maximizeWindow()
        this.waitForPageReadyState()
    }

    async waitForPageReadyState(){
        await browser.waitUntil(async () => {
            return (await browser.execute(() => document.readyState)) === 'complete';
        },{
            timeout: 40000,
            timeoutMsg: 'Page did not finish loading within the specified timeout'
        });
    }

    async ScrollToPageTop(){
          // Scroll to the top of the page
    await browser.execute(() => {
        // Scroll to the top of the page
        window.scrollTo(0, 0);
    });
    }

    async clickElement(ele: WebdriverIO.Element){
        await ele.waitForClickable({timeout: 5000})
        if(!ele.elementId){
            throw Error(ele.error.message)
        }
        await ele.click()
    }

    async setInput(method:string, ele: WebdriverIO.Element, text: string){
        await ele.waitForDisplayed({timeout: 5000})
        if(!ele.elementId){
            throw Error(ele.error.message)
        }

        await this.clickElement(ele)
        let command= method === "add"? 'addValue':'setValue'
        await ele[command](text)
    }

    async getAttribute(ele: WebdriverIO.Element, attribute: string){
        await ele.waitForDisplayed({timeout: 5000})
        return await ele.getAttribute(attribute);
    }

    async getText(ele: WebdriverIO.Element){
        await ele.waitForDisplayed({timeout: 5000})
        return ele.getText();
    }

    async verifyIsElementDisplayed(ele: WebdriverIO.Element){
        let isElementDisplayed = false;
        try{
            isElementDisplayed = await ele.isDisplayed();
            return isElementDisplayed
        }catch(err){
            return isElementDisplayed
        }
        
    }

    async verifyIsElementExisting(ele: WebdriverIO.Element){
        return await ele.isExisting();
    }

    async waitForElementToDisplay(ele: WebdriverIO.Element,  waitTime: number){
        return await ele.waitForDisplayed({timeout: waitTime});
    }

    async waitForElementToPresent(ele: WebdriverIO.Element, waitTime: number){
        await ele.waitForExist({timeout: waitTime});
    }

    async wait(miliSeconds: number){
        await browser.pause(miliSeconds);
    }
}