const mongoose = require("mongoose");
const {Record} = require("./productModel");

const userSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:0
    }
})

//role -> 0 USER
//role -> 1 ADMIN

const User = new mongoose.model("User",userSchema);

module.exports = {User};