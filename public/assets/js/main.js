$(document).ready(function () {
    marketList = $("#markets-list");

    $.get("/api/markets", function (marketData) {

        marketData.forEach(element => {
            marketInfo = `${element.address}, ${element.schedule}`;
            ///client-markets/${element.id}
            marketList.append(
                `<a class="dropdown-item individual-market" href="#" id="${element.id}">
                <p style="font-size:12px;">${marketInfo}</p><br><p style="font-size:10px;">${element.products}</p></a>`);
        });

    });

});
$("#markets-list").on("click", ".market-link", function (event) {
    event.preventDefault();
    $.get("/api/isLoggedin", function (userLogin) {
        if (userLogin.success) {
            window.location.href = "/customerShop"
        } else {
            $("Modal-message-login").modal("toggle");
        }
    });
});


// 
$("#login-customer").on("click", function (event) {
    event.preventDefault();
    console.log("here here");
    $("#Modal-login").modal("toggle");
})
//substitu for login-shopper
$("#login-shopper").on("click", function (event) {
    event.preventDefault();
    $("#Modal-login").modal("toggle");
})
$("#login-button").on("click", function () {
    const email = $("#email").val();
    const password = $("#password").val();
    const user = { email, password };
    $.get("/api/login", user, function (userResult) {
        if (userResult) {
            $("#email").val("");
            $("#password").val("");
            $("Modal-login").modal("hide");
        }
        else {
            // call modal error
            console.log("user not found");
        }
    });
});

