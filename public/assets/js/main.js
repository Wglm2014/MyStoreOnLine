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

$("#login-button").on("click", function (event) {
    event.preventDefault();
    const email = $("#login-email").val();
    const password = $("#login-password").val();
    const user = { email, password };
    console.log("posting");
    // console.log(user);

    $.post("/api/login", user, function (userResult) {
        console.log(typeof (userResult));
        if (typeof (userResult) === "object" && !userResult.success) {
            errorModal(userResult.message);
        }
        else {
            $("#login-email").val("");
            $("#login-password").val("");
            $("#Modal-login").modal("toggle");
            window.location.href = "/dashboard"
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
    //console.log(newCustomerAccount);
    if (newCustomerAccount.password !== $("#password-comprobation").val()) {
        //  console.error("do not match");
        errorModal("password confirmation does not match");
    } else {
        //console.log(newCustomerAccount);
        $.post("/api/customer", newCustomerAccount, function (customerReturn) {
            const data = { email: newCustomerAccount.email, password: newCustomerAccount.password };
            if (customerReturn.success) {
                $("#email").val("");
                $("#password").val("");
                $("#password-comprobation").val("");
                $("#first-name").val("");
                $("#last-name").val("");
                $("#Modal-create-account").modal("toggle");
                console.log("before login in");
                console.log(data);

                $.post("/api/login", data, (res) => {
                    console.log(res);
                    if (typeof (res) === "object" && !res.success) {
                        errorModal(res.message);
                    } else {
                        window.location.href = "/dashboard";

                    }
                });
            } else {
                errorModal(customerReturn.message);
            }
        });
    }
});



function errorModal(message) {
    $("#modal-error").text(message);
    $("#ModalError").modal("toggle");
    return false;
}