function testJS() {
  alert("javascript successfully connected!");
}

let username = "";
let highScore = 0;
const inputElement = document.getElementById("input-name");
const highscoreSpan = document.querySelector("#highscore");

function saveName() {
  let inputValue = inputElement.value;
  username = inputValue;
  console.log("input-username:", inputValue);
  // alert("javascript said your username is " + inputValue + "!");
  localStorage.setItem("username", inputValue);

  // send data to the service worker if one exists
  // if ("serviceWorker" in navigator) {
  //   navigator.serviceWorker.controller.postMessage(
  //     "Hello from the web page!" + inputValue
  //   );
  // }
  highscoreSpan.textContent =
    username + " got " + localStorage.getItem("highscore") ||
    "failed to load highscore";
}

// const testJSbtn = document.querySelector("#test-js-button");
// testJSbtn.addEventListener("click", testJS);

//check if highscore is available and display it
username = localStorage.getItem("username");
highScore = localStorage.getItem("highscore");
highscoreSpan.textContent =
  (username == undefined ? "Friend" : username) +
  ", your high score is " +
  (highScore == null ? "yet to be set" : highScore);
