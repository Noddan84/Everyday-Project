# Everyday Project – Iris Kraft

Detta är en webbapplikation utvecklad som praktikprojekt hos **Iris Kraft**, med fokus på frontend och enkel interaktivitet.
Syftet med projektet är att visa på kompetens inom HTML, CSS och JavaScript, samt grundläggande testning och strukturering av kod.

## Funktioner

- **Reminder**: Skapa och hantera påminnelser med datum och tid.  
- **Explore**: Interaktiv vy där användaren kan se olika alternativ och testfunktioner.  
- **Responsiv design**: Webbplatsen fungerar i både desktop- och mobilvy.  
- **Testade flöden**: Grundläggande logik har testats med Playwright och Cypress lokalt.  

## Teknologier

- HTML5  
- CSS3  
- JavaScript (ES6+)  
- Strukturering med objektorienterad JS för enklare underhåll  
- Versionhantering med Git och GitHub  

## Struktur

- `Everyday.html` – Startsida  
- `style.css` – CSS-stil  
- `main.js` – Huvudlogik för interaktivitet  
- `oldVersionCodepen.js` – Tidigare version från CodePen  

## Komma igång

### 1. Klona repot:

```bash
git clone https://github.com/Noddan84/Everyday-Project.git
```

## 2. Installera beroenden

### 1. Installera alla npm-beroenden
npm install

### 2. Installera webbläsare som behövs för Playwright
npx playwright install

## 3. Komma igång med testning

### 1. Kör alla Playwright-tester
npm run test

### 2. Kör Playwright-tester i synlig webbläsare (headed)
npm run test:headed

### 3. Kör Playwright-tester för Chromium
npm run test:chromium

### 4. Kör Playwright-tester för Firefox
npm run test:firefox

### 5. Kör Playwright-tester för Webkit (Safari)
npm run test:webkit

### 6. Kör Playwright-tester för mobilvy
npm run test:mobile

### 7. Öppna Playwright GUI för att se tester steg-för-steg
npm run test:ui

### 8. Visa Playwright testrapport i webbläsaren
npm run test:report

### 9. Öppna Cypress GUI
npx cypress open

### 10. Kör Cypress-tester i terminalen med debug
npm run test:debug

### 11. Starta en lokal server för att serva din Everyday.html
npm run serve


Öppna Everyday.html i en webbläsare.

 

## 4. Om projektet

Projektet är en del av praktik via socialtjänsten på Iris Kraft och syftar till att ge praktisk erfarenhet inom webbutveckling, programmering och testning.
Koden är strukturerad för att vara enkel att läsa och vidareutveckla, samt för att visa på kompetens inom ovanstående ämnen.

## 5. In Development

Implementera databas och server.
- **Databas**: Tanken är att Iris Kraft ska kunna använda detta med login (admin, handläggare, deltagare).
- **Server**: Genom att använda sig av en egen server så gör man sig oberoende av externa källor vid hämtning av ex. videos, img-filer.

Hitta folk som vill spela in övningar i videoformat på ett pedagogiskt vis.
Hitta folk som vill hjälpa till med bilder. Kan vara fotografier, målningar, 3d-bilder etc.

## 6. Developers

**Kim Nordin - Noddan84**
* Kod, tester och CI/CD-lösning. 
* Förslag på utseende, övningsexempel

**Daniel Albertsson**
* Övningsexempel, idéer/förslag
* Contentbaserat kodinnehåll i content.js