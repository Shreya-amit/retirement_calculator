import { Then } from "@wdio/cucumber-framework";;
import {expect} from "chai";
import HomePage from "../PageObjects/homePage.js"
import DefaultValuesPage from "../PageObjects/defaultValuesPage.js"
import log from "../helpers/logger.js";


Then(/^I verify calcualtor home page is displayed$/, async function(){
    log.info(`${this.testid} : ${this.testid} : I verify calcualtor home page is displayed`)
   expect(await HomePage.verifyCalculatorHomePage(), `calculator home page is not displayed`).to.be.true;
}) 

Then(/^I verify social benefits section is( not)* displayed$/, async function(falseCase){
    if (falseCase === true) {
        expect(await HomePage.verifySocialBenifitsDisplayed(), `social benefits section is displayed`).to.be.false;
    } else {
        expect(await HomePage.verifySocialBenifitsDisplayed(), `social benefits section is not displayed`).to.be.true;
    }
}) 

Then(/^I verify results section is displayed$/, async function(){
    expect(await HomePage.verifyResultsSectionDisplayed(), `results section is not displayed`).to.be.true;
}) 

Then(/^I verify adjust default values calculator is displayed$/, async function(){
    expect(await DefaultValuesPage.verifyDefaultCalculatorIsDiplayed(), `adjust default values calculator is not displayed`).to.be.true;
}) 

Then(/^I expect to see error message "([^"]*)"$/, async function(text){
    expect(await HomePage.getRequiredFieldMissingMessage(), `text ${text} not displayed`).equals(text)
})

