Feature: Explore micro challenges

  Background:
    Given I visit the homepage

  Scenario Outline: Explore timer starts and stops correctly for all difficulty levels
    Given I am on the Explore page
    When I select "<level>"
    Then I should see a random letter for "<level>" level
    Then the timer should show countdown text
    When I stop the timer
    Then the timer should display "Tid stoppad"

    Examples:
      | level  |
      | green  |
      | yellow |
      | blue   |
      | red    |