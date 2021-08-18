exports.BasicCalculator = class BasicCalculator {
    constructor(page) {
        this.page = page;}

    async goto() {
        await this.page.goto('https://testsheepnz.github.io/BasicCalculator');
    }

    async setBuild(buildNumber) {
        await page.fill(secondNumberField, '15344.4');
        await page.selectOption('select[name="selectOperation"]', buildNumber);
        }
    
    async setNumberOne(number, buildNumber) {
        await page.fill(firstNumberField, number);
        }
    
    async setNumberTwo(number, buildNumber) {
        await page.fill(secondNumberField, number);
        }
    
    async setBothNumbers(number1, number2, buildNumber) {
        await page.fill(firstNumberField, number1);
        await page.fill(secondNumberField, number2);
        }
}