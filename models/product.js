const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    price_per: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    picture_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    picture_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isUrl: true }
    }
});

const Product = mongoose.model("Product", productSchema)
module.exports = Product;
