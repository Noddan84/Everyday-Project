// main.js
import { initSidebar, closeSidebar } from './sidebar.js';
import { Timer } from './timer.js';
import { ReminderManager } from './reminder.js';
import { getRandomLetter, levelColors } from './explore.js';
import { content } from './content.js';

// -------------------- Sektioner --------------------
const Sections = {
  Home: [
    {
      html: `
        <h3>Denna hemsida har Paus-it övningar.</h3>
        <ul>
          <li><strong>Focus:</strong> Reflektionsövningar för kontorsmiljö.</li>
          <li><strong>Flow:</strong> Fysiska övningar med instruktioner, bilder och videor.</li>
          <li><strong>Share:</strong> Övningar och aktiviteter för social interaktion.</li>
          <li><strong>Explore:</strong> Utforskande övningar för variation under dagen.</li>
          <li><strong>Reminder:</strong> Lägg in påminnelser för övningar, möten eller pauser.</li>
          <li><strong>Kontakt:</strong> Kontaktinformation och adress till Iris Kraft.</li>
        </ul>
        <p>Klicka på knapparna i sidomenyn för att komma igång!</p>
        <hr>
      `
    }
  ],
  Focus: content.focus,
  Flow: content.flow,
  Share: content.share,
  Explore: content.explore,
  Reminder: content.reminder,
  Kontakt: content.kontakt
};

// -------------------- Show Section --------------------
export function showSection(section) {
  const title = document.getElementById('sectionTitle');
  const sectionText = document.getElementById('sectionText');

  title.textContent = section;
  sectionText.innerHTML = (Sections[section]?.map(item => item.html).join('') || '');

  // -------------------- Explore --------------------
  if (section === 'Explore') {
    const startBtn = document.getElementById('startTimer');
    const stopBtn = document.getElementById('stopTimer');

    if (startBtn) startBtn.addEventListener('click', () => Timer.start(5));
    if (stopBtn) stopBtn.addEventListener('click', () => Timer.stop());
  }

  // -------------------- Reminder --------------------
  if (section === 'Reminder') {
    const addBtn = document.getElementById('addReminderBtn');
    const clearBtn = document.getElementById('clearAllRemindersBtn');

    if (addBtn) {
      addBtn.addEventListener('click', () => {
        const dateInput = document.getElementById('reminderDate')?.value;
        const timeInput = document.getElementById('reminderTime')?.value;
        const message = document.getElementById('reminderMessage')?.value;

        if (!dateInput || !timeInput || !message) return;

        const [hour, minute] = timeInput.split(':').map(Number);
        const [year, month, day] = dateInput.split('-').map(Number);

        const date = new Date(year, month - 1, day, hour, minute, 0);
        const now = new Date();
        if (date < now) date.setDate(date.getDate() + 1);

        ReminderManager.add(date, message);
        ReminderManager.updateLists();

        document.getElementById('reminderMessage').value = '';
        document.getElementById('reminderDate').value = '';
        document.getElementById('reminderTime').value = '';
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        ReminderManager.reminders = [];
        ReminderManager.updateLists();
      });
    }

    requestAnimationFrame(() => ReminderManager.updateLists());
  }
}

// -------------------- Menu Buttons --------------------
function bindMenuButtons() {
  document.querySelectorAll('[data-section]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      showSection(btn.dataset.section);

      // Stäng sidebar på mobil
      if (window.innerWidth <= 768) closeSidebar();
    });
  });
}

// -------------------- Footer Buttons on Mobile --------------------
function bindSidebarFooter() {
  const footerButtons = document.querySelectorAll('.sidebar-footer button, .sidebar-footer a');
  footerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.innerWidth <= 768) closeSidebar();
    });
  });
}

// -------------------- Explore Difficulty Buttons --------------------
function bindExploreButtons() {
  document.addEventListener('click', e => {
    // Difficulty buttons
    if (e.target.matches('#difficultyMenu button')) {
      const level = e.target.dataset.level;
      const letter = getRandomLetter(level);

      document.querySelectorAll('#difficultyMenu button').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      const letterDisplay = document.getElementById('letterDisplay');
      letterDisplay.innerHTML = `<br>Bokstav: <strong>${letter}</strong> — Hitta 5 saker på 5 minuter!<br>`;
      letterDisplay.style.color = levelColors[level];

      Timer.start(5);
    }

    // Stop timer button
    if (e.target.matches('#stopTimerBtn')) Timer.stop();
  });
}

// -------------------- DOMContentLoaded --------------------
document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  bindMenuButtons();
  bindSidebarFooter();
  bindExploreButtons();
});