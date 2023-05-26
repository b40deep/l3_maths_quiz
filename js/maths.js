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
let answerPool = [];
let answerPoolSeed = 0;
//use levels to keep track of the game and set timers where necessary
let gameLevel = 0;

//start the game
startGame();
//use the game level to start the game with the appropriate difficulty
function startGame() {
  gameLevel = localStorage.getItem("gamelevel") || gameLevel;
  //kick off timers depending on the game level
  if (gameLevel == 1) {
    const l1Timeout = setTimeout(endGame, 5000);
  }
  if (gameLevel == 2) {
    const l2Timeout = setTimeout(endGame, 3000);
  }
}

//populate the spans with the randomly generated numbers and operands
function loadNextQuestion() {
  //if attempts are done, end the game and disable everything.
  attempts -= 1;
  attempts == 0 ? endGame() : attempts;
  localStorage.setItem("highscore", highScore);

  //generate random numbers and operands
  num1 = Math.floor(Math.random() * 5);
  num2 = Math.floor(Math.random() * 4);
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

  //limit the decimals on the answer
  rightAnswer =
    rightAnswer - Math.floor(rightAnswer) == 0
      ? rightAnswer
      : rightAnswer.toFixed(1);

  //create an answer pool
  answerPool[0] = rightAnswer;
  answerPool[1] = Math.floor(Math.random() * 13);
  answerPool[2] = Math.floor(Math.random() * 13);
  console.log(`answerpool options ${answerPool.toString()} `);
  //set the buttons to the answer options randomly
  answerPoolSeed = Math.floor(Math.random() * 3);
  option1.innerHTML = answerPool[answerPoolSeed];
  // console.log(
  //   `s ${answerPoolSeed + 1 >= 3 ? answerPoolSeed - 2 : answerPoolSeed + 1}`
  // );
  // console.log(
  //   `t ${answerPoolSeed + 2 >= 3 ? answerPoolSeed - 1 : answerPoolSeed + 2}`
  // );
  option2.innerHTML =
    answerPool[
      answerPoolSeed + 1 >= 3 ? answerPoolSeed - 2 : answerPoolSeed + 1
    ];

  option3.innerHTML =
    answerPool[
      answerPoolSeed + 2 >= 3 ? answerPoolSeed - 1 : answerPoolSeed + 2
    ];

  //   alert(sign);
}

//check if selected option is correct
function checkAnswer(optionNumber) {
  //   alert(optionNumber);
  if (optionNumber == answerPool[0]) {
    playPassSound();
    highScore += 1;
    responseText.innerHTML = "Correct!";
    highscoreText.innerHTML = highScore;
  } else {
    playFailSound();
    responseText.innerHTML = "Sorry!";
  }
  // alert(attempts);
  loadNextQuestion();
}

//capture the necessary buttons
// const startGameBtn = document.querySelector("#start-game");
// startGameBtn.addEventListener("click", loadNextQuestion);
const option1Btn = document.querySelector("#option1");
option1Btn.addEventListener("click", () => {
  checkAnswer(option1Btn.innerHTML);
});
const option2Btn = document.querySelector("#option2");
option2Btn.addEventListener("click", () => {
  checkAnswer(option2Btn.innerHTML);
});
const option3Btn = document.querySelector("#option3");
option3Btn.addEventListener("click", () => {
  checkAnswer(option2Btn.innerHTML);
});

// end the game by disabling the answer buttons and setting a message to the response
function endGame() {
  //if highscore is equal to attempts, the player passed all the questions.
  //therefore, we should graduate them to the next level.
  if (highScore == 10) {
    gameLevel += 1;
    localStorage.setItem("gamelevel", gameLevel);
    //reset the attempts
    attempts = 10;
    //restart the game with the new Level
    startGame();
  }

  //if not, then they failed some, so the game ends there
  else {
    option1.disabled = true;
    option2.disabled = true;
    option3.disabled = true;
    responseText.innerHTML =
      "Your 10 attempts or time are done. Thanks for playing!";
  }
}

//set the timer for the game
function levelOne() {
  const myTimeout = setTimeout(endGame, 5000);
}
