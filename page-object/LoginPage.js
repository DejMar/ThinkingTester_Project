import { loginDetails } from "../data/userData.js"
import { getToken } from "../helper/helper.js"

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

    registerUser = async () => {
        await this.signUpButton.click()
        await this.signUpFirstName.fill(loginDetails.firstName)
        await this.signUpLastName.fill(loginDetails.lastName)
        await this.emailInput.fill(loginDetails.email)
        await this.signUpPassword.fill(loginDetails.password)
        await this.submitButton.click()
    }

    loginWithRegisteredUser = async () => {
        await this.emailField.fill(loginDetails.email)
        await this.passwordField.fill(loginDetails.password)
        await this.submitButton.click()
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