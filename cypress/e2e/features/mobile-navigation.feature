Feature: Mobile sidebar navigation

  Background:
    Given I visit the homepage
    And I set mobile viewport

  Scenario Outline: Sidebar closes and section is displayed after selection
    When I open the sidebar
    And I select the "<section>" section
    Then the sidebar should close
    And I should see the "<section>" section

    Examples:
      | section   |
      | Flow      |
      | Share     |
      | Explore   |
      | Reminder  |
      | Kontakt   |