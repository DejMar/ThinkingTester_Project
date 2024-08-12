import { LoginPage } from "../../page-object/LoginPage";
import { ContactPage } from "../../page-object/AddContactPage";
import { test } from '@playwright/test';
import { SharedSteps } from "../../helper/sharedSteps";

test.describe('Manipulating users', () => {
  let loginPage
  let contactPage
  let sharedSteps

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    contactPage = new ContactPage(page)
    sharedSteps = new SharedSteps(page)
  })

  test.afterEach(async ({ page }, testInfo) => {
    await sharedSteps.takeScreenshotOnFailure(page, testInfo);
  });

  test('TC01 - Add New User', async ({ page }) => {
    await loginPage.openURL()
    await loginPage.registerUser()
    await contactPage.clickOnAddContacButton()
    await contactPage.populateDataForNewUser()
    await contactPage.clickOnSubmitButton()
    await contactPage.verifyAddedUserData()
  })

  test('TC02 - Update Existing User', async ({ page }) => {
    await loginPage.openURL()
    await loginPage.registerUser()
    await contactPage.clickOnAddContacButton()
    await contactPage.populateDataForNewUser()
    await contactPage.clickOnSubmitButton()
    await contactPage.verifyAddedUserData()
    await contactPage.clickOnEmailLink()
    await contactPage.clickOnEditButton()
    await contactPage.populateDataForNewUser()
    await contactPage.clickOnSubmitButton()
    await contactPage.clickOnReturnToContactListButton()
    await contactPage.verifyAddedUserData()
  })
  
  test('TC03 - Verify deleting user', async ({ page }) => {
    await loginPage.openURL()
    await loginPage.registerUser()
    await contactPage.clickOnAddContacButton()
    await contactPage.populateDataForNewUser()
    await contactPage.clickOnSubmitButton()
    await contactPage.verifyAddedUserData()
    await contactPage.clickOnEmailLink()

  })
})