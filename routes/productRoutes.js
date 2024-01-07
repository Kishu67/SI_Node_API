const express = require("express");
const {
    createProduct,
    allProductList,
    updateProduct,
    deleteProduct,
    getSingleProduct
} = require("../controllers/productController");
const adminValidateToken = require("../middleware/adminValidateTokenHandler");

const router = express.Router();

router.post("/createProduct", adminValidateToken, createProduct);

router.get("/singleProduct/:id", adminValidateToken, getSingleProduct);

router.get("/productLists", adminValidateToken, allProductList);

router.put("/updateProduct/:id", adminValidateToken, updateProduct);

router.delete("/deleteProduct/:id", adminValidateToken, deleteProduct);

module.exports = router;