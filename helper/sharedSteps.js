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
}