const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const customerValidateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.CUSTOMER_ACCESS_TOKEN_SECERT, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("Customer is not authorized");
            }
            req.customer = decoded.customer;
            next();
        });

        if (!token) {
            res.status(401);
            throw new Error("Customer is not authorized or token is missing");
        }
    }
});

module.exports = customerValidateToken;