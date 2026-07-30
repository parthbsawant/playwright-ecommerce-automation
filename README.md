# Playwright E-Commerce Automation Framework

An end-to-end QA Automation Framework built using **Playwright** and **TypeScript** to automate and validate core user workflows of an e-commerce web application.

This project is being developed incrementally while following software engineering best practices, proper framework architecture, and industry-standard documentation.

The objective is not only to automate test cases but also to design a scalable, maintainable, and reusable automation framework suitable for enterprise-level QA projects.

---

# Project Objectives

- Build a production-style Playwright automation framework
- Learn Playwright through practical implementation
- Follow industry-standard QA automation practices
- Implement reusable Page Object Model (POM)
- Maintain detailed technical documentation for every development phase
- Maintain clean Git history using conventional commit messages

---

# Technology Stack

- Playwright
- TypeScript
- Node.js
- Git
- GitHub

---

# Project Structure

```
playwright-ecommerce-automation/

│
├── docs/
│   ├── 01-project-setup.md
│   ├── 02-login-automation.md
│   ├── 03-inventory-verification.md
│   ├── 04-page-object-model.md
│
├── pages/
│
├── tests/
│
├── test-data/
│
├── utils/
│
├── README.md
├── ROADMAP.md
├── CHANGELOG.md
├── playwright.config.ts
├── package.json
```

---

# Features Implemented

### Project Setup

- Playwright Installation
- TypeScript Configuration
- Git Repository Initialization
- Project Architecture
- HTML Test Reporting

---

### Login Automation

- Launch Browser
- Navigate to Swag Labs
- Enter Username
- Enter Password
- Click Login
- Verify Successful Login

---

### Inventory Verification

- Validate Inventory URL
- Verify Total Product Count
- Validate Product Name
- Validate Product Description
- Validate Product Price
- Validate Product Image
- Validate Add to Cart Button

---

### Page Object Model (POM)

- LoginPage abstraction
- Reusable login methods
- Separation of business logic from test assertions
- Improved framework maintainability

---

# Documentation

Every implementation phase is documented in detail inside the **docs** folder.

Each document includes:

- Objective
- Design Decisions
- Engineering Trade-offs
- Concepts Learned
- Best Practices
- Interview Questions
- Future Improvements

This repository is intended to serve both as an automation framework and a structured learning resource.

---

# Current Progress

- Project Setup
- Login Automation
- Inventory Verification
- Login Page Object Model

---

# Upcoming Features

- Inventory Page Object Model
- Cart Automation
- Checkout Automation
- Data-Driven Testing
- Fixtures
- Environment Configuration
- API Testing
- Cross Browser Execution
- CI/CD using GitHub Actions
- Allure Reporting

---

# Running the Project

Install dependencies

```bash
npm install
```

Run all tests

```bash
npx playwright test
```

Run a specific test

```bash
npx playwright test tests/login.spec.ts
```

Run headed mode

```bash
npx playwright test --headed
```

Open HTML Report

```bash
npx playwright show-report
```

---

# Learning Approach

This project is intentionally developed phase-by-phase.

For every implementation:

- Feature is developed
- Engineering decisions are documented
- Trade-offs are recorded
- Changes are committed using conventional Git commits
- Code is pushed after every completed milestone

This approach ensures the project remains maintainable while serving as a long-term learning resource.

---

# Author

**Parth Balasaheb Sawant**

GitHub:
https://github.com/parthbsawant

LinkedIn:
https://linkedin.com/in/parthbsawant