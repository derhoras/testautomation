const { test, expect } = require('@playwright/test');
const { BasicCalculator } = require('../pages/BasicCalculator')
//const startPage = "https://testsheepnz.github.io/BasicCalculator";
const buildField = "#selectBuild";
const errorField = "#errorMsgField";
const buildValues = ['0','1','2','3','4','5','6','7','8','9'];
const firstNumberField = "#number1Field";
const secondNumberField = "#number2Field";
const operationField = 'select[name="selectOperation"]';
const operationValues = ['0','1','2','3','4']; //add,substract,multiply,divide,concatenate
const calcButton = "#calculateButton";
const answerField = "#numberAnswerField";
const integerSelectTick = "#integerSelect";
const clearButton = "#clearButton";

test.describe('Basic calc test suite', () => {
    let page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
      startPage = new BasicCalculator(page);
  });
 test.beforeEach(async () => {
    await startPage.goto();
  });


    buildValues.forEach(buildValue => {
        test(`Checks that first field only takes maximum of 10 digits ${buildValue} `, async ({ page }) => {
        await startPage.setBuild(buildValue);
        await startPage.setBothNumbers('12345678901','1')
        await page.selectOption(operationField, '0');
        await page.click(calcButton);    
        const answerContent = await page.inputValue(answerField)
        expect(answerContent).toBe('1234567891');
    });
    });

    buildValues.forEach(buildValue => {
        test(`Checks that second field only takes maximum of 10 digits ${buildValue} `, async ({ page }) => {
        await startPage.setBuild(buildValue);
        await startPage.setBothNumbers('1','12345678901')
        await page.selectOption(operationField, '0');
        await page.click(calcButton);    
        const answerContent = await page.inputValue(answerField)
        expect(answerContent).toBe('1234567891');
    });
    });


    buildValues.forEach(buildValue => {
        test.only(`Checks that number one must be integer in ${buildValue} `, async ({ page }) => {
        await startPage.setBuild(buildValue);
        await startPage.setBothNumbers('blabla','4')
        await page.selectOption(operationField, '0');
        await page.click(calcButton);    
        const errorContent = await page.inputValue(errorField)
        expect(errorContent).toContain("Number 1 is not a number");
    });
    });


    buildValues.forEach(buildValue => {
        test(`Checks that number two must be integer in ${buildValue} `, async ({ page }) => {
        await startPage.setBuild(buildValue);
        await startPage.setBothNumbers('3','blabla')
        await page.selectOption(operationField, '0');
        await page.click(calcButton);    
        const errorContent = await page.inputValue(errorField)
        expect(errorContent).toContain("Number 2 is not a number");
    });
    });

    buildValues.forEach(buildValue => {
        test.only(`Checks that clear button works ${buildValue} `, async ({ page }) => {
        await startPage.setBuild(buildValue);
        await startPage.setBothNumbers('1','1')
        await page.selectOption(operationField, '0');
        await page.click(calcButton); 
        const answerContent = await page.inputValue(answerField)
        expect(answerContent).toBe('2');

        await page.click(clearButton);
        const answerContent2 = await page.inputValue(answerField)
        expect(answerContent2).toBe('');
    });
    });



    buildValues.forEach(buildValue => {
        test(`Checks that integer addition works fine in ${buildValue} `, async ({ page }) => {
        await startPage.setBuild(buildValue);
        await startPage.setBothNumbers('5','4')
        await page.selectOption(operationField, '0');
        await page.click(calcButton); 
        const answerContent = await page.inputValue(answerField)
        expect(answerContent).toBe('9');
    });
    });

    buildValues.forEach(buildValue => {
        test(`Checks that integer substraction works fine in ${buildValue} `, async ({ page }) => {
        await startPage.setBuild(buildValue);
        await startPage.setBothNumbers('9','-5')
        await page.selectOption(operationField, '1');
        await page.click(calcButton);
        const answerContent = await page.inputValue(answerField)
        expect(answerContent).toBe('14');
    });
    });

    buildValues.forEach(buildValue => {
        test.only(`Checks that integer multiplication works fine in ${buildValue} `, async ({ page }) => {
        await startPage.setBuild(buildValue);
        await startPage.setBothNumbers('5','4')
        await page.selectOption(operationField, '2');
        await page.click(calcButton);
        const answerContent = await page.inputValue(answerField)
        expect(answerContent).toBe('20');
    });
    });

    buildValues.forEach(buildValue => {
        test.only(`Checks that integer division works fine in ${buildValue} `, async ({ page }) => {
        await startPage.setBuild(buildValue);
        await startPage.setBothNumbers('20','6')
        await page.selectOption(operationField, '3');
        await page.click(calcButton);
        const answerContent = await page.inputValue(answerField)
        expect(answerContent).toBe('3.3333333333333335');
    });
    });


    buildValues.forEach(buildValue => {
        test.only(`Checks that integer concatination works fine in ${buildValue} `, async ({ page }) => {
        await startPage.setBuild(buildValue);
        await startPage.setBothNumbers('20','6')
        await page.selectOption(operationField, '4');
        await page.click(calcButton);
        const answerContent = await page.inputValue(answerField)
        expect(answerContent).toBe('206');
    });
    });


    buildValues.forEach(buildValue => {
        test(`Checks that INTEGERS ONLY tick with integer  addition works fine in ${buildValue} `, async ({ page }) => {
        await startPage.setBuild(buildValue);
        await startPage.setBothNumbers('112.6','11.8')
        await page.selectOption(operationField, '0');
        await page.click(integerSelectTick);
        await page.click(calcButton);
        const answerContent = await page.inputValue(answerField)
        expect(answerContent).toBe('124');
    });
    });

    buildValues.forEach(buildValue => {
        test(`Checks that INTEGERS ONLY tick with integer  substraction works fine in ${buildValue} `, async ({ page }) => {
        await startPage.setBuild(buildValue);
        await startPage.setBothNumbers('112.6','11.8')
        await page.selectOption(operationField, '1');
        await page.click(integerSelectTick);
        await page.click(calcButton);
        const answerContent = await page.inputValue(answerField)
        expect(answerContent).toBe('100');
    });
    });


    buildValues.forEach(buildValue => {
        test.only(`Checks that INTEGERS ONLY tick with integer  multiplication works fine in ${buildValue} `, async ({ page }) => {
        await startPage.setBuild(buildValue);
        await startPage.setBothNumbers('8.6','15344.4')
        await page.selectOption(operationField, '2');
        await page.click(integerSelectTick);
        await page.click(calcButton);
    
        const answerContent = await page.inputValue(answerField)
        expect(answerContent).toBe('131961');
    });
    });


    buildValues.forEach(buildValue => {
        test(`Checks that INTEGERS ONLY tick with integer  division works fine in ${buildValue} `, async ({ page }) => {
        await startPage.setBuild(buildValue);
        await startPage.setBothNumbers('44.7','8.1')
        await page.selectOption(operationField, '3');
        await page.click(integerSelectTick);
        await page.click(calcButton);
        const answerContent = await page.inputValue('#numberAnswerField')
        expect(answerContent).toBe('5');
    });
    });
});
