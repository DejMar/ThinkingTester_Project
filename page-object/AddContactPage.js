import { expect } from '@playwright/test';
import { SharedSteps } from '../helper/sharedSteps';

export class ContactPage {
  constructor(page) {
    this.page = page
    this.user = {};
    //Input fields
    this.FirstName = page.locator("//input[@id='firstName']")
    this.LastName = page.locator("//input[@id='lastName']")
    this.DateOfBirth = page.locator("//input[@id='birthdate']")
    this.Email = page.locator("//input[@id='email']")
    this.PhoneNumber = page.locator("//input[@id='phone']")
    this.Address1 = page.locator("//input[@id='street1']")
    this.Address2 = page.locator("//input[@id='street2']")
    this.City = page.locator("//input[@id='city']")
    this.StateOrProvince = page.locator("//input[@id='stateProvince']")
    this.ZipOrPostalCode = page.locator("//input[@id='postalCode']")
    this.Country = page.locator("//input[@id='country']")
    //Table
    this.TableName = page.locator('//*[@id="myTable"]/tr/td[2]')
    this.TableDateOfBirth = page.locator('//*[@id="myTable"]/tr/td[3]')
    this.TableEmail = page.locator("//*[@id='myTable']/tr/td[4]")
    this.TablePhoneNumber = page.locator('//*[@id="myTable"]/tr/td[5]')
    this.TableCountry = page.locator('//*[@id="myTable"]/tr/td[8]')
    //Buttons
    this.AddContactButton = page.getByRole('button', { name: 'Add a New Contact' })
    this.ReturnToContactList = page.getByRole('button', { name: 'Return to Contact List' })
    this.EditButton = page.getByRole('button', { name: 'Edit' })
    this.SubmitButton = page.getByRole('button', { name: 'Submit' })
    this.DeleteButton = page.getByRole('button', { name: 'Delete Contact' })
  }

  createRandomUser = async () => {
    const sharedSteps = new SharedSteps(this.page);
    this.user = sharedSteps.generateUserData();
    return this.user;
  }

  populateDataForNewUser = async () => {
    const user = await this.createRandomUser()
    await this.FirstName.fill(user.firstName)
    await this.LastName.fill(user.lastName)
    await this.DateOfBirth.fill(user.birthdate)
    await this.Email.fill(user.email)
    await this.PhoneNumber.fill(user.phone)
    await this.Address1.fill(user.street1)
    await this.Address2.fill(user.street2)
    await this.City.fill(user.city)
    await this.StateOrProvince.fill(user.stateProvince)
    await this.ZipOrPostalCode.fill(user.postalCode)
    await this.Country.fill(user.country)
  }

  createRandomUsers = async (numberOfUsers) => {
    const users = [];
    for (let i = 0; i < numberOfUsers; i++) {
      await this.clickOnAddContactButton();
      await this.populateDataForNewUser();
      await this.clickOnSubmitButton();
      users.push(this.user);
    }
    return users;
  }

  verifyUsersInTable = async (users) => {
    // Sort users by last name
    const sortedUsers = users.sort((a, b) => a.lastName.localeCompare(b.lastName));

    for (let i = 0; i < sortedUsers.length; i++) {
      const user = sortedUsers[i];
      await this.TableName.nth(i).waitFor({ state: 'visible' });
      await expect(this.TableName.nth(i)).toHaveText(user.firstName + ' ' + user.lastName);
      await expect(this.TableEmail.nth(i)).toHaveText(user.email.toLowerCase());
      await expect(this.TableDateOfBirth.nth(i)).toHaveText(user.birthdate);
      await expect(this.TablePhoneNumber.nth(i)).toHaveText(user.phone);
      await expect(this.TableCountry.nth(i)).toHaveText(user.country);
    }

    // Verify the list is sorted as populated
    const tableNames = await this.TableName.allInnerTexts();
    const sortedTableNames = tableNames.slice().sort((a, b) => {
      const lastNameA = a.split(' ')[1];
      const lastNameB = b.split(' ')[1];
      return lastNameA.localeCompare(lastNameB);
    });

    expect(tableNames).toEqual(sortedTableNames);
  }

  clickOnAddContactButton = async () => {
    await this.AddContactButton.click()
  }

  clickOnSubmitButton = async () => {
    await this.SubmitButton.waitFor()
    await this.SubmitButton.click()
  }

  clickOnEmailLink = async () => {
    await this.TableEmail.click()
  }

  clickOnEditButton = async () => {
    await this.EditButton.click()
  }

  clickOnReturnToContactListButton = async () => {
    await this.ReturnToContactList.click()
  }
  
  clickOnDeleteButton = async () => {
    await this.page.on('dialog', async dialog => {
      await dialog.accept();
    });
    await this.DeleteButton.click();
  }

  verifyTableIsEmpty = async () => {
    await expect(this.TableName).toHaveCount(0);
    await expect(this.TableEmail).toHaveCount(0);
    await expect(this.TableDateOfBirth).toHaveCount(0);
    await expect(this.TablePhoneNumber).toHaveCount(0);
    await expect(this.TableCountry).toHaveCount(0);
  }

  verifyAddedUserData = async () => {
    await expect(this.TableName).toHaveText(this.user.firstName + ' ' + this.user.lastName)
    await expect(this.TableEmail).toHaveText(this.user.email.toLowerCase())
    await expect(this.TableDateOfBirth).toHaveText(this.user.birthdate)
    await expect(this.TablePhoneNumber).toHaveText(this.user.phone)
    await expect(this.TableCountry).toHaveText(this.user.country)
  }
}