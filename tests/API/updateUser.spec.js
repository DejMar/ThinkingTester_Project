import { LoginPage } from "../../page-object/LoginPage";
import { ContactPage } from "../../page-object/AddContactPage";
import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/en'

const BASE_URL_API = "https://thinking-tester-contact-list.herokuapp.com";

test.describe('API - Manipulating users', () => {
    let loginPage
    let contactPage
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        contactPage = new ContactPage(page)
    })

    test('API - Get Token', async ({ page }) => {
        const token = await loginPage.retriveToken();
        console.log(token)
    })

    test('API - Verify Added user', async ({ request }) => {
        const token = await loginPage.retriveToken();

        const userData = {
            "firstName": faker.person.firstName(),
            "lastName": faker.person.lastName(),
            "birthdate": faker.date.birthdate().toISOString().split('T')[0],
            "email": faker.internet.email().toLowerCase(),
            "phone": faker.phone.number(),
            "street1": faker.location.streetAddress(),
            "street2": faker.location.streetAddress(),
            "city": faker.location.city(),
            "stateProvince": faker.location.state(),
            "postalCode": faker.location.zipCode(),
            "country": faker.location.country()
        };

        const response = await request.post(`${BASE_URL_API}/contacts`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            data: userData
        });
        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        expect(responseBody).toEqual(expect.objectContaining(userData));
    })

    test('API - Verify Updated user', async ({ request }) => {
    const token = await loginPage.retriveToken();
    // First, create a new user to update
    const userData = {
        "firstName": faker.person.firstName(),
        "lastName": faker.person.lastName(),
        "birthdate": faker.date.birthdate().toISOString().split('T')[0],
        "email": faker.internet.email().toLowerCase(),
        "phone": faker.phone.number(),
        "street1": faker.location.streetAddress(),
        "street2": faker.location.streetAddress(),
        "city": faker.location.city(),
        "stateProvince": faker.location.state(),
        "postalCode": faker.location.zipCode(),
        "country": faker.location.country()
    };

    const createResponse = await request.post(`${BASE_URL_API}/contacts`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        data: userData
    });
    expect(createResponse.status()).toBe(201);
    const createdUser = await createResponse.json();

    // Update the created user
    const updatedUserData = {
        ...userData,
        "firstName": faker.person.firstName(),
        "lastName": faker.person.lastName(),
        "email": faker.internet.email().toLowerCase()
    };

    const updateResponse = await request.put(`${BASE_URL_API}/contacts/${createdUser._id}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        data: updatedUserData
    });
    expect(updateResponse.status()).toBe(200);
    const updatedUser = await updateResponse.json();
    expect(updatedUser).toEqual(expect.objectContaining(updatedUserData));
    })

    test('API - Verify Deleted user', async ({ request }) => {
    const token = await loginPage.retriveToken();

    // First, create a new user to delete
    const userData = {
        "firstName": faker.person.firstName(),
        "lastName": faker.person.lastName(),
        "birthdate": faker.date.birthdate().toISOString().split('T')[0],
        "email": faker.internet.email().toLowerCase(),
        "phone": faker.phone.number(),
        "street1": faker.location.streetAddress(),
        "street2": faker.location.streetAddress(),
        "city": faker.location.city(),
        "stateProvince": faker.location.state(),
        "postalCode": faker.location.zipCode(),
        "country": faker.location.country()
    };

    const createResponse = await request.post(`${BASE_URL_API}/contacts`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        data: userData
    });
    expect(createResponse.status()).toBe(201);
    const createdUser = await createResponse.json();

    // Delete the created user
    const deleteResponse = await request.delete(`${BASE_URL_API}/contacts/${createdUser._id}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    expect(deleteResponse.status()).toBe(200);

    // Verify the user is deleted
    const getResponse = await request.get(`${BASE_URL_API}/contacts/${createdUser._id}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    expect(getResponse.status()).toBe(404);
    })
})
