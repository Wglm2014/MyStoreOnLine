const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: false
    },
    foto: {
        type: String,
    },
    email: {
        type: String,
        required: true
    }
});
mongoose.model("User", userSchema);
