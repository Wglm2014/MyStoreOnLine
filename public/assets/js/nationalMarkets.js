$("#search-market").on("click", function (event) {
    event.preventDefault();
    const zipMarket = $("#zip-market").val();
    getResults(zipMarket);
});

function getResults(zip) {
    // or
    // function getResults(lat, lng) {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        // submit a get request to the restful service zipSearch or locSearch.
        url: "https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip,
        // or
        // url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat=" + lat + "&lng=" + lng,
        dataType: 'jsonp',
        //jsonpCallback: 'searchResultsHandler'
    }).then(function (searchResults) {
        searchResults.results.forEach(element => {
            console.log(element);
            $.get("/api/markets/" + element.id, function (marketFound) {
                console.log(marketFound);
                if (marketFound.length !== 0) {
                    console.log("market exist");
                } else {
                    getDetails(element.id);
                }
            });


        });
        $("#Modal-markets").modal("toggle");
    });
}

function getDetails(id) {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        // submit a get request to the restful service mktDetail.
        url: "https://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id,
        dataType: 'jsonp'
        //jsonpCallback: 'detailResultHandler'
    }).then(function (detailresults) {
        const selectMarket = $("#market-table");
        selectMarket.append(`<tr class="market-row" id="${id}-row">
        <td id="${id}-address">${detailresults.marketdetails.Address}</td>
        <td id="${id}-schedule">${detailresults.marketdetails.Schedule}</td>
        <td id="${id}-products">${detailresults.marketdetails.Products}</td>
        <td><button class= "btn btn-link save-market" type="submit" id="${id}">Add to Favorite</button></td>
      </tr>`);
    });
}
$("#market-table").on("click", ".save-market", function (event) {
    event.preventDefault();
    const id = $(this).attr("id");
    const el = $(this);
    const address = $(`#${id}-address`).text();
    const schedule = $(`#${id}-schedule`).text();
    const products = $(`#${id}-products`).text();

    const data = { id, products, address, schedule };
    console.log(data.products.length);
    $.post("/api/market", data, function (results) {
        if (results.success) {
            let marketList = $("#markets-list");
            marketInfo = `${results.market.address}, ${results.market.schedule}`;
            marketList.append(`<option value = ${results.market.id}>${marketInfo}</option>`);
            el.hide();
        } else {
            console.log(results.error);
        }
    });

});