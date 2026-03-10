import { test, expect } from '@playwright/test';

/* -------------------- NAVIGATION HELPER -------------------- */

async function navigateToSection(page, section) {
  // Stop timer if exists
  await page.evaluate(() => {
    if (window.Timer) window.Timer.stop();
  });

  const viewport = page.viewportSize();

  if (viewport && viewport.width <= 768) {
    const sidebar = page.locator('#sidebar');
    const menuToggle = page.locator('.menu-toggle');

    if (await sidebar.count() > 0) {   // Kolla att sidebar finns
      const active = await sidebar.evaluate(el =>
        el.classList.contains('active')
      );

      if (!active && (await menuToggle.isVisible())) {
        await menuToggle.click();
        await page.waitForTimeout(800);
      }
    }
  }

  await page.locator(`button[data-section="${section}"]`).click();
  await page.waitForTimeout(800); // liten buffer
  await expect(page.locator('#sectionTitle')).toContainText(section);
}

test.describe('Everyday Homepage', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/Everyday.html', {
      waitUntil: 'domcontentloaded'
    });
    // Mocka ljudet så det inte spelas i test
    await page.evaluate(() => {
      window.Audio.prototype.play = () => Promise.resolve();
    });
  });

  /* -------------------- LAYOUT -------------------- */

  test('should load the homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle('Everyday');
  });

  test('should display main header', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('EVERYDAY');
  });

  test('should display footer', async ({ page }) => {
    const viewport = page.viewportSize();
    const footer = page.locator('.footer');
    const sidebarFooter = page.locator('.sidebar-footer');

    //LÄGG TILL KLICKA PÅ MENUTOGGLE FÖR ATT FÅ FRAM SIDMENYN
    const menuToggle = page.locator('.menu-toggle');
    // Om det är mobil (smal viewport eller mobil Chrome)
    const isMobile = viewport?.width && viewport.width < 500;
    if (isMobile) {
      await menuToggle.click();
      await page.waitForTimeout(800);
      await expect(sidebarFooter).toBeVisible();
      await expect(footer).not.toBeVisible();
      await expect(sidebarFooter).toContainText('© 2026 Everyday');
      await expect(sidebarFooter).toContainText('Version v1.337');
    }
    else {
      await expect(footer).toBeVisible();
      await expect(sidebarFooter).not.toBeVisible();
      await expect(footer).toContainText('© 2026 Everyday');
      await expect(footer).toContainText('Version v1.337');
    }
  });

  test('should display welcome section by default', async ({ page }) => {
    await expect(page.locator('#sectionTitle')).toContainText('Home');
    await expect(page.locator('#sectionText')).toContainText('Denna hemsida har Paus-it övningar');
  });



  /* -------------------- SIDEBAR AND NAVIGATION BUTTONS -------------------- */
