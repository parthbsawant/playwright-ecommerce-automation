# Phase 01 – Project Setup

---

# Objective

The objective of this phase is to establish a clean, scalable, and maintainable foundation for the Playwright QA Automation Framework.

Before writing any automation scripts, it is important to organize the project properly. A well-structured project is easier to understand, maintain, debug, and scale as the application grows.

This phase focuses on setting up the development environment, installing Playwright, organizing the project structure, initializing Git, and preparing the repository for future development.

---

# Why Project Setup Matters

Many beginners immediately start writing automation scripts after installing Playwright.

Although this approach works for learning basic syntax, it quickly becomes difficult to maintain when the project grows.

A professional QA automation framework should be:

- Easy to navigate
- Modular
- Scalable
- Maintainable
- Version controlled
- Well documented

Investing time in creating a proper project structure reduces future technical debt and improves collaboration among team members.

---

# Learning Objectives

After completing this phase, you should understand:

- What Playwright is
- Why Playwright was selected
- Why TypeScript was selected
- How a Playwright project is initialized
- The purpose of each project folder
- The purpose of Git version control
- Why documentation is maintained alongside code
- Basic repository organization followed in this project

---

# Why Playwright?

Playwright is Microsoft's modern end-to-end automation framework used for testing web applications.

Unlike traditional automation tools, Playwright provides:

- Built-in waiting mechanisms
- Automatic browser management
- Native parallel execution
- Cross-browser testing
- Powerful locator strategies
- Built-in HTML reports
- Modern API design

Because of these features, Playwright has become one of the most widely adopted automation frameworks in the industry.

---

# Why TypeScript Instead of JavaScript?

Although Playwright supports both JavaScript and TypeScript, this framework uses TypeScript.

Reasons:

- Static type checking
- Better auto-completion in VS Code
- Easier debugging
- Better readability
- Preferred by many enterprise teams
- Reduces runtime bugs

---

## Why Not Python?

Playwright also supports Python.

Python is an excellent language for automation, especially when working with:

- API Testing
- Data Processing
- Machine Learning
- Automation Scripts

However, many frontend-heavy organizations prefer the TypeScript ecosystem because frontend developers, QA engineers, and automation engineers can all work within the same language ecosystem.

For this project, TypeScript was selected because it aligns with common industry practices for Playwright-based UI automation.

---

# Project Initialization

The project was initialized using:

```bash
npm init -y
```

This creates the initial `package.json` file.

The `package.json` file stores:

- Project metadata
- Installed dependencies
- Scripts
- Version information

---

# Installing Playwright

Playwright was installed using:

```bash
npm init playwright@latest
```

During installation, Playwright automatically generated:

- package.json
- playwright.config.ts
- tests/
- .gitignore

It also installed browser binaries required for testing.

---

# Generated Configuration

Playwright automatically generated:

```
playwright.config.ts
```

This configuration file controls:

- Test directory
- Browser selection
- Parallel execution
- Retry strategy
- Reporter configuration
- Timeouts
- Shared test settings

This file acts as the central configuration of the framework.

---

# Project Folder Structure

```
playwright-ecommerce-automation/

│
├── docs/
│
├── pages/
│
├── test-data/
│
├── tests/
│
├── utils/
│
├── README.md
│
├── ROADMAP.md
│
├── CHANGELOG.md
│
├── package.json
│
├── playwright.config.ts
│
└── .gitignore
```

---

# Folder Explanation

## docs/

Contains complete learning documentation and engineering decisions made during development.

Purpose:

- Learning notes
- Architecture decisions
- Design documentation
- Feature explanations

---

## pages/

Will contain Page Object Model classes.

Each web page will eventually have its own class containing:

- Locators
- Actions
- Helper methods

Purpose:

Avoid duplicate code.

---

## tests/

Contains actual test cases.

Each file represents one business functionality.

Examples:

```
login.spec.ts

cart.spec.ts

checkout.spec.ts
```

---

## utils/

Contains reusable helper functions.

Examples:

- Date utilities
- Random data generators
- Common helper methods

---

## test-data/

Stores reusable test data.

Examples:

- Login credentials
- User profiles
- JSON datasets
- CSV files

Separating data from code improves maintainability.

---

## README.md

Acts as the project's homepage.

Explains:

