//switched from custom sound implementation to HTML Audio element
const passSound = new Audio("sound/pass.mp3");
const failSound = new Audio("sound/fail.mp3");
let bgSoundMuteIcon = document.querySelector("#bg-sound-toggle");
const bgSound = document.getElementById("bg-sound");
//populate the bgSound properties
bgSound.src = "sound/bg.mp3";
bgSound.loop = true;
// bgSound.autoplay = true;

// bgSound.load();

//add some bgSound helper variables
let bgTime = localStorage.getItem("bgTime") || 0;
let bgMute = localStorage.getItem("bgMute") || "false";
localStorage.setItem("bgMute", bgMute);

console.log("SOUND LOADED   ");

/*autostart the BG tunes when the document loads
we're going to do this in the HTML 
by adding an audio element and connectint to that*/
playBGSound();

//play Background tune accross the two pages
function playBGSound() {
  //first check if the sound is muted
  if (bgMute == "false") {
    bgSound.play();
  } else {
    bgSound.pause();
  }
  //update the icon too
  bgSoundMuteIcon.src = `images/game/bgSound${bgMute}.png`;
}

//give the icon a click event to toggle mute
bgSoundMuteIcon.addEventListener("click", toggleMute);
function toggleMute() {
  bgSound.currentTime = 0;
  bgMute = bgMute == "false" ? "true" : "false";
  localStorage.setItem("bgMute", bgMute);
  playBGSound();
  //update the icon
  bgSoundMuteIcon.src = `images/game/bgSound${bgMute}.png`;
}

//might remain unused. added in case other pages navigate while Sound still playing
function bgSwitchPage() {
  bgSound.pause();
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
