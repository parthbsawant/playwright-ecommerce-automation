# Playwright Ecommerce Automation

A production-style Playwright automation framework built while learning modern UI test automation from scratch.

The project is designed to follow real-world automation architecture instead of writing simple standalone test scripts.

---

# Tech Stack

- Playwright
- TypeScript
- Node.js
- VS Code
- Git
- GitHub

---

# Project Structure

```
playwright-ecommerce-automation
│
├── docs
│
├── pages
│   ├── LoginPage.ts
│   └── InventoryPage.ts
│
├── tests
│   ├── login.spec.ts
│   └── inventory.spec.ts
│
├── test-data
│
├── utils
│
├── playwright.config.ts
├── package.json
├── README.md
├── ROADMAP.md
└── CHANGELOG.md
```

---

# Features Implemented

## Phase 01

- Playwright project setup
- TypeScript configuration
- Git repository initialization
- Playwright configuration
- Browser installation

---

## Phase 02

### Login Automation

Implemented automated login using valid credentials.

Covered:

- Page navigation
- Username entry
- Password entry
- Login button click
- Successful login verification

---

## Phase 03

### Inventory Validation

Validated the Inventory page after successful login.

Covered:

- Inventory page URL verification
- Product count verification
- Product information validation
- Image validation
- Price validation
- Product description validation
- Add to Cart button validation

---

## Phase 04

### Login Page Object Model

Implemented the first Page Object.

Covered:

- LoginPage class
- Centralized login locators
- Reusable navigation method
- Reusable login method
- Cleaner test files

---

## Phase 05

### Inventory Page Object Model

Implemented Inventory Page Object.

Covered:

- InventoryPage class
- Centralized inventory locators
- Inventory page validation method
- Product validation method
- Reusable inventory assertions
- Optimized collection handling using stored count
- Cleaner test architecture

---

# Current Architecture

```
Test
 │
 ▼
LoginPage
 │
 ▼
InventoryPage
 │
 ▼
Playwright API
 │
 ▼
Browser
```

---

# Design Principles

The framework currently follows:

- Page Object Model (POM)
- DRY (Don't Repeat Yourself)
- Single Responsibility Principle (SRP)
- Separation of Concerns
- Reusable Components

---

# Current Progress

- Project Setup
- Login Automation
- Inventory Validation
- Login Page Object Model
- Inventory Page Object Model
- BasePage
- Utilities
- Test Data Management
- Hooks
- Reporting
- CI/CD

---

# Documentation

Detailed notes for every phase are available inside the `docs/` folder.

Current documentation includes:

- 01-project-setup.md
- 02-login-automation.md
- 03-inventory-validation.md
- 04-page-object-model.md
- 05-inventory-page-object-model.md

---

# Future Improvements

- BasePage implementation
- Custom utilities
- Fixtures
- Data-driven testing
- Environment management
- API testing
- Parallel execution optimization
- GitHub Actions CI/CD
- Docker support

---

# Author

Parth Sawant