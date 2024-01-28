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
        admin_full_address: {
            type: String
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