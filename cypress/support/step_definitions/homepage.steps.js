import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// -------------------- Page --------------------


Then("the page title should be {string}", (expectedTitle) => {
  cy.title().should("eq", expectedTitle);
});

Then("I should see the main header {string}", (expectedHeader) => {
  cy.get(".page-header h1").should("contain.text", expectedHeader);
});

// -------------------- Footer --------------------
Then("I should see the footer", () => {
  cy.get(".footer").should("be.visible");
});

Then("the footer should contain {string}", (expectedText) => {
  cy.get(".footer").should("contain.text", expectedText);
});

// -------------------- Sections --------------------


Then("I should see a list of sections including:", (dataTable) => {
  const sections = dataTable.rawTable.flat();
  sections.forEach(section => {
    cy.get("#sectionText").should("contain.text", section);
  });
});

// -------------------- Navigation --------------------
When("I click on each section in the sidebar", () => {
  // Hämta alla sidomeny-knappar
  cy.get(".sidebar button[data-section]").each(($btn) => {
    const section = $btn.attr("data-section");

    // Klicka med force true om knappen är osynlig (t.ex. footer)
    cy.wrap($btn).click({ force: true });

    // Kontrollera att sectionTitle uppdateras
    cy.get("#sectionTitle").should("contain.text", section);
  });

  // Hämta alla footer-knappar separat om det behövs
  cy.get(".sidebar-footer button[data-section]").each(($btn) => {
    const section = $btn.attr("data-section");

    // Force-click eftersom sidebar-footer ofta är display:none
    cy.wrap($btn).click({ force: true });

    // Kontrollera att sectionTitle uppdateras
    cy.get("#sectionTitle").should("contain.text", section);
  });
});