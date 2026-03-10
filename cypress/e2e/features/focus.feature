Feature: Focus exercises

  Background:
    Given I visit the homepage
    And I am on the Focus page

  Scenario: Focus section shows a list of exercises
    Then I should see the section title "Focus"
    And I should see at least 1 exercise

  Scenario: Each exercise has a title and description
    Then each exercise should have a title and description

  Scenario: Each exercise may have an image
    Then each exercise may have an image