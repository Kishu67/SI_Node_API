const asyncHandler = require("express-async-handler");
const Customer = require("../models/customerMOdel");
const Product = require("../models/productModel");
const Invoice = require("../models/invoiceModel");

//@desc Count Numbers Of Customers, Product, Invoice
//@route GET /api/counts/countUPI
//@access private
const countUPI = asyncHandler(async (req, res) => {
    const customer_count = await Customer.find().count();
    const product_count = await Product.find().count();
    const invoice_count = await Invoice.find().count();
    res.status(200).json({
        customer_counts: customer_count,
        product_counts: product_count,
        invoice_counts: invoice_count
    });
});


//@desc Month Wise Count Customer, Product, Invoice
//@route GET /api/counts/monthWiseCountUPI
//@access private
const monthWiseCountUPI = asyncHandler(async (req, res) => {

    let month = new Date().getMonth() + 1;
    const monthWiseCountCustomer = await Customer.aggregate([
        {
            $match: {
                $expr: {
                    $eq: [{ $month: "$createdAt" }, month]
                }
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                },
                Total: { $sum: 1 }
            }
        }
    ]);

    const monthWiseCountProduct = await Product.aggregate([
        {
            $match: {
                $expr: {
                    $eq: [{ $month: "$createdAt" }, month]
                }
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                },
                Total: { $sum: 1 }
            }
        }
    ]);

    const monthWiseCountInvoice = await Invoice.aggregate([
        {
            $match: {
                $expr: {
                    $eq: [{ $month: "$createdAt" }, month]
                }
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                },
                Total: { $sum: 1 }
            }
        }
    ]);

    if (monthWiseCountCustomer && monthWiseCountProduct && monthWiseCountInvoice) {
        res.status(200).json({
            customer_month: monthWiseCountCustomer,
            product_month: monthWiseCountProduct,
            invoice_month: monthWiseCountInvoice
        })
    } else {
        res.status(400).json({
            message: 'Error occurs'
        })
    }
});

//@desc Month Wise Count Customer, Product, Invoice
//@route GET /api/counts/dateWiseCountUPI
//@access private
const dateWiseCountUPI = asyncHandler(async (req, res) => {

    var company_id = company._id
    var start = new Date(req.body.from_date);
    start.setHours(0, 0, 0, 0);
    var end = new Date(req.body.to_date);
    end.setHours(23, 59, 59, 999);

    const dateWiseCountCustomer = await Customer.aggregate([
        {
            $match: {
                $and: [
                    { entry_date: { $gt: start, $lt: end } }, { company_id: "" + company_id + "" }
                ]
            }
        },
        { $sort: { entry_date: -1 } },
        {
            $group:
            {
                _id:
                {
                    day: { $dayOfMonth: "$entry_date" },
                    month: { $month: "$entry_date" },
                    year: { $year: "$entry_date" }
                },
                count: { $sum: 1 },
                entry_date: { $first: "$entry_date" }
            }
        },
        {
            $project:
            {
                entry_date:
                {
                    $dateToString: { format: "%Y-%m-%d", date: "$entry_date" }
                },
                count: 1,
                _id: 0
            }
        }
    ]);

    const dateWiseCountProduct = await Product.aggregate([
        {
            $match: {
                $and: [
                    { entry_date: { $gt: start, $lt: end } }, { company_id: "" + company_id + "" }
                ]
            }
        },
        { $sort: { entry_date: -1 } },
        {
            $group:
            {
                _id:
                {
                    day: { $dayOfMonth: "$entry_date" },
                    month: { $month: "$entry_date" },
                    year: { $year: "$entry_date" }
                },
                count: { $sum: 1 },
                entry_date: { $first: "$entry_date" }
            }
        },
        {
            $project:
            {
                entry_date:
                {
                    $dateToString: { format: "%Y-%m-%d", date: "$entry_date" }
                },
                count: 1,
                _id: 0
            }
        }
    ]);

    const dateWiseCountInvoice = await Invoice.aggregate([
        {
            $match: {
                $and: [
                    { entry_date: { $gt: start, $lt: end } }, { company_id: "" + company_id + "" }
                ]
            }
        },
        { $sort: { entry_date: -1 } },
        {
            $group:
            {
                _id:
                {
                    day: { $dayOfMonth: "$entry_date" },
                    month: { $month: "$entry_date" },
                    year: { $year: "$entry_date" }
                },
                count: { $sum: 1 },
                entry_date: { $first: "$entry_date" }
            }
        },
        {
            $project:
            {
                entry_date:
                {
                    $dateToString: { format: "%Y-%m-%d", date: "$entry_date" }
                },
                count: 1,
                _id: 0
            }
        }
    ]);

    if (dateWiseCountCustomer && dateWiseCountProduct && dateWiseCountInvoice) {
        res.status(200).json({
            customer_date: dateWiseCountCustomer,
            product_date: dateWiseCountProduct,
            invoice_date: dateWiseCountInvoice
        })
    } else {
        res.status(400).json({
            message: 'Error occurs'
        })
    }
});

module.exports = { countUPI, monthWiseCountUPI, dateWiseCountUPI };
