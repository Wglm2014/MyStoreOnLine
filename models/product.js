const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: DataTypes.STRING,
        requiere: false
    },
    price: {
        type: DataTypes.DOUBLE,
        requiere: false
    },
    price_per: {
        type: DataTypes.STRING,
        requiere: false,
    },
    picture_name: {
        type: DataTypes.STRING,
        requiere: false,
    },
    picture_url: {
        type: DataTypes.STRING,
        requiere: false
    }
});

const Product = mongoose.model("Product", productSchema)
module.exports = Product;
