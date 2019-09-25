const mongoose = require("mongoose");

const shopperSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        key: true
    },
    password: {
        type: String,
        require: true
    },
    first_name: {
        type: String,
        require: true
    },
    last_name: {
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
    account_status: {
        type: DataTypes.BOOLEAN,
        default: true
    },
    account_number: {
        type: String,
        require: true
    }

});

const Shopper = mongoose.model("Shopper", shopperSchema);

module.exports = Shopper;