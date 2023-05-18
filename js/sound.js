function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}

const passSound = new sound("/sound/pass.mp3");
const failSound = new sound("/sound/fail.mp3");

function playPassSound() {
  passSound.play();
}

function playFailSound() {
  failSound.play();
}
