const mongoose = require("mongoose");

const farmerSchema = mongoose.Schema({
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