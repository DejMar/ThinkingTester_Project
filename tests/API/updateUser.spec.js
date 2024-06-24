import { LoginPage } from "../../page-object/LoginPage";
import { ContactPage } from "../../page-object/AddContactPage";
import { expect, test } from '@playwright/test';

test.describe('API - Manipulating users', () => {
    let loginPage
    let contactPage
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        contactPage = new ContactPage(page)
    })

    test('API - Add New User', async ({ request, page }) => {
        //await contactPage.addUserThroughAPI()
        const response = await request.post("https://thinking-tester-contact-list.herokuapp.com/contacts", {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjViNDYxY2ExZjk4MTAwMTNlZmQ1ZDMiLCJpYXQiOjE3MTcyNTc3NTZ9.lecYBwOycLlt8Ll7v5bCyANtTcw1ev1YHcfQE59PzLY",
        },    
        
        data: { 
                firstName: 'John',
                lastName: 'Doe',
                birthdate: '1990-01-01',
                email: 'uQ0tQ@example.com',
            }
        })
        expect(response.status()).toBe(201)
        expect(response.json().toContain(expect.objectContaining({
            firstName: 'John',
            lastName: 'Doe',
            birthdate: '1990-01-01',
            email: 'uQ0tQ@example.com',
        })))

    })

    test('API - Get Token', async ({ page }) => {
        await loginPage.retriveToken()
    })
})
