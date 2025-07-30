const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');

test.describe('Login Page', () => {
  test('valid login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await page.waitForTimeout(1000);
    await login.login('admin', 'admin123');

    await expect(page.locator('text=Todo List')).toBeVisible();
    await page.waitForTimeout(1000);
  });

  test('invalid login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await page.waitForTimeout(5000);
    await login.login('wrong', 'wrong');
    await page.waitForTimeout(5000);
    await expect(login.errorMessage).toBeVisible();
    await page.waitForTimeout(5000);
  });
});
