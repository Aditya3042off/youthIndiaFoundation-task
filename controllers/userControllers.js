require("dotenv").config();
const {CustomError} = require("../classes/customErrorClass");
const {User} = require("../Models/userModel");
const { asyncHandler } = require("../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//POST /user/login
// PUBLIC ROUTE

const authUser = asyncHandler(async(req,res,next) => {
    const {email,password} = req.body;

    //checking if the user exist
    const user = await User.findOne({email});
    if(!user) throw new CustomError("Email does not exist",404,"EMAIL");

    //checking if the password is correct or not
    const isValid = await bcrypt.compare(password, user.password);  //returns a boolean regarding the passwords match or not
    if (!isValid) throw new CustomError("password is wrong", 401, "PASSWORD");

    //sending jwt token for valid user
    const payload = {id:user._id};

    const token = jwt.sign(payload,process.env.SECRET);

    res.status(200).json({token});
});

//POST /user/signup
// PUBLIC ROUTE

const registerUser = asyncHandler(async(req,res,next) => {
    const {name,email,password} = req.body;

    //checking if user exist
    const user = await User.findOne({email});
    if(user) throw new CustomError("Email already exists",400,"EMAIL");

    //hashing user password using bcrypt
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    //creating the user
    const newUser = new User({name,email,password:hashedPassword});
    await newUser.save();
    res.status(200).send("SUCCESS");
})


module.exports = {authUser,registerUser};
