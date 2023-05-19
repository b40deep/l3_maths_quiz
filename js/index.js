function testJS() {
  alert("javascript successfully connected!");
}

let username = "";
let highScore = 0;
const inputElement = document.getElementById("input_name");
const highscoreSpan = document.querySelector("#highscore");

loadDefaults();

function saveName() {
  username = inputElement.value;
  // console.log("input-username:", inputValue);
  // alert(`javascript said your username is ${username}!`);
  if (username !== undefined && username !== null && username.length > 0) {
    localStorage.setItem("username", username);
    // alert(`javascript said your username is ${username.length}!`);
    loadDefaults();
  }

  // send data to the service worker if one exists
  // if ("serviceWorker" in navigator) {
  //   navigator.serviceWorker.controller.postMessage(
  //     "Hello from the web page!" + inputValue
  //   );
  // }
}

// const testJSbtn = document.querySelector("#test-js-button");
// testJSbtn.addEventListener("click", testJS);

function loadDefaults() {
  //check if highscore is available and display it
  username = localStorage.getItem("username");
  highScore = localStorage.getItem("highscore");
  highscoreSpan.textContent =
    (username == undefined ? "Friend" : username) +
    ", your high score is " +
    (highScore == null ? "yet to be set" : highScore);
}
