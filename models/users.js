const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: {
        type: String,
        required: false
    },
    email: {
        type: String,
        unique: true,
        require: false,
    },
    password: {
        type: String,
        require: false
    },
    first_name: {
        type: String,
        require: false
    },
    last_name: {
        type: String,
        require: false
    },
    foto: {
        type: String,
        require: false
    },
    address: {
        type: String,
        require: false
    },
    city: {
        type: String,
        require: false
    },
    zip: {
        type: String,
        require: false,
    },
    state: {
        type: String,
        require: false
    },
    telephone: {
        type: String,
        require: false,
    },
    telephone_other: {
        type: String,
    }
    ,
    account_status: {
        type: Boolean,
        require: true,
        default: true
    },
    account_type: {
        type: String,
        required: true
    }
});


const User = mongoose.model("User", userSchema);
module.exports = User;