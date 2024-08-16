import { faker } from '@faker-js/faker/locale/en'
import fs from 'fs/promises';

export class SharedSteps {
    constructor(page) {
        this.page = page;
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

    async takeScreenshotOnFailure(page, testInfo) {
        if (testInfo.status !== 'passed') {
            const screenshotPath = `screenshots/${testInfo.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.png`;
            await page.screenshot({ path: screenshotPath, fullPage: true });
            console.log(`Screenshot saved: ${screenshotPath}`);
        }
    }

    async saveTestSteps(testTitle, steps) {
        const testName = testTitle.replace(/\s+/g, '_');
        const testResultsDir = 'test-results';
        await fs.mkdir(testResultsDir, { recursive: true });
        await fs.writeFile(`${testResultsDir}/${testName}_steps_${new Date().toISOString().split('T')[0]}.txt`, steps.join('\n'));
      }

    async createJsonFromTable(testTitle) {
        const tableRows = await this.page.locator('#myTable tr').all();
        const data = [];

        // Skip the header row
        for (let i = 1; i < tableRows.length; i++) {
            const row = tableRows[i];
            const cells = await row.locator('td').all();

            const rowData = {
                name: await cells[1].innerText(),
                dateOfBirth: await cells[2].innerText(),
                email: await cells[3].innerText(),
                phoneNumber: await cells[4].innerText(),
                addresses: await cells[5].innerText(),
                cityProvinanceZipCode: await cells[6].innerText(),
                country: await cells[7].innerText()
            };

            data.push(rowData);
        }

        const jsonData = JSON.stringify(data, null, 2);
        const sanitizedTestTitle = testTitle.replace(/\s+/g, '_');
        const fileName = `${sanitizedTestTitle}_table_data_${new Date().toISOString().split('T')[0]}.json`;
        const folderPath = 'data-result';
        const filePath = `${folderPath}/${fileName}`;

        await fs.mkdir(folderPath, { recursive: true });
        await fs.writeFile(filePath, jsonData);
        console.log(`JSON file created: ${filePath}`);

        return filePath;
    }
}