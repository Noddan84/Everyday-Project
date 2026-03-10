import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

Given("I open the {string} section", (section) => {
  cy.contains("button", section).click({ force: true });
});

Then("I should see an email address", () => {
  cy.get("#sectionText")
    .invoke("text")
    .should("match", /\S+@\S+\.\S+/);
});

Then("I should see a phone number", () => {
  cy.get("#sectionText").should("contain.text", "070");
});

Then("I should see an address", () => {
  cy.get("#sectionText").should("contain.text", "Exempelgatan");
});

Then("I should see a Google map", () => {
  cy.get("#sectionText iframe")
    .scrollIntoView()
    .should("be.visible");
});