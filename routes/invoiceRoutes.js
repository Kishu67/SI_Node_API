const express = require("express");
const {
    createInvoice,
    allInvoiceList,
    updateInvoice,
    deleteInvoice,
    getSingleInvoice,
    getSingleInvoiceCustomerList,
    deleteInvoiceMany
} = require("../controllers/invoiceController");
const adminValidateToken = require("../middleware/adminValidateTokenHandler");
const customerValidateToken = require("../middleware/customerValidateTokenHandler");

const router = express.Router();

// Admin Invoice Token Routes
router.post("/createInvoice", adminValidateToken, createInvoice);
router.get("/invoiceLists", adminValidateToken, allInvoiceList);
router.get("/singleInvoice/:id", adminValidateToken, getSingleInvoice);
router.put("/updateInvoice/:id", adminValidateToken, updateInvoice);
router.delete("/deleteInvoice/:id", adminValidateToken, deleteInvoice);
router.post("/deleteInvoiceMany", adminValidateToken, deleteInvoiceMany);

// Customer Invoice Token Routes
router.get("/singleCustomerInvoiceList/:id", customerValidateToken, getSingleInvoiceCustomerList);


module.exports = router;