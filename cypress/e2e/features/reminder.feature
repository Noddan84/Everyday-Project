Feature: Reminder notifications

  Background:
    Given I visit the homepage
    And I am on the reminder page

  Scenario: User creates a reminder and it moves to completed when triggered
    When I enter a valid date and time
    And I enter a reminder message
    And I click "Lägg till"
    Then I should see the reminder in the upcoming list
    When I see the reminder popup
    And I click on "OK" button
    Then it should appear in the completed list

  Scenario: Multiple reminders appear in chronological order in upcoming list
    When I create reminders at different times
    Then the upcoming reminders should be sorted chronologically

  Scenario: Completed reminders appear in chronological order
    When I create reminders at different times
    And all reminders are triggered
    Then the completed reminders should be sorted chronologically

  Scenario: Clear button removes all reminders
    When I create reminders at different times
    And I click the clear button
    Then the upcoming list should be empty
    And the completed list should be empty

  Scenario: Reminders are sorted even if added out of order
    When I create reminders in non chronological order
    Then the upcoming reminders should be sorted chronologically
    And I clear all reminders