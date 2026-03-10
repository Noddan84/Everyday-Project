// timer.js
import { showMessage } from "./utils.js";

let interval = null;
let remainingTime = 0;

// Använd ditt länkade ljud
const timerSound = new Audio("https://www.soundjay.com/buttons_c2026/sounds/button-8.mp3");

export const Timer = {
  start(durationMinutes = 5) {
    const timerDisplay = document.getElementById("timerDisplay");
    if (!timerDisplay) return;

    this.stop();

    if (isNaN(durationMinutes) || durationMinutes <= 0) {
      durationMinutes = 5;
    }

    remainingTime = durationMinutes * 60;

    interval = setInterval(() => {
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;

      timerDisplay.textContent =
        `Tid kvar: ${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`;

      if (remainingTime <= 0) {
        this.stop();
        // Spela ljud
        timerSound.play().catch(err => console.warn("Ljud kunde inte spelas:", err));
        // Visa meddelande
        showMessage("Tiden är slut! Hoppas du hittade 5 saker!");
      }

      remainingTime--;
    }, 1000);
  },

  stop() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }

    const timerDisplay = document.getElementById("timerDisplay");
    if (timerDisplay) {
      timerDisplay.textContent = "Tid stoppad.";
    }
  }
};

// 🔥 VIKTIGT för Playwright
window.Timer = Timer;