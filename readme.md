[![Playwright Tests](https://github.com/pixelmash/restful-booker-tests/actions/workflows/playwright.yml/badge.svg)](https://github.com/pixelmash/restful-booker-tests/actions/workflows/playwright.yml)
[![K6 Performance Tests](https://github.com/pixelmash/restful-booker-tests/actions/workflows/k6.yml/badge.svg)](https://github.com/pixelmash/restful-booker-tests/actions/workflows/k6.yml)
[![Allure Reports](https://img.shields.io/badge/Allure%20Report-Latest-yellowgreen)](https://pixelmash.github.io/restful-booker-tests/)

# Playwright Restful Booker project

Playwright test suite for https://restful-booker.herokuapp.com/ (API) and https://automationintesting.online/ (UI+API) built with TypeScript/JavaScript. Page Object architecture, UI/API and performance test.

## Tech Stack

- Playwright — browser automation and testing
- K6 - performance testing lib
- TypeScript/JavaScript — test language
- Node.js — runtime environment
- GitHub Actions — CI/CD
- Allure Reports - test run metrics

## Prerequisites

- Node.js v18 or higher
- Git

## Installation

1. Clone the repository
```bash
   git clone https://github.com/pixelmash/restful-booker-tests/
```
2. Install dependencies
```bash
   npm install
```
3. Create a `.env` file based on `.env.example` and fill in the credentials

## Running Tests

Run the full test suite:
```bash
npx playwright test
```

Run a specific file:
```bash
npx playwright test [filename].spec.ts
```

Run in headed mode (visible browser):
```bash
npx playwright test --headed
```
## Project Structure

```
playwright-restful-booker-tests/
├── .github/workflows/    # GitHub Actions CI/CD configuration
├── pages/                # Page Object Model classes
├── performance/          # Performance tests
├── tests/                # Test spec files
├────api/                 # Api tests
├────ui/                  # UI tests
├── testData.ts           # Centralized test data
├── .env.example          # Environment variable template
└── playwright.config.ts  # Playwright configuration
```

## Test Coverage

| Spec File | What's Tested |
|-----------|---------------|
| contact.spec.ts | UI Functional: Validates the contact form logic, including successful message submission and error handling for invalid input |
| reservation.spec.ts | UI End-to-End: Tests the user flow of selecting dates and booking a room; verifies that the UI correctly updates state after a successful reservation. |
| rooms.spec.ts | UI Layout & Navigation: Ensures room cards are rendered correctly, prices are displayed, and "Book Now" buttons navigate to the correct sub-pages |
| auth.api.spec.ts | API Security: Verifies the /auth endpoint; checks that valid credentials return a token and invalid ones return a 403/401 unauthorized status |
| booking.api.spec.ts | API CRUD & Business Logic: Full lifecycle of a booking (Create, Read, Update, Delete). Includes your "manual QA" edge cases like negative prices and invalid date ranges |
| interception.api.spec.ts | UI Resilience (Mocking): Uses page.route to simulate API failures (500 errors) and empty states to verify the UI shows proper error messages/empty-list placeholders |
| booking.k6.js | Performance & Scalability: Simulates 10+ concurrent users creating bookings to measure response latency ($p95 < 500ms$) and system stability under load |

Known issues are documented in comments and are expected due to specific of learning project. Therefore covered by test.fail() clause.