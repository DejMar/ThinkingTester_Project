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

    retriveToken = async () => {
        const token = await getToken(loginDetails.firstName, loginDetails.lastName, loginDetails.email, loginDetails.password);
        return token
    }
}