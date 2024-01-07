const express = require("express");
const {
    registerAdmin,
    currentAdmin,
    loginAdmin,
    getsingleAdmin,
    updateAdmin,
} = require("../controllers/adminController");
const adminValidateToken = require("../middleware/adminValidateTokenHandler");

const router = express.Router();

router.post("/register", registerAdmin);

router.get("/singleAdmin/:id", adminValidateToken, getsingleAdmin);

router.put("/updateAdmin/:id", adminValidateToken, updateAdmin);

router.post("/login", loginAdmin);

router.get("/getLoggedInAdmin", adminValidateToken, currentAdmin);

module.exports = router;