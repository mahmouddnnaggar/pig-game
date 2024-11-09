'use strict';

// ^ GET ELEMENTS
const players = document.querySelectorAll('.player');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.getElementById('dice');
const [newBtn, rollBtn, holdBtn] = document.querySelectorAll('#dice ~ .btn');

// ^ INITIAL STATE
score0El.textContent = 0;
score1El.textContent = 0;

// ^ VARIABLES
let currentScore = 0;
let playing = true;
// ! I WILL USE THESE IN THE NEXT UPDATE
// const scores = [0, 0];
// let activePlayer = 0;

// ^ CHECK WINNER FUNCTIONALITY
function checkWinner(target = 10) {
  const score0 = +document.getElementById('score--0').textContent;
  const score1 = +document.getElementById('score--1').textContent;
  if (score0 >= target) {
    players[0].classList.add('player--winner');
    return true;
  } else if (score1 >= target) {
    players[1].classList.add('player--winner');
    return true;
  }
}

// ^ ROLLING DICE FUNCTIONALITY
rollBtn.addEventListener('click', () => {
  if (playing) {
    const currentScoreEl = document.querySelector(
      '.player--active .current-score'
    );
    // 1. Generate a random number from 1 to 6 to dice
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    // console.log(diceNumber); // to Check that diceNumber equal to that dice image displayed

    // 2. Display a dice to DOM
    diceEl.src = `./dice-${diceNumber}.png`;
    diceEl.classList.remove('hidden');

    // 3. Check that number is 1 or not || if 1 ? add to score : switch player
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      currentScoreEl.textContent = currentScore;
    } else {
      players.forEach(e => {
        e.classList.toggle('player--active');
      });
      currentScore = 0;
      currentScoreEl.textContent = currentScore;
    }
  }
});

// ^ HOLD FUNCTIONALITY
holdBtn.addEventListener('click', () => {
  if (playing) {
    const scoreEl = document.querySelector('.player--active .score');
    const currentScoreEl = document.querySelector(
      '.player--active .current-score'
    );
    scoreEl.textContent = +scoreEl.textContent + currentScore;
    currentScore = 0;
    currentScoreEl.textContent = currentScore;
    if (!checkWinner(100)) {
      players.forEach(e => {
        e.classList.toggle('player--active');
      });
    } else {
      playing = false;
      diceEl.classList.add('hidden');
    }
  }
});

// ^ NEW GAME FUNCTIONALITY
newBtn.addEventListener('click', () => {
  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  playing = true;
  players.forEach((e, i) => {
    if (i === 0) {
      e.classList.add('player--active');
    } else {
      e.classList.remove('player--active');
    }
    e.classList.remove('player--winner');
    e.querySelector('.current-score').textContent = 0;
  });
});
