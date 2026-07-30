// import { test, expect } from '@playwright/test';

// test('Login with valid credentials', async ({ page }) => {

//     // Navigate to SauceDemo
//     await page.goto('https://www.saucedemo.com/');

//     // Enter Username
//     await page.locator('[data-test="username"]').fill('standard_user');

//     // Enter Password
//     await page.locator('[data-test="password"]').fill('secret_sauce');

//     // Click Login
//     await page.locator('[data-test="login-button"]').click();

//     // Verify successful login
//     await expect(page).toHaveURL(/inventory/);

//     // Verify Products heading is visible
//     await expect(
//         page.locator('[data-test="title"]')
//     ).toHaveText('Products');

// });

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Login with valid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        'standard_user',
        'secret_sauce'
    );

    await expect(page).toHaveURL(/inventory/);

});