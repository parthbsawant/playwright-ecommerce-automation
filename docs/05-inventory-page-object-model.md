# Phase 05 — Inventory Page Object Model

## Objective

In the previous phase, we successfully implemented the Login Page Object Model. The login-related actions such as navigating to the website and entering credentials were moved into a dedicated `LoginPage` class.

However, the inventory validation logic was still written directly inside `inventory.spec.ts`.

The objective of this phase is to apply the same Page Object Model principles to the Inventory Page so that:

- Inventory-specific locators are stored in one place.
- Inventory validations are reusable.
- Test files only describe the business workflow.
- Future changes to the Inventory page require modifications in only one file.

---

# Before Refactoring

Our project looked like this:

```
tests
│
├── login.spec.ts
└── inventory.spec.ts

pages
│
└── LoginPage.ts
```

The login workflow was already reusable through `LoginPage.ts`, but inventory validations were still inside the test itself.

Example:

```ts
await expect(page).toHaveURL(/inventory/);

await expect(
    page.locator('.inventory_item')
).toHaveCount(6);

const count = await page.locator('.inventory_item').count();

for (let i = 0; i < count; i++) {

    const product = page.locator('.inventory_item').nth(i);

    await expect(
        product.locator('.inventory_item_name')
    ).toBeVisible();

    await expect(
        product.locator('.inventory_item_desc')
    ).toBeVisible();

    await expect(
        product.locator('.inventory_item_price')
    ).toBeVisible();

    await expect(
        product.locator('img')
    ).toBeVisible();

    await expect(
        product.getByRole('button')
    ).toBeVisible();
}
```

Although the test worked perfectly, it violated the Single Responsibility Principle.

The test was responsible for both:

- describing the test scenario
- implementing inventory validation logic

A test should only describe **what** should happen.

It should never contain details of **how** those validations are implemented.

---

# Problems with this Approach

Imagine there are 40 inventory-related test cases.

Every test would contain:

```
Verify URL
Verify product count
Loop through products
Verify product name
Verify description
Verify image
Verify button
```

Now imagine SauceDemo changes:

```
.inventory_item_name
```

to

```
.product_name
```

Instead of changing one file, we would need to update dozens of tests.

This violates the DRY (Don't Repeat Yourself) principle.

---

# Solution

Create a dedicated Inventory Page Object.

Project structure becomes:

```
pages
│
├── LoginPage.ts
└── InventoryPage.ts
```

Now every inventory-related locator and validation belongs inside this page.

---

# Creating InventoryPage

We created a new file:

```
pages/
    InventoryPage.ts
```

Basic structure:

```ts
import { expect, Page } from '@playwright/test';

export class InventoryPage {

    readonly page: Page;
    readonly inventoryItems;

    constructor(page: Page) {

        this.page = page;

        this.inventoryItems =
            page.locator('.inventory_item');
    }

}
```

---

# Why Store the Locator?

Instead of writing

```ts
page.locator('.inventory_item')
```

again and again,

we store it once.

```ts
readonly inventoryItems =
    page.locator('.inventory_item');
```

Advantages:

- cleaner code
- reusable
- easier maintenance
- single source of truth

---

# Method 1 — verifyInventoryLoaded()

The first responsibility of the Inventory page is verifying that it actually loaded.

We moved

```ts
await expect(page).toHaveURL(...)

await expect(page.locator(...)).toHaveCount(...)
```

inside one method.

```ts
async verifyInventoryLoaded() {

    await expect(this.page)
        .toHaveURL(/.*inventory.html/);

    await expect(this.inventoryItems)
        .toHaveCount(6);

}
```

Now the test no longer needs to know how inventory loading is verified.

It simply calls

```ts
await inventoryPage.verifyInventoryLoaded();
```

---

# Method 2 — verifyProductInformation()

Originally our validation loop existed inside the test.

We moved that entire loop into InventoryPage.

One important improvement was introduced before the loop.

Instead of writing

```ts
for (let i = 0;
     i < await this.inventoryItems.count();
     i++)
```

we first stored the count.

```ts
const count =
    await this.inventoryItems.count();
```

Then

```ts
for (let i = 0; i < count; i++)
```

---

# Why Store Count in a Variable?

This was an important optimization.

Bad approach

```ts
for (let i = 0;
     i < await locator.count();
     i++)
```

Every iteration asks Playwright again

"How many elements exist?"

Even though the answer never changes.

For six products this isn't noticeable.

For hundreds of elements it becomes unnecessary work.

Better approach

```ts
const count =
    await locator.count();

for (let i = 0;
     i < count;
     i++)
```

Now Playwright queries the DOM only once.

This is:

- faster
- cleaner
- easier to read

---

# Complete Method

```ts
async verifyProductInformation() {

    const count =
        await this.inventoryItems.count();

    for (let i = 0; i < count; i++) {

        const product =
            this.inventoryItems.nth(i);

        await expect(
            product.locator('.inventory_item_name')
        ).toBeVisible();

        await expect(
            product.locator('.inventory_item_desc')
        ).toBeVisible();

        await expect(
            product.locator('.inventory_item_price')
        ).toBeVisible();

        await expect(
            product.locator('img')
        ).toBeVisible();

        await expect(
            product.getByRole('button')
        ).toBeVisible();

    }

}
```

---

# Updating inventory.spec.ts

Before refactoring

```ts
Login

Verify URL

Verify Count

Loop

Validate everything
```

After refactoring

```ts
const loginPage =
    new LoginPage(page);

const inventoryPage =
    new InventoryPage(page);

await loginPage.navigate();

await loginPage.login(
    'standard_user',
    'secret_sauce'
);

await inventoryPage.verifyInventoryLoaded();

await inventoryPage.verifyProductInformation();
```

Notice how the test now reads almost like English.

---

# Responsibilities After Refactoring

### inventory.spec.ts

Responsible for

- creating page objects
- executing workflow
- calling methods

Nothing more.

---

### InventoryPage.ts

Responsible for

- inventory locators
- inventory validations
- inventory behaviour

---

# Final Project Structure

```
pages
│
├── LoginPage.ts
└── InventoryPage.ts

tests
│
├── login.spec.ts
└── inventory.spec.ts
```

---

# Benefits Achieved

✔ Inventory logic centralized

✔ Cleaner tests

✔ Better readability

✔ Reusable validation methods

✔ Easier maintenance

✔ Follows Page Object Model

✔ Less duplicated code

✔ Single Responsibility Principle

✔ DRY Principle

---

# Key Learnings

During this phase, the following concepts were learned:

- Creating multiple Page Objects
- Separating page responsibilities
- Moving validation logic out of test files
- Reusing locators
- Using class methods for assertions
- Iterating through collections using `.count()` and `.nth()`
- Optimizing loops by storing element count in a variable
- Writing cleaner and maintainable Playwright tests
- Understanding why Page Object Model improves scalability in large automation frameworks

---

# Phase Summary

This phase completed the migration of Inventory-related functionality into its own Page Object.

At this point:

- Login has its own Page Object.
- Inventory has its own Page Object.
- Test files are now significantly cleaner.
- Business logic and UI implementation are separated.

This architecture forms the foundation of scalable Playwright automation frameworks used in real-world production projects.