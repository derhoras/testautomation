const { test, expect } = require('@playwright/test');
const startPage = "https://testsheepnz.github.io/BasicCalculator";
const buildField = "#selectBuild";
const errorField = "#errorMsgField";
const buildValues = ['0','1','2','3','4','5','6','7','8','9'];
const firstNumberField = "#number1Field";
const secondNumberField = "#number2Field";
const operationField = "#selectOperationDropdown";
const operationValues = ['0','1','2','3','4']; //add,substract,multiply,divide,concatenate
const calcButton = "#calculateButton";
const answerField = "#numberAnswerField";
const integerSelectTick = "#integerSelect";
const clearButton = "#clearButton";

//TESTS FOR EVALUATION ARE IN 51, 87, 144, 179, 230 ROWS

//1st test MAX
buildValues.forEach(buildValue => {
    test(`Checks that first field only takes maximum of 10 digits ${buildValue} `, async ({ page }) => {
       console.log(buildValue)
       await page.goto(startPage);
       await page.selectOption('select[name="selectBuild"]', buildValue);
       await page.fill(firstNumberField, '12345678901');
       await page.fill(secondNumberField, '1');
       await page.selectOption('select[name="selectOperation"]', '0');
   
       await page.click(calcButton);
   
       const answerContent = await page.inputValue('#numberAnswerField')
       expect(answerContent).toBe('1234567891');
   });
});

//2nd test MAX
buildValues.forEach(buildValue => {
    test(`Checks that second field only takes maximum of 10 digits ${buildValue} `, async ({ page }) => {
       console.log(buildValue)
       await page.goto(startPage);
       await page.selectOption('select[name="selectBuild"]', buildValue);
       await page.fill(firstNumberField, '1');
       await page.fill(secondNumberField, '12345678901');
       await page.selectOption('select[name="selectOperation"]', '0');
   
       await page.click(calcButton);
   
       const answerContent = await page.inputValue('#numberAnswerField')
       expect(answerContent).toBe('1234567891');
   });
});


//FOR EVALUATION 1
//3rd test Num1 integer
buildValues.forEach(buildValue => {
    test.only(`Checks that number one must be integer in ${buildValue} `, async ({ page }) => {
       console.log(buildValue)
       await page.goto(startPage);
       await page.selectOption('select[name="selectBuild"]', buildValue);
       await page.fill(firstNumberField, 'blabla');
       await page.fill(secondNumberField, '4');
       await page.selectOption('select[name="selectOperation"]', '0');
       await page.click(calcButton);

       const errorContent = await page.textContent(errorField);
   
       expect(errorContent).toContain("Number 1 is not a number");
   });
});


//4th test Num2 integer
buildValues.forEach(buildValue => {
    test(`Checks that number two must be integer in ${buildValue} `, async ({ page }) => {
       console.log(buildValue)
       await page.goto(startPage);
       await page.selectOption('select[name="selectBuild"]', buildValue);
       await page.fill(firstNumberField, '3');
       await page.fill(secondNumberField, 'blabla');
       await page.selectOption('select[name="selectOperation"]', '0');
       await page.click(calcButton);

       const errorContent = await page.textContent(errorField);
   
       expect(errorContent).toContain("Number 2 is not a number");
   });
});

//FOR EVALUATION 2
//5th test Clear button
buildValues.forEach(buildValue => {
    test.only(`Checks that clear button works ${buildValue} `, async ({ page }) => {
       console.log(buildValue)
       await page.goto(startPage);
       await page.selectOption('select[name="selectBuild"]', buildValue);
       await page.fill(firstNumberField, '1');
       await page.fill(secondNumberField, '1');
       await page.selectOption('select[name="selectOperation"]', '0');
       await page.click(calcButton);

       const answerContent = await page.inputValue('#numberAnswerField')
       expect(answerContent).toBe('2');

       await page.click(clearButton);
       const answerContent2 = await page.inputValue('#numberAnswerField')
       expect(answerContent2).toBe('');
   });
});



//6th test OP1
buildValues.forEach(buildValue => {
    test(`Checks that integer addition works fine in ${buildValue} `, async ({ page }) => {
       console.log(buildValue)
       await page.goto(startPage);
       await page.selectOption('select[name="selectBuild"]', buildValue);
       await page.fill(firstNumberField, '5');
       await page.fill(secondNumberField, '4');
       await page.selectOption('select[name="selectOperation"]', '0');
   
       await page.click(calcButton);
   
       const answerContent = await page.inputValue('#numberAnswerField')
       expect(answerContent).toBe('9');
   });
});

//7th test OP2
buildValues.forEach(buildValue => {
    test(`Checks that integer substraction works fine in ${buildValue} `, async ({ page }) => {
       console.log(buildValue)
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