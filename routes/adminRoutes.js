const express = require("express");
const router = express.Router();
const {deleteProduct,addProduct,updateProduct,changeUser} = require("../controllers/adminControllers");
const {protect} = require("../middlewares/authMiddleware");

router.route("/updateuser/:userid").put(protect,changeUser);

router.route("/addproduct").post(protect,addProduct);
router.route("/updateproduct/:productid").put(protect,updateProduct);
router.route("/deleteproduct/:productid").delete(protect,deleteProduct);

module.exports = router;