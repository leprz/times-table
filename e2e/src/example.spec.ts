import { expect, test } from '@playwright/test';

test('has settings', async ({ page }) => {
  await page.goto('/');

  // Expect to see settings.
  await expect(page.locator('.top-bar__action-settings')).toBeVisible();
  await page.locator('.top-bar__action-settings').click();
  await page
    .locator('.page-common-top-bar__settings-dialog .btn-secondary')
    .click();
});
