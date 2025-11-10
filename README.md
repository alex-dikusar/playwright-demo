# Playwright Example

This project demonstrates a simple end-to-end test suite powered by [Playwright](https://playwright.dev). The tests exercise a lightweight Todo application hosted locally to showcase flows such as creating items, completing them, and filtering the list.

## Prerequisites

- Node.js 18 or later

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure environment variables by editing the `.env` file (created in the repo root):

   ```
   APP_BASE_URL=http://localhost:4173
   ```

   Change `APP_BASE_URL` if you want to point tests at a different environment.

3. Download the Playwright browser binaries (run once, or whenever browsers need updating):

   ```bash
   npx playwright install
   ```

4. (Optional) Start the sample Todo app manually to explore it in a browser:

   ```bash
   npm run start
   ```

   The app will be served at http://localhost:4173.

## Running Tests

- Execute the full Playwright test suite (headless by default):

  ```bash
  npm test
  ```

- Run tests with a visible browser window for debugging:

  ```bash
  npm run test:headed
  ```

- View the most recent HTML report:

  ```bash
  npm run test:report
  ```

- Explore and run tests interactively with the Playwright Test UI:

  ```bash
  npm run test:ui
  ```

The example spec lives in `tests/todo-app.spec.ts`. It covers flows like adding tasks, filtering by completion state, and narrowing the list via the text filter. The Playwright configuration automatically starts the local sample app when `APP_BASE_URL` points to `http://localhost:4173`; set the variable to another URL if you want to run against a remote environment instead.


