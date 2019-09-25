const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
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
    telephone_other: {
        type: String,
    }
    ,
    account_status: {
        type: DataTypes.BOOLEAN,
        require: true,
        default: true
    },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;