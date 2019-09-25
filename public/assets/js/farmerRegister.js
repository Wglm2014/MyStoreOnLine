$(document).ready(function () {
  let marketList = $("#markets-list");

  $.get("/api/markets", function (marketData) {

    marketData.forEach(element => {
      marketInfo = `${element.address}, ${element.schedule}`;
      marketList.append(`<option value = ${element.id}>${marketInfo}</option>`);
    });
  });
});

$("#add").on("click", function (event) {
  event.preventDefault();

  const newFarmerAccount = {
    name: $("#name").val(),
    email: $("#email").val(),
    password: $("#password").val(),
    address: $("#address").val(),
    city: $("#city").val(),
    zip: $("#zip-code").val(),
    state: $("#state").val(),
    telephone: $("#phone-number").val(),
    category: $("#category").val(),
    brand: $("#brand").val(),
    accout_number: $("#account-number").val(),
    account_status: true,
    open_close: false,
    marketId: $("#markets-list").val()
  };

  dataValid = validate(newFarmerAccount);
  if (dataValid) {
    console.log(newFarmerAccount);
    $.post("/api/farmer", newFarmerAccount, function (farmerData) {
      console.log(farmerData);
      if (farmerData.success) {
        console.log("sending get");
        window.location.href = "/farmer-product";
      } else {
        console.log(farmerData.error);

      }
    });
  }
});

function validate(data) {
  let valid = true;
  if (data.marketId == 0) {
    valid = errorModal("Please Select your Market");
    $("#markets-list").focus();
    return valid;
  }
  if (data.name == "") {
    valid = errorModal("Please enter the name");
    $("#name").focus();
    return valid;
  }
  if (data.email == "") {
    valid = errorModal("Please enter an email address");
    $("#email").focus();
    return valid;
  } else if (data.email !== $("#email-repeat").val()) {
    valid = errorModal("email address does not match");
    $("#email-repeat").focus();
    return valid;
  }
  if (data.password == "") {
    valid = errorModal("Please enter your password");
    $("#password").focus();
    return valid;
  } else if (data.password !== $("#password-repeat").val()) {
    valid = errorModal("Password does not match");
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
  const rege = regeZip.test(data.zip)

  if (!rege) {
    valid = errorModal("Please enter a valid Zip Code");
    $("#zip").focus();
    return valid;

  }
  return valid;
}

function errorModal(message) {
  $("#modal-error").text(message);
  $("#Modal").modal("toggle");
  return false;
}
