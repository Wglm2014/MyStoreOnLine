const mongoose = require("mongoose");

const orderDetailSchema = ({
    amount: {
        type: String,
        require: true
    },
    product_packt: {
        type: Boolean,
        require: true,
        default: false
    }

});

const OrderDetail = mongoose.model("OrderDetail", orderDetailSchema);
module.exports = OrderDetail;