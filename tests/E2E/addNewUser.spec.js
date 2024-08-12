import { LoginPage } from "../../page-object/LoginPage";
import { ContactPage } from "../../page-object/AddContactPage";
import { test } from '@playwright/test';
import { SharedSteps } from "../../helper/sharedSteps";
import { TestStep } from "../../helper/TestStep";

test.describe('Manipulating users', () => {
  let loginPage
  let contactPage
  let sharedSteps
  let testStep

  test.beforeEach(async ({ page }) => {
    testStep = new TestStep()
    loginPage = new LoginPage(page)
    contactPage = new ContactPage(page)
    sharedSteps = new SharedSteps(page)
    await testStep.log(loginPage.openURL(), 'Open the login URL');
    await testStep.log(loginPage.registerUser(), 'Register a new user');
  })

  test.afterEach(async ({ page }, testInfo) => {
    await sharedSteps.takeScreenshotOnFailure(page, testInfo);
    await sharedSteps.saveTestSteps(testInfo.title, testStep.getSteps());
  });

  test('TC01 - Add New User', async ({ }) => {
    await testStep.log(contactPage.clickOnAddContacButton(), 'Click on Add Contact button');
    await testStep.log(contactPage.populateDataForNewUser(), 'Fill in new user data');
    await testStep.log(contactPage.clickOnSubmitButton(), 'Submit new user form');
    await testStep.log(contactPage.verifyAddedUserData(), 'Verify added user data');    
  })

  test('TC02 - Update Existing User', async ({ }) => {
    await testStep.log(contactPage.clickOnAddContacButton(), 'Click on Add Contact button');
    await testStep.log(contactPage.populateDataForNewUser(), 'Fill in new user data');
    await testStep.log(contactPage.clickOnSubmitButton(), 'Submit new user form');
    await testStep.log(contactPage.verifyAddedUserData(), 'Verify added user data');
    await testStep.log(contactPage.clickOnEmailLink(), 'Click on email link');
    await testStep.log(contactPage.clickOnEditButton(), 'Click on Edit button');
    await testStep.log(contactPage.populateDataForNewUser(), 'Fill in new user data');
    await testStep.log(contactPage.clickOnSubmitButton(), 'Submit new user form');
    await testStep.log(contactPage.clickOnReturnToContactListButton(), 'Click on Return to Contact List button');
    await testStep.log(contactPage.verifyAddedUserData(), 'Verify added user data');
  })

  test('TC03 - Verify deleting user', async ({ }) => {
    await testStep.log(contactPage.clickOnAddContacButton(), 'Click on Add Contact button');
    await testStep.log(contactPage.populateDataForNewUser(), 'Fill in new user data');
    await testStep.log(contactPage.clickOnSubmitButton(), 'Submit new user form');
    await testStep.log(contactPage.verifyAddedUserData(), 'Verify added user data');
    await testStep.log(contactPage.clickOnEmailLink(), 'Click on email link');
    await testStep.log(async () => {
      const token = await loginPage.retriveToken();
      const response = await page.request.delete(`${BASE_URL_API}/contacts/${contactPage.user._id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      expect(response.status()).toBe(200);
    }, 'Delete user via API');
    await testStep.log(contactPage.clickOnReturnToContactListButton(), 'Return to contact list');
    await testStep.log(async () => {
      await expect(contactPage.TableEmail).not.toHaveText(contactPage.user.email.toLowerCase());
    }, 'Verify deleted user is not displayed');  })
})