//get the spans that have the space we'll put the numbers and operands
let num1span = document.getElementById("num1");
let signspan = document.getElementById("sign");
let num2span = document.getElementById("num2");
const operands = ["+", "-", "*", "/"];
let numswap = 0;
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
let attempts = 11;
let answerPool = [];
let answerPoolSeed = 0;
//use levels to keep track of the game and set timers where necessary
let gameLevel = 0;

//load the level
loadLevel();
//load a new question to start game
loadNextQuestion();

//use the game level to start the game with the appropriate difficulty
function loadLevel() {
  gameLevel = localStorage.getItem("gamelevel") || gameLevel;
  //kick off timers depending on the game level
  if (gameLevel == 1) {
    let l1Timeout = setTimeout(() => {
      endGame("l1time");
    }, 5000);
  }
  if (gameLevel == 2) {
    let l2Timeout = setTimeout(() => {
      endGame("l2time");
    }, 3000);
  }
}

//populate the spans with the randomly generated numbers and operands
function loadNextQuestion() {
  //if attempts are done, end the game and disable everything.
  attempts -= 1;
  attempts == 0 ? endGame("tries") : attempts;

  //generate random numbers and operands
  num1 = Math.floor(Math.random() * 5);
  num2 = Math.floor(Math.random() * 4);
  //set the numbers to make sure the first is greater than the second (so that we don't end up with negative numbers)
  if (num1 < num2) {
    numswap = num1;
    num1 = num2;
    num2 = numswap;
  }
  //set the sign depending on if the numbers generated are divisible
  sign =
    num1 % num2 == 0
      ? Math.floor(Math.random() * 4)
      : Math.floor(Math.random() * 3);

  //set the options to the buttons
  num1span.textContent = num1;
  signspan.textContent = operands[sign];
  num2span.textContent = num2;

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
  //not needed now that I have adjusted the random number generator not to give me decimal answers
  rightAnswer =
    rightAnswer - Math.floor(rightAnswer) == 0
      ? rightAnswer
      : rightAnswer.toFixed(1);

  //create an answer pool
  answerPool[0] = rightAnswer;
  answerPool[1] = Math.floor(Math.random() * 13);
  answerPool[2] = Math.floor(Math.random() * 13);
  console.log(
    `answerpool options ${answerPool.toString()} ans ${answerPool[0]}`
  );
  //set the buttons to the answer options randomly
  answerPoolSeed = Math.floor(Math.random() * 3);
  option1.innerHTML = answerPool[answerPoolSeed];
  option2.innerHTML =
    answerPool[
      answerPoolSeed + 1 >= 3 ? answerPoolSeed - 2 : answerPoolSeed + 1
    ];
  option3.innerHTML =
    answerPool[
      answerPoolSeed + 2 >= 3 ? answerPoolSeed - 1 : answerPoolSeed + 2
    ];
}

//check if selected option is correct
function checkAnswer(optionNumber) {
  //   alert(optionNumber);
  if (optionNumber == answerPool[0]) {
    playPassSound();
    highScore += 1;
    responseText.innerHTML = "Correct!";
    highscoreText.innerHTML = highScore;
    // console.log(`pass ${optionNumber} ${answerPool[0]}`);
    //update the high score
    localStorage.setItem("highscore", highScore);
  } else {
    playFailSound();
    responseText.innerHTML = "Sorry!";
    // console.log(`fail ${optionNumber} ${answerPool[0]}`);
  }
  // alert(attempts);
  loadNextQuestion();
}

//capture the necessary buttons
// const loadLevelBtn = document.querySelector("#start-game");
// loadLevelBtn.addEventListener("click", loadNextQuestion);
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
  checkAnswer(option3Btn.innerHTML);
});

// end the game by disabling the answer buttons and setting a message to the response
function endGame(mode) {
  //if highscore is equal to attempts, the player passed all the questions.
  //therefore, we should graduate them to the next level.
  if (highScore == 10) {
    gameLevel += 1;
    localStorage.setItem("gamelevel", gameLevel);
    //reset the attempts
    attempts += 11;
    //reset the highscore
    highScore = 0;
    localStorage.setItem("highscore", highScore);

    //restart the game with the new Level
    loadLevel();
    // //load a new game question to kick off the new game
    // loadNextQuestion();
  }

  //if not, then they failed some, so the game ends there
  else {
    option1.disabled = true;
    option2.disabled = true;
    option3.disabled = true;
    if (mode == "tries") {
      responseText.innerHTML = "Your 10 attempts are done. Thanks for playing!";
    } else if (mode == "l1time") {
      responseText.innerHTML =
        "Your time is up. Thanks for playing to Level 1!";
    } else if (mode == "l2time") {
      responseText.innerHTML =
        "Your time is up. Thanks for playing to Level 2!";
    }
  }
}

//set the timer for the game
function levelOne() {
  const myTimeout = setTimeout(endGame("l1time"), 5000);
}
