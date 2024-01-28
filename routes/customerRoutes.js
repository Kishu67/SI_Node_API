const express = require("express");
const {
    createCustomer,
    allCustomerList,
    updateCustomer,
    deleteCustomer,
    getSingleCustomer,
    customerLogin,
    updateCustomerFCM,
    singleCustomerForgotPassword,
    updateActiveDeactiveCustomer,
    deleteCustomerMany,
    updateCustomerImage
} = require("../controllers/customerController");
const adminValidateToken = require("../middleware/adminValidateTokenHandler");
const customerValidateToken = require("../middleware/customerValidateTokenHandler");

const singleUpload = require("../middleware/multer");

const router = express.Router();

// Customer Login & Forgot Password Routes
router.post("/customerLogin", customerLogin);
router.post("/singleCustomerForgotPassword", singleCustomerForgotPassword);

// Admin Token Routes
router.post("/createCustomer", adminValidateToken, createCustomer);
router.get("/customerLists", adminValidateToken, allCustomerList);
router.get("/singleCustomer/:id", adminValidateToken, getSingleCustomer);
router.put("/updateCustomer/:id", adminValidateToken, updateCustomer);
router.put("/updateActiveDeactiveCustomer/:id", adminValidateToken, updateActiveDeactiveCustomer);
router.delete("/deleteCustomer/:id", adminValidateToken, deleteCustomer);
router.post("/deleteCustomerMany", adminValidateToken, deleteCustomerMany);

// Customer Token Routes
router.put("/updateCustomerFCM/:id", customerValidateToken, updateCustomerFCM);
router.route("/updateCustomerImage/:id").put(singleUpload, updateCustomerImage);


module.exports = router;