- What the project does
- Features
- Installation
- Running tests
- Project overview

---

## CHANGELOG.md

Tracks project evolution.

Each feature added to the framework will be recorded here.

Purpose:

Understand project history.

---

## ROADMAP.md

Tracks completed and upcoming features.

Useful for:

- Planning
- Progress tracking
- Future development

---

# Git Initialization

Git was initialized before writing automation code.

Purpose:

- Version control
- History tracking
- Collaboration
- Rollback support

The repository follows Conventional Commit messages.

Examples:

```
feat:

fix:

docs:

refactor:

chore:
```

---

# Why GitHub?

GitHub provides:

- Source code hosting
- Version history
- Collaboration
- Portfolio visibility
- Issue tracking
- CI/CD integration

For recruiters and interviewers, GitHub also acts as a portfolio demonstrating software engineering practices.

---

# Repository Philosophy

This repository is designed with one guiding principle:

> Every file should answer a specific engineering question.

Examples:

| File | Purpose |
|------|----------|
| README.md | What is this project? |
| ROADMAP.md | What will be built next? |
| CHANGELOG.md | What has changed over time? |
| docs/ | Why were engineering decisions made? |
| tests/ | What business functionality is automated? |

---

# Documentation Strategy

Each major feature implemented in the framework receives its own documentation.

Example:

```
01-project-setup.md

02-login-automation.md

03-product-catalog.md

04-cart-automation.md

05-page-object-model.md
```

This approach creates a structured knowledge base instead of scattered notes.

---

# Development Workflow

Every feature follows the same development cycle.

```
Requirement

↓

Design

↓

Implementation

↓

Testing

↓

Documentation

↓

Git Commit

↓

Git Push
```

This workflow mirrors professional software development practices.

---

# Version Control Strategy

During development:

- One feature per commit
- One documentation update per commit
- Meaningful commit messages
- Frequent pushes to GitHub

Example:

```
feat: automate login workflow

docs: explain login automation

refactor: implement page object model

fix: update login assertion
```

---

# Best Practices Established

✔ Organize project before writing code

✔ Keep documentation updated

✔ Use Git from Day One

✔ Follow meaningful commit messages

✔ Separate test code from test data

✔ Keep reusable code in utility modules

✔ Plan for scalability

---

# Common Beginner Mistakes

❌ Writing all automation in one file

❌ Mixing test data with automation logic

❌ Ignoring Git version control

❌ Writing code before planning project structure

❌ Not documenting engineering decisions

❌ Using random commit messages like

```
changes

update

final

latest
```

---

# Engineering Decisions

## Decision

Use Playwright as the automation framework.

### Alternatives Considered

- Selenium
- Cypress
- Puppeteer

### Reason

Playwright provides:

- Faster execution
- Built-in waiting
- Better browser support
- Modern API
- Excellent TypeScript support

---

## Decision

Use TypeScript.

Reason:

Improves maintainability and developer experience.

---

## Decision

Maintain documentation alongside implementation.

Reason:

Makes the project easier to learn, review, and maintain.

---

## Decision

Adopt a modular folder structure from the beginning.

Reason:

Prevents major refactoring as the framework grows.

---

# Interview Questions

## Why did you choose Playwright?

Because it offers reliable browser automation with built-in waiting, cross-browser support, parallel execution, and modern APIs, making it well suited for scalable end-to-end testing.

---

## Why TypeScript?

TypeScript provides static typing, better IDE support, and catches many errors during development rather than at runtime.

---

## Why initialize Git before writing tests?

Version control should begin from the first stage of development so every architectural decision and feature addition is tracked.

---

## Why separate documentation from code?

Documentation explains the reasoning behind implementation decisions, making the framework easier to maintain and helping new contributors understand the project.

---

# Phase Summary

This phase established the complete foundation of the Playwright QA Automation Framework.

The project now includes:

- Playwright installation
- TypeScript configuration
- Git version control
- Organized folder structure
- Documentation strategy
- Development workflow
- Repository architecture
- Scalable project foundation

This foundation enables future automation features to be implemented in a structured and maintainable manner.

---

# Next Phase

**Phase 02 – Login Automation**

Topics introduced in the next phase:

- Browser automation
- Locators
- Assertions
- Auto waiting
- HTML reports
- Cross-browser execution
- First end-to-end automated test