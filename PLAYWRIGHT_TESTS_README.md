# Everyday Homepage - Playwright Tests 1

A comprehensive Playwright test suite for the Everyday homepage application.

## Test Suite Overview

The test suite includes **60+ tests** organized into the following categories:

- **Page Layout & Header** - Verifies page structure and main header display
- **Sidebar Navigation** - Tests all navigation menu items and section switching
- **Mobile Menu Toggle** - Tests responsive mobile menu functionality
- **Content Display** - Validates proper content rendering for each section
- **Reminder Functionality** - Tests reminder management features
- **Responsive Design** - Ensures proper layout on desktop, tablet, and mobile
- **CSS & Styling** - Verifies stylesheets and icon libraries load correctly
- **Accessibility** - Tests semantic HTML and accessibility features
- **Navigation Button Interactions** - Validates button interactions and rapid section switching
- **Flow Exercise Content** - Verifies all exercise content displays properly

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers (first time only):
```bash
npx playwright install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests with UI (interactive mode)
```bash
npm run test:ui
```

### Run tests in headed mode (watch browser)
```bash
npm run test:headed
```

### Debug tests
```bash
npm run test:debug
```

### Run on specific browsers
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Run on mobile
```bash
npm run test:mobile
```

### View test report
```bash
npm run test:report
```

### Start local server (if needed)
```bash
npm run serve
```

## Test Structure

Tests are located in `tests/homepage.spec.ts` and include:

### Core Tests
- ✅ Page loads with correct title
- ✅ Main header displays "EVERYDAY"
- ✅ Footer with copyright and version displays
- ✅ Welcome section loads by default
- ✅ All sidebar navigation items are visible and functional

### Section Navigation
- ✅ Navigate to Home section
- ✅ Navigate to Focus section (reflection exercises)
- ✅ Navigate to Flow section (physical exercises)
- ✅ Navigate to Share section (social activities)
- ✅ Navigate to Explore section
- ✅ Navigate to Reminder section
- ✅ Navigate to Kontakt section

### Mobile Functionality
- ✅ Menu toggle button visible on mobile
- ✅ Sidebar toggle on mobile click
- ✅ Multiple toggle interactions work correctly

### Content Validation
- ✅ Flow section displays all exercises (Arm Pulses, Arm Circles, Wall Push-Ups, etc.)
- ✅ Exercise videos (iframes) load
- ✅ Exercise images load
- ✅ Focus section displays reflection framework
- ✅ Exercise descriptions are present

### Responsive Design
- ✅ Desktop viewport (1920x1080)
- ✅ Tablet viewport (768x1024)
- ✅ Mobile viewport (375x667)

### Accessibility
- ✅ Proper semantic HTML (nav, main, footer)
- ✅ Language attribute set to Swedish (sv)
- ✅ Proper heading hierarchy
- ✅ Meta viewport tag present
- ✅ Character encoding specified

## Configuration

Playwright configuration is in `playwright.config.ts` and includes:

- **Multiple browsers**: Chromium, Firefox, WebKit
- **Mobile testing**: Pixel 5 device profile
- **Screenshots**: Captured on test failures only
- **Traces**: Collected on first retry for debugging
- **Web Server**: Automatically starts http-server on port 8000

## Excluded Files

The test suite excludes teste for `exempel.js` as requested.

## Browser Coverage

Tests run on:
- ✅ Chromium
- ✅ Firefox
- ✅ WebKit (Safari)
- ✅ Mobile Chrome (Pixel 5)

## Troubleshooting

### npm installation issues
If you encounter npm errors:
```bash
npm cache clean --force
npm install
```

### Port 8000 already in use
If port 8000 is in use, modify `playwright.config.ts`:
```typescript
webServer: {
  command: 'npx http-server . -p 8001 -c-1',  // Change port number
  url: 'http://localhost:8001',
  ...
}
```

### Local file path issues
The test configuration uses relative paths. Ensure Everyday.html is in the project root.

## Notes

- Tests are cross-browser compatible
- Mobile tests validate responsive design
- All tests use modern Playwright selectors
- Tests follow Playwright best practices
- HTML structure and content validation included

## Test Execution Time

Average test execution: ~2-3 minutes across all browsers and viewports

## CI/CD Integration

Tests can be integrated into CI/CD pipelines. Set `CI=true` environment variable to:
- Run with retries
- Use single worker
- Disable local server reuse
