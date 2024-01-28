const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

//@desc Create Product
//@route POST /api/products/createProduct
//@access private
const createProduct = asyncHandler(async (req, res) => {
    const { productName, productPrice } = req.body;

    const productAvailable = await Product.findOne({ productName });
    if (productAvailable) {
        res.status(400);
        throw new Error("Product already registered!");
    }

    const product = await Product.create({
        productName,
        productPrice
    });

    if (product) {
        res.status(201).json({ message: "Product is created successfully !" });
    } else {
        res.status(400);
        throw new Error("Product data is not valid");
    }
});

//@desc Get Single Product
//@route GET /api/products/singleProduct/:id
//@access private
const getSingleProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    res.status(200).json(product);
});

//@desc Get all Products
//@route GET /api/prducts/productLists
//@access private
const allProductList = asyncHandler(async (req, res) => {
    const product = await Product.find();
    res.status(200).json({ products: product });
});


//@desc Update Product
//@route PUT /api/products/updateProduct/:id
//@access private
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (updatedProduct) {
        res.status(200).json({ message: "Product Updated Successfully !", updatedProduct: updatedProduct });
    } else {
        res.status(400).json({ message: " Not Updated Product !" });
    }
});

//@desc Delete Product
//@route DELETE /api/products/deleteProduct/:id
//@access private
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Product Deleted Successfully !" });
});

//@desc Delete single, multiple and many Product
//@route POST /api/products/deleteProductMany
//@access private
const deleteProductMany = asyncHandler(async (req, res) => {
    await Product.deleteMany({ _id: req.body.allIDs });
    res.status(200).json({ message: "Products Deleted Successfully !" });
});

module.exports = { createProduct, allProductList, updateProduct, deleteProduct, getSingleProduct, deleteProductMany };