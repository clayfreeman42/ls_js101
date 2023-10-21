
const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'Spock'];
const RULES = [
  ['scissors', 'paper', 'Scissors cut paper!'],
  ['paper', 'rock', 'Paper covers rock!'],
  ['rock', 'lizard', 'Rock crushes lizard!'],
  ['lizard', 'Spock', 'Lizard poisons Spock!'],
  ['Spock', 'scissors', 'Spock smashes scissors!'],
  ['scissors', 'lizard', 'Scissors decapitate lizard!'],
  ['lizard', 'paper', 'Lizard eats paper!'],
  ['paper', 'Spock', 'Paper disproves Spock!'],
  ['Spock', 'rock', 'Spock vaporizes rock!'],
  ['rock', 'scissors', 'Rock smashes scissors!'],
];

const prompt = msg => console.log(`=> ${msg}`);

// Inputs
const getUserSelection = () => {
  let choice;
  let shortChoices = VALID_CHOICES.map(choice => choice[0]);
  prompt(`Choose one (first letter only - case sensitive):\n ${VALID_CHOICES.join(', ')} `);
  choice = readline.question();

  while (!shortChoices.includes(choice)) {
    prompt("Not a valid choice");
    choice = readline.question();
  }

  let indexOfChoice = shortChoices.indexOf(choice);
  choice = VALID_CHOICES[indexOfChoice];

  return choice;
};

const getComputerSelection = () => {
  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];

  return computerChoice;
};

const getYOrN = response => {
  let yesNoArray = ['y', 'n'];
  while (!yesNoArray.includes(response)) {
    prompt('y or n');
    response = readline.question();
    response = response.toLowerCase();
  }
  return response.toLowerCase();
};

// Outputs
// keep a maximum of five results from previous games
const updateScores = (scores, result) => {
  if (scores.length < 5) {
    scores.unshift(result);
  } else {
    scores.unshift(result);
    scores.pop();
  }
  return scores;
};

// count users wins out of number of games, up to five
const calcUserWins = (gameOutcomes) => {
  let userWinCounter = 0;
  let gamesPlayed = gameOutcomes.length;

  for (let outcome of gameOutcomes) {
    if (outcome === `You've won!\n`) {
      userWinCounter += 1;
    }
  }
  return `You've won ${userWinCounter} game(s) out of the last ${gamesPlayed}.`;
};

const reportGameResults = (results) => {
  let { userChoice, computerChoice, rule, outcome, scoreBoard } = results;

  prompt(`You chose ${userChoice}. The computer chose ${computerChoice}.`);
  prompt(`${rule}\n`);
  prompt(`${outcome}`);
  prompt(`${scoreBoard}\n`);
};

// Main game functions
const ruleTest = (counter, choiceA, choiceB) => {
  return (RULES[counter][0] === choiceA && RULES[counter][1] === choiceB);
};

const determineWinner = (choice, computerChoice) => {
  let result = {};

  for (let index = 0; index < RULES.length; index += 1) {
    if (choice === computerChoice) {
      result.rule = `It's a tie!`;
      result.outcome = `Great minds (and programs) think alike!\n`;
      break;

    } else if (ruleTest(index, choice, computerChoice)) {
      result.rule = RULES[index][2];
      result.outcome = `You've won!\n`;
      break;

    } else if (ruleTest(index, computerChoice, choice)) {
      result.rule = RULES[index][2];
      result.outcome = `The computer won.\n`;
      break;
    }
  }
  return result;
};

let rpsGame = () => {
  let userSelection = getUserSelection();
  let computerSelection = getComputerSelection();

  let gameResults = determineWinner(userSelection, computerSelection);
  gameResults.userChoice = userSelection;
  gameResults.computerChoice = computerSelection;

  return gameResults;
};

// Game orchestration
(() => {
  let playAgain = '';
  let scoreKeeper = [];

  do {
    console.clear();
    prompt(`Welcome to Rock, Paper, Scissors, Lizard, Spock!\n`);

    let game = rpsGame();
    scoreKeeper = updateScores(scoreKeeper, game.outcome);
    game.scoreBoard = calcUserWins(scoreKeeper);

    reportGameResults(game);

    prompt(`Would you like to play again`);
    playAgain = getYOrN();

  } while (playAgain === `y`);

  prompt(`Thanks for playing Rock, Paper, Scissors, Lizard, Spock!`);
})();
