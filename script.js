'use strict';
//Player1
const name1 = document.getElementById('name--0');
const score1 = document.querySelector('#score--0');
const currentScore1 = document.querySelector('#current--0');

// Player 2
const name2 = document.getElementById('name--1');
const score2 = document.getElementById('score--1');
const currentScore2 = document.querySelector('#current--1');

//setting score to 0 in text
score1.textContent = 0;
score2.textContent = 0;
//dice
const dice = document.querySelector('.dice');
const imgDice = document.querySelector('img');
const rollDice = document.querySelector('.btn--roll');
//new game btn
const newGame = document.querySelector('.btn--new');
//hold the Dice number in btn
const holdDice = document.querySelector('.btn--hold');
let scores, currentScore, activePlayer;
//show dice
dice.classList.add('hidden');
document.querySelector(`.in--0`).classList.add('hidden');
document.querySelector(`.in--1`).classList.add('hidden');

//btn disable function
const disable = function (bool) {
  holdDice.disabled = bool;
  rollDice.disabled = bool;
};

const init = function () {
  scores = [0, 0]; //array to store scores

  //current score
  currentScore = 0;
  activePlayer = 0; // this is done to switch between element current--0 and current--1
  //setting scores to zero
  score1.textContent = 0;
  score2.textContent = 0;
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;
  disable(false);
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.btn--new').textContent = '🎰 New game ';
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector('.in--1').textContent = 'Your turn';
  document.querySelector('.in--0').textContent = 'Your turn';
  document.querySelector(`.in--0`).classList.remove('hidden');
  name1.textContent = prompt('Name of player1');
  name2.textContent = prompt('Name of player2');
};

//random dice show and switch player
const switchPlayer = function () {
  currentScore = 0; // reset's current score to zero
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore; // display's current score after player is switch

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active'); // removes player--active class from previous player
  document.querySelector(`.in--${activePlayer}`).classList.add('hidden');
  //switches to next player
  activePlayer = activePlayer === 0 ? 1 : 0; // if activePlayer is set 0 then change to 1, vice-versa.

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active'); // adds player--active class to current  player
  document.querySelector(`.in--${activePlayer}`).classList.remove('hidden');
};

const randomDice = function () {
  //random dice roll
  const random = Math.trunc(Math.random() * 6) + 1;
  dice.classList.remove('hidden');
  imgDice.src = `dice-${random}.png`;

  // if rolled 1; switch to next player
  if (random !== 1) {
    currentScore += random;
    // currentScore1.textContent = currentScore; //change later
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //switches to next player
    switchPlayer();
  }
};

const playerWon = function () {
  document.querySelector('.btn--new').textContent = '🔁 Reset game';
  dice.classList.add('hidden');

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  disable(true); //disable btn--roll, btn--hold
  document.querySelector(
    `.in--${activePlayer}`
  ).textContent = `🥂🥂 Congratulations!! You Won! 🥂🥂`;

  document.querySelector('.btn--new').classList.add('.hidden');
};

const holdScore = function () {
  scores[`${activePlayer}`] += currentScore; // adding scores to the array
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[`${activePlayer}`];
  if (scores[`${activePlayer}`] >= 100) {
    playerWon();
  } else {
    switchPlayer();
  }
};

rollDice.addEventListener('click', randomDice); // rolls the dice
holdDice.addEventListener('click', holdScore); //holds score

newGame.addEventListener('click', init);

//ignore//
//new game restart details. ignore!!!
// score1.textContent = 0;
// score2.textContent = 0;
// document
//   .querySelector(`.player--${activePlayer}`)
//   .classList.remove('player--winner');
// currentScore = 0;
// document.getElementById(`current--0`).textContent = currentScore;
// document.getElementById(`current--1`).textContent = currentScore;
// scores = [0, 0];
// if (activePlayer === 1) {
//   document.querySelector(`.player--0`).classList.add('player--active');
//   document.querySelector(`.player--1`).classList.remove('player--active');
// }
// activePlayer = 0;
// dice.classList.add('hidden');
// disable(false);
