//get the spans that have the space we'll put the numbers and operands
let num1span = document.getElementById("num1");
let signspan = document.getElementById("sign");
let num2span = document.getElementById("num2");
const operands = ["+", "-", "*", "/"];
let num1 = 0;
let num2 = 0;
let sign = 0;
let option1 = document.getElementById("option1");
let option2 = document.getElementById("option2");
let option3 = document.getElementById("option3");
let rightAnswer = 0;
let responseText = document.getElementById("response");
let highscoreText = document.getElementById("highscore");
let highScore = 0;
let attempts = 10;

levelOne();
//populate the spans with the randomly generated numbers and operands
function startGame() {
  //if attempts are done, end the game and disable everything.
  attempts -= 1;
  attempts == 0 ? endGame() : attempts;
  localStorage.setItem("highscore", highScore);

  //generate random numbers and operands
  num1 = Math.floor(Math.random() * 13);
  num2 = Math.floor(Math.random() * 13);
  sign = Math.floor(Math.random() * 4);

  //set the numbers to make sure the first is greater than the second (so that we don't end up with negative numbers)
  num1span.textContent = num1 > num2 ? num1 : num2;
  signspan.textContent = operands[sign];
  num2span.textContent = num1 < num2 ? num1 : num2;

  //do the arithmetic and generate the options
  switch (sign) {
    case 0:
      rightAnswer = num1 + num2;
      break;
    case 1:
      rightAnswer = num1 - num2;
      break;
    case 2:
      rightAnswer = num1 * num2;
      break;
    case 3:
      rightAnswer = num1 / num2;
      break;
    default:
      break;
  }
  option1.innerHTML = rightAnswer + 2;
  option2.innerHTML = rightAnswer;
  option3.innerHTML = rightAnswer - 1;
  //   alert(sign);
}

//check if selected option is correct
function checkAnswer(optionNumber) {
  //   alert(optionNumber);
  if (optionNumber == 2) {
    highScore += 1;
    responseText.innerHTML = "Correct!";
    highscoreText.innerHTML = highScore;
  } else {
    responseText.innerHTML = "Sorry!";
  }
  // alert(attempts);
  startGame();
}

//capture the necessary buttons
// const startGameBtn = document.querySelector("#start-game");
// startGameBtn.addEventListener("click", startGame);
const option1Btn = document.querySelector("#option1");
option1Btn.addEventListener("click", () => {
  checkAnswer(1);
});
const option2Btn = document.querySelector("#option2");
option2Btn.addEventListener("click", () => {
  checkAnswer(2);
});
const option3Btn = document.querySelector("#option3");
option3Btn.addEventListener("click", () => {
  checkAnswer(3);
});

// end the game by disabling the answer buttons and setting a message to the response
function endGame() {
  option1.disabled = true;
  option2.disabled = true;
  option3.disabled = true;
  responseText.innerHTML = "Your 10 attempts are done. Thanks for playing!";
}

//set the timer for the game
function levelOne() {
  const myTimeout = setTimeout(endGame, 5000);
}
