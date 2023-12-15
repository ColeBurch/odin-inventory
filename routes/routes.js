const express = require("express");
const router = express.Router();
const category_controller = require("../controllers/categoryController");
const product_controller = require("../controllers/productController");
const product_instance_controller = require("../controllers/productInstanceController");
const authentication_controller = require("../controllers/authenticationController");
const passport = require("passport");

router.get(
  "/protect",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({
      success: true,
      msg: "You are successfully authenticated to this route!",
    });
  }
);

router.post("/login", authentication_controller.user_login);

router.post("/register", authentication_controller.user_register);

router.get("/auth");

router.get(
  "/categories",
  passport.authenticate("jwt", { session: false }),
  category_controller.category_list
);

router.get("/categories/:id", category_controller.category_detail);

router.post("/categories", category_controller.category_post);

router.post("/categories/delete", category_controller.category_delete);

router.post("/categories/update", category_controller.category_update);

router.get("/products", product_controller.product_list);

router.get("/products/:id", product_controller.product_detail);

router.post("/products", product_controller.product_post);

router.post("/products/delete", product_controller.product_delete);

router.post("/products/update", product_controller.product_update);

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

router.post(
  "/productinstances",
  product_instance_controller.productInstance_post
);

router.post(
  "/productinstances/delete",
  product_instance_controller.productInstance_delete
);

router.post(
  "/productinstances/update",
  product_instance_controller.productInstance_update
);

router.post(
  "/productinstances/update/addquantity",
  product_instance_controller.productInstance_addQuantity
);

router.post(
  "/productinstances/update/subtractquantity",
  product_instance_controller.productInstance_subtractQuantity
);

module.exports = router;
