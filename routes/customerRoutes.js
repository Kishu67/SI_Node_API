const express = require("express");
const {
    createCustomer,
    allCustomerList,
    updateCustomer,
    deleteCustomer,
    getSingleCustomer,
    customerLogin
} = require("../controllers/customerController");
const adminValidateToken = require("../middleware/adminValidateTokenHandler");

const router = express.Router();

router.post("/customerLogin", customerLogin);

router.post("/createCustomer", adminValidateToken, createCustomer);

router.get("/customerLists", adminValidateToken, allCustomerList);

router.get("/singleCustomer/:id", adminValidateToken, getSingleCustomer);

router.put("/updateCustomer/:id", adminValidateToken, updateCustomer);

router.delete("/deleteCustomer/:id", adminValidateToken, deleteCustomer);

module.exports = router;