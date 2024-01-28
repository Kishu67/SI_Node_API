const express = require("express");
const {
    createProduct,
    allProductList,
    updateProduct,
    deleteProduct,
    getSingleProduct,
    deleteProductMany
} = require("../controllers/productController");
const adminValidateToken = require("../middleware/adminValidateTokenHandler");

const router = express.Router();

// Product Token Routes
router.post("/createProduct", adminValidateToken, createProduct);
router.get("/singleProduct/:id", adminValidateToken, getSingleProduct);
router.get("/productLists", adminValidateToken, allProductList);
router.put("/updateProduct/:id", adminValidateToken, updateProduct);
router.delete("/deleteProduct/:id", adminValidateToken, deleteProduct);
router.post("/deleteProductMany", adminValidateToken, deleteProductMany);

module.exports = router;