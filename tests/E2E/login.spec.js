import { LoginPage } from "../../page-object/LoginPage"
import { test, expect } from '@playwright/test'


test.describe('Login tests', () => {
  let loginPage
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
  })

  test('Login to page', async ({ page }) => {
    await loginPage.openURL()
  })

  test('Register user', async ({ page }) => {
    await loginPage.openURL()
    await loginPage.registerUser()
    await page.pause()
  })
})