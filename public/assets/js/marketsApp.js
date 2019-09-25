$("#save-market").on("click", function (event) {
    event.preventDefault();
    const brand = $("#brand").val();
    const address = $("#address").val();
    const city = $("#city").val();
    const state = $("#state").val();
    const zip = $("#zip").val();
    const date_open = $("#date_open").val();
    const date_close = $("#date_close").val();
    const time_open = $("#time_open").val();
    const time_close = $("#time_close").val();
    const marketData = { brand, address, city, state, zip, date_open, date_close, time_open, time_close };
    const doPost = validate(marketData);
    if (doPost) {
        $.post("/api/market", marketData, function (marketReturn) {
            if (marketReturn.success) {

            } else {
                errorModal(marketReturn.err);
            }
        });
    }
});

function validate(data) {
    let valid = true;
    if (data.brand == "") {
        valid = errorModal("Please enter market name or brand");
        $("#brand").focus();
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
    if (data.brand == "") {
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

    if (data.date_open > data.date_close) {
        valid = errorModal("Closing Date has to be Later than Opening Data");
        $("#date-open").focus();
        return valid;

    }

    if (data.time_open > data.time_close) {
        valid = errorModal("Closing time has to be later than opening");
        $("#time-close").focus();
        return valid;

    }
    return valid;
}

function errorModal(message) {
    $("#modal-error").text(message);
    $("#Modal").modal("toggle");
    return false;
}