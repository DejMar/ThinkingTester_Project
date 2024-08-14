import { LoginPage } from "../../page-object/LoginPage"
import { loginDetails } from "../../data/userData.js"
import { test } from '@playwright/test'
import { SharedSteps } from "../../helper/sharedSteps"
import { TestStep } from "../../helper/TestStep"
import { warningMessages } from "../../data/messages.js"

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

  test('TC05 Login to page', async ({ }) => {
    await testStep.log(loginPage.openURL(), 'Open the login URL')
    //TODO Verify Homepage 
  })

  test('TC06 Register user', async ({ }) => {
    await testStep.log(loginPage.openURL(), 'Open the login URL')
    await testStep.log(loginPage.registerUser(), 'Register a new user')
  })

  test('TC07 Login with newly registered user', async ({ }) => {
    await testStep.log(loginPage.openURL(), 'Open the login URL')
    await testStep.log(loginPage.registerUser(loginDetails.firstName, loginDetails.lastName, loginDetails.email, loginDetails.password), 'Register a new user')
    await testStep.log(loginPage.clickOnLogoutButton(), 'Click on logout button')
    await testStep.log(loginPage.loginWithRegisteredUser(loginDetails.email, loginDetails.password), 'Login with registered user')
    await testStep.log(loginPage.confirmLogoutButtonDisplayed(), 'Confirm logout button is displayed')
  })

  test('TC08 Verify invalid login message is displayed', async ({ }) => {
    await testStep.log(loginPage.openURL(), 'Open the login URL')
    await testStep.log(loginPage.loginWithRegisteredUser(loginDetails.invalidEmail, loginDetails.invalidPassword), 'Login with invalid credentials')
    await testStep.log(loginPage.verifyInvalidCredentialsMessage(warningMessages.invalidCredentials), 'Verify invalid credentials message is displayed')
  })

  test('TC09 Verify invalid email message is displayed', async ({ }) => {
    await testStep.log(loginPage.openURL(), 'Open the login URL')
    await testStep.log(loginPage.registerUser(loginDetails.firstName, loginDetails.lastName, loginDetails.invalidEmail, loginDetails.password), 'Register user with invalid email')
    await testStep.log(loginPage.verifyInvalidCredentialsMessage(warningMessages.invalidEmail), 'Verify invalid email message is displayed')
  })

  test('TC10 Verify invalid password message is displayed', async ({ }) => {
    await testStep.log(loginPage.openURL(), 'Open the login URL')
    await testStep.log(loginPage.registerUser(loginDetails.firstName, loginDetails.lastName, loginDetails.email, loginDetails.invalidPassword), 'Register userwith invalid password')
    await testStep.log(loginPage.verifyInvalidCredentialsMessage(warningMessages.invalidPassword), 'Verify invalid passeord message is displayed')
  })
})