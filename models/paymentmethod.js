const mongoose = require("mongoose");
const paymentMethodSchema = mongoose.Schema({
    name_on_card: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    zip: {
        type: DataTypes.STRING,
        allowNull: true
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true
    },
    credit_card: {
        type: DataTypes.STRING,
        allowNull: true
    },
    expiration_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    scv: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            is: /^\d{3}$/
        }
    },
    primary_pay: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: 0
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: 0
    }
});

const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);
module.exports = PaymentMethod;