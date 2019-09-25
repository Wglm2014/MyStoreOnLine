$("#add").on("click", function (event) {
  event.preventDefault();

  const newShopperAccount = {
    email: $("#email").val(),
    password: $("#password").val(),
    first_name: $("#first-name").val(),
    last_name: $("#last-name").val(),
    address: $("#address").val(),
    city: $("#city").val(),
    zip: $("#zip-code").val(),
    state: $("#state").val(),
    telephone: $("#phone-number").val(),
    account_status: true,
    account_number = $("account-number").val(),
  };

  console.log(newShopperAccount);

  const doPost = validate(newShopperAccount);
  if (doPost) {
    $.post("/api/shopper", newShopperAccount, function (shopperReturn) {
      if (shopperReturn.success) {
      } else {
        errorModal(shopperReturn.err);
      }
    });
  }
});

function validate(data) {
  let valid = true;
  if (data.first_name == "") {
    valid = errorModal("Please enter your first name");
    $("#first-name").focus();
    return valid;
  }
  if (data.last_name == "") {
    valid = errorModal("Please enter your last name");
    $("#last-name").focus();
    return valid;
  }
  if (data.email == "") {
    valid = errorModal("Please enter your email");
    $("#email").focus();
    return valid;
  }
  if (data.email != $("#email-comprobation").val()) {
    valid = errorModal("Please enter the correct email");
    $("#email-comprobation").focus();
    return valid;
  }
  if (data.password == "") {
    valid = errorModal("Please enter your password");
    $("#password").focus();
    return valid;
  }
  if (data.password != $("#password-comprobation").val()) {
    valid = errorModal("Please enter the correct password");
    $("#password-comprobation").focus();
    return valid;
  }
  if (data.address == "") {
    valid = errorModal("Please enter your address");
    $("#address").focus();
    return valid;
  }

  const regeZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  const rege = regeZip.test(data.zip);

  if (!rege) {
    valid = errorModal("Please enter a valid Zip Code");
    $("#zip").focus();
    return valid;
  }

  if (data.city == "") {
    valid = errorModal("Please enter your city");
    $("#city").focus();
    return valid;
  }

  if (data.state == "") {
    valid = errorModal("Please enter your state");
    $("#state").focus();
    return valid;
  }
}

function errorModal(message) {
  $("#modal-error").text(message);
  $("#Modal").modal("toggle");
  return false;
}
