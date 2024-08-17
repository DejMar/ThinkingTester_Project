import { test, expect } from '@playwright/test';
import { LoginPage } from "../../page-object/LoginPage";
import { ContactPage } from "../../page-object/AddContactPage";
import { SharedSteps } from "../../helper/sharedSteps";
import { TestStep } from "../../helper/TestStep";
import { loginDetails } from "../../data/userData.js"
import { comparingLinks } from "../../data/dataLinks.js";

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
    await testStep.log(sharedSteps.createJsonFromTable(test.info().title), 'Create JSON file')
  })

  test('TC02 Update first user', async ({ }) => {
    const users = await testStep.log(contactPage.createRandomUsers(1), `Create one random user`);
    await testStep.log(contactPage.verifyUsersInTable(users), `Verify one user1 is added to the table`);
    await testStep.log(contactPage.clickOnEmailLink(), 'Click on email link');
    await testStep.log(contactPage.clickOnEditButton(), 'Click on Edit button');
    await testStep.log(contactPage.populateDataForNewUser(), 'Fill in new user data');
    await testStep.log(contactPage.clickOnSubmitButton(), 'Submit new user form');
    await testStep.log(contactPage.clickOnReturnToContactListButton(), 'Click on Return to Contact List button');
    await testStep.log(contactPage.verifyAddedUserData(), 'Verify added user data');
    await testStep.log(sharedSteps.createJsonFromTable(test.info().title), 'Create JSON file')
  })

  test('TC03 Verify deleting first user', async ({ }) => {
    const users = await testStep.log(contactPage.createRandomUsers(1), `Create one random user`);
    await testStep.log(contactPage.verifyUsersInTable(users), `Verify one user1 is added to the table`);
    await testStep.log(contactPage.clickOnEmailLink(), 'Click on email link');
    await testStep.log(contactPage.clickOnDeleteButton(), 'Click on Delete button');
    await testStep.log(contactPage.verifyTableIsEmpty(), 'Verify table is empty');
  })

  test('TC04 Verify adding multiple users', async ({ }) => {
    const numberOfUsers = 9;
    const users = await testStep.log(contactPage.createRandomUsers(numberOfUsers), `Create ${numberOfUsers} random users`);
    await testStep.log(contactPage.verifyUsersInTable(users), `Verify ${numberOfUsers} users are added to the table`);
    await testStep.log(sharedSteps.createJsonFromTable(test.info().title), 'Create JSON file')
  })

  test('TC05 Add and verify designated users', async ({ }) => {
    await testStep.log(contactPage.populateDesignatedUsers(), 'Populate designated users');

    const getFormattedDesignatedUsers = () => {
      const fs = require('fs');
      const path = require('path');
      //TODO Wrap up this part of code in one method
      // Read the designatedUsers.json file
      const filePath = path.join(__dirname, '..', '..', 'data', 'designatedUsers.json');
      const designatedUsers = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      // Convert designatedUsers to the format expected by verifyUsersInTable
      return designatedUsers.map(user => ({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        birthdate: user.dateOfBirth,
        phone: user.phoneNumber,
        country: user.country
      }));
    };
    const formattedUsers = getFormattedDesignatedUsers();

    await testStep.log(contactPage.verifyUsersInTable(formattedUsers), 'Verify designated users are added to the table');
    await testStep.log(sharedSteps.createJsonFromTable(test.info().title), 'Create JSON file');
    //TODO create list of atributes that needs to be checked in JSON
    const comparedFiles = await testStep.log(sharedSteps.compareAtributesJsonFiles(comparingLinks.originalPath, comparingLinks.originalFile, comparingLinks.actualPath, comparingLinks.actual_TC05_File, 'dateOfBirth', 'email', 'phoneNumber'), 'Compare JSON files');
    expect(comparedFiles).toBeTruthy();  
    console.log(comparedFiles)
  })
})