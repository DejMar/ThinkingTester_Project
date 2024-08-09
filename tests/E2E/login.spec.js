import { LoginPage } from "../../page-object/LoginPage"
import { test } from '@playwright/test'

test.describe('Login tests', () => {
  let loginPage
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
  })

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== 'passed') {
      const screenshotPath = `screenshots/${testInfo.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Screenshot saved: ${screenshotPath}`);
    }
  });

  test('Login to page', async ({ page }) => {
    await loginPage.openURL()
  })

  test('Register user', async ({ page }) => {
    await loginPage.openURL()
    await loginPage.registerUser()
  })
})