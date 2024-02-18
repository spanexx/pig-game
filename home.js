
// Accessing DOM Elements
var dice1 = document.querySelector(".dice1");
var dice2 = document.querySelector(".dice2");
var player1 = document.querySelector(".player-0-panel");
var player2 = document.querySelector(".player-1-panel");
var score1 = document.getElementById("score-0");
var score2 = document.getElementById("score-1");
var current1 = document.getElementById("current-0");
var current2 = document.getElementById("current-1");
var btnRoll = document.querySelector(".btn-roll");
var btnHold = document.querySelector(".btn-hold");
var btnNew = document.querySelector(".btn-new");
var instructionBtn = document.querySelector(".button1");
var modal = document.getElementById("my-modal");
var closeModal = document.getElementsByClassName("close")[0];


//initialize the variables
score1.textContent = 0;
score2.textContent = 0;
dice1.classList.add("hidden");
dice2.classList.add("hidden");
current1.textContent = 0;
current2.textContent = 0;
current = 0;
scores = [0, 0];
activePlayer = 0;
winningScore = 151;
var prevDiceRolls = [[], []];

function init() {
  // Reset Scores
  scores = [0, 0];
  score1.textContent = 0;
  score2.textContent = 0;

  // Reset Current Scores
  roundScore = 0;
  current1.textContent = 0;
  current2.textContent = 0;

  // Hide Dice Images
  dice1.classList.add("hidden");
  dice2.classList.add("hidden");

  // Reset Active Player
  activePlayer = 0;

  // Remove 'Winner' Class
  player1.classList.remove("winner");
  player2.classList.remove("winner");

  // Reset UI Display
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  // Ensure Default Player Highlight
  player1.classList.add("active");
  player2.classList.remove("active");
  btnHold.classList.remove("hidden");
  btnRoll.classList.remove("hidden");
}

function switchPlayer() {
  // Reset the current score to zero
  current = 0;
  document.getElementById(`current-${activePlayer}`).textContent = current;
  // Toggle active player
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Toggle the 'active' class on player panels
  player1.classList.toggle("active");
  player2.classList.toggle("active");
  // Clear the previous dice rolls for the current player
  prevDiceRolls[activePlayer] = [];
}

// Roll Button
btnRoll.addEventListener("click", function () {
  // generate random number between 1 and 6
  let diceNumber1 = Math.trunc(Math.random() * 6) + 1;
  let diceNumber2 = Math.trunc(Math.random() * 6) + 1;
  let totalDice = diceNumber1 + diceNumber2;

  // store the current dice rolls in the array
  prevDiceRolls[activePlayer].push(diceNumber1);
  prevDiceRolls[activePlayer].push(diceNumber2);

  // check if there are two consecutive 6 rolls
  if (prevDiceRolls[activePlayer].length >= 4 &&
      prevDiceRolls[activePlayer][prevDiceRolls[activePlayer].length - 2] === 6 &&
      prevDiceRolls[activePlayer][prevDiceRolls[activePlayer].length - 1] === 6) {
      // Reset the entire score and switch to the next player
      current = 0;
      document.getElementById(`current-${activePlayer}`).textContent = current;
      // switch to the next player
      switchPlayer();
  } else {
      // display the dice image with the random number
      dice1.classList.remove("hidden");
      dice2.classList.remove("hidden");
      dice1.src = `./images/dice-${diceNumber1}.png`;
      dice2.src = `./images/dice-${diceNumber2}.png`;

      // if random number is not 1 then add it to the active player's current score
      if (diceNumber1 != 1 && diceNumber2 != 1) {
          current += totalDice;
          document.getElementById(`current-${activePlayer}`).textContent = current;
      } else {
          // if random number is 1 then reset current score to zero and change the active player
          current = 0;
          document.getElementById(`current-${activePlayer}`).textContent = current;
          // Toggle active player
          switchPlayer();
      }
  }
});


// Hold Button

btnHold.addEventListener("click", function () {
  // Add the current score to the global score of the active player
  scores[activePlayer] += current;

  // Update the UI to display the new global score
  document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

  
  // Check if the active player has reached the winning score
  if (scores[activePlayer] >= winningScore) {
    // Display a winner message or perform any other actions for winning the game
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
    document.getElementById(`name-${activePlayer}`).textContent = "Winner!!!"
    btnHold.classList.add("hidden");
    btnRoll.classList.add("hidden");
    dice1.classList.add("hidden");
    dice2.classList.add("hidden");


  } else {
    // Switch to the next player
    switchPlayer();
  }
});


btnNew.addEventListener("click", init);

// Event listener for the instruction button
instructionBtn.addEventListener("click", function () {
  modal.style.display = "block";
});

// Event listener to close the modal when the 'x' button is clicked
closeModal.addEventListener("click", function () {
  modal.style.display = "none";
});

// Event listener to close the modal when clicking outside the modal
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
