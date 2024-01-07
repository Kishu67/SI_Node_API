const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
    {
        admin_name: {
            type: String
        },
        admin_password: {
            type: String
        },
        admin_email: {
            type: String
        },
        admin_address1: {
            type: String
        },
        admin_address2: {
            type: String
        },
        admin_city: {
            type: String
        },
        admin_state: {
            type: String
        },
        admin_pincode: {
            type: Number
        },
        admin_mobileno: {
            type: Number
        },
        admin_telno: {
            type: Number
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Admin", adminSchema);