// ask the user to select a language
// ask the user for the loan amonunt
// ask the user for the APR
// ask the user for the loan duration
// calculate the payments and report on the loan details

const MESSAGES = require('./mortgage_calc_messages.json');
const readline = require('readline-sync');
const PERCENTAGE_TO_DECIMAL = 0.01;
const MONTHS_IN_YEAR = 12;

// GET language options then allow the user to select a language
const getLanguageOptions = () => {
  const languages = Object.keys(MESSAGES); // read available languages

  let languageOptions = ''; // language options to print
  let validLanguageOptions = []; // language options for the guard clause

  for (let counter = 0; counter < languages.length; counter += 1 ) {
    languageOptions += `=> ${counter + 1}) ${MESSAGES[languages[counter]].language}\n`;
    validLanguageOptions.push(counter + 1);
  }

  let languageData = {
    languages,
    languageOptions,
    validLanguageOptions
  };

  return languageData;
};

const getLanguage = () => {
  let languageData = getLanguageOptions();
  let { languages, languageOptions, validLanguageOptions } = languageData;

  console.clear();
  console.log(`=> Welcome to the Mortgage Calculator!`);
  console.log(`=> Select your language:`);
  console.log(languageOptions);

  let languageSelection = readline.question();

  while (!validLanguageOptions.includes(Number(languageSelection))) {
    console.log('Please enter a valid number (enter 1 for English):');
    languageSelection = readline.question();
  }

  return languages[languageSelection - 1];
};

const LANGUAGE = getLanguage();
let translate = msg => MESSAGES[LANGUAGE][msg];
let prompt = msg => console.log(`=> ${translate(msg)}`);

// General guard clause function(s)
let invalidNumber = num => {
  return Number.isNaN(Number(num)) || num.trim() === '';
};

let getYesOrNo = response => {
  let yesNoArray = [(translate('yesInitial')), (translate('noInitial'))];
  while (!yesNoArray.includes(response)) {
    prompt('yesNo');
    response = readline.question();
    response = response.toLowerCase();
  }
  return response.toLowerCase();
};

let getValidNumber = (msg, min = 0, max = Infinity) => {
  let num;
  do {
    prompt(msg);
    num = readline.question();
  } while (invalidNumber(num) || num < min || num > max);

  return Number(num);
};

// GET loan amount and validate
const getLoanAmount = () => {
  prompt('enterLoanAmount');
  let loanAmount = getValidNumber('enterOneOrGreater', 1);

  return loanAmount;
};

// GET APR and validate
const getAPR = () => {
  prompt('enterAPR');
  let interestAPR = getValidNumber('enterAPRRetry', 1, 50);

  interestAPR = Number(interestAPR) * PERCENTAGE_TO_DECIMAL;
  let interestRateMonthly = interestAPR / MONTHS_IN_YEAR;

  return interestRateMonthly;
};

// GET loan duration and validate
const getYearMonthArray = () => {
  let yearMonthArray;
  yearMonthArray = [translate('yearsInitial'), translate('monthsInitial')];

  return yearMonthArray;
}; // GET translated year and month initials for validation

const getLoanDuration = () => {
  prompt('selectYearsMonths');
  let loanDurationUnit = readline.question();
  while (!getYearMonthArray().includes(loanDurationUnit.toLowerCase())) {
    prompt('yearsMonthsRetry');
    loanDurationUnit = readline.question();
  }

  let loanDurationYears, loanDurationMonths;

  if (loanDurationUnit.toLowerCase() === translate('yearsInitial').toLowerCase()) {
    prompt('loanDurationYears');
    loanDurationYears = getValidNumber('enterOneOrGreater', 1);
  } else if (loanDurationUnit.toLowerCase() === translate('monthsInitial').toLowerCase()) {
    prompt('loanDurationMonths');
    loanDurationMonths = getValidNumber('enterOneOrGreater', 1);
  }

  if (loanDurationYears) {
    loanDurationMonths = loanDurationYears * 1;
  }

  return loanDurationMonths;
};

const calculateMortgage = () => {
  console.clear();
  prompt('welcome');
  // get inputs
  let loanAmount = getLoanAmount();
  let interestRateMonthly = getAPR();
  let loanDurationMonths = getLoanDuration();

  // calculate payment
  let monthlyPayment =
    loanAmount * (interestRateMonthly / (1 - Math.pow((1 + interestRateMonthly),
      (-loanDurationMonths))));

  let mortgageData = {
    loanAmount,
    interestRateMonthly,
    loanDurationMonths,
    monthlyPayment,
  };

  return mortgageData;
};

const mortgageReportGenerator = (mortgageData) => {
  let { loanAmount, interestRateMonthly, loanDurationMonths,
    monthlyPayment } = mortgageData;
  console.clear();
  prompt('loanReport');
  console.log('=> ' + translate('loanAmount') + loanAmount.toLocaleString('en-US', {maximumFractionDigits:2}));
  console.log('=> ' + translate('loanDuration') + loanDurationMonths + ' ' + translate('months'));
  console.log('=> ' + translate('aPR') + ((interestRateMonthly * 12 * 100).toFixed(3)) + '%');
  console.log('=> ' + translate('monthlyPayment') + monthlyPayment.toLocaleString('en-US', {maximumFractionDigits:2}));
  console.log('=> ' + translate('loanTotalCost') + ((monthlyPayment * loanDurationMonths).toLocaleString('en-US', {maximumFractionDigits:2})) + '\n');
};

(() => {
  let anotherCalc;

  do {
    let mortgageData = calculateMortgage();
    mortgageReportGenerator(mortgageData);

    prompt(`runAnotherCalc`);
    anotherCalc = getYesOrNo();
  } while (anotherCalc === translate('yesInitial'));

  prompt(`thanks`);
})();