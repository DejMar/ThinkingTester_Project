import { loginDetails } from "../helper/userData.js"
import { getToken } from "../helper/helper.js"
import { warningMessages } from "../helper/messages.js"
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
        this.errorElement = page.locator('span#error');
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

    verifyInvalidCredentialsMessage = async (message) => {
        await expect(this.errorElement).toHaveText(message);
        console.log(message)
    }

    confirmLogoutButtonDisplayed = async () => {
        await this.logoutButton.waitFor({ state: 'visible' });
        return this.logoutButton.isVisible();
    }

    clickOnLogoutButton = async () => {
        await this.logoutButton.click()
    }

    retriveToken = async (firstName, lastName, email, password) => {
        const token = await getToken(firstName, lastName, email, password);
        return token
    }
}