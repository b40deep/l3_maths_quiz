//switched from custom sound implementation to HTML Audio element
const passSound = new Audio("/sound/pass.mp3");
const failSound = new Audio("/sound/fail.mp3");

function playPassSound() {
  /*if any of the sounds were previously playing, 
  stop them and reset them to the start
  before playing a new sound*/
  if (!passSound.ended) {
    passSound.pause();
    passSound.currentTime = 0;
  }
  if (!failSound.ended) {
    failSound.pause();
    failSound.currentTime = 0;
  }
  passSound.play();
}

function playFailSound() {
  /*if any of the sounds were previously playing, 
  stop them and reset them to the start
  before playing a new sound*/
  if (!passSound.ended) {
    passSound.pause();
    passSound.currentTime = 0;
  }
  if (!failSound.ended) {
    failSound.pause();
    failSound.currentTime = 0;
  }
  failSound.play();
}
