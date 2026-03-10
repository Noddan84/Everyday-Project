import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

Given("I am on the Flow page", () => {
  cy.get('button[data-section="Flow"]').click();
});





