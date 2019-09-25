let cameraView, cameraOutput, cameraSensor;
let constraints;

constraints = { video: { facingMode: "user" }, audio: false };
/*{audio: true, video: { facingMode: { exact: "environment" } } }*/
/*{ video: { deviceId: myPreferredCameraDeviceId } }*/

cameraView = document.getElementById("camera--view");
cameraOutput = document.getElementById("camera--output");
cameraSensor = document.getElementById("camera--sensor");

window.addEventListener("load", cameraStart, false);


function cameraStart() {
  navigator.mediaDevices
    .getUserMedia(constraints).then(function (stream) {
      track = stream.getTracks()[0];
      cameraView.srcObject = stream;
    }).catch(function (error) {
      console.error("Oops. Something is broken.", error);
    });
}

$("#camera--trigger").on("click", function () {
  cameraSensor.width = cameraView.videoWidth;
  cameraSensor.height = cameraView.videoHeight;
  cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
  cameraSensor.style.display = "block";
  cameraView.style.display = "none";
  /*cameraOutput.src = cameraSensor.toDataURL("image/webp");
  cameraOutput.classList.add("taken");*/
});

$("#modal-btn").on("click", function () {
  cameraSensor.style.display = "none";
  if (cameraView.style.display === "none") {
    cameraView.style.display = "block";
  }
});

$("#save-btn").on("click", function () {
  /*cameraOutput.src = cameraSensor.toDataURL("image/webp");
  cameraOutput.classList.add("taken");*/

  var img = document.createElement("img");
  img.src = cameraSensor.toDataURL("image/webp");
  img.classList.add("taken");
  document.body.appendChild(img);

  if (cameraSensor.style.display === "block") {
    cameraSensor.style.display = "none";
  }
  if (cameraView.style.display === "none") {
    cameraView.style.display = "block";
  }

});


/*function convertCanvasToImage(canvas) { 	var image = new Image(); 	image.src = canvas.toDataURL("image/png"); 	return image; }*/