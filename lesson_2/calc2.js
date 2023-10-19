//  ask the user for the first number
// ask the user for the second number
// ask the user for the operation
// perform the operation
// display the result

const readline = require('readline-sync');

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function invalidNum(num) {
  return num.trim() === '' || Number.isNaN(Number(num));
}

prompt('Welcome to the Calculator!');
prompt('Enter the first number:');
let firstNum = readline.question();

while (invalidNum(firstNum)) {
  prompt('Hmm... enter a valid number:');
  firstNum = readline.question();
}

prompt('Enter the second number:');
let secondNum = readline.question();

while (invalidNum(secondNum)) {
  prompt('Hmm... enter a valid number:');
  secondNum = readline.question();
}

prompt('Select the operation:\n 1) Addition 2) Subtraction 3) Multiplication 4) Division');
let operation = readline.question();

while (!['1','2', '3', '4',].includes(operation)) {
  prompt('Please select an operation number:')
  operation = readline.question();
}

let result;

switch (operation) {
  case '1':
    result = firstNum + secondNum;
    break;
  case '2':
    result = firstNum - secondNum;
    break;
  case '3':
    result = firstNum * secondNum;
    break;
  case '4':
    result = firstNum / secondNum;
    break;
}

prompt(`The answer is: ${result}`);