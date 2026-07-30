# Changelog

All notable changes to this project are documented in this file.

The project follows a milestone-based development approach where every completed phase represents a stable version of the framework.

---

# Version 0.1.0

## Phase 01 — Project Initialization

### Added

- Initialized Playwright project using TypeScript
- Installed Playwright Test framework
- Configured project structure
- Configured HTML Reporter
- Initialized Git repository
- Added documentation structure
- Created README, ROADMAP and CHANGELOG
- Established engineering documentation workflow

---

## Phase 02 — Login Automation

### Added

- Implemented end-to-end login automation
- Automated username entry
- Automated password entry
- Automated login button click
- Added URL verification after successful login
- Executed tests successfully on Chromium
- Verified browser interactions using Playwright assertions

---

## Phase 03 — Inventory Verification

### Added

- Implemented inventory page verification
- Verified successful navigation to inventory page
- Validated total inventory count
- Verified product names
- Verified product descriptions
- Verified product prices
- Verified product images
- Verified Add to Cart buttons

### Improved

- Introduced reusable product count variable instead of repeatedly calling `.count()`
- Improved test readability
- Reduced unnecessary locator executions

---

## Phase 04 — Page Object Model (Login)

### Added

- Introduced LoginPage Page Object
- Moved login workflow into reusable methods
- Added constructor-based page injection
- Centralized login selectors
- Implemented reusable login() method

### Refactored

- Removed duplicated login logic from test files
- Updated login.spec.ts to use LoginPage
- Updated inventory.spec.ts to use LoginPage
- Improved framework maintainability
- Reduced duplicate code across tests

---

# Upcoming

- Inventory Page Object Model
- Cart Automation
- Checkout Automation
- Data Driven Testing
- Fixtures
- Environment Variables
- API Testing
- GitHub Actions CI/CD
- Allure Reports
- Cross Browser Automation