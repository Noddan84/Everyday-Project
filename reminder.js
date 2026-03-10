// reminder.js
import { showMessage } from "./utils.js";

let beepAudio = new Audio("https://www.soundjay.com/buttons_c2026/sounds/button-8.mp3");

export const ReminderManager = {
  reminders: [],

  add(date, message) {
    this.reminders.push({ date, message, triggered: false });
    this.updateLists();
  },

  check() {
    const now = new Date();

    this.reminders.forEach(r => {
      if (!r.triggered && now >= r.date) {
        showMessage(r.message);
        beepAudio.play().catch(err => console.warn("Ljud kunde inte spelas:", err));
        r.triggered = true;
        this.updateLists();
      }
    });
  },

  updateLists() {
    const upcomingEl = document.getElementById("reminderList");
    const doneEl = document.getElementById("completedReminderList");

    if (!upcomingEl || !doneEl) return;

    // Rensa gamla
    upcomingEl.innerHTML = "";
    doneEl.innerHTML = "";
    // sortera kronologiskt
    this.reminders.sort((a, b) => a.date - b.date);
    this.reminders.forEach(r => {
      const li = document.createElement("li");
      li.textContent = `${r.date.toLocaleString()} - ${r.message}`;
      if (r.triggered) {
        doneEl.appendChild(li);
      } else {
        upcomingEl.appendChild(li);
      }
    });
  }
};

// Kör check varje sekund
setInterval(() => ReminderManager.check(), 1000);

// 🔥 Export globalt
window.ReminderManager = ReminderManager;