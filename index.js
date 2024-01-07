const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const cors = require("cors");
connectDb();
const app = express();

const port = process.env.PORT || 5000;

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/admins", require("./routes/adminRoutes"));
app.use("/api/customers", require("./routes/customerRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/invoices", require("./routes/invoiceRoutes"));
app.use("/api/counts", require("./routes/countUPIRoutes"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});