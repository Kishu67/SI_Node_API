const express = require("express");
const {
    createInvoice,
    allInvoiceList,
    updateInvoice,
    deleteInvoice,
    getSingleInvoice,
    getSingleInvoiceCustomerList
} = require("../controllers/invoiceController");
const adminValidateToken = require("../middleware/adminValidateTokenHandler");
const customerValidateToken = require("../middleware/customerValidateTokenHandler");

const router = express.Router();

router.post("/createInvoice", adminValidateToken, createInvoice);

router.get("/invoiceLists", adminValidateToken, allInvoiceList);

router.get("/singleInvoice/:id", adminValidateToken, getSingleInvoice);

router.get("/singleInvoiceCustomerList/:id", customerValidateToken, getSingleInvoiceCustomerList);

router.put("/updateInvoice/:id", adminValidateToken, updateInvoice);

router.delete("/deleteInvoice/:id", adminValidateToken, deleteInvoice);

module.exports = router;