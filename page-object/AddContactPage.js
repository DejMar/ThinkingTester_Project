import { faker } from '@faker-js/faker';
import { expect } from '@playwright/test';

export class ContactPage {
  constructor(page) {
    this.page = page
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
    this.user = {};
    //Buttons
    this.AddContactButton = page.getByRole('button', { name: 'Add a New Contact' })
    this.ReturnToContactList = page.getByRole('button', { name: 'Return to Contact List' })
    this.EditButton = page.getByRole('button', { name: 'Edit' })
    this.SubmitButton = page.getByRole('button', { name: 'Submit' })
  }

  createRandomUser = async () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const birthday = faker.date.birthdate().toISOString().split('T')[0]
    const email = faker.internet.email({ firstName, lastName })
    const phone = faker.phone.number()
    const street1 = faker.location.streetAddress(false)
    const street2 = faker.location.secondaryAddress()
    const city = faker.location.city()
    const state = faker.location.state()
    const zipCode = faker.location.zipCode()
    const country = faker.location.country()

    this.user = {
      firstName,
      lastName,
      birthday,
      email,
      phone,
      street1,
      street2,
      city,
      state,
      zipCode,
      country,
    }
    return this.user
  }

  clickOnAddContacButton = async () => {
    await this.AddContactButton.click()
  }
  populateDataForNewUser = async () => {
    const user = await this.createRandomUser()
    await this.FirstName.fill(user.firstName)
    await this.LastName.fill(user.lastName)
    await this.DateOfBirth.fill(user.birthday)
    await this.Email.fill(user.email)
    await this.PhoneNumber.fill(user.phone)
    await this.Address1.fill(user.street1)
    await this.Address2.fill(user.street2)
    await this.City.fill(user.city)
    await this.StateOrProvince.fill(user.state)
    await this.ZipOrPostalCode.fill(user.zipCode)
    await this.Country.fill(user.country)
  }
  clickOnSubmitButton = async () => {
    await this.SubmitButton.waitFor()
    await this.SubmitButton.click()
  }
  verifyAddedUserData = async () => {
    await expect(this.TableName).toHaveText(this.user.firstName + ' ' + this.user.lastName)
    await expect(this.TableEmail).toHaveText(this.user.email.toLowerCase())
    await expect(this.TableDateOfBirth).toHaveText(this.user.birthday)
    await expect(this.TablePhoneNumber).toHaveText(this.user.phone)
    await expect(this.TableCountry).toHaveText(this.user.country)
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
}

