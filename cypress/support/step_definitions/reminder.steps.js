import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const formatDate = (date) => {

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");

  return {
    date: `${yyyy}-${mm}-${dd}`,
    time: `${hh}:${min}`
  };
};

const createReminder = (date, message) => {

  const formatted = formatDate(date);

  cy.get("#reminderDate").clear().type(formatted.date);
  cy.get("#reminderTime").clear().type(formatted.time);
  cy.get("#reminderMessage").clear().type(message);

  cy.get("#addReminderBtn").click();
};

const verifyChronologicalOrder = (selector) => {

  cy.get(selector).then((items) => {

    const dates = [...items].map((el) => {
      const text = el.innerText;
      const datePart = text.split(" - ")[0];
      return new Date(datePart);
    });

    const sorted = [...dates].sort((a, b) => a - b);

    expect(dates).to.deep.equal(sorted);
  });

};

Given("I am on the reminder page", () => {
  cy.get('button[data-section="Reminder"]').click();
  cy.get("#sectionTitle").should("contain.text", "Reminder");
});

When("I enter a valid date and time", () => {

  const now = new Date();
  const formatted = formatDate(now);

  cy.get("#reminderDate").clear().type(formatted.date);
  cy.get("#reminderTime").clear().type(formatted.time);

});

When("I enter a reminder message", () => {
  cy.get("#reminderMessage")
    .clear()
    .type("Test reminder");
});

When('I click "Lägg till"', () => {
  cy.get("#addReminderBtn").click();
});

Then("I should see the reminder in the upcoming list", () => {
  cy.get("#reminderList")
    .should("contain.text", "Test reminder");
});

When("I see the reminder popup", () => {
  cy.window().then((win) => {

    // Mocka ljud så testet inte störs
    win.Audio.prototype.play = () => Promise.resolve();

    // Hämta första remindern
    const reminder = win.ReminderManager.reminders[0];

    // Flytta den bakåt i tiden
    reminder.date = new Date(Date.now() - 1000);

    // Kör check direkt
    win.ReminderManager.check();
  });

  cy.get("#reminderOverlay")
    .should("be.visible");
});

When('I click on "OK" button', () => {
  cy.get("#reminderOverlay button").click();
});

Then("it should appear in the completed list", () => {
  cy.get("#completedReminderList")
    .should("contain.text", "Test reminder");
});

// Create reminders at different times to test sorting
When("I create reminders at different times", () => {

  const now = new Date();

  const reminders = [
    { msg: "Reminder 1", offset: 1 },
    { msg: "Reminder 2", offset: 2 },
    { msg: "Reminder 3", offset: 3 }
  ];

  reminders.forEach((r) => {
    const date = new Date(now.getTime() + r.offset * 60000);
    createReminder(date, r.msg);
  });

});

Then("the upcoming reminders should be sorted chronologically", () => {
  verifyChronologicalOrder("#reminderList li");
});

When("all reminders are triggered", () => {

  cy.window().then((win) => {

    win.Audio.prototype.play = () => Promise.resolve();

    win.ReminderManager.reminders.forEach(reminder => {
      reminder.date = new Date(Date.now() - 1000);
    });

    win.ReminderManager.check();

  });

  cy.get("#reminderOverlay")
    .should("be.visible");

  cy.get("#reminderOverlay button")
    .click({ multiple: true });

});

Then("the completed reminders should be sorted chronologically", () => {
  verifyChronologicalOrder("#completedReminderList li");
});

When("I click the clear button", () => {
  cy.get("#clearAllRemindersBtn").click();
});

Then("the upcoming list should be empty", () => {
  cy.get("#reminderList li").should("have.length", 0);
});

Then("the completed list should be empty", () => {
  cy.get("#completedReminderList li").should("have.length", 0);
});

When("I create reminders in non chronological order", () => {

  const now = new Date();

  const reminders = [
    { msg: "Reminder A", offset: 3 },
    { msg: "Reminder B", offset: 1 },
    { msg: "Reminder C", offset: 2 }
  ];

  reminders.forEach((r) => {
    const date = new Date(now.getTime() + r.offset * 60000);
    createReminder(date, r.msg);
  });

});

//Ensures that tests start with a clean slate and prevents audio from playing during tests
When("I clear all reminders", () => {
  cy.window().then(win => {
    if (win.ReminderManager) {
      win.ReminderManager.reminders = [];
      win.ReminderManager.updateLists();
      if (win.Audio) win.Audio.prototype.play = () => Promise.resolve();
    }
  });
});