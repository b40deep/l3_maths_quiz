function testJS() {
  alert("javascript successfully connected!");
}

//create a service worker hook
let workerBee = null;

//install the service worker
//register the service worker onto the website
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js").then(
      function (registration) {
        workerBee = navigator.serviceWorker.controller;
        console.log(
          "Service worker registered successfully:",
          registration.scope
        );
      },
      function (err) {
        console.log("Service worker registration failed:", err);
      }
    );
  });
}

//variables
let username = "";
let highScore = 0;
const inputElement = document.getElementById("input_name");
const highscoreSpan = document.querySelector("#highscore");

loadDefaults();

function saveName() {
  username = inputElement.value;
  if (username !== undefined && username !== null && username.length > 0) {
    localStorage.setItem("username", username);
    loadDefaults();
    // send data to the service worker if one exists and we need to
  }
}

function loadDefaults() {
  //check if highscore is available and display it
  username = localStorage.getItem("username");
  highScore = localStorage.getItem("highscore");
  highscoreSpan.textContent =
    (username == undefined ? "Friend" : username) +
    ", your high score is " +
    (highScore == null ? "yet to be set" : highScore);
  //image is loaded by camera.js so don't load if from here
}

//navigate to the game page
const playGameBtn = document.getElementById("play-game");
playGameBtn.addEventListener("click", playGame);
function playGame() {
  window.location.href = "game.html";
}
