# Phase 03 – Inventory (Product Catalog) Validation

---

# Objective

The objective of this phase is to validate that the inventory page is displayed correctly after a successful login.

Instead of only checking whether the user reaches the inventory page, we verify that the application displays the expected business data.

This introduces an important concept in QA Automation:

> Validate business functionality, not just navigation.

---

# Business Requirement

After a successful login,

the Inventory Page should:

- Display exactly **6 products**
- Every product should contain:
  - Product Name
  - Product Description
  - Product Price
  - Product Image
  - Add to Cart Button

If any one of these components is missing, the Inventory page should be considered invalid.

---

# Learning Objectives

After completing this phase, you should understand:

- Collections in Playwright
- Locator vs Multiple Locators
- locator.count()
- expect(locator).toHaveCount()
- nth()
- for loops
- Nested locators
- Element visibility assertions
- Business validation vs Navigation validation

---

# Why Inventory Validation?

Imagine the following situation:

The Login works perfectly.

The Inventory page loads.

The URL is correct.

However,

- Product prices are missing.
- Product images are broken.
- Add to Cart buttons disappeared after a deployment.

Would the application still be usable?

No.

Simply verifying the URL is not sufficient.

A QA Engineer validates the actual business functionality of the application.

---

# Test Flow

```
Open Login Page

↓

Login

↓

Verify Inventory URL

↓

Verify Product Count

↓

Iterate Through Every Product

↓

Verify

• Name

• Description

• Price

• Image

• Add to Cart Button
```

---

# Inventory Locator

```
const products = page.locator('.inventory_item');
```

Unlike previous examples, this locator does **not** point to a single HTML element.

Instead,

it represents a **collection** of matching elements.

```
Product 1

Product 2

Product 3

Product 4

Product 5

Product 6
```

All six elements are represented by one Locator object.

This is one of the most powerful concepts in Playwright.

---

# Verifying Product Count

Initially we verify

```
await expect(products).toHaveCount(6);
```

This confirms that the Inventory page displays exactly six products.

---

# Why Use `toHaveCount()` Instead of `count()`?

There are two possible approaches.

## Option 1

```ts
const count = await products.count();

expect(count).toBe(6);
```

## Option 2

```ts
await expect(products).toHaveCount(6);
```

---

## Why We Chose `toHaveCount()`

`toHaveCount()` automatically waits until the expected number of elements appears.

Example:

Immediately after login:

```
0 Products
```

300 milliseconds later:

```
6 Products
```

`toHaveCount()` waits until the UI reaches the expected state.

This makes the test significantly more stable.

---

# Engineering Decision

Decision:

Use

```
expect(locator).toHaveCount()
```

instead of

```
locator.count()
```

Reason:

Automatic waiting.

Trade-off:

When we need the actual numeric value for logic (loops, calculations), we still use `count()`.

---

# Iterating Through Products

After confirming that six products exist,

we need to inspect every product individually.

For this purpose,

we use a loop.

```
Product 1

↓

Validate

↓

Product 2

↓

Validate

↓

Product 3

↓

...

↓

Product 6
```

---

# Initial Implementation

The first implementation looked like this.

```ts
for (let i = 0; i < await products.count(); i++) {

    const product = products.nth(i);

    ...

}
```

This implementation works correctly.

However,

there is a small optimization.

---

# Optimization

Instead of repeatedly asking Playwright for the product count,

store it once.

Improved version:

```ts
const productCount = await products.count();

for (let i = 0; i < productCount; i++) {

    const product = products.nth(i);

}
```

---

# Why Is This Better?

Previous approach:

```
Iteration 1

↓

count()

Iteration 2

↓

count()

Iteration 3

↓

count()

...
```

Playwright evaluates the locator count during every loop condition.

Improved approach:

```
count()

↓

Store Value

↓

Reuse Stored Value
```

Advantages:

- Cleaner code
- Better readability
- Slightly better performance
- Easier debugging

Although the performance difference is negligible for six products,

