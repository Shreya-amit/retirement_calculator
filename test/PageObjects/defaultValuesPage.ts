import Page from "./page.js"
import log from "../helpers/logger.js";



class DefaultValuesPage extends Page {

    constructor(){
        super()
    }

    /**Page Objects */

// textboxes
get additionalIncomeTextBox() {return $(`#additional-income`)}
get retirementDurationTextBox() {return $(`#retirement-duration`)}
get expectedInflationRateTextBox() {return $(`#expected-inflation-rate`)}
get retirementAnnualIncomeTextBox() {return $(`#retirement-annual-income`)}
get preRetirementRoiTextBox() {return $(`#pre-retirement-roi`)}
get postRetirementRoiTextBox() {return $(`#post-retirement-roi`)}

// text
get pageTitle() {return $(`#default-values-modal-title`)}

// buttons
get includeInflation() {return $(`//*[@id = 'include-inflation']/following-sibling::label[contains(.,'Yes')]`)}
get exludeInflation() {return $(`//*[@id = 'exclude-inflation']/following-sibling::label[contains(.,'No')]`)}
get saveChanges() {return $(`//button[contains(., 'Save changes')]`)}
get cancelBtn() {return $(`//button[contains(., 'Cancel')]`)}

// forms
get defaultForm() {return $(`#default-values-form`)}

/**Page Actions */
  // verify Default Calculator
  async verifyDefaultCalculatorIsDiplayed(){
    return await this.waitForElementToDisplay(await this.defaultForm, 30000)
  }

  async enterAdditionalIncome(additionalIncome: string){
    if(!additionalIncome) throw Error(`Given additional Income ${additionalIncome} is not valid`)
    await this.wait(5000);
    await this.setInput('set', await this.additionalIncomeTextBox, additionalIncome)
    log.debug(`additional Income is entered : ${additionalIncome}`)
  }

  async enterRetirementDuration(retirementDuration: string){
    if(!retirementDuration) throw Error(`Given retirement Duration ${retirementDuration} is not valid`)
    await this.setInput('set', await this.retirementDurationTextBox, retirementDuration)
    log.debug(`retirement Duration is entered : ${retirementDuration}`)
  }

  async enterRetirementAnnualIncome(retirementAnnualIncome: string){
    if(!retirementAnnualIncome) throw Error(`Given retirement Annual Income ${retirementAnnualIncome} is not valid`)
    await this.setInput('set', await this.retirementAnnualIncomeTextBox, retirementAnnualIncome)
    log.debug(`retirement Annual Income is entered : ${retirementAnnualIncome}`)
  }

  // Investment expectations
  async enterPreRetirementRoi(preRetirementRoi: string){
    if(!preRetirementRoi) throw Error(`Given preRetirement Roi ${preRetirementRoi} is not valid`)
    await this.setInput('set', await this.preRetirementRoiTextBox, preRetirementRoi)
    log.debug(`preRetirementRoi is entered : ${preRetirementRoi}`)
  }

  async enterPostRetirementRoi(postRetirementRoi: string){
    if(!postRetirementRoi) throw Error(`Given post Retirement Roi ${postRetirementRoi} is not valid`)
    await this.setInput('set', await this.postRetirementRoiTextBox, postRetirementRoi)
    log.debug(`post Retirement Roi : ${postRetirementRoi}`)
  }

   // post-retirement income increase with inflation
   async selectIncomeIncreaseWithInflation(includeFlag: boolean){
    if(!includeFlag) throw Error(`post-retirement income increase with inflation selection flag ${includeFlag} is not provided`)
    if(includeFlag){
      await this.clickElement(await this.includeInflation)
      log.debug(`post-retirement income increase with inflation is enabled`)
    } 
    else{
      await this.clickElement(await this.exludeInflation)
      log.debug(`post-retirement income increase with inflation is disabled`)
    }
  }

  //Verify increase with inflation section is displayed
  async verifyIncomeIncreaseWithInflationDisplayed(){
    return await this.verifyIsElementDisplayed(await this.expectedInflationRateTextBox)
  }

  async enterIncomeIncreaseInflationRate(incomeIncreaseInflationRate: string){
    if(!incomeIncreaseInflationRate) throw Error(`income Increase Inflation Rate ${incomeIncreaseInflationRate} is not valid`)
    await this.setInput('set', await this.expectedInflationRateTextBox, incomeIncreaseInflationRate)
    log.debug(`income Increase Inflation Rate : ${incomeIncreaseInflationRate}`)
  }

    // Submit update default calculator values form
    async submitUpdateDefaultValuesForm(){
      await this.clickElement(await this.saveChanges);
      log.debug(`Default calculator values updated form is submitted`)
    }

}

export default new DefaultValuesPage()