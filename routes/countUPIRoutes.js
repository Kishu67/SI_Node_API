const express = require("express");
const {
    countUPI,
    monthWiseCountUPI,
    dateWiseCountUPI
} = require("../controllers/countUPIController");
const adminValidateToken = require("../middleware/adminValidateTokenHandler");

const router = express.Router();


router.get("/countUPI", adminValidateToken, countUPI);

router.get("/monthWiseCountUPI", adminValidateToken, monthWiseCountUPI);

router.get("/dateWiseCountUPI", adminValidateToken, dateWiseCountUPI);

module.exports = router;
