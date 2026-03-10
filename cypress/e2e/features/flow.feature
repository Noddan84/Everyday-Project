Feature: Flow exercises

  Background:
    Given I visit the homepage
    And I am on the Flow page

  Scenario: Flow section shows a list of exercises
    Then I should see the section title "Flow"
    And I should see at least 1 exercise

  Scenario: Each exercise has title, description, image, and video
    Then each exercise should have a title and description
    Then each exercise may have an image