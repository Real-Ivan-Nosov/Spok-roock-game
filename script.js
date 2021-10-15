import { startConfetti, stopConfetti, removeConfetti } from "./confetti.js";

const playerScoreEl = document.getElementById('playerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerScoreEl = document.getElementById('computerScore');
const computerChoiceEl = document.getElementById('computerChoice');
const resultText = document.getElementById('resultText');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');

const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');

const allGameIcons = document.querySelectorAll('.far');

const rulesBtn = document.getElementById('rulesButton');
const gameContainer = document.getElementById('gameContainer');
const popup = document.getElementById('popup');

const choices = {
  rock: {
    name: 'Rock',
    defeats: ['scissors', 'lizard']
  },
  paper: {
    name: 'Paper',
    defeats: ['rock', 'spock']
  },
  scissors: {
    name: 'Scissors',
    defeats: ['paper', 'lizard']
  },
  lizard: {
    name: 'Lizard',
    defeats: ['paper', 'spock']
  },
  spock: {
    name: 'Spock',
    defeats: ['scissors', 'rock']
  },
};

let playerScoreNumber = 0;
let computerScoreNumber = 0;
let computerChoice = '';

// Reset all 'selected' icons
const resetSelected = () => {
  allGameIcons.forEach((icon) => {
    icon.classList.remove('selected');
  });
  stopConfetti();
  removeConfetti();
}

// Reset Score & playerChoice/computerChoice
const resetAll = () => {
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  playerScoreEl.textContent = playerScoreNumber;
  computerScoreEl.textContent = computerScoreNumber;
  playerChoiceEl.textContent = '';
  computerChoiceEl.textContent = '';
  resultText.textContent = '';
  resetSelected();
}
window.resetAll = resetAll;

// Random computer choice
const computerRandomChoice = () => {
  const computerChoiceNumber = Math.random();
  if (computerChoiceNumber < 0.2) {
    computerChoice = 'rock';
  } else if (computerChoiceNumber <= 0.4) {
    computerChoice = 'paper';
  } else if (computerChoiceNumber <= 0.6) {
    computerChoice = 'scissors';
  } else if (computerChoiceNumber <= 0.8) {
    computerChoice = 'lizard';
  } else {
    computerChoice = 'spock';
  }
}


// Add 'selected' class & computerChoice
const displayComputerChoice = () => {
  // add 'selected' class & update playerChoice
  switch (computerChoice) {
    case 'rock':
      computerRock.classList.add('selected');
      computerChoiceEl.textContent = ' --- Камень';
      break;
    case 'paper':
      computerPaper.classList.add('selected');
      computerChoiceEl.textContent = ' --- Бумага';
      break;
    case 'scissors':
      computerScissors.classList.add('selected');
      computerChoiceEl.textContent = ' --- Ножницы';
      break;
    case 'lizard':
      computerLizard.classList.add('selected');
      computerChoiceEl.textContent = ' --- Ебака';
      break;
    case 'spock':
      computerSpock.classList.add('selected');
      computerChoiceEl.textContent = ' --- ШАУЕ';
      break;
    default:
      break;
  }
}

// check result, increase scores, update resultText 
const updateScore = (playerChoice) => {
  if (playerChoice === computerChoice) {
    resultText.textContent = 'Ничья';
  } else {
    const choice = choices[playerChoice];
    if (choice.defeats.indexOf(computerChoice) > -1) {
      startConfetti();
      resultText.textContent = 'Вы победили!';
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
    } else {
      resultText.textContent = 'Вы проиграли!';
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
    }
  }
}

// Call function to process turn
const checkResult = (playerChoice) => {
  resetSelected();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
}

// Passing player selection value and styling icons
const select = (playerChoice) => {
  checkResult(playerChoice);
  // add 'selected' class & playerChoice
  switch (playerChoice) {
    case 'rock':
      playerRock.classList.add('selected');
      playerChoiceEl.textContent = ' --- Камень';
      break;
    case 'paper':
      playerPaper.classList.add('selected');
      playerChoiceEl.textContent = ' --- Бумага';
      break;
    case 'scissors':
      playerScissors.classList.add('selected');
      playerChoiceEl.textContent = ' --- Ножницы';
      break;
    case 'lizard':
      playerLizard.classList.add('selected');
      playerChoiceEl.textContent = ' --- Ебака';
      break;
    case 'spock':
      playerSpock.classList.add('selected');
      playerChoiceEl.textContent = ' --- ШАУЕ';
      break;
    default:
      break;
  }
}
window.select = select;

// Popup
const showRules = () => {
  gameContainer.hidden = true;
  popup.hidden = false;
}

const closeRules = () => {
  popup.hidden = true;
  gameContainer.hidden = false;
}

rulesBtn.addEventListener('click', showRules);
popup.addEventListener('click', closeRules);

// On load
resetAll();
