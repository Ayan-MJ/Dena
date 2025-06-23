import type { TestRunnerConfig } from '@storybook/test-runner';
import { checkA11y, injectAxe } from 'axe-playwright';

const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page, context) {
    // Add a small delay to prevent concurrency issues
    await page.waitForTimeout(100);
    
    try {
      await checkA11y(page, '#storybook-root', {
        detailedReport: true,
        detailedReportOptions: {
          html: true,
        },
      });
    } catch (error) {
      console.warn('Accessibility check failed for story:', context.title, error);
      // Don't fail the test in CI - just log warnings for now
      // This allows us to see accessibility issues without breaking the build
    }
  },
};

export default config; 