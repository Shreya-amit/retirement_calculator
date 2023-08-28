import { Given } from "@wdio/cucumber-framework";
import HomePage from "../PageObjects/homePage.js"
import properties from "../../data/properties.json" assert { type: 'json' };
import log from "../helpers/logger.js";
// import path from "path"
// import fs from "fs"

// const filePath  = path.join (`${process.cwd()}`, 'data',`testData.json`);
// const testDataJson =  fs.readFileSync (filePath, 'utf-8');
// const testData = JSON.parse (testDataJson);

Given(/^I open retirement savings calculator webpage$/, async function (){
    let sdName = "I open retirement savings calculator webpage"
    log.info(`${this.testid} : ${sdName} : start`)
    const URL = properties.baseUrl;
    await HomePage.navigateTo(URL);
    log.info(`${sdName} : end`)
})


