import { faker } from '@faker-js/faker/locale/en'

export class SharedSteps {
    constructor(page) {
        this.page = page;
    }

    async takeScreenshotOnFailure(page, testInfo) {
        if (testInfo.status !== 'passed') {
            const screenshotPath = `screenshots/${testInfo.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.png`;
            await page.screenshot({ path: screenshotPath, fullPage: true });
            console.log(`Screenshot saved: ${screenshotPath}`);
        }
    }

    generateUserData() {
        return {
            "firstName": faker.person.firstName(),
            "lastName": faker.person.lastName(),
            "birthdate": faker.date.birthdate().toISOString().split('T')[0],
            "email": faker.internet.email().toLowerCase(),
            "phone": faker.string.numeric(9),
            "street1": faker.location.streetAddress(),
            "street2": faker.location.streetAddress(),
            "city": faker.location.city(),
            "stateProvince": faker.location.state(),
            "postalCode": faker.location.zipCode(),
            "country": faker.location.country()
        };
    }
}