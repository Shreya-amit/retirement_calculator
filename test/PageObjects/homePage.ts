import Page from "./page.js";
import chai from "chai";
import log from "../helpers/logger.js";
// TO DO import reporter

class HomePage extends Page {
  constructor() {
    super()
  }

  /**Page Objects */

  //textboxes
  get currentAgeTextBox() {return $(`#current-age`)}
  get retirementAgeTextBox() {return $(`#retirement-age`)}
  get currentIncomeTextBox() {return $(`#current-income`)}
  get spouseIncomeTextBox() {return $(`#spouse-income`)}
  get currentTotalSavingsTextBox() {return $(`#current-total-savings`)}
  get currentAnnualSavingsTextBox() {return $(`#current-annual-savings`)}
  get savingsIncreaseRateTextBox() {return $(`#savings-increase-rate`)}
  get socialSecurityOverrideTextBox() {return $(`#social-security-override`)}

  //buttons
  get socialBenefitsYes() {return $(`//*[@id = 'yes-social-benefits']/following-sibling::label[contains(.,'Yes')]`)}
  get socialBenefitsNo() {return $(`//*[@id = 'no-social-benefits']/following-sibling::label[contains(.,'No')]`)}
  get adjustDefaultValues() {return $(`//a[.='Adjust default values']`)}
  get calcualteBtn() {return $(`//button[contains(., 'Calculate')]`)}
  get clearForm() {return $(`//button[contains(., 'Clear Form')]`)}
  get maritalStatusSingleBtn() {return $(`//*[@id = 'single']/following-sibling::label[contains(.,'Single')]`)}
  get singleStatusVerify() {return $(`#single`)}
  get maritalStatusMarriedBtn() {return $(`//*[@id = 'married']/following-sibling::label[contains(.,'Married')]`)}
  get marriedStatusVerify() {return $(`#married`)}



  //img
  get pageTitleImage() {return $(`.dsg-nav-logo`)}

  //text, area
  get calculatorResultsContainer() {return $(`#calculator-results-container`)}
  get maritalStatusLabel() {return $(`#marital-status-label`)}
  get requiredFieldMissingMessageEle() {return $(`#calculator-input-alert-desc`)}
  get calculatorIntroSection() {return $(`#calculator-intro-section`)}


  /**Page Actions */

  // Age Deatils
  async enterCurrentAge(currentAge: string){
    if(!currentAge) throw Error(`Given currentAge ${currentAge} is not valid`)
    await this.wait(2000);
    await this.setInput('set', await this.currentAgeTextBox, currentAge)
    log.debug(`current Age is entered : ${currentAge}`)
  }

  async enterRetirementAge(retirementAge: string){
    if(!retirementAge) throw Error(`Given retirement age ${retirementAge} is not valid`)
    await this.setInput('set', await this.retirementAgeTextBox, retirementAge)
    log.debug(`retirement Age is entered : ${retirementAge}`)
  }

  // Savings Deatils
  async enterCurrentAnnualIncome(currentIncome: string){
    if(!currentIncome) throw Error(`Given currentIncome ${currentIncome} is not valid`)
    await this.setInput('set', await this.currentIncomeTextBox, currentIncome)
    log.debug(`annual income is entered : ${currentIncome}`)
  }

  async enterSpouseAnnualIncome(spouseAnnualIncome: string){
    await this.setInput('set', await this.spouseIncomeTextBox, spouseAnnualIncome)
    log.debug(`spouse income is entered : ${spouseAnnualIncome}`)
  }

  async enterCurrentRetirementSavings(currentRetirementSavings: string){
    if(!currentRetirementSavings) throw Error(`Given current Retirement Savings ${currentRetirementSavings} is not valid`)
    await this.setInput('set', await this.currentTotalSavingsTextBox, currentRetirementSavings)
    log.debug(`current Retirement Savings is entered : ${currentRetirementSavings}`)
  }

  async enterCurrentRetirementSavingsRate(currentRetirementContribution: string){
    if(!currentRetirementContribution) throw Error(`Given current Retirement Contribution % ${currentRetirementContribution} is not valid`)
    await this.setInput('set', await this.currentAnnualSavingsTextBox, currentRetirementContribution)
    log.debug(`current Retirement Contribution % is entered : ${currentRetirementContribution}`)
  }

  async enterSavingsIncreaseRate(savingsIncreaseRate: string){
    if(!savingsIncreaseRate) throw Error(`Given savings Increase Rate % ${savingsIncreaseRate} is not valid`)
    await this.setInput('set', await this.savingsIncreaseRateTextBox, savingsIncreaseRate)
    log.debug(`savings Increase Rate is entered : ${savingsIncreaseRate}`)
  }

  // Social Benefits Selection
  async selectSocialBenefit(includeFlag: string){
    if(!includeFlag) throw Error(`Social Benefit selection flag ${includeFlag} is not provided`)
    if(includeFlag === 'include'){
      await this.clickElement(await this.socialBenefitsYes)
      log.debug(`social benefit is selected`)
    } 
    else{
      await this.clickElement(await this.socialBenefitsNo)
      log.debug(`social benefit is disabled`)
    }
  }

  //Verify social benifits are displayed
  async verifySocialBenifitsDisplayed(){
    return await this.verifyIsElementDisplayed(await this.maritalStatusLabel)
  }

  //  Social Benefits Details
  async selectMaritalStatus(relationshipStatus: string){
    if(!relationshipStatus) throw Error(`relationshipStatus ${relationshipStatus} is not provided`)
    
    if(relationshipStatus.toLowerCase() === 'single'){
      await this.waitForElementToPresent(await this.maritalStatusSingleBtn, 3000);
      await this.clickElement(await this.maritalStatusSingleBtn)
    }
    else{
      await this.waitForElementToPresent(await this.maritalStatusMarriedBtn, 3000);
      await this.clickElement(await this.maritalStatusMarriedBtn)
    }


      log.debug(`marital status ${relationshipStatus} is selected`)
  }

  async enterSocialSecurityOverride(socialSecurityOverride: string){
    if(!socialSecurityOverride) throw Error(`Given socialSecurityOverride ${socialSecurityOverride} is not valid`)
    await this.setInput('set', await this.socialSecurityOverrideTextBox, socialSecurityOverride)
    log.debug(`socialSecurityOverride is entered : ${socialSecurityOverride}`)
  }

  // Submit calculator
  async submitCalcualtorForm(){
    await this.clickElement(await this.calcualteBtn);
    log.debug(`Retirement Calcualtor Form is submitted`)
  }

    // Clear calculator
    async clearCalcualtorForm(){
      await this.clickElement(await this.clearForm);
      log.debug(`Retirement Calcualtor Form is Cleared`)
    }

  // verify calculator home page is opened
  async verifyCalculatorHomePage(){
   return await this.waitForElementToDisplay(await this.calculatorIntroSection, 30000)
   // return await this.verifyIsElementExisting(await this.pageTitleImage)
   // return await this.waitForElementToPresent(await this.pageTitleImage, 30000)
  }

  // verify results screen is displayed
  async verifyResultsSectionDisplayed(){
    return await this.waitForElementToDisplay(await this.calculatorResultsContainer, 30000);
  }

  async getRequiredFieldMissingMessage(){
    const errorMessage = await this.getText(await this.requiredFieldMissingMessageEle);
    log.debug(`RequiredFieldMissingMessage error message is : ${errorMessage}`)
    return errorMessage;
  }

  async clickAdjustDefaultCalculator(){
    await this.clickElement(await this.adjustDefaultValues);
    log.debug(`Clicked on  Adjust Default Calculator`)
  }


}

export default new HomePage();
