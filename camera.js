const video = document.querySelector("video");
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

// find any video camera on the device we're using
navigator.mediaDevices
  .getUserMedia({ video: true })
  // if it exists, then get a stream of video from it
  .then(function (stream) {
    //set that stream of video as the source of a video element on our website
    video.srcObject = stream;
    //play the stream on the video element on our website
    video.play();
  })
  .catch(function (err) {
    console.log("Error accessing camera", err);
  });

// take a picture from the video stream
function takePicture() {
  //draw an image to the canvas element in our web page
  //get this image from the video we are streaming (the current frame of video)
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  //store the image into a variable so we can use it later
  const imageData = canvas.toDataURL("image/png");
  // send the imageData to the server or do something else with it
}

// add a click event listener to the "Take Picture" button
const takePictureButton = document.querySelector("#take-picture-button");
takePictureButton.addEventListener("click", takePicture);
