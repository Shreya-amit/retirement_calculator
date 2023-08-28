import { When } from "@wdio/cucumber-framework";
import {expect} from "chai";
import testData from "../../data/testData.json" assert { type: 'json' };
import HomePage from "../PageObjects/homePage.js"
import DefaultValuesPage from "../PageObjects/defaultValuesPage.js"
import log from "../helpers/logger.js";

When(/^I enter age details(?: with input "([^"]*)"?)?$/, async function(data){
    let sdNamme = 'I enter age details';
    log.info(`${this.testid} : ${sdNamme} :  start`);

    let input = data ? testData[data] :testData.sampleData;

    await HomePage.enterCurrentAge(input.currentAge)
    await HomePage.enterRetirementAge(input.retirementAge)

    log.info(`${this.testid} : ${sdNamme} :  end`);

}) 

When(/^I enter savings details(?: with input "([^"]*)"?)?$/, async function(data){
    const sdNamme = 'I enter savings details';
    log.info(`${this.testid} : ${sdNamme} :  start`);

    let input = data ? testData[data] :testData.sampleData;
   
    await HomePage.enterCurrentAnnualIncome(input.currentAnnualIncome);
    await HomePage.enterSpouseAnnualIncome(input.spouseAnnualIncome);
    await HomePage.enterCurrentRetirementSavings(input.currentRetirementSavings);
    await HomePage.enterCurrentRetirementSavingsRate(input.currentRetirementContribution);
    await HomePage.enterSavingsIncreaseRate(input.savingsIncreaseRate);

    log.info(`${this.testid} : ${sdNamme} :  end`);

}) 


When(/^I (include|exclude) social benefts$/, async function(includeFlag){
    const sdNamme = `I ${includeFlag} social benefts`;
    log.info(`${this.testid} : ${sdNamme} :  start`);

    await HomePage.selectSocialBenefit(includeFlag);

    log.info(`${this.testid} : ${sdNamme} :  end`);
}) 


When(/^I enter social benefits details(?: with input "([^"]*)"?)?$/, async function(data){
    const sdNamme = 'I enter social benefits details';
    log.info(`${this.testid} : ${sdNamme} :  start`);

    let input = data ? testData[data] :testData.sampleData;
   
    await HomePage.selectMaritalStatus(input.relationshipStatus);
    await HomePage.enterSocialSecurityOverride(input.socialSecurityOverride);

    log.info(`${this.testid} : ${sdNamme} :  end`);
}) 

When(/^I submit calculator form$/, async function(){
    const sdNamme = 'I submit calculator form';
    log.info(`${this.testid} : ${sdNamme} :  start`);
    await HomePage.submitCalcualtorForm()
    log.info(`${this.testid} : ${sdNamme} :  end`);
})

When(/^I open adjust default calculator$/, async function(){
    const sdNamme = 'I open adjust default calculator';
    log.info(`${this.testid} : ${sdNamme} :  start`);
    await HomePage.clickAdjustDefaultCalculator()
    log.info(`${this.testid} : ${sdNamme} :  end`);
})

When(/^I enter only required fields in calculator(?: with input "([^"]*)"?)?$/, async function(data){
    const sdNamme = 'I enter only required fields in calculator';
    log.info(`${this.testid} : ${sdNamme} :  start`);

    let input = data ? testData[data] :testData.sampleData;
   
    await HomePage.enterCurrentAge(input.currentAge)
    await HomePage.enterRetirementAge(input.retirementAge)

    await HomePage.enterCurrentAnnualIncome(input.currentAnnualIncome);
    await HomePage.enterCurrentRetirementSavings(input.currentRetirementSavings);
    await HomePage.enterCurrentRetirementSavingsRate(input.currentRetirementContribution);
    await HomePage.enterSavingsIncreaseRate(input.savingsIncreaseRate);

    await HomePage.selectSocialBenefit("include")
    await HomePage.selectMaritalStatus("single")

    log.info(`${this.testid} : ${sdNamme} :  end`);
})

When(/^I open default calculator values form$/, async function(){
    const sdNamme = 'I open default calculator values form';
    log.info(`${this.testid} : ${sdNamme} :  start`);
    await HomePage.clickAdjustDefaultCalculator()
    log.info(`${this.testid} : ${sdNamme} :  end`);
})

When(/^I update default calculator values(?: with input "([^"]*)"?)?$/, async function(data){
    const sdNamme = 'I update default calculator values';
    log.info(`${this.testid} : ${sdNamme} :  start`);

    let input = data ? testData[data] :testData.sampleData;

    await DefaultValuesPage.enterAdditionalIncome(input.additionalIncome)
    await DefaultValuesPage.enterRetirementDuration(input.numberOfYearsRetirementNeedsToLast)

    await DefaultValuesPage.selectIncomeIncreaseWithInflation(input.postRetirementIncomeIncreaseWithInflation)
    if(input.postRetirementIncomeIncreaseWithInflation){
        expect(await DefaultValuesPage.verifyIncomeIncreaseWithInflationDisplayed()).to.be.true
        await DefaultValuesPage.enterIncomeIncreaseInflationRate(input.inflationRate)
    }

    await DefaultValuesPage.enterRetirementAnnualIncome(input.percentOfFinalAnnualIncomeDesired)
    await DefaultValuesPage.enterPreRetirementRoi(input.PreRetirementInvestmentReturn)
    await DefaultValuesPage.enterPostRetirementRoi(input.postRetirementInvestmentReturn)

    await DefaultValuesPage.submitUpdateDefaultValuesForm()

    log.info(`${this.testid} : ${sdNamme} :  end`);

})

When(/^I scroll to page top and clear the calculator form$/, async function(){
    await HomePage.ScrollToPageTop()
})


