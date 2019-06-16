"use strict";

var rock = document.getElementById("rockButton");
var paper = document.getElementById("paperButton");
var scissors = document.getElementById("scissorsButton");
var outputMessages = document.getElementById("outputResult");
var newGameButton = document.getElementById("newGameBtn");
var playerMoves = document.getElementById("playerMoves");
var playerScore = document.getElementById("playerScore");
var cpuScore = document.getElementById("cpuScore");
var modals = document.querySelectorAll(".modal");
var playerNameInput = document.querySelector("#player-name");
var roundsNumberInput = document.querySelector("#rounds-number");
var startGamePopupButton = document.querySelector("#start-button");
var resultPlayerName = document.querySelector("#resultScoreName")

var params = {
  playerPoints: 0,
  cpuPoints: 0,
  rounds: 0,
  message: "",
  progress: []
};

var gameProgress = {
  roundNumber: 0,
  message: "",
  result: ""
};

// Show modal
function showModal(modalId) {
  document.querySelector("#modal-overlay").classList.add("show");
  modals.forEach(function (e) {
    e.classList.remove("show");
  });
  document.querySelector(modalId).classList.add("show");
};

// Hide modal
function hideModal() {
  document.querySelector("#modal-overlay").classList.remove("show");
};

document.querySelector("#modal-overlay").addEventListener("click", hideModal);

for (var i = 0; i < modals.length; i++) {
  modals[i].addEventListener("click", function (event) {
    event.stopPropagation();
  });
}

var closeButtons = document.querySelectorAll(".modalClose");

for (var j = 0; j < closeButtons.length; j++) {
  closeButtons[j].addEventListener("click", hideModal);
}

// Content modal
function modalContent(modalId) {
  var modal = document.querySelector(modalId);
  var modalHeader = modal.querySelector(".modalHeader");
  var modalTableContentColumns = document.querySelectorAll(".modalTable_column");
  modalHeader.innerHTML = params.message; // Info
  
  // Remove content from last match
  modalTableContentColumns.forEach(function (column) {
    while (column.firstChild) {
      column.removeChild(column.firstChild);
    }
  }); 

  // New data to table columns
  for (var i = 0; i < params.progress.length; i++) {
    var roundsNewDiv = document.createElement("div");
    roundsNewDiv.innerHTML = params.progress[i].roundNumber;
    var playerMovesNewDiv = document.createElement("div");
    playerMovesNewDiv.innerHTML = params.progress[i].message;
    var resultNewDiv = document.createElement("div");
    resultNewDiv.innerHTML = params.progress[i].result;
    document.querySelector(".tableRounds").appendChild(roundsNewDiv);
    document.querySelector(".tablePlayerMoves").appendChild(playerMovesNewDiv);
    document.querySelector(".tableResult").appendChild(resultNewDiv);
  }
};

// Add points to players
function score(pointTo, action) {
  if (action == "addPoint" && pointTo == "cpu") {
    params.cpuPoints += 1;
  } else if (action == "addPoint" && pointTo == "player") {
    params.playerPoints += 1;
  } else if (action == "noPoint" && pointTo == "noOne") {
    params.playerPoints = 0;
    params.cpuPoints = 0;
  } 

  // Update points on the scoreboard
  playerScore.innerHTML = params.playerPoints;
  cpuScore.innerHTML = params.cpuPoints;
};

// Start game settings
function startGameSettings() {
  playerMoves.classList.remove("invisible");
  resultPlayerName.innerHTML = playerNameInput.value;
  outputMessages.innerHTML = "Make your move! You have: " + roundsNumberInput.value + " rounds to win!" + "<br>" + "Try your luck!"; // info about rounds required to win
  score("noOne", "noPoint"); // point reset
};

// Show start modal and hide player buttons
function gameInit() {
  showModal("#startModal");
  playerMoves.classList.add("invisible");
};

// Start button inside start modal - player name and rounds number
function startGame() {
  hideModal();
  startGameSettings();
  params.rounds = roundsNumberInput.value;
  gameProgress.roundNumber = 0;
  params.progress = [];
};

startGamePopupButton.addEventListener("click", startGame);
newGameButton.addEventListener("click", gameInit);


// Validation of start game form inputs - enable start button
function startModalValidation() {
  startGamePopupButton.disabled = true;

  if (playerNameInput.checkValidity() && roundsNumberInput.checkValidity()) {
    startGamePopupButton.disabled = false;
  }
};

function checkValidity() {
  if (this.value.length() > 0) return true;
  else false;
}

// Use validation to check inputs
document.querySelectorAll(".modal_input").forEach(function (input) {
  input.addEventListener("keyup", function () {startModalValidation();});
  input.addEventListener("change", function () {startModalValidation();});
});

// Check players points and who won the tournament 
function winTournament() {
  var messageWithResult = params.playerPoints + " - " + params.cpuPoints + "<br><br>";
  var message;

  if (params.cpuPoints == params.rounds) {
    message = messageWithResult + "game over" + "<br>" + "You have LOST the game!" + "<br>" + "Please start a 'new game'";
  } 
  else if (params.playerPoints == params.rounds) {
    message = messageWithResult + "game over" + "<br>" + "You have WON the game!" + "<br>" + "Please start a 'new game'";
  }

  if (params.cpuPoints == params.rounds || params.playerPoints == params.rounds) {
    params.message = message;
    modalContent("#scoreModal");
    showModal("#scoreModal");
    playerMoves.classList.add("invisible");
    score("noOne", "noPoint");
    outputMessages.innerHTML = "Click 'new game' to start" + "<br>" + "Try your luck!";
    resultPlayerName.innerHTML = "player";
  }
};

// Computer move
function computerChoice() {
  return Math.floor(Math.random()*3)+1;
}

// Player move
function playerMove(moveP) {
 	var pcMove = computerChoice();
  var moveNames=['Rock','Paper','Scissors'];
  var playerName = playerNameInput.value;
  var message = playerName + " played " + moveP + " / Computer played " + moveNames[pcMove-1];

// Moves compare
  if ((pcMove == 2 && moveP == 'Rock') || (pcMove == 3 && moveP == 'Paper') || (pcMove == 1 && moveP == 'Scissors')) {
    message += "<br>" + "*Sorry, You lose!*" + "<br>";
    score("cpu", "addPoint");
  } 
  else if (moveP == moveNames[pcMove-1]) {
    message += "<br>" + "*It`s a tie!*" + "<br>";
  } 
  else {
    message += "<br>" + "*Congrats, You won!*" + "<br>";
    score("player", "addPoint");
  }

  outputMessages.innerHTML = message;
  gameProgress.roundNumber += 1;
  gameProgress.message = message;
  gameProgress.result = params.playerPoints + " - " + params.cpuPoints;
  params.progress.push({
    roundNumber: gameProgress.roundNumber,
    message: gameProgress.message,
    result: gameProgress.result
  });
  winTournament();
};

// Click move button
document.querySelectorAll(".player-move").forEach(function (playerMoveButton) {
  playerMoveButton.addEventListener("click", function () {
    var playerMoveName = playerMoveButton.getAttribute("data-move");
    playerMove(playerMoveName);
  });
});