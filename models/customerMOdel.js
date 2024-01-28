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
        },
        fcm_token: {
            type: String
        },
        active: {
            type: Boolean,
            default: true,
        },
        profile_image: {
             public_id: {
                type: String,
            },
            url: {
                type: String,
            },
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Customer", customerSchema);