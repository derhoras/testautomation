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
    const answerContent = await page.evaluate(() => Array.from(document.querySelectorAll('#numberAnswerField'), element => element.textContent));
    //const answerContent = document.querySelectorAll('#numberAnswerField')
    //const answerContent = await page.getAttribute('input#numberAnswerField.element.text.medium', 'value');
    expect(answerContent).toBe('20');
    //expect(answerContent[0]).toBe('20');
});



buildValues.forEach(buildValue => {
     test(`Checks that integer addition works fine in ${buildValue}`, async ({ page }) => {

       await page.goto(startPage);
       await page.selectOption('select[name="selectBuild"]', buildValue);
       await page.fill(firstNumberField, '9');
       await page.fill(secondNumberField, '-5');
       await page.selectOption('select[name="selectOperation"]', '1');
   
       await page.click(calcButton);
   
       const answerContent = await page.inputValue('#numberAnswerField')
       expect(answerContent).toBe('14');
   });
});

//FOR EVALUATION 3
//8th test OP3
buildValues.forEach(buildValue => {
    test.only(`Checks that integer multiplication works fine in ${buildValue} `, async ({ page }) => {
       console.log(buildValue)
       await page.goto(startPage);
       await page.selectOption('select[name="selectBuild"]', buildValue);
       await page.fill(firstNumberField, '5');
       await page.fill(secondNumberField, '4');
       await page.selectOption('select[name="selectOperation"]', '2');
   
       await page.click(calcButton);
   
       const answerContent = await page.inputValue('#numberAnswerField')
       expect(answerContent).toBe('20');
   });
});

//9th test OP4
buildValues.forEach(buildValue => {
    test.only(`Checks that integer division works fine in ${buildValue} `, async ({ page }) => {
       console.log(buildValue)
       await page.goto(startPage);
       await page.selectOption('select[name="selectBuild"]', buildValue);
       await page.fill(firstNumberField, '20');
       await page.fill(secondNumberField, '6');
       await page.selectOption('select[name="selectOperation"]', '3');
   
       await page.click(calcButton);
   
       const answerContent = await page.inputValue('#numberAnswerField')
       expect(answerContent).toBe('3.3333333333333335');
   });
});

//FOR EVALUATION 4
//10th test OP5
buildValues.forEach(buildValue => {
    test.only(`Checks that integer concatination works fine in ${buildValue} `, async ({ page }) => {
       console.log(buildValue)
       await page.goto(startPage);
       await page.selectOption('select[name="selectBuild"]', buildValue);
       await page.fill(firstNumberField, '20');
       await page.fill(secondNumberField, '6');
       await page.selectOption('select[name="selectOperation"]', '4');
       await page.click(calcButton);

       const answerContent = await page.inputValue('#numberAnswerField')
       expect(answerContent).toBe('206');
   });
});

//11th test OP1 INTEGERS ONLY
buildValues.forEach(buildValue => {
    test(`Checks that INTEGERS ONLY tick with integer  addition works fine in ${buildValue} `, async ({ page }) => {
       console.log(buildValue)
       await page.goto(startPage);
       await page.selectOption('select[name="selectBuild"]', buildValue);
       await page.fill(firstNumberField, '112.6');
       await page.fill(secondNumberField, '11.8');
       await page.selectOption('select[name="selectOperation"]', '0');
       await page.click(integerSelectTick);
       await page.click(calcButton);
   
       const answerContent = await page.inputValue('#numberAnswerField')
       expect(answerContent).toBe('124');
   });
});

//12th test OP2 INTEGERS ONLY
buildValues.forEach(buildValue => {
    test(`Checks that INTEGERS ONLY tick with integer  substraction works fine in ${buildValue} `, async ({ page }) => {
       console.log(buildValue)
       await page.goto(startPage);
       await page.selectOption('select[name="selectBuild"]', buildValue);
       await page.fill(firstNumberField, '112.6');
       await page.fill(secondNumberField, '11.8');
       await page.selectOption('select[name="selectOperation"]', '1');
       await page.click(integerSelectTick);
       await page.click(calcButton);
   
       const answerContent = await page.inputValue('#numberAnswerField')
       expect(answerContent).toBe('100');
   });
});

//FOR EVALUATION 5
//13th test OP3 INTEGERS ONLY
buildValues.forEach(buildValue => {
    test.only(`Checks that INTEGERS ONLY tick with integer  multiplication works fine in ${buildValue} `, async ({ page }) => {
       console.log(buildValue)
       await page.goto(startPage);
       await page.selectOption('select[name="selectBuild"]', buildValue);
       await page.fill(firstNumberField, '8.6');
       await page.fill(secondNumberField, '15344.4');
       await page.selectOption('select[name="selectOperation"]', '2');
       await page.click(integerSelectTick);
       await page.click(calcButton);
   
       const answerContent = await page.inputValue('#numberAnswerField')
       expect(answerContent).toBe('131961');
   });
});


//14th test OP4 INTEGERS ONLY
buildValues.forEach(buildValue => {
    test(`Checks that INTEGERS ONLY tick with integer  division works fine in ${buildValue} `, async ({ page }) => {
       console.log(buildValue)
       await page.goto(startPage);
       await page.selectOption('select[name="selectBuild"]', buildValue);
       await page.fill(firstNumberField, '44.7');
       await page.fill(secondNumberField, '8.1');
       await page.selectOption('select[name="selectOperation"]', '3');
       await page.click(integerSelectTick);
       await page.click(calcButton);
   
       const answerContent = await page.inputValue('#numberAnswerField')
       expect(answerContent).toBe('5');
   });
});


// //juodrastis
// test('Checks that integer addition works fine in ', async ({ page }) => {
//     await page.goto(startPage);

//     await page.selectOption('select[name="selectBuild"]', buildValues[2]);
//     await page.fill(firstNumberField, '5');
//     await page.fill(secondNumberField, '4');
//     await page.selectOption('select[name="selectOperation"]', '2');
//     await page.click(calcButton);
//     const answerContent = await page.inputValue('#numberAnswerField')
//     expect(answerContent).toBe('9');
// });
   
        await page.selectOption('select[name="selectBuild"]', buildValue);
        await page.fill(firstNumberField, '5');
        await page.fill(secondNumberField, '4');
        await page.selectOption('select[name="selectOperation"]', '2');
    
        await page.click(calcButton);
    
        const answerContent = await page.textContent('input#numberAnswerField.element.text.medium')
        expect(answerContent).toBe('20');
    });
});

