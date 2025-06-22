import { test, expect } from '@playwright/test';

test('landing CTA navigation', async ({ page }) => {
  // Navigate to the home page
  await page.goto('/');

  // Verify we're on the landing page by checking for the hero heading
  await expect(page.locator('h1:has-text("Budget without borders.")')).toBeVisible();

  // Find and click the CTA button
  const ctaButton = page.locator('a:has-text("Get Early Access")');
  await expect(ctaButton).toBeVisible();
  await ctaButton.click();

  // Verify navigation to /signup
  await expect(page).toHaveURL('/signup');

  // Verify the signup page renders the expected H2
  await expect(page.locator('h2')).toContainText('Create your Denariq account');
}); 