import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

Given("I am on the Focus page", () => {
  cy.contains("button", "Focus").click({ force: true });
});

Then("I should see the section title {string}", (title) => {
  cy.get("#sectionTitle").should("contain.text", title);
});

Then("I should see at least 1 exercise", () => {
  cy.get("#sectionText h3").its("length").should("be.gte", 1);
});

Then("each exercise should have a title and description", () => {
  cy.get("#sectionText h3").each(($title) => {
    cy.wrap($title)
      .next("p")
      .should("exist")
      .and("not.be.empty");
  });
});

Then("each exercise may have an image", () => {
  cy.get("#sectionText img").should(($imgs) => {
  $imgs.each((i, img) => {
    expect(img.complete).to.eq(true);
  });
});
});