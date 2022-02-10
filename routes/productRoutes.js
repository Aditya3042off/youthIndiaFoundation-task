const express = require("express");
const router = express.Router();

const {getAllProducts,getProductById} = require("../controllers/productControllers");
const {protect} = require("../middlewares/authMiddleware");

router.route("/").get(protect,getAllProducts);
router.route("/:id").get(protect,getProductById);

module.exports = router;
