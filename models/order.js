const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
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
    credit_card: {
        type: String,
        require: true
    },
    expiration_date: {
        type: Date,
        require: true
    },
    scv: {
        type: String,
        require: true
    },
    total: {
        type: mongoose.SchemaType.Decimal128,
        require: true
    },
    status: {
        type: String,
        require: true,
    },
    date_order: {
        type: Date,
        require: true,
        default: Date.now
    }

});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;