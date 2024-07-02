import { LoginPage } from "../../page-object/LoginPage";
import { ContactPage } from "../../page-object/AddContactPage";
import { test } from '@playwright/test';

test.describe('Manipulating users', () => {
  let loginPage
  let contactPage
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    contactPage = new ContactPage(page)
  })

  test('Add New User', async ({ page }) => {
    await loginPage.openURL()
    await loginPage.registerUser()
    await contactPage.clickOnAddContacButton()
    await contactPage.populateDataForNewUser()
    await contactPage.clickOnSubmitButton()
    await contactPage.verifyAddedUserData()
  })
  test('Update Existing User', async ({ page }) => {
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
})