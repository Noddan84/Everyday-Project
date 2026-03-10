Feature: Everyday Homepage

  Background:
    Given I visit the homepage

  # -------------------- Home --------------------
  Scenario: Homepage loads correctly
    Then the page title should be "Everyday"
    And I should see the main header "EVERYDAY"

  Scenario: Footer is visible
    Then I should see the footer
    And the footer should contain "Kontakt"

  Scenario: Home page shows main sections
    Then I should see the section title "Home"
    And I should see a list of sections including:
      | Focus   |
      | Flow    |
      | Share   |
      | Explore |
      | Reminder|
      | Kontakt |

  # -------------------- Navigation --------------------
  Scenario: Navigate between sections
    When I click on each section in the sidebar
    