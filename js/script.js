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

var showModal = function showModal(modalId) {
  document.querySelector("#modal-overlay").classList.add("show");
  modals.forEach(function (modal) {
    modal.classList.remove("show");
  });
  document.querySelector(modalId).classList.add("show");
};

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