const mongoose = require("mongoose");

const invoiceSchema = mongoose.Schema(
    {
        invoiceNo: { type: String },
        notes: { type: String },
        total: { type: String },
        tax: { type: String },
        netTotal: { type: String },
        customerDetails: {
            _id: { type: String },
            firstname: { type: String },
            lastname: { type: String },
            address1: { type: String },
            address2: { type: String },
            city: { type: String },
            state: { type: String },
            pincode: { type: String },
            mobileNo: { type: String },
            emailId: { type: String },
            createdAt: { type: String },
            updatedAt: { type: String },
            __v: { type: String }
        },
        details: [
            {
                productCode: {
                    _id: { type: String },
                    productName: { type: String },
                    productPrice: { type: String },
                    createdAt: { type: String },
                    updatedAt: { type: String },
                    __v: { type: String }
                },
                qty: { type: String },
                salesPrice: { type: String },
                total: { type: String },
                _id: false,
            }
        ],
        orderDetails: {
            _id: false,
            orderId: { type: String },
            trackingId: { type: String },
            orderDate: { type: String },
            paymentMode: { type: String },
            orderStatus: { type: String }
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Invoice", invoiceSchema);