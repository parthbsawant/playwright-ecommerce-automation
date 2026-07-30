import { test, expect } from '@playwright/test';

test('Verify Inventory Page', async ({ page }) => {

    // Login

    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').fill('standard_user');

    await page.locator('[data-test="password"]').fill('secret_sauce');

    await page.locator('[data-test="login-button"]').click();

    // Verify Inventory Page

    await expect(page).toHaveURL(/inventory/);

    // Count products

    const products = page.locator('.inventory_item');

    await expect(products).toHaveCount(6);

    // Verify every product has required information

    // for (let i = 0; i < await products.count(); i++) 
    const productCount = await products.count();

    for (let i = 0; i < productCount; i++) {

        const product = products.nth(i);

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

});