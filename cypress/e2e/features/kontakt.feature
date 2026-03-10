Feature: Kontakt page

  Background:
    Given I visit the homepage
    And I open the "Kontakt" section

  Scenario: Kontakt section displays contact information
    Then I should see the section title "Kontakt"    
    And I should see an email address
    And I should see a phone number
    And I should see an address
    And I should see a Google map