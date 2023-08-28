import { setWorldConstructor } from "@wdio/cucumber-framework";

class CustomWorld {
    testid:string
   constructor (){
       this.testid = ''
   }
}

setWorldConstructor (CustomWorld)