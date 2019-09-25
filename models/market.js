const mongoose = require("mongoose");

const farmerSchema = mongoose.Schema({
    idNationalMarket: {
        type: String,
        require: false,
        primaryKey: true,
        autoincrement: false
    },
    products: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    schedule: {
        type: String,
        require: true,
    }
});

const Market = mongoose.Schema("Market", farmerSchema);
module.exports = Market;