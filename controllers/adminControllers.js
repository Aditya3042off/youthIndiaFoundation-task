require("dotenv").config();
const {CustomError} = require("../classes/customErrorClass");
const {User} = require("../Models/userModel");
const {Product} = require("../Models/productModel");
const { asyncHandler } = require("../utils");


//PUT /admin/updateuser/:userid
// PRIVATE ROUTE

const changeUser = asyncHandler(async(req,res,next) => {
    const {role} = req.user;

    //checking if he is admin or not
    if(role === 0) throw new CustomError("Access denied",403);

    //updating user info
    const updatedUser = await User.findById({ _id: req.params.userid},{$set:req.body},{ new: true, useFindAndModify: false });

    res.status(200).json(updatedUser);
})


//POST /admin/addproduct
// PRIVATE ROUTE

const addProduct = asyncHandler(async(req,res,next) => {
    const user = req.user;
    const {role} = user;

    // checking if he is user or admin
    if(role === 0 ) throw new CustomError("Access denied",403);

    const {name,price} = req.body;

    // creating product and saving product to db
    const newProduct = new Product({name,price});
    await newProduct.save();

    res.status(200).send("Product added Successfully");
})

//POST /admin/updateproduct/:productid
// PRIVATE ROUTE

const updateProduct = asyncHandler(async(req,res,next) => {
    const {role} = req.user;

    //checking if he is admin or not
    if(role === 0) throw new CustomError("Access denied",403);

    //updating the product
    Product.findByIdAndUpdate( { _id: req.params.productid},
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, updatedProduct) => {
            if (err) throw new CustomError("Update Not successful",400);

            res.status(200).json(updatedProduct);
        });
})

//DELETE /admin/deleteproduct/:productid
// PRIVATE ROUTE

const deleteProduct = asyncHandler(async(req,res,next) => {
    const {role} = req.user;

    //checking if he is admin or not
    if(role === 0) throw new CustomError("Access denied",403);

    //deleting the product
    await Product.findByIdAndDelete(req.params.productid);
    return res.status(200).send('Product deleted Successfully!!');
})


module.exports = {deleteProduct,addProduct,updateProduct,changeUser};
