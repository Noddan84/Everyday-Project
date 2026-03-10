import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I visit the homepage", () => {  
  cy.visit("/Everyday.html");
});