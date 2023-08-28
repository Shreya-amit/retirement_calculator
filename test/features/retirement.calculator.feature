@web
Feature: Retirement savings calculator

Background: Open Retirement savings calculator page
   Given I open retirement savings calculator webpage
    Then I verify calcualtor home page is displayed
    
  @RSC001
  Scenario:RSC001: User should be able to submit form with all fields filled in
    When I enter age details with input "sampleData"
    And I enter savings details
    And I include social benefts
    Then I verify social benefits section is displayed
    When I enter social benefits details
    And I submit calculator form
    Then I verify results section is displayed

  @RSC002
  Scenario:RSC002: User should be able to submit form with all required fields filled in
  When I enter only required fields in calculator
   And I submit calculator form
  Then I verify results section is displayed

  @RSC003
  Scenario:RSC003: User should not be able to submit form if required fields not filled in
    When I enter age details
    And I submit calculator form
    And I expect to see error message "Please fill out all required fields" 

  @RSC004
  Scenario:RSC004: Additional Social Security fields should display/hide based on Social Security benefits toggle
     When I include social benefts
    Then I verify social benefits section is displayed
     When I exclude social benefts
    Then I verify social benefits section is not displayed