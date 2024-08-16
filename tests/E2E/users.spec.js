import { test } from '@playwright/test';
import { LoginPage } from "../../page-object/LoginPage";
import { ContactPage } from "../../page-object/AddContactPage";
import { SharedSteps } from "../../helper/sharedSteps";
import { TestStep } from "../../helper/TestStep";
import { loginDetails } from "../../data/userData.js"

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
    await testStep.log(loginPage.registerUser(loginDetails.firstName, loginDetails.lastName, loginDetails.email, loginDetails.password), 'Register a new user')
  })

  test.afterEach(async ({ page }, testInfo) => {
    await sharedSteps.takeScreenshotOnFailure(page, testInfo);
    await sharedSteps.saveTestSteps(testInfo.title, testStep.getSteps());
  });

  test('TC01 Add New User', async ({ }) => {
    /*
    await testStep.log(contactPage.clickOnAddContactButton(), 'Click on Add Contact button');
    await testStep.log(contactPage.populateDataForNewUser(), 'Fill in new user data');
    await testStep.log(contactPage.clickOnSubmitButton(), 'Submit new user form');
    await testStep.log(contactPage.verifyAddedUserData(), 'Verify added user data');    
    */
    const numberOfUsers = 1;
    const users = await testStep.log(contactPage.createRandomUsers(numberOfUsers), `Create ${numberOfUsers} random users`);
    await testStep.log(contactPage.verifyUsersInTable(users), `Verify ${numberOfUsers} users are added to the table`);
  })

  test('TC02 Update Existing User', async ({ }) => {
    /*
    await testStep.log(contactPage.clickOnAddContactButton(), 'Click on Add Contact button');
    await testStep.log(contactPage.populateDataForNewUser(), 'Fill in new user data');
    await testStep.log(contactPage.clickOnSubmitButton(), 'Submit new user form');
    await testStep.log(contactPage.verifyAddedUserData(), 'Verify added user data');
    */
    const numberOfUsers = 1;
    const users = await testStep.log(contactPage.createRandomUsers(numberOfUsers), `Create ${numberOfUsers} random users`);
    await testStep.log(contactPage.verifyUsersInTable(users), `Verify ${numberOfUsers} users are added to the table`);

    await testStep.log(contactPage.clickOnEmailLink(), 'Click on email link');
    await testStep.log(contactPage.clickOnEditButton(), 'Click on Edit button');
    await testStep.log(contactPage.populateDataForNewUser(), 'Fill in new user data');
    await testStep.log(contactPage.clickOnSubmitButton(), 'Submit new user form');
    await testStep.log(contactPage.clickOnReturnToContactListButton(), 'Click on Return to Contact List button');
    await testStep.log(contactPage.verifyAddedUserData(), 'Verify added user data');
  })

  test('TC03 Verify deleting user', async ({ }) => {
    /*
    await testStep.log(contactPage.clickOnAddContactButton(), 'Click on Add Contact button');
    await testStep.log(contactPage.populateDataForNewUser(), 'Fill in new user data');
    await testStep.log(contactPage.clickOnSubmitButton(), 'Submit new user form');
    await testStep.log(contactPage.verifyAddedUserData(), 'Verify added user data');
    */
    const numberOfUsers = 1;
    const users = await testStep.log(contactPage.createRandomUsers(numberOfUsers), `Create ${numberOfUsers} random users`);
    await testStep.log(contactPage.verifyUsersInTable(users), `Verify ${numberOfUsers} users are added to the table`);

    await testStep.log(contactPage.clickOnEmailLink(), 'Click on email link');
    await testStep.log(contactPage.clickOnDeleteButton(), 'Click on Delete button');
    await testStep.log(contactPage.verifyTableIsEmpty(), 'Verify table is empty');
  })

  test.only('TC04 Verify adding multiple users', async ({ }) => {
    const numberOfUsers = Math.floor(Math.random() * 10) + 1;
    const users = await testStep.log(contactPage.createRandomUsers(numberOfUsers), `Create ${numberOfUsers} random users`);
    await testStep.log(contactPage.verifyUsersInTable(users), `Verify ${numberOfUsers} users are added to the table`);
  })
})