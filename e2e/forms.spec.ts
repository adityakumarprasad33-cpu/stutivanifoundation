import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:3000';

test.describe('Form Workflows', () => {
  test('Contact Form should validate inputs', async ({ page }) => {
    await page.goto(`${baseURL}/contact`);
    // Fill valid data
    await page.getByPlaceholder(/Your Full Name/i).fill('Test User');
    await page.getByPlaceholder(/john@example.com/i).fill('test@example.com');
    await page.getByPlaceholder(/How can we help?/i).fill('General Inquiry');
    await page.getByPlaceholder(/Tell us more about your inquiry/i).fill('This is a test message for the automated testing suite.');

    // We don't submit to avoid spamming the backend or triggering alerts in automated runs
    // Just verify the form accepts input and has no validation errors
    await expect(page.locator('.text-destructive')).toHaveCount(0);
  });

  test('Volunteer Form should render', async ({ page }) => {
    await page.goto(`${baseURL}/volunteer`);
    
    // Should display the volunteer form or section
    await expect(page.getByRole('heading', { name: /Volunteer/i }).first()).toBeVisible();
  });

  test('Donation Page should render correctly', async ({ page }) => {
    await page.goto(`${baseURL}/donate`);
    
    // Should display campaigns
    await expect(page.getByRole('heading', { name: /Support Our Cause/i })).toBeVisible();
    
    // Should display donate buttons for campaigns
    await expect(page.getByRole('link', { name: /Donate Now/i }).first()).toBeVisible();
  });
});
