import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I set mobile viewport", () => {
  cy.viewport(375, 667); // iPhone X-storlek som exempel
});

// Öppnar sidomenyn på mobil
When("I open the sidebar", () => {
  cy.get('#sidebar').then($sidebar => {
    if (!$sidebar.hasClass('active')) {
      cy.get('#menu-toggle').click();
    }
  });
  cy.get('#sidebar').should('have.class', 'active');
});

// Klickar på en sektion i sidomenyn
When("I select the {string} section", (section) => {
  // Om det är Kontakt i mobil så hamnar den i sidomenyn
  cy.get('#sidebar').within(() => {
    cy.contains('button, a', section).click();
  });
});

// Kontrollerar att sidomenyn stängts
Then("the sidebar should close", () => {
  cy.get('#sidebar').should('not.have.class', 'active');
});

// Kontrollerar att rätt sektion visas
Then("I should see the {string} section", (section) => {
  // Kolla att sektionstiteln matchar
  cy.get('#sectionTitle').should('contain.text', section);
});