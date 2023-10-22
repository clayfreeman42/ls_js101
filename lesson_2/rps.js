
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
const getPlayerSelection = () => {
  let playerChoice;

  let shortChoices = VALID_CHOICES.map(playerChoice => playerChoice[0]);
  prompt(`Choose one (first letter only - case sensitive):\n ${VALID_CHOICES.join(', ')} `);
  playerChoice = readline.question();

  while (!shortChoices.includes(playerChoice)) {
    prompt(`Please select the first letter only:\n ${VALID_CHOICES.join(', ')}`);
    playerChoice = readline.question();
  }

  let indexOfChoice = shortChoices.indexOf(playerChoice);
  playerChoice = VALID_CHOICES[indexOfChoice];

  return playerChoice;
};

const getComputerSelection = () => {
  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];

  return computerChoice;
};

const getYOrN = response => {
  while (!['y', 'n'].includes(response)) {
    prompt('y or n');
    response = readline.question().toLowerCase();
  }
  return response;
};

// Outputs
const gameReportGenerator = (results, priorGameData) => {
  let { playerChoice, computerChoice, rule, outcome } = results;

  console.clear();

  prompt(`You chose ${playerChoice}. The computer chose ${computerChoice}.`);
  prompt(`${rule}\n`);
  prompt(`${outcome}`);
  if ('numGames' in priorGameData ) {
    prompt(`Game ${priorGameData.numGames + 1}.\n`);
  }
};

const bestOfFiveReportGenerator = (gameInfo) => {
  let {numGames, playerWins, computerWins, ties } = gameInfo;
  prompt('The Best Out of Five Match has concluded.\n');
  if ( playerWins > computerWins ) {
    prompt('You won the match!');
    prompt(`You won with ${playerWins} win(s) vs the computer with ${computerWins} win(s).\n`);
  } else if (playerWins < computerWins) {
    prompt('You lost :(');
    prompt(`The computer won the match with ${computerWins} wins vs your ${playerWins} wins.\n`);
  } else {
    prompt(`It was a tie with ${playerWins} each.\n`);
  }
  prompt(`${numGames} games were played to reach a winner with ${ties} tie(s).\n`);
};

// Best of five functions
// keep a maximum of five results from previous games
const scoreTracker = (scores, result) => {
  if (scores.length < 5) {
    scores.unshift(result);
  } else {
    scores.unshift(result);
    scores.pop();
  }
  return scores;
};

// count users wins out of number of games, up to five
const gameCounter = (arr, data) => {

  arr.forEach(game => {
    if (game === `You've won the game!\n`) {
      data.playerWins += 1;

    } else if (game === `The computer won the game.\n`) {
      data.computerWins += 1;

    } else {
      data.ties += 1;
    }

    if (data.playerWins >= 3 || data.computerWins >= 3
      || data.numGames >= 5) {
      data.active = false;
    } else {
      data.active = true;
    }
  });

  return data;
};

const calcBestOfFive = gamesArray => {
  let gamesData = {
    playerWins: 0,
    computerWins: 0,
    ties: 0,
    numGames: gamesArray.length
  };

  return gameCounter(gamesArray, gamesData);
};

// Main game functions
const ruleTest = (counter, choiceA, choiceB) => {
  return (RULES[counter][0] === choiceA && RULES[counter][1] === choiceB);
};

const determineWinner = (gameData) => {
  let { playerChoice, computerChoice } = gameData;

  for (let index = 0; index < RULES.length; index += 1) {
    if (playerChoice === computerChoice) {
      gameData.rule = `It's a tie game!`;
      gameData.outcome = `Great minds (and programs) think alike!\n`;
      break;

    } else if (ruleTest(index, playerChoice, computerChoice)) {
      gameData.rule = RULES[index][2];
      gameData.outcome = `You've won the game!\n`;
      break;

    } else if (ruleTest(index, computerChoice, playerChoice)) {
      gameData.rule = RULES[index][2];
      gameData.outcome = `The computer won the game.\n`;
      break;
    }
  }
  console.log(gameData);
  return gameData;
};

let rpsGame = flag => {
  let gameResults = {};
  gameResults.playerChoice = getPlayerSelection(flag);
  gameResults.computerChoice = getComputerSelection();
  gameResults = determineWinner(gameResults);

  return gameResults;
};

// Game orchestration
const bestOfFiveOrchestrator = (scoresArr) => {
  let bestOfFiveObj = calcBestOfFive(scoresArr);

  if (bestOfFiveObj.active === false) {
    bestOfFiveReportGenerator(bestOfFiveObj);
  }

  return bestOfFiveObj;
};

const firstGamePrompt = bestOfFiveFlag => {
  if (bestOfFiveFlag === '') {
    console.clear();
    prompt(`Welcome to Rock, Paper, Scissors, Lizard, Spock!\n`);
  }
};

(() => {
  let scoresArray = [];
  let playBestOfFive = '';
  let bestOfFiveData = {};

  do {
    firstGamePrompt(playBestOfFive);

    let game = rpsGame(playBestOfFive);
    scoresArray = scoreTracker(scoresArray, game.outcome);

    gameReportGenerator(game, bestOfFiveData);

    if (playBestOfFive === '') {
      prompt(`Best out of five?`);
      playBestOfFive = getYOrN();
      console.clear();
    }

    if (playBestOfFive === 'y') {
      bestOfFiveData = bestOfFiveOrchestrator(scoresArray);
    }

  } while (playBestOfFive === 'y' && bestOfFiveData.active === true);

  prompt(`Thanks for playing Rock, Paper, Scissors, Lizard, Spock!`);
})();
