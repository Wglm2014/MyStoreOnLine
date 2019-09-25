const mongoose = import("mongoose");

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;