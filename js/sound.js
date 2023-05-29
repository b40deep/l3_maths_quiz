//switched from custom sound implementation to HTML Audio element
const passSound = new Audio("sound/pass.mp3");
const failSound = new Audio("sound/fail.mp3");
const bgSoundMuteIcon = document.querySelector("#bg-sound-toggle");
const bgSound = document.querySelector("#bg-sound");
//populate the bgSound properties
bgSound.src = "sound/bg.mp3";
bgSound.loop = true;

// bgSound.load();

//add some bgSound helper variables
let bgTime = localStorage.getItem("bgTime") || 0;
let bgMute = localStorage.getItem("bgMute") || false;
localStorage.setItem("bgMute", bgMute);

/*autostart the BG tunes when the document loads
we're going to do this in the HTML 
by adding an audio element and connectint to that*/
playBGSound();

//play Background tune accross the two pages
function playBGSound() {
  //first check if the sound is muted
  console.log("bool   " + typeof bgMute + bgMute);
  if (bgMute == false) {
    bgSound.autoplay = true;
    bgSound.play();
  } else {
    bgSound.autoplay = false;
    bgSound.pause();
  }
}

function toggleMute() {
  bgSound.currentTime = 0;
  bgMute = !bgMute;
  localStorage.setItem("bgMute", bgMute);
  playBGSound();
  //update the icon
  bgSoundMuteIcon.src = `images/game/bgSound${bgMute}.png`;
}

function bgSwitchPage() {
  bgSound.pause();
  localStorage.setItem("bgTime", bgSound.currentTime);
}

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
