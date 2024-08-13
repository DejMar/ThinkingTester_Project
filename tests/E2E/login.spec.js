import { LoginPage } from "../../page-object/LoginPage"
import { test } from '@playwright/test'
import { SharedSteps } from "../../helper/sharedSteps"
import { TestStep } from "../../helper/TestStep"

test.describe('Login tests', () => {
  let loginPage
  let sharedSteps
  let testStep

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    sharedSteps = new SharedSteps(page)
    testStep = new TestStep()
  })

  test.afterEach(async ({ page }, testInfo) => {
    await sharedSteps.takeScreenshotOnFailure(page, testInfo);
    await sharedSteps.saveTestSteps(testInfo.title, testStep.getSteps());
  });

  test('TC04 Login to page', async ({ }) => {
    await testStep.log(loginPage.openURL(), 'Open the login URL')
  })

  test('TC05 Register user', async ({ }) => {
    await testStep.log(loginPage.openURL(), 'Open the login URL')
    await testStep.log(loginPage.registerUser(), 'Register a new user')
  })

  test.only('TC06 Login with newly registered user', async ({ }) => {
    await testStep.log(loginPage.openURL(), 'Open the login URL')
    await testStep.log(loginPage.registerUser(), 'Register a new user')
    await testStep.log(loginPage.clickOnLogoutButton(), 'Click on logout button')
    await testStep.log(loginPage.loginWithRegisteredUser(), 'Login with registered user')
    await testStep.log(loginPage.confirmLogoutButtonDisplayed(), 'Confirm logout button is displayed')
  })
})