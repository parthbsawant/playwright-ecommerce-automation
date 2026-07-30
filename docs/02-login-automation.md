# Phase 02 – Login Automation

---

# Objective

The objective of this phase is to automate the Login functionality of a web application using Playwright.

This is the first real automation test of the framework and introduces the core building blocks of Playwright including browser automation, locators, assertions, asynchronous execution, and test execution.

The login functionality is intentionally chosen because it exists in almost every web application and demonstrates the complete automation lifecycle from launching the browser to validating application behavior.

---

# Business Requirement

A user should be able to log in to the application using valid credentials.

### Manual Test Case

1. Open Browser
2. Navigate to SauceDemo
3. Enter Username
4. Enter Password
5. Click Login
6. Verify Inventory page is displayed

Our goal is to automate these exact manual steps.

---

# Learning Objectives

After completing this phase, you should understand:

- How Playwright executes a test
- What `test()` actually does
- What the `page` object represents
- Why asynchronous programming (`async/await`) is required
- How Playwright locators work
- Why `data-test` attributes are preferred
- How assertions validate application behavior
- How Playwright generates reports
- Cross-browser testing basics

---

# Technologies Used

- Playwright
- TypeScript
- VS Code
- Git
- GitHub
- SauceDemo Test Website

---

# Test Code

```typescript
import { test, expect } from '@playwright/test';

test('Login with valid credentials', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').fill('standard_user');

    await page.locator('[data-test="password"]').fill('secret_sauce');

    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory/);

    await expect(page.locator('[data-test="title"]'))
        .toHaveText('Products');

});
```

---

# Step-by-Step Code Explanation

## 1. Import Statements

```typescript
import { test, expect } from '@playwright/test';
```

### Why?

Playwright provides several built-in utilities.

We are importing:

- test
- expect

### test()

Creates an independent automated test case.

Without `test()`, Playwright would not know what should be executed.

Think of it as one manual test case converted into code.

---

### expect()

Assertions verify whether the application behaves as expected.

Without assertions:

Automation only performs actions.

With assertions:

Automation verifies correctness.

This is what separates automation from scripting.

---

# 2. Creating the Test

```typescript
test('Login with valid credentials', async ({ page }) => {
```

### Test Name

```
Login with valid credentials
```

This becomes the report title.

A good test name should describe business functionality rather than implementation.

Good:

```
Login with valid credentials
```

Bad:

```
Test1
```

---

### async

Browser operations require time.

Examples:

- Opening browser
- Loading page
- Clicking buttons
- Waiting for server response

JavaScript does not wait automatically.

Therefore the test must be asynchronous.

---

### page

`page` represents one browser tab.

If Chrome has:

```
Tab 1
Tab 2
Tab 3
```

then

```
page
```

represents exactly one tab.

Every browser interaction happens through this object.

Examples:

```
page.goto()

page.click()

page.fill()

page.locator()

page.reload()
```

---

# 3. Navigating to Website

```typescript
await page.goto('https://www.saucedemo.com/');
```

### What happens?

Playwright:

- launches browser
- opens a tab
- navigates to URL
- waits for page loading

---

### Why await?

Without

```typescript
await
```

execution continues immediately.

The next line may execute before the page has loaded.

Result:

```
Element not found
```

because the page isn't ready.

---

# 4. Locating Username Field

```typescript
page.locator('[data-test="username"]')
```

Playwright first finds the element.

Only then can actions like

```
fill()

click()

hover()
```

be executed.

---

### Locator Strategy Used

```
data-test
```

Attribute:

```html
<input data-test="username">
```

---

# Why use data-test?

Because it is intentionally created for automation.

Developers usually avoid changing it during UI redesign.

Therefore it is stable.

---

# Alternative Locator Strategies

## ID

```
#user-name
```

Pros

- Fast
- Simple

Cons

- Developers frequently rename IDs.

---

## CSS Selector

```
input.username
```

Pros

Easy to write.

Cons

Can break after CSS redesign.

---

## XPath

```
//*[@id='user-name']
```

Pros

Very powerful.

Cons

Hard to read.

Usually slower.

Not recommended unless necessary.

---

## Placeholder

```
getByPlaceholder()
```

Pros

Readable.

Cons

Placeholder text changes frequently.

---

## Text Locator

```
getByText()
```

