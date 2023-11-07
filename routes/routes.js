const express = require("express");
const router = express.Router();
const category_controller = require("../controllers/categoryController");
const product_controller = require("../controllers/productController");
const product_instance_controller = require("../controllers/productInstanceController");

router.get("/categories", category_controller.category_list);

router.get("/categories/:id", category_controller.category_detail);

router.post("/categories", category_controller.category_post);

router.post("/categories/delete", category_controller.category_delete);

router.post("/categories/update", category_controller.category_update);

router.get("/products", product_controller.product_list);

router.get("/products/:id", product_controller.product_detail);

router.post("/products", product_controller.product_post);

router.get(
  "/productinstances",
  product_instance_controller.productinstance_list
);

router.get(
  "/productinstances/:id",
  product_instance_controller.product_instance_detail
);

router.get(
  "/productinstances/product/:id",
  product_instance_controller.product_specific_instances
);

module.exports = router;
