const today = new Date();
const date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

console.log(date);

const orders = {
  order_1: {
    id: 1,
    address: "somewhere in USA",
    date_order: date,
    customer: "name",
    order_products: {
      product_1: {
        name: "Potatoes",
        price: "0.30",
        price_per: "c/u"
      },
      product_2: {
        name: "Tomatoes",
        price: "0.25",
        price_per: "c/u"
      },
      product_3: {
        name: "Grapes",
        price: "2.00",
        price_per: "lb"
      },
      product_4: {
        name: "Beef meat",
        price: "3.00",
        price_per: "lb"
      },
      product_5: {
        name: "Pork",
        price: "2.50",
        price_per: "lb"
      },
      product_6: {
        name: "Chicken breast",
        price: "1.50",
        price_per: "lb"
      }
    }
  },
  order_2: {
    id: 2,
    address: "somewhere in USA",
    date_order: date,
    customer: "name",
    order_products: {
      product_1: {
        name: "Potatoes",
        price: "0.30",
        price_per: "c/u"
      },
      product_2: {
        name: "Tomatoes",
        price: "0.25",
        price_per: "c/u"
      },
      product_3: {
        name: "Beef meat",
        price: "3.00",
        price_per: "lb"
      },
      product_4: {
        name: "Pork",
        price: "2.50",
        price_per: "lb"
      }
    }
  }
};

window.onload = function() {
  Object.keys(orders).forEach(function(e) {
    const ordersDetails = orders[e];

    const tableRow = $("<tr>").append(
      `<th>${ordersDetails.id}</th><td>${ordersDetails.customer}</td><td>${
        ordersDetails.address
      }</td><td><a id="${
        ordersDetails.id
      }" class="search" href=""><i class="fas fa-search"></i></a></td>`
    );

    $("#order-info").append(tableRow);
  });
};

$("#order-info").on("click", ".search", function(event) {
  event.preventDefault();
  $("#orders-area").html("");

  const searchId = this.id;

  Object.keys(orders).forEach(function(e) {
    const ordersDetails = orders[e];

    if (ordersDetails.id == searchId) {
      const products = ordersDetails.order_products;

      Object.keys(products).forEach(function(e) {
        console.log(products[e]);

        const card = $("<div class='card'>").append(
          `<p>${products[e].name}</p><p>${products[e].price}</p><p>${
            products[e].price_per
          }</p>
          <div class="form-check">
            <input type="checkbox" class="form-check-input">
            <label class="form-check-label" for="exampleCheck1">Ready</label>
          </div>`
        );

        $("#orders-area").append(card);
      });
    }
  });
});
