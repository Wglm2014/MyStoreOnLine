/*const farmerData = {
  id: 1,
  name: "Farmer 1",
  email: "farmer@gmail.com",
  password: "password",
  address: "a usa place",
  city: "San Diego",
  zip: "10803",
  state: "California",
  telephone: "1082448888",
  account_number: "111111111111"
};*/
let farmerId = 0;
$(document).ready(function () {
  $.get("/api/farmerData", function (farmerData) {
    console.log(farmerData);
    //loading default data
    farmerId = farmerData.id;
    $("#name").val(farmerData.name);
    $("#email").val(farmerData.email);
    $("#password").val(farmerData.password);
    $("#address").val(farmerData.address);
    $("#city").val(farmerData.city);
    $("#zip-code").val(farmerData.zip);
    $("#state").val(farmerData.state);
    $("#phone-number").val(farmerData.telephone);
    $("#account-number").val(farmerData.account_number);

    // });
    $.get("/api/product-farmer", function (productData) {
      if (productData) {
        productData.forEach(element => {
          appendProduct(element);
        });
        console.log(productData);
      } else {
        console.log(productData.error);
      }
    });
  });
});

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
    .getUserMedia(constraints)
    .then(function (stream) {
      track = stream.getTracks()[0];
      cameraView.srcObject = stream;
    })
    .catch(function (error) {
      console.error("Oops. Something is broken.", error);
    });
}

$("#camera--trigger").on("click", function () {
  cameraSensor.width = cameraView.videoWidth;
  cameraSensor.height = cameraView.videoHeight;
  cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
  cameraSensor.style.display = "block";
  cameraView.style.display = "none";
});

$("#modal-btn").on("click", function () {
  cameraSensor.style.display = "none";
  if (cameraView.style.display === "none") {
    cameraView.style.display = "block";
  }
});

$("#save-btn").on("click", function () {
  let img = document.createElement("img");
  img.src = cameraSensor.toDataURL("image/webp");
  img.classList.add("taken");
  if (cameraSensor.style.display === "block") {
    cameraSensor.style.display = "none";
  }
  if (cameraView.style.display === "none") {
    cameraView.style.display = "block";
  }

  const newProduct = {
    name: $("#product-name").val(),
    price: $("#price").val(),
    price_per: $("#price-unity").val(),
    file: img.src,
    FarmerId: farmerId
  };

  const productValid = productsValidate(newProduct);

  if (productValid) {
    $.post("/api/product", newProduct, function (productData) {
      console.log(productData);
      console.log("after post");
      if (productData.success) {
        appendProduct(productData.product);
      }
    });
  }
});
//append prodcut
function appendProduct(newProduct) {
  const card = $(`<div class="card">
                <img src = "${newProduct.picture_url}" class ="taken" alt = "${newProduct.picture_name}">
                <p>${newProduct.name}</p>
                <p>${newProduct.price}</p>
                <p>${newProduct.price_per}</p>
                <button id="delete"><i class='fas fa-trash-alt'></i></button>
                </div>`);
  $("#product-area").append(card);
}
//delete product
$("#product-area").on("click", "#delete", function () {

  //$.delete("api/product",productId,function(){});
  $(this)
    .parent(".card")
    .remove();
});
//function validation(data) { }

/*function convertCanvasToImage(canvas) { 	var image = new Image(); 	image.src = canvas.toDataURL("image/png"); 	return image; }*/

$("#edit-info").on("click", function (event) {
  event.preventDefault();
  $(
    "#name, #password, #phone-number, #address, #zip-code, #city, #state, #account-number, #password-repeat"
  ).removeClass("remove-edit");
});



$("#save").on("click", function (event) {
  event.preventDefault();

  farmer.name = $("#name").val();
  farmer.email = $("#email").val();
  farmer.password = $("#password").val();
  farmer.address = $("#address").val();
  farmer.city = $("#city").val();
  farmer.zip = $("#zip-code").val();
  farmer.state = $("#state").val();
  farmer.telephone = $("#phone-number").val();
  farmer.account_number = $("#account-number").val();
  const dataValid = validate(farmer);
  if (dataValid) {
    //$.put("api/farmer", farmer, function(farmerData) {});
    $(
      "#name, #password, #phone-number, #address, #zip-code, #city, #state, #account-number, #password-repeat"
    ).addClass("remove-edit");
  }

  /*if (dataValid) {
   
  }*/
});

function validate(data) {
  let valid = true;
  if (data.name == "") {
    valid = errorModal("Please enter the name");
    $("#name").focus();
    return valid;
  }
  if (data.password == "") {
    valid = errorModal("Please enter your password");
    $("#password").focus();
    return valid;
  } else if (data.password != $("#password-repeat").val()) {
    valid = errorModal("Please make your password match");
    $("#password-repeat").focus();
    return valid;
  }
  if (data.address == "") {
    valid = errorModal("Please enter the address");
    $("#address").focus();
    return valid;
  }
  if (data.city == "") {
    valid = errorModal("Please enter the city");
    $("#city").focus();
    return valid;
  }
  if (data.state == "") {
    valid = errorModal("Please enter the state");
    $("#state").focus();
    return valid;
  }
  const regeZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  const rege = regeZip.test(data.zip);

  if (!rege) {
    valid = errorModal("Please enter a valid Zip Code");
    $("#zip").focus();
    return valid;
  }

  return valid;
}

function productsValidate(data) {
  let valid = true;
  if (data.name == "") {
    valid = errorModal("Please enter the name of the product");
    $("#name").focus();
    return valid;
  }
  if (data.price == "") {
    valid = errorModal("Please enter the price of the product");
    $("#price").focus();
    return valid;
  }

  return valid;
}

function errorModal(message) {
  $("#modal-error").text(message);
  $("#Modal-validation").modal("toggle");
  return false;
}
