const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: {
        type: String,
        required: true
    },
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
    foto:{
        type:String,
        require:false
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
        type: Boolean,
        require: true,
        default: true
    }
});
mongoose.model("User", userSchema);