// Checka av väntetider 
  test('should navigate between sections', async ({ page }) => {
    const sections = ['Home', 'Focus', 'Flow', 'Share', 'Explore', 'Reminder'];

    for (const section of sections) {
      const viewport = page.viewportSize();
      const isMobile = viewport?.width && viewport.width < 500;

      const btn = page.locator(`button[data-section="${section}"]`);

      if (isMobile) {
        const sidebar = page.locator('#sidebar');
        const menuToggle = page.locator('#menu-toggle');

        const sidebarClasses = await sidebar.getAttribute('class');
        const isActive = sidebarClasses?.includes('active');

        if (await menuToggle.isVisible() && !isActive) {
          await menuToggle.click();
          // Wait for the transition and toggle logic to complete
          await page.waitForTimeout(400);
          await expect(sidebar).toHaveClass(/active/, { timeout: 5000 });
        }
      }

      // Vänta tills knappen verkligen kan klickas
      await expect(btn).toBeVisible({ timeout: 10000 });
      await expect(btn).toBeEnabled({ timeout: 10000 });
      await btn.evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'auto' }));

      await btn.click(); // ingen timeout behövs här, tidigare väntar garanterar stabilitet

      await expect(page.locator('#sectionTitle')).toContainText(section, { timeout: 5000 });

      if (isMobile) {
        const sidebar = page.locator('#sidebar');
        const sidebarClasses = await sidebar.getAttribute('class');
        const isActive = sidebarClasses?.includes('active');
        if (isActive) {
          const menuToggle = page.locator('#menu-toggle');
          await menuToggle.click();
          await expect(sidebar).not.toHaveClass(/active/, { timeout: 5000 });
        }
      }
    }
  });


  /* -------------------- MOBILE MENU -------------------- */

  test('should toggle sidebar on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const sidebar = page.locator('#sidebar');
    const toggle = page.locator('.menu-toggle');

    // Sidebar ska initialt vara stängd
    await expect(sidebar).not.toHaveClass(/active/);

    // Klicka för att öppna
    await toggle.click();
    await page.waitForTimeout(800);
    await expect(sidebar).toHaveClass(/active/);

    // Klicka för att stänga
    await toggle.click();
    await page.waitForTimeout(800);
    await expect(sidebar).not.toHaveClass(/active/);
  });

  // Nytt: sidebar stängs korrekt när man navigerar
  test('should close sidebar when a section is clicked on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const sidebar = page.locator('#sidebar');
    const toggle = page.locator('.menu-toggle');

    // Öppna sidebar först
    await toggle.click();
    await page.waitForTimeout(800);
    await expect(sidebar).toHaveClass(/active/);

    // Klicka på Flow-sektionen
    await navigateToSection(page, 'Flow');

    // Sidebar ska stängas
    await expect(sidebar).not.toHaveClass(/active/);

    // Innehåll ska synas
    await expect(page.locator('#sectionTitle')).toHaveText('Flow');
  });

  /* -------------------- FLOW CONTENT -------------------- */

  test('Flow section should show exercises', async ({ page }) => {
    await navigateToSection(page, 'Flow');

    const text = page.locator('#sectionText');

    await expect(text).toContainText('Arm Pulses');
    await expect(text).toContainText('Arm Circles');
    await expect(text).toContainText('Wall Push-Ups');
  });

  test('Flow should contain media', async ({ page }) => {
    await navigateToSection(page, 'Flow');

    const iframes = page.locator('iframe');
    const images = page.locator('#sectionText img');

    expect(await iframes.count() + await images.count()).toBeGreaterThan(0);
  });

  /* -------------------- RESPONSIVE -------------------- */

  test('should work on multiple viewports', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080 },
      { width: 768, height: 1024 },
      { width: 375, height: 667 }
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await expect(page.locator('.main-content')).toBeVisible();
    }
  });

  /* -------------------- ACCESSIBILITY -------------------- */

  test('should have semantic structure', async ({ page }) => {
    await expect(page.locator('nav')).toHaveCount(1);
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('footer')).toHaveCount(1);
  });

  test('should have lang="sv"', async ({ page }) => {
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('sv');
  });


  /* -------------------- EXPLORE-FUNCTION -------------------- */

  test('Explore timer should start and display letter immediately', async ({ page, browserName }) => {
    // Hämta viewport för att avgöra "mobil"
    const viewport = page.viewportSize();

    // Om det är mobil (smal viewport eller mobil Chrome)
    const isMobile = viewport?.width && viewport.width < 500;

    if (isMobile) {
      // Klicka på hamburger-menyn först
      const menuToggle = page.locator('#menu-toggle');
      if (await menuToggle.isVisible()) {
        await menuToggle.click();
      }
    }

    // Klicka på Explore-knappen
    const exploreBtn = page.locator('button[data-section="Explore"]');
    await exploreBtn.click();

    // Vänta tills Explore-sektionen visas
    const sectionTitle = page.locator('#sectionTitle');
    await expect(sectionTitle).toHaveText('Explore');

    // Klicka på "Easy"-nivån (green) för att starta timer
    const easyBtn = page.locator('#difficultyMenu button[data-level="green"]');
    await easyBtn.click();

    // Kontrollera att bokstav och timer visas
    const letterDisplay = page.locator('#letterDisplay');
    const timerDisplay = page.locator('#timerDisplay');
    await expect(letterDisplay).toBeVisible();
    await expect(timerDisplay).toBeVisible();
  });


  // Gammalt test som inte funkar - backup för tillfället
  /*
  test('Explore timer should show result without waiting 5 minutes', async ({ page }) => {
    // Navigera till Flow först så att Timer initieras
    await navigateToSection(page, 'Flow');

    await expect(page.locator('#sectionTitle')).toHaveText('Flow');

    // Vänta tills timerDisplay faktiskt finns
    await expect(page.locator('#timerDisplay')).toBeVisible();

    // Mocka timern
    await page.evaluate(() => {
      if (!window.Timer) window.Timer = {};
      window.Timer.start = function () {
        const display = document.getElementById('timerDisplay');
        display.textContent = 'Tid kvar: 00:00';
        window.alertCalled = true; // flagga för test
      };
    });

    // Starta timer-funktionen
    await page.evaluate(() => window.Timer.start());
    

    // Kolla att display uppdaterats
    const display = page.locator('#timerDisplay');
    await expect(display).toHaveText('Tid kvar: 00:00');

    // Kolla att flaggan sattes
    const alertCalled = await page.evaluate(() => window.alertCalled);
    expect(alertCalled).toBe(true);
  });*/

});

