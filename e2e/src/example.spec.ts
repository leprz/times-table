import { test, expect } from '@playwright/test';

test('has settings', async ({ page }) => {
  await page.goto('/');

  // Expect to see settings.
  await expect(page.locator('.top-bar__action-settings')).toBeVisible();
});
