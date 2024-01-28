const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");

//@desc Register a Admin
//@route POST /api/admins/register
//@access public
const registerAdmin = asyncHandler(async (req, res) => {
    const { admin_name, admin_password, admin_email, admin_full_address, admin_mobileno, admin_telno } = req.body;

    //Hash password
    const hashedPassword = await bcrypt.hash(admin_password, 10);
    const admin = await Admin.create({
        admin_name,
        admin_password: hashedPassword,
        admin_email,
        admin_full_address,
        admin_mobileno,
        admin_telno
    });

    if (admin) {
        res.status(201).json({ message: 'Admin Created Successfully !' });
    } else {
        res.status(400);
        throw new Error("Admin data is not valid");
    }
});

//@desc Login admin
//@route POST /api/admins/login
//@access public
const loginAdmin = asyncHandler(async (req, res) => {
    const { admin_name, admin_password } = req.body;

    const admin = await Admin.findOne({ admin_name });
    //compare password with hashedpassword
    if (admin && (await bcrypt.compare(admin_password, admin.admin_password))) {
        const accessToken = jwt.sign(
            {
                admin: {
                    _id: admin.id,
                    admin_name: admin.admin_name,
                    admin_email: admin.admin_email,
                    admin_full_address: admin.admin_full_address,
                    admin_mobileno: admin.admin_mobileno,
                    admin_telno: admin.admin_telno
                },
            },
            process.env.ADMIN_ACCESS_TOKEN_SECERT,
            { expiresIn: "7d" }
        );
        res.status(200).json({ accessToken: accessToken });
    } else {
        res.status(400);
        throw new Error("Adminname Or Password is not valid");
    }
});

//@desc Current admin info
//@route GET /api/admins/current
//@access private
const currentAdmin = asyncHandler(async (req, res) => {
    const admin = await Admin.find();
    res.status(200).json({ admin });
});


//@desc Get Single Admin
//@route GET /api/admins/singleAdmin/:id
//@access private
const getsingleAdmin = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
        res.status(404);
        throw new Error("Admin not found");
    }
    res.status(200).json(admin);
});

//@desc Update Admin
//@route PUT /api/admins/updateAdmin/:id
//@access private
const updateAdmin = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
        res.status(404);
        throw new Error("Admin not found");
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (updatedAdmin) {
        res.status(200).json({ message: "Admin Updated Successfully !", updatedAdmin: updatedAdmin });
    } else {
        res.status(400).json({ message: "Not Updated Admin !" });
    }
});

module.exports = { registerAdmin, loginAdmin, currentAdmin, getsingleAdmin, updateAdmin };