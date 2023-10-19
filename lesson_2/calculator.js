// ask the user for the first number
// ask the user for the second number
// ask the user for the operation
// perform the operation
// display the result
// allow the user to request or decline another calculation

const MESSAGES = require('./calculator_messages.json');
const LANGUAGE = 'en';
const readline = require('readline-sync');

function messages(message, lang = 'en') {
  return MESSAGES[lang][message];
}

function prompt(msg) {
  let message = messages(msg, LANGUAGE);
  console.log(`=> ${message}`);
}

function invalidNumber(num) {
  return num.trimStart() === '' || Number.isNaN(Number(num));
}

// request the user enter an operand and validate the input
let operandInput = msg => {
  prompt(msg);
  let number = readline.question();
  while (invalidNumber(number)) {
    prompt('notValidNumber');
    number = readline.question();
  }
  return number;
};

// call the operandInput function twice to collect the operands and
// request user enter the operation with validation
let calculatorInput = () => {
  let number1 = operandInput('firstNum');
  let number2 = operandInput('secondNum');

  prompt('selectOperation');
  let operation = readline.question();

  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt('mustChooseOperation');
    operation = readline.question();
  }

  return { operand1: number1, operand2: number2, operation: operation };

};


// call calculatorInput function to collect the inputs
// and run the calculation
let performCalculation = () => {

  let input = calculatorInput();

  let output;

  switch (input.operation) {
    case '1':
      output = Number(input.operand1) + Number(input.operand2);
      break;
    case '2':
      output = Number(input.operand1) - Number(input.operand2);
      break;
    case '3':
      output = Number(input.operand1) * Number(input.operand2);
      break;
    case '4':
      output = Number(input.operand1) / Number(input.operand2);
      break;
  }

  console.log(MESSAGES[LANGUAGE].result + output);

};


// call the performCalculation function and allow the user to request
// another calculation
console.clear();
prompt('welcome');

let anotherCalc;

do {
  performCalculation();

  prompt('anotherCalc');

  anotherCalc = readline.question().toUpperCase();

  while (![MESSAGES[LANGUAGE].y, MESSAGES[LANGUAGE].n]
    .includes(anotherCalc)) {
    prompt('mustChooseAnother');
    anotherCalc = readline.question().toUpperCase();
  }
  console.clear();

} while (anotherCalc === MESSAGES[LANGUAGE].y);

prompt('thanks');