import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:3000';

test.describe('Authentication Flows', () => {
  test('should display login page correctly', async ({ page }) => {
    await page.goto(`${baseURL}/login`);
    await expect(page.getByRole('heading', { name: /Welcome back/i })).toBeVisible();
    await expect(page.getByPlaceholder(/admin@stutivani.org/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Sign in/i })).toBeVisible();
  });

  test('should show validation errors on empty submission', async ({ page }) => {
    await page.goto(`${baseURL}/login`);
    await page.getByRole('button', { name: /Sign in/i }).click();
    
    // Expect form validation messages
    await expect(page.getByText(/Invalid email/i)).toBeVisible();
    await expect(page.getByText(/Password is required/i)).toBeVisible();
  });

  test.skip('should handle invalid credentials gracefully', async ({ page }) => {
    await page.goto(`${baseURL}/login`);
    await page.getByPlaceholder(/admin@stutivani.org/i).fill('invalid@example.com');
    await page.getByPlaceholder(/••••••••/i).fill('WrongPassword123');
    await page.getByRole('button', { name: /Sign in/i }).click();

    // The API should respond and show an error toast or message
    // Just verify that the error block appears
    await expect(page.locator('.bg-red-50.text-red-700')).toBeVisible({ timeout: 10000 });
  });

  test('should protect dashboard routes from unauthenticated users', async ({ page }) => {
    // Navigate directly to a protected route
    await page.goto(`${baseURL}/dashboard`);
    
    // The middleware should redirect to login with callbackUrl
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('should protect volunteer portal routes from unauthenticated users', async ({ page }) => {
    // Navigate directly to a protected route
    await page.goto(`${baseURL}/portal`);
    
    // The middleware should redirect to login
    await expect(page).toHaveURL(/.*\/login/);
  });
});
