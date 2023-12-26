const express = require("express");
const router = express.Router();
const category_controller = require("../controllers/categoryController");
const product_controller = require("../controllers/productController");
const product_instance_controller = require("../controllers/productInstanceController");
const authentication_controller = require("../controllers/authenticationController");
const passport = require("passport");

router.get(
  "/status",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({
      success: true,
      user: {
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
      },
    });
  }
);

router.post("/login", authentication_controller.user_login);

router.post("/register", authentication_controller.user_register);

router.get(
  "/categories",
  passport.authenticate("jwt", { session: false }),
  category_controller.category_list
);

router.get(
  "/categories/:id",
  passport.authenticate("jwt", { session: false }),
  category_controller.category_detail
);

router.post(
  "/categories",
  passport.authenticate("jwt", { session: false }),
  category_controller.category_post
);

router.post(
  "/categories/delete",
  passport.authenticate("jwt", { session: false }),
  category_controller.category_delete
);

router.post(
  "/categories/update",
  passport.authenticate("jwt", { session: false }),
  category_controller.category_update
);

router.get(
  "/products",
  passport.authenticate("jwt", { session: false }),
  product_controller.product_list
);

router.get(
  "/products/:id",
  passport.authenticate("jwt", { session: false }),
  product_controller.product_detail
);

router.post(
  "/products",
  passport.authenticate("jwt", { session: false }),
  product_controller.product_post
);

router.post(
  "/products/delete",
  passport.authenticate("jwt", { session: false }),
  product_controller.product_delete
);

router.post(
  "/products/update",
  passport.authenticate("jwt", { session: false }),
  product_controller.product_update
);

router.get(
  "/productinstances",
  passport.authenticate("jwt", { session: false }),
  product_instance_controller.productinstance_list
);

router.get(
  "/productinstances/:id",
  passport.authenticate("jwt", { session: false }),
  product_instance_controller.product_instance_detail
);

router.get(
  "/productinstances/product/:id",
  passport.authenticate("jwt", { session: false }),
  product_instance_controller.product_specific_instances
);

router.post(
  "/productinstances",
  passport.authenticate("jwt", { session: false }),
  product_instance_controller.productInstance_post
);

router.post(
  "/productinstances/delete",
  passport.authenticate("jwt", { session: false }),
  product_instance_controller.productInstance_delete
);

router.post(
  "/productinstances/update",
  passport.authenticate("jwt", { session: false }),
  product_instance_controller.productInstance_update
);

router.post(
  "/productinstances/update/addquantity",
  passport.authenticate("jwt", { session: false }),
  product_instance_controller.productInstance_addQuantity
);

router.post(
  "/productinstances/update/subtractquantity",
  passport.authenticate("jwt", { session: false }),
  product_instance_controller.productInstance_subtractQuantity
);

module.exports = router;
