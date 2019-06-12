"use strict";

var rock = document.getElementById("rockButton");
var paper = document.getElementById("paperButton");
var scissors = document.getElementById("scissorsButton");
var outputMessages = document.getElementById("outputResult");
var newGameButton = document.getElementById("newGameBtn");
var playerMove = document.getElementById("playerMove");
var playerScore = document.getElementById("playerScore");
var cpuScore = document.getElementById("cpuScore");
var modals = document.querySelectorAll(".modal");
var playerNameInput = document.querySelector("#player-name");
var roundsNumberInput = document.querySelector("#rounds-number");
var startGamePopupButton = document.querySelector("#start-button");

var params = {
  victories: 0,
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
var showModal = function showModal(modalId) {
  document.querySelector("#modal-overlay").classList.add("show");
  modals.forEach(function (modal) {
    modal.classList.remove("show");
  });
  document.querySelector(modalId).classList.add("show");
};

// Hide modal
var hideModal = function hideModal() {
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
var modalContent = function modalContent(modalId) {
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
var score = function score(pointTo, action) {
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

// Show moves/ buttons
var startGameSettings = function startGameSettings() {
  playerMoves.classList.remove("invisible");
  outputMessages.innerHTML = "New game - rounds to win: " + roundsToWin.innerHTML; // info about rounds required to win

  if (params.cpuPoints > 0 || params.playerPoints > 0) {
    // reset win counter after lost
    params.victories = 0;
  }

  score("noOne", "noPoint"); // point reset

  wonMatches.innerHTML = params.victories; // updating score
};

// Show start modal and hide player buttons
var gameInit = function gameInit() {
  showModal("#startModal");
  playerMoves.classList.add("invisible");
};

// Start button inside start modal - player name and rounds number
var startGame = function startGame() {
  hideModal();
  removeClassesForIconFields();
  params.rounds = roundsNumberInput.value;
  roundsToWin.innerHTML = params.rounds;
  document.querySelector("#resultScoreName").innerHTML = playerNameInput.value;
  startGameSettings();
  gameProgress.roundNumber = 0;
  params.progress = [];
};

startGamePopupButton.addEventListener("click", startGame);

newGameButton.addEventListener("click", gameInit);

// Validation of start game form inputs - enable start button
var startModalValidation = function startModalValidation() {
  startGamePopupButton.disabled = true;

  if (playerNameInput.checkValidity() && roundsNumberInput.checkValidity()) {
    startGamePopupButton.disabled = false;
  }
};

// Use validation to check inputs
document.querySelectorAll(".modal__input").forEach(function (input) {
  input.addEventListener("keyup", function () {
    startModalValidation();
  });
});