this becomes more important when validating hundreds of elements.

---

# Accessing Individual Products

Collections cannot directly expose child elements.

First,

we select one product.

```
const product = products.nth(i);
```

Now

```
product
```

represents only

```
Product Number i
```

Once selected,

we can inspect its child elements.

---

# Nested Locators

Example:

```
product.locator('.inventory_item_name')
```

Here,

the search starts **inside the selected product**, not the entire page.

Without nesting,

Playwright would search the complete page.

Nested locators improve accuracy and readability.

---

# Assertions Performed

Each product is validated for:

## Product Name

```ts
await expect(
    product.locator('.inventory_item_name')
).toBeVisible();
```

---

## Product Description

```ts
await expect(
    product.locator('.inventory_item_desc')
).toBeVisible();
```

---

## Product Price

```ts
await expect(
    product.locator('.inventory_item_price')
).toBeVisible();
```

---

## Product Image

```ts
await expect(
    product.locator('img')
).toBeVisible();
```

---

## Add To Cart Button

```ts
await expect(
    product.getByRole('button')
).toBeVisible();
```

---

# Why Use `toBeVisible()`?

Visibility confirms that:

- The element exists.
- The element is rendered.
- The user can actually see it.

This is stronger than merely checking if the HTML element exists.

---

# Limitation of the Current Validation

Current validation checks

```
Visible
```

It does **not** verify

```
Correct Content
```

Example:

```
<div class="inventory_item_name"></div>
```

This element is visible.

Therefore,

the current assertion still passes.

However,

the business requirement expects every product to have a meaningful product name.

This improvement will be implemented in a future phase.

---

# Business Validation Completed

Current validation guarantees:

```
Inventory Page Loaded

↓

Exactly Six Products

↓

Each Product Contains

✓ Name

✓ Description

✓ Price

✓ Image

✓ Add To Cart Button
```

---

# Engineering Decisions

## Decision 1

Use one Locator for the entire collection.

Reason:

Cleaner code.

Scalable.

Easy iteration.

---

## Decision 2

Validate every product individually.

Reason:

Checking only the total count cannot detect incomplete product cards.

---

## Decision 3

Store product count before the loop.

Reason:

Avoid repeated calls to `count()`.

Improves readability and efficiency.

---

## Decision 4

Use nested locators.

Reason:

Limits the search scope to one product card.

Avoids accidental matches elsewhere on the page.

---

## Decision 5

Begin with visibility assertions.

Reason:

Visibility is the first level of UI validation.

Content validation will be added later.

---

# Common Beginner Mistakes

❌ Checking only the Inventory URL

❌ Checking only product count

❌ Searching the entire page instead of a single product

❌ Calling `count()` repeatedly inside loops

❌ Writing six separate assertions instead of using iteration

---

# Interview Questions

## Why use a loop instead of six separate assertions?

Because every product follows the same structure.

Using iteration makes the test shorter, easier to maintain, and scalable.

---

## Why use `nth()`?

Because `locator()` returns a collection.

`nth()` selects one element from that collection.

---

## Why use nested locators?

Nested locators reduce the search scope and improve selector reliability.

---

## Why store `count()` before the loop?

It avoids repeatedly querying the same collection, resulting in cleaner and slightly more efficient code.

---

## Why use `toHaveCount()` first and `count()` later?

`toHaveCount()` is used for validation because it automatically waits.

`count()` is used after validation because we need the numeric value to iterate through the collection.

---

# Phase Summary

This phase introduced collection-based testing in Playwright.

Instead of validating a single element,

we validated an entire collection of products.

The framework now verifies:

- Successful login
- Inventory page
- Product count
- Product structure
- Business UI completeness

This forms the foundation for testing more advanced e-commerce workflows such as Add to Cart, Checkout, and Order Placement.

---

# Next Phase

**Phase 04 – Page Object Model (POM)**

Topics:

- Removing duplicate code
- Reusable page classes
- Cleaner test architecture
- Industry-standard framework design
- Separation of Locators and Test Logic