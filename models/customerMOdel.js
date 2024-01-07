const mongoose = require("mongoose");

const customerSchema = mongoose.Schema(
    {
        firstname: {
            type: String
        },
        lastname: {
            type: String
        },
        password: {
            type: String
        },
        mobileNo: {
            type: Number
        },
        emailId: {
            type: String
        },
        address1: {
            type: String,
        },
        address2: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        pincode: {
            type: Number
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Customer", customerSchema);