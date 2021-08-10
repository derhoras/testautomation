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

//pull req
