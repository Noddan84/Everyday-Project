// cypress/support/step_definitions/explore.steps.js
import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor';
import { letterSets, getRandomLetter, levelColors } from "../../../explore.js";


// Hjälpfunktion för hex → rgb
function hexToRgb(hex) {
  const bigint = parseInt(hex.replace('#', ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
}

/* -------------------- NAVIGATION -------------------- */

Given('I am on the Explore page', () => {
  // Klicka på Explore-knappen
  cy.get('button[data-section="Explore"]')
    .click();
  cy.get('#sectionTitle').should('contain.text', 'Explore');
});

/* -------------------- SELECT DIFFICULTY -------------------- */

When('I select {string}', (level) => {
  cy.get(`#difficultyMenu button[data-level="${level}"]`)
    .click()
    .should('have.class', 'active');

  // Spara nivån för senare steg
  cy.wrap(level).as('selectedLevel');
});

/* -------------------- RANDOM LETTER -------------------- */

Then("I should see a random letter for {string} level", (level) => {
  // Kolla att bokstaven är i rätt set
  cy.get('#letterDisplay strong').invoke('text').then((letter) => {
    expect(letterSets[level]).to.include(letter);
  });

  // Kolla att färgen matchar
  cy.get('#letterDisplay').should('have.css', 'color', hexToRgb(levelColors[level]));
});

/* -------------------- TIMER -------------------- */
Then("the timer should show countdown text", () => {
  cy.get('#timerDisplay')
    .should('be.visible')
    .and('contain.text', 'Tid kvar:');
});

When('I stop the timer', () => {
  cy.get('#stopTimerBtn').click();
});

Then('the timer should display {string}', (text) => {
  cy.get('#timerDisplay').should('contain.text', text);
});