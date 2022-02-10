require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/config");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");
const {customErrorHandler} = require("./middlewares/errorHandler");

connectDB();

//middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());

//routes middlewares
app.use("/user",userRoutes);
app.use("/products",productRoutes);
app.use("/admin",adminRoutes);


//custom error handling middleware
app.use(customErrorHandler);

app.listen(process.env.PORT,(err,res) => {
    console.log(`server is up and running`);
})

