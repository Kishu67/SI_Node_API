const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        productName: {
            type: String
        },
        productPrice: {
            type: String
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema);