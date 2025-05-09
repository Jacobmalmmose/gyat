// Constants for sounds
const correctSound = new Audio("sounds/correct.mp3");
const incorrectSound = new Audio("sounds/incorrect.mp3");
const gameOverSound = new Audio("sounds/end.mp3");

// Constants for images
const faxeKondiImg = "image/faxekondi.png";
const faxeFreeImg = "image/faxefree.png";

// DOM elements
const davidImg = document.getElementById("david");
const trashcanImg = document.getElementById("trashcan");
const drinkDiv = document.getElementById("drink");
const scoreDisplay = document.getElementById("score");

const gameMessage = document.getElementById("game-message");
const gameOverText = document.getElementById("game-over-text");
const timerDisplay = document.getElementById("timer"); // Display timer

let score = 0;
let currentDrink = "";
let gameTimer = 60; // Timer duration in seconds
let timerInterval;

// Event listeners
davidImg.addEventListener("click", giveToDavid);
trashcanImg.addEventListener("click", throwInTrash);

// Start game
spawnDrink();
startTimer();

// Functions
function spawnDrink() {
  const drink = document.createElement("img");

  if (Math.random() < 0.5) {
    drink.src = faxeKondiImg;
    currentDrink = "kondi";
    drink.style.height = "350px"; 
  } else {
    drink.src = faxeFreeImg;
    currentDrink = "free";
    drink.style.width = "350px";
    drink.style.height = "350px"; 
  }

  // Clear and display the new drink
  drinkDiv.innerHTML = "";
  drinkDiv.appendChild(drink);
}

function giveToDavid() {
  if (currentDrink === "kondi") {
    score++;
    scoreDisplay.innerText = "Point: " + score;
    spawnDrink();
    changeDavid("glad");
    correctSound.play(); // Play correct sound
  } else {
    changeDavid("sur");
    incorrectSound.play(); // Play incorrect sound
    endGame();
  }
}

function throwInTrash() {
  if (currentDrink === "free") {
    score++;
    scoreDisplay.innerText = "Point: " + score;
    spawnDrink();
    changeDavid("glad");
    correctSound.play(); // Play correct sound
  } else {
    changeDavid("sur");
    incorrectSound.play(); // Play incorrect sound
    endGame();
  }
}

function changeDavid(state) {
  if (state === "glad") {
    davidImg.src = "image/david_happy.jpg";
  } else if (state === "sur") {
    davidImg.src = "image/david_angry.png";
  } else {
    davidImg.src = "image/david.png";
  }
}

function endGame() {
  // Hide the game and show the game over message
  gameMessage.style.display = "block";
  
  // Stop the game timer
  clearInterval(timerInterval);

  // Check if game is over due to the time running out or the player losing
  if (gameTimer <= 0) {
    // If time runs out
    new TypeIt("#game-over-text", {
      strings: ["Tiden er ude! Du fik " + score + " point."],
      speed: 50, // Typing speed
      waitUntilVisible: true
    }).go();
  } else {
    // If the player loses due to a mistake
    new TypeIt("#game-over-text", {
      strings: ["Forkert Faxe! Spillet er slut. Du fik " + score + " point."],
      speed: 50, // Typing speed
      waitUntilVisible: true
    }).go();
  }

  // Disable event listeners
  davidImg.removeEventListener("click", giveToDavid);
  trashcanImg.removeEventListener("click", throwInTrash);
}


function startTimer() {
  // Update the timer every second
  timerInterval = setInterval(() => {
    gameTimer--;
    timerDisplay.innerText = "Tid: " + gameTimer + " sek."; // Display time on screen

    // If the timer reaches 0, stop the game
    if (gameTimer <= 0) {
      endGame();
    }
  }, 1000);
}

function restartGame() {
  // Reset score and timer
  score = 0;
  scoreDisplay.innerText = "Point: " + score;
  gameTimer = 60; // Reset timer to 1 minute
  timerDisplay.innerText = "Tid: 60 sek."; // Reset timer display
  gameMessage.style.display = "none"; // Hide game over message
  spawnDrink();
  changeDavid("neutral");

  // Restart the timer
  clearInterval(timerInterval);
  startTimer();

  // Re-enable event listeners
  davidImg.addEventListener("click", giveToDavid);
  trashcanImg.addEventListener("click", throwInTrash);
}
