const express = require("express");
const router = express.Router();

const {authUser,registerUser} = require("../controllers/userControllers");
const {protect} = require("../middlewares/authMiddleware");

router.route("/login").post(authUser);
router.route("/signup").post(registerUser);

module.exports = router;