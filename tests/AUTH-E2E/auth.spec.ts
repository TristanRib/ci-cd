import { test, expect } from '@playwright/test';

test.describe('Sign Up form validation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/index.html');
    });

    test('should show success message when form is valid', async ({ page }) => {
        await page.fill('#username', 'Tristan');
        await page.fill('#email', 'tristan@example.com');
        await page.fill('#password', 'mypassword123');
        await page.click('button[type="submit"]');

        await expect(page.locator('#success-msg')).toBeVisible();
    });

    test('should show error when email is invalid', async ({ page }) => {
        await page.fill('#username', 'Tristan');
        await page.fill('#email', 'bad-email');
        await page.fill('#password', 'mypassword123');
        await page.click('button[type="submit"]');

        await expect(page.locator('#email-error')).toBeVisible();
        await expect(page.locator('#success-msg')).toBeHidden();
    });

    test('should show error when fields are missing', async ({ page }) => {
        await page.click('button[type="submit"]');

        await expect(page.locator('#username-error')).toBeVisible();
        await expect(page.locator('#email-error')).toBeVisible();
        await expect(page.locator('#password-error')).toBeVisible();
        await expect(page.locator('#success-msg')).toBeHidden();
    });
});
