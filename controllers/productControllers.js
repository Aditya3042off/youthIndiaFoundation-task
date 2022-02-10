const { asyncHandler } = require("../utils");
const {Product} = require("../Models/productModel");
const {CustomError} = require("../classes/customErrorClass");

//GET /products
// PRIVATE ROUTE

const getAllProducts = asyncHandler(async(req,res,next) => {
    const id = req.user._id;

    //getting products from db
    const productsList = await Product.find({});

    res.status(200).json({
        productsList
    });
})

//GET /products/:id
//PRIVATE ROUTE

const getProductById = asyncHandler(async(req,res,next) => {
    const productId = req.params.id;

    //get this specific product info from db
    const productInfo = await Product.findById(productId);
    if(!productInfo) throw new CustomError("Product Not Found",404);

    res.status(200).json(productInfo);

})

module.exports = {getAllProducts,getProductById};