/* -------------------- REMINDER-FUNCTION -------------------- */

test.describe('Reminder Function', () => {

  test('Reminder Function should move reminder from upcoming to done after trigger', async ({ page }) => {
    await page.goto('/Everyday.html');

    await page.clock.install();
    const now = new Date();
    await page.clock.setSystemTime(now);

    await page.evaluate(() => {
      window.Audio.prototype.play = () => Promise.resolve();
    });


    // Hämta viewport för att avgöra "mobil"
    const viewport = page.viewportSize();

    // Om det är mobil (smal viewport eller mobil Chrome)
    const isMobile = viewport?.width && viewport.width < 500;

    if (isMobile) {
      // Klicka på hamburger-menyn först
      const menuToggle = page.locator('#menu-toggle');
      if (await menuToggle.isVisible()) {
        await menuToggle.click();
      }
    }

    await navigateToSection(page, 'Reminder');

    const reminderTime = new Date(now.getTime() + 60000);

    const year = reminderTime.getFullYear();
    const month = String(reminderTime.getMonth() + 1).padStart(2, '0');
    const day = String(reminderTime.getDate()).padStart(2, '0');
    const hours = String(reminderTime.getHours()).padStart(2, '0');
    const minutes = String(reminderTime.getMinutes()).padStart(2, '0');

    const reminderMessage = 'Test av message';

    await page.fill('#reminderDate', `${year}-${month}-${day}`);
    await page.fill('#reminderTime', `${hours}:${minutes}`);
    await page.fill('#reminderMessage', reminderMessage);

    await page.locator('#addReminderBtn').click();

    const upcomingList = page.locator('#reminderList');
    await expect(upcomingList).toContainText(reminderMessage);

    await page.clock.fastForward(61000);

    const overlay = page.locator('#reminderOverlay');
    await expect(overlay).toBeVisible({ timeout: 10000 }); // öka från 5000ms

    const alertDiv = overlay.locator(`div:has-text("${reminderMessage}")`).first();
    await expect(alertDiv).toBeVisible();

    await alertDiv.locator('button').click();

    const doneList = page.locator('#completedReminderList');
    await expect(doneList).toContainText(reminderMessage);
    await expect(upcomingList).not.toContainText(reminderMessage);

  });

});