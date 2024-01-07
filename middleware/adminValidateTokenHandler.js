const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const adminValidateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECERT, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("Admin is not authorized");
            }
            req.admin = decoded.admin;
            next();
        });

        if (!token) {
            res.status(401);
            throw new Error("Admin is not authorized or token is missing");
        }
    }
});

module.exports = adminValidateToken;