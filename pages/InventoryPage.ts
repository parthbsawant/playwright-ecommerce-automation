import { expect, Page } from '@playwright/test';

export class InventoryPage {

    readonly page: Page;
    readonly inventoryItems;

    constructor(page: Page) {
        this.page = page;

        this.inventoryItems = page.locator('.inventory_item');
    }

    async verifyInventoryLoaded() {
        await expect(this.page).toHaveURL(/inventory.html/);
        await expect(this.inventoryItems).toHaveCount(6);
    }

    async verifyProductInformation() {

        const count = await this.inventoryItems.count();

        for (let i = 0; i < count; i++) {

            const product = this.inventoryItems.nth(i);

            await expect(product.locator('.inventory_item_name')).toBeVisible();

            await expect(product.locator('.inventory_item_desc')).toBeVisible();

            await expect(product.locator('.inventory_item_price')).toBeVisible();

            await expect(product.locator('img')).toBeVisible();

            await expect(product.getByRole('button')).toBeVisible();
        }
    }
}