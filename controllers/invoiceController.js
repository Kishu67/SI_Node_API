const asyncHandler = require("express-async-handler");
const Invoice = require("../models/invoiceModel");
const mongo = require('mongodb');

//@desc Create Invoice
//@route POST /api/invoices/createInvoice
//@access private
const createInvoice = asyncHandler(async (req, res) => {

    let orderId = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz' + '0123456789' + '@#$%^&*';

    for (let i = 1; i <= 6; i++) {
        let char = Math.floor(Math.random()
            * str.length + 1);

        orderId += str.charAt(char)
    }

    let TrackingId = '';
    let str1 = 'abcdefghijklmnopqrstuvwxyz' +
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + '@#$%^&*' + '0123456789';

    for (let i = 1; i <= 20; i++) {
        let char = Math.floor(Math.random()
            * str1.length + 1);

        TrackingId += str1.charAt(char)
    }

    const invoice = new Invoice({
        details: req.body.details,
        invoiceNo: req.body.invoiceNo,
        notes: req.body.notes,
        total: req.body.total,
        tax: req.body.tax,
        netTotal: req.body.netTotal,
        customerDetails: req.body.customerDetails,
        orderDetails: {
            orderId: orderId,
            trackingId: TrackingId,
            orderDate: req.body.orderDate,
            paymentMode: req.body.paymentMode,
            orderStatus: req.body.orderStatus
        }
    });

    const order = await invoice.save();

    if (order) {
        res.status(201).json({
            message: "Invoice is created successfully !",
            Invoicedata: order
        });
    } else {
        res.status(400);
        throw new Error("Invoice data is not valid");
    }
});

// @desc Get Single Invoice
// @route GET /api/invoices/singleInvoice/:id
// @access private
const getSingleInvoice = asyncHandler(async (req, res) => {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
        res.status(404);
        throw new Error("Invoice not found");
    }
    res.status(200).json(invoice);
});

//@desc Get all Invoice Lists
//@route GET /api/invoices/invoicesLists
//@access private
const allInvoiceList = asyncHandler(async (req, res) => {
    const invoice = await Invoice.find();
    res.status(200).json({ invoices: invoice });
});

//@desc Update Invoice
//@route PUT /api/invoices/updateInvoice/:id
//@access private
const updateInvoice = asyncHandler(async (req, res) => {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
        res.status(404);
        throw new Error("Invoice not found");
    }

    const updatedInvoice = await Invoice.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (updatedInvoice) {
        res.status(200).json({ message: "Invoice Updated Successfully !", updatedInvoice: updatedInvoice });
    } else {
        res.status(200).json({ message: "Not Updated Invoice !" });
    }

});

//@desc Delete Invoice
//@route DELETE /api/invoices/deleteInvoice/:id
//@access private
const deleteInvoice = asyncHandler(async (req, res) => {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
        res.status(404);
        throw new Error("Invoice not found");
    }

    await Invoice.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Invoice Deleted Successfully !" });
});

//@desc Delete single, multiple and many Invioce
//@route POST /api/invoices/deleteInvoiceMany
//@access private
const deleteInvoiceMany = asyncHandler(async (req, res) => {
    await Invoice.deleteMany({ _id: req.body.allIDs });
    res.status(200).json({ message: "Invoices Deleted Successfully !" });
});

// @desc Get Individual Customer invoice Lists
// @route GET /api/invoices/singleCustomerInvoiceList/:id
// @access private
const getSingleInvoiceCustomerList = asyncHandler(async (req, res) => {
    const invoice = await Invoice.find();
    let custInvoiceListArray = [];
    for (const val of invoice) {
        if (val.customerDetails._id === req.params.id) {
            custInvoiceListArray.push(val)
        }
    }
    if (custInvoiceListArray && custInvoiceListArray.length > 0) {
        res.status(200).json({ Invoices: custInvoiceListArray });
    } else {
        res.status(400);
        throw new Error("This customer invoice is not generated");
    }
});

module.exports = { createInvoice, allInvoiceList, getSingleInvoice, updateInvoice, deleteInvoice, getSingleInvoiceCustomerList, deleteInvoiceMany };