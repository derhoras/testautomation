const { test, expect } = require('@playwright/test');

const startPage = "https://testsheepnz.github.io/BasicCalculator";
const buildField = "#selectBuild";
const buildValues = ['0','1','2','3','4','5','6','7','8','9'];
const firstNumberField = "#number1Field";
const secondNumberField = "#number2Field";
const operationField = "#selectOperationDropdown";
const operationValues = ['0','1','2','3','4']; //add,substract,multiply,divide,concatenate
const calcButton = "#calculateButton";
const answerField = "#numberAnswerField";
const integerSelectTick = "#integerSelect";
const clearButton = "#clearButton";



test.only('Checks that integer addition works fine in ', async ({ page }) => {
    await page.goto(startPage);

    await page.selectOption('select[name="selectBuild"]', buildValues[2]);
    await page.fill(firstNumberField, '5');
    await page.fill(secondNumberField, '4');
    await page.selectOption('select[name="selectOperation"]', '2');

     await page.click(calcButton);

    //const answerContent = await page.textContent('input#numberAnswerField.element.text.medium')
    //const answerContent = await page.evaluate(() => Array.from(document.querySelectorAll('#numberAnswerField'), element => element.textContent));
    const answerContent = await page.inputValue('#numberAnswerField')
    //const answerContent = document.querySelectorAll('#numberAnswerField')
    //const answerContent = await page.getAttribute('input#numberAnswerField.element.text.medium', 'value');
    expect(answerContent).toBe('20');
    //expect(answerContent[0]).toBe('20');
});



buildValues.forEach(buildValue => {
     test(`Checks that integer addition works fine in ${buildValue}`, async ({ page }) => {

       await page.goto(startPage);
    
        await page.selectOption('select[name="selectBuild"]', buildValue);
        await page.fill(firstNumberField, '5');
        await page.fill(secondNumberField, '4');
        await page.selectOption('select[name="selectOperation"]', '2');
    
        await page.click(calcButton);
    
        const answerContent = await page.textContent('input#numberAnswerField.element.text.medium')
        expect(answerContent).toBe('20');
    });
});