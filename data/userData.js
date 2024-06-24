import { faker } from '@faker-js/faker/locale/en'

export const loginDetails = {
    password: "admin123",
    firstName: faker.person.firstName(),
    middleName: faker.person.middleName(),
    lastName: faker.person.lastName(),
    id: faker.finance.accountNumber(),
    email: faker.internet.email()
}