" use strict ";

// Selecting Elements
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0EL = document.querySelector("#score--0");
const score1EL = document.getElementById("score--1");
const diceEL = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnnew = document.querySelector(".btn--new");
const btnhold = document.querySelector(".btn--hold");
const current0EL = document.getElementById("current--0");
const current1EL = document.getElementById("current--1");

let activePlayer, currentScore, playing, scores;

const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEL.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");

  currentScore = 0;
  activePlayer = 0;
  diceEL.classList.add("hidden");
  playing = true;
};

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

// Starting Condition

init();

// Rolling Dice functionalities

btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1) Generte a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2) Display the dice
    diceEL.classList.remove("hidden");
    diceEL.src = `dice-${dice}.png`;

    // 2) Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

btnhold.addEventListener("click", function () {
  // Add current score to active player score
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if score >= 100

    if (scores[activePlayer] >= 100) {
      playing = false;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEL.classList.add("hidden");
    } else {
      // switch player
      switchPlayer();
    }
  }
});

btnnew.addEventListener("click", init);
