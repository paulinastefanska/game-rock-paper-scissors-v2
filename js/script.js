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