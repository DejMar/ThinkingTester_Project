import { faker } from '@faker-js/faker/locale/en'
import fs from 'fs/promises';
import path from 'path';

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

  async compareAtributesJsonFiles(filePath1, fileName1, filePath2, fileName2, dob, email, phone) {
    const fullFilePath1 = path.join(__dirname, filePath1, fileName1);
    const fullFilePath2 = path.join(__dirname, filePath2, fileName2);

    const file1 = JSON.parse(await fs.readFile(fullFilePath1, 'utf8'));
    const file2 = JSON.parse(await fs.readFile(fullFilePath2, 'utf8'));

    const compareFields = [dob, email, phone];

    const areEqual = file1.length === file2.length && file1.every((item1, index) => {
      const item2 = file2[index];
      return compareFields.every(field => item1[field] === item2[field]);
    });

    return areEqual;
  }

  async compareJsonFiles(filePath1, fileName1, filePath2, fileName2) {
    const fullFilePath1 = path.join(__dirname, filePath1, fileName1);
    const fullFilePath2 = path.join(__dirname, filePath2, fileName2);

    const file1 = JSON.parse(await fs.readFile(fullFilePath1, 'utf8'));
    const file2 = JSON.parse(await fs.readFile(fullFilePath2, 'utf8'));

    return JSON.stringify(file1) === JSON.stringify(file2);
  }

  getFormattedDesignatedUsers(dataFolder, fileName) {
    const fs = require('fs');
    const path = require('path');
    
    const filePath = path.join(__dirname, '..', dataFolder, fileName);
    const designatedUsers = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    return designatedUsers.map(user => ({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      birthdate: user.dateOfBirth,
      phone: user.phoneNumber,
      country: user.country
    }));
  }
}