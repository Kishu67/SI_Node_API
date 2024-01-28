const asyncHandler = require("express-async-handler");
const Customer = require("../models/customerMOdel");
const jwt = require("jsonwebtoken");
const getDataUri = require("../utils/dataUri");
const cloudinary = require("cloudinary");

//@desc Create Customer
//@route POST /api/customers/createCustomer
//@access private
const createCustomer = asyncHandler(async (req, res) => {
    const { firstname, lastname, password, mobileNo, emailId, address1, address2, city, state, pincode, fcm_token } = req.body;

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
        pincode,
        fcm_token: fcm_token ? fcm_token : ""
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
        //you can add your actions
        if (customer.active === true) {
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
            throw new Error("Customer is Deactive Please contact admin");
        }
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

//@desc Delete single, multiple and many Customer
//@route POST /api/customers/deleteCustomerMany
//@access private
const deleteCustomerMany = asyncHandler(async (req, res) => {
    await Customer.deleteMany({ _id: req.body.allIDs });
    res.status(200).json({ message: "Customer Deleted Successfully !" });
});

//@desc Update Customer with FCM Token
//@route PUT /api/customers/updateCustomerFCM/:id
//@access private
const updateCustomerFCM = asyncHandler(async (req, res) => {
    const customerFCM = await Customer.findById(req.params.id);
    if (!customerFCM) {
        res.status(404);
        throw new Error("Customer not found");
    }

    const updatedCustomerFCM = await Customer.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (updatedCustomerFCM) {
        res.status(200).json({ message: "Customer Updated Successfully !", updatedCustomer: updatedCustomerFCM });
    } else {
        res.status(400).json({ message: "Not Updated Customer !" });
    }
});

//@desc POST Customer ForgotPassword 
//@route POST /api/customers/singleCustomerForgotPassword
//@access private
const singleCustomerForgotPassword = asyncHandler(async (req, res) => {
    const { mobileNo } = req.body;

    const customer = await Customer.findOne({ mobileNo });
    if (customer) {
        res.status(200).json({ customers: customer });
    } else {
        res.status(400);
        throw new Error("This customer data is not in our system!");
    }
});

//@desc Update Customer with Active & Deactive
//@route PUT /api/customers/updateActiveDeactiveCustomer/:id
//@access private
const updateActiveDeactiveCustomer = asyncHandler(async (req, res) => {
    const customerFCM = await Customer.findById(req.params.id);
    if (!customerFCM) {
        res.status(404);
        throw new Error("Customer not found");
    }

    const updatedCustomerFCM = await Customer.findByIdAndUpdate(
        req.params.id,
        { $set: { active: req.body.active } },
        { new: true }
    );

    if (updatedCustomerFCM) {
        res.status(200).json({ message: 'User account deactivate successfully!' });
    } else {
        res.status(400).json({ message: 'Unable to deactivate account' });
    }
});


//@desc Update Customer profile image
//@route PUT /api/customers/updateCustomerImage/:id
//@access private
const updateCustomerImage = asyncHandler(async (req, res) => {
    const customerImage = await Customer.findById(req.params.id);
    if (!customerImage) {
        res.status(404);
        throw new Error("Customer not found");
    }
    
    const file = req.file;
    const fileUri = getDataUri(file);

    const cloud = await cloudinary.v2.uploader.upload(fileUri.content, {
        folder: "SI_customer_images",
        resource_type: "image",
    });

    req.body.profile_image =  {
        public_id: cloud.public_id,
        url: cloud.secure_url,
    }

    const updatedCustomerImage = await Customer.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (updatedCustomerImage) {
        res.status(200).json({ message: "Customer profile uploaded Successfully !", updatedCustomer: updatedCustomerImage });
    } else {
        res.status(400).json({ message: "Not Updated profile image of Customer !" });
    }
});

module.exports = { createCustomer, customerLogin, allCustomerList, updateCustomer, deleteCustomer, getSingleCustomer, updateCustomerFCM, singleCustomerForgotPassword, updateActiveDeactiveCustomer, deleteCustomerMany, updateCustomerImage };