@web
Feature: Update Default calculator Values
  
  @RSC005
  Scenario:RSC0005: User should be able to update default calculator values
  Given I open retirement savings calculator webpage
  Then I verify calcualtor home page is displayed
  When I enter only required fields in calculator
  And I open default calculator values form
  Then I verify adjust default values calculator is displayed
  When I update default calculator values
   And I submit calculator form
  Then I verify results section is displayed