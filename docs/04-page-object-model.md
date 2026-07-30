# Phase 04 – Page Object Model (POM)

## Objective

Refactor the framework by separating **page interaction logic** from **test validation logic** using the **Page Object Model (POM)** design pattern.

This is the first major architectural improvement in the framework.

---

# Why did we implement Page Object Model?

Initially, both `login.spec.ts` and `inventory.spec.ts` contained the login steps.

Example:

- Open browser
- Navigate to Swag Labs
- Enter username
- Enter password
- Click Login

This worked correctly.

However, the same login logic was duplicated across multiple test files.

Example:

login.spec.ts

```text
Enter Username
Enter Password
Click Login
```

inventory.spec.ts

```text
Enter Username
Enter Password
Click Login
```

If tomorrow we write:

- cart.spec.ts
- checkout.spec.ts
- logout.spec.ts
- product.spec.ts

every file would contain the same login code again.

This creates duplicated code.

---

# Problems with duplicated code

Duplicate code creates several engineering problems.

## Problem 1 – Difficult Maintenance

Imagine the Login button selector changes from

```ts
[data-test="login-button"]
```

to

```ts
button.login
```

Without POM:

We must update

- login.spec.ts
- inventory.spec.ts
- cart.spec.ts
- checkout.spec.ts

Every file requires modification.

Higher chance of bugs.

---

## Problem 2 – Poor Scalability

A real QA project may contain

- 300 tests
- 1000 tests
- 5000 tests

Copying login code into every file becomes impossible to maintain.

---

## Problem 3 – Low Readability

A test should describe **WHAT** is being tested.

Example:

```text
Login

↓

Go to Inventory

↓

Verify Products
```

Instead, duplicated code makes the test longer than necessary.

---

## Problem 4 – Violates DRY Principle

One of the most important software engineering principles is

DRY

Don't Repeat Yourself.

Whenever the same code appears multiple times, it should usually be extracted into a reusable component.

---

# What is Page Object Model?

Page Object Model (POM) is a software design pattern used in test automation.

Instead of storing page interaction logic inside test files, each webpage is represented by a dedicated class.

Example:

Login Page

↓

LoginPage.ts

Inventory Page

↓

InventoryPage.ts

Cart Page

↓

CartPage.ts

Checkout Page

↓

CheckoutPage.ts

Every page becomes responsible for interacting with itself.

The test simply uses those page objects.

---

# Before POM

```
login.spec.ts

Open Website

Fill Username

Fill Password

Click Login

Assertion
```

```
inventory.spec.ts

Open Website

Fill Username

Fill Password

Click Login

Inventory Assertions
```

Duplicate code exists.

---

# After POM

LoginPage.ts

```
Open Website

Fill Username

Fill Password

Click Login
```

login.spec.ts

```
loginPage.login()

Assertion
```

inventory.spec.ts

```
loginPage.login()

Inventory Assertions
```

Now login exists only once.

---

# Project Structure

Current Architecture

```
pages/

    LoginPage.ts

tests/

    login.spec.ts

    inventory.spec.ts
```

Future Architecture

```
pages/

    LoginPage.ts

    InventoryPage.ts

    CartPage.ts

    CheckoutPage.ts

tests/

    login.spec.ts

    inventory.spec.ts

    cart.spec.ts

    checkout.spec.ts
```

---

# Understanding LoginPage.ts

The class begins with

```ts
export class LoginPage
```

This class represents the Login Page of the application.

Instead of representing data,

it represents behaviour.

Everything that can happen on the Login page belongs inside this class.

Examples:

- Open page
- Fill username
- Fill password
- Click login

---

# Constructor

```ts
constructor(page: Page)
```

Every Page Object needs access to Playwright's page instance.

The constructor receives it once.

Instead of passing page into every function,

we store it inside the class.

---

# this.page

Inside constructor

```ts
this.page = page;
```

means

Store the browser page for future use.

Now every method inside LoginPage can directly access

```ts
this.page
```

without needing another parameter.

---

# Methods inside LoginPage

Instead of writing

```ts
page.goto()
```

inside every test,

we create methods.

Example

```ts
navigate()

login()

enterUsername()

enterPassword()

clickLogin()
```

Each method performs one responsibility.

This follows the Single Responsibility Principle.

---

# Why methods instead of one large function?

We created

```ts
login()
```

using smaller reusable methods.

Example

```
login()

↓

navigate()

↓

enterUsername()

↓

enterPassword()

↓

clickLogin()
```

Benefits

- Better readability

- Easier debugging

- Reusable methods

- Cleaner architecture

---

# Why Assertions stay inside Tests

One common beginner mistake is writing assertions inside page objects.

Example (Bad)

```ts
login(){

...

expect(...)

}
```

This mixes responsibilities.

Instead,

Page Object should only perform actions.

Tests should perform validations.

Good

Page Object

↓

Login

Navigate

Fill fields

Click

Test

↓

Expect URL

Expect Product Count

Expect Text

This separation makes the framework much easier to maintain.

---

# Benefits of POM

## Code Reusability

Login code written once.

Used everywhere.

---

## Easy Maintenance

One selector changes.

Update one file.

Entire framework works.

---

## Better Readability

Test becomes

```ts
await loginPage.login();

expect(...);
```

instead of

30 lines of repeated actions.

---

## Better Scalability

New tests become much shorter.

Adding hundreds of tests becomes practical.

---

## Cleaner Architecture

Business logic

↓

Page Objects

Validation logic

↓

Test Files

---

## Industry Standard

Almost every enterprise Playwright framework uses

- Page Object Model

or

- Page Object + Fixtures

Understanding POM is one of the most common Playwright interview topics.

---

# Trade-offs

Although POM is powerful, it also has limitations.

## More Files

Instead of one test file,

multiple page classes are created.

Small projects may feel slightly more complex.

---

## Initial Setup Time

Writing page classes takes more time initially.

However,

maintenance time reduces significantly later.

---

## Over-Abstraction

Very tiny projects may not require POM.

For small automation scripts,

simple test files are sufficient.

POM becomes valuable when the framework starts growing.

---

# Engineering Decision

We chose Page Object Model because:

✔ Removes duplicated code

✔ Improves readability

✔ Makes future maintenance easier

✔ Matches enterprise Playwright frameworks

✔ Demonstrates good software engineering practices

✔ Makes interview discussions stronger

---

# Concepts Learned

- Page Object Model (POM)

- DRY Principle

- Code Reusability

- Class

- Object

- Constructor

- this Keyword

- Encapsulation

- Separation of Concerns

- Single Responsibility Principle (SRP)

- Framework Architecture

---

# Interview Questions

## What is Page Object Model?

A design pattern where every web page is represented as a separate class containing all page interactions, while test files only contain business validations.

---

## Why use POM?

- Removes duplicate code

- Easier maintenance

- Better readability

- Improved scalability

- Cleaner architecture

---

## Should assertions be inside Page Objects?

No.

Page Objects should perform actions.

Assertions belong inside test files.

---

## What happens if the Login button locator changes?

Without POM:

Every test file must be updated.

With POM:

Only LoginPage.ts requires modification.

---

## What did we refactor in this phase?

We extracted all login-related browser interactions into LoginPage.ts and updated multiple test files to reuse the same login workflow without duplicating code.