Pros

Human readable.

Cons

Fails after UI text changes.

---

## data-test (Chosen)

Pros

Stable

Designed for automation

Easy to understand

Preferred in professional QA projects

Cons

Requires developers to expose automation attributes.

---

# Engineering Decision Record

Decision

Use

```
data-test
```

for locating UI elements.

Reason

Highest stability.

Trade-off

Requires developer support.

Impact

Improves framework maintainability.

---

# 5. Filling Username

```typescript
.fill('standard_user')
```

Playwright performs:

- Click
- Focus
- Clear existing text
- Type new value

Unlike Selenium,

manual clear()

is usually unnecessary.

---

# 6. Filling Password

Same process.

```typescript
.fill('secret_sauce')
```

---

# 7. Clicking Login

```typescript
.click()
```

Playwright automatically waits until

- element exists
- element is visible
- element is enabled
- element is stable

This feature is called

```
Auto Waiting
```

One of Playwright's biggest advantages.

---

# 8. URL Assertion

```typescript
await expect(page).toHaveURL(/inventory/);
```

Purpose

Verify successful navigation.

If login fails,

URL remains

```
login page
```

The test fails immediately.

---

### Why Regular Expression?

Instead of

```
exact URL
```

we verify

```
contains inventory
```

More flexible.

Less brittle.

---

# 9. Products Assertion

```typescript
await expect(page.locator('[data-test="title"]'))
    .toHaveText('Products');
```

Purpose

Verify the correct page loaded.

Checking URL alone is insufficient.

A page may load

but display an error.

Therefore

we verify visible UI.

---

# Assertions Used

## toHaveURL()

Validates navigation.

---

## toHaveText()

Validates displayed content.

---

# Why Two Assertions?

URL verifies navigation.

Heading verifies UI.

Together they provide stronger confidence.

---

# Playwright Features Used

- test()
- expect()
- async
- await
- page
- goto()
- locator()
- fill()
- click()
- toHaveURL()
- toHaveText()

---

# Auto Waiting

Unlike Selenium,

Playwright automatically waits for

- visibility
- stability
- readiness

Therefore explicit waits are rarely needed.

Avoid:

```
waitForTimeout(5000)
```

unless debugging.

---

# Cross Browser Testing

Current configuration

- Chromium
- Firefox
- WebKit

Development Mode

Chromium only

Release Mode

All browsers

Reason

Faster development.

Complete compatibility verification before release.

---

# HTML Report

Generated using

```
npx playwright show-report
```

Provides

- Passed tests
- Failed tests
- Execution time
- Error logs
- Screenshots
- Trace information

Useful for debugging and reporting.

---

# Common Mistakes

❌ Forgetting await

❌ Using unstable XPath

❌ Using fixed delays

```typescript
waitForTimeout()
```

❌ Writing tests without assertions

❌ Depending on dynamic CSS selectors

---

# Best Practices

✔ Prefer data-test attributes

✔ Keep one business scenario per test

✔ Write meaningful test names

✔ Verify outcomes using assertions

✔ Avoid hardcoded waits

✔ Prefer Playwright auto waiting

✔ Keep tests independent

---

# Interview Questions

### Why Playwright over Selenium?

- Auto Waiting
- Faster execution
- Built-in parallel execution
- Modern architecture
- Built-in reporting
- Cross-browser support

---

### Why use data-test instead of XPath?

Because it is stable and designed specifically for automation.

---

### Why async/await?

Browser actions require time.

Without await,

execution continues before the browser completes the previous action.

---

### Why are assertions important?

Automation should verify application behavior, not just perform actions.

Assertions determine whether the test passes or fails.

---

### Why verify both URL and Heading?

A URL check alone cannot guarantee the page loaded correctly.

Verifying visible content provides stronger validation.

---

# Phase Summary

This phase introduced the first end-to-end Playwright automation test.

The framework now supports:

- Browser launch
- Navigation
- Element location
- User input
- Button interaction
- Assertions
- HTML reporting
- Cross-browser execution
- Stable locator strategy

This forms the foundation for all future automation features.

---

# Next Phase

Phase 03 – Product Search and Add to Cart Automation

Topics to be introduced:

- More locator strategies
- Collections
- Dynamic locators
- Product validation
- Assertions on lists
- Reusable helper methods