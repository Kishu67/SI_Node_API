const { constants } = require("../constant");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                status: statusCode,
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                status: statusCode,
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case constants.UNAUTHORIZED:
            res.json({
                status: statusCode,
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case constants.FORBIDDEN:
            res.json({
                status: statusCode,
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case constants.SERVER_ERROR:
            res.json({
                status: statusCode,
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        default:
            console.log("No Error, All good !");
            break;
    }
};

module.exports = errorHandler;