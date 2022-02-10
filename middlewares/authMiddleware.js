const jwt = require("jsonwebtoken");
const { CustomError } = require("../classes/customErrorClass");
const { User } = require("../Models/userModel");

//verifies if the token sent by the user is valid or not
const protect = (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization;

    if (!(authHeader && authHeader.startsWith("Bearer"))) {
        throw new CustomError("User not Authenticated", 401);
    }
    token = authHeader.split(" ")[1];

    //verifying the token
    jwt.verify(token, process.env.SECRET, (err, result) => {
        if (err) throw new CustomError("Access Denied", 403);

        //getting user details from DB
        User.findById(result.id, (err, user) => {
            if (err) throw new CustomError("User Not Found", 404);

            req.user = user;
            return next();
        }).select("-password");
    });
};

module.exports = {protect};