import { loginDetails } from "../data/userData.js"
import { getToken } from "../helper/helper.js"
import { warningMessages } from "../data/messages.js"
import { expect } from "@playwright/test"


export class LoginPage {

    constructor(page) {
        this.page = page;
        this.emailInput = page.getByPlaceholder("Email")
        this.passwordInput = page.getByPlaceholder("Password")
        this.submitButton = page.getByRole("button", { name: "Submit" })
        this.signUpButton = page.getByRole('button', { name: 'Sign up' })
        this.signUpFirstName = page.getByPlaceholder('First Name')
        this.signUpLastName = page.getByPlaceholder('Last Name')
        this.signUpPassword = page.getByPlaceholder('Password')
        this.logoutButton = page.getByRole('button', { name: 'Logout' })
        this.emailField = page.getByPlaceholder('Email')
        this.passwordField = page.getByPlaceholder('Password')
    }
    openURL = async () => {
        await this.page.goto('/')
    }

    registerUser = async (firstName, lastName, email, password) => {
        await this.signUpButton.click()
        await this.signUpFirstName.fill(firstName)
        await this.signUpLastName.fill(lastName)
        await this.emailInput.fill(email)
        await this.signUpPassword.fill(password)
        await this.submitButton.click()
    }

    loginWithRegisteredUser = async (email, password) => {
        await this.emailField.fill(email)
        await this.passwordField.fill(password)
        await this.submitButton.click()
    }

    verifyInvalidCredentialsMessage = async () => {
        const errorElement = this.page.locator('span#error');
        await expect(errorElement).toHaveText(warningMessages.invalidCredentials);
    }

    verifyInvalidEmailMessage = async () => {
        const errorElement = this.page.locator('span#error');
        await expect(errorElement).toHaveText(warningMessages.invalidEmail);
    }

    verifyInvalidPasswordMessage = async () => {
        const errorElement = this.page.locator('span#error');
        await expect(errorElement).toHaveText(warningMessages.invalidPassword);
    }

    confirmLogoutButtonDisplayed = async () => {
        await this.logoutButton.waitFor({ state: 'visible' });
        return this.logoutButton.isVisible();
    }

    clickOnLogoutButton = async () => {
        await this.logoutButton.click()
    }

    retriveToken = async () => {
        const token = await getToken(loginDetails.firstName, loginDetails.lastName, loginDetails.email, loginDetails.password);
        return token
    }
}