$(document).ready(function () {
    /*$.get("/api/isLoggedin", function (userLogin) {
        if (userLogin.success) {
            window.location.href = "/customerShop"
        } else {
            $("Modal-message-login").modal("toggle");
        }
    });*/

});

// 
$(".login-customer").on("click", function (event) {
    event.preventDefault();
    $("#Modal-create-account").modal("hide");
    $("#Modal-login").modal("toggle");
});

$(".create-account").on("click", function (event) {
    event.preventDefault();
    $("#Modal-login").modal("hide");
    $("#Modal-create-account").modal("toggle");
});

//login customer

$("#login-button").on("click", function () {
    const email = $("#email").val();
    const password = $("#password").val();
    const user = { email, password };
    $.get("/api/login", user, function (userResult) {
        if (userResult.success) {
            $("#login-email").val("");
            $("#login-password").val("");
            $("Modal-login").modal("hide");
        }
        else {
            // call modal error
            //console.log("user not found");
            errorModal(userResult.error);
        }
    });
});

// registration

$("#add").on("click", function (event) {
    event.preventDefault();
    const newCustomerAccount = {
        googleId: "",
        email: $("#email").val(),
        password: $("#password").val(),
        first_name: $("#first-name").val(),
        last_name: $("#last-name").val(),
        address: "",
        city: "",
        zip: "",
        state: "",
        telephone: "",
        telephone_other: "",
        account_status: true
    };

    if (newCustomerAccount.password !== $("#password-comprobation").val()) {
        console.error("do not match");
        errorModal("password confirmation does not match");
    } else {
        console.log(newCustomerAccount);
        $.post("/api/customer", newCustomerAccount, function (customerReturn) {
            if (customerReturn.success) {
                $.get("/dashboard", (res) => {
                    //console.log(res);
                });
            } else {
                errorModal(customerReturn.error);
            }
        });
    }
});



function errorModal(message) {
    $("#modal-error").text(message);
    $("#ModalError").modal("toggle");
    return false;
}