const express = require("express");
const router = express.Router();
const category_controller = require("../controllers/categoryController");
const product_controller = require("../controllers/productController");
const product_instance_controller = require("../controllers/productInstanceController");

router.get("/categories", category_controller.category_list);

router.get("/products", product_controller.product_list);

router.get(
  "/productinstances",
  product_instance_controller.productinstance_list
);

module.exports = router;
