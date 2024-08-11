import { LoginPage } from "../../page-object/LoginPage"
import { test } from '@playwright/test'

test.describe('Login tests', () => {
  let loginPage
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
  })

  test.afterEach(async ({ page }, testInfo) => {
    await sharedSteps.takeScreenshotOnFailure(page, testInfo);
  });

  test('Login to page', async ({ page }) => {
    await loginPage.openURL()
  })

  test('Register user', async ({ page }) => {
    await loginPage.openURL()
    await loginPage.registerUser()
  })
})