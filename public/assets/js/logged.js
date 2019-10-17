let showDiv = "personal-info", hideDiv = "";

$("#logout-customer").on("click", function (event) {
    $.get("/api/logout", (res) => {
        window.location.href = "/";
    });
});

$("#profile").on("click", function (event) {
    event.preventDefault();
    console.log("after click");
    $.get("/customer-account", function (res) {
        console.log(res);
        window
    });
});

$(".btn-profile").on("click", function (event) {
    hideDiv = showDiv;
    showDiv = $(this).attr("data");
    $(`#${hideDiv}`).attr("hidden", true);
    $(`#${showDiv}`).attr("hidden", false);
});
