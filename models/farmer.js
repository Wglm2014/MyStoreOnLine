const mongoose = require("mongoose");

const farmerSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    zip: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true
    },
    telephone: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true
    },
    brand: {
        type: String,
        require: true
    },
    account_number: {
        type: String,
        require: true
    },
    account_status: {
        type: Boolean,
        default: true
    },
    open_close: {
        type: Boolean,
        default: true
    }

});

const Farmer = mongoose.model("Farmer", farmerSchema);
module.exports = Farmer;