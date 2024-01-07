const asyncHandler = require("express-async-handler");
const Customer = require("../models/customerMOdel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc Create to Customer
//@route POST /api/customers/createCustomer
//@access private
const createCustomer = asyncHandler(async (req, res) => {
    const { firstname, lastname, password, mobileNo, emailId, address1, address2, city, state, pincode } = req.body;

    const customerAvailable = await Customer.findOne({ mobileNo });
    if (customerAvailable) {
        res.status(400);
        throw new Error("Customer already registered with mobile no");
    }

    const customer = await Customer.create({
        firstname,
        lastname,
        password,
        mobileNo,
        emailId,
        address1,
        address2,
        city,
        state,
        pincode
    });

    if (customer) {
        res.status(201).json({ message: "Customer is created successfully" });
    } else {
        res.status(400);
        throw new Error("Customer data is not registered");
    }
});

//@desc Login customer
//@route POST /api/customers/customerLogin
//@access public
const customerLogin = asyncHandler(async (req, res) => {
    const { mobileNo, password } = req.body;

    const customer = await Customer.findOne({ mobileNo });
    //compare password with hashedpassword
    if (customer && (customer.password == password)) {
        const accessToken = jwt.sign(
            {
                customer: {
                    _id: customer.id,
                    firstname: customer.firstname,
                    lastname: customer.lastname,
                    mobileNo: customer.mobileNo,
                    emailId: customer.emailId,
                    address1: customer.address1,
                    address2: customer.address2,
                    city: customer.city,
                    state: customer.state,
                    pincode: customer.pincode
                },
            },
            process.env.CUSTOMER_ACCESS_TOKEN_SECERT,
            { expiresIn: "7d" }
        );
        res.status(200).json({ accessToken: accessToken, Customers: customer });
    } else {
        res.status(400);
        throw new Error("Mobileno Or Password is not valid");
    }
});

//@desc Get Single Customer
//@route GET /api/customers/singleCustomer/:id
//@access private
const getSingleCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
        res.status(404);
        throw new Error("Customer not found");
    }
    res.status(200).json(customer);
});

//@desc Get all Customers
//@route GET /api/customers/customerLists
//@access private
const allCustomerList = asyncHandler(async (req, res) => {
    const customer = await Customer.find();
    res.status(200).json({ customers: customer });
});


//@desc Update Customer
//@route PUT /api/customers/updateCustomer/:id
//@access private
const updateCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
        res.status(404);
        throw new Error("Customer not found");
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (updatedCustomer) {
        res.status(200).json({ message: "Customer Updated Successfully !", updatedCustomer: updatedCustomer });
    } else {
        res.status(400).json({ message: "Not Updated Customer !" });
    }
});

//@desc Delete Customer
//@route DELETE /api/customers/deleteCustomer/:id
//@access private
const deleteCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
        res.status(404);
        throw new Error("Customer not found");
    }

    await Customer.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Customer Deleted Successfully !" });
});


module.exports = { createCustomer, customerLogin, allCustomerList, updateCustomer, deleteCustomer, getSingleCustomer };